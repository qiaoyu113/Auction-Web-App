<template>
    <div id="auction" v-set-title="title">

    </div>
</template>

<script >
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
//    import item from "../../component/auction/item.vue"
//    import info from "../../component/auction/info.vue"
//    import record from "../../component/auction/record.vue"
//    import payment from '../../component/auction/payment.vue'
//    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '微信支付',
                checked:'',
            }
        },
        mounted: function() {
            let that = this;
            that.checked = window.localStorage.getItem('checked');
            let back = window.localStorage.getItem('back');
            if(back == 'no'){
                that.$router.replace({name:'special'})
                let route = window.localStorage.getItem('route')
                if(route == 'auction'){
                    that.$router.replace({name:'auctionMore',params:{id:id}})
                }
                if(route == 'recharge'){
                    that.$router.replace({name:'personalCenter'})
                }
                if(route == 'cash'){
                    that.$router.replace({name:'personalCenter'})
                }
            }
            if(that.checked){
                that.wxpay()
            }
        },
        methods: {
            //自动唤醒微信支付
            wxpay:function(){
                let that = this;
                let extra = window.localStorage.getItem('extra');
                let orderNo = window.localStorage.getItem('orderNo');
                console.log(orderNo)
                commonService.putOrders({orderNo:orderNo,channelId:'WX_JSAPI',extra:extra,}).then(function (res) {
                    console.log(res)
                    if(res.data.success){
                        let temp=res.data.datas.payParam;
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: temp.appId, // 必填，公众号的唯一标识
                            timestamp: temp.timeStamp+'', // 必填，生成签名的时间戳
                            nonceStr: temp.nonceStr, // 必填，生成签名的随机串
                            signature: temp.paySign, // 必填，签名，见附录1
                            jsApiList: [
                                'chooseWXPay'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })

                        wx.ready(function(){
                            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                            wx.chooseWXPay({
                                timestamp: temp.timeStamp+'', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                nonceStr: temp.nonceStr, // 支付签名随机串，不长于 32 位
                                package: temp.wxPackage, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                                signType:"MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                paySign:temp.paySign, // 支付签名
                                success: function (res) {
                                    // 支付成功后的回调函数
                                    //分别跳转的路径
                                    //1.知识。2.活动。3.会员。4.商品。5.直播
                                    window.localStorage.removeItem('checked')
                                    window.localStorage.setItem('payOk','1')
                                    let route = window.localStorage.getItem('route')
                                    if(route == 'auction'){
                                        let id = window.localStorage.getItem('id');
                                        that.$router.replace({name:'auctionMore',params:{id:id}})
                                    }
                                    if(route == 'recharge'){
                                        that.$router.replace({name:'personalCenter'})
                                    }
                                     if(route == 'cash'){
                                        that.$router.replace({name:'personalCenter'})
                                    }
                                },
                                cancel:function(){
                                    window.localStorage.removeItem('checked');
                                    window.localStorage.setItem('payOk','2')
                                    let route = window.localStorage.getItem('route')
                                    if(route == 'auction'){
                                        let id = window.localStorage.getItem('id');
                                        that.$router.replace({name:'auctionMore',params:{id:id}})
                                    }
                                    if(route == 'recharge'){
                                        that.$router.replace({name:'personalCenter'})
                                    }
                                    if(route == 'cash'){
                                        that.$router.replace({name:'personalCenter'})
                                    }
                                }
                            });
                        });

                        wx.error(function(res){
//                            alert('订单错误')
                            window.localStorage.removeItem('checked')
                            window.localStorage.setItem('payOk','2')
                            that.checked = false
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                    }else{
//                        alert('订单错误');
                        window.localStorage.removeItem('checked')
                        window.localStorage.setItem('payOk','2')
                        that.checked = false
                    }
                })
            }
        }
    }
</script>

<style lang="less">

</style>