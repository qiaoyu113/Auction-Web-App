import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import store from './vuex';
import './mixin/directive';
import './mixin/filter';

// 开启debug
Vue.config.debug = true
Vue.use(Vuex)
Vue.use(VueRouter)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'

Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)

const app = new Vue({
  router:router,
  render :h =>h(App),
  store : store
}).$mount('#app')