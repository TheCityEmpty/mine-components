<template>
  <div class="my-calendar">
    <div class="my-calendar-currentYM">
      <button class="my-btn">{{ thisY }}</button>
      <button class="my-btn">{{ thisM }}</button>
    </div>
    <div class="my-calendar-header">
      <span v-for="(item, index) in header" :key="index" class="my-calendar-header_item">
        {{ item }}
      </span>
    </div>

    <div class="my-calendar-content">
      <div class="my-calendar-row" v-for="(item, index) in dateArray" :key="index">
        <div :class="{ 'my-calendar-cols': true, 'my-calendar-enable': !val.enable }" v-for="(val, key) in item" :key="key">
          <template v-if="!isHasSlot">
            {{ val.value }}
            <span v-if="isNeedLunar">
              {{ getLunar(val.date) }}
            </span>
          </template>
          <slot :oper='val'></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleTime } from '../../../utils/tools.js'
import { getDateArray } from './calendar.js'
import { calendar } from './getLunar.js'

const y = new Date().getFullYear()
const m = new Date().getMonth() + 1
export default {
  name: 'MyCalendar',
  props: {
    header: {
      type: Array,
      default () {
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      validator (value) {
        return value.length === 7
      }
    },
    year: {
      type: Number,
      default: y
    },
    month: {
      type: Number,
      default: m
    },
    isNeedLunar: {
      type: Boolean,
      default: false
    },
    apiData: {
      type: Array,
      default () {
        return undefined
      }
    }
  },

  data () {
    return {
      thisY: null,
      thisM: null,
      isHasSlot: false
    }
  },

  computed: {
    dateArray () {
      console.log(getDateArray(this.thisY || y, this.thisM || m))
      return getDateArray(this.thisY || y, this.thisM || m)
    }
  },

  created () {
    this.thisY = this.year
    this.thisM = this.month
  },

  mounted () {
    this.isHasSlot = 'default' in this.$scopedSlots
    if (this.apiData !== undefined && this.apiData.length) {
      this.combination(this.dateArray, this.apiData)
    }
  },

  methods: {
    // 根据后台数据重新组合
    combination (dateArr, apiData) {
      dateArr.forEach((item) => {
        item.forEach((b) => {
          apiData.forEach((c, index) => {
            // 后台数据中 的时间戳
            let time = c.time
            if (new Date(time).getTime() === b.date) {
              b.oper = c
            }
          })
        })
      })
      return dateArr
    },
    prev () {
      if (this.thisM === 1) {
        this.thisM = 13
        this.thisY -= 1
      }
      this.cutMonth(this.thisY, this.thisM - 1)
    },
    next () {
      if (this.thisM === 12) {
        this.thisM = 0
        this.thisY += 1
      }
      this.cutMonth(this.thisY, this.thisM + 1)
    },
    cutMonth (y, m) {
      this.thisY = y
      this.thisM = m
    },
    getLunar (date) {
      let dd = handleTime(date).split('/')
      return calendar.solar2lunar(dd[0], dd[1], dd[2]).IDayCn
    }
  }
}
</script>

<style lang="scss" scoped>
.my-calendar {
  .my-calendar-header {
    display: flex;
    .my-calendar-header_item {
      padding: 12px 0;
      color: #606266;
      font-weight: 400;
      text-align: center;
      flex: 1;
    }
  }
  .my-calendar-row {
    display: flex;
    .my-calendar-cols {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      color: #606266;
    }
    .my-calendar-enable {
      color: #c8c8ca;
    }
  }
}
</style>
