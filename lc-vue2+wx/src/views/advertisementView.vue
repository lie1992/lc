<template lang="html">
    <div class="advertisement">
        <div class="header iconfont icon-chevron-copy" @click="$router.back()"></div>
        <iframe :src="ADUrl" width="" height=""></iframe>
    </div>
</template>

<script>
import headerCommon from 'components/header/headerCommon.vue'
import ajax from './../vueResource.ajax.js'

export default {
    props: {
    },
    data () {
        return {
            ADUrl: ''
        }
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.ADUrl = decodeURIComponent(this.$route.query.ADUrl)
    },
    methods: {

    }
}
</script>

<style lang="css" lang="stylus" rel="stylesheet/stylus">
.advertisement
    position:absolute
    min-width:100%
    min-height:100%
    .header
        position:absolute
        z-index:10
        top:8px
        left:5px
        width:30px
        height:30px
        margin:0
        text-align:center
        line-height:30px
        border-radius:100%
        background-color:rgba(0,0,0,0.2)
        color:#fff
    iframe
        position:absolute
        z-index:8
        left:0
        top:0
        min-width:100%
        min-height:100%

    .headerCommon
        display:none
    .messageDesc
        margin-top:0px
</style>
