<template>
    <div>
        tab3 content...

        <p>props: {{ c }}</p>

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
