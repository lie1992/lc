<template>
    <div class="headerCommon">
        <div class="currentArea">
            <a class="iconfont" :class="iconType" @click="_goPage(paths)"></a>
        </div>
        <div class="title">{{title}}</div>
        <div class="headRight" v-if="rightParams">
            <!-- <router-link :to="{path: rightParams.path}" >{{rightParams.desc}}</router-link> -->
            <a @click="rightPath">{{rightParams.desc}}</a>
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
            paths : {
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
                if(!this.iconType){
                    return false
                }
                if (!_path || _path === '') {
                    this.$router.back()
                } else if (_path === 'close') {
                    this.$emit(this.rightParams.closeEmit)
                }else {
                    this.$router.push({path: _path})
                }
            },
            rightPath () {
                if (this.rightParams.emit) {
                    console.log(this.rightParams.emit)
                    this.$emit(this.rightParams.emit)
                }
                if (this.rightParams.path === 'back') {
                    this.$router.back()
                } else {
                    this.$router.push(this.rightParams.path)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/font/iconfont.css'

.headerCommon
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
        right:0
        top:0
        min-width:80px
        a
            display:block
            padding-right:10px
            font-size:16px
            text-align:right
            color:#dab96e
        span
            display:inline-block
            width:35px
            font-size:22px
        .search
            text-align:right
        .msgTip
            text-align:center

</style>
