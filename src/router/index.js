import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },

    {
      path: '/home',
      component: () => import('@/views/home')
    },

    {
      path: '/blog/:blogId',
      component: () => import('@/views/blog'),
      // 类型转换，否则会将字符串类型的数字传递给blog组件
      props: (route) => ({ blogId: Number(route.params.blogId) })
    },

    {
      path: '/blog/' + process.env.ABOUT_ID,
      alias: '/about'
    }
  ]
})
