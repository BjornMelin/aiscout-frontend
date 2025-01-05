'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { ShareFolderDialog } from '../ShareFolderDialog/ShareFolderDialog'
import type { Folder } from '@/lib/types/folder'

interface ShareFolderButtonProps {
  folder: Folder
}

export function ShareFolderButton({ folder }: ShareFolderButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setIsOpen(true)}
        aria-label="Share folder"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </Button>

      <ShareFolderDialog
        folder={folder}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  )
} 