import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Post {
  id: string
  title: string
  summary: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
  thumbnailUrl: string
  readMinutes: number
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<Post[]>([])

  const getPostById = (id: string) => {
    return posts.value.find((post) => post.id === id)
  }

  const postsByCategory = computed(() => {
    const map: Record<string, Post[]> = {}
    posts.value.forEach((post) => {
      if (!map[post.category]) map[post.category] = []
      map[post.category].push(post)
    })
    return map
  })

  return {
    posts,
    getPostById,
    postsByCategory,
  }
})
