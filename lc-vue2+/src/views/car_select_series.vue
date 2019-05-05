<template lang="html">
    <!-- 选择车型 -->
    <div id="share">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="shareWrap">
            
        </div>
    </div>

</template>

<script>
import headerCommon from '../../components/header/headerCommon.vue'
export default {
    data () {
        return {
            viewTitle: '选车车型',
            iconType: 'icon-fanhui',
            rightParams: {}
        }
    },
    components: {
        'header-common': headerCommon
    },
    beforeCreate () {
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
