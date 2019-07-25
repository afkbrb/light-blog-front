<template>
  <a :class="{'cd-is-visible': visible }" href="#" class="cd-top" @click.prevent="handleClick"><img
    style="width: 48px; height: 48px;"
    src="./top.png"></a>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      threshold: 300,
      scrollTopDuration: 700,
      visible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      this.visible = scrollTop > this.threshold
    },
    handleClick() {
      $('body,html').animate({
        scrollTop: 0
      }, this.scrollTopDuration)
    }
  }
}
</script>

<style scoped>

  .cd-top {
    border: 1px solid #d2e2eb;
    position: fixed;
    bottom: 48px;
    right: 36px;
    overflow: hidden;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  .cd-top.cd-is-visible {
    visibility: visible;
    opacity: 1;
  }

  @media(min-width: 576px){
    .cd-top{
      display: inline-block;
    }
  }

  @media (max-width: 576px) {
    .cd-top{
      display: none;
    }
  }

</style>
