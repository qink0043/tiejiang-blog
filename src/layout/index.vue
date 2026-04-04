<template>
  <div
    class="min-h-screen flex flex-col transition-opacity duration-1000"
    :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
  >
    <Navbar />
    <TopBg :bg="bgImage" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }" :key="route.fullPath">
        <transition
          enter-active-class="transform transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translateY(20px)"
          enter-to-class="opacity-100 translateY(0)"
          leave-active-class="transform transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translateY(0)"
          leave-to-class="opacity-0 -translateY(20px)"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Navbar from '@/layout/components/Navbar.vue'
import TopBg from '@/layout/components/TopBg.vue'
import { onMounted, ref, computed } from 'vue'
import Footer from './components/Footer.vue'
import { useLayoutStore } from '@/stores/layout'
import homeImg from '@/assets/home.png'
import { useRoute } from 'vue-router'

const route = useRoute()
const layoutStore = useLayoutStore()
const isLoaded = ref(false)

const bgImage = computed(() => {
  return layoutStore.topBgImage
    ? { url: layoutStore.topBgImage, title: '' }
    : { url: homeImg, title: '' }
})

onMounted(() => {
  isLoaded.value = true
})
</script>
