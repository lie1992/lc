<template lang="html">
    <div class="serveRoot">
        <header-cart :title="$store.state.user.curCarNum" :iconType="iconType" :rightParams="rightParams" v-on:changeCar="changeCarReal"></header-cart>
        <div class="serveType" >
            <!-- <router-link to="/serve/index">保养<em></em></router-link>
            <router-link to="/serve/fix">维修<em></em></router-link>
            <router-link to="/serve/hairdressing">美容<em></em></router-link>
            <router-link to="/serve/tire">轮胎<em></em></router-link>
            <router-link to="/serve/sprinkle">无痕钣喷</router-link> -->
            <a @click="showToggle(1)" :class="{ sel: show1}">保养<i></i></a>
            <a @click="showToggle(2)" :class="{ sel: show2}">维修<i></i></a>
            <a @click="showToggle(3)" :class="{ sel: show3}">美容<i></i></a>
            <a @click="showToggle(4)" :class="{ sel: show4}">轮胎<i></i></a>
            <a @click="showToggle(5)" :class="{ sel: show5}">无痕钣喷</a>
        </div>
        <!-- <router-view></router-view> -->
        <div class="listWrap">
            <serveIndex v-if="show1"></serveIndex>
            <fix v-if="show2"></fix>
            <hairdressing v-if="show3"></hairdressing>
            <tire v-if="show4"></tire>
            <sprinkle v-if="show5"></sprinkle>
        </div>
        <div class="menuList">
            <p class="phone iconfont icon-chevron-copy-copy-copy-copy-copy-copy">
                <span class="phoneShow" @click="call(kf_phone)">客服电话 <em class="phoneNum">{{kf_phone}}</em></span>
            </p>
        </div>
        <p class="tip">服务时间：{{kf_time}}</p>
        <mt-popup v-model="popupVisible"  position="top">
            <div class="carNode" v-for="item in carList" @click="setDefaultCar(item.id, item.displayLicensePlate)">{{item.displayLicensePlate}}</div>
        </mt-popup>
    </div>
</template>

<script>
import headerCart from '../../components/header/headerCart.vue'
import { Toast, Popup } from 'mint-ui'
import ajax from './../../vueResource.ajax.js'
import serveIndex from './serveIndex.vue'
import fix from './fix.vue'
import hairdressing from './hairdressing.vue'
import sprinkle from './sprinkle.vue'
import tire from './tire.vue'

export default {
    data () {
        return {
            iconType: 'icon-fanhui',
            // rightParams: {
            //     path: '/cart',
            //     desc: this.cartNum
            // },
            popupVisible: false,
            carList: [],
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            kf_phone: '',
            // 工作时间
            kf_time: ''
        }
    },
    components: {
        'header-cart': headerCart,
        'mt-popup': Popup,
        serveIndex,
        fix,
        hairdressing,
        sprinkle,
        tire
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    computed: {
        cartData () {
            return this.$store.state.cart.cartData
        },
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        },
        rightParams () {
            var num = 0
            if (this.$store.state.cart.cartData.serviceShoppingCartItems) {
                num = this.$store.state.cart.cartData.serviceShoppingCartItems.length
            }
            return {
                path: '/cart',
                desc: num
            }
        }
    },
    created () {
        if(window.localStorage.serveType > 0){
           var curID = window.localStorage.serveType
        } else {
           var curID = this.$route.query.id
        }
        switch (curID) {
            case undefined:
                this.show1 = true
                break
            case '1':
                this.show1 = true
                break
            case '2':
                this.show2 = true
                break
            case '3':
                this.show3 = true
                break
            case '4':
                this.show4 = true
                break
            case '5':
                this.show5 = true
                break
        }

        if (this.$store.state.user.userDefaultCar.displayLicensePlate) {
            this.$store.state.user.curCarNum = this.$store.state.user.userDefaultCar.licensePlate
            this.getCartData()
        } else {
            this.getDefaultCarInfo()
        }
        // 获取车辆数据
        this.getCarList()
        this.getKF_phone()
    },
    methods: {
        // 获取客服电话
        getKF_phone () {
           ajax.ajax({
               'vue': this,
               'port': 'GetTelephone',
               'type': 'get',
               'statusOk': function (res, v) {
                   v.kf_phone = res.data.data.telePhone
                   v.kf_time = res.data.data.serviceTime
               },
               'statusError': function (res, v) {
               }
           })
        },
        call (num) {
            window.location.href = 'tel:' + num
        },
        showToggle (val) {
            window.localStorage.serveType = val
            switch (val) {
                case 1:
                    this.show1 = true
                    this.show2 = false
                    this.show3 = false
                    this.show4 = false
                    this.show5 = false
                    break
                case 2:
                    this.show2 = true
                    this.show1 = false
                    this.show3 = false
                    this.show4 = false
                    this.show5 = false
                    break
                case 3:
                    this.show3 = true
                    this.show2 = false
                    this.show1 = false
                    this.show4 = false
                    this.show5 = false
                    break
                case 4:
                    this.show4 = true
                    this.show2 = false
                    this.show3 = false
                    this.show1 = false
                    this.show5 = false
                    break
                case 5:
                    this.show5 = true
                    this.show2 = false
                    this.show3 = false
                    this.show4 = false
                    this.show1 = false
                    break
            }

        },
        changeCarReal () {
            this.popupVisible = true
        },
        setDefaultCar (id, num) {
            this.$store.state.user.curCarNum = num
            this.$store.state.user.curCarID = id
            // this.getCartData()
            this.getDefaultCarInfo()
            this.popupVisible = false
        },
        getCartData () {
            ajax.ajax({
                'vue': this,
                'port': 'GetShoppingCart',
                'type': 'get',
                'params_url': '?customerCarId=' + this.defaultCar.id,
                'statusOk': function (res, v) {
                    v.$store.state.cart.cartData = res.data.data
                    // console.log(res.data.data.serviceShoppingCartItems.length)
                    // v.rightParams.desc = v.$store.state.cart.cartData.serviceShoppingCartItems.length
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
                        // window.$.PageDialog.ok('获取用户信息失败')
                    }
                })
            } else {
                var listData = this.$store.state.user.userCarList
                var curCarID = this.$store.state.user.curCarID
                for (var i = 0; i < listData.length; i++) {
                    if (listData[i].id === curCarID) {
                        this.$store.state.user.userDefaultCar = listData[i]
                        this.getCartData()
                    }
                }
            }
        },
        getCarList () {
            ajax.ajax({
                'vue': this,
                'port': 'GetCustomerCars',
                'type': 'get',
                'statusOk': function (res, v) {
                    var tmpdata = res.data.data
                    v.carList = tmpdata
                    // console.log(v.carList)
                    // 保存车辆列表
                    v.$store.state.user.userCarList = tmpdata
                },
                'statusError': function (res, v) {
                    // Toast('获取用户车辆失败')
                }
            })
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/serve.styl"
</style>
