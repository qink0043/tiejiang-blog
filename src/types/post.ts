export interface PostInfo {
  id: number
  title: string
  summary: string
  cover: string
  content: string
  author: string
  category: string
  tags: PostTagInfo[]
  createdAt: string
  viewCount: number
  commentCount: number
  likeCount: number
  readingTime: number
}

export interface PostTagInfo {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}
