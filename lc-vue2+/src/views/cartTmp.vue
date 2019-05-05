<template lang="html">
    <div id="cartTmp" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="cartWrap carTop">
            <div class="CarInfo iconfont icon-chevron-copy-copy-copy-copy-copy-copy" @click="$router.push('/user/changeCurCar')">
                <div class="CarInfoWrap">
                    <div class="carLogo">
                        <img :src="defaultCarImg" />
                    </div>
                    <div class="carInfo">
                        <div class="carID">{{defaultCar.displayLicensePlate}}</div>
                        <div class="carDesc">{{defaultCar.carName}}</div>
                    </div>
                </div>
            </div>

            <div class="scroll" ref="scroll">
                <div class="scrollBar">
                    <div class="content">
                        <div class="tt addToCart" @click="onAddServe()"><i class="iconfont icon-combinedshape"></i>添加服务项目</div>
                    </div>
                    <div class="content project-store" v-for="item in relCartData.serviceShoppingCartItems">
                        <div class="tt" >
                            <i class="iconfont icon-xuanze" :class="{ 'sel': item.sel }" @click="serveSelect(item)"></i><label @click="serveSelect(item)">{{item.serviceProductName}}</label>
                            <!-- <span class="desc">耗时<em>{{item.duration}}小时</em>服务费<em>￥{{item.price}}</em></span> -->
                            <span class="delIcon iconfont icon-shanchu" @click="onDelCartItem(item)"></span>
                        </div>
                        <div class="item" v-for="itemchild in item.accessoryCategories" @click="onChangePJ(itemchild.accessoryCategoryId, item.serviceProductId, item.serviceShoppingCartItemId, itemchild)">
                            <p class="ttl">
                                <span class="name">{{itemchild.accessoryCategoryName}}</span>
                            </p>
                            <p class="ttl2">
                                <span class="desc" v-for="pj in itemchild.accessoryShoppingCartItems">
                                    <label class="descName">{{pj.accessoryProductName}} <em v-if="pj.quantity>1">x{{pj.quantity}}</em></label>
                                    <label class="descPrice">￥{{pj.accessoryProductUnitPrice * pj.quantity}}</label>
                                </span>
                            </p>
                            <!-- <p class="cost">￥1222</p> -->
                            <p class="change" ><span class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy"></span></p>
                        </div>
                        <div class="serveStore" @click="onChangeStore(item.serviceShoppingCartItemId)">
                            <p class="ttl" v-if="item.serviceTypeId === 2">
                                <span class="name" v-if="item.storeName">{{item.storeName }}</span>
                                <span class="desc" v-if="item.storeName">{{item.storeDetailAddress }}</span>
                                <span class="desc">耗时<em>{{item.duration}}小时</em>服务费<em>￥{{item.price}}</em></span>
                                <span class="name" v-if="!item.storeName" style="height:56px;line-height:56px">请选择门店地址</span>
                            </p>
                            <p class="ttl" v-else="item.serviceTypeId === 1">
                                <span class="name" style="height:40px;line-height:40px">尚门理车上门服务</span>
                                <span class="desc">耗时<em>{{item.duration}}小时</em>服务费<em>￥{{item.price}}</em></span>
                            </p>
                            <p class="change" ><span class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy"></span></p>
                        </div>
                    </div>
                    <div class="content" v-if="relCartData.serviceShoppingCartItems && relCartData.serviceShoppingCartItems.length > 0">
                        <div class="tt addToCart" @click="onAddServe()"><i class="iconfont icon-combinedshape"></i>添加服务项目</div>
                    </div>
                </div>
            </div>

            <div class="totalWrap">
                <div class="left" @click="checkALLfun">
                    <span class="iconfont icon-xuanze" :class="{ sel: $store.state.cart.checkAllStatus}" ></span>全选
                </div>
                <div class="right">
                    <div class="hj">
                        合计：<span>￥{{totalPrice}}</span><br>
                        <p>共{{totalServeNum}}项服务</p>
                    </div>
                    <div class="buy" @click="onCartConform()">下单</div>
                </div>
            </div>
        </div>
        <orderConfirm v-if="confirmShow" :selectArr="selectArr" :selectCartData="selectCartData" v-on:closeConfirmInParent="closeConfirmIt"></orderConfirm>
        <div class="cartmask" v-if="cartmask"></div>
    </div>
</template>

