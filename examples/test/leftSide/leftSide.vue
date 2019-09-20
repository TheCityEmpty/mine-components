<template>
	<div class="left-side">
		<div class="leftSide-scroll">
			<ul>
				<li v-for="(item, index) in menu" :key="index" :class="{ 'list' :true, 'list-blod': item.weight }">
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
          weight: true
        },
        {
          title: 'Loading 进度条',
          to: '/myLoading'
        },
        {
          title: 'Calendar 日历',
          to: '/myCalendar'
        }
      ]
    }
  },
  methods: {
    gotoPage (to) {
      if (!to) return
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
	background-color: #fff;
	color: #444;;
  width: 150px;
  font-size: 14px;
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
  .list-blod span{
    font-weight: 600;
    font-size: 16px;
    color: #333;
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
