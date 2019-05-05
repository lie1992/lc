<template lang="html">
    <div id="paymentF" >
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams" :paths="close" v-on:back2="back2Rel"></header-common>
        <div class="wrap ">
            <span class="iconfont icon-guanbi1"></span>
            支付失败
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
import headerCommon from 'components/header/headerCommon.vue'

export default {
    data () {
        return {
            viewTitle: '支付失败',
            iconType: 'icon-fanhui',
            rightParams: {
                path: 'close',
                closeEmit: 'back2'
            },
            close: 'close'
        }
    },
    components: {
        'header-common': headerCommon
    },
    created () {
    },
    methods: {
        back2Rel () {
            this.$router.go(-2)
        }
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#paymentF
    .wrap
        padding-top:55px
        text-align:center
        .iconfont
            margin-top:100px
            display:block
            height:62px
            text-align:center
            margin-bottom:10px
            &:before
                font-size:60px
                color:#dab96e

</style>
