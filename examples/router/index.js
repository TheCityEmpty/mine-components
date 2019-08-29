import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
