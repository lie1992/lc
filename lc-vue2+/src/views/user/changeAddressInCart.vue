<template lang="html">
    <!-- 切换地址 购物车-->
    <div id="Cartaddress">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:closeAddress="closeAddressReal"></header-common>
        <div id="addressWrap">
            <div class="slide" ref="scrollBar">
                <div class="slideBar">
                    <div class="list" v-for="add in addressList">
                        <div class="info" @click="selectAddress(add)">
                            <p><span class="name">{{add.customerName}}</span><span class="tel">{{add.phoneNumber}}</span></p>
                            <p class="addressInfo">{{add.details}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnWrap">
                <button class="charge" @click="$router.push('/user/addAddress')">添加地址</button>
            </div>
        </div>
    </div>

</template>

<script>
import headerCommon from '../../components/header/headerCommon.vue'
import Bscroll from 'better-scroll'
import { Toast, MessageBox } from 'mint-ui'
import ajax from './../../vueResource.ajax.js'
// import ports from './../../port.js'
export default {
    data () {
        return {
            viewTitle: '我的地址',
            iconType: 'icon-fanhui',
            rightParams: {
                path: 'close',
                closeEmit: 'closeAddress'
            },
            close: 'close',
            // 地址列表
            addressList: []
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.getAddressList()
        this.$nextTick(function () {
            this._initScroll()
        })
    },
    computed: {
        cartData () {
            return this.$store.state.cart.cartData
        },
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    beforeCreate () {
        // this.$store.commit('hideFoot')
    },
    methods: {
        selectAddress (val) {
            var smData = this.$store.state.cart.cartConfirmSMData
            smData.addressDetails = val.details
            smData.addressId = val.id
            smData.addressCustomerName = val.customerName
            this.$emit('closeAddressParent')
        },
        closeAddressReal () {
            this.$emit('closeAddressParent')
        },
        _initScroll () {
            this.viewScroll = new Bscroll(this.$refs.scrollBar, {
                click: true,
                scrollY: true
            })
        },
        getAddressList () {
            ajax.ajax({
                'vue': this,
                'port': 'MyAddresses',
                'type': 'get',
                'statusOk': function (res, v) {
                    v.addressList = res.data.data
                    // console.log(this.addressList)
                    setTimeout(function () {
                        v.viewScroll.refresh()
                    }, 300)
                },
                'statusError': function (res, v) {
                    // window.$.PageDialog.ok('获取地址失败')
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#Cartaddress
    position:fixed
    z-index:101
    background-color:#f5f5f5
    top:0
    left:0
    width:100%
    height:100%
    #addressWrap
        position:absolute
        top:55px
        bottom:74px
        width:100%
        .slide
            height:100%
            .list
                background-color:#fff
                margin-bottom:10px
                border-bottom:1px solid #ddd
                .info
                    min-height: 60px
                    padding-bottom:10px
                    margin-left:10px
                    border-bottom:1px solid #ddd
                    p
                        overflow:hidden
                        color:#333
                        .name
                            float:left
                            line-height:35px
                            font-size:18px
                            color:#333
                            display:inline-block
                            width:100px
                            overflow:hidden
                        .tel
                            float:left
                            display:inline-block
                            line-height:35px
                            font-size:15px
                        &:last-child
                            color:#999
                    &:last-child
                        border-bottom:none
            .operate
                height:45px
                display:flex
                div
                    flex:1
                    line-height:45px
                    span
                        color:#c3c3c3
                        margin-right:8px
                        vertical-align:middle
                        font-size:24px
                        display:inline-block
                        height:24px
                        line-height:24px
                    &:first-child
                        text-align:left
                        padding-left:10px
                    &:last-child
                        text-align:right
                        padding-right:20px
                        span
                            font-size:18px
                .sel
                    span
                        color:#dab96e
        .btnWrap
            position:fixed
            bottom:0
            width:100%
            background-color:#fff
            z-index:2
            .charge
                width: 94%
                margin: 20px 3% 10px 3%
                background-color: #c7a770
                height: 44px
                line-height: 44px
                color: #fff
                border: none
                font-size: 18px
</style>
