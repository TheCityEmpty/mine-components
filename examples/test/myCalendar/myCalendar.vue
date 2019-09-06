<template>
  <div style="width: 700px;">
    <button @click="prev">上个月</button>
    <button @click="next">下个月</button>
    <MineCalendar ref="myCalendar" :month="7" :year="2018" :isNeedLunar="true">
      <!-- <template slot-scope="{ oper }" >
        {{ oper.dateStr }}
      </template> -->
    </MineCalendar>
  </div>
</template>

<script>
export default {
  methods: {
    prev () {
      this.$refs.myCalendar.prev()
    },
    next () {
      this.$refs.myCalendar.next()
    }
  }
}
</script>
