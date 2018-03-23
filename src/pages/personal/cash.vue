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
                <div class="loginCn">提现</div>
            </div>
            <div class="fr" @click="Return()">...</div>
        </div>
        <div class="box">
            <div class="info clearfix"><span>金额</span>
               <span class="span" v-if="money!=''">CNY</span><input type="number" placeholder="请输入金额" v-model="money" @input="cny()"/>
            </div>
            <div class="bor"></div>
            <div class="money clearfix">
                <div class="fl">
                    <p>保证金提现余额<span>{{wallet!=null?wallet.availableMoney:0 | money}}CNY</span></p>
                    <p>保证金总额{{wallet!=null?wallet.totalMoney:0 | money}}CNY</p>
                </div>
                <div class="fr" @click="full()">全部提现</div>
            </div>
            <div class="info"><span>提现方式</span></div>
            <div class="bor"></div>
            <div class="pay" @click="getIndex(1)" v-if="wxLogin==true">
                <div :class="index==1 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                    <i :class="index==1 ? 'background1' : ''" class="iconfont icon-icon_weixinzhifu"></i>
                    <div class="infoAlipay">微信支付</div>
            </div>
            <div class="pay" @click="getIndex(2)" v-if="wxLogin==false">
                <div :class="index==2 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <i :class="index==2 ? 'background2' : ''" class="iconfont icon-icon_zhifubao"></i>
                <div class="infoAlipay">支付宝支付</div>
            </div>
            <div class="pay" @click="getIndex(3)">
                <div :class="index==3 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <i :class="index==3 ? 'background3' : ''" class="iconfont icon-icon_zhifubao"></i>
                <div class="infoAlipay">提现到银行卡</div>
            </div>
        </div>
        <div class="prompt" v-if="prompt!=''">{{prompt}}</div>
        <div class="footer1" @click="postBails()">立即提现</div>
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
            Return:function(){
                window.history.go(-1)
            },
            // 首次加载判断在什么浏览器下打开
             wxshow:function(){
                 let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
//                    这里是微信浏览器
                this.wxLogin = true;
            } else {
//                    这里不是微信浏览器
                this.wxLogin = false;
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
            full:function(){
            	  let that = this;
            	  that.money=that.wallet.availableMoney / 100
            },
            cny:function(){
                let that = this;
                 if(that.money>that.wallet.availableMoney / 100){
                     that.money=that.wallet.availableMoney / 100
                 }
            },
             // 获取订单号
            postBails:function(){
                let that = this;
                 if(that.money==''){
                    that.prompt="请填写金额"
                    return false
                 }
               // commonService.postBails({amount:that.money}).then(function(res){
                    // that.wallet=res.data.datas.user.wallet
                    // console.log(res.data.datas)
                    if(that.index!=1){
                      that.$router.push({path:"/cashstep",query:{money:that.money,index:that.index}})  
                    }else{
                        let money=that.money * 100
                       commonService.postForms({amount:money,type:2,channelId:'WX_JSAPI'}).then(function(res){

                          if(res.data.code==200){
                              that.$router.push({path:"/cashstep",query:{money:that.money,index:that.index}}) 
                          }else{
                            
                            that.prompt=res.data.message
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
          overflow-x: scroll;
          bottom: 0;
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
                line-height: 1.02rem;
                float: left;
                font-size: @size12;
                padding-top: @size1;
                padding-left: @size10;
            }
            input{
                width: 2rem;
                height: 100%;
                float: right;
                border: none;
                outline: none;
                font-size: @size12;
                color: red;
                font-weight: bold;
                text-align: right;
                // padding-right: @size3;
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
        .money{
            height: @size55;
            border-bottom: 1px solid black;
            .fl{
                margin-top: @size8;
                padding-left: @size10;
                p{
                    font-size: @size10;
                    span{
                        font-size: @size14;
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
                font-size: 15px;
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

