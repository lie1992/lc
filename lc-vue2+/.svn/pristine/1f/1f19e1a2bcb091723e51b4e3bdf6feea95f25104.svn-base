<template>
    <div class="foot" v-if="count === 0">
        <router-link to="/index" class="foot-item home">首页</router-link>
        <router-link to="/cart" class="foot-item cart">购物车</router-link>
        <router-link to="/order" class="foot-item order">订单</router-link>
        <router-link to="/user/index" class="foot-item mine">我的</router-link>
    </div>
</template>

<script >
    export default{
        computed: {
            count () {
                return this.$store.state.comm.count
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*bg-img($url)
    background-image: url($url+".png")*/
.foot
    position: fixed
    bottom: 0
    left: 0
    /*display: flex*/
    width: 100%
    height: 50px
    z-index:99
    .foot-item
        display:block
        width:25%
        height: 50px
        float:left
        /*flex:1*/
        text-align: center
        background: #353535
        color: #9a9a9a
        font-size:15px
        &:before
            content:''
            display:block
            width:22px
            height:22px
            margin:6px auto 2px auto
            background-size:100% 100%
    .router-link-active
        color: #dab96e
    .home
        &:before
            background-image: url('../../assets/images/icon_home.png')
    .cart
        &:before
            background-image: url('../../assets/images/icon_cart.png')
    .mine
        &:before
            background-image: url('../../assets/images/icon_mine.png')
    .order
        &:before
            width:20px
            height:22px
            background-image: url('../../assets/images/icon_order.png')
    .home.router-link-active
        &:before
            background-image: url('../../assets/images/icon_home_sel.png')
    .cart.router-link-active
        &:before
            background-image: url('../../assets/images/icon_cart_sel.png')
    .mine.router-link-active
        &:before
            background-image: url('../../assets/images/icon_mine_sel.png')
    .order.router-link-active
        &:before
            background-image: url('../../assets/images/icon_order_sel.png')
</style>
