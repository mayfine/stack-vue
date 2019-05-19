<template>
    <div>
        tab1 content...

        <p>props: {{ a }}</p>

        <p>
            slot: 
            <slot name="content-gz">a default</slot>
        </p>

        <div>
            <button @click="$emit('tab1Click', 'tab1 click...')">tab1 btn</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        a: {
            type: Number
        }
    }
}
</script>

