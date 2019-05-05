<template lang="html">
    <div id="Recharge" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:closeRecharge="closeRechargeRel"></header-common>
        <div class="paymentWrap">
            <div class="itemWrap payList">
                <div class="ttl">支付方式</div>
                <!-- 1-支付宝,2-微信支付,4-银联支付,8-余额支付 -->
                <div class="payType weixin" @click="select(2)"><span class="payIcon"><img src="../assets/images/icon_weixin.png" alt=""></span><span class="payName">微信</span><span class="iconfont icon-39" :class="payType === 2?'icon-xuanze':''"></span></div>
                <!-- <div class="payType weixin" @click="select(4)"><span class="payIcon"><img src="../assets/images/icon_yinlian.png" alt=""></span><span class="payName">银联</span><span class="iconfont icon-39" :class="payType === 4?'icon-xuanze':''"></span></div> -->
            </div>
            <div class="btnWrap" >
                <button @click="paymentNow()">确认支付</button>
            </div>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'
import { Toast, Switch } from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    props: {
        // chargeData: {
        //     type: Object
        // }
    },
    data () {
        return {
            viewTitle: '在线支付',
            iconType: 'icon-fanhui',
            rightParams: {
            },
            // 1 支付宝 2 微信 4 银联
            payType: 2,
            // 是否使用余额
            isUsebalance: false,
            // 微信config是否配置成功
            isReady: false,
            // 是否正在微信支付中
            isPaying: false
        }
    },
    components: {
        'header-common': headerCommon,
        'mt-switch': Switch
    },
    created () {
        var _url = encodeURIComponent(location.href)
        ajax.ajax({
            'vue': this,
            'port': 'GetWxPayConfig',
            'type': 'get',
            'params_url': '?url=' + _url,
            'statusOk': function (res, v) {
                var params = JSON.parse(res.data.data)
                wx.config({
                    debug: false,
                    appId: params.appId,
                    timestamp: params.timestamp,
                    nonceStr: params.noncestr,
                    signature: params.signature,
                    jsApiList: ['chooseWXPay']
                    // jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseWXPay']
                });
                wx.ready(function() {
                    v.isReady = true
                })
            },
            'statusError': function (res, v) {
            }
        })
    },
    methods: {
        closeRechargeRel () {
        },
        select (type) {
            this.payType = type
        },
        // 1-支付宝,2-微信支付,4-银联支付,8-余额支付
        paymentNow () {
            // var params = this.chargeData
            // params.payTypeId = this.payType
            // console.log(params)
            // 调起微信支付
            if (!this.isReady) {
                window.$.PageDialog.ok('请稍等，正在加载微信支付')
                return false
            }
            if (wx) {
                var _url = document.location.toString().split('#')[1]
                var code = this.getQueryString('code')
                var state = this.getQueryString('state')
                var rechargeTempId = this.getQueryString2(_url, 'rechargeTempId')
                var rechargeAmount = this.getQueryString2(_url, 'rechargeAmount')
                var params = {
                    'rechargeTempId': rechargeTempId,
                    'rechargeAmount': rechargeAmount,
                    'isJsApi': true,
                    'code': code,
                    'payTypeId': 2
                }
                if (this.isPaying === true) {
                    window.$.PageDialog.ok('请稍候,正在唤起微信支付')
                    return false
                }
                this.isPaying = true
                ajax.ajax({
                    'vue': this,
                    'port': 'Recharge',
                    'type': 'post',
                    'req_params': params,
                    'statusOk': function (res, v) {
                        var params = JSON.parse(res.data.data)
                        wx.chooseWXPay({
                            timestamp: params.timeStamp,
                            nonceStr: params.nonceStr,
                            package: params.package,
                            signType: "MD5",
                            paySign: params.paySign,
                            success: function (res) {
                                // 支付成功后的回调函数
                                // window.$.PageDialog.ok('充值成功')
                                this.isPaying = false
                                // v.$router.back()
                                v.$router.push('/chargeSuccess')
                            },
                            cancel: function (res) {
                                window.$.PageDialog.ok('取消充值')
                                this.isPaying = false
                                v.$router.back()
                            }
                        });
                    },
                    'statusError': function (res, v) {
                        window.$.PageDialog.ok(res.data.errorMessage)
                    }
                })
            }
        },
        GetUrlRelativePath () {
　　　　     var url = document.location.toString();
　　　　     var arrUrl = url.split("//");
　　　　     var start = arrUrl[1].indexOf("/");
　　　　     var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
　　　　     if(relUrl.indexOf("?") != -1){
　　　　　　      relUrl = relUrl.split("?")[0];
　　　　     }
　　　　     return relUrl
　　    },
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        getQueryString2(url,name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = url.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        call (num) {
            window.location.href = 'tel:' + num
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#Recharge
    position: fixed
    top:0
    left:0
    width:100%
    height:100%
    background-color:#f5f5f5
    z-index:1000
    .paymentWrap
        padding-top:45px
        padding-bottom:74px
        .itemWrap
            .ttl
                line-height:40px
                padding-left:10px
                background-color:#f5f5f5
            p
                background-color:#fff
                padding-left:10px
                border-bottom:1px solid #ddd
            .storeName
                height:50px
                line-height:50px
            .group
                height:55px
                line-height:55px
                position:relative
                span
                    display:block
                    overflow:hidden
                    white-space:nowrap
                    overflow:hidden
                    text-overflow:ellipsis
                    height:20px
                    line-height:20px
                    font-size:14px
                    color:#999
                .item
                    font-size:16px
                    line-height:28px
                    height:28px
                    color:#333
                &:before
                    position:absolute
                    right:2px
            .cost
                color:#999
                font-size:16px
                line-height:50px
                border-bottom:1px solid #ddd
                em
                    font-size:20px
                    color:#c7a770
                    font-style:normal
                    font-family:'微软雅黑'
            .payType
                line-height:50px
                position:relative
                margin-left:40px
                border-bottom:1px solid #ddd
                &:last-child
                    border-bottom:none
                .payIcon
                    position:absolute
                    padding:0 12px
                    left:-45px
                    img
                        width:30px
                        height:30px
                        vertical-align:middle
                .iconfont
                    font-size:24px
                    color:#999
                    float:right
                    margin-right:10px
                .icon-xuanze
                    color:#c7a770
        .balance
            margin-top:10px
            background-color:#fff
            line-height:50px
            padding-left:12px
            border-bottom: 1px solid  #ddd
            .mint-switch
                float:right
                margin:9px 10px 0 0
                .mint-switch-core
                    border-color:#c7a770
                    background-color:#c7a770
            em
                margin-left:15px
                color:#c7a770
                font-style:normal
                font-family:'微软雅黑'
        .payList
            border-bottom:1px solid #ddd
            background-color:#fff

        .btnWrap
            position: fixed
            bottom: 0
            width: 100%
            background-color: #fff
            z-index: 2
            button
                width: 94%
                margin: 20px 3% 10px 3%
                background-color: #c7a770
                height: 44px
                line-height: 44px
                color: #fff
                border: none
                font-size: 18px

</style>
