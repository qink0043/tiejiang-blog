<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'
import { MagnifyingGlassIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'

const blogStore = useBlogStore()
const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = computed(() => {
  return ['All', ...Object.keys(blogStore.postsByCategory)]
})

const filteredPosts = computed(() => {
  return blogStore.posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'All' ||
      post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="px-6 lg:px-12 pt-40 pb-40 min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <!-- Sidebar Filters: Break Symmetry -->
      <aside class="lg:col-span-3 space-y-12 animate-reveal">
        <header class="space-y-4">
          <div
            class="text-[10px] font-black tracking-[0.4em] text-accent uppercase italic"
          >
            System_Index
          </div>
          <h1 class="text-5xl font-black italic uppercase italic leading-none">
            Log
            <br />
            Archive.
          </h1>
          <p
            class="text-xs font-mono text-primary-400 leading-relaxed pt-4 border-t border-primary-100 dark:border-primary-800"
          >
            [STATUS: STABLE]
            <br />
            [ENTRIES: {{ blogStore.posts.length }}]
            <br />
            针对内核演进、架构设计及生产环境调试的离散记录。
          </p>
        </header>

        <!-- Search input -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="SEARCH_KEYWORD..."
            class="w-full bg-transparent border-b-2 border-primary-200 dark:border-primary-800 py-4 font-black uppercase text-sm outline-none focus:border-accent transition-colors"
          />
          <MagnifyingGlassIcon
            class="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-primary-400"
          />
        </div>

        <!-- Category Menu -->
        <nav class="flex flex-col gap-4">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="group flex items-center justify-between text-left transition-all"
          >
            <span
              :class="[
                'text-xs font-black uppercase tracking-widest',
                selectedCategory === cat
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-primary-400 hover:text-primary-950 dark:hover:text-white',
              ]"
            >
              {{ cat }}
            </span>
            <span
              v-if="selectedCategory === cat"
              class="w-2 h-2 bg-accent opacity-50"
            ></span>
          </button>
        </nav>
      </aside>

      <!-- Main Content: Posts -->
      <main class="lg:col-span-9">
        <transition-group
          tag="div"
          enter-active-class="animate-reveal"
          class="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
        </transition-group>

        <!-- No Results -->
        <div
          v-if="filteredPosts.length === 0"
          class="py-40 opacity-20 text-left"
        >
          <ArchiveBoxIcon class="w-32 h-32 stroke-[0.5] mb-8" />
          <h3 class="text-4xl font-black italic uppercase">
            Null_Pointer_Exception
          </h3>
          <p class="font-mono text-sm">
            未能匹配到任何加密存档，请校对输入参数。
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
