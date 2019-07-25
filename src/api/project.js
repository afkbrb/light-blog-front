import request from '@/utils/request'

export function fetchProject(id) {
  return request({
    url: '/project/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchProjectList(page, size) {
  return request({
    url: '/project/list',
    params: { page, size }
  })
}
