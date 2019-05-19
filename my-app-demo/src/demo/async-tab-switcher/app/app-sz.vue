<template>
    <div>
        tab2 content...

        <p>props: {{ b }}</p>

        <p>
            slot: 
            <slot name="content-sz">b default</slot>
        </p>

        <div>
            <button @click="$emit('tab2Click', 'tab2 click...')">tab2 btn</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        b: {
            type: Number
        }
    }
}
</script>