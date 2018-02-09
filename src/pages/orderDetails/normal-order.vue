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
    <div class="" id="" v-set-title="title">
        <div class="header">传家</div>
        <!-- 返回键,当订单完成时有删除icon -->
        <div class="nav">
            <span class="">&lt;</span> 
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
                <div class="btn">更改支付方式</div>
            </div>
            <div  v-if='index==2||index==3'>
               <div class="logistic">
                    物流信息<span class="fr">...</span>
                </div>
                <div class="logdetail">
                    <div>顺风速运</div>
                    <div>暂无物流信息</div>
                    <div>2018.04.11 09:06:33</div>
                </div> 
            </div>
            <div class="address">
                <div class="peo"><span>李先生</span>  134 9766 9923</div>
                <div>北京市 北京市 东城区</div>
                <div>XX街道建外soho 12-2202</div>
            </div>
            <div class="itemInfo clearfix">
                <div class="pic fl"><img src="../../assets/image/myimage/eg.gif" alt=""></div>
                <div class="box fl">
                    <div class="money">300,00CNY</div>
                    <div class="title">器物器物器物</div>
                    <div class="number">20180709-2</div>
                </div>
            </div>
            <div class="totalMoney clearfix">
                <div class="fl">订单总额</div>
                <div class="fr">50,500 CNY</div>
            </div>
            <div class="moneys">
                <div class="price clearfix"><div class="fl">拍品价格:</div><div class="fr">50,000 CNY</div></div>
                <div class="price clearfix"><div class="fl">保险+运费:</div><div class="fr">500 CNY</div></div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix"><div class="fl">订单编号:</div><div class="fr">308796987864</div></div>
                <div class="price clearfix"><div class="fl">支付方式:</div><div class="fr"  v-if='index>0&&index<4'>微信</div><div class="fr"  v-if='index==0'>线下转账</div></div>
            </div>
        </div>
        <div class="footer1" v-if='index==1'>支&nbsp;&nbsp;&nbsp;付</div>
        <div class="footer" v-if='index==3'>
            <div class="value">
                分&nbsp;&nbsp;&nbsp;享
            </div>
            <div class="r-icon" ><i class="iconfont icon-duigoudunpai"></i></div>
        </div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
  export default {
    props: ['str'],
    data () {
      return {
          title:'订单详情-订单正常',
          arrays: [],
          index:0,
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {}
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
    
</style>

