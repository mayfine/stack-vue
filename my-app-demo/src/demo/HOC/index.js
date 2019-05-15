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