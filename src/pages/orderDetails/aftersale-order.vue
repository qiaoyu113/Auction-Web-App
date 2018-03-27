<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 订单详情-订单售后 -->
    <!-- index四种状态
    0，退货失败
    1，退货中
    2，审核中
    3，退款成功 -->
    <div class="aftersale-order" id="" v-set-title="title">
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="" @click="Return()">&lt;</span> 
            <span class="span1" :class="index>2||index==0 ? 'display':'' ">c</span>
        </div>
        <div class="content">
            <div class="state">
                <div class="linecolor redline" v-if='index>0'>
                    <div class="circle pos1" :class="index>0 ? 'bgcolor':'' "></div>
                    <div class="circle pos2" :class="index>1 ? 'bgcolor':'' "></div>
                    <div class="circle pos3" :class="index>2 ? 'bgcolor':'' "></div>
                    <div class="label">
                        <span class="label1" :class="index>0 ? 'fontcolor':'' ">提交审核</span>
                        <span class="label2" :class="index>1 ? 'fontcolor':'' ">审核中</span>
                        <span class="label3" :class="index>2 ? 'fontcolor':'' ">已解决</span>
                    </div>
                </div>
                <div class=" linecolor1 redline" v-if='index==0'>
                    <div class="circle pos1 grayBg"></div>
                    <div class="circle pos2 grayBg"></div>
                    <div class="circle pos3 grayBg"></div>
                    <div class="label">
                        <span class="label1">提交审核</span>
                        <span class="label2">审核中</span>
                        <span class="label3">已解决</span>
                    </div>
                </div>
            </div>
            <div class="payment">
                <div class="witpay" v-if='index==0'>退货失败</div>
                <div class="witpay" v-if='index==1'>退货中</div>
                <div class="witpay" v-if='index==2'>审核中</div>
                <div class="witpay" v-if='index==3'>已退款</div>
                <div class="money" v-if='index>0'>{{datas.refundAmount | money}} CNY</div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix" v-if='index>0'><div class="fl">退回路径</div><div class="fr">线下转账</div></div>
                <div class="price clearfix" v-if='index>0'><div class="fl">差额原因</div><div class="fr">{{datas.amountReason}}</div></div>
                <div class="price clearfix" v-if='index==0'>货品属性特殊，无法进行退货。审核失败，客服驳回售后申请。如有问题，请联系售后</div>
            </div>
            <div class="v_helpCenter">
                <span class="fl">到账周期说明</span>
                <div class="fr icon">i</div>
                <a class="fr" @click="open()">查看说明</a>
            </div>
            <div class="itemInfo clearfix">
                <div class="pic fl"><img v-if="order.picItems!=null" :src="picHead + order.picItems[0]" alt=""></div>
                <div class="box fl">
                    <div class="money">{{order.finalPrice | money}}CNY</div>
                    <div class="title">{{order.auctionName}}</div>
                    <div class="number">LOT-{{order.auctionNo}}</div>
                </div>
            </div>
            <div class="totalMoney clearfix">
                <div class="fl">问题描述</div>
            </div>
            <div class="moneys">
                <div class="price clearfix">
                    <div class="fl">{{datas.problem}}</div>
                    <!-- <div class="fr">{{datas.dealTime}}</div> -->
                </div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix"><div class="fl">订单号:</div><div class="fr">{{datas.orderNo}}</div></div>
                <div class="price clearfix"><div class="fl">申请时间:</div><div class="fr">{{datas.dealTime | stampFormate2}}</div></div>
                <div class="price clearfix"><div class="fl">联系人:</div><div class="fr">{{adress.name}}</div></div>
                <div class="price clearfix"><div class="fl">手机号码:</div><div class="fr">{{adress.phone}}</div></div>
            </div>  
        </div>
        <div class="footer">联系售后</div>
        <!-- 到账周期说明弹窗 -->
        <div :class="dis">
            <div class="transparent"></div>
            <div class="popWin" >
                <div class="close" @click="close()"><i class="iconfont icon-closeicon"></i></div>
                <div class="titleEn">RULES</div>
                <div class="titleCh">到账周期说明</div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：</p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
                
                
            </div>
        </div>
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
          index:1,
          dis:'dis',
          orderNo:'',//订单ID
          datas:'',//售后数据
          id:this.$route.query.id,
          order:'',
          lists:'',
          adress:'',

        
          
      }
    },
    components: {},

    computed: {
 
    picHead(){
       return this.$store.state.picHead
      }
     },
    mounted () {
        
       common.onMove('.aftersale-order')
        this.getOrdercsid()
    },
    methods: {
        Return:function(){
            window.history.go(-1)
        },
        open:function(){
            // this.dis='';
             this.$router.push({path:"/helpcenter",query:{index:5}})
        },
        close:function() {
            this.dis='dis';
        },
        //获取订单详情
        getOrderid:function(){
            let that=this
            commonService.getOrderid(that.orderNo).then(function(res){
                if(res.data.code==200){
                 that.order=res.data.datas.orderDetail
                 that.lists=res.data.datas
                 that.adress=that.order.adress

                }
                

                    })
        },
          // 获取售后详情
        getOrdercsid:function(){
                let that=this;
               commonService.getOrdercsid(that.id).then(function(res){
               
                    if(res.data.code==200){
                     that.datas=res.data.datas
                     that.orderNo=that.datas.orderNo
                     that.getOrderid()
                     if(that.datas.status==1){
                         that.index=1
                     }else if(that.datas.status==2){
                          that.index=2
                     }else{
                          that.index=1
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
    .aftersale-order{
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
        margin-bottom: 1.2rem;
        box-sizing: border-box;
        padding: 0 @size10;
        .state{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            padding: 0 @size45;
            .linecolor{
                border-top: 0.08rem solid rgb(21, 179, 187);
            }
            .linecolor1{
                border-top: 0.08rem solid gray;
            }
            .redline{
                box-sizing: border-box;
                
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid rgb(21, 179, 187);
                    display: inline-block;
                    position: absolute;
                    background: white;
                }
                .grayBg{
                    background: gray;
                    border-color:gray; 
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                }
                .pos2{
                    top: -@size8;
                    left: 3.3rem;
                }
                .pos3{
                    top: -@size8;
                    right: -1px;
                }
                .bgcolor{
                    background: rgb(21, 179, 187);
                }
                .label {
                    margin-left: -1.5rem;
                    margin-right: -1.5rem; 
                    text-align: center;   
                    
                    .label1{
                        float: left;
                        font-size: @size16;
                        color: gray;
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
                    .fontcolor{
                        color: rgb(21, 179, 187);
                    }
                }
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
            .money{
                margin-top: @size6;
                line-height: @size30;
                font-size: @size15;
                color: rgb(21, 179, 187);
                float: right;
                padding: 0 @size10;
                
            }
        }
        .v_helpCenter{
                height: @size40;
                width: 100%;
                border-top: 1px solid rgb(130, 135, 140);
                border-bottom: 1px solid rgb(130, 135, 140);
                text-align: center;
                line-height: @size40;
                span{
                    padding-left:@size10;
                    font-size: 12px;
                    font-weight: bold; 
                }
                a{
                    font-size: @size10;
                    text-decoration: underline;
                    color: rgb(130, 135, 140);
                    margin-right: @size5;
                }
                .icon{
                    width: @size12;
                    height: @size12;
                    border: 1px solid rgb(130, 135, 140);
                    border-radius:50%; 
                    display: inline-block;
                    font-size: @size1;
                    line-height: @size12;
                    margin-top: @size14;
                    margin-right: @size10;
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
            
            div{
                font-size: @size12;
                line-height: @size20;
            }
            .price{
                position: relative;
                min-height: @size25;
                .fl{
                    float: left;
                    // width: 5rem;
                }
                .fr{
                   position: absolute;
                   right: 0;
                   bottom: 0;
                }
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
    .footer{
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
    //到账周期说明弹窗
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
    .explain1{
        padding: 0 @size10 @size25 @size10;
        text-align: left;
        .title{
            font-size: @size10;
            color: black;
            padding-bottom: @size4;
        }
        p{
            font-size: @size10;
            color: gray;
        }
    }
}    
}
</style>

