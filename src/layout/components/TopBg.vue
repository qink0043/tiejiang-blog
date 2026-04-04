<template>
  <!-- 顶部封面 -->
  <div
    class="w-full h-[400px] mx-auto mb-10 animate-fade-in animation-delay-400 overflow-hidden relative before:bg-[url(./assets/mask.png)] before:opacity-50 before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0"
  >
    <img :src="bg.url" :alt="bg.title" class="w-full h-full object-cover" />
  </div>
</template>
<script setup lang="ts">
import homeImg from '@/assets/home.png' 
defineProps({
  bg: {
    type: Object,
    default: () => ({
      url: homeImg,
      title: '',
    }),
  },
})
</script>
