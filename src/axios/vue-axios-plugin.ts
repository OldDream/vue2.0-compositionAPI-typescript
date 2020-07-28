import axios from './index'
import _Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: typeof axios
  }
}

const vueAxiosPlugin = {
  install(Vue: typeof _Vue): void {
    Vue.prototype.$axios = axios
  }
}


export { vueAxiosPlugin }