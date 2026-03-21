<script setup lang="ts">
import type { Post } from '../stores/blog'
import { CalendarIcon, ClockIcon } from '@heroicons/vue/24/outline'

defineProps<{
  post: Post
  compact?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'card-raw flex flex-col',
      compact
        ? 'lg:flex-row gap-6 p-4 animate-content-fade'
        : 'p-6 animate-reveal',
    ]"
  >
    <!-- Thumbnail -->
    <div
      :class="[
        'relative overflow-hidden shrink-0 border border-primary-100 dark:border-primary-800',
        compact ? 'w-24 h-24 lg:w-32 lg:h-32' : 'aspect-[16/8] mb-8',
      ]"
    >
      <img
        :src="post.thumbnailUrl"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div
        v-if="!compact"
        class="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter italic"
      >
        {{ post.category }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 space-y-4">
      <div
        class="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-primary-400"
      >
        <div class="flex items-center">
          <CalendarIcon class="w-3 h-3 mr-1" />
          {{ post.publishedAt }}
        </div>
        <div v-if="!compact" class="flex items-center">
          <ClockIcon class="w-3 h-3 mr-1" />
          {{ post.readMinutes }} MIN_READ
        </div>
      </div>

      <router-link
        :to="`/post/${post.id}`"
        class="block hover:text-accent transition-colors duration-300"
      >
        <h3
          :class="[
            'font-black leading-tight tracking-tight uppercase',
            compact ? 'text-sm' : 'text-2xl lg:text-3xl italic',
          ]"
        >
          {{ post.title }}
        </h3>
      </router-link>

      <p
        v-if="!compact"
        class="text-primary-700 dark:text-primary-400 text-sm leading-relaxed line-clamp-2 max-w-lg no-center"
      >
        {{ post.summary }}
      </p>

      <!-- Tags -->
      <div v-if="!compact" class="flex flex-wrap gap-3 pt-4 opacity-60">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-[10px] font-bold uppercase tracking-widest border-b-2 border-primary-200 dark:border-primary-800"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
