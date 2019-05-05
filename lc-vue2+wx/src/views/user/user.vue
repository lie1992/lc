<template lang="html">
    <div class="user">
        <router-view></router-view>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// import ports from './../../port.js'
import ajax from './../../vueResource.ajax.js'

export default {
    data () {
        return {}
    },
    created () {
        this.getInfo()
    },
    methods: {
        getInfo () {
            ajax.ajax({
                'vue': this,
                'port': 'MyInfo',
                'type': 'get',
                'statusOk': function (res, v) {
                    v.$store.commit('setUserInfo', res.data.data)
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('获取用户信息失败')
                }
            })
            // this.$http.get(ports.port.MyInfo).then((res) => {
            //     if (res.data.success === true) {
            //         this.$store.commit('setUserInfo', res.data.data)
            //         // console.log(this.$store.state.user.userInfo)
            //     } else {
            //         Toast('获取用户信息失败')
            //     }
            // })
        }
    }
}
</script>
