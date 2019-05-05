<template lang="html">
    <div id="setBX" >
        <!-- 设置年检时间 -->
        <div class="headerCommon">
            <div class="currentArea">
                <a class="iconfont" :class="iconType" @click="backClick()"></a>
            </div>
            <div class="title">{{$store.state.user.curCarNum?$store.state.user.curCarNum:'年检到期提醒'}}</div>
            <div class="headRight">
                <a @click="compClick()">完成</a>
            </div>
        </div>
        <div class="setBXWrap">
            <div class="info">
                <div class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy" @click="onOpenAreaPicker()">
                    <label>设置年检提醒</label><input type="text" readonly placeholder="请选择" v-model="insuranceModel">
                </div>
            </div>
        </div>
        <mt-datetime-picker ref="picker" type="date" :startDate="startDate" @confirm="confirmDatePicker" @cancel="closeDataPicker" > </mt-datetime-picker>
    </div>
</template>

<script  type="text/ecmascript-6">
import Bscroll from 'better-scroll'
import headerCommon from 'components/header/headerCommon.vue'
import {Toast, DatetimePicker} from 'mint-ui'
import ajax from './../vueResource.ajax.js'

export default {
    data () {
        return {
            iconType: 'icon-fanhui',
            insuranceModel: '',
            insuranceData: '',
            startDate: new Date(),
            isShow: 1
        }
    },
    components: {
        'header-common': headerCommon,
        'mt-datetime-picker': DatetimePicker
    },
    created () {
        if (this.$store.state.user.userDefaultCar && this.$store.state.user.userDefaultCar.annualInspection) {
            console.log(this.$store.state.user.userDefaultCar.annualInspection)
            var date = new Date(this.$store.state.user.userDefaultCar.annualInspection)
            var month = parseInt(date.getMonth()) + 1
            var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
            this.insuranceModel = date.getFullYear() + '-' + month + '-' + date.getDate()
            this.insuranceData = date.getFullYear() + '-' + month + '-' + date.getDate()
        }
    },
    computed: {
        defaultCar () {
            return this.$store.state.user.userDefaultCar
        }
    },
    methods: {
        backClick () {
            this.$emit('closeNJ')
        },
        compClick () {
            this.update()
        },
        onOpenAreaPicker () {
            this.$refs.picker.open()
        },
        confirmDatePicker (val) {
            var date = new Date(val)
            var month = parseInt(date.getMonth()) + 1
            this.insuranceModel = date.getFullYear() + '-' + month + '-' + date.getDate()
            this.insuranceData = new Date(this.insuranceModel)

        },
        update () {
            if (!this.insuranceData) {
                this.defaultCar.isAnnualInspectionNotify = false
                this.$emit('closeNJ')
                return
            }
            var params = {
                id: this.$store.state.user.userDefaultCar.id,
                annualInspection: this.insuranceData,
                isAnnualInspectionNotify: true
            }
            ajax.ajax({
                'vue': this,
                'port': 'UpdateAnnualInspection',
                'type': 'post',
                'req_params': params,
                'statusOk': function (res, v) {
                    if (res.data.success === true) {
                        v.defaultCar.isAnnualInspectionNotify = true
                        v.$store.state.user.userDefaultCar.annualInspection = v.insuranceData
                        window.$.PageDialog.ok('您已开启年检到期提醒')
                        v.$emit('closeNJ')
                    }
                },
                'statusError': function (res, v) {
                }
            })
        },
        closeDataPicker () {}
    },
    beforeCreate () {
        // this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/css/cssCommon.styl'
#setBX
    position:fixed
    top:0
    left:0
    height:100%
    width:100%
    z-index:1002
    background-color:#f5f5f5
    .setBXWrap
        padding-top:55px
        .info
            width: 100%
            background-color: #fff
            border-bottom: 1px solid #ddd
            .iconfont
                height:45px
                line-height:45px
                position:relative
                padding:0 10px
                &:before
                    position: absolute
                    right: 10px
                    color: #999
                label
                    display: inline-block
                    width: 33%
                    color: #999
                input
                    display: inline-block
                    width: 60%
                    height: 44px
                    text-align:right
</style>
