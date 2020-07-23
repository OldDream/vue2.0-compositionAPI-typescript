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
  if (from.meta.allowLeaveKeepCache && from.meta.allowLeaveKeepCache.includes(to.name)) {
    if (from.meta.goAndRemoveSelfCache && from.meta.goAndRemoveSelfCache.includes(to.name)) {
      store.commit("popNObjFromKeepAliveComponents", 1);
      next()
    }
  } else {
    // 清除全部缓存
    store.commit("cleanKeepAliveComponents");
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
