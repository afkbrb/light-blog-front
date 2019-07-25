import request from '@/utils/request'
import qs from 'qs'

export function fetchBlog(id) {
  return request({
    url: '/blog/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchBlogList(page, size) {
  return request({
    url: '/blog/list',
    params: { page, size }
  })
}

export function fetchBlogListByKeyword(keyword, page, size) {
  return request({
    url: '/blog/search',
    params: { keyword, page, size }
  })
}

export function fetchBlogListByTagId(tagId, page, size) {
  return request({
    url: '/blog/list/tag',
    params: { tagId, page, size }
  })
}

export function fetchBlogListOrderByClick(page, size) {
  return request({
    url: '/blog/list/click',
    params: { page, size }
  })
}

export function fetchBlogListOrderByLike(page, size) {
  return request({
    url: '/blog/list/like',
    params: { page, size }
  })
}

export function fetchBlogListOrderByComment(page, size) {
  return request({
    url: '/blog/list/comment',
    params: { page, size }
  })
}

export function addBlogLike(blogId) {
  return request({
    url: '/blog/like/add',
    method: 'post',
    data: qs.stringify({ blogId })
  })
}

export function addBlogClick(blogId) {
  return request({
    url: '/blog/click/add',
    method: 'post',
    data: qs.stringify({ blogId })
  })
}

