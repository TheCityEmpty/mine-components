<template>
  <div class="home">
    <div class="content">
      <router-view class="container" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }

}
</script>
<style scoped lang='scss'>
  .home {
    height: 100%;
    .container {
      transition: padding-left ease 0.4s;
      padding-left: 200px;
      padding-top: 85px;
      padding-bottom: 25px;
      padding-right: 10px;
    }
    .content {
      position: relative;
    }
  }
</style>
