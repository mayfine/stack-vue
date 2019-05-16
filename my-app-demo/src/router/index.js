import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HOC',
      name: 'HOC',
      component: () => import('@/demo/HOC/hoc.vue')
    },
    {
      path: '/async-tab-switcher',
      name: 'async-tab-switcher',
      component: () => import('@/demo/async-tab-switcher/index.vue')
    }
  ]
})
