import calendar from './src/Calendar.vue'

calendar.install = function (Vue) {
  Vue.component(calendar.name, calendar)
}
export default calendar
