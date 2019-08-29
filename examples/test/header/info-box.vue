<template>
	<div class="info-box icon-box">
		<div class="header-icon">
			<!-- <Icon type="md-notifications-outline" class="iiicon" /> -->
		</div>
		<ul class="drop-menu info-drop">
			<li v-for="(item, index) in infoMenus" :key="index" :class="item.liClasses">
				<span>{{ item.content }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  data () {
    return {
      infoMenus: [
        {
          content: '用户User 评论了 node.js 这篇文章！'
        },
        {
          content: '用户User 评论了 node.js 这篇文章！'
        },
        {
          content: '用户User 评论了 node.js 这篇文章！'
        }
      ]
    }
  }
}
</script>
