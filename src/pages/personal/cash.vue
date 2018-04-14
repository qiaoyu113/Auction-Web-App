<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 保证金提现 -->
    <div class="cash" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>REFUND</div>
                <div class="loginCn">保证金提现</div>
            </div>
            <div class="fr" @click="Return()">
             <img src="../../../src/assets/image/mycenter/right.png"/>
             </div>
        </div>
        <div class="box">
            <div class="info clearfix"><span>提现金额</span>
               <span class="span" v-if="money!=''">&nbsp;CNY</span><input type="number" placeholder="请输入提现金额" v-model="money" @input="cny()" @keyup="moneyreplor()" />
            </div>
            <div class="bor"></div>
            <div class="money clearfix">
                <div class="fl">
                    <p>保证金提现余额&nbsp;<span>{{wallet!=null?wallet.availableMoney:0 | money}}CNY</span></p>
                    <p>保证金金额总额&nbsp;{{wallet!=null?wallet.totalMoney:0 | money}}CNY</p>
                </div>
                <div class="fr" @click="full()">全部提现</div>
            </div>
            <div class="info"><span>提现方式</span></div>
            <div class="bor"></div>
        <!--     <div class="pay" @click="getIndex(1)" v-if="wxLogin==true">
                <div :class="index==1 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                     <img class="v_img" v-if="index==1" src="../../assets/image/mycenter/wxzf.png" />
                <img class="v_img" v-if="index!=1" src="../../assets/image/mycenter/wxzf2.png" />
                 
                    <div class="infoAlipay">提现至微信</div>
            </div> -->
            <div class="pay" @click="getIndex(2)" v-if="wxLogin==false">
                <div :class="index==2 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <img class="v_img" v-if="index==2" src="../../assets/image/mycenter/zfb.png" />
                <img class="v_img" v-if="index!=2" src="../../assets/image/mycenter/zfb2.png" />
                <!-- <i :class="index==2 ? 'background2' : ''" class="iconfont icon-icon_zhifubao"></i> -->
                <div class="infoAlipay">提现至支付宝</div>
            </div>
            <div class="pay" @click="getIndex(3)">
                <div :class="index==3 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <!-- <i :class="index==3 ? 'background3' : ''" class="iconfont icon-icon_zhifubao"></i> -->
                <img class="v_img" v-if="index==3" src="../../assets/image/mycenter/xxzf.png" />
                <img class="v_img" v-if="index!=3" src="../../assets/image/mycenter/xxzf2.png" />
                <div class="infoAlipay">提现至银行卡</div>
            </div>
        </div>
        <div class="prompt" v-if="prompt!=''">{{prompt}}</div>
        <div class="footer1" @click="postBails()">立即提现</div>
        <!--联系客服-->
        <div class="talk" @click="openService()">
            <img src="../../assets/image/mycenter/icon5.png"/>
        </div>
        <!--客户服务-->
        <div class="serviceBox" v-if="ServiceBox">
            <div class="serviceClose" @click="closeService()">×</div>
            <div class="serviceTop">
                <h2>ASSISTANCE</h2>
                <p>客户服务</p>
            </div>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t3.png"/>
                    <p>私恰</p>
                </div>
            </a>
            <div class="serviceWX">
                <img src="../../assets/image/mycenter/wx.png"/>
                <p>联系微信客服</p>
                <p class="p">长按识别二维码</p>
            </div>
        </div>
        <div class="serviceBk" v-if="ServiceBox"></div>
    </div>
</template>

