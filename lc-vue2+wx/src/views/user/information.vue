<template lang="html">
    <!--  个人资料  -->
    <div id="information">
        <header-common :title="viewTitle" :iconType="iconType" :rightParams="rightParams"></header-common>
        <div class="informationWrap">
            <div class="head">
                <div class="headWrap">
                    <img src="../../assets/images/header_default.png"  v-if="!userInfo.avatarPicture">
                    <img :src="userInfo.avatarPicture" class="headerImg" v-if="userInfo.avatarPicture">
                    <p>更换头像</p>
                    <form method="post" ref="upload">
                        <input type="file" name="file" @change="onUpload($refs.upload)">
                    </form>
                </div>
            </div>
            <div class="info">
                <div class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy">
                    <label>姓名</label><input type="text" placeholder="请填写" v-model="$store.state.user.userInfo.realName" @blur="onChangeName">
                </div>
                <div class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy dis">
                    <label>手机号</label><input type="text" placeholder="请填写" v-model="this.$store.state.user.userInfo.mobile" :disabled="this.$store.state.user.userInfo.mobile ? true : false">
                </div>
                <div class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy">
                    <label>性别</label>
                    <input type="text" :value="userInfo.gender" v-model="sex" readonly @click="hasSexPicker = 0" >
                </div>
                <div class="iconfont icon-chevron-copy-copy-copy-copy-copy-copy">
                    <label>生日</label>
                    <input type="text" v-model="birthDate" readonly @click="openPicker">
                </div>
                <div class="iconfont dis">
                    <label>会员等级</label>
                    <input type="text" :value="grade" readonly="">
                </div>
            </div>
            <div class="code">
                <img :src="ImgCode.pictureBase64" class="codeibj" />
                我的专属二维码
            </div>
            <div class="sex-picker" v-if="hasSexPicker == 0">
                <div class="mask"></div>
                <div class="pickWrap">
                    <div class="opwrap">
                        <span @click="onsexPicker(1)">取消</span>
                        <span @click="onsexPicker(0)">确定</span>
                    </div>
                    <mt-picker :slots="slots" :visibleItemCount="visibleItemCount" @change="onPickerChange"></mt-picker>
                </div>
            </div>
            <mt-datetime-picker ref="picker" type="date" :startDate="startDate"  @confirm="closePicker" @cancel="closePicker" > </mt-datetime-picker>
        </div>
    </div>

</template>

<script>
import headerCommon from '../../components/header/headerCommon.vue'
import 'mint-ui/lib/style.min.css'
import { DatetimePicker, Picker, Toast, Indicator } from 'mint-ui'
import upload from '../../../static/js/upload.js'
import ports from './../../port.js'
import ajax from './../../vueResource.ajax.js'

