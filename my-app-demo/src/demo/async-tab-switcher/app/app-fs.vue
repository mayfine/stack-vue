<template>
    <div>
        tab3 content...

        <p>props: {{ c }}</p>

        <p>
            slot: 
            <slot name="content-fs">c default</slot>
        </p>

        <div>
            <button @click="$emit('tab3Click', 'tab3 click...')">tab3 btn</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        c: {
            type: Number
        }
    }
}
</script>
