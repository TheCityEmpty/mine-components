<template>
	<div>
		介绍页
		<button @click="change">区域测试</button>
    <button @click="changeBody" style="margin-left: 100px;">body测试</button>
		<div class="test-content" ref="aa" :style="{ width: widthPX + 'px' }">
      <slot>
        哈哈
      </slot>
      测试进度条
    </div>

    <div class="test-content sadas" v-mineLoading.line="isLoading">
      爱神的箭雷克萨建档立卡就撒懒得看
    </div>
	</div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      isLoading2: false,
      isLoading: false,
      widthPX: 300
    }
  },

  created () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  },
  methods: {
    changeBody () {
      let loading1 = this.$mineLoading({
        target: 'body',
        isHasLine: true
      })
      setTimeout(() => {
        console.log()
        loading1.close()
      }, 1500)
    },
    change () {
      let loading2 = this.$mineLoading({
        target: this.$refs.aa,
        isHasLine: true
      })
      setTimeout(() => {
        console.log()
        loading2.close()
      }, 1500)
      // this.isLoading = true
      // setTimeout(() => {
      //   this.isLoading = false
      // }, 1500)
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
    background: url(../../assets/images/timg.jpg) no-repeat 100% 100%;
    color: #fff;
    transition: width ease-in-out 0.4s;
	}
</style>
