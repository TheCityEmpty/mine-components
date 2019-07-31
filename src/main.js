import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as directives from '@/directive'

/**
 * @description 引入 全局css  混入，config 等
 */
import '@/theme/index.scss'
import '@/assets/css/base.css'
import '@/mixins'
import config from '@/config'
import { http } from './libs/axios'

Object.keys(directives).forEach(k => {
  Vue.directive(k, directives[k])
})

Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$http = http // 全局注册，使用方法为:this.$http

// Vue.config.errorHandler = function (err, vm, info) {
//   console.info('error---', err)
//   console.info('vm---', vm)
//   console.info('info---', info)
// }

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vm
