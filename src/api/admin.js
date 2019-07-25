import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/admin/detail',
    method: 'get'
  })
}
