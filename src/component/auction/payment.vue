<template>
    <div :class="dis">
        <div class="transparent"></div>
        <div class="popWin" >
            <div class="close" @click="close()"><i class="iconfont icon-closeicon"></i></div>
            <div class="payEn">PAYMENT</div>
            <div class="payCh">支付保证金</div>
            <div class="remind">当前保证金金额不可出价 <span>201,000 CNY</span><br/>
            保证金额不足请充值</div>
            <div class="warn">需补交纳金额</div>
            <div class="value">
                <span class="btn1">-</span>
                <span class="price">203,000 CNY</span>
                <span class="btn2">+</span>
            </div>
            <div class="worthy">
                <div class="tit">可拍金额</div>
                <div class="money">201,000 CNY</div>
            </div>
            <div class="explain"><span>1,000 CNY</span>保证金可拍<span>10,000 CNY</span>金额<br/>
            充值金额只可高于当前金额</div>
            <div class="payway">支付方式</div>
            <!-- :class="checked ? 'login' : 'login1'" @click="getMenu(1)" -->
            <div class="pay" @click="getIndex(1)">
                <div :class="index==1 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <i :class="index==1 ? 'background1' : ''" class="iconfont icon-icon_weixinzhifu"></i>
                <div class="infoWexin">
                    <div class="span1">微信支付</div>
                    <div class="span2">单笔最高5,000-50,000 CNY</div>
                </div>
            </div>
            <div class="pay" @click="getIndex(2)">
                <div :class="index==2 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                <i :class="index==2 ? 'background2' : ''" class="iconfont icon-icon_zhifubao"></i>
                <div class="infoAlipay">支付宝支付</div>
            </div>
            <div class="footer">充&nbsp;&nbsp;值</div>
        </div>
    </div>
   
   
</template>
<script type="text/ecmascript-6">
import priceRecord from'../../component/auction/priceRecord'
  export default {
    data () {
      return {
          arrays: [],
          index:1,
          dis:'',
         
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        getIndex: function(index) {
            let that = this;
            if(index==1){
                that.index=1
            }else{
                that.index=2
            }
        },
        close:function() {
            let that = this;
            that.dis='dis'
        }
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
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
    // display: none;
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
    .payEn{
        padding-top: @size50;
        font-size:@size14;
        font-weight: bold;
    }
    .payCh{
        font-size: 11px;
        color: rgb(51, 51, 51);
        line-height: @size11;
    }
    .remind{
        padding: @size25 0;
        font-size: 12px;
        span{
            color: red;
            font-size: 12px;
            font-weight: bold;
        }
    }
    .warn{
        border-top: 1px solid rgb(129, 135, 140);
        text-align: left;
        height: @size40;
        font-size: 10px;
        line-height: @size40;
    }
    .value{
        width: 100%;
        height: @size40;
        line-height: @size40;
        position: relative;
        text-align: center;
        border: 1px solid rgb(129, 135, 140);
        .btn1{
            width: 1.46rem;
            position: absolute;
            left: 0;
            top: -3px;
            font-size: 50px;
            line-height: 40px;
            color: red;
        }
        .btn2{
                
            width: 1.46rem;
            position: absolute;
            right: 0;
            top: -3px;
            font-size: 35px;
            line-height: 40px;
            color: red;
        }
        .label{
            font-size: 10px;
        }
        .price{
            font-size: 11px;
            width: 2.68rem;
            font-weight: bold;
        }
    }
    .worthy{
        box-sizing: border-box;
        height: 1.52rem;
        border-bottom: 1px solid rgb(129, 135, 140);
        padding-top: 10px;
        .tit{
            font-size: 10px;
            color: rgb(129, 135, 140);
        }
        .money{
            font-size: 11px;
            font-weight: bold;
        }
    }
    .explain{
        font-size: 10px;
        color: rgb(129, 135, 140);
        text-align: left;
        box-sizing: border-box;
        padding-top: @size10;
        span{
            font-weight: bold;
            font-size: 10px;
            color: #000;

        }
    }
    .payway{
        font-size: 14px;
        padding-top: @size25;
        text-align: left;
    }
    .pay{
        height: @size50;
        border-top: 1px solid rgb(129, 135, 140);
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
            color: rgb(107, 184, 105)
        }
        .background2{
            color: rgb(0, 157, 235)
        }
        .infoWexin{
            text-align: left;
            float: left;
            margin-left: @size10;
            margin-top: @size16;
            color: rgb(129, 135, 140);
            .span1{
                font-size: 13px;
                 line-height: @size13;
                 color: rgb(129, 135, 140);
            }
            .span2{
                font-size: 10px;
                line-height: @size10;
                color: rgb(129, 135, 140);
            }
        }
        .infoAlipay{
            text-align: left;
            float: left;
            margin-left: @size10;
            margin-top: 17px;
            color: rgb(129, 135, 140);
            font-size: 15px;
        }
    }
    
    .footer{
        height: @size45;
        box-sizing: border-box;
        border-top: 1px solid rgb(53, 60, 70);
        position: absolute;
        bottom: 0;
        left: 0;
        line-height: @size45;
        font-size: 14px;
    }
}
</style>