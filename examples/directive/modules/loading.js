// import loading from '@_com/Loading/Loading.vue'
// import { getRandom } from '@/libs/util'
// import Vue from 'vue'

// let loadingObj = {
//   timers: null,
//   dom: null,
//   spinDom: null,
//   w: 0,
//   createdLine (cssObj) {
//     let line = document.createElement('div')

//     Object.keys(cssObj).forEach(k => {
//       line.style[k] = cssObj[k]
//     })
//     line.setAttribute('class', 'loading-line')
//     this.dom = line
//     return line
//   },

//   start (el, binding, vnode) {
//     console.log(el)
//     let { position } = el.style
//     let { value, arg } = binding

//     if (!value) {
//       return
//     }

//     if (!position || position === 'static') {
//       el.style.position = 'relative'
//     }

//     let lineStyle = (arg && arg.lineStyle) ? arg.lineStyle : {}

//     let line = loadingObj.createdLine({
//       width: '0',
//       height: '2px',
//       position: 'absolute',
//       background: '#f00',
//       top: '0',
//       left: '0',
//       transition: 'width .3s',
//       zIndex: 9,
//       ...lineStyle
//     })

//     el.appendChild(line)

//     // 实例化虚拟dom

//     const Instance = new Vue({
//       render (h) {
//         return h(loading)
//       }
//     })
//     const { $el } = Instance.$mount()

//     el.appendChild($el)
//     console.log(el)
//     loadingObj.spinDom = $el
//     this.opentimer(this.dom)
//   },

//   opentimer (dom) {
//     this.w = 0
//     let CUT_SCALE = 3
//     this.timers = setInterval(() => {
//       console.log(this.w)
//       const num = (CUT_SCALE - 1) * Math.random() + 1
//       this.w += num
//       dom.style.width = this.w + '%'
//       if (this.w >= getRandom(60, 90)) {
//         this.stop()
//       }
//     }, 30)
//   },

//   // 停止
//   stop () {
//     clearInterval(this.timers)
//     this.timers = null
//   },

//   // 立即结束
//   end (el) {
//     if (this.dom) {
//       this.dom.style.width = '100%'
//     }
//     this.w = 100
//     setTimeout(() => {
//       if (this.dom && this.dom.parentNode) {
//         this.dom.parentNode.removeChild(this.dom)
//       }

//       if (this.spinDom && this.spinDom.parentNode) {
//         this.spinDom.parentNode.removeChild(this.spinDom)
//       }

//       let lineDoms = document.getElementsByClassName('loading-line')
//       if (lineDoms.length) {
//         Array.prototype.forEach.call(lineDoms, el => {
//           el.parentNode.removeChild(el)
//         })
//       }
//     }, 600)
//   },

//   restart () {
//     this.stop()
//     this.dom.parentNode.removeChild(this.dom)
//     this.spinDom.parentNode.removeChild(this.spinDom)
//   }

// }

// export default {
//   inserted (el, binding, vnode) {
//     let { value } = binding

//     if (Object.prototype.toString.call(value) === '[object Object]') {
//       console.log(value)
//     } else if (Object.prototype.toString.call(value) === '[object Boolean]') {
//       loadingObj.start(el, binding, vnode)
//     } else {
//       console.error('v-loading: 请传入 一个对象或一个布尔值！')
//     }
//   },

//   update (el, binding, vnode) {
//     let { value } = binding
//     if (!value) {
//       loadingObj.end(el)
//     } else {
//       loadingObj.start(el, binding, vnode)
//     }
//   }
// }
