<template lang="html">
    <div class="message" >
        <div class="write-space"></div>
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="content">
            <div class="scrollBar" ref="slideBar" :class="overflow?'overflow':''">
                <div class="listWrap">
                    <div class="list" @click="setDetail(msg)" v-for="msg in MsgData">
                        <p class="tt iconfont" :class="msg.readStatus === 2?'icon-youjiandakai':'icon-neibuyoujian'">{{msg.subject }}</p>
                        <p class="tm">{{msg.date}}</p>
                        <p class="desc">{{msg.content}}</p>
                    </div>
                </div>
            </div>
        </div>
        <messageDetail :deatil="deatil" v-if="msgShow" v-on:closeMSGDRelParent="closeMSGDRelParentReal"></messageDetail>
    </div>
</template>

<script  type="text/ecmascript-6">
import Bscroll from 'better-scroll'
import headerCommon from 'components/header/headerCommon.vue'
import messageDetail from './../views/messageDetail.vue'
import ajax from './../vueResource.ajax.js'
import { Toast } from 'mint-ui'

export default {
    data () {
        return {
            viewTitle: '我的消息',
            iconType: 'icon-fanhui',
            rightParams: {},
            // 消息列表数据
            MsgData: [],
            // 新闻详情
            deatil: {},
            msgShow: false,
            overflow: false,
            page: 1,
            isNo: false,
            isLoading: false
        }
    },
    components: {
        'header-common': headerCommon,
        'messageDetail': messageDetail
    },
    created () {
        this.$store.commit('hideFoot')
        this.$nextTick(function () {
            // this._initScroll()
        })
        this.getData(1)
        this.loadMore()
    },
    methods: {
        loadMore () {
            var that = this
            var oldy, cury
            window.addEventListener('scroll', function (event) {
                oldy = cury
                var scrollTop = document.body.scrollTop
                cury = scrollTop
                var clientHeight
                if (!that.$refs.slideBar) {
                    return
                }
                clientHeight = that.$refs.slideBar.clientHeight
                if (oldy >= cury) {
                    return
                }
                if (scrollTop + window.innerHeight >= clientHeight) {
                    that.getData(that.page)
                }
            })
        },
        setDetail (val) {
            val.readStatus = 2
            this.deatil = val
            this.msgShow = true
            this.overflow = true
        },
        closeMSGDRelParentReal () {
            this.msgShow = false
            this.overflow = false
        },
        _initScroll () {
            this.viewScroll = new Bscroll(this.$refs.scrollBar, {
                click: true,
                scrollY: true
            })
        },
        dotoDetail (id) {
            this.$store.commit('showFoot')
            this.$router.push('/message/' + id)
        },
        getData (page) {
            if (this.isLoading) {
                return
            }
            if (this.isNo) {
                return
            }
            this.isLoading = true
            ajax.ajax({
                'vue': this,
                'port': 'MyMessages',
                'type': 'get',
                'params_url': '?dto.page=' + page + '&dto.pageSize=10',
                'statusOk': function (res, v) {
                    v.isLoading = false
                    if (res.data.data.length <= 0) {
                        // window.$.PageDialog.ok('没有更多')
                        v.isNo = true
                        return
                    }
                    var dat = res.data.data
                    var date
                    var month
                    for (var i = 0; i < dat.length; i++) {
                        date = new Date(dat[i].createOn)
                        month = parseInt(date.getMonth()) + 1
                        dat[i]['date'] = date.getFullYear() + '-' + month + '-' + date.getDate()
                    }
                    // v.MsgData = res.data.data
                    v.MsgData = v.MsgData.concat(res.data.data)
                    console.log(v.MsgData)
                    v.page ++
                },
                'statusError': function (res, v) {
                }
            })
        }
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
    }
    // beforeDestroy () {
    //     this.$store.commit('showFoot')
    // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .message
        position:absolute
        width:100%
        height:100%
        .content
            position:absolute
            top:45px
            width:100%
            bottom:0
            padding:10px 0
            background-color:#eee
            .overflow
                overflow:hidden
            .scrollBar
                height:100%
                .list
                    border-radius:10px
                    background-color:#fff
                    height:135px
                    width:90%
                    margin: 5px auto 10px auto
                    p
                        padding:0 0 0 5%
                    .tt
                        height:40px
                        line-height:40px
                        font-size:18px
                        color:#000
                        overflow:hidden
                        position:relative
                        &:before
                            position:absolute
                            right:20px
                            font-size:28px
                            top:6px
                            color:#dab96e
                    .tm
                        font-size:15px
                        color:#999
                    .desc
                        border-top:1px solid #ddd
                        padding-left:0
                        padding-top:7px
                        margin:10px 5% 0 5%
                        height:50px
                        line-height:25px
                        color:#999
                        overflow:hidden


</style>
