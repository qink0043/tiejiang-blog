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
  const posts = ref<Post[]>([
    {
      id: '1',
      title: '使用 Vue 3 和 Tailwind CSS 构建个人博客',
      summary:
        '本篇文章深入浅出地讲解了如何从零开始利用 Vue 3 的组合式 API 和强大的 Tailwind CSS 框架，构建一个现代感十足、高性能且完全响应式的个人博客项目。',
      content: `# 使用 Vue 3 和 Tailwind CSS 构建个人博客
      
这是一篇关于如何构建博客的样板文章。在这里我们可以展示 **Vue 3** 的强大之处，以及 **Tailwind CSS** 的极速开发体验。

### 核心特性
- **Vue 3 Composition API**: 逻辑复用更简单。
- **Tailwind CSS**: 实用型优先的 CSS 框架。
- **Markdown 支持**: 适合开发者写作。

\`\`\`javascript
const greeting = "Hello, Vue 3!";
console.log(greeting);
\`\`\`

> 开发个人博客不仅仅是为了展示作品，更是一个不断学习和巩固技术的过程。
`,
      author: '铁匠',
      category: '前端开发',
      tags: ['Vue 3', 'Tailwind', 'TypeScript'],
      publishedAt: '2026-03-21',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      readMinutes: 5,
    },
    {
      id: '2',
      title: '掌握 TypeScript 的 10 个进阶技巧',
      summary:
        '探讨 TypeScript 在大型项目中的最佳实践，包括泛型约束、条件类型、模板字面量类型等高阶特性，助你写出更健壮的代码。',
      content: '# 进阶 TypeScript 技巧\n\nTypeScript 正在改变前端开发的格局...',
      author: '铁匠',
      category: '后端开发',
      tags: ['TypeScript', '编程'],
      publishedAt: '2026-03-20',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200',
      readMinutes: 8,
    },
  ])

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
