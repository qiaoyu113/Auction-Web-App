/**
 * Created by LXH on 2017/11/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import homeStore from './modules/homeStore'

const store = new Vuex.Store({
    // 定义状态
    state: {
        // picHead:'http://resource.dimanche.net.cn/', //正式
        picHead:'http://resource.qizhigo.com/', // ceshi
        indexLogo:'',
        indexName:'',
        fromPath:['home'],
        height:{}
    },
    mutations:{
    },
    actions: {
    },
    modules: {
        homeStore: homeStore,
    }
})
export default store