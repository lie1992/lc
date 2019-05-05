<template lang="html">
    <div id="orderDetail" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:back2="back2Rel"></header-common>

        <div class="orderDetailWrap">
            <div class="txtInfo">
                <p><span class="name">订单状态：</span><span class="gold">{{data.orderDisplayStatus}}</span></p>
                <p><span class="name">支付方式：</span><span>{{data.finalPayTypeName}}</span></p>
                <p><span class="name">订单编号：</span><span>{{data.orderCode}}</span></p>
                <p><span class="name">下单时间：</span><span>{{data.createOn}}</span></p>
                <p><span class="name">车牌号码：</span><span>{{data.licensePlate}}</span></p>
                <p><span class="name" v-if="data.serviceTypeId === 1">联系人：</span><span>{{data.appointmentCustomerName}}</span></p>
                <p><span class="name" v-if="data.serviceTypeId === 1">手机号：</span><span>{{data.appointmentPhoneNumber}}</span></p>
            </div>
            <div class="content">
                <div class="stt">{{data.serviceTypeId === 2?'门店服务':'上门服务'}}</div>
                <div class="wrap">
                    <div class="storeInfo">
                        <p>{{data.serviceTypeId === 2?data.storeName:data.appointmentCustomerName}}</p>
                        <p>{{data.serviceTypeId === 2?data.storeAddress:data.appointmentAddress}}</p>
                    </div>
                    <div class="time">预约时间：<span>{{data.appointment}}</span></div>
                </div>
            </div>
            <div class="content">
                <div class="stt">商品详情</div>
                <div class="wrap">
                    <div v-for="item in data.orderServices">
                        <div class="ttl">{{item.productName}}<span>耗时<em>{{item.unitDuration}}小时</em>服务费<em>￥{{item.unitPrice}}</em></span></div>
                        <div class="itemWrap">
                            <div class="item" v-for="ca in item.categories">
                                <p class="tt"><span class="name">{{ca.categoryName}}</span></p>
                                <p class="tt2" v-for="pj in ca.accessoryProducts"><span class="desc">{{pj.productName}}x<label>{{pj.quantity}}</label></span><span class="cost">￥{{pj.unitTotalPrice}}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="other">
                        <p>配件<em>￥{{data.accessoryProductTotal?data.accessoryProductTotal:'-'}}</em></p>
                        <p>服务费<em>￥{{data.serviceTotal?data.serviceTotal:'-'}}</em></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="total">
            <label v-if="data.orderDisplayStatus==='已完成'">实付款：<em>￥{{data.realTotalAmount}}</em></label>
            <label v-else-if="data.orderDisplayStatus==='待确认'">{{data.canFinalPay===false?'已付订金':'应付尾款'}}：<em>￥{{data.canFinalPay===false?data.depositAmount:order.finalAmount}}</em></label>
            <label v-else>{{data.canFinalPay===false?'应付订金':'应付尾款'}}：<em>￥{{data.canFinalPay===false?data.depositAmount:data.finalAmount}}</em></label>
            <div class="btnWrap">
                <button v-if="data.canCancel" @click="orderCancel(data)">取消订单</button>
                <button v-if="data.canOfflinePay" @click="OffPay(data)">现金支付</button>
                <button v-if="data.canPayOrder" @click="OrderPay(data)">立即付款</button>
                <button v-if="data.canEvaluate" @click="OrderComm(data)">评价</button>
            </div>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'
