<script setup lang="ts">
import { useBlogStore } from '../stores/blog'
import PostCard from '../components/PostCard.vue'
import {
  ArrowRightIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  Square3Stack3DIcon,
} from '@heroicons/vue/24/outline'

const blogStore = useBlogStore()
const recentPosts = blogStore.posts.slice(0, 4) // 改变数量以打破三卡片逻辑

const philosophy = [
  {
    title: '逻辑构建 / Logic',
    desc: '追求代码的结构化美感与执行效率。',
    icon: CpuChipIcon,
  },
  {
    title: '工程实践 / Practice',
    desc: '在真实的业务场景中磨练底层能力。',
    icon: CodeBracketSquareIcon,
  },
]
</script>

<template>
  <div class="px-6 lg:px-12 py-12 space-y-40">
    <!-- Hero: 非对称工业排版 -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-20">
      <div class="lg:col-span-8 space-y-8 animate-reveal">
        <h1
          class="text-6xl md:text-9xl font-black leading-none tracking-tighter uppercase italic"
        >
          Forge
          <br />
          <span class="text-raw">The System.</span>
        </h1>
        <div class="max-w-xl space-y-6">
          <p
            class="text-xl md:text-2xl font-medium text-primary-400 leading-relaxed border-l-4 border-accent pl-6"
          >
            这里是铁匠的个人终端。记录从底层编译器到前端工程的全栈演进。不谈方案，只聊实现。
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/posts" class="btn-action">
              READ_POSTS
              <ArrowRightIcon class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4 hidden lg:block pb-12 opacity-20">
        <Square3Stack3DIcon class="w-full h-auto stroke-[0.5]" />
      </div>
    </section>

    <!-- Break the 3-Card: 交错式网格 -->
    <section class="space-y-16">
      <div
        class="flex items-baseline gap-4 border-b border-primary-100 dark:border-primary-800 pb-4"
      >
        <h2
          class="text-2xl font-black uppercase tracking-widest italic animate-content-fade"
        >
          Recent_Logs
        </h2>
        <span
          class="text-xs font-mono text-primary-400 font-bold tracking-tighter"
        >
          [0x0042f]
        </span>
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

    <!-- Philosophy: 无意义废话清理 -->
    <section
      class="grid grid-cols-1 lg:grid-cols-12 gap-20 py-20 bg-primary-950 text-white p-12 skew-slight relative overflow-hidden"
    >
      <div
        class="absolute inset-0 opacity-10 bg-noise pointer-events-none"
      ></div>
      <div class="lg:col-span-5 space-y-6 relative z-10">
        <h2 class="text-4xl font-black italic uppercase italic">
          Core_Protocol.
        </h2>
        <p class="text-primary-300 font-medium leading-relaxed">
          摒弃无意义的术语堆砌。我们关注的是可预测性、高可用性以及代码在处理极端负载时的表现。
        </p>
      </div>
      <div
        class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
      >
        <div v-for="item in philosophy" :key="item.title" class="space-y-4">
          <component
            :is="item.icon"
            class="w-10 h-10 text-accent stroke-[1.5]"
          />
          <h3 class="text-xl font-bold uppercase tracking-tight">
            {{ item.title }}
          </h3>
          <p class="text-primary-400 text-sm leading-relaxed">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
