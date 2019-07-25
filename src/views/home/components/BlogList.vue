<template>
  <ul ref="blogList" class="blog-list">
    <li v-for="blog in blogList" :key="blog.id" :class="{'have-img': blog.blogImage}">
      <div class="content">
        <router-link :to="'/blog/' + blog.id" class="title" target="_blank">
          {{ blog.title }}
        </router-link>
        <p class="abstract">
          {{ getSummary(blog.summary) }}
        </p>
        <div class="meta">
          <span><i class="iconfont icon-comment"/> {{ blog.commentCount }}</span>
          <span><i class="iconfont icon-heart"/> {{ blog.likeCount }}</span>
          <span><i class="iconfont icon-eye"/> {{ blog.clickCount }}</span>
        </div>
      </div>
      <router-link v-if="blog.blogImage" :to="'/blog/' + blog.id" class="wrap-img" target="_blank">
        <img :src="blog.blogImage">
      </router-link>
    </li>
  </ul>
</template>

<script>
import { fetchBlogList, fetchBlogListByTagId, fetchBlogListByKeyword } from '@/api/blog'

export default {
  data() {
    return {
      page: 1,
      size: 6,
      isLastPage: false,
      blogList: [],
      summaryMaxLength: 80,
      threshold: 100,
      loading: false
    }
  },
  computed: {
    tagId() {
      return this.$root.state.tagId
    },
    keyword() {
      return this.$root.state.keyword
    },
    state() {
      return this.$root.state.blogListState
    }
  },
  watch: {
    state() {
      this.reset()
      this.addMore()
    }
  },
  created() {
    // summary字数适应屏幕大小
    this.summaryMaxLength = window.matchMedia('(max-width:768px)').matches ? 48 : 80
    this.addMore()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    getSummary(summary) {
      if (summary.length <= this.summaryMaxLength) {
        return summary + '...'
      } else {
        return summary.substring(0, this.summaryMaxLength) + '...'
      }
    },
    async addMore() {
      if (this.isLastPage) return
      this.loading = true
      var data
      if (this.state === 0 || ((this.state === 2 || this.state === -2) && !this.keyword)) {
        data = (await fetchBlogList(this.page++, this.size)).data
      } else if (this.state === 1 || this.state === -1) {
        data = (await fetchBlogListByTagId(this.$root.state.tagId, this.page++, this.size)).data
      } else {
        data = (await fetchBlogListByKeyword(this.$root.state.keyword, this.page++, this.size)).data
      }
      this.isLastPage = data.isLastPage
      this.blogList = this.blogList.concat(data.list)
      this.loading = false
    },
    reset() {
      this.blogList = []
      this.page = 1
      this.isLastPage = false
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      if (scrollHeight - scrollTop - clientHeight <= this.threshold && !this.loading) {
        this.addMore()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .blog-list {
    list-style: none;
    color: #000;
    margin: 0;
    padding: 0;
    width: 100%;

    &:first-child{
      border-top: 1px solid #f0f0f0;
    }

    a {
      cursor: pointer;
      text-decoration: none;
    }

    /* 大屏幕 */
    @media (min-width: 960px) {
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        width: 100%;
        padding: 0.8rem 0;
      }

      .wrap-img {

        img {
          overflow: hidden;
          width: 160px;
          height: 120px;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
        }
      }

      .have-img{

        .content {
          padding-right: 30px;
        }
      }

      .content {
        word-break:break-all;

        .title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 2.0rem;
          color: black;
        }

        .abstract {
          margin: 0 0 8px;
          font-size: 0.9rem;
          line-height: 1.5rem;
          color: #999;
        }

        .meta {
          font-size: 0.9rem;
          font-weight: 400;
          line-height: 1.4rem;

          a {
            margin-right: 10px;
          }

          span {
            color: #999;
            margin-right: 10px;
          }

          .iconfont{
            font-size: 0.9rem;
          }
        }
      }
    }

    /* 小屏幕 */
    @media (max-width: 960px) {
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        width: 100%;
        padding: 6px 0;
        width: 100%;
      }

      .wrap-img{
        img {
          overflow: hidden;
          width: 120px;
          height: 90px;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
        }
      }

      .have-img{
        .content {
          padding-right: 10px;
        }
      }

      .content {
        word-break:break-all;

        .title {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e1e1e;
        }

        .abstract {
          margin: 0.25rem 0 8px;
          font-size: 0.75rem;
          line-height: 1.2rem;
          color: #656565;
        }

        .meta {
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1.2rem;

          a {
            margin-right: 10px;
          }

          span {
            color: #8e8e8e;
            margin-right: 10px;
          }

          .iconfont{
            font-size: 0.8rem;
          }
        }
      }
    }
  }

</style>
