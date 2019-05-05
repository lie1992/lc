<template lang="html">
    <div id="cartAccessories" >
        <!-- 更换配件 -->
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" v-on:updataPJ="updataPJRel"></header-common>
        <div class="cartAccessoriesWrap">
            <div class="content">
                <div class="item" v-for="item in pjData" id="item.id">
                    <p class="select iconfont icon-xuanze" :class="{ 'sel': item.sel }" @click="PJsel(item)"></p>
                    <p class="ttl" @click="PJsel(item)">
                        <span class="desc">{{item.name}}</span>
                        <span class="desc">￥{{item.price}}</span>
                    </p>
                    <p class="change numBar" v-if="item.sel">
                        <span class="reduce iconfont icon-16jiajianjian" @click="reduce(item)"></span>
                        <span class="init"><input type="text" v-model="item.num" @keyup="input(item)"></span>
                        <span class="add iconfont icon-15jiajianjia" @click="plus(item)"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import Bscroll from 'better-scroll'
import headerCommon from 'components/header/headerCommon.vue'
import { Toast } from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '更换配件',
            iconType: 'icon-fanhui',
            rightParams: {
                path: 'back',
                desc: '完成',
                emit: 'updataPJ'
            },
            // 配件数据
            pjData: [],
            // 配件数据 提交用
            updateData: [],
            // 服务ID
            sid: '',
            // 购物车临时ID
            tmpID: ''
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.$store.commit('hideFoot')
    	
        this.sid = this.$route.query.sid
        this.tmpID =  this.$route.query.tmpSid
        // if (this.$store.state.user.userDefaultCar.id) {
        //     this.getCartData()
        // } else {
        //     this.getDefaultCarInfo()
        // }
        if (!this.$store.state.user.userDefaultCar) {
            this.$router.back()
        }
        if (this.$store.state.cart.changePJTmpData) {
            this.getPJData()
        } else {
            this.$router.back()
        }
    },
    computed: {
        cartData () {
            return this.$store.state.cart.cartData
        },
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    methods: {
        updataPJRel () {
            if (this.$route.query.tmpSid) {
                this.rightParams.path = '/Tmp?id=' + this.$route.query.tmpSid
            }
            for (var i = 0; i < this.pjData.length; i++) {
                if (this.pjData[i].sel === true) {
                    var tmp = {
                        'accessoryProductId': this.pjData[i].id,
                        'quantity': this.pjData[i].num
                    }
                    this.updateData.push(tmp)
                }
            }
            var aid = this.$route.query.id
            var params = {
                'customerCarId': this.defaultCar.id,
                'serviceProductShoppingCartItemId': this.sid,
                'accessoryCategoryId': aid,
                'accessories': this.updateData
            }
            // console.log(params)
            ajax.ajax({
                'vue': this,
                'port': 'UpdateAccessoryProductCartItems',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    window.$.PageDialog.ok('更新配件成功')
                    v.getCartData()
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok(res.data.errorMessage)
                }
            })
        },
        PJsel (val) {
            console.log(val)
            var dat = this.pjData
            for (var i = 0; i < dat.length; i++) {
                if (dat[i].id === val.id) {
                    dat[i].sel = !val.sel
                     this.cartData = dat
                    return
                }
            }
        },
        plus (val) {
            val.num ++
        },
        reduce (val) {
            if (val.num <= 0) {
                return
            }
            val.num --
        },
        input (val) {
            val.num = val.num.replace(/[^0-9]/g,'')
            if (!val.num) {
                val.num = 0
            } else {
                val.num = parseInt(val.num)
            }
        },
        getPJData () {
            // console.log(this.defaultCar)
            var pjID = this.$route.query.id
            ajax.ajax({
                'vue': this,
                'port': 'GetApplicableAccessoryProducts',
                'type': 'get',
                'params_url': '?dto.carId=' + this.defaultCar.carId + '&dto.accessoryCategoryId=' + pjID + '&dto.page=1&dto.pageSize=1000',
                'statusOk': function (res, v) {
                    console.log(res.data.data)
                    var dat = res.data.data
                    if (v.$store.state.cart.changePJTmpData.accessoryCategoryId) {
                        var selDat = v.$store.state.cart.changePJTmpData.accessoryShoppingCartItems
                        for (var i = 0; i < selDat.length; i++) {
                            for (var j = 0; j < dat.length; j++) {
                                if (selDat[i].accessoryProductId === dat[j].id) {
                                    dat[j].sel = true
                                    dat[j].num = selDat[i].quantity
                                }
                            }
                        }
                        for (var k = 0; k < dat.length; k++) {
                            if (!dat[k].sel) {
                                dat[k].sel = false
                                dat[k].num = 1
                            }
                        }
                    } else {
                        for (var i = 0; i < dat.length; i++) {
                            dat[i].sel = false
                            dat[i].num = 1
                        }
                    }
                    v.pjData = dat
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('获取购物车列表失败')
                }
            })
        },
        // 获取购物车数据
        getCartData () {
            if (this.tmpID) {
                this.getTmpData()
            } else{
                this.getData()
            }
        },
        getData () {
            ajax.ajax({
                'vue': this,
                'port': 'GetShoppingCart',
                'type': 'get',
                'params_url': '?customerCarId=' + this.defaultCar.id,
                'statusOk': function (res, v) {
                    // console.log(res.data.data)
                    var dat = res.data.data.serviceShoppingCartItems
                    for (var i = 0; i < dat.length; i++) {
                        dat[i].sel = false
                    }
                    v.$store.state.cart.cartData = res.data.data
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('获取购物车列表失败')
                }
            })
        },
        getTmpData () {
            var sids = this.tmpID.split(',')
            var params = {
                'customerCarId': this.defaultCar.id ,
                'shoppingCartServiceIds': sids
            }
            ajax.ajax({
                'vue': this,
                'port': 'GetTempShoppingCart',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    var dat = res.data.data.serviceShoppingCartItems
                    for (var i = 0; i < dat.length; i++) {
                        dat[i].sel = false
                    }
                    v.$store.state.cart.cartData = res.data.data
                },
                'statusError': function (res, v) {
                    // window.$.PageDialog.ok('获取购物车列表失败')
                }
            })
        },
        getDefaultCarInfo () {
            if (!this.$store.state.user.curCarNum) {
                ajax.ajax({
                    'vue': this,
                    'port': 'GetDefaultCustomerCar',
                    'type': 'get',
                    'statusOk': function (res, v) {
                        v.$store.state.user.userDefaultCar = res.data.data
                        v.$store.state.user.curCarNum = v.$store.state.user.userDefaultCar.displayLicensePlate
                        v.getCartData()
                    },
                    'statusError': function (res, v) {
                        window.$.PageDialog.ok('获取用户信息失败')
                    }
                })
            } else {
                var listData = this.$store.state.user.userCarList
                var curCarID = this.$store.state.user.curCarData.id
                for (var i = 0; i < listData.length; i++) {
                    if (listData[i].id === curCarID) {
                        this.$store.state.user.userDefaultCar = listData[i]
                        v.getCartData()
                    }
                }
            }
        }
    },
    beforeCreate () {
        // window.scroll(0,0)
        this.$store.commit('showFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/cssCommon.styl'
#cartAccessories
    .cartAccessoriesWrap
        padding-top:45px
        padding-bottom:50px
        .content
            background-color:#fff
            border-bottom:1px solid #ddd
            .item
                overflow:hidden
                height:50px
                margin-left:12px
                padding-right:12px
                border-bottom:1px solid #ddd
                &:last-child
                    border:none
                .ttl
                    float:left
                    width:50%
                    height:100%
                    display:table
                    span
                        display:table-cell
                        vertical-align:middle
                .change
                    float:right
                    margin-top:10px
                .init
                    input
                        height:30px
                        line-height:30px
                .select
                    width:30px
                    float:left
                    height:50px
                    line-height:50px
                    font-size:24px
                    color:#999
                .sel
                    &:before
                        color:#c7a770


</style>
