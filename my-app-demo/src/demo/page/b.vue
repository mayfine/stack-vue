<template>
    <div>
        {{ count }}

        <div>
            <button @click="increment">increment</button>
            <button @click="decrement">decrement</button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'count'
            ])
        },

        methods: {
            increment () {
                this.$store.commit('increment');
            },

            decrement () {
                this.$store.commit('decrement');
            }
        }
    }
</script>

<style>

</style>