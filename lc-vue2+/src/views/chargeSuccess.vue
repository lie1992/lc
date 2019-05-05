<template lang="html">
    <div id="paymentSUC" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:back2="back2Rel"></header-common>
        <div class="wrap">
            <span class="iconfont icon-xuanze"></span>
            充值成功
            <p>余额 <label>￥{{balance}}</label>    </p>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '充值成功',
            iconType: 'icon-fanhui',
            rightParams: {},
            rightParams: {
                path: 'close',
                closeEmit: 'back2'
            },
            close: 'close',
            balance: 0
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.getBalance()
    },
    methods: {
        back2Rel () {
            var push = this.$route.query.push
            if (push) {
                this.$router.go(-1)
            } else {
                this.$router.go(-2)
            }
        },
        getBalance () {
            ajax.ajax({
                'vue': this,
                'port': 'MyInfo',
                'type': 'get',
                'statusOk': function (res, v) {
                    // v.$store.commit('setUserInfo', res.data.data)
                    v.balance = res.data.data.balance
                },
                'statusError': function (res, v) {
                }
            })
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#paymentSUC
    height:273px
    background-color:#fff
    .wrap
        padding-top:55px
        text-align:center
        border-bottom:1px solid #ddd
        padding-bottom:30px
        .iconfont
            margin-top:50px
            display:block
            height:80px
            text-align:center
            margin-bottom:10px
            &:before
                font-size:80px
                color:#dab96e
        p
            margin-top:15px
            label
                font-size:24px
                color:#dab96e
                font-family:'微软雅黑'
</style>
