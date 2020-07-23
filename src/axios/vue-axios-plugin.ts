import axios from './index'
import _Vue from 'vue'

const vueAxiosPlugin = {
  install(Vue: typeof _Vue): void {
    Vue.prototype.$axios = axios
  }
}

export { vueAxiosPlugin }