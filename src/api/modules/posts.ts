import https from '@/api/index'

// 获取文章列表
export const getPostsListApi = ({ page = 1, pageSize = 10 }) => {
  return https.get('/posts', {
    params: {
      page,
      pageSize,
    },
  })
}
