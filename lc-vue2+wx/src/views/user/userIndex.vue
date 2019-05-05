<template lang="html">
    <div id="mine">
        <header-mine></header-mine>
        <div class="mine-top">
            <img src="../../assets/images/mine_head.jpg" class="hdbd">
            <div class="info iconfont icon-chevron-copy-copy-copy-copy-copy-copy" @click="gotoInfo">
                <img src="../../assets/images/header_default.png" class="headerImg" v-if="!userInfo.avatarPicture">
                <img :src="userInfo.avatarPicture" class="headerImg" v-if="userInfo.avatarPicture">
                <div class="desc">
                    <p class="userName" id="userName">{{userInfo.userName}}</p>
                    <p class="grade">
                        <img src="../../assets/images/icon_grade.png"  v-if="userInfo.gradeLevel >= 0"/>
                        <img src="../../assets/images/icon_grade.png"  v-if="userInfo.gradeLevel >= 2"/>
                        <img src="../../assets/images/icon_grade.png"  v-if="userInfo.gradeLevel >= 3"/>
                        <img src="../../assets/images/icon_grade.png"  v-if="userInfo.gradeLevel >= 4"/>
                        <img src="../../assets/images/icon_grade.png"  v-if="userInfo.gradeLevel >= 5"/>
                    </p>
                </div>
            </div>
            <div class="account">
                <div class="left" @click="$router.push('/user/discount')">
                    <span class="in">优惠券</span>
                    <span class="num">{{userInfo.couponCount}} 张</span>
                </div>
                <div class="right" @click="$router.push('/user/balance')">
                    <span class="in">余额</span>
                    <span class="num">{{userInfo.balance}} 元</span>
                </div>
            </div>
        </div>
        <div class="menuList">
            <p class="car iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/carList">我的车辆</router-link></p>
            <p class="post iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/report">车检报告</router-link></p>
            <p class="address iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/address">我的地址</router-link></p>
        </div>
        <div class="menuList">
            <p class="issue iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/issure">常见问题</router-link></p>
            <p class="share iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/share">分享给好友</router-link></p>
            <p class="idea iconfont icon-chevron-copy-copy-copy-copy-copy-copy"><router-link to="/user/idea">意见反馈</router-link></p>
        </div>
        <div class="menuList">
            <p class="phone iconfont icon-chevron-copy-copy-copy-copy-copy-copy">
                <span class="phoneShow" @click="call(kf_phone)">客服电话 <em class="phoneNum">{{kf_phone}}</em></span>
            </p>
        </div>
        <p class="tip">服务时间：{{kf_time}}</p>
    </div>
</template>

<script>
import headerMine from '../../components/header/headerMine.vue'
import ajax from './../../vueResource.ajax.js'

export default {
    data () {
        return {
            kf_phone: '',
            // 工作时间
            kf_time: ''
        }
    },
    components: {
        'header-mine': headerMine
    },
    created () {
        // if(this.userAgent() === "android"){
        //     setTimeout(function () {
        //         document.getElementById("cnm").addEventListener('click', function(){
        //             myJsObj.call("88888888")
        //             return false
        //         }, false)
        //     },1000)
        // }
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
        gotoInfo: function () {
            this.$router.push('/user/info')
        },
        call (num) {
            window.location.href = 'tel:' + num
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
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('showFoot')
    },
    computed: {
        userInfo () {
            return this.$store.state.user.userInfo
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#mine
    padding-bottom:100px
    .mine-top
        position:relative
        height:220px
        .hdbd
            width:100%
            height:100%
        .icon-chevron-copy-copy-copy-copy-copy-copy
            &:before
                position:absolute
                right:10px
                color:#fff
                top:35px
        .info
            position:absolute
            height:80px
            width:100%
            top:60px
            left:0
            .headerImg
                height:80px
                width:80px
                border-radius:100%
                margin:0 10px
                float:left
            .desc
                margin-top:10px
                color:#fff
                float:left
                width:60%
                #userName
                    width:100%
                    /*white-space:nowrap;*/
                    overflow:hidden;
                    /*text-overflow:ellipsis;*/
                    font-size:18px
                    line-height:25px
                    height:25px
                    color:#fff!important
                .grade
                    margin-top:10px
                    img
                        width:24px
                        height:24px
                        margin-right:5px
        .account
            position:absolute
            bottom:0
            height:65px
            width:100%
            background-color:rgba(0,0,0,0.1)
            div
                float:left
                width:50%
                text-align:center
                color:#dcdcdc
                font-size:17px
                span
                    display:block
                    line-height:18px
                    text-align:center
                .num
                    color:#fff
                .in
                    margin-top:8px
                    line-height:28px
                    &:before
                        display: inline-block
                        content:''
                        width:19px
                        height:13px
                        margin-right:5px
                        background-image:url(../../assets/images/icon_money.png)
                        background-size:100% 100%
            .left
                position:relative
                &:before
                    content:''
                    display:block
                    width:1px
                    height:40px
                    background-color:#a5a5a5
                    position:absolute
                    right:0
                    top:12px
            .right
                .in
                    line-height:28px
                    &:before
                        background-image:url(../../assets/images/icon_ticket.png)
    .tip
        text-align:center
        font-size:13px
        color:#323232
    .menuList
        /*margin-left:45px*/
        padding-left:45px
        margin-bottom:10px
        background-color:#fff
        border-bottom:1px solid #ddd
        border-top:1px solid #ddd
        p
            position:relative
            height:45px
            border-bottom:1px solid #ddd
            line-height:45px
            &:before
                position:absolute
                right:10px
                font-size:14px
                color:#323232
            &:last-child
                border:none
            a
                color:#323232
                position:relative
                display:block
                &:before
                    position:absolute
                    content:''
                    display:inline-block
                    width:20px
                    height:20px
                    background-repeat:no-repeat
                    left:-45px
                    vertical-align:middle
                    background-size:100% 100%
                    margin:13px
            .phone
                color:#323232
                position:relative
                display:block
            .phoneShow
                display:block
                &:before
                    position:absolute
                    content:''
                    display:inline-block
                    width:20px
                    height:20px
                    background-repeat:no-repeat
                    left:-45px
                    vertical-align:middle
                    background-size:100% 100%
                    margin:13px
                    background-image:url(../../assets/images/icon_phone.png)
                .phoneNum
                    color:#999
                    float:right
                    margin-right:30px
                    font-style:normal
        .car
            a
                &:before
                    background-image:url(../../assets/images/icon_car.png)
        .post
            a
                &:before
                    background-image:url(../../assets/images/icon_list.png)
        .address
            a
                &:before
                    background-image:url(../../assets/images/icon_posi.png)
        .issue
            a
                &:before
                    background-image:url(../../assets/images/icon_yiwen.png)
        .share
            a
                &:before
                    background-image:url(../../assets/images/icon_share.png)
        .idea
            a
                &:before
                    background-image:url(../../assets/images/icon_yijian.png)
        .phone
            span
                &:before
                    background-image:url(../../assets/images/icon_phone.png)
</style>
