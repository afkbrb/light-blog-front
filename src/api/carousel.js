import request from '@/utils/request'

export function fetchCarousel(id) {
  return request({
    url: '/carousel/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchCarouselList(page, size) {
  return request({
    url: '/carousel/list',
    params: { page, size }
  })
}
