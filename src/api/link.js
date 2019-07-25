import request from '@/utils/request'

export function fetchLink(id) {
  return request({
    url: '/link/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchLinkList(page, size) {
  return request({
    url: '/link/list',
    params: { page, size }
  })
}
