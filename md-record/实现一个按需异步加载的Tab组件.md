## 效果演示
  
<div align=center>
<img src="https://github.com/mayfine/stack-vue/blob/master/md-record/static/QQ20190516232123HD.gif" width="800" alt="演示"/>
</div>

## 实现逻辑分析

<div align=center>
<img src="https://github.com/mayfine/stack-vue/blob/master/md-record/static/Async-Tab-Switcher.png" width="920" alt="实现逻辑"/>
</div>

确定好基本的实现逻辑之后，下面就一步步验证下我们的想法。

## 一步步实现

### 1. 基本Tab组件准备

基本的逻辑无非就是根据不同的Tab id切换不同的内容，这里我们不赘述，先看下这一步我们按照步骤应该得到的一个大致结构。如下：

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

            <!-- Tab内容模块 -->
            <component 
                :is="item.dynamicComponent" 
                v-if="item.dynamicComponent">
            </component>

            <!-- 可扩展支持自定义loading -->
            <div class="loading" v-else >{{ item.id }}_loading...</div>
        </div>
    </div>
</template>
```

### 2. 基本数据格式确定

基于以上Tab基本结构，我们可以知道外层传递的数据结构里面的需要哪些字段

- id：导航逻辑上唯一标识
- name：名称展示
- component：Tab对应的内容，这里即异步组件

按照我们的实现逻辑，因为要实现 `按需加载` ，所以我们component字段应该是import业务组件返回Promise的函数。另外，我们还需实现组件需支持的三个重点功能模块：
- 值传递 `props`（v-on）
- 事件绑定（v-bind）
- 动态内容插槽 `slot`

针对基本组件层面上的这几点要求，我们先从数据层面丰富，先确立如下字段需求。

- props：基本属性设置／组件数据传递
- on：事件事件绑定
- slot：组件所需插槽设置

好，汇总一下，id／name／props／on／component 这几个字段的格式我们可以确定：
1. id／name：一般Tab我们会设置为带语义的字符串
2. props／on：对象Object
3. component：函数声明Function，import()返回Promise

至于slot，目前我们没办法在数据上进行传递，因为`涉及动态模板和作用域`。不能像数据上的处理方式那么便捷，但我们保持Vue Slot 的基本定义进行传递，但这种有个不灵活的地方，我们现在场景中的多个Tab组件中的具名slot不能同名，因为涉及到转换分配的问题。好在这个好解决，我们可以在各个业务组件中将具名属性设置不同或者转换成不一样。现在根据我们的针对Slot的解决方案，我们可以确定slot字段我们只需传递插槽名 `name` 字段，基于支持多个插槽，所以 `slot字段应该是个数组类型［Array］`

至此，我们可以大概确立基本的数据结构，如下：

```javascript

{
    id: '',
    name: '',
    props: {
        a: ''
    },
    on: {
        event: this.event
    },
    slot: [],
    component: () => import('xxx')
}
```

### 3. Tab模板更新
确定了数据结构即slot插槽传递方案之后，我们可以先更新下Tab内容模块动态组件的声明模板。

```html
...
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
...
```

更新Props

```javascript
props: {
    tabConfig: {
        type: Array,
        default: () => []
    }
}
```

### 4. 按需加载逻辑初始化

```javascript
/**
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

        }, 600);
    });
}
```

这里我们只展示主要实现逻辑，实际开发过程需要代码健壮性相关的考虑，这里就略去这part。

至此，我们完成了 `Tab Switcher` 主要逻辑实现，接下来我们具体应用下。

### 5. Tab-Switcher应用

```html
<template>
    <div class="async-tab-switcher-demo">
        <tab-switcher :tab-config="tabItems">

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
            tabItems: [{
                id: 'gz',
                name: '广州',
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
            console.log(text);
        }
    }
}
</script>
```

好了，到这里，我们就完成了一个具备基本 `按需异步加载` 的Tab切换组件。


>代码目录：/stack-vue/my-app-demo/src/demo/async-tab-switcher

>本地路由：localhost:8080/#/async-tab-switcher

