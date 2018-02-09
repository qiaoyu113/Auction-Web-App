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
    <div class="" id="" v-set-title="title">
        <div class="header">传家</div>
        <div class="nav">
            <span class="">&lt;</span> 
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
                    <input type="" placeholder="请输入金额" v-model="money"/>
                </div>
                <div class="info"><span>支付宝帐号</span>
                    <input type="" placeholder="请输入支付宝帐号" v-model="account"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>姓名</span>
                    <input type="" placeholder="请输入姓名" v-model="name"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
            <!-- 填写银行卡信息 -->
            <div  v-if='index==1&&flag==2'>
                <div class="info1"><span>提现金额</span>
                    <input type="" placeholder="请输入金额" v-model="money"/>
                </div>
                <div class="info"><span>姓名</span>
                    <input type="" placeholder="请输入收款方姓名" v-model="name"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>银行</span>
                    <input type="" placeholder="请选择银行" v-model="account"/>
                    <div class="infomore" @click='removeAccount'><i class="more">...</i></div>
                </div>
                <div class="info"><span>银行卡号</span>
                    <input type="" placeholder="请输入银行卡号" v-model="account"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>开户省市</span>
                    <input type="" placeholder="请选择开户省市" v-model="account"/>
                    <div class="infomore" @click='removeAccount'><i class="more">...</i></div>
                </div>
                <div class="info"><span>开户银行</span>
                    <input type="" placeholder="请输入开户银行" v-model="account"/>
                    <div class="infoClose" @click='removeAccount'><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
            <!-- 身份验证 -->
            <div  v-if='index==2'>
                <div class="info"><span>姓名</span>
                    <input type="" placeholder="请输入姓名" v-model="name"/>
                    <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>身份证号码</span>
                    <input type="" placeholder="请输入身份证号码" v-model="namecard"/>
                    <div class="infoClose" @click='removeNamecard'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>手机号码</span>
                    <input type="" placeholder="请输入手机号码" v-model="phone"/>
                    <div class="infoClose" @click='removePhone'><i class="iconfont icon-closeicon"></i></div>
                </div>
                <div class="info"><span>验证码</span>
                    <input type="" placeholder="请输入验证码"/>
                    <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
                </div>
            </div>
            <!-- 已完成 -->
            <div  v-if='index==3'>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">sjdhfkljasnckajsh</div>
                </div>
                <div class="info"><span>提现金额</span>
                    <div class="infoClose"><span class="span1">1,000CNY</span>
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose">2018.04.25 15:21</div>
                </div>
                <div class="info"><span>交易种类</span>
                    <div class="infoClose">支付宝提现</div>
                </div>
                <div class="info"><span>提现方式</span>
                    <div class="infoClose"><span class="span2">支付宝<br>123 </span>
                    </div>
                </div>
                <div class="info"><span>提现金额</span>
                    <div class="infoClose">已完成</div>
                </div>
            </div>
        </div>
        <div class="footer1" v-if='index==1||index==2'>下一步</div>
        <div class="footer1" v-if='index==3'>完成</div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
  export default {
    props: ['str'],
    data () {
      return {
          title:'支付宝提现',
          arrays: [],
          index:1,
          flag:2,
          money:'',//提现金额
          account:'',//支付宝账户
          namecard:'',//身份证号
          name:'',//名字
          phone:'',//手机号码

      }
    },
    components: {},
    mounted () {
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
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    
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
                    padding-right: @size3;
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
    
    
</style>

