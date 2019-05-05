<template lang="html">
    <!--  关于我们 -->
    <div id="aboutUs">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="settingWrap">
            <div class="logo">
                <img src="../assets/images/logo.jpg" alt="">
            </div>
            <div class="content">
                <p v-html="aboutus"></p>
            </div>
            <div class="exp">
                <p>Copyright © 2016 尚门理车.</p>
                <p>All Rights Reserved</p>
            </div>
        </div>
    </div>

</template>

<script>
import headerCommon from '../components/header/headerCommon.vue'
import { Toast } from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '关于我们',
            iconType: 'icon-fanhui',
            rightParams: {},
            aboutus:''
        }
    },
    components: {
        'header-common': headerCommon
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            ajax.ajax({
                'vue': this,
                'port': 'AboutUs',
                'type': 'get',
                'statusOk': function (res, v) {
                    console.log(res.data.data)
                    v.aboutus = res.data.data
                },
                'statusError': function (res, v) {
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#aboutUs
    .settingWrap
        margin-top:75px
        .logo
            margin: 30px 0
            img
                width:40%
                display:block
                margin: 0 auto
                border-radius:20px
        .content
            padding: 10px
            border: 1px solid #ddd
            background-color: #fff
            width:80%
            margin:0 auto
        .exp
            position: fixed
            bottom: 10px
            width: 100%
            max-width: 750px
            p
                text-align: center
                font-size: 13px
                margin: 3px 0
                color: #aaa
</style>
