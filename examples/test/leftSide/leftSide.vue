<template>
	<div class="left-side">
		<div class="leftSide-scroll">
			<ul>
				<li v-for="(item, index) in menu" :key="index" class="list">
					<img :src="item.src" style="width: 20px;" class="icon" v-if="item.src" />
					<span @click="gotoPage(item.to)">{{ item.title }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          title: '介绍',
          src: require('@_img/left-icon-1.svg')
        },
        {
          title: '进度条',
          src: require('@_img/com-1.svg'),
          to: '/myLoading'
        },
        {
          title: '日历',
          src: require('@_img/com-2.svg'),
          to: '/myCalendar'
        }
      ]
    }
  },
  methods: {
    gotoPage (to) {
      this.$router.push(to)
    }
  }
}
</script>

<style lang='scss' scoped>
.left-side {
	position: fixed;
	height: 100%;
	top: 65px;
	left: 0;
	box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.05);
	min-height: 100vh;
	background-color: #202d40;
	color: #fff;
	width: 150px;
	transition: width 0.1s ease-in-out;
	z-index: 9;
	user-select: none;
	overflow: hidden;
	.leftSide-scroll {
		overflow-y: scroll;
		position: relative;
		margin-right: -16%;
		height: calc(100vh - 65px);
	}
	.list {
		height: 30px;
		line-height: 30px;
		margin-top: 20px;
		cursor: pointer;
		padding-left: 10px;
		.icon {
			width: 20px;
			margin-right: 5px;
		}
		&:hover {
			color: #19be6b;
		}
	}

}

</style>
