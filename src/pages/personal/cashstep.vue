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
    <div class="cashstep" v-set-title="title">
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="" @click="Return()">&lt;</span> 
        </div>
        <div class="content">
            <div class="state"  v-if='index==1'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1" v-if='flag==1'>填写支付宝帐号</span>
                        <span class="label1" v-if='flag==2'>填写银行卡信息</span>
                        <span class="label2">身份验证</span>
                        <span class="label3">提现完成</span>
                    </div>
                </div>
            </div>
            <div class="state2"  v-if='index==2'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1" v-if='flag==1'>填写支付宝帐号</span>
                        <span class="label1" v-if='flag==2'>填写银行卡信息</span>
                        <span class="label2">身份验证</span>
                        <span class="label3">提现完成</span>
                    </div>
                </div>
            </div>
            <div class="state3"  v-if='index==3'>
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1" v-if='flag==1'>填写支付宝帐号</span>
                        <span class="label1" v-if='flag==2'>填写银行卡信息</span>
                        <span class="label2">身份验证</span>
                        <span class="label3">提现完成</span>
                    </div>
                </div>
            </div>
            <!-- 填写支付宝信息 -->
            <div  v-if='index==1&&flag==1'>
                <div class="info1"><span>提现金额</span>
                     <span class="span">CNY</span>
                    <input type="number" placeholder="请输入金额" disabled="disabled" v-model="money"/>
                </div>
                <div class="info"><span>支付宝帐号</span>
                    <input type="text" placeholder="请输入支付宝帐号" v-model="account"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>姓名</span>
                    <input type="text" placeholder="请输入姓名" v-model="userName"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
            <!-- 填写银行卡信息 -->
            <div  v-if='index==1&&flag==2'>
                <div class="info1"><span>提现金额</span>
                     <span class="span">CNY</span>
                    <input type="number" placeholder="请输入金额" disabled="disabled" v-model="money"/>
                </div>
                <div class="info"><span>姓名</span>
                    <input type="text" placeholder="请输入收款方姓名" v-model="userBankName"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
                 <div class="info"><span>银行卡号</span>
                    <input type="number" placeholder="请输入银行卡号" v-model="userBankCardNo" @blur="cardObtain()"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>银行</span>
                    <input type="text" placeholder="请选择银行" disabled="disabled" value="userBank" v-model="userBank"/>
                    <!-- <div class="infomore" @click='removeAccount'><i class="more">...</i></div> -->
                </div>
               
                <div class="info"><span>开户省市</span>
                    <input type="text" placeholder="请选择开户省市" v-model="userBankProvince"/>
                    <div class="infomore" @click='removeAccount'><i class="more">...</i></div>
                </div>
                <div class="info"><span>开户支行</span>
                    <input type="text" placeholder="请输入开户支行" v-model="userBankDetail"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
            <!-- 身份验证 -->
            <div  v-if='index==2'>
                <div class="info"><span>姓名</span>
                    <input type="text" placeholder="请输入姓名" v-model="name"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>身份证号码</span>
                    <input type="number" placeholder="请输入身份证号码" v-model="namecard"/>
                    <div class="infoClose" @click='removeNamecard'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>手机号码</span>
                    <input type="number" placeholder="请输入手机号码" v-model="phone"/>
                    <div class="infoClose" @click='removePhone'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>图片验证码</span>
                    <input type="text" placeholder="请输入验证码" v-model='kaptchaValue'/>
                    <div class="infoClose" @click="getKaptchas()"><img :src="img.imageString"/></div>
                </div>
                <div class="info"><span>验证码</span>
                    <input type="number" placeholder="请输入验证码" v-model='verification'/>
                    <div class="infoClose" @click="getFormssms">获取验证码<i v-if="count!=0">({{count}}s)</i></div>
                </div>
            </div>
            <!-- 已完成 -->
            <div  v-if='index==3'>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">{{list.no}}</div>
                </div>
                <div class="info"><span>提现金额</span>
                    <div class="infoClose">{{list.amount | money}}CNY
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose" v-if="list.applyTime!=null">{{list.applyTime | stampFormate2}}</div>
                </div>
                <div class="info"><span>订单支付</span>
                    <div class="infoClose">提现</div>
                     <!-- <div class="infoClose" v-if="list.channelId=='OFFLINE_BANK'">提现</div> -->
                </div>
                <div class="info"><span>提现方式</span>
                    <div class="infoClose">
                    <span class="span2" v-if="list.channelId=='ALIPAY_WAP'">支付宝<br>{{list.channelUser}}</span>
                    <span class="span2" v-if="list.channelId=='OFFLINE_BANK'">{{list.userBank}}<br>
                    尾号{{list.userBankCardNo.substr(list.userBankCardNo.length-4)}}{{card.cardTypeName}}</span>
                    </div>
                </div>
                <div class="info"><span>提现金额</span>
                    <div class="infoClose" v-if="list.status==1">处理中</div>
                    <div class="infoClose" v-if="list.status==2">已完成</div>
                    <div class="infoClose" v-if="list.status==3">失败</div>
                </div>
            </div>
        </div>
        <div class="footer1t" v-if="htmlx!=''">{{htmlx}}</div>
        <div class="footer1" v-if='index==1||index==2' @click="nextStep">下一步</div>
        <div class="footer1" v-if='index==3' @click="rto()">完成</div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {common} from '../../assets/js/common/common'
