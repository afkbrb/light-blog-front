import request from '@/utils/request'
import qs from 'qs'

export function fetchComment(id) {
  return request({
    url: '/comment/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchCommentList(page, size) {
  return request({
    url: '/comment/list',
    params: { page, size }
  })
}

export function fetchCommentListByBlogId(blogId, page, size) {
  return request({
    url: '/comment/list/blog',
    method: 'get',
    params: { page, size, blogId }
  })
}

export function addComment(data) {
  return request({
    url: '/comment/add',
    method: 'post',
    data: qs.stringify(data)
  })
}
