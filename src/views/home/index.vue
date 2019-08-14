<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-md-8">

        <div class="carousel-wrapper">
          <lb-carousel/>
        </div>
        <!-- 文章列表模块 -->
        <div class="blog-list-wrapper">
          <lb-blog-list/>
        </div>

      </div>

      <!-- Sidebar -->
      <div v-if="!isMobile" class="col-md-4">

        <div class="blogger-wrapper">
          <lb-blogger/>
        </div>

        <div class="profile-wrapper">
          <lb-profile/>
        </div>

        <div class="blog-tag-wrapper">
          <lb-blog-tag/>
        </div>

        <div class="sort-wrapper">
          <lb-sort/>
        </div>

        <div class="project-wrapper">
          <lb-project/>
        </div>

        <div class="link-wrapper">
          <lb-link/>
        </div>
      </div>
    </div>
    <lb-footer/>
  </div>
</template>

<script>
import carousel from './components/Carousel'
import blogList from './components/BlogList'
import blogTag from './components/BlogTag'
import blogger from './components/Blogger'
import profile from './components/Profile'
import link from './components/Link'
import sort from './components/Sort'
import project from './components/Project'
import footer from './components/Footer'

export default {
  components: {
    lbCarousel: carousel,
    lbBlogList: blogList,
    lbBlogger: blogger,
    lbProfile: profile,
    lbBlogTag: blogTag,
    lbSort: sort,
    lbLink: link,
    lbProject: project,
    lbFooter: footer
  },
  data() {
    return {
      isMobile: false
    }
  },
  created() {
    this.$root.state.currPage = 'home'
  },
  mounted() {
    this.isMobile = window.matchMedia('(max-width:768px)').matches
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 72px;
    min-height: 100vh;

    .carousel-wrapper{
      margin-bottom: 1.2rem;
    }
  }

</style>
