<template lang="html">
    <!-- 选择车款 -->
    <div id="pattern">
        <header-float :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :hideNode="hideNode"></header-float>
        <div class="patternWrap">
            <div class="list" v-for="item in finalData">
                <p>{{item.year}}款</p>
                <ul>
                    <li v-for="node in item.list" @click="setSelectCarId(node.carId)" >{{node.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import headerFloat from '../components/header/headerFloat.vue'
import { Toast } from 'mint-ui'
import ajax from './../vueResource.ajax.js'
export default {
    props: {
        parternId: {
            type: Number
        }
    },
    data () {
        return {
            viewTitle: '选车车款',
            iconType: 'icon-fanhui',
            rightParams: {},
            // 获取车辆数据
            patternList: [],
            // 最终数据
            finalData: [],
            // 隐藏车辆选择
            hideNode: 'hideCarSelectPartern'
        }
    },
    components: {
        'header-float': headerFloat
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
    },
    created () {
        this.getData(this.parternId)
        // this.getData(this.$route.query.id)
    },
    methods: {
        getData (id) {
            ajax.ajax({
                'vue': this,
                'port': 'GetCarsBySeriesId',
                'type': 'get',
                'params_url': '?seriesId=' + id,
                'statusOk': function (res, v) {
                    v.patternList = res.body.data
                },
                'statusError': function (res, v) {
                    // Toast('获取车款失败')
                }
            })
        },
        setSelectCarId (id) {
            // console.log(id)
            this.$store.state.comm.addCarID = id
            // this.$router.push('/user/addCarInfo')
            this.$store.commit('hideCarSelect')
            this.$store.commit('hideCarSelectPartern')
        }
    },
    watch: {
        patternList (val, oldVal) {
            var map = {}
            var dest = []
            for (var i = 0; i < val.length; i++) {
                var ai = val[i]
                // console.log(map[ai.year])
                if (!map[ai.year]) {
                    var tmp = {
                        year: ai.year,
                        list: []
                    }
                    tmp.list.push(ai)
                    dest.push(tmp)
                    map[ai.year] = ai
                } else {
                    for (var j = 0; j < dest.length; j++) {
                        var dj = dest[j]
                        if (dj.year === ai.year) {
                            dj.list.push(ai)
                            break
                        }
                    }
                }
            }
            this.finalData = dest
            // console.log(dest)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#pattern
    position:absolute
    width:100%
    z-index:1002
    top:0
    left:0
    min-height:100%
    background-color:#fff
    .patternWrap
        margin-top:45px
        .list
            background-color:#fff
            &:last-child
                border-bottom:1px solid #ddd
            p
                background-color:#f5f5f5
                border-bottom:1px solid #ccc
                border-top:1px solid #ccc
                line-height:35px
                padding-left:10px
            ul
                li
                    display:block
                    height: 60px
                    line-height: 60px
                    border-bottom: 1px solid #ccc
                    background: #fff
                    font-size: 18px
                    margin-left: 10px
                    overflow:hidden
                    &:last-child
                        border:none
</style>
