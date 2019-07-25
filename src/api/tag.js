import request from '@/utils/request'

export function fetchTag(id) {
  return request({
    url: '/blog/tag/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchTagList(page, size) {
  return request({
    url: '/blog/tag/list',
    params: { page, size }
  })
}
