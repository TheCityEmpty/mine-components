<template>
  <div class="home">
    <Header>
      <img src="@_img/logo.svg" alt="" style="width: 40px;">
      <span class="text">This is a component library.</span>
    </Header>
    <leftSide></leftSide>
    <div class="content">
      <router-view class="container" />
    </div>
  </div>
</template>

<script>
import leftSide from './leftSide/leftSide.vue'
import Header from './header/header.vue'
export default {
  name: 'App',
  components: {
    leftSide,
    Header
  },
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
      background: #fff;
    }
  }
</style>
