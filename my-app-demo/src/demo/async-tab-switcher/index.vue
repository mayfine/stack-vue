<template>
    <div>
        <tab-switcher :tab-item="tabItems"></tab-switcher>
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
            tabItems: [{
                id: 'gz',
                name: '广州',
                props: {
                    a: 1
                },
                on: {
                    tab1Click: this.tab1Click
                },
                component: () => import('./tab/tab1.vue')
            }, {
                id: 'sz',
                name: '深圳',
                props: {
                    b: 2
                },
                on: {
                    tab2Click: this.tab2Click
                },
                component: () => import('./tab/tab2.vue')
            }, {
                id: 'fs',
                name: '佛山',
                props: {
                    c: 3
                },
                on: {
                    tab3Click: this.tab3Click
                },
                component: () => import('./tab/tab3.vue')
            }]
        }
    },

    methods: {
        tab1Click (text) {
            console.log(text);
        },

        tab2Click (text) {
            console.log(text);
        },

        tab3Click (text) {
            console.log(text);
        }
    }
}
</script>
