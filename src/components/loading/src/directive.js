/* eslint-disable no-mixed-operators */
import Vue from 'vue'
import Loading from './Loading.vue'
import { getRandom } from '../../../utils/tools'
/**
 * 通过指令的方式 来 实现一个加载效果
 * @dsec 关键之处在于 将一些值（参数）关联到el 上， 因为el 是每个绑定 指令独有的， 类似于组件， 状态分离
 * @param { v-myLoading } 指令名 接受Boolean 值
 * @param { fullscreen }  'v-myLoading指令中 的修饰符 全屏加载
 * @param { line } 'v-myLoading指令中 的修饰符 加上加载线条 修饰符可连用
 * @param { me-loading-text } 标签上的自定义属性 显示在加载图标下方的加载文案
 * @param { me-loading-bg } 标签上的自定义属性 遮罩背景色
 * @param { me-loading-icon } 标签上的自定义属性 自定义加载图标类名
 * @param { me-line-bg } 加载线的自定义背景颜色
 * @param { me-line-height } 加载线的自定义高度
 */

const Mask = Vue.extend(Loading)

export default {
  install (Vue) {
    if (Vue.prototype.$isServer) return
    // 切换状态
    const toggleLoading = (el, binding) => {
      const parent = binding.modifiers.fullscreen ? document.body : el

      if (binding.value) {
        insertDom(parent, el, binding)
      } else {
        removeDom(parent, el, binding)
      }
    }

    // 插入DOM
    const insertDom = (parent, el, binding) => {
      // IE 9 以下不支持此方法
      const { parentPosition } = document.defaultView.getComputedStyle(parent, null)
      if (parentPosition !== 'position' || parentPosition !== 'fixed' || parentPosition !== 'relative') {
        parent.style.position = 'relative'
      }
      parent.appendChild(el.mask)

      el.isInsert = true
      if (binding.modifiers.line) {
        parent.appendChild(el.lineDom)
        transitionStep(el)
      }
    }

    // 移除DOM
    const removeDom = (parent, el, binding) => {
      if (binding.modifiers.line) {
        endTransiton(el, () => {
          parent.removeChild(el.lineDom)
          parent.removeChild(el.mask)
        })
      } else {
        parent.removeChild(el.mask)
      }

      el.isInsert = false
    }

    const endTransiton = (el, callBack) => {
      stopTranstion(el)
      el.lineDom.style.width = '100%'
      el.w = 100
      setTimeout(() => {
        callBack && callBack()
      }, 400)
    }

    const stopTranstion = (el) => {
      clearInterval(el.timer)
    }

    const transitionStep = (el) => {
      let stepNum = 3
      el.timer = setInterval(() => {
        const step = (stepNum - 1) * Math.random() + 1
        el.w += step
        el.lineDom.style.width = el.w + '%'
        if (el.w >= getRandom(60, 90)) {
          stopTranstion(el)
        }
      }, 30)
    }

    // 注册指令
    Vue.directive('mineLoading', {
      bind (el, binding, vNode) {
        const alertText = el.getAttribute('me-loading-text')
        const bg = el.getAttribute('me-loading-bg')
        const icon = el.getAttribute('me-loading-icon')
        // vue 实例
        const vm = vNode.context
        const mask = new Mask({
          el: document.createElement('div'),
          data: {
            alertText: vm && vm['me-loading-text'] || alertText,
            bg: vm && vm['me-loading-bg'] || bg,
            icon: vm && vm['me-loading-icon'] || icon
          }
        })
        el.instance = mask
        el.mask = mask.$el
        // 存在加载线条
        if (binding.modifiers.line) {
          const bg = el.getAttribute('me-line-bg')
          const height = el.getAttribute('me-line-height')
          let virLineDom = document.createElement('div')
          virLineDom.className = 'me-line-style'
          virLineDom.style.backgroundColor = vm && vm['me-line-bg'] || bg
          virLineDom.style.height = vm && vm['me-line-height'] || height
          el.lineDom = virLineDom
          el.w = 0
        }
        binding.value && toggleLoading(el, binding, vNode)
      },
      update (el, binding) {
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },
      unbind (el, binding) {
        if (el.isInsert) {
          el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask)

          el.lineDom &&
          el.lineDom.parentNode &&
          el.lineDom.parentNode.removeChild(el.lineDom)
        }
      }
    })
  }
}
