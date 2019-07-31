<template>
	<div>
		介绍页
		<button @click="change">asd</button>
		<div class="test-content" v-loading="isLoading">测试进度条</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true
    }
  },

  created () {
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  },
  methods: {
    change () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.test-content {
		margin: 20px;
    padding: 15px;
    border-radius: 5px;
    width: 600px;
    height: 200px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
	}
</style>
