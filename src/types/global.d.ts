import type Message from '@/message'

declare module 'vue' {
  interface ComponentCustomProperties {
    $message: typeof Message
  }
}
