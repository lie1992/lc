<template lang="html">
    <!-- 服务列表-->
    <div class="servelist">
        <div class="list" v-for="item in serveData">
            <img :src="item.servicePictureUrl" @click="onAddTmpCart(item.id)" />
            <div class="info">
                <p class="tt" @click="onAddTmpCart(item.id)">{{item.name}}</p>
                <p class="desc" @click="onAddTmpCart(item.id)">{{item.shortDescription}}</p>
                <p class="iconGroup">
                    <span class="door" v-if="item.isDoorToDoorService">上门</span>
                    <span class="store" v-if="item.isStoreService">门店</span>
                    <span class="link" @click="onExp(item.id)">服务介绍</span>
                </p>
                <div class="cart" @click="onAddCart(item.id)"></div>
            </div>
        </div>
    </div>
</template>


<script>
import ajax from './../../vueResource.ajax.js'
import { Toast, MessageBox } from 'mint-ui'
export default {
    data () {
        return {
            serveData: [],
            searchModel: ''
        }
    },
    created () {
        if (this.serveData.length <= 0) {
            this.getData('Maintenance')
        }
    },
    computed: {
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    methods: {
        searchFun (e) {
            if (e.keyCode === 13) {
                var params = {
                    "serviceProductName": this.searchModel,
                    "serviceCategory": "Maintenance",
                    "page": 1,
                    "pageSize": 100
                }
                ajax.ajax({
                    'vue': this,
                    'port': 'SearchServiceProducts',
                    'type': 'post',
                    'req_params': params,
                    'statusOk': function (res, v) {
                        console.log(res)
                        v.serveData = res.data.data
                    },
                    'statusError': function (res, v) {
                    }
                })
            }
        },
        getData (type) {
            ajax.ajax({
                'vue': this,
                'port': 'GetServiceProducts',
                'type': 'get',
                'params_url': '?dto.serviceCategory=' + type + '&dto.page=' + 1 + '&dto.pageSize=1000',
                'statusOk': function (res, v) {
                    v.serveData = res.data.data
                },
                'statusError': function (res, v) {
                    // Toast('获取用户信息失败')
                }
            })
        },
        // 服务介绍
        onExp (id) {
            this.$router.push('/serveIntroduce/' + id)
        },
        onAddCart (id) {
            var params = {
                customerCarId: this.defaultCar.id,
                serviceProductId: id,
                countyId: this.$store.state.user.curAreaID,
                longitude: window.sessionStorage.lng,
                latitude: window.sessionStorage.lat
            }
            ajax.ajax({
                'vue': this,
                'port': 'AddServiceProductToCart',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    var tmpdata = res.data.data
                    window.$.PageDialog.ok("添加服务成功")
                    // v.$router.push('/cart')
                    v.updateCart()
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok( res.data.errorMessage)
                }
            })
        },
        onAddTmpCart (id) {
            var params = {
                customerCarId: this.defaultCar.id,
                serviceProductId: id,
                countyId: this.$store.state.user.curAreaID,
                longitude: window.sessionStorage.lng,
                latitude: window.sessionStorage.lat
            }
            ajax.ajax({
                'vue': this,
                'port': 'AddTempServiceProductToCart',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    var tmpdata = res.data.data
                    console.log(tmpdata)
                    // window.$.PageDialog.ok("添加服务成功")
                    var sid = v.$route.query.tmpSid
                    if (sid) {
                        sid = sid + ',' + tmpdata.serviceShoppingCartItemId
                    } else {
                        sid = tmpdata.serviceShoppingCartItemId
                    }
                    v.$router.push('/Tmp?id=' + sid)
                    // v.updateCart()
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok( res.data.errorMessage)
                }
            })
        },
        // 更新购物车数据
        updateCart () {
            this.getCartData()
        },
        getCartData () {
            ajax.ajax({
                'vue': this,
                'port': 'GetShoppingCart',
                'type': 'get',
                'params_url': '?customerCarId=' + this.defaultCar.id,
                'statusOk': function (res, v) {
                    v.$store.state.cart.cartData = res.data.data
                    console.log(res.data.data.serviceShoppingCartItems.length)
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('获取购物车列表失败')
                }
            })
        },
    }
}
</script>