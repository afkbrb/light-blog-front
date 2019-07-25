<template>
  <div class="blogger my-4">
    <div class="blogger-figure">
      <img :src="blogger.avatar">
    </div>
    <p class="blogger-nickname">{{ blogger.nickname }}</p>
    <!--<hr>-->
    <div class="blogger-contact">
      <a
        id="qq"
        target="_blank"
        title="QQ交流"
        href="http://wpa.qq.com/msgrd?v=3&uin=2428391347&site=qq&menu=yes"><i
          class="iconfont icon-qq" /></a>
      <a id="github" target="_blank" title="Github" href="https://github.com/afkbrb"><i
        class="iconfont icon-github"/></a>
      <a id="manage" :href="adminUrl" target="_blank" title="后台管理"><i
        class="iconfont icon-admin"/></a>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/admin'

export default {
  data() {
    return {
      blogger: {
        nickname: '',
        profile: '',
        avatar: '',
        email: ''
      },
      adminUrl: process.env.ADMIN_URL
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getInfo().then(response => {
        this.blogger = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .blogger {
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    padding: 0 15px;
    background: #fff;
    margin-bottom: 15px;
  }

  .blogger-figure {
    display: inline-block;
    margin: 20px auto;

    img {
      height: 150px;
      border-radius: 80px;
    }
  }

  .blogger-nickname {
    font-size: 28px;
    font-weight: bold;
    color: #444;
    margin: 0 0 15px 0;
  }

  .blogger-contact {
    padding: 15px;
    padding-top: 5px;

    &> a {
      color: #cbcbcb;
      padding: 0 10px;
    }

    &> a:hover {
      color: #EA6F5A;
    }
  }

  .iconfont {
    font-size: 2rem;
  }

  a {
    text-decoration: none;
  }

</style>
