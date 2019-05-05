<template lang="html">
    <!-- 服务评价 -->
    <div id="serveIntroduceComm">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="serveIntroduceWrap">

            <div class="content">
                <h2>服务评价</h2>
                <div class="comment" ref="slideBar">
                    <div class="list" v-for="item in serveCommmData">
                        <img :src="item.customerPictureUrl" class="headImg">
                        <div class="info">
                            <p class="p1"><span class="name">{{item.customerMobile}}</span><span class="time">{{item.createdOn}}</span></p>
                            <p class="grade">
                                <i class="iconfont icon-xing" :class="{'sel': item.serviceProductRating >= 1}"></i>
                                <i class="iconfont icon-xing" :class="{'sel': item.serviceProductRating >= 2}"></i>
                                <i class="iconfont icon-xing" :class="{'sel': item.serviceProductRating >= 3}"></i>
                                <i class="iconfont icon-xing" :class="{'sel': item.serviceProductRating >= 4}"></i>
                                <i class="iconfont icon-xing" :class="{'sel': item.serviceProductRating >= 5}"></i>
                            </p>
                            <p class="commentDesc">
                                {{item.reviewText }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import headerCommon from '../../components/header/headerCommon.vue'
import ajax from './../../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '服务评价',
            iconType: 'icon-fanhui',
            rightParams: {},
            serveData: {},
            // 服务评价
            serveCommmData: [],
            isLoading: false,
            page: 1,
            // 没有数据了
            isNo: false
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
        this.getCommData()
        this.loadMore()
    },
    computed: {
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
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
                    that.getCommData(that.page)
                }
            })
        },
        // 获取评论
        getCommData () {
            if (this.isLoading) {
                return
            }
            if (this.isNo) {
                return
            }
            this.isLoading = true
            ajax.ajax({
                'vue': this,
                'port': 'GetServiceProductReviews',
                'type': 'get',
                'params_url': '?serviceProductId=' + this.$route.query.id + '&page='+ this.page +'&pageSize=10',
                'statusOk': function (res, v) {
                    v.isLoading = false
                    if (res.data.data.length <= 0) {
                        // window.$.PageDialog.ok('没有更多')
                        v.isNo = true
                        return
                    }
                    var dat = res.data.data
                    for (var i = 0; i < dat.length; i++) {
                        var date = new Date(dat[i].createdOn)
                        var month = parseInt(date.getMonth()) + 1
                        var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
                        var minutes = date.getMinutes() >= 10?date.getMinutes():'0'+date.getMinutes()
                        var seconds = date.getSeconds() >= 10?date.getSeconds():'0'+date.getSeconds()
                        dat[i].createdOn = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours +':'+ minutes +':'+ seconds
                    }
                    v.serveCommmData = v.serveCommmData.concat(dat)
                    v.page ++
                },
                'statusError': function (res, v) {
                    // window.$.PageDialog.ok('没有更多')
                    // Toast('获取用户信息失败')
                }
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#serveIntroduceComm
    .serveIntroduceWrap
        padding-top:45px
        padding-bottom:65px
        .top
            border-bottom:1px solid #ddd
            padding:10px 10px 0 10px
            background-color:#fff
            img
                width:100%
            p
                line-height:45px
                overflow:hidden
                span
                    &:first-child
                        font-size:18px
                        color:#333
                    &:last-child
                        font-size:14px
                        color:#999
                        float:right
                        em
                             font-style:normal
                             font-family:'微软雅黑'
                             margin-right:3px
                             color:#dab96e
         .content
             padding:0 10px 10px 10px
             background-color:#fff
             border-bottom:1px solid #ddd
             h2
                 line-height:45px
                 border-bottom:1px solid #ddd
                 margin-bottom:10px
            .desc
                text-indent:2rem
                color:#999
                line-height:20px
            .comment
                .list
                    position:relative
                    padding-left:60px
                    min-height:100px
                    border-bottom:1px solid #ddd
                    &:last-child
                        border:none
                    .headImg
                        width:50px
                        height:50px
                        position:absolute
                        left:5px
                        top:5px
                        border-radius:100%
                    .info
                        .p1
                            padding-top:10px
                            .name
                                color:#333
                            .time
                                color:#999
                                font-size:14px
                                float:right
                        .grade
                            padding-top:10px
                            color:#bfbfbe
                            font-size:13px
                            .sel
                                color:#ffb400
                        .commentDesc
                            padding-top:10px
                            padding-bottom:10px
        .btnWrap
            position:fixed
            bottom:0
            width:100%
            height:55px
            padding-top:5px
            border-top:1px solid #ddd
            background-color:#fff
            button
                border:none
                width:96%
                height:45px
                color:#fff
                font-size:16px
                display:block
                margin-left:2%
                float:left
                &:first-child
                    background-color:#c7a770
                /*&:last-child
                    background-color:#353535*/


</style>
