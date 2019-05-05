<template lang="html">
   <div class="INcarlist">
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
                           <label class="label">车险到期提醒</label>
                            <mt-switch @change="change(car)" v-model="car.isCarInsuranceNotify"></mt-switch>
                       </div>
                       <div class="datePickerWrap iconfont icon-chevron-copy-copy-copy-copy-copy-copy" @click="onOpenAreaPicker(car)">
                           <label>设置车险提醒</label><input type="text" readonly placeholder="请选择" v-model="car.carInsuranceRemind">
                       </div>
                   </div>
               </div>
               <mt-datetime-picker ref="picker" type="date" :startDate="startDate" @confirm="confirmDatePicker" @cancel="closeDataPicker" > </mt-datetime-picker>
           </div>
       </div>
   </div>
</template>

<script>
import headerCommon from 'components/header/headerCommon.vue'
import ajax from './../vueResource.ajax.js'
import Bscroll from 'better-scroll'
import { Switch, Toast, MessageBox, DatetimePicker } from 'mint-ui'

export default {
   data () {
       return {
           viewTitle: '车险',
           iconType: 'icon-fanhui',
           rightParams: {},
           // 车辆列表
           carList: [],
           insuranceModel: false,
           insuranceData: '',
           startDate: new Date(),
           curCar: {}
       }
   },
   components: {
       'header-common': headerCommon,
       'mt-switch': Switch,
       'mt-datetime-picker': DatetimePicker
   },
   created () {
       this.$nextTick(function () {
           // this._initScroll()
       })
       this.getList()
   },
   beforeCreate () {
       this.$store.commit('hideFoot')
   },
   computed: {
       defaultCar () {
           return this.$store.state.user.userDefaultCar
       }
   },
   methods: {
       confirmDatePicker (val) {
           var date = new Date(val)
           var month = parseInt(date.getMonth()) + 1
           this.curCar.carInsuranceRemind = date.getFullYear() + '-' + month + '-' + date.getDate()
        //    this.insuranceData = new Date(this.curCar.carInsuranceRemind)
           this.insuranceData = this.curCar.carInsuranceRemind

           var params = {
               id: this.curCar.id,
               carInsuranceRemind: this.insuranceData,
               isCarInsuranceNotify: this.curCar.isAnnualInspectionNotify
           }
           ajax.ajax({
               'vue': this,
               'port': 'UpdateCarInsurance',
               'type': 'post',
               'req_params': params,
               'statusOk': function (res, v) {
                   if (res.data.success === true) {
                       window.$.PageDialog.ok('设置成功')
                   }
               },
               'statusError': function (res, v) {
               }
           })
       },
       closeDataPicker () {},
       onOpenAreaPicker (car) {
           this.curCar = car
           this.$refs.picker.open()
       },
       change (car) {
           var params = {
               id: car.id,
               isCarInsuranceNotify: !car.isCarInsuranceNotify
           }
           ajax.ajax({
               'vue': this,
               'port': 'UpdateCarInsurance',
               'type': 'post',
               'req_params': params,
               'statusOk': function (res, v) {
                   if (res.data.success === true) {
                       window.$.PageDialog.ok('操作成功')
                   }
               },
               'statusError': function (res, v) {
                   window.$.PageDialog.ok('操作失败')
                   car.isCarInsuranceNotify = !car.isCarInsuranceNotify
               }
           })
       },
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

                   for (var i = 0; i < tmpdata.length; i++) {
                       var date = new Date(tmpdata[i].carInsuranceRemind )
                       var month = parseInt(date.getMonth()) + 1
                       var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
                       tmpdata[i].carInsuranceRemind = date.getFullYear() + '-' + month + '-' + date.getDate()
                   }
                   v.carList = tmpdata
                //    setTimeout(function () {
                //        v._initScroll()
                //    }, 500)
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
       }
   }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
bg-img($url)
   background-image: url($url+".png")
.INcarlist
   .carWrap
       position:absolute
       top:55px
       bottom:74px
       width:100%
       .slide
           height:100%
           .CarInfo
               width:100%
               background-color:#fff
               position:relative
               border-bottom:1px solid #ddd
               margin-bottom:10px
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
                           bg-img("../assets/images/bg_carID")
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
                margin-top:10px
                margin-left:10px
                border-top:1px solid #ddd
                .label
                    display:block
                    height:40px
                    float:left
                    line-height:40px
                    font-size:15px
                    color:#999
                .mint-switch
                    float:right
                    margin:4px 10px 0 0
            .datePickerWrap
                height: 40px
                line-height:40px
                margin-left: 10px
                border-top: 1px solid #ddd
                &:before
                    float:right
                    color:#999
                label
                    color:#999
                input
                    padding-left:20px
.mint-switch-core
    border-color: #dab96e!important
    background-color: #dab96e!important


</style>
