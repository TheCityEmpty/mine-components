<template>
	<div class="Loading-box" :style="`background-color: ${bg}`">
		<div class="loader">
				<svg class="circular" viewBox="25 25 50 50" v-if="!icon">
						<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
				</svg>
        <i :class="icon" v-else></i>
        <p class="alertText">{{ alertText }}</p>
		</div>
	</div>
</template>

<script>
import './Loading.scss'
export default {
  data () {
    return {
      alertText: null,
      bg: null,
      icon: null,
      transitionStep: null,
      stopTranstion: null,
      endTransiton: null,
      lineDom: null,
      w: 0,
      timer: null
    }
  }
}
</script>
