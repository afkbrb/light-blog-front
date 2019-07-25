<template>
  <div class="sidebar">
    <div class="sidebar-title"><i class="iconfont icon-project"/>&nbsp;我的项目</div>
    <ul class="ul-project">
      <li v-for="project in projects" :key="project.id">
        <a :href="project.url">
          <img v-if="project.image" :src="project.image" class="img">
          <img v-else src="@/assets/imgs/project.png" class="img">
          {{ project.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchProjectList } from '@/api/project'

export default {
  data() {
    return {
      projects: [
        {
          id: '',
          name: '',
          url: '',
          image: '',
          projectOrder: ''
        }
      ],
      page: 1,
      size: 999
    }
  },
  created() {
    fetchProjectList(this.page, this.size).then(response => {
      this.projects = response.data.list
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
      padding-top: 0.625rem;

      li {
        list-style: none;
        margin: 3px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;

        a {
          text-decoration: none;
          font-size: 1rem;
          color: #000000;

          .img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 6px;
            vertical-align: middle;
            margin-right: 1rem;
          }
        }

        a:hover {
          color: #6d6d6d;
        }
      }
    }

    ul-project {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }

</style>
