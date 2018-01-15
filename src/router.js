/**
 * Created by zhong on 2017/10/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'

Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)

// 定义组件
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

export default router