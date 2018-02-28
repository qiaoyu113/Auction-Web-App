/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'

export const commonService = {
    api: {},
    /* 个人中心 */
    getUser:function(params){
      return axios.get('/users' + this.getParam(params))
    },
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
    /*获取专场详情*/
    getAuctionMarkets:function(params){
        return axios.get('/auctionMarkets' + this.getParam(params))
    },
    /*获取专场下拍品列表*/
    getAuctionMarketsList:function(params,id){
        return axios.get('/auctionMarkets/'+ id + this.getParam(params))
    },
    /* 获取拍品详情 */
    getAuction: function (params,id) {
        return axios.get('/auctions/'+ id + this.getParam(params))
    },
    /* 获取拍品价格记录 */
    getAuctionPrice: function (params) {
        return axios.get('/auctions/offer' + this.getParam(params))
    },
    /*用户出价*/
    postMyPrice: function (params) {
        return axios.post('/auctions/offer',qs.stringify(params))
    },
    /*保证金相关操作*/
    postMyBail:function(){
        return axios.post('/bails/frozen',qs.stringify(params))
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
    /* 余额冻结 */
    setbails:function(params){
        return axios.post('/bails/frozen',qs.stringify(params))
    },
    /* 订单支付 */
    putOrders:function(params){
        return axios.put('/orders',qs.stringify(params))
    },
    /*  获取微信授权地址  */
    getWxpay:function(params,loginType,platform,jumpRouter,wxscope){
        return axios.get('/tokens/oauth' + this.getParam(params,loginType,platform,jumpRouter,wxscope))
    },
    /* 获取code */
    getWXbaseCode: function(params) {
        return axios.get('/tokens/wxbaseinfo' + this.getParam(params));
    },
    /* 收藏拍品的接口 */
    postCollect:function(params,id){
        return axios.post('/auctions/'+ id,qs.stringify(params))
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
