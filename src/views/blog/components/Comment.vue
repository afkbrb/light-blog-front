<template>
  <div class="comment-list">
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="reader">
        <div class="avatar-container">
          <a class="avatar">
            <img :src="comment.readerAvatar">
          </a>
        </div>
        <div class="info">
          <a class="name">{{ comment.readerName }}</a>
          <div class="meta"><span>{{ comment.commentDate }}</span></div>
        </div>
      </div>
      <div class="comment-wrapper">
        <p v-html="parseHtml(comment.content) "/>
      </div>
      <a class="reply" @click="reply(comment.id, comment.readerName)">回复</a>
    </div>
  </div>
</template>

<script>
import { fetchCommentListByBlogId } from '@/api/comment'
import parseEmoji from '@/components/Emoji/emoji'

export default {
  props: {
    blogId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: 1,
      size: 5,
      comments: [],
      loading: false,
      threshold: 100,
      isLastPage: false
    }
  },
  computed: {
    add() {
      return this.$root.state.comment.add
    }
  },
  watch: {
    add() {
      this.reload()
    }
  },
  created() {
    this.addMore()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    reply(id, name) {
      this.$root.state.comment.name = name
      this.$root.state.comment.id = id
    },
    addMore() {
      this.loading = true
      fetchCommentListByBlogId(this.blogId, this.page++, this.size).then(response => {
        this.comments = this.comments.concat(response.data.list)
        this.isLastPage = response.data.isLastPage
        this.loading = false
      })
    },
    parseHtml(txt) {
      txt = txt.replace(/\</g, '&lt;')
      txt = txt.replace(/\>/g, '&gt;')
      txt = txt.replace(/\n/g, '<br/>')
      return parseEmoji(txt)
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      if (scrollHeight - scrollTop - clientHeight <= this.threshold && !this.loading && !this.isLastPage) {
        this.addMore()
      }
    },
    reload() {
      this.comments = []
      this.loading = false
      this.isLastPage = false
      this.page = 1
      this.addMore()
    }
  }
}
</script>

<style lang="scss" scoped>

  .comment-list {
    .comment {
      padding: 20px 0 30px;
      border-bottom: 1px solid #f0f0f0;

      .reader {
        margin-bottom: 15px;

        .avatar-container {
          display: inline-block;

          .avatar {
            margin-right: 5px;
            width: 38px;
            height: 38px;
            vertical-align: middle;
            display: inline-block;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .info {
          display: inline-block;
          vertical-align: middle;

          .name {
            font-size: 15px;
            color: #333;
          }

          .meta {
            font-size: 12px;
            color: #969696;

            span {
              margin-right: 6px;
            }
          }

        }
      }

      .comment-wrapper {

        p {
          font-size: 16px;
          margin: 10px 0;
          line-height: 1.5;
          font-size: 16px;
          word-break: break-word !important;
        }
      }

      .reply {
        float: right;
        color: #969696;
        margin-right: 1rem;
        font-size: 0.8rem;
        text-decoration: none;

        &:hover{
          cursor: pointer;
        }
      }

    }
  }

</style>
