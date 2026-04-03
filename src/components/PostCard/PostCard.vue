<template>
  <!-- 文章卡片 1 -->
  <article class="group cursor-pointer" @click="goToPostDetail(post.id)">
    <!-- 封面图容器，带溢出隐藏和比例 -->
    <div class="overflow-hidden aspect-[4/3] bg-gray-100 mb-6">
      <img
        :src="post.cover"
        class="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
      />
    </div>

    <!-- 文章信息 -->
    <div class="flex flex-col gap-3">
      <div
        class="flex justify-between items-center text-xs font-mono text-gray-400"
      >
        <span class="text-[#B49579]">{{ post.createdAt }}</span>
        <span>{{ post.category }} / {{ post.readingTime }} 分钟阅读</span>
      </div>

      <!-- 标题 -->
      <h3
        class="text-2xl font-black leading-tight tracking-tight text-gray-900 group-hover:underline decoration-4 underline-offset-4 decoration-[#B49579]"
      >
        {{ post.title }}
      </h3>

      <!-- 摘要 -->
      <p class="text-gray-500 text-sm leading-relaxed line-clamp-3 mt-1">
        {{ post.content }}
      </p>

      <!-- 互动数据 -->
      <div class="flex gap-5 mt-2 text-xs font-mono text-gray-400">
        <span class="flex items-center gap-1">
          <i class="icon-eye">👁</i>
          {{ post.viewCount }}
        </span>
        <span class="flex items-center gap-1">
          <i class="icon-comment">💬</i>
          {{ post.commentCount }}
        </span>
        <span class="flex items-center gap-1">
          <i class="icon-heart">🤍</i>
          {{ post.likeCount }}
        </span>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import type { PostInfo } from '@/types/post'
import { useRouter } from 'vue-router'

defineProps<{
  post: PostInfo
}>()

const router = useRouter()

// 前往文章详情
const goToPostDetail = (postId: number) => {
  router.push(`/post/${postId}`)
}
</script>
