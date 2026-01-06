import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast data structure
 */
export interface ToastData {
  id: string
  type: ToastType
  message: string
  duration?: number
}

/**
 * Toast icons mapping
 */
const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: AlertCircle,
}

/**
 * Toast colors mapping
 */
const toastColors = {
  success: {
    bg: 'bg-[var(--success-subtle)]',
    border: 'border-[var(--success-text)]',
    text: 'text-[var(--success-text)]',
  },
  error: {
    bg: 'bg-[var(--error-subtle)]',
    border: 'border-[var(--error-text)]',
    text: 'text-[var(--error-text)]',
  },
  warning: {
    bg: 'bg-[var(--warning-subtle)]',
    border: 'border-[var(--warning-text)]',
    text: 'text-[var(--warning-text)]',
  },
  info: {
    bg: 'bg-[var(--primary-subtle)]',
    border: 'border-[var(--primary-text)]',
    text: 'text-[var(--primary-text)]',
  },
}

/**
 * Single Toast Item
 */
function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) {
  const Icon = toastIcons[toast.type]
  const colors = toastColors[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        animate-slide-in
        ${colors.bg} ${colors.border}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${colors.text}`} />
      <span className="text-sm text-[var(--text-primary)] flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 hover:bg-black/10 rounded transition-colors"
      >
        <X className="w-4 h-4 text-[var(--text-secondary)]" />
      </button>
    </div>
  )
}

/**
 * Toast Container - manages multiple toasts
 */
interface ToastContainerProps {
  toasts: ToastData[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

/**
 * useToast hook for managing toast state
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (type: ToastType, message: string, duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const toast = {
    success: (message: string, duration?: number) => addToast('success', message, duration),
    error: (message: string, duration?: number) => addToast('error', message, duration),
    warning: (message: string, duration?: number) => addToast('warning', message, duration),
    info: (message: string, duration?: number) => addToast('info', message, duration),
  }

  return { toasts, toast, removeToast }
}

export default ToastContainer
