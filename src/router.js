/**
 * Created by zhong on 2017/10/24.
 *
 * (resolve) =>{require(['../components/test.vue'],resolve)}
 *
 */
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'
import zfooter from './component/common/footer.vue'
import zhistory from './component/common/goback.vue'
import backhome from './component/common/back-home.vue'
import nav from './component/common/nav.vue'
import iconstate from './component/common/iconState.vue'

Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)
Vue.component('z-footer', zfooter)
Vue.component('z-history', zhistory)
Vue.component('z-home', backhome)
Vue.component('z-nav',nav)
Vue.component('z-icon',iconstate)


// 定义组件
const short = (resolve) => {require(['./pages/short.vue'],resolve)}
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
const registerweixin = (resolve) => {require(['./component/login/registerweixin.vue'],resolve)}
const service = (resolve) => {require(['./pages/service/service.vue'],resolve)}
const special = (resolve) => {require(['./pages/special/special.vue'],resolve)}
const specialinfo = (resolve) => {require(['./pages/special/specialinfo.vue'],resolve)}
const specialView = (resolve) => {require(['./pages/special/specialView.vue'],resolve)}
const specialDetails = (resolve) => {require(['./pages/special/specialDetails.vue'],resolve)}

const auction = (resolve) => {require(['./pages/auction/auction.vue'],resolve)}
const none = (resolve) => {require(['./pages/auction/none.vue'],resolve)}
const auctionView = (resolve) => {require(['./pages/auction/auctionView.vue'],resolve)}
const wxbaselogin = (resolve) => {require(['./pages/auction/wxbaselogin.vue'],resolve)}
const wxlogin = (resolve) => {require(['./pages/auction/wxlogin.vue'],resolve)}
const wxPay = (resolve) => {require(['./pages/wxPay/wxPay.vue'],resolve)}
const aliPay = (resolve) => {require(['./pages/wxPay/aliPay.vue'],resolve)}
// 直播
const live = (resolve) => {require(['./pages/live/index.vue'],resolve)}
const liveDetails = (resolve) => {require(['./pages/live/details.vue'],resolve)}
//地址
const address = (resolve) => {require(['./pages/address/new-address.vue'],resolve)}
const addresslist = (resolve) => {require(['./pages/address/addresslist.vue'],resolve)}
// 我的
const my = (resolve) => {require(['./pages/my/my.vue'],resolve)}
const lot = (resolve) => {require(['./pages/my/lot.vue'],resolve)}
const not = (resolve) => {require(['./pages/my/not.vue'],resolve)}
const already = (resolve) => {require(['./pages/my/already.vue'],resolve)}
const notstart = (resolve) => {require(['./pages/my/notstart.vue'],resolve)}
// 确认订单
const order = (resolve) => {require(['./pages/my/order.vue'],resolve)}
const selection = (resolve) => {require(['./pages/my/selection.vue'],resolve)}
//个人中心
const mycenter = (resolve) => {require(['./pages/mycenter/mycenter.vue'],resolve)}
const saveName = (resolve) => {require(['./pages/mycenter/saveName.vue'],resolve)}
const savePhone = (resolve) => {require(['./pages/mycenter/savePhone.vue'],resolve)}
const password = (resolve) => {require(['./pages/mycenter/password.vue'],resolve)}
const newPhone = (resolve) => {require(['./pages/mycenter/newPhone.vue'],resolve)}
// 个人中心chenhaojn

const gologin = (resolve) => {require(['./pages/personal/gologin.vue'],resolve)}
const personalCenter = (resolve) => {require(['./pages/personal/personalCenter.vue'],resolve)}
const myorder = (resolve) => {require(['./pages/personal/myorder-center.vue'],resolve)}
const myaccount = (resolve) => {require(['./pages/personal/myAccount.vue'],resolve)}
const helpcenter = (resolve) => {require(['./pages/personal/helpcenter.vue'],resolve)}
const membercenter = (resolve) => {require(['./pages/personal/membercenter.vue'],resolve)}
const realname = (resolve) => {require(['./pages/personal/realname.vue'],resolve)}
const cash = (resolve) => {require(['./pages/personal/cash.vue'],resolve)}
const cashstep = (resolve) => {require(['./pages/personal/cashstep.vue'],resolve)}
const recharge = (resolve) => {require(['./pages/personal/recharge.vue'],resolve)}
const rechargeList = (resolve) => {require(['./pages/personal/rechargeList.vue'],resolve)}
//订单详情
const normalorder = (resolve) => {require(['./pages/orderDetails/normal-order.vue'],resolve)}
const closeorder = (resolve) => {require(['./pages/orderDetails/close-order.vue'],resolve)}
const afterorder = (resolve) => {require(['./pages/orderDetails/aftersale-order.vue'],resolve)}
const shipping = (resolve) => {require(['./pages/orderDetails/shipping.vue'],resolve)}
const rules = (resolve) => {require(['./pages/orderDetails/rules.vue'],resolve)}