<script >

    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '传家',
                index:3,
                money:"",
                wallet:'',
                wxLogin:true,
                prompt:'',
                ServiceBox:false,
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
            common.onMove('.cash')
        	this.getUsers()
            this.wxshow()
        },

        methods: {
            //打开客服
            openService(){
                let that = this;
                that.ServiceBox = true;
            },
            //关闭客服
            closeService(){
                let that = this;
                that.ServiceBox = false;
            },
            Return:function(){
                window.history.go(-1)
            },
            // 不可开头输入0
             moneyreplor:function(){
                if(this.money.length==1){
                    this.money=this.money.replace(/[^1-9]/g,'')
                }else{
                    this.money=this.money.replace(/\D/g,'')
                }
            },
            // 首次加载判断在什么浏览器下打开
             wxshow:function(){
                 let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
//                    这里是微信浏览器
                this.wxLogin = true;
                this.index=3

            } else {
//                    这里不是微信浏览器
                this.wxLogin = false;
                 this.index=2
            }
             },
             getIndex: function(index) {
                let that = this;
                that.index=index
            },
            // 获取金额信息
             getUsers:function(){
                let that = this;
               commonService.getUsers().then(function(res){
                    that.wallet=res.data.datas.user.wallet
              })
            },
            full:function(){
            	  let that = this;
            	  that.money=(that.wallet.availableMoney / 100).toFixed(0)
            },
            cny:function(){
                let that = this;
                 // if(){

                 // }
                 if(that.money>that.wallet.availableMoney / 100){
                     that.money=(that.wallet.availableMoney / 100).toFixed(0)
                 }
            },
             // 获取订单号
            postBails:function(){
                let that = this;
                 if(that.money==''){
                    that.prompt="请填写金额"
                    setTimeout(() => { 
                        that.prompt = ''
                              },2000) 
                    return false
                 }
               // commonService.postBails({amount:that.money}).then(function(res){
                    // that.wallet=res.data.datas.user.wallet
                 
                    if(that.index!=1){
                      that.$router.push({path:"/cashstep",query:{money:that.money,index:that.index}})  
                    }else{
                        let money=that.money * 100
                       commonService.postForms({amount:money,type:2,channelId:'WX_JSAPI'}).then(function(res){
                
                          if(res.data.code==200){
                             // console.log(res.data.datas)
                              that.$router.push({path:"/wxdetailed",query:{id:res.data.datas}}) 
                           // commonService.getForms(res.data.datas).then(function(res){
                           //      console.log(res)
                           // })
                      
                              
                          }else{

                            that.prompt=res.data.message
                            setTimeout(() => { 
                                that.prompt = ''
                              },2000)
                          } 
                       })

                    }
                    
              // })
            },
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .cash{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 0;
        .talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #343c47;
            border-right: none;
            border-bottom-left-radius: 6px;
            border-top-left-radius:6px;
            padding:0.2rem;
            box-sizing:border-box;
            img{
                width:0.56rem;
                height:0.5rem;
            }
        }
        .serviceBk{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#000000;
            opacity: 0.65;
            z-index:200;

        }
        .serviceBox{
            width:7rem;
            height:9.2rem;
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background:#fff;
            padding:0.5rem;
            z-index:201;
            .serviceClose{
                position: absolute;
                right:0;
                top:0;
                width:0.8rem;
                height:0.8rem;
                background:#EB6100;
                color:#fff;
                text-align: center;
                line-height:0.7rem;
                font-size: 0.9rem;
            }
            .serviceTop{
                text-align: center;
                margin-top:0.5rem;
                margin-bottom:0.4rem;
                h2{
                    font-size:18px;
                }
                p{
                    font-size:12px;
                    margin-top:0.2rem;
                }
            }
            .serviceList{
                overflow: hidden;
                font-size: 12px;
                padding:0.3rem 0 0.3rem 2.3rem;
                border-top:1px solid #B5B8BA;
                img{
                    float:left;
                    width:0.5rem;
                }
                p{
                    width:2rem;
                    text-align: center;
                    float:left;
                    font-size:12px;
                }
            }
            .serviceWX{
                overflow: hidden;
                font-size: 12px;
                border-top:1px solid #B5B8BA;
                text-align: center;
                img{
                    width:2rem;
                    height:2rem;
                    margin: 0.4rem auto;
                }
                p{
                    font-size:12px;
                }
                .p{
                    font-size:9px;
                    color:#C3C3C3;
                }
            }
        }
    .header{
        position: fixed;
        top: 0;
        z-index: 100;
        width: 10rem;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
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
                height:24px;
                font-weight: bold;
                font-size:14px;
            }
            .loginCn{
                font-size: 12px;
            }
            
        }
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
            img{
                width: 0.8rem;
                margin-top: 0.9rem;
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
                font-size: 12px;
                // padding-top: @size1;
                padding-left: @size10;
            }
            input{
                // width: 3rem;
                height: 1rem;
                float: right;
                border: none;
                outline: none;
                font-size: 13px;
                color: #eb6200;
                // font-weight: bold;
                line-height: 1rem;
                text-align: right;
                // padding-right: @size3;
            }
            .span{
                width: auto;
               float: right;
               color: #eb6200;
               font-size: 13px;
               line-height: 1rem;
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
        .money{
            height: @size55;
            border-bottom: 1px solid black;
            .fl{
                margin-top: @size8;
                padding-left: @size10;
                p{
                    font-size: 10px;
                    line-height: @size18;
                    span{
                        font-size: 12px;
                        font-weight: bold;
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
                margin-top: @size18;
                // box-sizing: border-box;
                border: 2px solid rgb(0, 185, 181);
                width: @size10;
                height: @size10;
                // position: relative;
                i{
                    font-size: @size10;
                    line-height: @size10;
                    // position: absolute;
                    // top: -1px;
                    // left: -11px;
                    color: rgb(0, 185, 181);
                }
            }
            .check1{
                float: left;
                margin-top: @size18;
                // box-sizing: border-box;
                border: 2px solid rgb(168, 174, 180);
                width: @size10;
                height: @size10;
                // position: relative;
                i{
                    font-size: @size10;
                    line-height: @size10;
                    // position: absolute;
                    // top: -1px;
                    // left: -11px;
                    display: none
                }
            }
            // i{
            //     font-size: 25px;
            //     color: rgb(168, 174, 180);
            //     float: left;
            //     margin-left: @size10;
            //     line-height:  @size50;
                
            // }
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
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(129, 135, 140);
                }
                .span2{
                    font-size: 10px;
                    line-height: 10px;
                    margin-top: @size4;
                    color: rgb(129, 135, 140);
                }
            }
            .infoAlipay{
                text-align: left;
                float: left;
                margin-left: @size10;
                line-height: 1.3333rem;
                color: rgb(129, 135, 140);
                font-size: 12px;
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
        font-size: 12px;
        background: #fff;
    }
   }
</style>

