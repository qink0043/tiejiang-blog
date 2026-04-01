export type MessageType = 'success' | 'error' | 'warning' | 'info'

export type MessagePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface MessageOptions {
  type?: MessageType
  message: string
  title?: string
  duration?: number
  closable?: boolean
  position?: MessagePosition
  onClose?: () => void
}

export interface MessageInstance {
  id: number
  close: () => void
}
