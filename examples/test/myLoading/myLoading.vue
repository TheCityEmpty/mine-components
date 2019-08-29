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

    <div class="test-content sadas" v-myLoading.line="isLoading">
      爱神的箭雷克萨建档立卡就撒懒得看
    </div>
	</div>
</template>

<script>
import Loading from '@/components/Loading'
import { getRandom } from '@/libs/util'
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
    }, 1500000)
  },
  methods: {
    changeBody () {
      let sevrice = Loading.service({
        alertText: '数据加载中...',
        isHasLine: true
      })
      setTimeout(() => {
        console.log(sevrice)
        sevrice.close()
      }, 1500)
    },
    change () {
      setInterval(() => {
        this.widthPX = getRandom(100, 600)
      }, 800)

      // let sevrice = Loading.service({
      //   target: this.$refs.aa,
      //   alertText: '数据加载中...',
      //   isHasLine: true,
      //   lineBg: '#0f0'
      // })
      // // this.isLoading = true
      // // this.isLoading2 = true
      // setTimeout(() => {
      //   sevrice.close()
      // }, 150000)
      // this.$nextTick(() => {

      // })
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
