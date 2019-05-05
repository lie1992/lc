import index from './views/index.vue'
import cart from './views/cart.vue'
import Tmp from './views/cartTmp.vue'
import cartCompile from './views/cartCompile.vue'
import cartAccessories from './views/cartAccessories.vue'
import order from './views/order.vue'
import orderDetail from './views/orderDetail.vue'
import orderConfirm from './views/orderConfirm.vue'
import cityView from './views/cityView.vue'
import message from './views/message.vue'
import messageDetail from './views/messageDetail.vue'
import article from './views/article.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import findPassword from './views/findPassword.vue'
import selectPattern from './views/carSelectPattern.vue'
import selectSeries from './views/carSelectSeries.vue'
import plan from './views/plan.vue'
import insurance from './views/insurance.vue'
import roadHelp from './views/roadHelp.vue'
import comment from './views/comment.vue'
import payment from './views/payment.vue'
import setInspection from './views/setInspection.vue'
import setInsurance from './views/setInsurance.vue'
import indexInspection from './views/indexInspection.vue'
import indexInsurance from './views/indexInsurance.vue'
import aboutUs from './views/aboutUs.vue'
import recharge from './views/recharge.vue'
import paySuccess from './views/paySuccess.vue'
import chargeSuccess from './views/chargeSuccess.vue'
import payFailed from './views/payFailed.vue'
import agreement from './views/agreement.vue'
import advertisementView from './views/advertisementView.vue'
import queryRegulations from './views/queryRegulations.vue'
// 服务、门店
import serve from './views/serve/serve.vue'
import serveStore from './views/serve/serveStore.vue'
import serveIndex from './views/serve/serveIndex.vue'
import fix from './views/serve/fix.vue'
import hairdressing from './views/serve/hairdressing.vue'
import sprinkle from './views/serve/sprinkle.vue'
import tire from './views/serve/tire.vue'
import serveIntroduce from './views/serve/serveIntroduce.vue'
import appointment from './views/serve/appointment.vue'
import searchServe from './views/serve/searchServe.vue'
import serveComm from './views/serve/serveComm.vue'
// 个人中心
import user from './views/user/user.vue'
import userIndex from './views/user/userIndex.vue'
import carList from './views/user/carList.vue'
import editcarInfo from './views/user/editCarInfo.vue'
import changeCurCar from './views/user/changeCurCar.vue'
import changeCurCarIndex from './views/user/changeCurCarIndex.vue'
import report from './views/user/report.vue'
import address from './views/user/address.vue'
import editAddress from './views/user/editAddress.vue'
import issure from './views/user/issure.vue'
import share from './views/user/share.vue'
import idea from './views/user/idea.vue'
import info from './views/user/information.vue'
import discount from './views/user/discount.vue'
import balance from './views/user/balance.vue'
import balanceDetail from './views/user/balanceDetail.vue'
import setting from './views/user/setting.vue'
import addAddress from './views/user/addAddress.vue'
import direction from './views/user/direction.vue'
import addCarInfo from './views/user/addCarInfo.vue'
import changePassword from './views/user/changePassword.vue'

function isLogin (call) {
    var userName = window.localStorage.userName
    var userToken = window.localStorage.userToken
    if (!userName || !userToken) {
        call({ path: '/login' })
    } else {
        call()
    }
}

const routes = [
    {
        path: '/index',
        component: index
    }, {
        path: '/',
        component: index
    }, {
        path: '/advertisementView',
        component: advertisementView
    }, {
        path: '/queryRegulations',
        component: queryRegulations
    }, {
        path: '/cart',
        component: cart,
        beforeEnter: (to, from, next) => {
            isLogin(next)
        }
    }, {
        path: '/Tmp',
        component: Tmp,
        beforeEnter: (to, from, next) => {
            isLogin(next)
        }
    }, {
        path: '/cartCompile',
        component: cartCompile,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/agreement',
        component: agreement,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/paySuccess',
        component: paySuccess,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/chargeSuccess',
        component: chargeSuccess,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/payFailed',
        component: payFailed,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/aboutUs',
        component: aboutUs,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/searchServe',
        component: searchServe,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/cartAccessories',
        component: cartAccessories,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/order',
        component: order,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/recharge',
        component: recharge,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/order/:id',
        component: orderDetail,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/orderConfirm',
        component: orderConfirm,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/user',
        component: user,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        name: 'position',
        path: '/position',
        component: cityView,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/message',
        component: message,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/message/:id',
        component: messageDetail,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/article/:id',
        component: article,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/register',
        component: register,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
       path: '/login',
       component: login,
       beforeEnter: (to, from, next) => {
        //    window.scroll(0,0)
            if (window.localStorage.userToken) {
                next({ path: '/index' })
            } else {
                next()
            }
       }
    }, {
       path: '/indexInspection',
       component: indexInspection,
       beforeEnter: (to, from, next) => {
        //    window.scroll(0,0)
           isLogin(next)
       }
    }, {
        path: '/indexInsurance',
        component: indexInsurance,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/findPassword',
        component: findPassword,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/selectPattern',
        component: selectPattern,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/selectSeries',
        component: selectSeries,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/plan',
        component: plan,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        }
    }, {
        path: '/insurance',
        component: insurance,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/roadHelp',
        component: roadHelp,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/serveStore',
        component: serveStore,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/serveIntroduce/:id',
        component: serveIntroduce,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/appointment',
        component: appointment,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/comment',
        component: comment,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/payment',
        component: payment,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/setInspection',
        component: setInspection,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/setInsurance',
        component: setInsurance,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/serveComm',
        component: serveComm,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            next()
        }
    }, {
        path: '/serve',
        component: serve,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        },
        children: [{
            path: '',
            component: serveIndex
        }, {
            path: 'index',
            component: serveIndex
        }, {
            path: 'fix',
            component: fix
        }, {
            path: 'hairdressing',
            component: hairdressing
        }, {
            path: 'sprinkle',
            component: sprinkle
        }, {
            path: 'tire',
            component: tire
        }]
    }, {
        path: '/user',
        component: user,
        beforeEnter: (to, from, next) => {
            // window.scroll(0,0)
            isLogin(next)
        },
        children: [{
            path: '',
            component: userIndex
        }, {
            path: 'index',
            component: userIndex
        }, {
            path: 'carList',
            component: carList
        }, {
            path: 'carList',
            component: carList
        }, {
            path: 'editCarInfo',
            component: editcarInfo
        }, {
            path: 'report',
            component: report
        }, {
            path: 'changeCurCar',
            component: changeCurCar
        }, {
            path: 'changeCurCarIndex',
            component: changeCurCarIndex
        }, {
            path: 'address',
            component: address
        }, {
            path: 'issure',
            component: issure
        }, {
            path: 'share',
            component: share
        }, {
            path: 'idea',
            component: idea
        }, {
            path: 'info',
            component: info
        }, {
            path: 'discount',
            component: discount
        }, {
            path: 'balance',
            component: balance
        }, {
            path: 'balanceDetail',
            component: balanceDetail
        }, {
            path: 'setting',
            component: setting
        }, {
            path: 'addAddress',
            component: addAddress
        }, {
            path: 'editAddress',
            component: editAddress
        }, {
            path: 'direction',
            component: direction
        }, {
            path: 'addCarInfo',
            component: addCarInfo
        }, {
            path: 'changePassword',
            component: changePassword
        }]
    }
]

export default {
    routes
}
