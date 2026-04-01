import { type App, createApp } from 'vue'
import MessageContainer from './MessageContainer'
import type { MessageOptions, MessageType } from './type'

interface MessageFn {
  (options: MessageOptions | string): any
  success: (msg: string, options?: MessageOptions) => any
  error: (msg: string, options?: MessageOptions) => any
  warning: (msg: string, options?: MessageOptions) => any
  info: (msg: string, options?: MessageOptions) => any
  closeAll: () => void
}

type MessagePlugin = MessageFn & {
  install: (app: App) => void
}
let instance: any = null
let container: HTMLDivElement | null = null

function initInstance() {
  if (instance) return

  container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(MessageContainer)
  instance = app.mount(container)
}

function showMessage(options: MessageOptions) {
  initInstance()
  return instance.createMessage(options)
}

// 主函数（支持 Message({...})）
interface MessageFn {
  (options: MessageOptions | string): any
  success: (msg: string, options?: MessageOptions) => any
  error: (msg: string, options?: MessageOptions) => any
  warning: (msg: string, options?: MessageOptions) => any
  info: (msg: string, options?: MessageOptions) => any
  closeAll: () => void
}

const Message = (function () {
  const fn = ((options: MessageOptions | string) => {
    if (typeof options === 'string') {
      return showMessage({ message: options })
    }
    return showMessage(options)
  }) as MessageFn

  const createType =
    (type: MessageType) =>
    (message: string, options: MessageOptions = { message: message }) => {
      return showMessage({
        ...options,
        message,
        type,
      })
    }

  fn.success = createType('success')
  fn.error = createType('error')
  fn.warning = createType('warning')
  fn.info = createType('info')

  fn.closeAll = () => {
    initInstance()
    instance.closeAll()
  }

  return fn
})() as MessagePlugin

// 插件安装
Message.install = (app: App) => {
  app.config.globalProperties.$message = Message
}

export default Message
