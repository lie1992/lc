<template lang="html">
    <div class="articleDetail">
        <header-common :title="viewTitle" :iconType="iconType"></header-common>
        <div class="messageDesc">
            <div class="tt">{{articleData.title}}</div>
            <div class="tm">{{date}}</div>
            <div class="desc2" v-html="articleData.full">
            </div>
        </div>
    </div>
</template>

<script>
import headerCommon from 'components/header/headerCommon.vue'
import ajax from './../vueResource.ajax.js'
import { Toast } from 'mint-ui'

export default {
    data () {
        return {
            viewTitle: '文章',
            iconType: 'icon-fanhui',
            rightParams: {},
            articleData: {
                full: ''
            },
            date: ''
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    computed: {
        date () {
            if (this.articleData.createdOn) {
                var str = this.articleData.createdOn
                str = String(str)
                return str.split('T')[0]
            }else {
                return ''
            }
        }
    },
    created () {
        console.log(this.$route.params)
        ajax.ajax({
            'vue': this,
            'port': 'GetArticleDetail',
            'type': 'get',
            'params_url': '?articleId=' + this.$route.params.id,
            'statusOk': function (res, v) {
                v.articleData = res.data.data
                var str = this.articleData.createdOn
                str = String(str)
                v.date = str.split('T')[0]
            },
            'statusError': function (res, v) {
                // Toast('获取用户信息失败')
            }
        })
    },
    components: {
        'header-common': headerCommon
    }
}
</script>

<style lang="css" lang="stylus" rel="stylesheet/stylus">
.articleDetail
    position:fixed
    top:0
    left:0
    padding:10px 2%
    background-color:#fff
    height:100%
    width:96%
    overflow-y:auto
    img
        max-width:100%
    .tt
        height:40px
        line-height:40px
        font-size:18px
        color:#000
        overflow:hidden
    .tm
        font-size:15px
        color:#999
    .desc2
        margin-top:20px
        padding-left:0
        /*height:50px*/
        line-height:25px
        color:#999
        overflow:hidden
        p
            text-indent:2rem
            word-break:break-all
            word-wrap:break-word
</style>
