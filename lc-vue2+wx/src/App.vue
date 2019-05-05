<template>
    <div id="app">
        <router-view></router-view>
        <vfooter></vfooter>
    </div>
</template>

<script type="text/ecmascript-6">
    import vfooter from './components/footer/footer.vue'
    export default {
        created () {
        },
        components: {
            vfooter
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    *
        font-family: 'SimHei'
</style>
