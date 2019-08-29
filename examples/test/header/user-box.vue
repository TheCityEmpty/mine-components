<template>
	<div class="user-box">
		<div class="protail">
			<img src="@_img/default-avatar.png" />
			<!-- <Icon type="ios-arrow-down" /> -->
		</div>
		<ul class="drop-menu user-drop">
			<li v-for="(item, index) in dropMenus" :key="index" :class="item.liClasses">
				<!-- <Icon :type="item.icon" class="user-list-icon" /> -->
				<span>{{ item.title }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  data () {
    return {
      dropMenus: [
        {
          title: '个人设置',
          icon: 'ios-contact-outline'
        },
        {
          title: '系统设置',
          icon: 'ios-speedometer-outline'
        },
        {
          title: '我的主页',
          icon: 'ios-home-outline'
        },
        {
          title: '博客',
          icon: 'ios-bulb-outline'
        },
        {
          title: '退出',
          icon: 'ios-log-in',
          liClasses: ['logoout']
        }
      ]
    }
  }
}
</script>
