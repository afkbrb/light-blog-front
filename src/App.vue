<template>
  <div id="app" class="page-full-screen">
    <lb-navbar/>
    <lb-back-to-top/>
    <router-view/>
    <lb-footer/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
import backToTop from '@/components/BackToTop'
import footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    lbNavbar: navbar,
    lbBackToTop: backToTop,
    lbFooter: footer
  }
}
</script>

<style>
  .page-full-screen{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
