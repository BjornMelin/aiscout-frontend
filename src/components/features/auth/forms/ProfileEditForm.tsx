"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { UserProfile } from "@/lib/types/user";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  affiliation: z
    .string()
    .max(100, "Affiliation must be less than 100 characters")
    .optional(),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  image: z
    .custom<File>()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  profile: UserProfile;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    profile.image || null
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      affiliation: profile.affiliation,
      interests: profile.interests,
      bio: profile.bio,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  async function onSubmit(values: ProfileFormValues) {
    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "interests") {
            formData.append(key, JSON.stringify(value));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update profile");
      }

      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={previewImage || profile.image}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={handleImageChange}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              Change Avatar
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="affiliation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliation</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
