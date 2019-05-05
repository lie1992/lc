<template>
    <!-- 定位 -->
    <div class="cityView">
        <div class="write-space2"></div>
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="posi-wrap">

            <div class="sort_letter" id="cur">当前定位</div>
            <div class="cont">
                <div class="sort_list" @click="positionCur">
    				<div class="num_name">{{curLocation}}</div>
    			</div>
            </div>

            <div class="sort_letter" id="cur">已开通地区</div>
            <div class="cont">
                <div class="sort_list" v-for="kt in ktData" @click="changeArea(kt)">{{kt.name}}</div>
            </div>

            <!-- <div class="sort_letter" id="A">A</div>
            <div class="cont A">
                <div class="sort_list" @click="changeArea()">阿克苏市</div>
            </div> -->

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'
import '../assets/css/jQuery_iPhonetxl.css'
import ports from './../port.js'
import { Toast } from 'mint-ui'

export default {
    data () {
        return {
            viewTitle: '选择地区',
            iconType: 'icon-guanbi',
            rightParams: {},
            // 已开通地区
            ktData: [],
            // 省市区
            areaData: [],
            // 当前定位信息
            curPositionInfo: {},
            // 当前位置信息
            curArea: {},
            curLocation: ''
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.curLocation = window.localStorage.curLocation
        this.GetStoreServiceRegions()
        // this.getAreaAllData()
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    computed: {
        addComp () {
            return this.curPositionInfo
        }
    },
    watch: {
        addComp (val, val2) {
            console.log(val)
            // this.changeArea()
            this.CheckRegion(val)
        }
    },
    methods: {
        // 检索地区是否已存在 并返回ID
        CheckRegion (val) {
            var params = {
                "province": val.province,
                "city": val.city,
                "county": val.district
            }
            this.$http.post(ports.port.CheckRegion, params).then((res) => {
                if (res.data.success === true) {
                    console.log(res.data.data)
                    this.curArea = res.data.data
                    this.CheckStoreServiceRegion()
                    window.$.PageDialog.ok('已为您切换到<br>'+val.city+ ' '+val.district)
                    this.$router.back()
                }
            })
        },
        // 检查区域是否已开通
        CheckStoreServiceRegion () {
            var params = {
                countyId: this.curArea.id
            }
            this.$http.post(ports.port.CheckStoreServiceRegion, params).then((res) => {
                if (res.data.success === true) {
                    console.log(res.data.data)
                    if (!res.data.data) {
                        window.$.PageDialog.ok('当前定位的地区暂未开通尚门理车服务')
                    } else {
                        this.$store.state.user.curAreaID = this.curArea.id
                        window.localStorage.curAreaID = this.curArea.id
                    }
                }
            })
        },
        // 获取已开通地区
        GetStoreServiceRegions () {
            this.$http.get(ports.port.GetStoreServiceRegions).then((res) => {
                if (res.data.success === true) {
                    this.ktData = res.data.data
                }
            })
        },
        // 获取省市区数据
        getAreaAllData () {
            this.$http.get(ports.port.GetAllRegionsWithoutTown).then((res) => {
                if (res.data.success === true) {
                    console.log(res.data.data)
                }
            })
        },
        changeArea (val) {
            console.log(val)
            this.$store.state.user.curAreaID = val.id
            window.localStorage.curAreaID = val.id
            this.$store.state.user.curAreaName = val.name
            window.$.PageDialog.ok('已为您切换到<br>'+val.name)
            this.$router.back()
        },
        positionCur () {
            console.log(window.sessionStorage.lng)
            console.log(window.sessionStorage.lat)
            var p = {
                lat: window.sessionStorage.lng,
                lng: window.sessionStorage.lat
            }
            // window.translation(p)
            var point = new window.BMap.Point(p.lat, p.lng)
            var that = this
            window.geoc.getLocation(point, function(rs){
                var addComp = rs.addressComponents
                that.curPositionInfo = addComp
            });
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.write-space2
    height:45px
.posi-wrap
    .sort_letter
        background:#f5f5f5
        padding-left:15px
        border-top: none
    .cont
        border-bottom:1px solid #ddd
        background-color:#fff
        .sort_list
            padding:10px 0
            margin-left:15px
            &:last-child
                border-bottom:none

</style>
