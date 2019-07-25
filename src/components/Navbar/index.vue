<template>
  <nav
    ref = "nav"
    class="navbar navbar-expand-lg navbar-light fixed-top"
    style="background-color: rgb(255,255,255); border-bottom: 1px solid #e9e9e9; z-index: 999">
    <div class="container">
      <a class="navbar-brand" href="#" style="color: #ea6f5a; font-weight: bold">Light Blog</a>
      <button class="navbar-toggler" style="outline: none" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span class="navbar-toggler-icon"/>
      </button>
      <div id="navbarResponsive" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto text-center">
          <li :class="{active: currPage === 'home'}" class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li :class="{active: currPage === 'about'}" class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
        <div id="search" class="input-group col-lg-3">
          <input
            v-model="keyword"
            type="text"
            class="form-control"
            placeholder="Search for..."
            style="border-radius: 12px"
            @keyup.enter="handleSearch">
          <span class="input-group-btn">
            <a
              class="btn btn-secondary"
              style="z-index: 100;position: absolute; top: 0; right: 15px; background-color: #ea6f5a; color: #ffffff; border-color: #ea6f5a; border-top-right-radius: 12px; border-bottom-right-radius: 12px; cursor: pointer"
              @click="handleSearch">
              <i class="iconfont icon-search"/>
            </a>
          </span>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    currPage() {
      return this.$root.state.currPage
    }
  },
  methods: {
    handleSearch() {
      if (this.currPage !== 'home') this.$router.push('/home')
      const state = this.$root.state.blogListState // 通过该变量防止先按关键字搜索后按关键词搜索，然后又按相同关键字搜索时页面不刷新问题
      if (state !== 2 && state !== -2) { // 如果前面不是按关键字搜索的话
        this.$root.state.keyword = this.keyword
        this.$root.state.blogListState = 2
      } else if (this.keyword !== this.$root.state.keyword) { // 如果前面是按关键字搜索的且现在关键字改变了，通过置反blogListState触发computed
        this.$root.state.blogListState = -state
        this.$root.state.keyword = this.keyword
      }
    }
  }
}
</script>

<style scoped>
  .form-control:focus {
    border-color: #ea6f5a;
    box-shadow: 0 0 10px rgba(234, 111, 90, 0.4);
    border-radius: 5px;
  }

  .active .nav-link{
    color: #EA6F5A !important;
  }

  a:hover {
    text-decoration: none;
  }
</style>
