export interface CommentInfo {
  id: number
  content: string
  email: string
  type: 'text' | 'doodle'
  imageUrl?: string
  createdAt: string
  updatedAt: string
  author?: {
    id: number
    username: string
  }
  parentId?: number
  children?: CommentInfo[]
}
