<template>
  <div class="sidebar">
    <div class="sidebar-title"><i class="iconfont icon-profile"/>&nbsp;博主介绍</div>
    <p>{{ profile }}</p>
  </div>

</template>

<script>
import { getInfo } from '@/api/admin'

export default {
  data() {
    return {
      profile: ''
    }
  },
  created() {
    getInfo().then(response => {
      this.profile = response.data.profile
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

    p {
      padding: 5px 0px;
      line-height: 24px;
      font-size: 14px;
    }
  }

</style>
