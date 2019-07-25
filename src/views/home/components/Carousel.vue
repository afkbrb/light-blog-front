<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li v-for="n in total" :data-slide-to="n - 1" :key="n" :class="{active: n === 1}" data-target="#carouselExampleIndicators"/>
    </ol>
    <div class="carousel-inner">
      <div v-for="n in total" :key="n" :class="{active: n === 1}" class="carousel-item">
        <a v-if="carouselList[n - 1].url" :href="carouselList[n - 1].url">
          <img :src="carouselList[n - 1].image" class="d-block w-100">
        </a>
        <a v-else href="javascript:void(0)">
          <img :src="carouselList[n - 1].image" class="d-block w-100">
        </a>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"/>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"/>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { fetchCarouselList } from '@/api/carousel'

export default {
  data() {
    return {
      carouselList: [],
      page: 1,
      size: 10,
      total: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      fetchCarouselList(this.page, this.size).then(response => {
        this.carouselList = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .slide img {
    border-radius: 6px;
  }

</style>
