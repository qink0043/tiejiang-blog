// 文章操作接口
import https from '@/api/index'
const path = '/posts'
// 获取文章列表
export const getPostsListApi = ({ page = 1, pageSize = 10 }) => {
  return https.get(path, {
    params: {
      page,
      pageSize,
    },
  })
}

// 获取单个文章详情
export const getPostDetailApi = (id: number) => {
  return https.get(`${path}/${id}`)
}
