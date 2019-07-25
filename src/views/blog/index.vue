<template>
  <div class="container" style="background-color: #ffffff">
    <div class="row blog-wrapper">
      <div class="article-wrapper">
        <lb-article :blog-id="blogId"/>
      </div>
      <div class="comment-box-wrapper">
        <lb-comment-box :blog-id="blogId"/>
      </div>
      <div class="comment-wrapper">
        <lb-comment :blog-id="blogId"/>
      </div>
    </div>
  </div>
</template>

<script>
import article from './components/Article'
import comment from './components/Comment'
import commentBox from './components/CommentBox'

export default {
  components: {
    lbArticle: article,
    lbComment: comment,
    lbCommentBox: commentBox
  },
  props: {
    blogId: {
      type: Number,
      default: process.env.ABOUT_ID
    }
  },
  created() {
    this.$root.state.currPage = (this.blogId === process.env.ABOUT_ID) ? 'about' : 'blog'
  }
}
</script>

<style lang="scss" scoped>

  .container {
    padding-top: 72px;
    height: 100vh;

    @media (min-width: 960px) {
      .blog-wrapper{
        margin: 0 auto;
        padding: 40px 20px 20px 20px;
        max-width: 720px;
        width: 90%;

      }
    }

    @media (max-width: 960px) {
      .blog-wrapper{
        margin: 0 auto;
        padding: 40px 0px 20px 0px;
        width: 100%;
      }
    }

    .article-wrapper{
      width: 100%;
      margin-bottom: 1.25rem;
    }

    .comment-box-wrapper{
      width: 100%;
    }

    .comment-wrapper{
      width: 100%;
    }
  }

</style>
