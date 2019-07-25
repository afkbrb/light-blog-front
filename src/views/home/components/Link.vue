<template>
  <div class="sidebar">
    <div class="sidebar-title"><i class="iconfont icon-link"/>&nbsp;友情链接</div>
    <ul class="ul-link">
      <li v-for="link in links" :key="link.id">
        <a :href="link.linkUrl" :title="link.linkName" target="_blank">{{ link.linkName }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchLinkList } from '@/api/link'

export default {
  data() {
    return {
      links: [
        {
          id: '',
          linkUrl: '',
          linkName: ''
        }
      ],
      page: 1,
      size: 100
    }
  },
  created() {
    fetchLinkList(this.page, this.size).then(response => {
      this.links = response.data.list
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

    ul {
      padding-left: 0;

      li {
        list-style: none;
        margin: 3px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a {
          text-decoration: none;
          font-size: 15px;
          color: #000000;
        }

        a:hover {
          color: #6d6d6d;
        }
      }
    }

    .ul-link {
      margin-bottom: 0;

      li {
        display: inline-block;
        margin: 2px 5px;
      }
    }

  }

</style>
