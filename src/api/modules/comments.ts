import https from '@/api/index'

const path = '/comments'

export const getCommentsByPostIdApi = (postId: number) => {
  return https.get(`${path}/post/${postId}`)
}

export const createCommentApi = (data: {
  content: string
  email: string
  postId: number
  type?: 'text' | 'doodle'
  imageUrl?: string
  parentId?: number
}) => {
  return https.post(path, data)
}

export const uploadImageApi = (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  return https.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
