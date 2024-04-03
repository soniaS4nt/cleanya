'use client'
import React from 'react'
import { Button, Dialog, DialogPanel } from '@tremor/react'

interface ModalComponentProps {
  onOpen: boolean
  onClose: () => void
  content: React.ReactNode
  className?: string
}

export function ModalComponent({
  onOpen,
  onClose,
  content,
  className,
}: ModalComponentProps) {
  return (
    <Dialog open={onOpen} onClose={onClose} static={true} className="z-[100] ">
      <DialogPanel className={className}>{content}</DialogPanel>
    </Dialog>
  )
}
