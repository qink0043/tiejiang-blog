<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>

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

    <footer
      class="glass border-t border-slate-200 dark:border-slate-800 py-12 mt-auto"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 shadow-lg shadow-primary-500/20"
            ></div>
            <span
              class="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100"
            >
              铁匠
              <span class="text-primary-500">.</span>
              博客
            </span>
          </div>

          <div class="text-sm text-slate-500 dark:text-slate-400 font-medium">
            © 2026 Crafted with ❤️ by
            <span class="text-primary-500 font-bold">铁匠</span>
            . All rights reserved.
          </div>

          <div class="flex items-center space-x-6">
            <a
              href="#"
              class="text-slate-400 hover:text-primary-500 transition-colors"
            >
              Github
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-primary-500 transition-colors"
            >
              Twitter X
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-primary-500 transition-colors"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
