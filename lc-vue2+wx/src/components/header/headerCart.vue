<template>
    <div class="headerCart">
        <div class="currentArea">
            <a class="iconfont" :class="iconType" @click="$router.back()"></a>
        </div>
        <div class="title" @click="titleClick">{{title}} <span class="iconfont icon-control-arr-copy-copy"></span></div>
        <div class="headRight" v-if="rightParams">
            <router-link :to="{path: rightParams.path}" >
                <span v-if="rightParams.desc">{{rightParams.desc}}</span>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String
            },
            iconType: {
                type: String
            },
            rightParams: {
                type: Object
            }
        },
        data () {
            return {
                classObj: 'icon-guanbi',
                path: ''
            }
        },
        created () {
        },
        methods: {
            _goPage (_path) {
                if (_path === '') {
                    this.$router.back()
                } else {
                    this.$router.push({path: _path})
                }
            },
            titleClick () {
                this.$emit('changeCar')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/font/iconfont.css'

.headerCart
    position:fixed
    top:0
    left:0
    z-index: 2
    width:100%
    height:45px
    background: #373737
    color: #fff
    font-size:20px
    line-height:45px
    .currentArea
        float: left
        padding-left: 8px
        font-size:13px
        position:absolute
        .iconfont
            display:inline-block
            color:#dab96e
            width:45px
            height:45px
            &:before
                font-size:20px
                padding:0 5px
    .title
        width:100%
        text-align:center
        color:#dab96e
    .headRight
        position: absolute
        right:15px
        top:0
        min-width:80px
        background:url(../../assets/images/icon_serve_10.png) no-repeat
        background-size:22px 22px
        background-position:right center
        a
            display:block
            height:45px
            font-size:16px
            text-align:right
            color:#dab96e
            span
                display:block
                float:right
                margin-right:-7px
                margin-top:7px
                width:18px
                height:12px
                line-height:12px
                text-align:center
                font-size:12px
                color:#fff
                border-radius:5px
                background-color:#dab96e
        .search
            text-align:right
        .msgTip
            text-align:center

</style>
