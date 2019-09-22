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
    import {
        mapGetters,
        mapState,
        mapMutations,
        mapActions
    } from 'vuex'

    export default {
        computed: {
            // ...mapGetters([
            //     'pageA/count'
            // ]),

            // count () {
            //     return this['pageA/count']
            // }

            ...mapState('pageA', {
                count: state => state.count
            })
        },

        methods: {
            // increment () {
            //     this.$store.commit('pageA/increment');
            // },

            // decrement () {
            //     this.$store.commit('pageA/decrement');
            // },

            // ...mapMutations([
            //     'increment',
            //     'incrementBy'
            // ]),

            ...mapMutations({
                increment: 'pageA/increment',
                decrement: 'pageA/decrement'
            })
        }
    }
</script>

<style>

</style>