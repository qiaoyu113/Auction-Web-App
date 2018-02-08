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
const login = (resolve) => {require(['./pages/login/login.vue'],resolve)}
const mine = (resolve) => {require(['./pages/mine/mine.vue'],resolve)}
//订单详情
const normalorder = (resolve) => {require(['./pages/orderDetails/normal-order.vue'],resolve)}
const closeorder = (resolve) => {require(['./pages/orderDetails/close-order.vue'],resolve)}
const afterorder = (resolve) => {require(['./pages/orderDetails/aftersale-order.vue'],resolve)}
const shipping = (resolve) => {require(['./pages/orderDetails/shipping.vue'],resolve)}
const rules = (resolve) => {require(['./pages/orderDetails/rules.vue'],resolve)}
//拍品详情
const auction = (resolve) => {require(['./pages/auction/auction.vue'],resolve)}
//地址
const address = (resolve) => {require(['./pages/address/new-address.vue'],resolve)}
const addresslist = (resolve) => {require(['./pages/address/addresslist.vue'],resolve)}
//个人中心
const personalCenter = (resolve) => {require(['./pages/personal/personalCenter.vue'],resolve)}
const myorder = (resolve) => {require(['./pages/personal/myorder-center.vue'],resolve)}
const myaccount = (resolve) => {require(['./pages/personal/myAccount.vue'],resolve)}
const helpcenter = (resolve) => {require(['./pages/personal/helpcenter.vue'],resolve)}
const membercenter = (resolve) => {require(['./pages/personal/membercenter.vue'],resolve)}
const realname = (resolve) => {require(['./pages/personal/realname.vue'],resolve)}

const registerweixin = (resolve) => {require(['./pages/login/registerweixin.vue'],resolve)}
const service = (resolve) => {require(['./pages/service/service.vue'],resolve)}
const special = (resolve) => {require(['./pages/special/special.vue'],resolve)}
const specialinfo = (resolve) => {require(['./pages/special/specialinfo.vue'],resolve)}
const specialDetails = (resolve) => {require(['./pages/special/specialDetails.vue'],resolve)}


// 直播
const live = (resolve) => {require(['./pages/live/index.vue'],resolve)}
const liveDetails = (resolve) => {require(['./pages/live/details.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {path: '/d/:shortId', component: short},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    
    {name: 'mine',path:'/mine',component:mine},
//订单详情
    {name: 'normalorder',path:'/normalorder',component:normalorder},//订单正常
    {name: 'closeorder',path:'/closeorder',component:closeorder},//订单关闭
    {name: 'afterorder',path:'/afterorder',component:afterorder},//订单售后
    {name: 'shipping',path:'/shipping',component:shipping},//物流信息
    {name: 'rules',path:'/rules',component:rules},//到账周期说明
//拍品详情
    {name: 'auction',path:'/auction',component:auction},
//地址
    {name: 'address',path:'/address',component:address},
    {name: 'addresslist',path:'/addresslist',component:addresslist},
//登录注册
    {name: 'login',path:'/login',component:login},
    {name: 'registerweixin',path:'/register',component:registerweixin},
//个人中心
    {name: 'personalCenter',path:'/personal/personalCenter/',component:personalCenter},
    {name: 'myorder',path:'/myorder',component:myorder},
    {name: 'myaccount',path:'/myaccount',component:myaccount},
    {name: 'helpcenter',path:'/helpcenter',component:helpcenter},
    {name: 'membercenter',path:'/membercenter',component:membercenter},
    {name: 'realname',path:'/realname',component:realname},

    {name: 'service',path:'/service',component:service},//客服

    {name: 'special',path:'/special',component:special},//专题
    {name: 'specialinfo',path:'/specialinfo',component:specialinfo},//专题详情
    {name: 'specialDetails',path:'/specialDetails/',component:specialDetails},//排场详情-拍品列表

   
    
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 直播
    {name: 'live',path:'/lives',component: live},
    {name: 'liveDetails',path:'/lives/details/:liveDetailId',component: liveDetails}
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