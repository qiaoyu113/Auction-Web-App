<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 保证金提现 -->
    <div class="recharge" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>PAYMENT</div>
                <!-- <div class="loginCn" v-if="money==''">充值</div> -->
                <div class="loginCn">充值</div>
            </div>
            <div class="fr" @click='Return()'>
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <div class="box">
            <div class="info clearfix"><span v-if="money==''" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">金额</span>
               <span v-if="money!=''">金额</span>
               <span class="span" v-if="money!=''">CNY</span>
               <input type="number" placeholder="请输入金额" v-model="money"/>
               
            </div>
            <div class="canshoot">
            	<!-- <p v-if="money==''">可拍金额<span>0CNY</span></p> -->
            	<p>保证金不可用于支付尾款</p>
            </div>
            <div class="bor"></div>
           <!--  <div class="money clearfix" v-if="money==''">
                <div class="fl">
                    <p>充值<span>1.000CNY</span>可拍<span>10.000CNY</span>的拍品</p>
                    <p>保证金不可用于支付尾款</p>
                </div>
            </div> -->
            <div class="pay" @click="getIndex(3)">
                <div :class="show== true ? 'check' : 'check1'" @click="shows()"><i class="iconfont icon-duihao"></i></div>
                <!-- <i :class="index==3 ? 'background3' : ''" class="iconfont icon-icon_zhifubao"></i> -->
                <div class="infoAlipay">
                        <div class="span1" style="margin-top:2px;">我同意并理解
                        <a href="javaScript:;" @click="Helpcenter(2)">《竞拍协议》</a>和
                        <a href="javaScript:;" @click="Helpcenter(3)">《竞拍规则》</a></div>
                    </div>
            </div>
            <div class="info"><span>充值方式</span></div>
            <div class="bor"></div>
            <div class="pay" @click="getIndex(1)" v-if="wxLogin==true">
                <div :class="index==1 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                    <!-- <i :class="index==1 ? 'background1' : ''" class="iconfont icon-icon_weixinzhifu"></i> -->
                    <img class="v_img" v-if="index==1" src="../../assets/image/mycenter/wxzf.png" />
                <img class="v_img" v-if="index!=1" src="../../assets/image/mycenter/wxzf2.png" />
                    <div class="infoAlipay">微信支付</div>
            </div>
            <div class="pay" @click="getIndex(2)" v-if="wxLogin==false">
                <div :class="index==2 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <!-- <i :class="index==2 ? 'background2' : ''" class="iconfont icon-icon_zhifubao"></i> -->
                 <img class="v_img" v-if="index==2" src="../../assets/image/mycenter/zfb.png" />
                <img class="v_img" v-if="index!=2" src="../../assets/image/mycenter/zfb2.png" />
                <div class="infoAlipay">支付宝支付</div>
            </div>
            <div class="pay" @click="getIndex(3)">
                <div :class="index==3 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <!-- <i :class="index==3 ? 'background3' : ''" class="iconfont icon-icon_zhifubao"></i> -->
                 <img class="v_img" v-if="index==3" src="../../assets/image/mycenter/xxzf.png" />
                <img class="v_img" v-if="index!=3" src="../../assets/image/mycenter/xxzf2.png" />
                <div class="infoAlipay">转账汇款</div>
            </div>
        </div>
        <div class="prompt" v-if="prompt!=''">{{prompt}}</div>
        <div class="footer1" @click="postBails()">立即充值</div>
        <div class="payOK"></div>
    </div>
</template>