<script >
import Bscroll from 'better-scroll'
import headerCommon from 'components/header/headerCommon.vue'
import orderConfirm from './../views/orderConfirm.vue'
import { Toast, MessageBox } from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '立即购买',
            iconType: 'icon-fanhui',
            rightParams: {
//              path: '/cartCompile',
//              desc: '编辑'
            },
            // 购物车数据
            relCartData: {},
            // 全选
            checkAll: true,
            // 总价
            totalPrice: 0,
            // 购物车服务总数
            totalServeNum: 0,
            // confirm开关
            confirmShow: false,
            // 选中的ID数组
            selectArr: [],
            // 选中的数组
            selectCartData: [],
            // 遮罩隐显
            cartmask: false,
            // 车辆图片
            defaultCarImg: ''
        }
    },
    components: {
        'header-common': headerCommon,
        'orderConfirm': orderConfirm
    },
    created () {
        this.$store.commit('hideFoot')

        this.rightParams.path = '/cartCompile?tmpSid=' + this.$route.query.id
        if (this.$store.state.user.userDefaultCar.id) {
            this.getCartData()
        } else {
            this.getDefaultCarInfo()
        }
        this.setScrollTop()
    },
    beforeDestroy () {
        window.removeEventListener('scroll',this.scrollRoll)
    },
    activated () {
        if (this.$store.state.user.userDefaultCar.id) {
            this.getCartData()
        } else {
            this.getDefaultCarInfo()
        }
    },
    computed: {
        cartData () {
            this.getTotal()
            return this.$store.state.cart.cartData
        },
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    watch: {
        cartData () {
            var dat = this.cartData.serviceShoppingCartItems
            console.log(this.$store.state.cart.cartSelData)
            if (this.$store.state.cart.cartSelData.length>0) {
                var selData = this.$store.state.cart.cartSelData
                // console.log(selData)
                // console.log(dat)
                for (var i = 0; i < selData.length; i++) {
                    for (var j = 0; j < dat.length; j++) {
                        if (selData[i].serviceShoppingCartItemId === dat[j].serviceShoppingCartItemId) {
                            // console.log(selData[i].sel)
                            dat[j].sel = selData[i].sel
                        }
                    }
                }

                // for (var k = 0; k < dat.length; k++) {
                //     if (dat[k].sel !== true) {
                //         dat[k].sel = true
                //     }
                // }
            } else {
                // for (var i = 0; i < dat.length; i++) {
                //     dat[i].sel = true
                // }
            }
            this.relCartData = this.cartData
        }
    },
    methods: {
        // 记录滚动条位置
        setScrollTop () {
            var that = this
            window.addEventListener('scroll', that.scrollRoll)
        },
        scrollRoll () {
            var scrollTop = document.body.scrollTop
            if (scrollTop === 0) {
                return
            }
            this.$store.state.posi.cartPosi = scrollTop
        },
        // 删除购物车数据
        onDelCartItem (val) {
            var delArr = []
            delArr.push(val.serviceShoppingCartItemId)
            var params = {
                customerCarId: this.defaultCar.id,
                serviceProductShoppingCartItemIds: delArr
            }
            ajax.ajax({
                'vue': this,
                'port': 'RemoveServiceProductCartItems',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    window.$.PageDialog.ok('删除成功')
                    v.getCartData()
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('删除失败')
                }
            })
        },
        // 获取车辆图片
        getDefaultCarImg () {
            ajax.ajax({
                'vue': this,
                'port': 'GetCarPicture',
                'type': 'get',
                'params_url': '?carId=' + this.defaultCar.carId,
                'statusOk': function (res, v) {
                    // console.log(res.data.data)
                    v.defaultCarImg = res.data.data
                },
                'statusError': function (res, v) {
                }
            })
        },
        closeConfirmIt () {
            this.confirmShow = false
            this.cartmask = false
            // this.checkAll = false
        },
        _initScroll () {
            this.viewScroll = new Bscroll(this.$refs.scroll, {
                click: true,
                scrollY: true
            })
        },
        onAddServe () {
            var sid = this.$route.query.id
            // var sids = sid.split(',')
            this.$router.push('/serve/index?tmpSid=' + sid)
        },
        onChangeStore (sid) {
            var tmpSid = this.$route.query.id
            this.$router.push('/serveStore?sid=' + sid + '&tmpSid=' + tmpSid)
        },
        onChangePJ (id, pid, sid, itemchild) {
            // sid 购物车服务ID
            console.log(itemchild)
            this.$store.state.cart.changePJTmpData = itemchild
            var tmpSid = this.$route.query.id
            this.$router.push('/cartAccessories?id=' + id + '&pid=' + pid + '&sid=' + sid + '&tmpSid=' + tmpSid)
        },
        // 获取选择的服务的总价格 和 服务数量
        getTotal () {
            var dat = this.$store.state.cart.cartData.serviceShoppingCartItems
            if (dat) {
                this.totalPrice = 0
                this.totalServeNum = 0
                // this.totalServeNum = dat.length
                for (var i = 0; i < dat.length; i++) {
                    if (dat[i].sel) {
                        this.totalPrice += dat[i].subToal * 100
                        this.totalServeNum += 1
                    }
                }
                this.totalPrice = this.totalPrice / 100
            }
        },
        onCartConform () {
            var dat = this.cartData.serviceShoppingCartItems
            var arr = []
            this.selectCartData = []
            for (var i = 0; i < dat.length; i++) {
                if (dat[i].sel) {
                    arr.push(dat[i].serviceShoppingCartItemId)
                    this.selectCartData.push(dat[i])
                }
            }
            this.$store.state.cart.selectCartData = this.selectCartData
            if (arr.length <= 0) {
                // Toast('请至少选择一项服务')
                window.$.PageDialog.ok("请至少选择一项服务")
                return false
            }
            // var urlParam = arr.join('|')
            // this.$router.push('/orderConfirm?sel=' + urlParam)
            this.selectArr = arr
            this.$store.state.cart.selectArr = arr
            // this.confirmShow = true
            // this.cartmask = true
            this.$router.push("/orderConfirm")
        },
        checkALLfun () {
            this.checkAll = !this.checkAll
            this.$store.state.cart.checkAllStatus = this.checkAll
            // cartData
            // console.log(this.cartData)
            var dat = this.cartData.serviceShoppingCartItems
            for (var i = 0; i < dat.length; i++) {
                dat[i].sel = this.checkAll
                this.$store.state.cart.cartSelData = dat
            }
            this.getTotal()
        },
        serveSelect (val) {
            console.log(val)
            var dat = this.cartData.serviceShoppingCartItems
            for (var i = 0; i < dat.length; i++) {
                if (dat[i].serviceShoppingCartItemId === val.serviceShoppingCartItemId) {
                    dat[i].sel = !val.sel
                    if (dat[i].sel === false) {
                        this.checkAll = false
                        this.$store.state.cart.checkAllStatus = this.checkAll
                    }
                     this.cartData = dat
                     this.$store.state.cart.cartSelData = dat
                     this.getTotal()
                    return
                }
            }
        },
        // 获取购物车数据
        getCartData () {
            this.getDefaultCarImg()
            var sid = this.$route.query.id
            var reqPort = ''
            console.log(sid)
            // if (sid) {
            var sids = sid.split(',')
            var params = {
                'customerCarId': this.defaultCar.id ,
                'shoppingCartServiceIds': sids
            }
            this.getTmpData(params)
            // }
        },
        getData (params) {
            this.getTmpData(params)
        },
        getTmpData (params) {
            ajax.ajax({
                'vue': this,
                'port': 'GetTempShoppingCart',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    var dat = res.data.data
                    console.log(dat)
                    for (var i = 0; i < dat.serviceShoppingCartItems.length; i++) {
                        dat.serviceShoppingCartItems[i].sel = true
                    }
                    // console.log(dat)
                    v.$store.state.cart.cartData = dat
                    v.$nextTick(function () {
                        window.scroll(0,v.$store.state.posi.cartPosi)
                    })
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
                        if (!res.data.data) {
                            // var Promise = MessageBox.confirm('您需要先添加车辆信息<br>是否现在添加?').then(action => {
                            //     v.$router.push('/user/addCarInfo')
                            // })
                            MessageBox.alert('您需要先添加车辆信息').then(action => {
                                v.$router.push('/user/addCarInfo')
                            });
                        }
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
        // setTimeout(function(){
        //     $('.cart').removeClass('router-link-active')
        // },1)
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/cssCommon.styl'

#cartTmp
    .cartWrap
        padding-top:45px
        .CarInfo
            position:fixed
            top:45px
            z-index:2
            .carDesc
                height:16px
        .scroll
            /*position:absolute*/
            top:141px
            bottom:50px
            width:100%
            overflow:hidden
            padding-bottom:110px
            padding-top:100px
        .content
            margin-bottom:10px
            background-color:#fff
            border-bottom:1px solid #ddd
            .addToCart
                color:#dab96e!important
                i
                    &:before
                        color:#dab96e!important
            .tt
                /*line-height:50px*/
                line-height:25px
                padding:15px 0
                padding-left:12px
                padding-right:30px
                color:#666
                border-bottom:1px solid #ddd
                font-size:18px
                margin-bottom:-1px
                position:relative
                overflow:hidden
                position:relative
                .delIcon
                    position:absolute
                    right:0px
                    top:10px
                    padding: 5px 10px 10px 10px
                .desc
                    /*position:relative*/
                    line-height:25px
                    color:#999
                    font-size:15px
                    float:right
                    padding-right:10px
                    em
                        color:#c7a770
                        font-style:normal
                        font-family:'微软雅黑'
                        &:first-child
                            margin-right:5px
                i
                    margin-right:5px
                    display:inline-block
                    padding:0
                    &:before
                        color:#999
                        font-size:24px
                        vertical-align:middle
                .sel
                    &:before
                        color:#c7a770
            .item
                margin-left:42px
                overflow:hidden
                border-bottom:1px solid #ddd
                position:relative
                min-height:60px
                &:last-child
                    border:none
                p
                    line-height:58px
                    float:left
                .cost
                    font-family:'微软雅黑'
                .ttl
                    width:58%
                    span
                        display:block
                        white-space:nowrap
                        overflow:hidden
                        text-overflow:ellipsis
                        overflow:hidden
                        &:first-child
                            margin-top:2px
                            line-height:30px
                            height:30px
                .ttl2
                    width:75%
                    padding-bottom:10px
                    span
                        display:block
                        height:18px
                        line-height:18px
                        font-size:14px
                        color:#999
                        label
                            display:inline-block
                            float:left
                            em
                                font-style:normal
                        .descName
                            width:65%
                            white-space:nowrap
                            overflow:hidden
                            text-overflow:ellipsis
                        .descPrice
                            width:30%
                .change
                    float:right
                    color:#c7a770
                    position:absolute
                    top:0
                    right:0
                    span
                        color:#999
                        margin-left:5px
            .serveStore
                line-height:55px
                overflow:hidden
                padding-left:12px
                border-top:1px solid #ddd
                margin-top:-1px
                display:table
                width:100%
                p
                    float:left
                    .name
                        display:block
                        font-size:18px
                        margin-top:2px
                        line-height:30px
                        width: 100%
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis
                    .desc
                        font-size:15px
                        color:#999
                        display:block
                        line-height:20px
                        height:20px
                        white-space:nowrap
                        overflow:hidden
                        text-overflow:ellipsis
                        overflow:hidden
                .ttl
                    max-width:270px
                    overflow:hidden
                    .desc
                        line-height: 25px
                        color: #999
                        font-size: 15px
                        padding-right: 10px
                        padding-bottom:10px
                        em
                            color: #c7a770
                            font-style: normal
                            font-family: '\5FAE\8F6F\96C5\9ED1'
                .change
                    float:inherit
                    color:#c7a770
                    display:table-cell
                    vertical-align: middle
                    text-align:right
                    width:20px
                    span
                        margin-right:12px
                        display:inline-block
                        width:16px
                        margin-left:5px
                        color:#999
        .totalWrap
            position:fixed
            width:100%
            height:50px
            bottom:0
            left:0
            background-color:#f5f5f5
            border-top:1px solid #ddd
            .left
                float:left
                line-height:50px
                padding-left:12px
                color:#333
                span
                    font-size:24px
                    vertical-align:middle
                    color:#999
                    margin-right:5px
                .sel
                    color:#c7a770
            .right
                height:50px
                float:right
                position:relative
                padding-right:107px
                .buy
                    position:absolute
                    top:7px
                    right:12px
                    display:inline-block
                    width:90px
                    height:36px
                    line-height:36px
                    text-align:center
                    background-color:#c7a770
                    color:#fff
                .hj
                    margin-top:8px
                    span
                        color:#c7a770
                    p
                        font-size:14px
                        margin-top:2px
    .cartmask
        position:fixed
        width:100%
        height:100%
        background-color:#f5f5f5
        z-index:100
        top:0
        left:0

</style>
