<template>
  <div style="width: 700px;" class="malls">
    <button @click="prev">上个月</button>
    <button @click="next">下个月</button>
    <MineCalendar
      ref="myCalendar"
      :isNeedLunar="true"
      v-mineLoading.line="isLoading"
      :apiData="apiDate"
      @change="calendarChange">
      <template v-slot:content="{ options }" >
        <div
          style="height: 100%;padding: 5px;box-sizing: border-box;position:relative;"
          :style="options.oper.status === '休' ? 'background: #fdf2f2;' :''"
          :class="new Date().getDate() === options.value ? 'current date-time' :'date-time'">
          <span :style="options.oper.status === '休' ? 'color: #f00;' : ''">{{ options.value }}</span>
          <span v-if="options.oper.status === '休'" style="position: absolute;color:#ff7474;right: 10px;">{{  options.oper.status }}</span>
        </div>
      </template>
    </MineCalendar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      apiDate: [
        {
          dateStr: '2019/09/01',
          status: '休'
        },
        {
          dateStr: '2019/09/02',
          status: '上班'
        },
        {
          dateStr: '2019/09/03',
          status: '上班'
        },
        {
          dateStr: '2019/09/04',
          status: '上班'
        },
        {
          dateStr: '2019/09/05',
          status: '上班'
        },
        {
          dateStr: '2019/09/06',
          status: '上班'
        },
        {
          dateStr: '2019/09/07',
          status: '休'
        },
        {
          dateStr: '2019/09/08',
          status: '休'
        },
        {
          dateStr: '2019/09/09',
          status: '上班'
        },
        {
          dateStr: '2019/09/10',
          status: '上班'
        },
        {
          dateStr: '2019/09/11',
          status: '上班'
        },
        {
          dateStr: '2019/09/12',
          status: '上班'
        },
        {
          dateStr: '2019/09/13',
          status: '休'
        },
        {
          dateStr: '2019/09/14',
          status: '休'
        },
        {
          dateStr: '2019/09/15',
          status: '休'
        },
        {
          dateStr: '2019/09/16',
          status: '上班'
        },
        {
          dateStr: '2019/09/17',
          status: '上班'
        },
        {
          dateStr: '2019/09/18',
          status: '上班'
        },
        {
          dateStr: '2019/09/19',
          status: '上班'
        },
        {
          dateStr: '2019/09/20',
          status: '上班'
        },
        {
          dateStr: '2019/09/21',
          status: '休'
        },
        {
          dateStr: '2019/09/22',
          status: '休'
        },
        {
          dateStr: '2019/09/23',
          status: '上班'
        },
        {
          dateStr: '2019/09/24',
          status: '上班'
        },
        {
          dateStr: '2019/09/25',
          status: '上班'
        },
        {
          dateStr: '2019/09/26',
          status: '上班'
        },
        {
          dateStr: '2019/09/27',
          status: '上班'
        },
        {
          dateStr: '2019/09/28',
          status: '休'
        },
        {
          dateStr: '2019/09/29',
          status: '上班'
        },
        {
          dateStr: '2019/09/30',
          status: '上班'
        }
      ]
    }
  },
  created () {
    this.loadingStatusChange()
  },
  methods: {
    loadingStatusChange () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1500)
    },
    prev () {
      this.$refs.myCalendar.prev()
    },
    next () {
      this.$refs.myCalendar.next()
    },
    calendarChange () {
      // this.loadingStatusChange()

      // return new Promise((resolve, reject) => {
      //  const Apis = jobSubmitList.map(item => {
      //    return APi
      //  })
      //  Promise.all(Apis).then(resArr => {
      //    resolve(resArr)
      //  }).catch(e =>{
      //    reject(e)
      //  })
      // })
    }
  }
}
</script>

<style scoped>
.current {
  color: #1989fa;
  background-color: #f2f8fe;
}

.date-time:hover {
  background-color: #f2f8fe;
  cursor: pointer;
}
</style>
