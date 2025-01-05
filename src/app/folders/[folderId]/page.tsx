import { notFound } from 'next/navigation'
import { FolderContentsView, ShareFolderButton } from '@/components/features/folders'
import { getFolderById } from '@/lib/api/folders'
import { getSession } from '@/lib/auth/session'
import type { Folder } from '@/lib/types/folder'
import type { Metadata } from 'next'

interface FolderPageProps {
  params: {
    folderId: string
  }
}

export async function generateMetadata({ params }: FolderPageProps): Promise<Metadata> {
  try {
    const folder = await getFolderById(params.folderId)
    return {
      title: `${folder.name} - AIScout`,
      description: folder.description || `View contents of folder ${folder.name}`,
    }
  } catch {
    return {
      title: 'Folder Not Found - AIScout',
      description: 'The requested folder could not be found.',
    }
  }
}

async function getFolder(folderId: string): Promise<Folder> {
  try {
    const folder = await getFolderById(folderId)
    return folder
  } catch (error: unknown) {
    console.error('Failed to fetch folder:', error)
    return notFound()
  }
}

export default async function FolderPage({ params }: FolderPageProps) {
  const [session, folder] = await Promise.all([
    getSession(),
    getFolder(params.folderId)
  ])

  if (!session) {
    return notFound()
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{folder.name}</h1>
          {folder.description && (
            <p className="text-muted-foreground mt-2">
              {folder.description}
            </p>
          )}
        </div>
        
        <ShareFolderButton folder={folder} />
      </div>

      <FolderContentsView folder={folder} />
    </div>
  )
}
