<template>
  <div class="me-calendar">
    <div class="me-calendar-currentYM">
      <div class="me-calendar-current-year">
        <button class="me-btn" @click="openYears">{{ currentY }}</button>
        <ul @click="stopClose($event)" class="me-calendar-fix-year" ref="fix-year">
          <li
            v-for="item in yearsArr"
            @click="cutSelectYear(item)"
            :class="setFixedClass(currentY, item)"
            :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="me-calendar-current-month">
        <button class="me-btn" @click="openMonths">{{ currentM }}</button>
        <ul @click="stopClose($event)" class="me-calendar-fix-month" ref="fix-month">
          <li
            v-for="item in monthsArr"
            @click="cutSelectMonth(item)"
            :class="setFixedClass(currentM, item)"
            :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="me-calendar-header">
      <span
        v-for="(item, index) in header"
        :key="index"
        class="me-calendar-fix-item">
        {{ item }}
      </span>
    </div>

    <div :class="calendarContent">
      <div
        v-for="(item, index) in dateArray"
        class="me-calendar-row"
        :style="{ height: setRowHeight }"
        :key="index">
        <div
          v-for="(val, key) in item"
          :class="calendarCols(val)"
          :style="'content' in $scopedSlots ? '' : 'padding: 5px;'"
          :key="key">
          <slot :options='val' name="content" v-if="'content' in $scopedSlots"></slot>
          <template v-else>
            {{ val.value }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateArray } from './calendar.js'

