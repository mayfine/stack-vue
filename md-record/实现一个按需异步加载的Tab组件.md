## 效果演示
  
<div align=center>
<img src="https://github.com/mayfine/stack-vue/blob/master/md-record/static/QQ20190516232123HD.gif" width="800" height="500" alt="演示"/>
</div>

## Tab初始化使用配置
```html
<tab-switcher :tab-item="tabItems"></tab-switcher>
```

```javascript
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
```

## 实现方式 (持续review更新中)

>代码目录：/stack-vue/my-app-demo/src/demo/async-tab-switcher

>本地路由：localhost:8080/#/async-tab-switcher

vue tab-switcher template
```html
<template>
    <div class="tab-container">
        <ul class="header">
            <li 
                :class="{'active': isActive(item.id)}"  
                v-for="item in availableTabItem" :key="`header_${item.id}`"
                @click="active = item.id">{{ item.name }}</li>
        </ul>

        <div class="tab-item" v-for="item in availableTabItem" :key="`content_${item.id}`" v-show="isActive(item.id)">
            <component 
                :is="item.dynamicComponent" 
                v-bind="item.props"
                v-on="item.on"
                v-if="item.dynamicComponent"></component>

            <!-- 可扩展支持自定义loading -->
            <div class="loading" v-else >{{ item.id }}_loading...</div>
        </div>
    </div>
</template>
```

tab-switcher javascript
```javascript
export default {
    props: {
        tabItem: {
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            availableTabItem: [],
            active: ''
        }
    },

    created () {
        this.init();
    },

    methods: {
        init () {
            // 可以新增一些过滤规则将不合规的tab过滤掉，略
            this.availableTabItem = this.tabItem.filter((item, index) => item);

            if (!this.availableTabItem.length) {
                return;
            }

            // 可以根据实际情况初始化展示Tab
            this.active = this.active || this.availableTabItem[0].id;
        },

        isActive (id) {
            return this.active === id;
        },

        /**
         * initActiveTab
         */
        initActiveTab (id) {
            this.availableTabItem.some((item, index) => {
                if (item.id === id) {

                    if (item.dynamicComponent) {
                        return true;
                    }

                    if (item.on) {
                        this.availableTabItem[index]['on'] = item.on;
                    }

                    item.component().then(moduleRes => {
                        
                        // setTimeout测试效果
                        setTimeout(() => {

                            // 更新异步请求获取的动态组件，并触发视图更新
                            this.$set(this.availableTabItem[index], 'dynamicComponent', moduleRes.default);

                            return true;
                        }, 600);
                    });
                }
            })
        }
    },

    watch: {
        active: {
            immediate: true,
            handler (activeId) {
                if (!activeId) {
                    return;
                }

                this.initActiveTab(activeId);
            }
        }
    }
}
```

未完待续...

