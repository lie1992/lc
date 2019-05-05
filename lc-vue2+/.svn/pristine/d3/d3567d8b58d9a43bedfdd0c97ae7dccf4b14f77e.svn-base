<template lang="html">
    <div id="paymentSUC" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:back2="back2Rel"></header-common>
        <div class="wrap">
            <span class="iconfont icon-xuanze"></span>
            支付成功
            <p style="color:#dab96e">￥{{count}}</p>
        </div>
        <div class="operateWrap">
            <button @click="$router.push('/index')">返回首页</button>
            <button v-if="orderArrLength <= 1" @click="$router.push(orderID)">查看订单详情</button>
            <button v-else @click="$router.push(orderID)">查看订单</button>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'

export default {
    data () {
        return {
            viewTitle: '支付成功',
            iconType: 'icon-fanhui',
            rightParams: {},
            rightParams: {
                path: 'close',
                closeEmit: 'back2'
            },
            close: 'close',
            orderID: '',
            orderArrLength: 0,
            count: 0
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.count = window.sessionStorage.curPaymentNum
        if (window.sessionStorage.curPaymentOrderID) {
            var arr = window.sessionStorage.curPaymentOrderID.split(',')
            this.orderArrLength = arr.length
            if (arr.length > 1) {
                this.orderID = '/order'
            } else {
                this.orderID = '/order/' + arr[0]
            }
        }
    },
    methods: {
        back2Rel () {
            var push = this.$route.query.push
            if (push) {
                this.$router.go(-1)
            } else {
                this.$router.go(-2)
            }
        }
    },
    beforeCreate () {
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
        .iconfont
            margin-top:50px
            display:block
            height:80px
            text-align:center
            margin-bottom:10px
            &:before
                font-size:80px
                color:#dab96e
    .operateWrap
        button
            width:42.5%
            height:35px
            font-size:16px
            display:block
            margin-top:20px
            &:first-child
                background-color:#dab96e
                color:#fff
                border:1px solid #dab96e
                margin-left:5%
                float:left
            &:last-child
                float:right
                margin-right:5%
                border:1px solid #ccc
                background-color:#fff
</style>
