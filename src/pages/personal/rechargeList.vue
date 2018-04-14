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
    <div class="rechargeList">
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="" @click="Return()"><i class="iconfont icon-fanhui"></i></span> 
        </div>
        <div class="content">
            <div class="state">
                <div class="redline">
                    <div class="circle pos1" :class="index >=1 ?'v_red':''"></div>
                    <div class="circle pos2" :class="index >=2 ?'v_red':''"></div>
                    <div class="circle pos3" :class="index >=3 ?'v_red':''"></div>
                    <div class="label">
                        <span class="label1" :class="index >=1 ?'label4':''">确认银行卡信息</span>
                        <span class="label2" :class="index >=2 ?'label4':''">填写汇款信息</span>
                        <span class="label3" :class="index >=3 ?'label4':''">汇款完成</span>
                    </div>
                </div>
            </div>
          
            <!-- 填写银行卡信息 -->
            <div  v-if='index==1'>
                 <div class="v_block" v-for="list in bankCard" >
                   <div class="v_rows clearfix">
                     <p class="v_rows_l"><i class="iconfont icon-duihao"></i><span>银行账户</span></p>
                     <div class="v_rows_con">官方</div>
                     <div class="v_rows_r v_Hook" :class="bankCardId==list.id?'v_id':''" @click="bankId(list.id,list.cardNo)"><i class="iconfont icon-duihao"></i></div>
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
                    <p class="v_rows_l">开户行</p>
                    <p class="v_rows_r">{{list.bank}} {{list.subBank}}</p>
                   </div>
                 </div>
            </div>
            <!-- 填写银行卡信息 -->
            <div  v-if='index==2'>
                <div class="info clearfix">
                     <span>汇款人</span>
                    <input type="text" placeholder="请输入汇款人姓名" value="name" v-model="name"/>
                    <div class="infoClose" @click='remname()' v-if="name!=''"><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info clearfix"><span>银行卡号</span>
                    <input type="number" placeholder="请输入银行卡号" value="userBankCardNo" v-model="userBankCardNo" @blur="cardObtain()"/>
                    <div class="infoClose" @click='remuserBankCardNo()' v-if="userBankCardNo!=''"><i class="iconfont icon-closeicon"></i></div>
                </div>
                 <div class="info clearfix"><span>开户行</span>
                    <input type="text" placeholder="自动识别开户行" value="userBankDetail" v-model="userBankDetail" disabled="disabled" />
                    <!-- <div class="infomore" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div> -->
                </div>
               <div class="info1 clearfix"><span>汇款金额</span>
                     <span class="span">&nbsp;CNY</span>
                    <input type="number" placeholder="请输入金额" disabled="disabled" v-model="money"/>
                </div>
                <div class="info clearfix"><span>手机号码</span>
                    <input type="number" placeholder="请输入手机号码" value="phone" v-model="phone"/>
                    <div class="infoClose" @click='remphone()' v-if="phone!=''"><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
      
            <!-- 已完成 -->
            <div  v-if='index==3'>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">{{list.no}}</div>
                </div>
                <div class="info"><span>交易金额</span>
                    <div class="infoClose">
                         <span class="span1">{{list.amount | money}}&nbsp;CNY</span>
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose" v-if="list.applyTime!=null">{{list.applyTime | stampFormate2}}</div>
                </div>
                <div class="info"><span>交易种类</span>
                    <div class="infoClose" v-if="type!=4">充值</div>
                     <div class="infoClose" v-if="type==4">订单支付</div>
                </div>
                <div class="info"><span>支付方式</span>
                    <div class="infoClose">
                    <span class="span2" v-if="list.userBankCardNo!=null">{{list.userBankDetail}}<br>
                    <i>尾号{{list.userBankCardNo.substr(list.userBankCardNo.length-4)}}{{card.cardTypeName}}</i></span>
                    </div>
                </div>
                <div class="info"><span>状态</span>
                    <div class="infoClose" v-if="list.status==1" style="color:#eb6200;">处理中</div>
                    <div class="infoClose" v-if="list.status==2">已完成</div>
                    <div class="infoClose" v-if="list.status==3">交易失败</div>
                </div>
            </div>
        </div>
        <div class="footer1t" v-if="htmlx!=''">{{htmlx}}</div>
        <div class="footer1" v-if='index==1||index==2' @click="nextStep">下一步</div>
        <div class="footer1" v-if='index==3' @click="Routes()">完成</div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {common} from '../../assets/js/common/common'
