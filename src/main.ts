import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import App from './App.vue'
import router from './router'
import store from './store'
import { vueAxiosPlugin } from './axios/vue-axios-plugin'
Vue.use(vueAxiosPlugin)

Vue.config.productionTip = false

// 全局守卫
router.beforeEach(async (to, from, next) => {
  // 设置标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  // 保存滚动位置
  if (from.meta.keepAlive) {
    const $content = document.querySelector('#scrollDiv');
    const scrollTop = $content ? $content.scrollTop : 0;
    from.meta.scrollTop = scrollTop;
    console.log('save scroll hight: ' + scrollTop)
  }
  // 检查前往的页面
  if (from.meta.keepAliveWeight && to.meta.keepAliveWeight) {
    if (from.meta.keepAliveWeight - to.meta.keepAliveWeight > 0)
    // 从高权重页面往低权重页面跳转，清除部分缓存，删除数量为权重的差
    store.commit("popNObjFromKeepAliveComponents", from.meta.keepAliveWeight - to.meta.keepAliveWeight);
    next()
  } else if (from.meta.keepAliveWeight && !to.meta.keepAliveWeight) {
    store.commit("cleanKeepAliveComponents");  // 从有权重页面跳转到无权重页面，清除全部缓存
  }
  // 添加页面缓存
  to.meta.keepAlive && store.commit('addKeepAlive', to.name)
  next()
})

import { Button } from 'vant';
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
