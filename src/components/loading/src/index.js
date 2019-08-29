import Vue from 'vue'
import Loading from './Loading.vue'
import { getRandom } from '../../../utils/tools'

const LoadingConstructor = Vue.extend(Loading)
/**
 * @desc 需要注意的是，以服务的方式调用 Loading, 若在前一个 Loading 关闭前再次调用 Loading，
 * @desc 会创建一个新的 Loading 实例，删除旧的实例 (再次调用的Loading 的父节点是同一个的情况下)
 * @param { target } Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入
 * document.querySelector以获取到对应 DOM 节点， 不传默认为document.body
 * @param { alertText } 显示在加载图标下方的加载文案
 * @param { isHasLine } 是否显示加载线条
 * @param { lineBg } 加载线条的背景色
 * @param { lineHeight } 加载线条的高度
 * @param { bg } 遮罩背景色
 * @param { icon } 自定义加载图标类名
 */

let taskList = []

const isDom = typeof HTMLElement === 'object' ? function (dom) {
  return dom instanceof HTMLElement
} : function (dom) {
  return dom && typeof dom === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string'
}

function deleteTask (target) {
  let index = taskList.findIndex(item => item.parent === target)
  if (index !== -1) {
    taskList.splice(index, 1)
  }
}

function removeDom (domList = []) {
  for (let i = 0, len = domList.length; i < len; i++) {
    let parentNode = isDom(domList[i]) && domList[i].parentNode
    if (parentNode) {
      parentNode.removeChild(domList[i])
    }
  }
}

LoadingConstructor.prototype.close = function () {
  if (this.$el && this.$el.parentNode) {
    deleteTask(this.$el.parentNode)
    this.endTransiton(() => {
      removeDom([this.$el, this.lineDom])
    })
  }
}

LoadingConstructor.prototype.recreated = function (options) {
  if (this.$el && this.$el.parentNode) {
    deleteTask(this.$el.parentNode)
    removeDom([this.$el, this.lineDom])
    LoadingObj(options)
  }
}

const LoadingObj = (options = {}) => {
  if (Vue.prototype.$isServer) return
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  options.fullscreen = options.target === document.body

  let parent = options.fullscreen ? document.body : options.target

  let isBeing = taskList.find(item => item.parent === parent)
  if (isBeing) {
    isBeing.instance.recreated(options)
    return
  }

  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })

  let { position } = document.defaultView.getComputedStyle(parent, null)
  if (position !== 'position' || position !== 'fixed' || position !== 'relative') {
    parent.style.position = 'relative'
  }

  options.transitionStep = function () {
    let stepNum = 3
    this.timer = setInterval(() => {
      const step = (stepNum - 1) * Math.random() + 1
      this.w += step
      this.lineDom.style.width = this.w + '%'
      if (this.w >= getRandom(60, 90)) {
        this.stopTranstion(this)
      }
    }, 30)
  }

  options.stopTranstion = function () {
    this.timer && clearInterval(this.timer)
  }

  options.endTransiton = function (callBack) {
    this.timer && this.stopTranstion()
    this.lineDom.style.width = '100%'
    this.w = 100
    setTimeout(() => {
      callBack && callBack()
    }, 400)
  }

  if (options.isHasLine) {
    let virLineDom = document.createElement('div')
    virLineDom.className = 'my-line-style'
    virLineDom.style.backgroundColor = options.lineBg || ''
    virLineDom.style.height = options.lineHeight || ''
    options.lineDom = virLineDom
    options.w = 0
    parent.appendChild(options.lineDom)
    options.transitionStep()
  }
  parent.appendChild(instance.$el)

  taskList.push({
    instance,
    parent
  })
  return instance
}

export default LoadingObj