import {card} from '../../assets/js/common/card.js'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          
          arrays: [],
          index:1,
          active:0,
          // flag:2,
          money:'',//充值金额
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
          lastNum:'',
          htmlx:'',
          type:'',
          orderNo:'',
          card:'',
      }
    },
    components: {},
    mounted () {
        // this.yi()
        // common.onMove('.rechargeList')
        document.body.addEventListener('touchmove', function (event) {
            // if (!evt._isScroller) {
                event.returnValue = true;
            // }
        },false)
        this.getBankCards()
        this.thtype()
        this.moneys()
    },
    methods: {

            Routes:function(){
                 if(this.type==1){
                     this.$router.push({path:"/myaccount"})   
                 }else{
                    this.$router.push({path:"/myorder",query:{index:0}})  
                 }
                  
            },
            cardObtain:function(){
                let that=this
                 // let pattern = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/,  
                 //       str = that.userBankCardNo.replace(/\s+/g, "");  
                     

                let cards=''
               cards=card.bankCardAttribution(that.userBankCardNo)
               that.userBankDetail=cards.bankName
               
                   if (that.userBankDetail==undefined) {  
                           that.htmlx='银行卡号不正确'
                           setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                           return false;  
                       } 
            },
            moneys:function(){
                if(this.type==1){
                   this.money=this.$route.query.money 
                }else{
                   this.money=this.$route.query.money / 100
                }
                this.orderNo=this.$route.query.orderNo

                
            },
            Return:function(){
                window.history.go(-1)
            },
            remname:function(){
              this.name=''
            },
            remuserBankCardNo:function(){
               this.userBankCardNo=''
            },
            remphone:function(){
              this.phone=''
            },
            thtype:function(){
               this.type=this.$route.query.type
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
                    if(this.bankCardId==''){
                        this.htmlx="请选择银行"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
                    this.index=2
                    this.htmlx=''
                }else if(this.index==2){
                     this.postForms()
                
                }

            },
            bankId:function(id,lastNum){
              this.bankCardId=id;
              this.lastNum=lastNum

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
                   if(that.name==''){
                        this.htmlx="请输入汇款人"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
               

                    if(that.userBankCardNo==''){
                        this.htmlx="请输入银行卡号"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
                    let pattern = /^([1-9]{1})(\d{14}|\d{18})$/,  
                       str = that.userBankCardNo.replace(/\s+/g, "");  
                       if (!pattern.test(str)) {  
                           that.htmlx='银行卡号不正确'
                           setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                           return false;  
                       }   
                          if(that.userBankDetail==''){
                        this.htmlx="请输入开户银行"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
                    if(that.phone==''){
                        this.htmlx="请输入手机号码"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
                    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    let flag = reg.test(that.phone)
                    if(!flag){
                        this.htmlx="手机号码不正确"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }
                    that.htmlx=''
                    let money = that.money * 100

               commonService.postForms({channelId:'OFFLINE_BANK',lastNum:that.lastNum,userBankDetail:that.userBankDetail,userBankCardNo:that.userBankCardNo,phone:that.phone,type:that.type,userBankName:that.name,amount:money,bankId:that.bankCardId,orderNo:that.orderNo}).then(function(res){
           
                    if(res.data.message=='success'){
                       that.oddNumbers=res.data.datas 
                       that.index=3
                       that.getForms()
                    }else{
                        that.htmlx=res.data.message
                        setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                    }
                    
                 })
            },
             //获取申请表信息
             getForms:function(){
                let that = this
                 commonService.getForms(that.oddNumbers).then(function(res){
                   
                    that.list=res.data.datas
                    that.card=card.bankCardAttribution(that.list.userBankCardNo)
                  
                 })
            },
            payYes(){
                let that = this;
                let channelIds = '';
                if(that.index === 1){//微信
                    channelIds = 'WX_JSAPI'
                }else if(that.index === 0){//余额
                    channelIds = 'OFFLINE_BANK'
                }else{//支付宝
                    channelIds = 'ALIPAY_WAP'
                }
                commonService.setbails({auctionId:that.id,channelId:channelIds}).then(function(res){
                  
                    if(res.data.code === 200){
                        if(that.index === 1){//微信支付
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                               
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
         
          //   max-width:10rem;
          //   position: fixed;
          //   top: 0;
          //   bottom: 1.2rem;
          //   left:0;
          //   right:0;
          //   overflow-y: scroll;
            // -webkit-overflow-scrolling:touch;
          
    // .header{
    //     position: fixed;
    //     top: 0;
    //     z-index: 100;
    //     width: @size375;
    //     height: @size45;
    //     background:rgba(2, 10, 2, 1);
    //     font-size: @size20;
    //     color: white;
    //     text-align: center;
    //     line-height: @size45;
    // }
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        span{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            // margin-left: 20px;
             i{
              font-size: 28px;
              margin-left: 0.3rem;
              color: #a9aeb6;
            }
        }
    }
    .content{
        margin-top: @size36;
        margin-bottom: 1.2rem;
        padding: 0 @size10;
        .v_block{
          border-bottom: 1px solid #c7cacb;
          .v_rows{
            margin: 0 @size10;
            border-bottom: 1px solid #e7ebee;
            line-height: 0.9rem;
                
            .v_rows_l{
              float: left;
              font-size: 12px;
              height: 0.9rem;
              line-height: 0.9rem;
              i{
                font-size: 14px;
                line-height: 0.9rem;

              }
              span{
                font-size: 12px;
                line-height: 0.9rem;
                margin-left: @size10;
              }
            }
            .v_rows_con{
              float: left;
              width: @size30;
              height: @size15;
              background: #15b3b2;
              margin-top: @size10;
              line-height: @size15;
              text-align: center;
              color: #fff;
              margin-left: @size10;
              font-size: 8px;
            }
            .v_rows_r{
              float: right;
              font-size: 12px;
                     color:#5b5b5b;
            }
            .v_Hook{
              width: @size10;
              height: @size10;
              border:2px solid #ccc;
              margin-top: @size10;
              i{
                        display: none;
                         font-size: 10px;
                         line-height: @size10;
                        // line-height: @size16;
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
                    font-size: 12px;
                    // padding-top: @size1;
                    padding-left: @size10;
                }
                .span{
                    float: right;
                    width: auto;
                    padding-left:0;
                    margin-right: 0.2rem;

                    font-weight: 700;
                }
                input{
                    width: 2rem;
                    height: 1rem;
                    float: right;
                    border: none;
                    outline: none;
                    line-height: 1.02rem;
                    font-size: 12px;
                    // color: red;
                    font-weight: 700;
                    text-align: right;
                    background: #fff;
                    // padding-right: @size3;
                }
                .infoClose{
                    float: right;
                    color:#87828c;
                    line-height: 1.02rem;
                    margin-right: 0.2rem;
                    font-size: 12px;
                    padding-top: @size1;
                }
        }
        .state{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid #c7cacb;
            box-sizing: border-box;
            padding: 0 @size45;
            .redline{
                box-sizing: border-box;
                border-top: 0.08rem solid #eb6000;
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size6;
                    height: @size6;
                    border-radius: 50%;
                    border: 3px solid #eb6000;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: #eb6000;
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
                    background: #eb6000;
                }
                .label {
                    margin-left: -2rem;
                    margin-right: -1.3rem; 
                    text-align: center;  
                    font-size: 10px;
                    .label1{
                        float: left;
                        color: #eb6000;
                        font-size: 12px;
                    }
                    .label2{
                        text-align: center;
                        font-size: 12px;
                        color: gray;
                    }
                    .label3{
                        float: right;
                        font-size: 12px;
                        color: gray;
                    }
                    .label4{
                        color: #eb6000;
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
                    border: 3px solid #eb6000;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: #eb6000;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                    background: #eb6000;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                }
                .label {
                    margin-left: -2rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        color: #eb6000;
                        font-size: 12px;
                    }
                    .label2{
                        text-align: center;
                        font-size: 12px;
                        color: #eb6000;
                    }
                    .label3{
                        float: right;
                        font-size: 12px;
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
                border-top: 0.08rem solid #eb6000;
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid #eb6000;
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: #eb6000;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                    background: #eb6000;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                    background: #eb6000;
                }
                .label {
                    margin-left: -2rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        color: #eb6000;
                        font-size: 12px;
                    }
                    .label2{
                        text-align: center;
                        font-size: 12px;
                        color: #eb6000;
                    }
                    .label3{
                        float: right;
                        font-size: 12px;
                        color: #eb6000;
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
                font-size: 12px;
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
                font-size: 12px;
                background: #fff;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: 12px;
                padding-top: @size1;
                // box-sizing: border-box;
                .span1{
                    font-size: 12px;
                    font-weight: bold;
                    color: black;
                    width: auto;
                }
             
                .span2{
                    width: 3rem;
                    display: inline-block;
                    line-height: @size14;
                    font-size:12px;
                    text-align: right;
                    padding-top: @size6;
                    i{
                      font-size: 10px;
                      color:#ccc;
                    }
    
                }
                
            }
            .infomore{
                float: right;
                color:#87828c;
                line-height: 1rem;
                font-size: 12px;
                // padding-top: @size1;
                // box-sizing: border-box;
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
        left: 0;
        z-index: 999;
        
    }
    .footer1{
        position:fixed;
        bottom:0;
        left: 0;
        z-index: 999;
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

