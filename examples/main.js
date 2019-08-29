import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * @description 引入 全局css  混入，config 等
 */
import '@/theme/index.scss'
import '@/assets/css/base.css'
import '@/mixins'
import '../src/styles/base.css'
// import config from '@/config'

// 自定义插件引入
import mp from '../src'
Vue.use(mp)
// const calendar = require('./components/Calendar/index').default
// console.log(calendar)
// Vue.component(calendar.name, calendar)

Vue.config.productionTip = false
// Vue.prototype.$config = config

// Vue.config.errorHandler = function (err, vm, info) {
//   console.info('error---', err)
//   console.info('vm---', vm)
//   console.info('info---', info)
// }

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export default vm
