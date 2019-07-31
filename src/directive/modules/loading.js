
let loadingObj = {
  timers: null,
  dom: null,
  spinDom: null,
  w: 0,
  loadingIcon: require('@_img/loading.svg'),
  createdLine (cssObj) {
    let line = document.createElement('div')

    Object.keys(cssObj).forEach(k => {
      line.style[k] = cssObj[k]
    })
    this.dom = line
    return line
  },

  createSpin (cssObj) {
    let spin = document.createElement('div')
    let icon = document.createElement('img')
    let imgCss = {
      width: '32px',
      height: '32px'
    }

    Object.keys(cssObj).forEach(k => {
      spin.style[k] = cssObj[k]
    })
    Object.keys(imgCss).forEach(k => {
      icon.style[k] = imgCss[k]
    })

    icon.setAttribute('src', this.loadingIcon)
    icon.setAttribute('class', 'rotaing')
    spin.appendChild(icon)

    this.spinDom = spin
    return spin
  },

  start () {
    this.timer(this.dom)
  },

  timer (dom) {
    let CUT_SCALE = 3
    this.timers = setInterval(() => {
      const num = (CUT_SCALE - 1) * Math.random() + 1
      this.w += num
      dom.style.width = this.w + '%'
      if (this.w >= 90) {
        this.stop()
      }
    }, 30)
  },

  // 停止
  stop () {
    clearInterval(this.timers)
  },

  // 立即结束
  end (el) {
    this.stop()
    this.w = 100
    this.dom.style.width = '100%'
    setTimeout(() => {
      // this.dom.parentNode.removeChild(this.dom)
      // this.spinDom.parentNode.removeChild(this.spinDom)
    }, 600)
  }

}

export default {
  inserted (el, binding) {
    let { position } = el.style
    let { value } = binding

    if (Object.prototype.toString.call(value) === '[object Object]') {

    } else if (Object.prototype.toString.call(value) === '[object Boolean]') {
      // todo
    } else {
      console.error('v-loading: 请传入 一个对象或一个布尔值！')
      return
    }

    if (!value) {
      return
    }

    if (!position || position === 'static') {
      el.style.position = 'relative'
    }

    let line = loadingObj.createdLine({
      width: '0',
      height: '2px',
      position: 'absolute',
      background: '#f00',
      top: '0',
      left: '0',
      transition: 'width .3s'
    })

    let spin = loadingObj.createSpin({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      backgroundColor: 'rgba(0 ,0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })
    el.appendChild(line)
    el.appendChild(spin)
    loadingObj.start()

    console.log(line)
  },

  update (el, binding) {
    let { value } = binding
    loadingObj.end(el)
    console.log(value)
  }
}
