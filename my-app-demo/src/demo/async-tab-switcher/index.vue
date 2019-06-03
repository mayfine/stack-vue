<template>
    <div class="async-tab-switcher-demo">
        <tab-switcher :tab-config="tabItems" :active.sync="activeTab">

            <!-- 
                注：
                ＊＊ 由于slot目前不能进行动态设置，在这里通过设定 ‘name’ ，多层传递间接到达业务组件 ＊＊
                ＊＊ 不能重名，若存在重名，可在业务组件进行调整，避免引起内容不对称 ＊＊
             -->
            <div slot="content-gz">slot guangzhou content ...</div>
            <div slot="content-sz">slot shenzhen content ...</div>
            <div slot="content-fs">slot foshan content ...</div>
        </tab-switcher>
    </div>
</template>

<script>
import tabSwitcher from './tab/tab-switcher.vue';

export default {
    components: {
        tabSwitcher
    },

    data () {
        return {
            activeTab: 'sz',
            tabItems: [{
                id: 'gz',
                name: '广州',
                keepAlive: false,
                props: {
                    a: 1
                },
                on: {
                    tab1Click: this.tabClick
                },
                slot: ['content-gz'],
                component: () => import('./app/app-gz.vue')
            }, {
                id: 'sz',
                name: '深圳',
                props: {
                    b: 2
                },
                slot: ['content-sz'],
                on: {
                    tab2Click: this.tabClick
                },
                component: () => import('./app/app-sz.vue')
            }, {
                id: 'fs',
                name: '佛山',
                disabled: true,
                props: {
                    c: 3
                },
                slot: ['content-fs'],
                on: {
                    tab3Click: this.tabClick
                },
                component: () => import('./app/app-fs.vue')
            }]
        }
    },

    methods: {

        /**
         * 异步组件事件绑定测试
         */
        tabClick (text) {
            alert(text);
        }
    }
}
</script>
