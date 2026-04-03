<template>
  <div v-if="post" class="animate-fade-in relative">
    <!-- 顶部封面 -->
    <div
      class="w-full h-[400px] mx-auto mb-20 animate-fade-in animation-delay-400 bg-black overflow-hidden"
    >
      <img
        :src="post.cover"
        :alt="post.title"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- 文章头部 -->
    <header class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <div class="mb-4 flex justify-center flex-wrap gap-2 animate-slide-up">
        <span class="tag">
          {{ post.category }}
        </span>
        <span
          v-for="tag in post.tags"
          :key="tag.id"
          class="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400"
        >
          #{{ tag.name }}
        </span>
      </div>

      <h1
        class="text-4xl md:text-6xl font-black mb-10 leading-[1.15] dark:text-white animate-slide-up animation-delay-200"
      >
        {{ post.title }}
      </h1>

      <div
        class="flex items-center justify-center space-x-8 text-sm text-slate-500 animate-slide-up animation-delay-200"
      >
        <div class="flex items-center">
          <UserIcon class="w-5 h-5 mr-2" />
          {{ post.author }}
        </div>
        <div class="flex items-center">
          <CalendarIcon class="w-5 h-5 mr-2" />
          {{ post.createdAt }}
        </div>
        <div class="flex items-center">
          <ClockIcon class="w-5 h-5 mr-2" />
          {{ post.readingTime }} 分钟阅读
        </div>
      </div>
    </header>
    <!-- 返回文章列表 -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <router-link
        to="/posts"
        class="inline-flex items-center text-slate-500 hover:text-primary-500 transition-colors font-medium group"
      >
        <ArrowLeftIcon
          class="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform"
        />
        返回文章列表
      </router-link>
    </div>

    <!-- Article Body -->
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 relative"
    >
      <!-- Article Nav Sidebar (Desktop) -->
      <aside class="hidden lg:block w-1/5 order-2">
        <div
          class="sticky top-32 space-y-12 animate-fade-in animation-delay-600"
        >
          <div class="space-y-6">
            <h4
              class="text-xs font-bold uppercase tracking-widest text-slate-400 border-b pb-4 dark:border-slate-800"
            >
              文章操作
            </h4>
            <div class="flex flex-col gap-4">
              <button
                class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"
              >
                <BookmarkIcon class="w-5 h-5" />
                点赞
              </button>
              <button
                class="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"
              >
                <ShareIcon class="w-5 h-5" />
                转发分享
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Content -->
      <article class="flex-1 order-1 lg:max-w-3xl lg:mx-auto">
        <div
          class="prose prose-slate prose-lg dark:prose-dark max-w-none animate-slide-up animation-delay-400 prose-headings:font-black prose-a:text-primary-500 prose-blockquote:border-primary-500 prose-img:rounded-3xl prose-img:shadow-2xl"
          v-html="renderMarkdown(post.content)"
        ></div>

        <!-- Bio / Author Card -->
        <footer
          class="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800 animate-fade-in animation-delay-600"
        >
          <div
            class="glass p-10 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-8 bg-slate-50 dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <img
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=200"
              alt="铁匠"
              class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
            />
            <div class="text-center sm:text-left space-y-3">
              <div class="text-xl font-bold dark:text-white">作者：铁匠</div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center pt-20">
    <div class="text-center space-y-6">
      <h2 class="text-3xl font-bold">抱歉，无法找到该文章 😔</h2>
      <router-link to="/posts" class="btn-primary">
        返回首页浏览更多
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { renderMarkdown } from '../utils/markdown'
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import type { PostInfo } from '@/types/post'
import { getPostDetailApi } from '@/api/modules/posts'
import { useRoute } from 'vue-router'

const route = useRoute()

const post = ref<PostInfo>()

onMounted(async () => {
  const postId = route.params.id
  try {
    const res = await getPostDetailApi(Number(postId))
    console.log(res)

    post.value = res
    console.log(post.value)
  } catch (error) {
    console.log(error)
  }
})
</script>
