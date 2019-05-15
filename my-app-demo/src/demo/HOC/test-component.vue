<template>
    <div>
        <h3>{{ name }} : {{ age }}</h3>
        <slot name="title">slot title</slot>
        <slot name="content">slot content</slot>
        <div>
            <button @click="$emit('check')">123</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String
        },

        age: {
            type: Number
        }
    }
}
</script>
