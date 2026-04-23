<template>
  <div v-if="post" class="animate-fade-in relative">
    <!-- 顶部封面 -->

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
          {{ post.authorInfo?.username }}
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
              <div class="text-xl font-bold dark:text-white">作者：老铁匠</div>
            </div>
          </div>
        </footer>

        <!-- Comment Section -->
        <section
          class="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800"
        >
          <h2 class="text-2xl font-black mb-10 dark:text-white">
            评论 ({{ comments.length }})
          </h2>

          <!-- 评论表单 -->
          <div
            class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sm:p-8 mb-12 border border-slate-200 dark:border-slate-800"
          >
            <h3 class="text-lg font-bold mb-6 dark:text-white">发表评论</h3>

            <!-- 评论类型切换 -->
            <div class="flex gap-2 mb-6">
              <button
                @click="commentType = 'text'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-semibold transition',
                  commentType === 'text'
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600',
                ]"
              >
                文字评论
              </button>
              <button
                @click="commentType = 'doodle'"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-semibold transition',
                  commentType === 'doodle'
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600',
                ]"
              >
                涂鸦评论
              </button>
            </div>

            <form @submit.prevent="handleSubmitComment" class="space-y-4">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  邮箱
                </label>
                <input
                  id="email"
                  v-model="commentForm.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              <!-- 文字评论 -->
              <div v-if="commentType === 'text'">
                <label
                  for="content"
                  class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  评论内容
                </label>
                <textarea
                  id="content"
                  v-model="commentForm.content"
                  required
                  rows="4"
                  placeholder="写下你的评论..."
                  :class="[
                    'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none',
                    contentFocused ? '' : 'bg-[url(@/assets/comment_bg.png)] bg-no-repeat bg-right-bottom',
                  ]"
                  @focus="contentFocused = true"
                  @blur="contentFocused = false"
                ></textarea>
              </div>

              <!-- 涂鸦评论 -->
              <div v-if="commentType === 'doodle'">
                <label
                  class="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  涂鸦内容
                </label>
                <DoodleBoard ref="doodleRef" v-model="doodleData" />
                <p class="mt-2 text-xs text-slate-400">在画布上绘制你的涂鸦，完成后点击提交</p>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                >
                  {{ submitting ? '提交中...' : '提交评论' }}
                </button>
              </div>
            </form>
          </div>

          <!-- 评论列表 -->
          <div v-if="comments.length" class="space-y-6">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 font-bold text-sm"
                >
                  {{ comment.email.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="text-sm font-semibold dark:text-white">
                    {{ maskEmail(comment.email) }}
                  </div>
                  <div class="text-xs text-slate-400">
                    {{ formatDate(comment.createdAt) }}
                  </div>
                </div>
                <span
                  v-if="comment.type === 'doodle'"
                  class="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 font-medium"
                >
                  涂鸦
                </span>
              </div>
              <!-- 文字评论内容 -->
              <p
                v-if="comment.type === 'text'"
                class="text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                {{ comment.content }}
              </p>
              <!-- 涂鸦评论图片 -->
              <div v-else-if="comment.type === 'doodle' && comment.imageUrl" class="mt-2">
                <img
                  :src="comment.imageUrl"
                  alt="涂鸦评论"
                  class="max-w-full rounded-xl border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-slate-400">
            暂无评论，来发表第一条评论吧
          </div>
        </section>
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
import { ref, watch, onUnmounted } from 'vue'
import type { PostInfo } from '@/types/post'
import type { CommentInfo } from '@/types/comment'
import { getPostDetailApi } from '@/api/modules/posts'
import {
  getCommentsByPostIdApi,
  createCommentApi,
  uploadImageApi,
} from '@/api/modules/comments'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import DoodleBoard from '@/components/DoodleBoard/DoodleBoard.vue'

const route = useRoute()
const layoutStore = useLayoutStore()

const post = ref<PostInfo>()
const postId = ref(route.params.id)
const comments = ref<CommentInfo[]>([])
const submitting = ref(false)
const contentFocused = ref(false)
const commentType = ref<'text' | 'doodle'>('text')
const doodleData = ref('')
const doodleRef = ref<InstanceType<typeof DoodleBoard>>()

const commentForm = ref({
  email: '',
  content: '',
})

const maskEmail = (email: string) => {
  const [local, domain] = email.split('@')
  if (!domain) return email
  if (local.length <= 2) return local + '@' + domain
  return local.charAt(0) + '***' + local.charAt(local.length - 1) + '@' + domain
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fetchComments = async (id: number) => {
  try {
    const res = await getCommentsByPostIdApi(id)
    comments.value = res
  } catch (error) {
    console.log(error)
  }
}

const dataURLtoFile = (dataURL: string, filename: string) => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const handleSubmitComment = async () => {
  if (submitting.value) return
  submitting.value = true
  try {
    if (commentType.value === 'text') {
      if (!commentForm.value.content.trim()) return
      await createCommentApi({
        content: commentForm.value.content,
        email: commentForm.value.email,
        postId: Number(postId.value),
        type: 'text',
      })
      commentForm.value.content = ''
    } else {
      if (!doodleData.value) return
      const file = dataURLtoFile(doodleData.value, `doodle_${Date.now()}.png`)
      const uploadRes = await uploadImageApi(file) as any
      await createCommentApi({
        content: '涂鸦评论',
        email: commentForm.value.email,
        postId: Number(postId.value),
        type: 'doodle',
        imageUrl: uploadRes.imageUrl,
      })
      doodleRef.value?.clearCanvas()
      doodleData.value = ''
    }
    await fetchComments(Number(postId.value))
  } catch (error) {
    console.log(error)
  } finally {
    submitting.value = false
  }
}

// 获取文章详情
const fetchPostDetail = async (postId: string) => {
  try {
    const res = await getPostDetailApi(Number(postId))
    console.log(res)

    post.value = res
    console.log(post.value)

    // 设置顶部封面图片
    if (post.value?.cover && layoutStore.topBgImage !== post.value?.cover) {
      layoutStore.setTopBgImage(post.value.cover)
    }
  } catch (error) {
    console.log(error)
  }
}

// 监听路由参数变化
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      console.log('newId', newId)
      console.log('oldId', oldId)

      postId.value = newId
      await fetchPostDetail(newId as string)
      await fetchComments(Number(newId))
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  // 清除封面图片，避免影响其他页面
  layoutStore.clearTopBgImage()
})
</script>
