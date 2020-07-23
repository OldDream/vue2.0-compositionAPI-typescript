import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const isDevServer = process.env.NODE_ENV == 'development'
console.log('isDevServer: ' + isDevServer);
const isprod = isDevServer ? false : process.env.VUE_APP_BUILD_FOR != 'development';
console.log('isProd: ' + isprod);

let urlPrefix = " ";

if (isprod) { // 正式环境
  urlPrefix = "//aaaaa.com";
} else { // 开发环境
  urlPrefix = "//bbbbb.com";
}
export default new Vuex.Store({
  state: {
    isDev: !isprod,  // 判断是否为测试环境
    urlPrefix: urlPrefix, //请求前缀
    keepAliveComponents: new Array<string>(), // 路由缓存数组,数组内的全缓存
  },
  mutations: {
    addKeepAlive(state, component: string) {
      !state.keepAliveComponents.includes(component) &&
        state.keepAliveComponents.push(component)
    },
    // 从keepAliveComponents数组中POP出number个元素
    popNObjFromKeepAliveComponents(state, number) {
      state.keepAliveComponents = state.keepAliveComponents.slice(0, -number)
    },
    cleanKeepAliveComponents(state) {
      state.keepAliveComponents = new Array<string>()
    },
  },
  actions: {
  },
  modules: {
  }
})
