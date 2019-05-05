<template lang="html">
    <div class="advertisement">
        <!-- <div class="header iconfont icon-chevron-copy" @click="$router.back()"></div>
        <iframe :src="ADUrl" width="" height=""></iframe> -->
        <iframe scrolling="no"  :src="ADUrl"></iframe>
        <div id="cjhBack" class="iconfont icon-fanhui" @click="hiddenCJH"></div>
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
        this.getURL()
    },
    methods: {
        getURL () {
            // window.alert(window.localStorage.curAreaID)
            ajax.ajax({
                'vue': this,
                'port': 'GetOffender',
                'type': 'get',
                'params_url': '?countyId=' + window.localStorage.curAreaID,
                'statusOk': function (res, v) {
                    console.log(res.data.data)
                    if(res.data.data.appUrl === ''){
                        window.$.PageDialog.ok('当前区域未开通违章查询功能')
                        return
                    }
                    v.ADUrl = res.data.data.appUrl
                },
                'statusError': function (res, v) {
                }
            })
            // ajax.ajax({
            //     'vue': this,
            //     'port': 'GetInquiry',
            //     'type': 'get',
            //     'statusOk': function (res, v) {
            //         console.log(res.data.data)
            //         v.ADUrl = res.data.data
            //     },
            //     'statusError': function (res, v) {
            //     }
            // })
        },
        hiddenCJH () {
            this.$router.back()
        }
    }
}
</script>

<style lang="css" lang="stylus" rel="stylesheet/stylus">
@import "../assets/css/index.styl"
#cjhBack
    background-color:rgba(0,0,0,0.5)
    border-radius:100%
    width:30px
    height:30px
    line-height:30px
    margin:10px
</style>
