<template>
  <!-- 下翻时隐藏到顶部 -->
  <nav
    class="w-full mx-auto py-4 fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-smooth font-Moon"
    :class="[
      isScrollToBottom ? 'transform -translate-y-full' : '',
      isTop
        ? 'bg-transparent shadow-none text-white'
        : 'bg-white/90 dark:bg-primary-950/90 shadow-[0_1px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.5)]',
    ]"
  >
    <div class="lg:px-12 max-w-7xl mx-auto">
      <div class="flex justify-between items-center">
        <!-- Logo: Asymmetric & Industrial -->
        <router-link to="/" class="group flex items-center gap-4">
          <div
            class="text-2xl font-bold tracking-wider transition-all duration-300 ease-smooth"
          >
            老铁匠
          </div>
        </router-link>

        <!-- Desktop Nav: No perfect center -->
        <div class="hidden md:flex items-center gap-12">
          <div class="flex items-center gap-8">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="text-base font-black tracking-widest transition-all duration-300 ease-smooth hover:text-accent transform hover:-translate-y-1"
            >
              {{ link.name }}
            </router-link>
          </div>

          <div class="h-8 w-px bg-primary-200 dark:bg-primary-800"></div>

          <button
            @click="toggleDarkMode"
            class="relative w-10 h-10 border border-primary-200 dark:border-primary-800 flex items-center justify-center transition-all hover:border-accent group"
          >
            <SunIcon
              v-if="isDark"
              class="w-4 h-4 text-accent transition-transform group-hover:rotate-12"
            />
            <MoonIcon
              v-else
              class="w-4 h-4 text-primary-600 dark:text-primary-400 transition-transform group-hover:-rotate-12"
            />
          </button>
        </div>

        <!-- Mobile toggle -->
        <div class="md:hidden flex items-center gap-4">
          <button
            @click="toggleDarkMode"
            class="w-10 h-10 border border-primary-200 dark:border-primary-800 flex items-center justify-center"
          >
            <SunIcon v-if="isDark" class="w-4 h-4 text-accent" />
            <MoonIcon
              v-else
              class="w-4 h-4 text-primary-600 dark:text-primary-400"
            />
          </button>
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-10 h-10 bg-primary-950 dark:bg-white text-white dark:text-primary-950 flex items-center justify-center"
          >
            <XMarkIcon v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Bars3Icon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu: Raw Style -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden animate-reveal bg-white/95 dark:bg-primary-950/95 backdrop-blur-md border-t border-primary-950 dark:border-white mt-2"
    >
      <div class="flex flex-col p-6 space-y-6">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          class="text-4xl font-black italic uppercase tracking-tighter text-primary-950 dark:text-white"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const isDark = ref(false)
const isMobileMenuOpen = ref(false)
const isTop = ref(true)
const isScrollToBottom = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const navLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/posts' },
  { name: '留言板', path: '/message' },
  { name: '关于', path: '/about' },
]

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  let lastScrollY = window.scrollY

  const onScroll = () => {
    const currentScrollY = window.scrollY
    isTop.value = currentScrollY < 200
    if (currentScrollY > lastScrollY) {
      isScrollToBottom.value = true
    } else {
      isScrollToBottom.value = false
    }
    lastScrollY = currentScrollY
  }
  window.addEventListener('scroll', onScroll)
})
</script>
