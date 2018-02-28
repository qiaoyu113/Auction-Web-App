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
const specialDetails = (resolve) => {require(['./pages/special/specialDetails.vue'],resolve)}

const auction = (resolve) => {require(['./pages/auction/auction.vue'],resolve)}
const wxbaselogin = (resolve) => {require(['./pages/auction/wxbaselogin.vue'],resolve)}
// 直播
const live = (resolve) => {require(['./pages/live/index.vue'],resolve)}
const liveDetails = (resolve) => {require(['./pages/live/details.vue'],resolve)}
//个人中心
const mycenter = (resolve) => {require(['./pages/mycenter/mycenter.vue'],resolve)}
const saveName = (resolve) => {require(['./pages/mycenter/saveName.vue'],resolve)}
const savePhone = (resolve) => {require(['./pages/mycenter/savePhone.vue'],resolve)}
const password = (resolve) => {require(['./pages/mycenter/password.vue'],resolve)}
const newPhone = (resolve) => {require(['./pages/mycenter/newPhone.vue'],resolve)}
// 个人中心chenhaojn
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
    {path: '/d/:shortId', component: short},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    {name: 'login',path:'/login',component:login},
    {name: 'registerweixin',path:'/register',component:registerweixin},
    {name: 'service',path:'/service',component:service},
    {name: 'special',path:'/special',component:special},
    {name: 'specialinfo',path:'/specialinfo',component:specialinfo},
    {name: 'specialDetails',path:'/specialDetails',component:specialDetails,
        children:[
            {name:'specialMore',path:'more/:id',component:auction},
        ]
    },
    {name: 'auction',path:'/auction',component:auction,
        children:[
            {name:'auctionMore',path:'more/:id',component:auction},
        ]
    },

    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 直播
    {name: 'live',path:'/lives',component: live},
    {name: 'liveDetails',path:'/lives/details/:liveDetailId',component: liveDetails},
    //登陆
    {name: 'signup',path:'/signup',component: login},
    //个人中心
    {name: 'mycenter',path:'/mycenter',component: mycenter},
    {name: 'saveName',path:'/saveName',component: saveName},
    {name: 'savePhone',path:'/savePhone',component: savePhone},
    {name: 'password',path:'/password',component: password},
    {name: 'newPhone',path:'/newPhone',component: newPhone},
    // 个人中心chenhaojn
    {name: 'personalCenter',path:'/personal/personalCenter/',component:personalCenter},
    {name: 'myorder',path:'/myorder',component:myorder},
    {name: 'myaccount',path:'/myaccount',component:myaccount},
    {name: 'helpcenter',path:'/helpcenter',component:helpcenter},
    {name: 'membercenter',path:'/membercenter',component:membercenter},
    {name: 'realname',path:'/realname',component:realname},
     {name: 'cash',path:'/cash',component:cash},
    {name: 'cashstep',path:'/cashstep',component:cashstep},
    {name: 'recharge',path:'/recharge',component:recharge},
    {name: 'rechargeList',path:'/rechargeList',component:rechargeList},
    //订单详情
    {name: 'normalorder',path:'/normalorder',component:normalorder},//订单正常
    {name: 'closeorder',path:'/closeorder',component:closeorder},//订单关闭
    {name: 'afterorder',path:'/afterorder',component:afterorder},//订单售后
    {name: 'shipping',path:'/shipping',component:shipping},//物流信息
    {name: 'rules',path:'/rules',component:rules},//到账周期说明

    {name:'wxbaselogin',path:'/wxbaselogin',component: wxbaselogin}, // 微信跳转页
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