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

<script>
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
</script>


<style>

ul {
    margin: 0;
    padding: 0;
}

.tab-container .header {
    display: inline-block;
    overflow: hidden;
}

.tab-container .header li {
    list-style: none;
    float: left;
    padding: 10px 20px;
    color: #666;
    background: #eee;
    cursor: pointer;
}

.tab-container .header li.active {
    background: #41b883;
    color: #fff;
}
</style>

