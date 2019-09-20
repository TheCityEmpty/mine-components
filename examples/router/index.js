import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import APP from '../../src'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})
let APPLOADING = null
router.beforeEach((to, from, next) => {
  APPLOADING = APP.Loading.service({
    target: 'body',
    isHasLine: true
  })
  next()
})
router.afterEach(to => {
  APPLOADING.close()
  window.scrollTo(0, 0)
})

export default router
