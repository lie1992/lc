import ports from '../src/port.js'
import { Toast, Indicator } from 'mint-ui'
var ajax = function (params) {
    var _Vue = params.vue
    // 接口 port
    var port = ports.port[params.port]
    // 请求参数 post-req_params get-params_url
    var reqParams = params.req_params
    var reqParamsUrl = params.params_url ? params.params_url : ''
    // 请求方式 post/get 默认post
    var type = params.type
    // 请求结果回调 statusOk statusError
    var statusOk = params.statusOk
    var statusError = params.statusError
    if (window.navigator.onLine !== true) {
        Indicator.close()
        window.$.PageDialog.ok('网络连接失败，请尝试关掉APP重新打开')
        return false
    }
    if (type === 'get') {
        Indicator.open()
        _Vue.$http.get(port + reqParamsUrl ).then((res) => {
            setTimeout(function(){
                Indicator.close()
            },200)
            if (res.data.success === true) {
                statusOk(res, _Vue)
            } else {
                if (res.data.errorCode === 401) {
                    window.$.PageDialog.ok('登录信息已过期，请重新登录')
                    _Vue.$store.state.user.userDefaultCar = null
                    // window.localStorage.clear()
                    window.localStorage.removeItem('userToken')
                    window.localStorage.removeItem('userName')
                    _Vue.$store.state.user.userToken = ''
                    _Vue.$store.state.user.userName = ''
                    _Vue.$store.state.user.userDefaultCar = {}
                    _Vue.$store.state.user.curCarData = {}
                    _Vue.$store.state.user.curAreaID = ''
                    _Vue.$store.state.user.curCarNum = ''
                    _Vue.$store.state.user.userCarList = []
                    _Vue.$store.state.user.userInfo = {}
                    _Vue.$store.state.user.curCarID = ''
                    _Vue.$router.push('/login')
                    return
                }
                if (statusError) {
                    Indicator.close()
                    statusError(res, _Vue)
                }
            }
        }, (res) => {
            Indicator.close()
            // window.$.PageDialog.ok('服务器未响应，请稍后重试')
        })
    } else {
        Indicator.open()
        _Vue.$http.post(port, reqParams).then((res) => {
            setTimeout(function(){
                Indicator.close()
            },200)
            if (res.data.success === true) {
                statusOk(res, _Vue)
            } else {
                if (res.data.errorCode === 401) {
                    _Vue.$router.push('/login')
                }
                if (statusError) {
                    statusError(res, _Vue)
                }
            }
        }, (res) => {
            Indicator.close()
            // window.$.PageDialog.ok('服务器未响应，请稍后重试')
        })
    }
}

export default {
    ajax
}
