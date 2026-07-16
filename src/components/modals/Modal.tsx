import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  side?: boolean
}

export const Modal = ({ open, onClose, title, children, side = false }: ModalProps) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex pointer-events-auto" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-all duration-200" onClick={onClose} />
      <div
        className={
          side
            ? 'relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-sm animate-in-right'
            : 'relative m-auto flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-sm animate-in'
        }
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-[15px] font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-text-secondary transition-all duration-200 hover:bg-bg-secondary hover:text-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  )
}
