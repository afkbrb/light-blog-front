/**
 * 本项目种全局状态比较少，没必要使用Vuex
 */

export default {
  currPage: 'home',
  keyword: '',
  tagId: undefined,
  blogListState: 0, // 0：获取所有博客；1或-1：按标签获取博客，两个状态是为了使computed能检测到变化；2或-2：按关键字获取博客，两个状态是为了使computed能检测到变化
  comment: {
    id: undefined,
    name: '',
    add: 1 // 用于刷新评论列表
  }
}
