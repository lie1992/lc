<template lang="html">
    <!-- 忘记密码 -->
    <div class="changePassword">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="changePasswordWrap">
            <form action="" class="regFrom">
                <div class="ww">
                    <div><input type="password" name="oldpassword" placeholder="我的原密码" v-model="oldpassword" /></div>
                    <div><input type="password" name="newpassword" placeholder="我的新密码" v-model="newpassword" /></div>
                    <div><input type="password" name="renewpassword" placeholder="再次输入新密码" v-model="renewpassword"/></div>
                </div>
                <input type="button" value="确定" class="sub" @click="onSubmit">
            </form>
        </div>
    </div>
</template>

<script>
import headerCommon from '../../components/header/headerCommon.vue'
import ajax from './../../vueResource.ajax.js'
import { Toast } from 'mint-ui'

export default {
    data () {
        return {
            viewTitle: '修改密码',
            iconType: 'icon-fanhui',
            rightParams: {},
            oldpassword: '',
            newpassword: '',
            renewpassword: ''
        }
    },
    components: {
        'header-common': headerCommon
    },
    methods: {
        onGetCode () {

        },
        onSubmit () {
            if (!this.oldpassword) {
                window.$.PageDialog.ok('请填写原密码')
                return false
            }
            if (this.newpassword.length < 6) {
                window.$.PageDialog.ok('密码不能小于6位')
                return false
            }
            if (this.renewpassword !== this.newpassword) {
                window.$.PageDialog.ok('两次密码输入不相同')
                return false
            }
            this.onChangePassword()
        },
        onChangePassword () {
            ajax.ajax({
                'vue': this,
                'port': 'UpdatePassword',
                'type': 'post',
                'req_params': {
                    originalPassword: this.oldpassword,
                    newPassword: this.newpassword
                },
                'statusOk': function (res, v) {
                    window.localStorage.clear()
                    v.$store.state.userToken = ''
                    v.$store.state.userName = ''
                    window.$.PageDialog.ok('密码修改成功,请重新登录')
                    v.$router.push('/login')
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok(res.data.errorMessage)
                }
            })
        }
    },
    created () {
        var params = {
            'originalPassword': this.oldpassword,
            'newPassword': this.newpassword
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.changePassword
    .changePasswordWrap
        margin-top:55px
        border-top:1px solid #ccc
        .regFrom
            width:100%
            .ww
                background-color:#fff
                border-bottom:1px solid #ddd
                div
                    height:45px
                    line-height:45px
                    margin-left:45px
                    border-top:1px solid #ccc
                    position:relative
                    &:before
                        content:''
                        display:block
                        position:absolute
                        left:-40px
                        top:5px
                        width:35px
                        height:35px
                        background-image:url(../../assets/images/icon_account.png)
                        background-repeat:no-repeat
                        background-size:19px 213px
                    &:first-child
                        border-top:none
                        &:before
                            background-position:8px -135px
                    &:nth-child(2)
                        &:before
                            background-position:8px -135px
                    &:nth-child(3)
                        &:before
                            background-position:8px -135px
                    input
                        height:45px
                        width:100%
            .sub
                width:94%
                height:45px
                background-color:#c7a770
                color:#fff
                display:block
                margin:15px auto

</style>
