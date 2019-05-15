<template>
    <div>
        <h3>高阶组件示例</h3>
        <hoc-component name="may" :age="age" @check="check">
            <div slot="title">this is slot title...</div>
            <div slot="content">this is slot content...</div>
        </hoc-component>
    </div>
</template>

<script>
import HOC from './index.js';
let HocComponent = HOC(import('./test-component'));

export default {
    components: {
        HocComponent
    },

    data () {
        return {
            age: 18
        }
    },

    methods: {
        check () {
            console.log('click...')
        }
    }
}
</script>

