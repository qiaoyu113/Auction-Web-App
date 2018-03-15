<template>
    <!--title为当前页标题组件要小，如遇list，只将item做成组件，其他的都写在页面中-->
    <!-- 订单详情-订单关闭 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
            <span class="">&lt;</span> 
            <span class="span1 display" >c</span>
        </div>
        <div class="content">
            <div class="state">
                <div class="redline">
                    <div class="circle pos1"></div>
                    <div class="circle pos2"></div>
                    <div class="circle pos3"></div>
                    <div class="label">
                        <span class="label1">订单关闭</span>
                    </div>
                </div>
            </div>
            
            <div class="address">
                <div class="peo"><span>{{adress.name}}</span>   {{adress.phone}}</div>
                <div>{{adress.provinceName}} {{adress.cityName}} {{adress.districtName}}</div>
                <div>{{adress.detailAdress}}</div>
            </div>
            <div class="itemInfo clearfix">
                <div class="pic fl"><img src="../../assets/image/myimage/eg.gif" alt=""></div>
                <div class="box fl">
                    <div class="money">{{orderDetail.finalPrice}}CNY</div>
                    <div class="title">{{orderDetail.auctionName}}</div>
                    <div class="number">{{datas.createTime}}-{{orderDetail.auctionNo}}</div>
                </div>
            </div>
            <div class="totalMoney clearfix">
                <div class="fl">订单总额</div>
                <div class="fr">{{datas.amount}} CNY</div>
            </div>
            <div class="moneys">
                <div class="price clearfix"><div class="fl">拍品价格:</div><div class="fr">{{orderDetail.finalPrice}} CNY</div></div>
                <div class="price clearfix"><div class="fl">保险+运费:</div><div class="fr">{{orderDetail.finalPrice / 100}} CNY</div></div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix"><div class="fl">订单编号:</div><div class="fr">{{orderDetail.adminId}}</div></div>
                <div class="price clearfix" v-if="time.status==2"><div class="fl">支付时间:</div><div class="fr">{{time.creatPayTime}}</div></div>
                <div class="price clearfix"><div class="fl">支付方式:</div>
                      <div class="fr"  v-if="datas.channelId=='ALIPAY_WAP'">支付宝</div>
                      <div class="fr"  v-if="datas.channelId=='WX_NATIVE'">微信</div>
                      <div class="fr"  v-if="datas.channelId=='UNIONPAY'">线下转账</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'线下转账',
          arrays: [],
          orderNo: this.$route.query.id,
          datas:'',
          orderDetail:'',
          adress:'',//地址
          // logistics:'',//物流
          // logisticss:'',//物流列表
          logistic:'',
          arrays: [],
          dis:'dis',
          time:''//支付时间

          
      }
    },
    components: {},
    computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },

        },
    mounted () {
        this.getOrderid()
    },
    methods: {
        // 获取订单
         getOrderid:function(){
            let that=this;
            console.log(that.orderNo)
            commonService.getOrderid(that.orderNo).then(function(res){
                console.log(res)
                if(res.data.code==200){
                  that.datas=res.data.datas
                 let payLogs=that.datas.payLogs
                 that.time=payLogs[payLogs.length-1]
                that.orderDetail=that.datas.orderDetail
                that.adress=that.orderDetail.adress  
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
        
        .state{
            height: @size80;
            width: 100%;
            border-bottom: 1px solid rgb(129, 135, 140);
            box-sizing: border-box;
            padding: 0 @size45;
            .redline{
                box-sizing: border-box;
                border-top: 0.08rem solid rgb(169, 174, 180);
                padding: @size30;
                padding-top: @size15;
                position: relative;
                top: @size25;
                .circle{
                    width: @size9;
                    height: @size9;
                    border-radius: 50%;
                    border: 3px solid rgb(169, 174, 180);
                    display: inline-block;
                    position: absolute;
                    
                    background: white;
                }
                .pos1{
                    top: -@size8;
                    left: -1px;
                    background: rgb(169, 174, 180);
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
                        color: black;
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
    
</style>

