<template>
    <div class="tab-container">
        <ul class="header">
            <li 
                :class="{'active': isActive(item.id)}"  
                v-for="item in availableTabItem" :key="`header_${item.id}`"
                @click="active = item.id">{{ item.name }}</li>
        </ul>

        <div class="tab-item" v-for="item in availableTabItem" :key="`content_${item.id}`" v-show="isActive(item.id)">

            <!-- 透传异步组件的属性及事件绑定 -->
            <component 
                :is="item.dynamicComponent" 
                v-bind="item.props"
                v-on="item.on"
                v-if="item.dynamicComponent">

                <!-- slot转换 -->
                <div :slot="slotName" v-for="slotName in item.slot" :key="slotName">
                    <slot :name="slotName"></slot>
                </div>

            </component>

            <!-- 可扩展支持自定义loading -->
            <div class="loading" v-else >{{ item.id }}_loading...</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabConfig: {
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
            // 可以新增一些过滤规则将不合规的tab过滤掉，或初始化不合规范的类型定义
            this.availableTabItem = this.tabConfig.filter((item, index) => item);

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
         * 
         * 更新当前Tab
         * @method initActiveTab
         * @param {String} id - Tab id
         */
        initActiveTab (id) {
            let activeTabIndex = 0;

            this.availableTabItem.some((item, index) => {
                if (item.id === id) {
                    activeTabIndex = index;

                    return true;
                }
            });

            let activeTabItem = this.availableTabItem[activeTabIndex];

            // 避免重复Tab切换过程导致组件重新加载渲染
            if (activeTabItem.dynamicComponent) {
                return;
            }

            activeTabItem.component().then(moduleRes => {
                
                // 异步加载效果演示
                setTimeout(() => {

                    // 更新异步请求获取的动态组件，并触发视图更新
                    this.$set(this.availableTabItem[activeTabIndex], 'dynamicComponent', moduleRes.default);

                    return true;
                }, 600);
            });
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
</script>


<style lang="scss" scoped>
.tab-container {
    .header {
        display: inline-block;
        overflow: hidden;

        li {
            list-style: none;
            float: left;
            padding: 10px 20px;
            color: #666;
            background: #eee;
            cursor: pointer;
        }
    }
}

.tab-container .header li.active {
    background: #41b883;
    color: #fff;
}
</style>

