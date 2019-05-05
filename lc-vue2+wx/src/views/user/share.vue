<template lang="html">
    <!-- 分享好友 -->
    <div id="share">
        <header-share :title="viewTitle" :iconType="iconType" :rightParams="rightParams"  v-on:share="shareRel"></header-share>
        <!-- <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:share="shareRel"></header-common> -->
        <div class="shareWrap">
            <div class="code" >
                <img :src="ImgCode.pictureBase64" class="codeibj" />
                我的专属二维码
            </div>
            <div class="listWrap">
                <div class="tt">我邀请的</div>
                <div class="slide" ref="scrollBar">
                    <div class="slideBar">
                        <div class="list" v-for="item in inviteList">
                            <img :src="item.avatarPicture" />
                            <div class="info">
                                <p v-if="item.isy">{{item.ymobile}}</p>
                                <p v-else>{{item.mobile}}</p>
                                <p>{{item.invitedDate}}</p>
                            </div>
                            <div class="showMob" v-if="item.isy" @click="showMobile(item)">显示</div>
                            <div class="showMob" v-else @click="showMobile(item)">隐藏</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import headerShare from '../../components/header/headerShare.vue'
import Bscroll from 'better-scroll'
import ajax from './../../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '分享给好友',
            iconType: 'icon-fanhui',
            rightParams: {
                // path: '/cartCompile',
                // desc: '编辑'
                emit: 'share'
            },
            // 二维码
            ImgCode: '',
            // 列表
            inviteList: []
        }
    },
    components: {
        'header-share': headerShare
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    created () {
        this.$nextTick(function () {
            // this._initScroll()
        })
        this.getCodeImg()
        this.getInviteData()
    },
    methods: {
        showMobile (val) {
            val.isy = !val.isy
        },
        shareRel () {
            // console.log('share')
            this.invite()
        },
        getCodeImg () {
            ajax.ajax({
                'vue': this,
                'port': 'GetSharePic',
                'type': 'get',
                'statusOk': function (res, v) {
                    // console.log(res.data.data)
                    v.ImgCode = res.data.data
                },
                'statusError': function (res, v) {
                }
            })
        },
        getInviteData () {
            ajax.ajax({
                'vue': this,
                'port': 'GetInvited',
                'type': 'get',
                'statusOk': function (res, v) {
                    console.log(res.data.data)
                    var dat = res.data.data
                    for (var i = 0; i < dat.length; i++) {
                        // dat[i].invitedDate
                        var date = new Date(dat[i].invitedDate)
                        var month = parseInt(date.getMonth()) + 1
                        var hours = date.getHours() > 8? date.getHours() - 8: 24 + date.getHours() -8
                        var minutes = date.getMinutes()
                        var seconds = date.getSeconds() >= 10?date.getSeconds():'0'+date.getSeconds()
                        dat[i].invitedDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + hours +':'+ minutes +':'+ seconds

                        // 隐藏手机号码中间4位
                        var mob = dat[i].mobile
                        dat[i]['ymobile'] = mob.substr(0, 3) + '****' + mob.substr(7)
                        dat[i]['isy'] = true
                        // console.log(dat[i].ymobile)
                    }
                    v.inviteList = dat
                    setTimeout(function() {
                        // v.viewScroll.refresh()
                        v._initScroll()
                    },500)
                },
                'statusError': function (res, v) {
                }
            })
        },
        invite () {
            var params = {
                'img': 'http://m.smliche.com/100.jpg',
                'link': '/#/register?ShareCode=' + this.ImgCode.shareUrl,
                'content': '尚门理车',
                'title': '尚门理车'
            }
            if(this.userAgent() === "android"){
                params = JSON.stringify(params)
                myJsObj.share(params)
            }else if(this.userAgent() === "ios"){
                window.webkit.messageHandlers.HybridKit.postMessage({"method": "share", "param": params});
            }else{

            }
        },
        userAgent() {
            var ua = navigator.userAgent.toLowerCase()
            var _ua = ""
            if (/iphone|ipad|ipod/.test(ua)) {
                _ua = "ios"
            } else if (/android/.test(ua)) {
                _ua = "android"
            }else{
                _ua = "web"
            }
            return _ua
        },
        _initScroll () {
            this.viewScroll = new Bscroll(this.$refs.scrollBar, {
                click: true,
                scrollY: true
            })
        }
    }
    // beforeDestroy () {
    //     this.$store.commit('showFoot')
    // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#share
    margin-bottom:60px
    .shareWrap
        padding-top:45px
        .code
            height:210px
            width:100%
            color:#666
            text-align:center
            line-height:50px
            background-color:#fff
            border-bottom:1px solid #ddd
            .codeibj
                display:block
                height:150px
                width:150px
                margin:0 auto
    .listWrap
        /*padding-left:10px*/
        border-bottom:1px solid #ddd
        .tt
            height:30px
            line-height:30px
            background-color:#eee
            font-size:15px
            padding-left:10px
        .slide
            /*padding-left:10px*/
            /*padding-left:10px*/
            position:absolute
            top:287px
            bottom:0px
            width:100%
            overflow:hidden
            .list
                padding-left:10px
                overflow:hidden
                height:60px
                border-bottom:1px solid #ddd
                background-color:#fff
                position:relative
                &:last-child
                    border:none
                .showMob
                    position:absolute
                    right:10px
                    top:15px
                    font-size:14px
                    padding:6px 10px
                    background:#f0bb49
                    border-radius:8px
                    color:#fff
                img
                    width:40px
                    height:40px
                    float:left
                    border-radius:100%
                    margin-top:10px
                .info
                    p
                        margin-left:60px
                        &:first-child
                            color:#333
                            font-size:17px
                            line-height:35px
                            height:35px
                        &:last-child
                            color:#999
                            font-size:14px
                            line-height:15px






</style>
