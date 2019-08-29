const path = require('path')
// const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}
console.log('打包环境------', process.env.NODE_ENV)

const env = process.env.NODE_ENV || 'development'
console.log('打包环境--env----', env)
// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
let BASE_URL = './'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack 配置
  configureWebpack: config => {
    // 设置入口文件
    config.entry.app = ['babel-polyfill', './examples/main.js']
    // 设置将所有css 文件打包成一个
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'opms-styles', // 自定义名字
              test: /\.scss|css$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      }
      // config.externals = {
      //   vue: {
      //     root: 'Vue',
      //     commonjs: 'vue',
      //     commonjs2: 'vue',
      //     amd: 'vue'
      //   }
      // }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('examples')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@_com', resolve('examples/components'))
      .set('@_img', resolve('examples/assets/images'))
  },
  productionSourceMap: true,
  devServer: {
    proxy: {
      '/app': {
        target: 'http://www.luoxuehui.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': '/app'
        }
      }
    }
  }
}
