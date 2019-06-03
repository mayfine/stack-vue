```javascript

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
 * 备注：内容组件中支持接收变量 isActive 来得知当前组件是不是当前展示组件，可用于业务组件中进行局部刷新的控制
 */

```

### 组件使用示例

```html
<tab-switcher :tab-config="tabItems" :active.sync="activeTab">

   <!-- 
       注：
       ** 由于slot目前不能进行动态设置，在这里通过设定 ‘name’ ，多层传递间接到达业务组件 **
       ** 不能重名，若存在重名，可在业务组件进行调整，避免引起内容不对称 **
    -->
   <div slot="content-1">slot 1 content ...</div>
   <div slot="content-2">slot 2 content ...</div>
   <div slot="content-3">slot 3 content ...</div>
</tab-switcher>
```
