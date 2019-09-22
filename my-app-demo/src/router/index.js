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
        },
        {
            path: '/list-render-test',
            name: 'list-render-test',
            component: () => import('@/demo/list-render-test/index.vue')
        },
        {
            path: '/demo-page-a',
            name: 'demo-page-a',
            component: () => import('@/demo/page/a.vue'),
            meta: {
                title: '个人中心',
                requireAuth: true
            }
        },
        {
            path: '/demo-page-b',
            name: 'demo-page-b',
            component: () => import('@/demo/page/b.vue')
        }
    ]
})
