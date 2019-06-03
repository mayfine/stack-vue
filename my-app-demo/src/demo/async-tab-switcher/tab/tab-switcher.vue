<template>
    <div class="tab-container">
        <ul class="header">
            <li 
                v-for="item in availableTabItem"
                :class="[{'active': isActive(item.id)}, {'disabled': item.disabled}]"  
                :key="`header_${item.id}`"
                @click="switchTab(item)">{{ item.name }}</li>
        </ul>

        <div class="tab-item" v-for="item in availableTabItem" :key="`content_${item.id}`" v-show="isActive(item.id)">

            <!-- 透传异步组件的属性及事件绑定 -->
            <component 
                :is="item.dynamicComponent" 
                :is-active="isActive(item.id)"
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
/**
 * 【异步动态加载的Tab组件】
 * 
 * 组件参数配置说明：
 * @param {String|Number} [activeTab] - 设置默认展示的Tab ID
 * @param {Array} [tabConfig] - 所有Tab配置信息集合 [tabItem, tabItem]
 * 
 * @example tabConfig参数内元素tabItem结构示例及说明
 *     {
 *         id: 'id',                                -- ID设置
 *         name: 'name',                            -- 展示Name设置
 *         keepAlive: true,                         -- 是否需要keep-alive，默认为true，组件只初始化加载一次
 *         props: {                                 -- 内容组件的值传递
 *             value: 1
 *         },
 *         on: {                                    -- 内容组件事件绑定
 *             tabEvent: this.tabEvent
 *         },
 *         slot: ['content'],                       -- 内容组件的具名插槽设置
 *         component: () => import('./test.vue')    -- 内容组件异步加载函数
 *     }
 * 
 * @example 组件使用示例
 *     <tab-switcher :tab-config="tabItems" :active.sync="activeTab">
 *     
 *        <!-- 
 *            注：
 *            ** 由于slot目前不能进行动态设置，在这里通过设定 ‘name’ ，多层传递间接到达业务组件 **
 *            ** 不能重名，若存在重名，可在业务组件进行调整，避免引起内容不对称 **
 *        -->
 *        <div slot="content-1">slot 1 content ...</div>
 *        <div slot="content-2">slot 2 content ...</div>
 *        <div slot="content-3">slot 3 content ...</div>
 *     </tab-switcher>
 * 
 * 备注：内容组件中支持接收变量 `isActive` 来得知当前组件是不是当前展示组件，可用于业务组件中进行局部刷新的控制
 */
export default {
    props: {
        active: {
            type: String
        },

        tabConfig: {
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            availableTabItem: [],
            activeTab: ''
        }
    },

    created () {
        this.init();
    },

    methods: {
        init () {

            // 可以新增一些过滤规则将不合规的tab过滤掉，或初始化不合规范的类型定义，例如：
            this.availableTabItem = this.tabConfig.filter((item, index) => {
                if (!item.component || !item.id) {
                    return false;
                }

                return true;
            }).map(item => Object.assign({}, {

                // 默认keep-alive
                keepAlive: true
            }, item));

            if (!this.availableTabItem.length) {
                return;
            }

            // 可以根据实际情况初始化展示Tab
            this.activeTab = this.activeTab || this.availableTabItem[0].id;
        },

        isActive (id) {
            return this.activeTab === id;
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

            /**
             * 避免重复Tab切换过程导致组件重新加载渲染
             * 支持设置实时刷新，keepAlive设置为false
             */
            if (activeTabItem.dynamicComponent && activeTabItem.keepAlive) {
                return;
            }
            
            if (!activeTabItem.keepAlive) {
                this.$set(this.availableTabItem[activeTabIndex], 'dynamicComponent', '');
            }

            activeTabItem.component().then(moduleRes => {
                
                // 异步加载效果演示
                setTimeout(() => {

                    // 更新异步请求获取的动态组件，并触发视图更新
                    this.$set(this.availableTabItem[activeTabIndex], 'dynamicComponent', moduleRes.default);
                }, 600);
            });
        },
        
        /**
         * Tab切换
         * disabled禁用锁
         * @method switchTab
         * @param {Object} item - 触发的Tab节点信息
         */
        switchTab (item) {
            if (item.disabled) {
                return;
            }

            this.activeTab = item.id;
        }
    },

    watch: {
        activeTab: {
            immediate: true,
            handler (activeId) {
                if (!activeId) {
                    return;
                }

                this.initActiveTab(activeId);

                this.$emit('update:active', activeId);
            }
        },

        active: {
            immediate: true,
            handler (activeId) {
                if (!activeId) {
                    return;
                }

                this.activeTab = activeId;
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

            &.disabled {
                opacity: .5;
                cursor: not-allowed;
            }
        }
    }
}

.tab-container .header li.active {
    background: #41b883;
    color: #fff;
}
</style>