//登陆页
const login = (resolve) => {require(['./pages/login/login.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {name: 'home',path:'/',component: home, meta: {keepAlive: false}},
    {name: 'home',path:'/packages',component: home, meta: {keepAlive: false}},
    {name: 'login',path:'/login',component:login},
    {name: 'registerweixin',path:'/register',component:registerweixin},
    {name: 'service',path:'/service',component:service},
    {name: 'special',path:'/markets',component:special},
    {name: 'specialinfo',path:'/packages/',component:specialinfo,
        children:[
            {name:'specialinfoMore',path:':id',component:specialinfo},
        ]
    },
    {name: 'specialView',path:'/specialView',component:specialView},
    {name: 'none',path:'/none',component:none},
    {name: 'specialDetails',path:'/markets/',component:specialDetails,
        children:[
            {name:'specialMore',path:':id',component:specialDetails},
        ]
    },
    {name: 'auction',path:'/auctions/',component:auction,
        children:[
            {name:'auctionMore',path:':id',component:auction},
        ]
    },
    {name: 'auctionView',path:'/auctionView',component:auctionView,
        children:[
            {name:'auctionView',path:'acMore/:id',component:auctionView},
        ]
    },
    {name: 'personalCenter',path:'/personal/personalCenter/',component:personalCenter},

    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 直播
    {name: 'live',path:'/lives',component: live},
    {name: 'liveDetails',path:'/lives/details/:liveDetailId',component: liveDetails},
    //登陆
    {name: 'signup',path:'/signup',component: login},
    //地址
    {name: 'address',path:'/address',component:address},        //新建地址
    {name: 'addresslist',path:'/addresslist',component:addresslist}, //地址列表
    // 我的
    {name: 'my',path:'/my',component: my,redirect:'/my/notstart',
            children:[
               {name: 'notstart',path:'/my/notstart',component: notstart},
               {name: 'lot',path:'/my/lot',component: lot},
               {name: 'not',path:'/my/not',component: not},
               {name: 'already',path:'/my/already',component: already},
               ]
       },
    // 确认订单
    {name: 'order',path:'/my/order',component: order},            //确认订单
    {name: 'selection',path:'/my/selection',component: selection},  //确认订单地址
    //个人中心
    {name: 'mycenter',path:'/mycenter',component: mycenter},    //个人设置
    {name: 'saveName',path:'/saveName',component: saveName},
    {name: 'savePhone',path:'/savePhone',component: savePhone},
    {name: 'password',path:'/password',component: password},
    {name: 'newPhone',path:'/newPhone',component: newPhone},
    // 个人中心chenhaojn
    {name: 'gologin',path:'/gologin',component:gologin},
    {name: 'personalCenter',path:'/personalCenter',component:personalCenter},  //个人中心
    {name: 'myorder',path:'/myorder',component:myorder},            //我的订单
    {name: 'myaccount',path:'/myaccount',component:myaccount},            //保证金首页
    {name: 'helpcenter',path:'/helpcenter',component:helpcenter},        //保证金说明
    {name: 'membercenter',path:'/membercenter',component:membercenter}, //会员
    {name: 'realname',path:'/realname',component:realname},             //实名认证
     {name: 'cash',path:'/cash',component:cash},                        //保证金提现
    {name: 'cashstep',path:'/cashstep',component:cashstep},
    {name: 'recharge',path:'/recharge',component:recharge},             //保证金充值
    {name: 'rechargeList',path:'/rechargeList',component:rechargeList},
    //订单详情
    {name: 'normalorder',path:'/normalorder',component:normalorder},//订单正常
    {name: 'closeorder',path:'/closeorder',component:closeorder},//订单关闭
    {name: 'afterorder',path:'/afterorder',component:afterorder},//订单售后
    {name: 'shipping',path:'/shipping',component:shipping},//物流信息
    {name: 'rules',path:'/rules',component:rules},//到账周期说明

    {name:'wxbaselogin',path:'/wxbaselogin',component: wxbaselogin}, // 微信跳转页
    {name:'wxPay',path:'/wxpay/',component: wxPay}, // 微信支付页
    {name:'aliPay',path:'/payOk',component: aliPay}, // 支付宝支付成功页
    {name:'wxlogin',path:'/wxlogin',component: wxlogin}, //微信登录跳转
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

/*let isClient = typeof window != 'undefined' ? true : false
router.beforeEach((to, from, next) => {

    next()
})
router.afterEach((to, from, next) => {

});*/

export default router