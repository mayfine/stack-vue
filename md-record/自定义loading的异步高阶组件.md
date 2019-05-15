## 效果演示
  
  
<div align=center>
<img src="https://github.com/mayfine/stack-vue/blob/master/md-record/static/QQ20190515230145HD.gif" width="800" height="500" alt="演示"/>
</div>

## 实现方式 (持续review更新中)

>代码目录：/stack-vue/my-app-demo/src/demo/HOC
本地路由：localhost:8080/#/HOC


```javascript
import Vue from 'vue';

/**
 * 默认loading的高阶异步组件
 * @param {Promise} syncComponentLoad 
 * @param {Component | String} loadingComponent 
 * 
 * @returns {Component}
 */
export default function dymamicComponentWithLoading (syncComponentLoad, loadingComponent) {
    return {
        data () {
            return {
                // 模板
                template: null,

                // 异步组件
                syncComponent: null
            }
        },

        /**
         * 初始化组件template
         * @param {createElement} createElement 
         * 
         * 可添加自定义loading
         */
        render (h) {
            let slots = this.$slots;
            let scopedSlots = {};

            Object.keys(slots).forEach(key => {
                scopedSlots[key] = () => slots[key];
            });

            return this.syncComponent ? h(this.syncComponent, {
                props: this.$attrs,
                on: this.$listeners,
                scopedSlots,
            }) : loadingComponent ? h(loadingComponent) : h('div', {}, 'loading...');
        },

        created () {
            syncComponentLoad.then(loadedModule => {

                // setTimeout用于异步加在演示
                setTimeout(() => {
                    this.syncComponent = loadedModule.default;

                    /**
                     * @TODO 动态组件编译
                     * @TODO 透传动态组件的属性和事件
                     */
                    this.template = Vue.compile(
                        `<component 
                            :is="syncComponent" 
                            v-on:slots="$scopedSlots"
                            v-on="$listeners" 
                            v-bind="$attrs" />`
                    ).render;
                }, 2000)
            });
        }
    }
}
```

想到一点更新一点，实时纪录自己的一些想法与改进，希望达到预期，越来越好，不对的地方或者有好的建议欢迎留言告诉我！
