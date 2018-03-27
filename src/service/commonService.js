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
     /* 检验token */
    getCheck:function(params){
      return axios.get('/tokens/check')
    },

    /* 获取专题列表 */
    getauctionPack: function (params) {
        return axios.get('/auctionPackages' + this.getParam(params))
    },
    /* 获取专题详情 */
    getauctionPackId: function (params,id) {
        return axios.get('/auctionPackages/'+ id + this.getParam(params))
    },
     /* 获取图片验证码 */
    getKaptchas: function (params) {
        return axios.get('/kaptchas')
    },
    /* 通用：验证验证码的对错 */
    postValidateImg: function (params) {
        return axios.post('/kaptchas',qs.stringify(params))
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
    /* 获取拍品详情 */
    getAuctions: function (id) {
        return axios.get('/auctions/'+ id)
    },
     /* 提交订单 */
    postOrders: function (id,params) {
        return axios.post('/auctions/'+ id +'/orders' + this.getParam(params))
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
        return axios.get('/users/info')
    },
    /* 设置用户信息 */
    postUsersinfo: function (params) {
        return axios.post('/users/info' + this.getParam(params))
    },
    /* 修改密码 */
    putPasswords: function (params) {
        return axios.put('/passwords/password',qs.stringify(params))
    },
    /* 获取短信信息 */
    getSms: function (params) {
        return axios.get('/sms' + this.getParam(params))
    },
     /* 获取旧手机短信验证发信息 */
    getSendMessage: function (params) {
        return axios.get('/user/oldPhone/sendMessage' + this.getParam(params))
    },
    /* 获取新手机短信验证发信息 */
    getNewPhone: function (params) {
        return axios.get('/user/newPhone/sendMessage' + this.getParam(params))
    },
     /* 获取旧手机短信验证 */
    getCheckCode: function (params) {
        return axios.get('/user/oldPhone/checkCode' + this.getParam(params))
    },
    /* 更新手机号 */
    putPhoneset: function (params) {
        return axios.put('/user/phone/set' + this.getParam(params))
    },
    /* 获取浏览记录 */
    getFootPrint: function (params) {
        return axios.get('/users/footPrint' + this.getParam(params))
    },
    /* 初始化 */
    getGaptchas: function () {
        return axios.get('/gaptchas')
    },
     /* 保证金 */
    getBails: function (params) {
        return axios.get('/bails' + this.getParam(params))
    },
    // 提交线上单独
    // putOrders: function (params) {
    //     return axios.put('/orders',this.getParam(params))
    // },
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
    /* 获取 */
    getWXinfo: function(params) {
        return axios.get('/tokens/wxinfo' + this.getParam(params));
    },
     /* 提交微信注册信息  */
    putUserss: function (params) {
        return axios.put('/users' + this.getParam(params))
    },
    /* 收藏拍品的接口 */
    postCollect:function(params,id){
        return axios.post('/auctions/'+ id,qs.stringify(params))
    },
    /* 查看是否收藏 */
    getOrderCollect:function(params,id){
        return axios.get('/auctions/'+ id +'/collect' + this.getParam(params));
    },
    /* 退出登录  */
    deleteTokens: function () {
        return axios.delete('/tokens')
    },
     /* 绑定微信  */
    postWxbind: function (params) {
        return axios.post('/tokens/wxbind' + this.getParam(params))
    },




     /* 获取地址列表  */
    getAddress: function (params) {
        return axios.get('/users/address' + this.getParam(params))
    },
     /* 获取我的默认地址  */
    getDefault: function () {
        return axios.get('/users/address/default')
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
        return axios.post('/users/address/' + id + this.getParam(params))
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
    /* 图片  */
    postBase: function (params) {
        return axios.post('/files/base64' + this.getParam(params))
    },
    /* 获取实名认证信息  */
    getAuths: function () {
        return axios.get('/users/auths')
    },
    /* 提交实名认证信息  */
    putAuths: function (params) {
        return axios.put('/users/auths' + this.getParam(params))
    },
    /* 获取我的订单  */
    getOrder: function (params) {
        return axios.get('/users/order' + this.getParam(params))
    },
    /* 获取我的订单详情  */
    getOrderid: function (params) {
        return axios.get('/orders/' + params)
    },
    putOrderid: function (id) {
        return axios.put('/orders/'+ id + '/cancel')
    },
      /* 获取售后列表单  */
    getOrdercs: function (params) {
        return axios.get('/ordercs' + this.getParam(params))
    },
     /* 获取售后详情  */
    getOrdercsid: function (id) {
        return axios.get('/ordercs/' + id)
    },
     /* 获取我的订单详情快递  */
    getKaidi: function (params) {
        return axios.get('/kuaidi' + this.getParam(params))
    },
     /* 获取我的收藏  */
    getCollect: function (params) {
        return axios.get('/auctions/collects' + this.getParam(params))
    },
    /* 获取是否提交订单  */
    getCheckOrder: function (params) {
        return axios.get('/auctions/checkOrder' + this.getParam(params))
    },
    /* 增加浏览记录 */
    postFootPrint: function (params) {
        return axios.post('/users/footPrint',qs.stringify(params))
    },
    /* 插入统计数据 */
    putInsertion:function (params) {
        return axios.put('/statistics',qs.stringify(params))
    },
    /* 是否缴纳保证金 */
    getHasCheck:function(params){
        return axios.get('/auctions/check' + this.getParam(params))
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
