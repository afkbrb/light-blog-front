<template>
  <div class="sidebar">
    <div class="sidebar-title"><i class="iconfont icon-sort"/>&nbsp;点击排行</div>
    <ul class="ul-sort">
      <li v-for="n in total" :key="n">
        <span><i
          :class="{
            'badge-danger': n === 1,
            'badge-warning': n === 2,
            'badge-success': n === 3,
            'color-white': n <= 3,
            'color-light': n > 3
          }"
          class="badge">{{ n }}</i></span> &nbsp;&nbsp;
        <router-link :to="'/blog/' + blogs[n - 1].id" target="_blank">{{ blogs[n - 1].title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchBlogListOrderByClick } from '@/api/blog'

export default {
  data() {
    return {
      blogs: [
        {
          id: '',
          title: ''
        }
      ],
      page: 1,
      size: 9,
      total: 0
    }
  },
  created() {
    fetchBlogListOrderByClick(this.page, this.size).then(response => {
      this.blogs = response.data.list
      this.total = (response.data.total < this.size) ? response.data.total : this.size
    })
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    margin-bottom: 10px;
    padding: 15px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;

    &> .sidebar-title {
      border-bottom: 1px solid #ea6f5a;
      font-size: 15px;
      font-weight: 500;
      padding: 0 0 5px 0;
      margin-bottom: 5px;
    }

    ul {
      padding-left: 0;

      li {
        list-style: none;
        margin: 3px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a {
          text-decoration: none;
          font-size: 15px;
          color: #000000;
        }

        a:hover {
          color: #6d6d6d;
        }
      }
    }

     .ul-sort {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .color-white{
      color: #ffffff;
    }

    .color-light{
      color: #676767
    }
  }

</style>