export default {
    data () {
        return {
            viewTitle: '个人资料',
            iconType: 'icon-fanhui',
            rightParams: {},
            visibleItemCount: 3,
            slots: [{
                flex: 1,
                values: ['男', '女', '保密'],
                textAlign: 'center'

            }],
            hasSexPicker: 1,
            startDate: new Date(),
            userName: '',
            userMobile: '',
            // 二维码
            ImgCode: '',
            // 判断自定义Picker是否选择
            isPickerChange: ''
        }
    },
    components: {
        'header-common': headerCommon,
        'mt-datetime-picker': DatetimePicker,
        'mt-picker': Picker
    },
    computed: {
        userInfo () {
            return this.$store.state.user.userInfo
        },
        grade () {
            var grade = this.$store.state.user.userInfo.gradeLevel
            var gradeTxt = ''
            switch (grade) {
            case 0:
                gradeTxt = '一星会员'
                break
            case 1:
                gradeTxt = '一星会员'
                break
            case 2:
                gradeTxt = '二星会员'
                break
            case 3:
                gradeTxt = '三星会员'
                break
            case 4:
                gradeTxt = '四星会员'
                break
            case 5:
                gradeTxt = '五星会员'
                break
            }
            return gradeTxt
        },
        // userName () {
        //     return this.$store.state.user.userInfo.realName
        // },
        // userMobile () {
        //     return this.$store.state.user.userInfo.mobile
        // },
        sex () {
            return this.$store.state.user.userInfo.gender
        },
        birthDate () {
            var dateTmp
            if (this.$store.state.user.userInfo.birthday) {
                var date = new Date(this.$store.state.user.userInfo.birthday)
                var month = parseInt(date.getMonth()) + 1
                dateTmp = date.getFullYear() + '-' + month + '-' + date.getDate()
            } else {
                dateTmp = ''
            }
            return dateTmp
        }
    },
    beforeCreate () {
        window.scroll(0,0)
        this.$store.commit('hideFoot')
    },
    beforeDestroy () {
        Indicator.close()
    },
    created () {
        // this.userName = this.$store.state.user.userInfo.realName
        // this.userMobile = this.$store.state.user.userInfo.mobile
        // this.sex = this.$store.state.user.userInfo.gender

        var arr = '1970-01-01 00:00:00'.split(/[- : /]/)
        var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
        this.startDate = new Date(date)
        this.getCodeImg()
    },
    methods: {
        getCodeImg () {
            ajax.ajax({
                'vue': this,
                'port': 'GetSharePic',
                'type': 'get',
                'statusOk': function (res, v) {
                    v.ImgCode = res.data.data
                },
                'statusError': function (res, v) {
                }
            })
        },
        onPickerChange (picker, val) {
            // 性别
            // this.$store.state.user.userInfo.gender = val[0]
            this.isPickerChange = val[0]

        },
        onsexPicker (val) {
            // 0确定 1取消
            this.hasSexPicker = 1
            if (val === 0) {
                this.setSex()
            }
        },
        openPicker () {
            this.$refs.picker.open()
        },
        closePicker (val) {
            // 生日
            console.log(val)
            this.$refs.picker.close()
            var date = new Date(val)
            // window.$.PageDialog.ok(date)
            var month = parseInt(date.getMonth()) + 1
            var dateTmp = date.getFullYear() + '/' + month + '/' + date.getDate()
            this.$store.state.user.userInfo.birthday = dateTmp
            this.changeBorthday(dateTmp)
        },
        onChangeName () {
            if (!this.$store.state.user.userInfo.realName) {
                window.$.PageDialog.ok('姓名不能为空')
                return
            }
            ajax.ajax({
                'vue': this,
                'port': 'SetRealName',
                'type': 'post',
                'req_params': { realName: this.$store.state.user.userInfo.realName },
                'statusOk': function (res, v) {
                    // v.$store.state.user.userInfo.realName
                    window.$.PageDialog.ok('修改名称成功')
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('修改名称失败')
                }
            })
        },
        setSex () {
            if (this.isPickerChange !== '') {
                this.$store.state.user.userInfo.gender = this.isPickerChange
            } else {
                this.$store.state.user.userInfo.gender = this.slots[0].values[0]
            }
            this.isPickerChange = ''
            if (!this.sex) {
                window.$.PageDialog.ok('请选择性别')
                return
            }
            ajax.ajax({
                'vue': this,
                'port': 'SetGender',
                'type': 'post',
                'req_params': { gender: this.sex },
                'statusOk': function (res, v) {
                    // v.$store.state.user.userInfo.realName
                    window.$.PageDialog.ok('设置成功')
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('修改失败')
                }
            })
        },
        changeBorthday (da) {
            if (!this.$store.state.user.userInfo.birthday) {
                window.$.PageDialog.ok('请选择生日日期')
                return
            }
            // console.log(this.$store.state.user.userInfo.birthday)
            ajax.ajax({
                'vue': this,
                'port': 'SetBirthday',
                'type': 'post',
                'req_params': { birthday: da },
                'statusOk': function (res, v) {
                    // v.$store.state.user.userInfo.realName
                    window.$.PageDialog.ok('设置成功')
                },
                'statusError': function (res, v) {
                    window.$.PageDialog.ok('修改失败')
                }
            })
        },
        onUpload (fm) {
            var formdata = new window.FormData(fm)
            var that = this
            Indicator.open()
            upload.upload(formdata, ports.port.PictureUpload, function (val) {
                val = JSON.parse(val)
                if (val.success === true) {
                    ajax.ajax({
                        'vue': that,
                        'port': 'UpdateAvatar',
                        'type': 'post',
                        'req_params': { pictureId: val.data[0] },
                        'statusOk': function (res, v) {
                            window.$.PageDialog.ok('设置成功')
                            v.userInfo.avatarPicture = res.data.data
                            // console.log(v.userInfo)
                            Indicator.close()
                        },
                        'statusError': function (res, v) {
                            window.$.PageDialog.ok('修改失败')
                            Indicator.close()
                        }
                    })
                    // Toast('上传成功')
                } else {
                    window.$.PageDialog.ok('上传失败')
                }
            })
        }
    }
    // beforeDestroy () {
    //     this.$store.commit('showFoot')
    // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#information
    .informationWrap
        margin-top:45px
        .head
            height:100px
            background-color:#fff
            padding-top:20px
            border-bottom:1px solid #ddd
            .headWrap
                width:80px
                height:80px
                position:relative
                left:50%
                margin-left:-40px
                border-radius:100%
                -webkit-mask-image: url(../../assets/images/header_default.png)
                -webkit-mask-size:100% 100%
                form
                    position:absolute
                    left:0
                    bottom:0
                    width:100%
                    overflow:hidden
                    height:100%
                    opacity:0
                    input
                        height:100%
                img
                    width:80px
                    height:80px
                    /*border-radius:100%*/
                    display:block
                p
                    position:absolute
                    bottom:0
                    text-align:center
                    background-color:rgba(0,0,0,0.5)
                    color:#fff
                    width:100%
                    height:30px
                    line-height:25px
                    font-size:12px

        .info
            margin-top:15px
            width:100%
            background-color:#fff
            border-bottom:1px solid #ddd
            div
                height:45px
                line-height:45px
                margin-left:10px
                border-bottom:1px solid #ddd
                position:relative
                &:last-child
                    border-bottom:none
                &:before
                    position:absolute
                    right:10px
                    color:#999
                label
                    display:inline-block
                    width:33%
                    color:#999
                    float:left
                input
                    display:inline-block
                    width:60%
                    height:44px
                    background-color:#fff
                    float:left
            .dis
                input
                    color:#999
        .code
            height: 250px
            width: 100%
            color: #666
            text-align: center
            line-height: 50px
            background-color: #fff
            padding-top: 30px
            img
                display: block
                height: 190px
                width: 190px
                margin: 0 auto
    .sex-picker
        width:100%
        height:100%
        position:fixed
        bottom:0
        .mask
            position:absolute
            height:100%
            width:100%
            background-color:rgba(0,0,0,0.5)
        .pickWrap
            position:absolute
            bottom:0
            width:100%
            z-index:2
            background-color:#fff
            .opwrap
                overflow:hidden
                border-bottom:1px solid #ddd
                span
                    display:block
                    float:left
                    width:50%
                    color:#26a2ff
                    height:40px
                    line-height:40px
                    text-align:center


</style>
