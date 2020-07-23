const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  chainWebpack: config => {
    // config.module.rules.delete('eslint');
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_lifecycle_event === 'analyze') {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
    }
    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_BUILD_FOR !== 'development') { // 正式包
      config.optimization
        .minimizer('terser')
        .tap(args => {
          Object.assign(args[0].terserOptions.compress, { // 生产模式 console.log 去除
            drop_console: true
          })
          return args
        })
      config.devtool(false)
    } else { // 测试包
      config.devtool('source-map')
    }
  },
  configureWebpack: {
    module: {
      rules: [
        
      ]
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/global.scss";
        `
      }
    }
  },
  outputDir: process.env.VUE_APP_BUILD_FOR !== 'development' ? 'dist' : 'dist-dev',
  publicPath: './',
  assetsDir: './static/'
}