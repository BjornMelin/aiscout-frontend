'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserProfile, getUserDisplayImage } from '@/lib/types/userAuth';
import { mockUsers } from '@/data/mock/mock-user';

// Mock user data for testing
const mockUserProfile: UserProfile = {
  id: mockUsers[0].id,
  name: mockUsers[0].name || '',
  email: mockUsers[0].email,
  profileImage: mockUsers[0].profileImage,
  avatarSeed: mockUsers[0].avatarSeed,
  affiliation: mockUsers[0].affiliation,
  role: mockUsers[0].role,
  interests: ['Machine Learning', 'AI Research'],
  bio: mockUsers[0].bio,
  socialLinks: mockUsers[0].socialLinks,
  createdAt: mockUsers[0].createdAt || new Date(),
  updatedAt: mockUsers[0].updatedAt || new Date(),
  username: mockUsers[0].email.split('@')[0]
};

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map((interest) => interest.trim());
    setProfile((prev) => ({ ...prev, interests }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implement profile update with backend
      // For now, just simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-500">
            {isEditing ? 'Edit your profile information' : 'View and manage your profile'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={getUserDisplayImage(profile)} alt={profile.name} />
            <AvatarFallback className="text-lg">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <Button variant="outline">
              Change Profile Picture
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                name="affiliation"
                value={profile.affiliation}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="University or Organization"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">
                Areas of Interest <span className="text-gray-500">(comma-separated)</span>
              </Label>
              <Input
                id="interests"
                name="interests"
                value={profile.interests.join(', ')}
                onChange={handleInterestsChange}
                disabled={!isEditing}
                placeholder="Machine Learning, Computer Vision, etc."
              />
            </div>
          </div>

          <div className="flex gap-4">
            {isEditing ? (
              <>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setProfile(mockUserProfile); // Reset changes
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Bookmarks</h2>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/user/${params.userId}/bookmarks`)}
            >
              View Bookmarks
            </Button>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Folders</h2>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/user/${params.userId}/folders`)}
            >
              View Folders
            </Button>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Shared with Me</h2>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/user/${params.userId}/shared`)}
            >
              View Shared Items
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 