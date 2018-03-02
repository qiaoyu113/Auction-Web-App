/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

export const commonService = {
    api: {},
    /* 获取专题列表 */
    getauctionPack: function (params) {
        return axios.get('/auctionPackages' + this.getParam(params))
    },
    /* 获取专题详情 */
    getauctionPackId: function (params,id) {
        return axios.get('/auctionPackages/'+ id + this.getParam(params))
    },
    /* 获取专题|专场拍品列表 */
    getAuctionList: function (params) {
        return axios.get('/auctions' + this.getParam(params))
    },
    /* 获取拍品详情 */
    getAuction: function (params,id) {
        return axios.get('/auctions/'+ id + this.getParam(params))
    },

    postGaptchas: function (params) {
        return axios.post('/gaptchas',qs.stringify(params))
    },
    /* 组创建 */
    setGroups:function(params){
        return axios.put('/admin/auctionGroups',qs.stringify(params))
    },
    /*删除拍品*/
    deleteAuctions(params,id){
        return axios.delete('/admin/auctions/'+ id ,qs.stringify(params))
    },
    /* 获取用户信息 */
    getUsers: function () {
        return axios.get('/users')
    },
    /* 设置用户信息 */
    postUsersinfo: function (params) {
        return axios.post('/users/info' + this.getParam(params))
    },
    /* 修改密码 */
    putPasswords: function (params) {
        return axios.put('/passwords/password',qs.stringify(params))
    },
    /* 获取用户信息 */
    getSms: function (params) {
        return axios.get('/sms' + this.getParam(params))
    },
    /* 初始化 */
    getGaptchas: function () {
        return axios.get('/gaptchas')
    },
     /* 保证金 */
    getBails: function (params) {
        return axios.get('/bails' + this.getParam(params))
    },
    putOrders: function (params) {
        return axios.put('/orders',this.getParam(params))
    },
     /* 获取订单号  */
    postBails: function (params) {
        return axios.post('/bails' + this.getParam(params))
    },
     /* 获取手机验证码 */
    getFormssms: function (params) {
        return axios.get('/forms/sms' + this.getParam(params))
    },
    /* 申请单提交  */
    postForms: function (params) {
        return axios.post('/forms' + this.getParam(params))
    },
    /* 申请单提交  */
    getForms: function (params) {
        return axios.get('/forms/' + params)
    },
     /* 获取银行卡列表  */
    getBankCards: function () {
        return axios.get('/bankCards')
    },
     /* 获取地址列表  */
    getAddress: function (params) {
        return axios.get('/users/address' + this.getParam(params))
    },
     /* 获取详情地址  */
    getAddressid: function (id) {
        return axios.get('/users/address/' + id)
    },
    /* 获取省  */
    getCitys: function (params) {
        return axios.get('/citys')
    },
     /* 获取市  */
    getCitysId: function (params) {
        return axios.get('/citys/'+ params)
    },
     /* 新增地址  */
    postAddress: function (params) {
        return axios.post('/users/address' + this.getParam(params))
    },
    /* 删除地址  */
    deleteAddress: function (params) {
        return axios.delete('/users/address/' + params)
    },
     /* 设置默认地址  */
    postAddressid: function (id,params) {
        return axios.post('/users/address/' + id + this.getParam(params) )
    },
    /* 获取会员等级积分  */
    getVip: function (params) {
        return axios.get('/users/vip/' + params)
    },
     /* 获取会员等级积分  */
    getPoint: function (params) {
        return axios.get('/users/point' + this.getParam(params))
    },
    /* 获取会员规则  */
    getDoctype: function (params) {
        return axios.get('/doc/type' + this.getParam(params))
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
