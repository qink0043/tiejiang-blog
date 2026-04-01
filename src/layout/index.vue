<template>
  <div
    class="min-h-screen flex flex-col transition-opacity duration-1000"
    :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
  >
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
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
import { onMounted, ref } from 'vue'
import Footer from './components/Footer.vue'

const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>
