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
     /* 获取图片验证码 */
    getKaptchas: function (params) {
        return axios.get('/kaptchas')
    },
    /* 提交微信注册信息  */
    putUserss: function (params) {
        return axios.put('/users' + this.getParam(params))
    },
    /* 通用：验证验证码的对错 */
    postValidateImg: function (params) {
        return axios.post('/kaptchas',qs.stringify(params))
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
