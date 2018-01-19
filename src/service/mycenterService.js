/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

export const commonService = {
    api: {},
    /* 获取验证码 */
    getQR: function (params) {
        return axios.get('/sms' + this.getParam(params))
    },
    /* 登陆 */
    goLogin: function (params) {
        return axios.post('/tokens/password' + this.getParam(params))
    },
    /* 注册 */
    goSignup: function (params) {
        return axios.post('/users',qs.stringify(params))
    },
    /*  获取微信授权地址  */
    getWxpay:function(params,loginType,platform,jumpRouter,wxscope){
        return axios.get('/tokens/oauth' + this.getParam(params,loginType,platform,jumpRouter,wxscope))
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    },
}
export default {commonService}
