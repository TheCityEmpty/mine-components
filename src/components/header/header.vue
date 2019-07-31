<template>
	<div class="header">
    <div class="logo">
      <slot></slot>
    </div>

    <!-- <div class="header-right flex-between">
      <User style="order: 10;"></User>
      <Info style="order: 9;"></Info>
    </div> -->
	</div>
</template>

<script>
import './header.scss'
import User from './user-box.vue'
import Info from './info-box.vue'

export default {
  components: {
    User,
    Info
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
