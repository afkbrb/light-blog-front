<template>
  <footer>
    <div>
      <p>Copyright &copy; Light Blog 2019</p>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  /* 大屏幕 */
  @media (min-width: 960px) {
    footer {
      background-color: white;

      div {
        text-align: center;

        p {
          color: #c8c8c8;
          font-size: 1rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      }
    }
  }

  /* 小屏幕 */
  @media (max-width: 960px) {
    footer {
      background-color: white;

      div {
        text-align: center;

        p {
          color: #c8c8c8;
          font-size: 0.625rem;
          margin-top: 0.5em;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
</style>
