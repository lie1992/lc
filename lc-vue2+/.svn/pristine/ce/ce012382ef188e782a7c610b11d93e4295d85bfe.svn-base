 <template lang="html">
    <div class="carlist">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="carWrap">
            <div class="slide" ref="scrollBar">
                <div class="slideBar">
                    <div class="CarInfo" v-for="car in carList">
                        <div class="CarInfoWrap" @click="$router.push('/user/editCarInfo?id=' + car.id)">
                            <div class="carLogo">
                                <img v-if="car.carPic" :src="car.carPic" >
                                <img v-else="car.carPic" :src="car.carPictureUrl" >
                            </div>
                            <div class="carInfo">
                                <div class="carID">{{car.displayLicensePlate}}</div>
                                <div class="carDesc">{{car.carName}}</div>
                            </div>
                        </div>
                        <div class="operate">
                            <div class="default" :class="{ sel: car.isDefault }" @click="onDefault(car)"><span class="iconfont icon-xuanze"></span>默认车辆<em></em></div>
                            <div class="read" @click="$router.push('/plan?id=' + car.id)"><span class="iconfont icon-wenzhang44"></span>保养手册<em></em></div>
                            <div class="delate" @click="onDel(car.id)"><span class="iconfont icon-shanchu" ></span>删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btnWrap">
            <button class="charge" @click="$router.push('/user/addCarInfo')">添加车辆</button>
        </div>
    </div>
</template>

<script>
import headerCommon from 'components/header/headerCommon.vue'
import Bscroll from 'better-scroll'
import ajax from './../../vueResource.ajax.js'
import { Toast, MessageBox } from 'mint-ui'

export default {
    data () {
        return {
            viewTitle: '我的车辆',
            iconType: 'icon-fanhui',
            rightParams: {},
            // 车辆列表
            carList: [],
            web_path: ''
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.$nextTick(function () {
            // this._initScroll()
        })
        this.getList()
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    computed: {
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    methods: {
        _initScroll () {
            this.viewScroll = new Bscroll(this.$refs.scrollBar, {
                click: true,
                scrollY: true
            })
        },
        getList () {
            ajax.ajax({
                'vue': this,
                'port': 'GetCustomerCars',
                'type': 'get',
                'statusOk': function (res, v) {
                    var tmpdata = res.data.data
                    console.log(tmpdata)
                    v.carList = []
                    v.carList = tmpdata
                    // 保存车辆列表
                    v.$store.state.user.userCarList = tmpdata
                    setTimeout(function () {
                        v._initScroll()
                    }, 500)
                    // console.log(tmpdata)
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('获取用户车辆失败')
                }
            })
        },
        onDefault (data) {

            if (data.isDefault) {
                // data.isDefault = false
                return false
            } else {
                data.isDefault = true
            }
            ajax.ajax({
                'vue': this,
                'port': 'SetDefaultCustomerCar',
                'req_params': { customerCarId: data.id },
                'type': 'post',
                'statusOk': function (res, v) {
                    window.$.PageDialog.ok('设置成功')
                    v.getDefaultCarInfo()
                    for (var i in v.carList) {
                        if (v.carList[i].isDefault === true && v.carList[i].id !== data.id) {
                            v.carList[i].isDefault = false
                        }
                    }
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('设置失败')
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
                    }
                }
            }
        },
        onDel (id) {
            if (this.defaultCar.id === id) {
                window.$.PageDialog.ok('不允许删除您当前正在使用的车辆')
                return false
            }
            MessageBox.confirm('确定删除该车辆信息吗?', '').then(action => {
                ajax.ajax({
                    'vue': this,
                    'port': 'DelCustomerCar',
                    'req_params': { customerCarId: id },
                    'type': 'post',
                    'statusOk': function (res, v) {
                        v.getList()
                        window.$.PageDialog.ok('删除成功')
                    },
                    'statusError': function (res, v) {
                        window.$.PageDialog.ok('删除失败')
                    }
                })
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
bg-img($url)
    background-image: url($url+".png")
.carlist
    .carWrap
        position:absolute
        top:55px
        bottom:74px
        width:100%
        .slide
            height:100%
            .slideBar
                padding-bottom:20px
            .CarInfo
                width:100%
                background-color:#fff
                position:relative
                border-bottom:1px solid #ddd
                margin-bottom:50px
                .CarInfoWrap
                    padding-left:70px
                    overflow:hidden
                    .carLogo
                        position:absolute
                        top:15px
                        left:0
                        width:40px
                        height:40px
                        padding:10px
                        float:left
                        img
                            margin:0 auto
                            max-width:100%
                    .carInfo
                        float:left
                        width:100%
                        font-family:"微软雅黑"
                        position:relative
                        .carID
                            margin:15px 0
                            width:105px
                            height:32px
                            bg-img("../../assets/images/bg_carID")
                            background-size: 100% 100%
                            font-family:"微软雅黑"
                            font-size:15px
                            letter-spacing: 1px
                            color:#fff
                            text-align:center
                            line-height:32px
                        .carDesc
                            font-family:"微软雅黑"
                            color:#999
                            font-size:14px
                            line-height:16px
                            letter-spacing: 1px
                            overflow:hidden
                            white-space:nowrap
                            text-overflow:ellipsis
                            padding-right:30px
            .operate
                height:40px
                margin-top:15px
                margin-left:10px
                border-top:1px solid #ddd
                /*display:flex*/
                div
                    width:33%
                    float:left
                    height:40px
                    line-height:40px
                    text-align:center
                    position:relative
                    span
                        margin-right:3px
                        color:#c3c3c3
                        vertical-align:middle
                        font-size:24px
                        display:inline-block
                        height:24px
                        line-height:24px
                .read
                    span
                        font-size:20px
                    &:before
                        content: ''
                        display:block
                        width:1px
                        height:26px
                        background-color:#ddd
                        position:absolute
                        left:0
                        top:6px
                .delate
                    span
                        font-size:20px
                    em
                        display:block
                        width:1px
                        height:24px
                        position:absolute
                        right:0
                        top:8px
                        background-color:#ddd
                    &:before
                        content: ''
                        display:block
                        width:1px
                        height:26px
                        background-color:#ddd
                        position:absolute
                        left:0
                        top:6px
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