<script >

    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '传家',
                index:3,
                money:"",
                wallet:'',
                checked:false,
                show:true,
                prompt:'',
                wxLogin:true,
            }
        },
        components:{},
        
        syncData({store}) {
            const that = this;
            return Promise.all([
                appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
                }),
                service.getParam().then(res=>{
//                    store.state.homeStore.noticelist = res.data.datas;
                }),
            ])
        },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
            window.localStorage.setItem('back','no')
            common.onMove('.recharge')
            this.wxshow()
        	this.getUsers()
            this.checked = window.localStorage.getItem('checked');
            if(this.checked){
                // this.wxpay()
            }
        },
        methods: {
            // 首次加载判断在什么浏览器下打开
             wxshow:function(){
                 let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
//                    这里是微信浏览器
                this.wxLogin = true;
                this.index=1
            } else {
//                    这里不是微信浏览器
                this.wxLogin = false;
                this.index=2
            }
             },
             Helpcenter:function(id){
                this.$router.push({path:"/helpcenter",query:{index:id}})
             },
            Return:function(){
                window.history.go(-1)
            },
            shows:function(){
                if(this.show == false){
                   this.prompt=''
                   this.show=true
                }else{
                     this.show=false
                }
            },
             getIndex: function(index) {
                let that = this;
                if(index==1){
                    that.index=1
                }else if(index==2){
                    that.index=2
                }else{
                    that.index=3;
                }
            },
            // 获取金额信息
             getUsers:function(){
                let that = this;
               commonService.getUsers().then(function(res){
                    that.wallet=res.data.datas.user.wallet
              })
            },
            // full:function(){
            // 	  let that = this;
            // 	  that.money=that.wallet.availableMoney 
            // },
            // cny:function(){
            //     let that = this;
            //      if(that.money>that.wallet.availableMoney){
            //          that.money=that.wallet.availableMoney 
            //      }
            // },
             // 获取订单号
            postBails:function(){
                let that = this;
                let channelIds = '';
                 if(that.index === 1){//微信
                    channelIds = 'WX_JSAPI'
                }else if(that.index === 2){//支付宝
                    channelIds = 'ALIPAY_WAP'
                }
                if(that.show==false){
                    that.prompt="请同意协议"
                    return false
                }
                let money=that.money * 100
               commonService.postBails({amount:money}).then(function(res){
                    // that.wallet=res.data.datas.user.wallet
                    if(res.data.code!=200){
                        that.prompt=res.data.message
                        return false
                    }
                    if(that.index==3){
                     that.$router.push({path:"/rechargeList",query:{money:that.money,index:that.index,orderNo:res.data.datas,type:1}})   	
                    }
                    if(that.index == 1){//微信支付
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                                if(res.data.success){
                                    commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxbaselogin',wxscope:'snsapi_base'}).then(function(res){
                                        if(res.data.code === 200){
                                            window.localStorage.setItem('route','recharge');
                                            //获取静默授权地址成功 
                                            window.location.href = res.data.datas;
                                            window.localStorage.removeItem('back');
                                        }
                                    })
                                }
                            })
                        }
                       if(that.index==2) {//支付宝
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                                if(res.data.success){
                       
                                    let payOK = document.getElementsByClassName("payOK");
                                    payOK[0].innerHTML = res.data.datas.payUrl;
                                    document.punchout_form.submit()
                                }
                            })
                        }

                   
              })
            },
               //自动唤醒微信支付
            wxpay:function(){
                let that = this;
                let extra = window.localStorage.getItem('extra');
                let orderNo = window.localStorage.getItem('orderNo');
                commonService.putOrders({orderNo:orderNo,channelId:'WX_JSAPI',extra:extra,}).then(function (res) {
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
                                    alert('支付成功');
                                    window.localStorage.removeItem('checked')
                                    that.checked = false
                                },
                                cancel:function(){
                                    window.localStorage.removeItem('checked');
                                    alert('支付失败');
                                    that.checked = false
                                }
                            });
                        });

                        wx.error(function(res){
//                            alert('订单错误')
                            window.localStorage.removeItem('checked')
                            alert('支付失败');
                            that.checked = false
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        });
                    }else{
//                        alert('订单错误');
                        window.localStorage.removeItem('checked')
                        alert('支付失败');
                        that.checked = false
                    }
                })
            },
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .recharge{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
    // .header{
    //     position: fixed;
    //     top: 0;
    //     z-index: 100;
    //     width: 10rem;
    //     height: @size45;
    //     background:rgba(2, 10, 2, 1);
    //     font-size: @size20;
    //     color: white;
    //     text-align: center;
    //     line-height: @size45;
    // }
    .content{
        // margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid #353535;
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: bold;
                font-size:20px;
            }
            .loginCn{
                font-size: 15px;
            }
            
        }
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
            img{
                width: 1rem;
                margin-top: 1rem;
            }
        }
    }
    .box{
        padding: 0 @size10;
        box-sizing: border-box;
        .bor{
            border-bottom: 1px solid #87828c;
            margin-left: @size10;
        }
        .info{
            width: 100%;
            height: @size40;
            text-align: left;
            span{
                width: 2rem;
                line-height: 1rem;
                float: left;
                font-size: @size12;
                padding-top: @size1;
                padding-left: @size10;
            }
            input{
                width: 2rem;
                height: 1rem;
                float: right;
                border: none;
                outline: none;
                font-size: @size12;
                color: red;
                // font-weight: bold;
                text-align: right;
                // padding-right: @size3;
            }
            p{
            	font-size: @size12;
            	text-align: right;

            	span{
            		font-weight: 700;
            		float: none;
            		padding-top: 0;
            		padding-left: 0;
            	}
            }
            .span{
                width: auto;
               float: right;
               color: red;
               font-size: @size12;
               padding-right: @size3;
               padding-left:0;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: @size12;
                padding-top: @size1;
            }
        }
        .canshoot{
                font-size: @size12;
              p{
            	font-size: @size12;
            	text-align: right;
            	margin-bottom: @size10;
            	span{
            		font-weight: 700;
            		float: none;
            		font-size: @size12;

            	}
            }
        }
        .money{
            height: @size55;
            border-bottom: 1px solid black;
            .fl{
                margin-top: @size8;
                padding-left: @size10;
                p{
                    font-size: @size10;
                    line-height: @size20;
                    span{
                        font-size: @size14;
                        font-weight: bold;
                        color: #ee7d3b;
                        font-size: @size10;
                    }
                }
            }
            .fr{
                width: 1.8666rem;
                height: @size25;
                font-size: @size11;
                border: 1px solid rgb(129, 135, 140);
                text-align: center;
                line-height: @size25;
                margin-right: @size10;
                margin-top: @size15;
            }
        }
        .pay{
            height: @size50;
            border-bottom: 1px solid #87828c;
            margin-left: @size10;
            .check{
                float: left;
                margin-top: 18px;
                box-sizing: border-box;
                border: 3px solid rgb(0, 185, 181);
                width: @size14;
                height: @size14;
                position: relative;
                i{
                    font-size: @size10;
                    line-height: @size10;
                    position: absolute;
                    top: -1px;
                    left: -11px;
                    color: rgb(0, 185, 181);
                }
            }
            .check1{
                float: left;
                margin-top: 18px;
                box-sizing: border-box;
                border: 3px solid rgb(168, 174, 180);
                width: @size14;
                height: @size14;
                position: relative;
                i{
                    font-size: @size10;
                    line-height: @size10;
                    position: absolute;
                    top: -1px;
                    left: -11px;
                    display: none
                }
            }
            i{
                font-size: 25px;
                color: rgb(168, 174, 180);
                float: left;
                margin-left: @size10;
                line-height:  @size50;
                
            }
            .v_img{
                float: left;
                width: @size25;
                height: @size25;
                margin-left: @size10;
                margin-top: @size12;
            }
            .background1{
                color: rgb(107, 184, 105);
            }
            .background2{
                color: rgb(0, 157, 235);
            }
            .background3{
                color:rgb(252, 202, 112);
            }
            .infoWexin{
                text-align: left;
                float: left;
                margin-left: @size10;
                margin-top: @size10;
                color: rgb(129, 135, 140);
                .span1{
                    font-size: 13px;
                    line-height: @size16;
                    color: rgb(129, 135, 140);

                }
                .span2{
                    font-size: 10px;
                    line-height: @size16;
                    color: rgb(129, 135, 140);
                }
            }
            .infoAlipay{
                text-align: left;
                float: left;
                margin-left: @size10;
                // margin-top: 17px;
                line-height: @size50;
                color: rgb(129, 135, 140);
                font-size: 12px;
                 a{
                    	color: #ee7d3b;
                    	font-size: 12px;
                    	
                    }
            }
        }
    }
    .prompt{
       position:fixed;
        bottom:1.2rem;
        left: 0;
        width: 100%;
       height: 0.67rem;
       line-height: 0.67rem;
        color: #fff;
        background: linear-gradient(70deg, #DC704A, #F44EA0);
        text-align: center;
         font-size: 12px;

    }
    
    .footer1{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
		box-sizing: border-box;
        border-top:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 15px;
    }
   }
</style>

