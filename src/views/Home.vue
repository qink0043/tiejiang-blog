<template>
  <div class="px-6 lg:px-12 py-12 space-y-40">
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-20">
      <div class="lg:col-span-8 space-y-8 animate-reveal">
        <div class="max-w-xl space-y-6">
          <p
            class="text-xl md:text-2xl font-medium text-primary-400 leading-relaxed border-l-4 border-accent pl-6"
          >
            老铁匠的个人博客。
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/posts" class="btn-action">
              阅读文章
              <ArrowRightIcon class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-16">
      <div
        class="flex items-baseline gap-4 border-b border-primary-100 dark:border-primary-800 pb-4"
      >
        <h2 class="text-2xl font-black animate-content-fade">最近发布</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <!-- 大卡片 -->
        <div class="lg:col-span-6 animate-reveal">
          <PostCard
            v-if="recentPosts[0]"
            :post="recentPosts[0]"
            class="h-full"
          />
        </div>
        <!-- 侧边堆叠 -->
        <div class="lg:col-span-4 space-y-8">
          <div
            v-for="(post, index) in recentPosts.slice(1)"
            :key="post.id"
            class="animate-reveal"
            :style="{ animationDelay: (index + 1) * 150 + 'ms' }"
          >
            <PostCard :post="post" :compact="true" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const blogStore = useBlogStore()
const recentPosts = blogStore.posts.slice(0, 4)
</script>
