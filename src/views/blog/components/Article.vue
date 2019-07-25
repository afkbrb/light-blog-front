<template>
  <div id="article" class="article">
    <h1 id="title" class="title"> {{ blog.title }}</h1>
    <div v-if="blog.typeName !== '原创' && blog.originalUrl" class="origin-wrapper">
      <a v-if="blog.typeName === '转载'" :href="blog.originalUrl" target="_blank" class="origin">转自{{ blog.originalUrl }}</a>
      <a v-if="blog.typeName === '翻译'" :href="blog.originalUrl" target="_blank" class="origin">译自{{ blog.originalUrl }}</a>
    </div>
    <div class="content markdown-body" v-html="content"/>
    <div class="copyright"><i class="fa fa-copyright"/>欢迎转载，请注明出处</div>
    <div style="text-align: center; margin-top: 40px">
      <button id="like-btn" class="btn btn-like" @click="addLike">喜欢 {{ blog.likeCount }}</button>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import '@/assets/styles/github-md.css'
import { fetchBlog, addBlogLike, addBlogClick } from '@/api/blog'

export default {
  props: {
    blogId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      blog: {
        id: '',
        title: '',
        summary: '',
        createDate: '',
        updateDate: '',
        clickCount: '',
        commentCount: '',
        likeCount: '',
        tag: '',
        blogImage: '',
        originalUrl: '',
        content: '',
        typeName: ''
      },
      content: '',
      cookieKey: 'LIKE_BLOG_' + this.blogId
    }
  },
  watch: {
    blogId() {
      this.fetchData()
    }
  },
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    this.fetchData()
    this.addClick() // 添加点击数
  },
  methods: {
    fetchData() {
      fetchBlog(this.blogId).then(response => {
        this.blog = response.data
        this.content = marked(this.blog.content)
      })
    },
    addClick() {
      addBlogClick(this.blogId)
    },
    addLike() {
      if (Cookie.get(this.cookieKey)) return
      addBlogLike(this.blogId).then(response => {
        this.blog.likeCount += 1
        Cookie.set(this.cookieKey, 1)
      })
    }
  }
}
</script>

<style lang="scss">

  .article {
    position: relative;
    display: block;
    padding-bottom: 60px;

    .title {
      word-break: break-word;
      margin: 20px 0 40px 0;
      font-size: 34px;
      text-align: center;
      font-weight: 700;
      line-height: 1.3;
      font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .origin-wrapper {
      float: right;

      .origin{
        font-size: 0.75rem;
        font-weight: 500;
        color: #bcbcbc;

        &:hover{
          text-decoration: none;
        }

      }
    }

    .content {
      word-wrap: break-word;
      word-break: normal;
      padding: 0;

      a:hover{
        color: #0366d6
      }

      img {
        max-width: 100%;
      }

    }

    .copyright {
      position: absolute;
      right: 5px;
      bottom: 5px;
      color: #c8c8c8;
      font-size: 12px;
    }

    .btn-like {
      padding: 8px 25px;
      font-size: 16px;
      color: #fff;
      background-color: #ea6f5a;
      border-radius: 20px;
      border: none;

      &:hover {
        color: #fff;
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
      }

    }
  }

</style>
