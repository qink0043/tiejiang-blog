import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const topBgImage = ref<string>('')

  function setTopBgImage(url: string) {
    topBgImage.value = url
  }

  function clearTopBgImage() {
    topBgImage.value = ''
  }

  return {
    topBgImage,
    setTopBgImage,
    clearTopBgImage,
  }
})