import { Toast, MessageBox } from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '订单详情',
            iconType: 'icon-fanhui',
            rightParams: {
                path: 'close',
                closeEmit: 'back2'
            },
            close: 'close',
            data: {}
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.getOrderDetail()
    },
    methods: {
        back2Rel () {
            if(this.data.canCancel){
                this.$router.back()
            }else{
                this.$router.push("/order")
            }
        },
        OrderComm (val) {
            this.$router.push('/comment?id=' + val.id)
        },
        // 现金支付
        OffPay (val) {
            // console.log(val)
            window.sessionStorage.curPaymentOrderID =  val.id
            window.sessionStorage.curPaymentNum = val.canFinalPay===false?val.depositAmount:val.finalAmount
            // depositAmount
            // 修改里程
            MessageBox.prompt('请输入现金码', '').then(({ value, action }) => {
                console.log(value)
                var params = {
                    orderId: val.id,
                    // 支付码
                    technicianRandomCode: value
                }
                ajax.ajax({
                    'vue': this,
                    'port': 'OfflinePayOrder',
                    'type': 'post',
                    'req_params': params,
                    'statusOk': function (res, v) {
                        v.$router.push('/paySuccess?push=1')
                    },
                    'statusError': function (res, v) {
                        window.$.PageDialog.ok(res.data.errorMessage)
                    }
                })
            })
        },
        orderCancel (val) {
            if (val.canPayOrder === false) {
                window.$.PageDialog.ok('该订单暂时无法取消，请稍后再试')
                return false
            }
            ajax.ajax({
                'vue': this,
                'port': 'CancelOrder',
                'type': 'post',
                'req_params': {'orderId': val.id},
                'statusOk': function (res, v) {
                    val.canCancel = false
                    window.$.PageDialog.ok('取消订单成功')
                    val.canPayOrder = false
                    val.orderDisplayStatus = '已取消'
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('取消订单失败')
                }
            })
        },
        OrderPay (val) {
            if (val.canPayOrder === false) {
                window.$.PageDialog.ok('当前订单处于'+ val.orderDisplayStatus+'状态，请稍后再支付')
                return false
            }
            this.$router.push('/payment?orderId=' + val.id + '&orderType=' + val.canFinalPay)
        },
        getOrderDetail () {
            var id = this.$route.params.id
            console.log(id)
            ajax.ajax({
                'vue': this,
                'port': 'GetOrderDetail',
                'type': 'get',
                'params_url': '?id=' + id,
                'statusOk': function (res, v) {
                    console.log(res.data.data)
                    // var date = new Date(res.data.data.createOn)
                    // var month = parseInt(date.getMonth()) + 1
                    // var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
                    // hours = hours < 10 ? '0' + hours :hours
                    // var minutes = date.getMinutes() >= 10?date.getMinutes():'0'+date.getMinutes()
                    // var seconds = date.getSeconds() >= 10?date.getSeconds():'0'+date.getSeconds()
                    // res.data.data.createOn = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours +':'+ minutes +':'+ seconds
                    // console.log(res.data.data.createOn)
                    res.data.data.createOn = v.createDate(res.data.data.createOn)
                    res.data.data.appointment = v.createDate(res.data.data.appointment)
                    v.data = res.data.data
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('修改失败')
                }
            })
        },
        createDate (val) {
            var date = new Date(val)
            var month = parseInt(date.getMonth()) + 1
            var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
            hours = hours < 10 ? '0' + hours :hours
            var minutes = date.getMinutes() >= 10?date.getMinutes():'0'+date.getMinutes()
            var seconds = date.getSeconds() >= 10?date.getSeconds():'0'+date.getSeconds()
            return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours +':'+ minutes +':'+ seconds
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#orderDetail
    .orderDetailWrap
        padding-top:45px
        padding-bottom:62px
        .txtInfo
            padding:12px
            border-bottom:1px solid #ddd
            background-color:#fff
            p
                line-height:26px
                color:#333
                .name
                    color:#999
                    display:inline-block
                    width:80px
                .gold
                    color:#daba70
        .content
            .stt
                line-height:50px
                color:#666
                padding-left:12px
            .wrap
                background-color:#fff
                .storeInfo
                    height:65px
                    padding-left:12px
                    padding-right:25px
                    margin-right:8px
                    background:url(../assets/images/icon_daohang.png)no-repeat
                    background-size:20px 24px
                    background-position:right center
                    border-bottom:1px solid #ddd
                    p
                        display:block
                        white-space:nowrap
                        overflow:hidden
                        text-overflow:ellipsis
                        &:first-child
                            line-height:30px
                            padding-top:8px
                            font-size:18px
                            height:30px
                        &:last-child
                            line-height:20px
                            font-size:16px
                            height:20px
                            color:#999
                .time
                    line-height:55px
                    padding-left:10px
                    border-bottom:1px solid #ddd
                    color:#999
                    span
                        color:#333

                .ttl
                    line-height:50px
                    font-size:17px
                    padding-left:12px
                    overflow:hidden
                    span
                        float:right
                        font-size:15px
                        color:#999
                        em
                            font-style:normal
                            color:#c7a770
                            margin-right:10px
                            font-family:'微软雅黑'
                .itemWrap
                    border-top:1px solid #ddd
                    border-bottom:1px solid #ddd
                    .item
                        min-height:60px
                        padding-bottom:3px
                        margin-left:45px
                        border-bottom:1px solid #ddd
                        &:last-child
                            border:none
                        .cost
                            float:right
                            margin-right:10px
                            line-height:60px
                        .tt
                            /*float:left*/
                            width:100%
                            span
                                display:block
                                white-space:nowrap
                                overflow:hidden
                                text-overflow:ellipsis
                            .name
                                line-height:30px
                                margin-top:4px
                                font-size:17px
                            .desc
                                font-size:15px
                                color:#999
                                line-height:15px
                        .tt2
                            width:100%
                            color: #7d7d7d
                            font-size: 14px
                            overflow: hidden
                            .desc
                                display: block
                                float: left
                                width: 80%
                            .cost
                                float: left
                                text-align: center
                                width: 18%
                                line-height: 15px
                                margin-right:0
                .other
                    padding:12px
                    background-color:#fff
                    line-height:26px
                    border-bottom:1px solid #ddd
                    p
                        em
                            float:right
                            font-style:normal
                            color:#c7a770
                            font-family:'微软雅黑'
    .total
        line-height:60px
        position:fixed
        width:98%
        padding:0 1%
        bottom:0
        left:0
        background-color:#fff
        .btnWrap
            float:right
            button
                border:1px solid #aaa
                background:none
                height:32px
                width:65px
                padding:0
                margin-right:5px
                &:last-child
                    color:#c7a770
                    border-color:#c7a770
        em
            font-style:normal
            color:#c7a770
            font-family:'微软雅黑'


</style>
