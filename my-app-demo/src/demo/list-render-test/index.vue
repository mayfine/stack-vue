<template>
    <div>
        <!-- table start -->
        <table>
            <thead>
                <tr>
                    <th>张三</th>
                    <th>李四</th>
                    <th>王五</th>
                    <th>赵六</th>
                    <th>陈七</th>
                    <th>孙八</th>
                    <th>钱九</th>
                    <th>徐十</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{ item.a }}</td>
                    <td>{{ item.b }}</td>
                    <td>{{ item.c }}</td>
                    <td>{{ item.d }}</td>
                    <td>{{ item.e }}</td>
                    <td>{{ item.f }}</td>
                    <td>{{ item.g }}</td>
                    <td>{{ item.h }}</td>
                </tr>
            </tbody>
        </table>
        <!-- table end -->

        <!-- <ul v-for="(item, index) in list" :key="index">
            <li>{{ item.a }}</li>
            <li>{{ item.b }}</li>
            <li>{{ item.c }}</li>
            <li>{{ item.d }}</li>
            <li>{{ item.e }}</li>
            <li>{{ item.f }}</li>
            <li>{{ item.g }}</li>
            <li>{{ item.h }}</li>
        </ul> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: []
        }
    },

    created () {
        let temp = [];
        for (let i = 0; i < 1; i++) {
            temp.push({
                a: 'col1-content',
                b: 'col2-content',
                c: 'col3-content',
                d: 'col4-content',
                e: 'col5-content',
                f: 'col6-content',
                g: 'col7-content',
                h: 'col8-content',
            });
        }

        // this.list = temp;
        this.list = Object.freeze(temp);
    }
}
</script>

<style>
ul {
    display: block;
}

li {
    display: inline-block;
}
</style>

