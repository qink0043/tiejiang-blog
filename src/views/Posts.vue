<template>
  <!-- 页面主体容器：左右分栏 -->
  <div class="max-w-7xl mx-auto px-8 py-28 flex items-start gap-16">
    <!-- ==================== 左侧侧边栏 ==================== -->
    <aside class="w-1/4 sticky top-12">
      <h1 class="text-sm font-black italic tracking-widest text-[#B49579] mb-4">
        SYSTEM_INDEX
      </h1>
      <h2 class="text-6xl font-black italic tracking-tighter mb-12">
        LOG
        <br />
        ARCHIVE.
      </h2>

      <!-- 搜索框 -->
      <div class="relative border-b border-gray-200 pb-2 mb-12">
        <input
          type="text"
          placeholder="SEARCH_KEYWORD..."
          class="w-full bg-transparent text-sm font-bold text-gray-700 placeholder-gray-400 focus:outline-none uppercase"
        />
        <!-- 搜索图标占位 -->
        <span class="absolute right-0 top-0 text-gray-300">🔍</span>
      </div>

      <!-- 分类列表 -->
      <div class="flex flex-col gap-4">
        <!-- 激活状态的分类 -->
        <div
          class="flex justify-between items-center border-b border-[#B49579] pb-2 cursor-pointer text-[#B49579]"
        >
          <span class="text-sm font-bold uppercase">All</span>
          <span class="w-2 h-2 bg-[#B49579]"></span>
        </div>
        <!-- 未激活状态的分类 -->
        <div
          class="flex items-center gap-2 pb-2 cursor-pointer text-gray-400 hover:text-black transition-colors group"
        >
          <span
            class="text-sm font-bold uppercase group-hover:translate-x-1 transition-transform"
          >
            Frontend
          </span>
          <span class="text-xs font-mono ml-auto">12</span>
        </div>
        <div
          class="flex items-center gap-2 pb-2 cursor-pointer text-gray-400 hover:text-black transition-colors group"
        >
          <span
            class="text-sm font-bold uppercase group-hover:translate-x-1 transition-transform"
          >
            Life Log
          </span>
          <span class="text-xs font-mono ml-auto">05</span>
        </div>
      </div>

      <!-- 标签云 -->
      <div class="mt-12 flex flex-wrap gap-2">
        <span
          class="border border-gray-200 text-gray-500 text-xs px-3 py-1 cursor-pointer hover:bg-black hover:text-white hover:border-black transition-all"
        >
          #Vue3
        </span>
        <span
          class="border border-gray-200 text-gray-500 text-xs px-3 py-1 cursor-pointer hover:bg-black hover:text-white hover:border-black transition-all"
        >
          #Tailwind
        </span>
        <span
          class="border border-gray-200 text-gray-500 text-xs px-3 py-1 cursor-pointer hover:bg-black hover:text-white hover:border-black transition-all"
        >
          #Design
        </span>
      </div>
    </aside>

    <!-- ==================== 右侧文章列表 ==================== -->
    <main class="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 mt-32">
      <template v-for="post in postList">
        <PostCard :post="post" />
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getPostsListApi } from '@/api/modules/posts'
import type { PostInfo } from '@/types/post'
import { onMounted, ref } from 'vue'
import PostCard from '@/components/PostCard/PostCard.vue'

const postList = ref<PostInfo[]>()

onMounted(async () => {
  console.log('列表组件挂载')

  try {
    const res = await getPostsListApi({})

    postList.value = res.items
    console.log(postList.value)
  } catch {}
})
</script>