import {card} from '../../assets/js/common/card'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'传家',
          arrays: [],
          index:1,
          active:0,
          flag:2,
          money:this.$route.query.money,//提现金额
          account:'',//支付宝账户
          namecard:'',//身份证号
          name:'',//名字
          userName:'',//支付宝姓名
          phone:'',//手机号码
          verification:'', // 验证码
          show: true,
          count: 0,
          timer: null,
          oddNumbers:'',//单号
          list:'',
          userBankName:'',//收款姓名
          userBank:'',//银行名称
          userBankCardNo:'',//银行卡号
          userBankProvince:'',//开户行省份
          userBankDetail:'',//开户银行
          htmlx:'',
          kaptchaValue:'',
          img:'',
          card:'',

      }
    },
    components: {},
    mounted () {
       
       common.onMove('.cashstep')
        this.yi()
        this.getKaptchas()
    },
    methods: {
           rto:function(){
             this.$router.push({path:"/myaccount"})  
           },
           cardObtain:function(){
                let that=this
                 let pattern = /^([1-9]{1})(\d{14}|\d{18})$/,  
                       str = that.userBankCardNo.replace(/\s+/g, "");  
                       if (!pattern.test(str)) {  
                           that.htmlx='银行卡号不正确'
                           return false;  
                       } 

                let cards=''
               cards=card.bankCardAttribution(that.userBankCardNo)
               that.userBank=cards.bankName
            },
            Return:function(){
                window.history.go(-1)
            },
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
            yi:function(){
                if(this.$route.query.index==2){
                    this.flag=1
                }
                if(this.$route.query.index==3){
                    this.flag=2
                }
                if(this.$route.query.index==1){
                     this.index=2
                }
            },
            nextStep:function(){
                let that=this
                if(that.index==1){
                     if(that.flag==1){
                         if(that.account==''){
                            that.htmlx='支付宝账户不能为空'
                            return false
                         }
                         if(that.userName==''){
                            that.htmlx='姓名不能为空'
                            return false
                         }
                     }else if(that.flag==2){
                          if(that.userBankName ==''){
                            that.htmlx='姓名不能为空'
                            return false
                         }
                         if(that.userBank ==''){
                            that.htmlx='银行不能为空'
                            return false
                         }
                         if(that.userBankCardNo ==''){
                            that.htmlx='银行卡号不能为空'
                            return false
                         }
  
                         if(that.userBankProvince ==''){
                            that.htmlx='开户省市不能为空'
                            return false
                         }
                         if(that.userBankDetail ==''){
                            that.htmlx='开户支行不能为空'
                            return false
                         }
                     }
                    that.index=2
                    that.htmlx=''
                }else if(that.index==2){
                     that.postForms()
              
                }

            },
            // 获取图片验证码
            getKaptchas:function(){
                let that=this
                 commonService.getKaptchas().then(function(res){
                    that.img=res.data.datas
              })
            },
            //手机验证码
             getFormssms:function(){
             let that = this;
            if(that.count==0){
                 commonService.getFormssms({phone:that.phone,type:7,idCard:that.namecard,realName:that.name,kaptchaKey:that.img.kaptchaKey,kaptchaValue:that.kaptchaValue}).then(function(res){
                    if(res.data.message!= 'success'){
                       that.htmlx=res.data.message
                      return false 
                    }else{
                  // 倒计时
                 const TIME_COUNT = 90;   
                  if (!that.timer) {
                    that.count = TIME_COUNT;
                    that.show = false;
                    that.timer = setInterval(() => {
                    if (that.count > 0 && that.count <= TIME_COUNT) {
                      that.count--;
                     } else {
                      that.show = true;
                      clearInterval(that.timer);
                      that.timer = null;
                     }
                    }, 1000)
                   }
                    }
                    
              })
               }
            },
            // 提交
            postForms:function(){
                let that = this
                let type=''
                let channelId=''
                if(that.flag==1){
                   channelId='ALIPAY_WAP'
                   type=2          
                }else if(that.flag==2){
                   channelId='OFFLINE_BANK'
                   type=3
                }
                
                  if(that.name ==''){
                    that.htmlx='姓名不能为空'
                    return false
                   }
                   if(that.namecard ==''){
                    that.htmlx='身份证号码不能为空'
                    return false
                   }
                   if(that.phone ==''){
                    that.htmlx='手机号码不能为空'
                    return false
                   }
                   let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    let flag = reg.test(that.phone)
                    if(!flag){
                        this.htmlx="手机号码不正确"
                        return false
                    }
                   if(that.verification ==''){
                    that.htmlx='验证码不能为空'
                    return false
                   }

                   that.htmlx=''
                   
                let money=that.money * 100
              
                 commonService.postForms({channelId:channelId,channelUser:that.account,phone:that.phone,type:type,idCard:that.namecard,userName:that.userName,smsCode:that.verification,smsType:7,amount:money,realName:that.name,userBankName:that.userBankName,userBank:that.userBank,userBankCardNo:that.userBankCardNo,userBankProvince:that.userBankProvince,userBankCity:null,userBankDetail:that.userBankDetail}).then(function(res){                    //市
                    // console.log(res)
                    if(res.data.message=='success'){
                       that.oddNumbers=res.data.datas 
                       that.getForms()
                       that.index=3
                    // }, 1000)
                    }else{
                        that.htmlx=res.data.message
                    }
                 })
            },
             getForms:function(){
                let that = this;
                 commonService.getForms(that.oddNumbers).then(function(res){
                    that.list=res.data.datas
                    console.log(res)
                    that.card=card.bankCardAttribution(that.list.userBankCardNo)
                    
                 })
            },
         
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
  .cashstep{
    position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
     
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
    
        margin-bottom: 1.2rem;
        padding: 0 @size10;
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
                }
                input{
                    width: 2rem;
                    height: 1rem;
                    float: right;
                    border: none;
                    outline: none;
                    font-size: @size12;
                    // color: red;
                    // font-weight: bold;
                    text-align: right;
                    background: #fff;
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
                        margin-left: -@size20;
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
                        margin-left: -@size20;
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
                height: 1rem;
                float: left;
                border: none;
                outline: none;
                font-size: @size12;
                background: #fff;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: @size12;
                padding-top: @size1;
                box-sizing: border-box;
                img{
                    height: 1rem;
                }
                .span1{
                    font-size: @size12;
                    font-weight: bold;
                    color: black;
                }
                .span2{
                    width: 3rem;
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
                margin-right: 0.1rem;
                .more{
                    font-weight: bold;
                    letter-spacing: @size3;
                    text-align: right;
                    line-height: @size35;
                }
            }
        }
    }
    .footer1t{
         width:100%;
        height:0.67rem;
        line-height:0.67rem;
        color:#fff;
        background:linear-gradient(70deg, #DC704A, #F44EA0);
        text-align: center;
        font-size:12px;
        position:fixed;
        bottom:1.2rem;
        
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

