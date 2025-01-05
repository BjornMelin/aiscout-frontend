import { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Folders - AIScout",
  description: "Organize and manage your saved content in folders.",
};

export default async function FoldersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <main>{children}</main>;
}
