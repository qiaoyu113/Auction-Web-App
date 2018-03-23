<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 订单详情-订单正常 -->
    <!-- 四种状态，index
    1.提交订单
    2.配送中
    3.交易完成
    0.线下处理 -->
    <div class="orderDetails" id="" v-set-title="title">
        <div class="header">传家</div>
        <!-- 返回键,当订单完成时有删除icon -->
        <div class="nav">
            <span class="" @click="Return()">&lt;</span> 
            <span class="span1" :class="index==3 ? 'display':'' ">c</span>
        </div>
        <div class="content">
            <div class="warnTime" v-if='index==0'>
                <span>打款<i>3日</i>会处理反馈，财务审核中，请耐心等待</span>
            </div>
            <div class="warnTime" v-if='index==1'>
                <span>请在规定时间内支付</span>
                <div class="time fr">
                    <div class="fr num">01</div>
                    <div class="fr colon">:</div>
                    <div class="fr num">02</div>
                </div>
            </div>
            
            <div class="state"  v-if='index==1||index==0'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1">提交订单</span>
                        <span class="label2">配送中</span>
                        <span class="label3">交易完成</span>
                    </div>
                </div>
            </div>
            <div class="state2"  v-if='index==2'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1">提交订单</span>
                        <span class="label2">配送中</span>
                        <span class="label3">交易完成</span>
                    </div>
                </div>
            </div>
            <div class="state3"  v-if='index==3'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1">提交订单</span>
                        <span class="label2">配送中</span>
                        <span class="label3">交易完成</span>
                    </div>
                </div>
            </div>

            <div class="payment" v-if='index==0'>
                <div class="witpay">处理中</div>
                <div class="btn">联系客服</div>
            </div>
            <div class="payment" v-if='index==1'>
                <div class="witpay">待支付</div>
                <div class="btn" @click="kshow()">更改支付方式</div>
            </div>
            <div class="payment" v-if='index==1 && ity==true'>
                <div class="btn" :class="{'rty':method=='WX_JSAPI'}" @click="methodlist('WX_JSAPI')">微信</div>
                <div class="btn" :class="{'rty':method=='ALIPAY_WAP'}" @click="methodlist('ALIPAY_WAP')">支付宝</div>
                <div class="btn" :class="{'rty':method=='UNIONPAY'}" @click="methodlist('UNIONPAY')">线下转账</div>
            </div>
            <div v-if="datas.status==4">
               <div class="logistic" @click="show">
                    物流信息<span class="fr">...</span>
                </div>
                <div class="logdetail">
                    <div>{{logistics.location}}</div>
                    <div>{{logistics.context}}</div>
                    <div>{{logistics.time}}</div>
                </div> 
            </div>
            <div class="address">
                <div class="peo"><span>{{adress.name}}</span>  {{adress.phone}}</div>
                <div>{{adress.provinceName}} {{adress.cityName}} {{adress.districtName}}</div>
                <div>{{adress.detailAdress}}</div>
            </div>
            <div class="itemInfo clearfix">
                <div class="pic fl" @click="Routerid(orderDetail.auctionId)"><img :src="picHead + orderDetail.picItems[0]" alt="" v-if="orderDetail.picItems!=null"></div>
                <div class="box fl">
                    <div class="money">{{orderDetail.finalPrice | money}}CNY</div>
                    <div class="title">{{orderDetail.auctionName}}</div>
                    <div class="number">LOT-{{orderDetail.auctionNo}}</div>
                </div>
            </div>
            <div class="totalMoney clearfix">
                <div class="fl">订单总额</div>
                <div class="fr">{{datas.amount | money}} CNY</div>
            </div>
            <div class="moneys">
                <div class="price clearfix"><div class="fl">拍品价格:</div><div class="fr">{{orderDetail.finalPrice | money}} CNY</div></div>
                <div class="price clearfix"><div class="fl">保险+运费:</div><div class="fr">{{orderDetail.finalPrice / 10000}} CNY</div></div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix"><div class="fl">订单编号:</div><div class="fr">{{datas.orderNo}}</div></div>
                 <div class="price clearfix" v-if="createTime!=''"><div class="fl">支付时间:</div><div class="fr">{{createTime | stampFormate2}}</div></div>
                <div class="price clearfix"><div class="fl">支付方式:</div>
                      <div class="fr"  v-if="method=='ALIPAY_WAP'">支付宝</div>
                      <div class="fr"  v-if="method=='WX_JSAPI'">微信</div>
                      <div class="fr"  v-if="method=='UNIONPAY'">线下转账</div>
                      <!-- <div class="fr"  v-if='index==0'>线下转账</div> -->
               </div>

            </div>
        </div>
        <div class="footer1" v-if='index==1' @click="rechargeList">支&nbsp;&nbsp;&nbsp;付</div>
        <div class="footer" v-if='index==3'>
            <div class="value">
                分&nbsp;&nbsp;&nbsp;享
            </div>
            <div class="r-icon" ><i class="iconfont icon-duigoudunpai"></i></div>
        </div>

            <div class="logistics">
        <div class="header">传家</div>
        <div :class="dis">
            <div class="transparent"></div>
            <div class="popWin" >
                <div class="close" @click="close()"><i class="iconfont icon-closeicon"></i></div>
                <div class="titleEn">SHIPPING</div>
                <div class="titleCh">物流信息</div>
                <div class="num">运单号<span class="fr">{{logistic.nu}}</span></div>
                <div class="num num1">快递公司<span class="fr">{{logistic.com}}</span></div>
                <!-- <div class="num num1">预计送达<span class="fr">2018.05.11</span></div> -->
                <div class="box">
                    
                    <div class="contents" v-for="lists in logisticss">
                    <div class="line"> </div>
                        <div class="contents_box">
                        <!-- <div class="circle"></div> -->
                        <p>{{lists.context}}</p>
                        <!-- <p>{{lists.location}}</p> -->
                        <!-- <p>期待与你下一次合作</p> -->
                        <p>{{lists.time}}</p>
                        </div>
                    </div>
           <!--          <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单正在派送。感谢您的等待！</p>
                        <p>配送员：李松松，电话：138 1234 8888</p>
                        <p>2018.06.11 15:08:55</p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
        <div class="payOK"></div>
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {common} from '../../assets/js/common/common'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'传家',
          arrays: [],
          index:0,
          orderNo:'',//详情id
          datas:'',//详情
          orderDetail:'',
          adress:'',//地址
          logistics:'',//物流
          logisticss:'',//物流列表
          logistic:'',
          arrays: [],
          dis:'dis',
          createTime:'',//支付时间
          method:'UNIONPAY',//支付方式
          ity:false,
          
      }
    },
     computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
        common.onMove('.orderDetails')
        this.huoqu()
        this.getOrderid()
    },
    methods: {
        Return:function(){
            window.history.go(-1)
        },
        Routerid:function(id){
            this.$router.push({name:'auctionMore',params:{id:id}})
        },
        kshow:function(){
            if(this.ity==true){
              this.ity=false
            }else{
                this.ity=true
            }
        },
        methodlist:function(value){
            this.method=value
        },
         huoqu:function(){
            this.orderNo=this.$route.query.id
            // console.log(this.orderNo)
        },
        close:function() {
            this.dis='dis';
        },
        show:function(){
            this.dis=''
        },
        rechargeList:function(){      
              let that=this;
              let index=''
              if(that.method=='UNIONPAY'){
                     index=3
            that.$router.push({path:"/rechargeList",query:{money:that.datas.amount,index:index,orderNo:that.orderNo,type:4}})
            }
             // 微信
              if(that.method=='WX_JSAPI'){
                           let orderNo = that.orderNo;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:'WX_JSAPI'}).then(function(res){
                                if(res.data.success){
                                    commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxbaselogin',wxscope:'snsapi_base'}).then(function(res){
                                        if(res.data.code === 200){
                                            //获取静默授权地址成功 
                                            window.location.href = res.data.datas;
                                        }
                                    })
                                }
                            })

              }
              // 支付宝
              if(that.method=='ALIPAY_WAP'){
                    let orderNo = that.orderNo;
                    window.localStorage.setItem('orderNo',orderNo);
                    commonService.putOrders({orderNo:orderNo,channelId:'ALIPAY_WAP'}).then(function(res){
                        if(res.data.success){
 
                            let payOK = document.getElementsByClassName("payOK");
                               payOK[0].innerHTML = res.data.datas.payUrl;
                               document.punchout_form.submit()
                          }
                      })
              }
        },
        // 获取订单
         getOrderid:function(){
            let that=this;
            commonService.getOrderid(that.orderNo).then(function(res){
                    console.log(res)
                that.datas=res.data.datas
                that.method=that.datas.channelId
                that.orderDetail=that.datas.orderDetail
                if(that.orderDetail.adress!=null){
                   that.adress=that.orderDetail.adress 
                }
                
                 let orderLogs = res.data.datas.orderLogs
                 for(let i=0;i<orderLogs.length;i++){
                      if(orderLogs[i].status==3){
                            that.createTime=orderLogs[i].createTime
                      }
                 }
                if(that.datas.status==4){
                   that.index=2
                commonService.getKaidi({nu:that.orderDetail.nu,com:that.orderDetail.com}).then(function(res){
                    // console.log(res)
                    that.logistics=res.data.datas.data[0]
                    // console.log(that.logistics)
                    that.logisticss=res.data.datas.data
                    that.logistic=res.data.datas
                })
                }
                if(that.datas.status==1){
                   that.index=1
                }
                if(that.datas.status==2 || that.datas.status==3){
                    that.index=0
                }
                if(that.datas.status==5){
                    that.index=3
                }
                // console.log(that.orderDetail)
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
.orderDetails{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
    .header{
        position: fixed;
        top: 0;
        z-index: 100;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        span{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: 20px;
        }
        .span1{
            float: right;
            padding-right: 20px;
            display: none;
        }
        .display{
            display: block;
        }
    }
    .content{
        margin-top: @size80;
        margin-bottom: 1.2rem;
        box-sizing: border-box;
        padding: 0 @size10;
        .warnTime{
            height: @size35;
            border-bottom: 1px solid rgb(129, 135, 140);
            line-height: @size35;
            span{
                font-size: @size10;
                color: rgb(129, 135, 140);
                padding-left: @size10;
                i{
                    font-size: @size10;
                    color: red;
                }
            }
            .time{
                display: inline-block;
                color: black;
                margin-right: @size10;
                box-sizing: border-box;
                padding: 1px;
                .num{
                    box-sizing: border-box;
                    height: @size25;
                    background: white;
                    border: 1px solid black;
                    border-radius:3px;
                    padding: @size3 @size2; 
                    margin-top:@size5; 
                    line-height: 0.50rem;
                    font-size: @size12;
                    font-weight: bold;
                }
                .colon{
                    text-align: center;
                    margin-top:@size6; 
                    line-height: @size22;
                    width: @size10;
                }
            }
        }
        .state{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            padding: 0 @size45;
            .redline{
                box-sizing: border-box;
                border-top: 0.08rem solid red;
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid red;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: red;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                }
                .label {
                    margin-left: -1.5rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        color: red;
                        font-size: @size16;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size16;
                        color: gray;
                    }
                    .label3{
                        float: right;
                        font-size: @size16;
                        color: gray;
                    }
                }
            }
            
        }
        .state2{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            padding: 0 @size45;
            .redline{
                box-sizing: border-box;
                border-top: 0.08rem solid red;
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid red;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: red;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                    background: red;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                }
                .label {
                    margin-left: -1.5rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        color: red;
                        font-size: @size16;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size16;
                        color: red;
                    }
                    .label3{
                        float: right;
                        font-size: @size16;
                        color: gray;
                    }
                }
            }
            
        }
        .state3{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            padding: 0 @size45;
            .redline{
                box-sizing: border-box;
                border-top: 0.08rem solid red;
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid red;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: red;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                    background: red;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                    background: red;
                }
                .label {
                    margin-left: -1.5rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        color: red;
                        font-size: @size16;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size16;
                        color: red;
                    }
                    .label3{
                        float: right;
                        font-size: @size16;
                        color: red;
                    }
                }
            }
            
        }
        .logistic{
            height: @size40;
            box-sizing: border-box;
            width: 8.933rem;
            border-bottom: 1px solid rgb(129, 135, 140);
            margin-left: @size10;
            line-height: @size40;
            font-size: @size14;
            span{
                letter-spacing: @size5;
                line-height: @size30;
                font-weight: bold;
                font-size: @size14;
            }
        }
        .logdetail{
            border-bottom: 1px solid rgb(129, 135, 140);
            height: @size75;
            padding: 0 @size10;
            box-sizing: border-box;
            padding-top: @size10;
            div{
                font-size: @size13;
                color: rgb(129, 135, 140);
            }
        }
        .payment{
            height: @size40;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(129, 135, 140);
            .witpay{
                padding-left: @size10;
                line-height: @size40;
                font-size: @size14;
                float: left;
            }
            .btn{
                margin-right: @size10;
                margin-top: @size6;
                line-height: @size25;
                font-size: @size15;
                border: 1px solid rgb(129, 135, 140);
                color: rgb(129, 135, 140);
                float: right;
                padding: 0 @size10;
                
            }
            .rty{
                background: #15b3b2;
            }
        }
        .address{
            height: 2.3333rem;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(129, 135, 140);
            .peo{
                padding: @size13 @size10;
                font-size: @size14;
                color: black;
                span{
                    float: left;
                    font-size: @size14;
                }
            }
            div{
                padding-right: @size10;
                font-size: @size12;
                text-align: right;
                line-height: @size18;
                color: rgb(129, 135, 140);
                font-weight: 100;
            }
        }
        .itemInfo{
            height: @size98;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            .pic{
                width: @size80;
                height: @size80;
                padding-top:@size9;
                margin-left: @size10; 
                display: inline-block;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .box{
                display: inline-block;
                margin-left: @size15;
                padding-top: @size10;
                .money {
                    font-size: 15px;
                    font-weight: bold;
                }
                .title {
                    font-size: 14px;
                    color: rgb(133, 133, 133);
                    padding-top: @size1;
                }
                .number {
                    font-size: 12px;
                    color: rgb(133, 133, 133);
                    padding: 0 0 @size25 0;
                    line-height: @size10;
                }
            }
            
        }
        .totalMoney{
            height: @size40;
            width: 8.933rem;
            border-bottom: 1px solid rgb(129, 135, 140);
            margin-left: @size10;
            line-height: @size40;
            .fl{
                font-size: @size14;
            }
            .fr{
                font-size: @size14;
                font-weight: bold;
                color: red;
            }
        }
        .moneys{
            box-sizing: border-box;
            padding: @size5 @size10;
            border-bottom: 1px solid rgb(129, 135, 140);
            height: @size50;
            div{
                font-size: @size12;
                line-height: @size20;
            }
        }
        .orderinfo{
            padding: @size5 @size10;
            div{
                font-size: @size12;
                line-height: @size20;
            }
        }
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
        background: #fff;
    }
    .footer{
        width: 100%;
        height: @size45;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: rgb(250, 251, 252);
        box-sizing: border-box;
        border-top: 1px solid black; 
        .value{
            float: left;
            width: 8.8rem;
            height: 100%;
            line-height: @size45;
            position: relative;
            text-align: center;
        }
        .r-icon{
            float: right;
            height: 100%;
            width: @size45;
            box-sizing: border-box;
            border-left:1px solid rgb(205, 212, 220); 
            text-align: center;
            i{
                line-height: @size45;
                font-size: @size30;
            }
        } 
    }
    .logistics{
    .header{
        position: fixed;
        top: 0;
        z-index: 100;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    
    
.dis{
    display: none;
}
.transparent{
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background:#000;  
    opacity:0.6;
}
.popWin{
    height: 14.72rem;
    width: 8.67rem;
    background: white;
    position: fixed;
    bottom:@size25;
    left: @size25;
    z-index: 1000;
    text-align: center;
    box-sizing: border-box;
    padding: 0 @size20;
    overflow: scroll;
    .close{
            position: absolute;
            right: 0;top: 0;
            width: @size30;
            height: @size30;
            background: #eb6100;
            i{
                font-size: @size30;
                color: white;
            }
    }
    .titleEn{
        padding-top: @size50;
        letter-spacing: 2px;
        font-size: @size14;
        font-weight: bold;
    }
    .titleCh{
        font-size: @size11;
        padding-bottom: @size25;
    }
    .num{
        width: 7.6rem;
        height: @size40;
        border-top: 1px solid gray;
        font-size: @size14;
        line-height: @size40;
        text-align: left;
        .fr{
            font-size: @size14;
            color: gray;
        }
    }
    .num1{
        border-bottom: 1px solid gray;
    }
    .box{
        // height: 8.4rem;
        // overflow:hidden;
        // overflow-y: scroll;
        .contents{
            padding: @size26 0 0 0.44rem;
            position: relative;
            // padding-left: 0.44rem;
            border-left: 2px solid gray;
            .line{
                position: absolute;
                left: -@size5;
                top: @size26;
                width: @size10;
                height: @size10;
                border-radius: 50%;
                background: gray;
                z-index: 3000;
                  }
        .contents_box{
            border-bottom: 1px solid gray;
            text-align: left;
            // float: left;
            width:  7rem;
            // height: 2.4rem;
            box-sizing: border-box;
            padding-bottom: @size13;
            p{
                font-size: @size10;
            }
        }
        }
   .contents:first-child{
         padding-top: 0;
         margin-top: @size26;
         .line{
            position: absolute;
            left: -@size5;
            top: 0;

         }

    }
    }


}
}

    }
</style>

