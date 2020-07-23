import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/SubPage',
    name: 'SubPage',
    component: () => import('../components/SubPage/SubPage.vue'),
    meta: {
      title: 'sub',
    }
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: () => import('../components/MainPage/MainPage.vue'),
    meta: {
      title: ' ',
      keepAlive: true,
      allowLeaveKeepCache: ['SubPage']
    }
  },
  {
    path: '/*',
    redirect: '/MainPage'
  }
]

const router = new VueRouter({
  routes
})

export default router
