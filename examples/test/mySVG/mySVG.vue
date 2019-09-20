<template>
  <div class="mySvg">
    <svg width="20" height="20" viewBox="0 0 3 2">
      <rect width="0.5" height="3" x="1.25" fill="#333" y="-0.5" />
      <rect width="3" height="0.5" x="0" fill="#333" y="0.75" />>
    </svg>
    <svg width="20" height="20" viewBox="0 0 3 2">
      <line x1="3" y1="3" x2="48" y2="3" fill="#333" height="0.5"></line>
      <line x1="3" y1="19" x2="65" y2="19" fill="#333" height="0.5"></line>
      <line x1="3" y1="35" x2="48" y2="35" fill="#333" height="0.5"></line>
      <line x1="3" y1="51" x2="65" y2="51" fill="#333" height="0.5"></line>
    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      oldData: {
        arr: []
      },
      isShowAll: false
    }
  },
  computed: {
    newData () {
      return this.isShowAll ? this.oldData.arr.slice(0, 5) : this.oldData.arr.slice(0, this.oldData.arr.length)
    }
  }

}
</script>

<style>
svg {
  /* stroke: #000;
  stroke-width: 1; */
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