const y = new Date().getFullYear()
const m = new Date().getMonth() + 1
export default {
  name: 'MineCalendar',
  props: {
    header: {
      type: Array,
      default () {
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      validator (val) {
        return val.length === 7
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
      default: undefined
    },
    border: {
      type: Boolean,
      default: true
    },
    borderType: {
      type: String,
      default: 'default',
      validator (val) {
        return ['default', 'add', 'minus'].find(item => item === val)
      }
    },
    rowHeight: {
      type: String | Number,
      default: 80
    }
  },

  data () {
    return {
      currentY: null,
      currentM: null,
      yearsArr: [],
      isShowYear: false,
      monthsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      isShowMonth: false
    }
  },

  computed: {
    dateArray () {
      let defaultVal = getDateArray(this.currentY || y, this.currentM || m)
      if (this.apiData !== undefined && this.apiData.length) {
        return this.combination(defaultVal, this.apiData)
      } else {
        return defaultVal
      }
    },
    calendarContent () {
      let classObj = {
        'me-calendar-content': true
      }
      classObj[`me-calendar-border-${this.borderType}`] = this.border
      return classObj
    },
    setRowHeight () {
      return String(this.rowHeight).indexOf('px') !== -1
        ? this.rowHeight
        : this.rowHeight + 'px'
    }
  },

  created () {
    this.currentY = this.year
    this.currentM = this.month
  },

  mounted () {
    document.addEventListener('click', this.closePop)
    document.addEventListener('click', this.closeMonthsPop)
  },

  destroyed () {
    document.removeEventListener('click', this.closePop)
    document.removeEventListener('click', this.closeMonthsPop)
  },

  methods: {
    cutSelectMonth (item) {
      this.currentM = item
      this.closeMonthsPop(() => {
        this.cutMonth(this.currentY, item)
      })
    },
    cutSelectYear (item) {
      this.currentY = item
      this.closePop(() => {
        this.cutMonth(item, this.currentM)
      })
    },
    setFixedClass (itemVal = {}, tagVal = {}) {
      return {
        'me-calendar-fix-item': true,
        'me-calendar-fix-item_checked': String(itemVal) === String(tagVal)
      }
    },
    closePop (callBack) {
      if (this.isShowYear) {
        this.$refs['fix-year'].style = 'opacity: 0.3;'
        this.isShowYear = false
      }
      if (typeof callBack === 'function') {
        callBack && callBack()
      }
    },
    openPop () {
      setTimeout(() => {
        this.$refs['fix-year'].style = 'transform: rotate3d(1,0,0, 0);opacity: 1;'
        this.isShowYear = true
      }, 0)
    },
    openYears () {
      this.isShowYear ? this.closePop() : this.openPop()
      if (this.yearsArr.length) return
      const currentY = String(this.currentY)
      const prefixNum = currentY.slice(0, currentY.length - 1)
      for (let i = 0; i < 10; i++) {
        this.yearsArr.push(`${prefixNum}${i}`)
      }
    },
    stopClose (e) {
      e.stopPropagation()
    },
    openMonths () {
      this.isShowMonth ? this.closeMonthsPop() : this.openMonthsPop()
    },
    closeMonthsPop (callBack) {
      if (this.isShowMonth) {
        this.$refs['fix-month'].style = 'opacity: 0.3;'
        this.isShowMonth = false
      }
      if (typeof callBack === 'function') {
        callBack && callBack()
      }
    },
    openMonthsPop () {
      setTimeout(() => {
        this.$refs['fix-month'].style = 'transform: rotate3d(1,0,0, 0);opacity: 1;'
        this.isShowMonth = true
      }, 0)
    },
    // 根据后台数据重新组合
    combination (dateArr, apiData) {
      dateArr.forEach((item) => {
        item.forEach((b) => {
          apiData.forEach((c, index) => {
            // 后台数据中 的时间 字符串 dateStr
            if (c.dateStr === b.dateStr) {
              b.oper = c
            }
          })
        })
      })
      return dateArr
    },
    prev () {
      if (this.currentM === 1) {
        this.currentM = 13
        this.currentY -= 1
      }
      this.cutMonth(this.currentY, this.currentM - 1)
    },
    next () {
      if (this.currentM === 12) {
        this.currentM = 0
        this.currentY += 1
      }
      this.cutMonth(this.currentY, this.currentM + 1)
    },
    cutMonth (y, m) {
      this.currentY = y
      this.currentM = m
      this.$emit('change', { y: y, m: m })
    },
    calendarCols (val) {
      return {
        'me-calendar-cols': true,
        'me-calendar-enable': !val.enable
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.me-calendar {
  .me-calendar-header {
    display: flex;
    .me-calendar-fix-item {
      padding: 12px 0;
      color: #606266;
      font-weight: 400;
      text-align: center;
      flex: 1;
    }
  }
  .me-calendar-border-default {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .me-calendar-cols {
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
    }
  }
  .me-calendar-border-add {
    .me-calendar-row {
      &:last-child {
      .me-calendar-cols {
        border-bottom: none;
      }
    }
    }
    .me-calendar-cols {
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      &:nth-child(7n) {
        border-right: none;
      }
    }
  }
  .me-calendar-border-minus {
    .me-calendar-row {
      border-bottom: 1px solid #ebeef5;
    }
  }
  .me-calendar-row {
    display: flex;
    .me-calendar-cols {
      flex: 1;
      color: #333;
      box-sizing: border-box;
    }
    .me-calendar-enable {
      color: #c0c4cc;
    }
  }
  .me-calendar-currentYM {
    text-align: center;
    padding: 15px 0;
  }
  .me-calendar-current-year,
  .me-calendar-current-month {
    display: inline-block;
    position: relative;
    .me-btn {
      position: relative;
      padding-right: 30px;
    }
    .me-btn:after,
    .me-btn:before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 7px solid #606266;
      border-bottom: 7px solid transparent;
      vertical-align: middle;
      border-radius: 2px;
      right: 10px;
      top: 50%;
      margin-top: -3px;
    }
    .me-btn:after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 4px solid #fff;
      right: 11px;
    }
    .me-btn:hover:before {
        border-top:7px solid #409eff;
    }
    .me-calendar-fix-year,
    .me-calendar-fix-month {
      transition: all 0.4s ease-in-out;
      transform: rotate3d(1,0,0, -90deg);
      opacity: 0.3;
      transform-origin: 50% 0%;
      border: 1px solid #dcdfe6;
      padding: 10px;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      position: absolute;
      z-index: 900;
      width: 230px;
      margin-left: -75px;
      margin-top: 5px;
      li.me-calendar-fix-item {
        width: 35px;
        height: 28px;
        line-height: 28px;
        margin: 10px 12px;
        border-radius: 3px;
        float: left;
        cursor: pointer;
        padding: 5px;
        &:hover {
          background-color: #e1f0fe;
        }
      }
      .me-calendar-fix-item_checked.me-calendar-fix-item {
        background-color: #2d8cf0;
        color: #fff;
        &:hover {
          background-color: #2d8cf0;
        }
      }
    }
  }
}
</style>
