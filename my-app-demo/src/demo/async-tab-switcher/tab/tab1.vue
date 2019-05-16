<template>
    <div>
        tab1 content...

        <p>props: {{ a }}</p>

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

