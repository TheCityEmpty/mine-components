// import * as directives from './directive'
// Object.keys(directives).forEach(k => {
//   Vue.directive(k, directives[k])
// })
import Loading from './components/Loading/index.js'
import Calendar from './components/Calendar/index.js'
const components = [
  Calendar
]

const install = (Vue, opts = {}) => {
  Vue.use(Loading.directive)
  Vue.prototype.$myLoading = Loading.service

  components.forEach(c => {
    // 使用c.name 则每个组件都必须 有name 属性， 以name 属性 作为组件名
    Vue.component(c.name, c)
  })
}

if (typeof window !== 'undefined' && window.vue) {
  install(window.vue)
}

export default {
  version: '1.0.0',
  install,
  Calendar,
  Loading
}
