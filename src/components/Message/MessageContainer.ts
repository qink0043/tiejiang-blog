import { defineComponent, h, ref } from 'vue'
import type { MessageOptions } from './type'

let seed = 0

export default defineComponent({
  name: 'MessageContainer',

  setup(_, { expose }) {
    const messages = ref<any[]>([])

    const createMessage = (options: MessageOptions) => {
      const id = seed++

      const item = {
        id,
        ...options,
        type: options.type || 'info',
        duration: options.duration ?? 3000,
        show: false,
      }

      messages.value.push(item)

      setTimeout(() => (item.show = true))

      if (item.duration! > 0) {
        setTimeout(() => close(id), item.duration)
      }

      return {
        id,
        close: () => close(id),
      }
    }

    const close = (id: number) => {
      const item = messages.value.find((m) => m.id === id)
      if (!item) return

      item.show = false

      setTimeout(() => {
        messages.value = messages.value.filter((m) => m.id !== id)
        item.onClose?.()
      }, 300)
    }

    const closeAll = () => {
      messages.value.forEach((m) => (m.show = false))
      setTimeout(() => (messages.value = []), 300)
    }

    // ✅ 暴露方法
    expose({
      createMessage,
      close,
      closeAll,
    })

    return () =>
      h(
        'div',
        { class: 'message-container' },
        messages.value.map((item) =>
          h(
            'div',
            {
              key: item.id,
              class: [
                'message-item',
                `message-${item.type}`,
                item.show ? 'show' : '',
              ],
            },
            item.message,
          ),
        ),
      )
  },
})
