<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 保证金提现步骤 -->
    <!-- flag三种状态
    1.支付宝提现
    2.银行卡提现
    3.微信提现 
    index三种状1.填写信息 2.审核中 3.已完成
    -->
    <div class="rechargeList" v-set-title="title">
        <div class="header">传家</div>
        <div class="nav">
            <span class="">&lt;</span> 
        </div>
        <div class="content">
            <div class="state">
                <div class="redline">
                    <div class="circle pos1" :class="index >=1 ?'v_red':''"></div>
                    <div class="circle pos2" :class="index >=2 ?'v_red':''"></div>
                    <div class="circle pos3" :class="index >=3 ?'v_red':''"></div>
                    <div class="label">
                        <span class="label1">确认银行卡信息</span>
                        <span class="label2">填写汇款信息</span>
                        <span class="label3">汇款完成</span>
                    </div>
                </div>
            </div>
          
            <!-- 填写银行卡信息 -->
            <div  v-if='index==1'>
                 <div class="v_block" v-for="list in bankCard">
                 	 <div class="v_rows clearfix">
                 	 	 <p class="v_rows_l"><i class="iconfont icon-duihao"></i><span>银行账户</span></p>
                 	 	 <div class="v_rows_con">官方</div>
                 	 	 <div class="v_rows_r v_Hook" :class="bankCardId==list.id?'v_id':''" @click="bankId(list.id)"><i class="iconfont icon-duihao"></i></div>
                 	 </div>
                 	 <div class="v_rows clearfix">
                 	 	<p class="v_rows_l">开户名称</p>
                 	 	<p class="v_rows_r">{{list.name}}</p>
                 	 </div>
                 	 <div class="v_rows clearfix">
                 	 	<p class="v_rows_l">银行账户</p>
                 	 	<p class="v_rows_r">{{list.cardNo}}</p>
                 	 </div>
                 	 <div class="v_rows clearfix">
                 	 	<p class="v_rows_l">开户银行</p>
                 	 	<p class="v_rows_r">{{list.bank}} {{list.subBank}}</p>
                 	 </div>
                 </div>
            </div>
            <!-- 填写银行卡信息 -->
            <div  v-if='index==2'>
                <div class="info"><span>汇款人</span>
                    <input type="" placeholder="请输入汇款人姓名" v-model="name"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>开户银行</span>
                    <input type="" placeholder="请输入开户银行" v-model="userBankDetail"/>
                    <div class="infomore" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>银行卡号</span>
                    <input type="" placeholder="请输入银行卡号" v-model="userBankCardNo"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
               <div class="info1"><span>汇款金额</span>
                     <span class="span">CNY</span>
                    <input type="" placeholder="请输入金额" disabled="disabled" v-model="money"/>
                </div>
                <div class="info"><span>手机号码</span>
                    <input type="" placeholder="请输入手机号码" v-model="phone"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
      
            <!-- 已完成 -->
            <div  v-if='index==3'>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">{{list.no}}</div>
                </div>
                <div class="info"><span>交易金额</span>
                    <div class="infoClose"><span class="span1">{{list.amount}}CNY</span>
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose" v-if="list.applyTime!=null">{{list.applyTime | stampFormate2}}</div>
                </div>
                <div class="info"><span>交易种类</span>
                    <div class="infoClose" v-if="list.status==1">线下充值</div>
                </div>
                <div class="info"><span>支付方式</span>
                    <div class="infoClose">
                    <span class="span2" v-if="list.userBankCardNo!=null">{{list.userBankDetail}}<br>{{list.userBankCardNo.substr(list.userBankCardNo.length-4)}}</span>
                    </div>
                </div>
                <div class="info"><span>状态</span>
                    <div class="infoClose" v-if="list.status==1">处理中</div>
                    <div class="infoClose" v-if="list.status==2">已完成</div>
                    <div class="infoClose" v-if="list.status==3">失败</div>
                </div>
            </div>
        </div>
        <div class="footer1" v-if='index==1||index==2' @click="nextStep">下一步</div>
        <div class="footer1" v-if='index==3' @click="returnUpper">完成</div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'支付宝充值单',
          arrays: [],
          index:1,
          active:0,
          // flag:2,
          money:this.$route.query.money,//充值金额
          name:'',//名字
          phone:'',//手机号码
          verification:'', // 验证码
          show: true,
          count: 0,
          timer: null,
          oddNumbers:'',//单号
          list:'',
          bankCard:'',//银行卡列表
          userBankDetail:'',//开户银行
          userBankCardNo:'',//银行卡号
          bankCardId:'',//官方银行卡id

      }
    },
    components: {},
    mounted () {
        // this.yi()
        this.getBankCards()
    },
    methods: {
            removeName:function(){
                let that = this;
                that.name = ''
            },
            removeNamecard:function(){
                let that = this;
                that.namecard = ''
            },
            removeAccount:function(){
                let that = this;
                that.account = ''
            },
            removePhone:function(){
                let that = this;
                that.phone = ''
            },
            // yi:function(){
            //     if(this.$route.query.index==2){
            //         this.flag=1
            //     }
            //     if(this.$route.query.index==3){
            //         this.index=1
            //     }
            //     console.log(this.$route.query.index)
            //     console.log(this.$route.query.orderNo)
            // },
            nextStep:function(){
                if(this.index==1){
                    this.index=2
                }else if(this.index==2){
                     this.postForms()
                    this.index=3
                }

            },
            returnUpper:function(){
                window.history.go(-1)
            },
            bankId:function(id){
              this.bankCardId=id;
            },
      
            // 获取银行卡列表
            getBankCards:function(){
               let that = this
               commonService.getBankCards().then(function(res){
                that.bankCard=res.data.datas
                  // console.log(res)
                 })
            },
            //提交申请表
            postForms:function(){
                let that = this
                let money=that.money * 100
                console.log(money)
                                    // orderNo:'974154167146647552'
               commonService.postForms({channelId:'UNIONPAY',userBankDetail:that.userBankDetail,userBankCardNo:that.userBankCardNo,phone:that.phone,type:1,userName:that.name,amount:money,bankId:that.bankCardId}).then(function(res){
                console.log(res)
                    if(res.data.message=='success'){
                       that.oddNumbers=res.data.datas 
                       that.getForms()
                    }
                    
                 })
            },
             //获取申请表信息
             getForms:function(){
                let that = this
                 commonService.getForms(that.oddNumbers).then(function(res){
                    // console.log(res)
                    that.list=res.data.datas
                 })
            },
            payYes(){
                let that = this;
                let channelIds = '';
                if(that.index === 1){//微信
                    channelIds = 'WX_JSAPI'
                }else if(that.index === 0){//余额
                    channelIds = 'NATIVE'
                }else{//支付宝
                    channelIds = 'ALIPAY_WAP'
                }
                commonService.setbails({auctionId:that.id,channelId:channelIds}).then(function(res){
                    // console.log(res)
                    if(res.data.code === 200){
                        if(that.index === 1){//微信支付
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                                // console.log(res)
                                if(res.data.success){
                                    commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxbaselogin',wxscope:'snsapi_base'}).then(function(res){
                                        let code = res.data.code;
                                        if(code === 200){
                                            //获取静默授权地址成功
                                            window.localStorage.setItem('id',that.id);
                                            window.location.href = res.data.datas;
                                        }
                                    })
                                }
                            })
                        }else if(that.index === 0){//账户余额
                            that.dis2Show = false;
                            that.dis3Show = true;
                            that.hintText = '出价成功';
                        }else{//支付宝
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
    .rechargeList{
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
    }
    .content{
        margin-top: @size80;
        margin-bottom: 1.2rem;
        padding: 0 @size10;
        .v_block{
        	border-bottom: 1px solid rgb(53, 60, 70);
        	.v_rows{
        		margin: 0 @size10;
        		border-bottom: 1px solid #87828c;
        		line-height: @size54;
                
        		.v_rows_l{
        			float: left;
        			font-size: 10px;
        		}
        		.v_rows_con{
        			float: left;
        			width: 1.22rem;
        			height: @size24;
        			background: #15b3b3;
        			margin-top: @size15;
        			line-height: @size24;
        			text-align: center;
        			color: #fff;
        			margin-left: @size4;
        		}
        		.v_rows_r{
        			float: right;
        			font-size: 10px;
                     color:#5b5b5b;
        		}
        		.v_Hook{
        			width: @size16;
        			height: @size16;
        			border:2px solid #ccc;
        			margin-top: @size18;
        			i{
                        display: none;
        				font-size: @size16;
                        line-height: @size16;
                        color: #15b3b3;

        			}
        		}
                .v_id{
                    border:2px solid #15b3b3;
                    i{
                        display: block;
                    }
                }

        	}
        	.v_rows:last-child{
        		border-bottom: none;
        	}

        }
        .info1{
                width: 100%;
                height: @size40;
                text-align: left;
                border-bottom: 1px solid #87828c;
                span{
                    width: 2rem;
                    line-height: 1.02rem;
                    float: left;
                    font-size: @size12;
                    padding-top: @size1;
                    padding-left: @size10;
                }
                .span{
                    float: right;
                    width: auto;
                    padding-left:0;
                    margin-right: 0.2rem;
                }
                input{
                    width: 2rem;
                    height: 100%;
                    float: right;
                    border: none;
                    outline: none;
                    font-size: @size12;
                    // color: red;
                    font-weight: bold;
                    text-align: right;
                    // padding-right: @size3;
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
                .v_red{
                    background: red;
                }
                .label {
                    margin-left: -1.8rem;
                    margin-right: -1.3rem; 
                    text-align: center;  
                    .label1{
                        float: left;
                        color: red;
                        font-size: @size13;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size13;
                        color: gray;
                    }
                    .label3{
                        float: right;
                        font-size: @size13;
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
                        font-size: @size14;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size14;
                        color: red;
                    }
                    .label3{
                        float: right;
                        font-size: @size14;
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
                        font-size: @size14;
                    }
                    .label2{
                        text-align: center;
                        font-size: @size14;
                        color: red;
                    }
                    .label3{
                        float: right;
                        font-size: @size14;
                        color: red;
                    }
                }
            }
            
        }
        .info{
            width: 100%;
            height: @size40;
            border-bottom: 1px solid #87828c;
            text-align: left;
            span{
                width: 2rem;
                line-height: 1.02rem;
                float: left;
                font-size: @size12;
                padding-left: @size10;
                padding-top: @size1;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                height: 100%;
                float: left;
                border: none;
                outline: none;
                font-size: @size12;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: @size12;
                padding-top: @size1;
                box-sizing: border-box;
                .span1{
                    font-size: @size12;
                    font-weight: bold;
                    color: black;
                    width: auto;
                }
                .span2{
                    display: inline-block;
                    line-height: @size14;
                    font-size:@size10;
                    text-align: right;
                    padding-top: @size6;
    
                }
                
            }
            .infomore{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                font-size: @size12;
                padding-top: @size1;
                box-sizing: border-box;
                margin-right: 0.2rem;
                .more{
                    font-weight: bold;
                    letter-spacing: @size3;
                    text-align: right;
                    line-height: @size35;
                }
            }
        }
    }
    .footer1{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
        background: #fff;
		box-sizing: border-box;
        border-top:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 15px;
    }
  }
    
    
</style>

