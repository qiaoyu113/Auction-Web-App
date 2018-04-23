<template>
    <!--title为当前页标题组件要小，如遇list，只将item做成组件，其他的都写在页面中-->
    <!-- 订单详情-订单关闭 -->
    <div class="close-order" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="" @click="Return()"><i class="iconfont icon-fanhui"></i></span> 
            <span class="span1 display" ><img src="../../assets/image/mycenter/sc.png" @click="deleteorder(datas.orderNo)"/></span>
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
                <div class="pic fl"><img v-if="orderDetail.picItems!=null" :src="picHead + orderDetail.picItems[0]" alt=""></div>
                <div class="box fl">
                    <div class="money">{{orderDetail.finalPrice | money}}CNY</div>
                    <div class="title">{{orderDetail.auctionName}}</div>
                    <div class="number">LOT-{{orderDetail.auctionNo}}</div>
                </div>
            </div>
            <div class="totalMoney clearfix">
                <div class="fl">订单总额</div>
                <div class="fr">{{datas.amount | money}} CNY</div>
            </div>
            <div class="moneys">
                <div class="price clearfix"><div class="fl">拍品价格:</div><div class="fr">{{orderDetail.finalPrice | money}} CNY</div></div>
                <div class="price clearfix"><div class="fl">保险+运费:</div><div class="fr">{{freight / 100 | money}} CNY</div></div>
            </div>
            <div class="orderinfo">
                <div class="price clearfix"><div class="fl">订单编号:</div><div class="fr">{{datas.orderNo}}</div></div>
                <div class="price clearfix" v-if="time.creatPayTime!=null&&time.creatPayTime!=''"><div class="fl">支付时间:</div><div class="fr">{{time.creatPayTime | stampFormate2}}</div></div>
                <div class="price clearfix"><div class="fl">支付方式:</div>
                      <div class="fr"  v-if="datas.channelId=='ALIPAY_WAP'">支付宝</div>
                      <div class="fr"  v-if="datas.channelId=='WX_NATIVE'">微信</div>
                      <div class="fr"  v-if="datas.channelId=='OFFLINE_BANK'||datas.channelId==''">线下转账</div>
                </div>
            </div>
        </div>
        <div class="v_modal" ref="v_modal" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="heigorder()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">REMOVE ITEM</p>
                 <p>删除</p>
                 <div class="v_box_img"><img src="../../assets/image/mycenter/scy.png" /></div>
                 <p>是否删除订单?</p>
                 <div class="v_button" @click='deleteOrderid()'> 
                     确定
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
          title:'茗探',
          orderNo: this.$route.query.id,
          datas:'',
          orderDetail:'',
          adress:'',//地址
          // logistics:'',//物流
          // logisticss:'',//物流列表
          logistic:'',
          arrays: [],
          dis:'dis',
          time:'',//支付时间
          freight:'',  //保险运费
          v_modal:false,
          deleteorderid:'',//删除订单ID

          
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
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
        
        common.onMove('.close-order')
        this.getOrderid()
    },
    methods: {

         Return:function(){
              this.$router.push({path:"/myorder",query:{index:0}})
         },
        // 获取订单
         getOrderid:function(){
            let that=this;
            commonService.getOrderid(that.orderNo).then(function(res){
              
                if(res.data.code==200){
                  that.datas=res.data.datas
                  if(that.datas.payLogs!=null){
                  let payLogs=that.datas.payLogs
                  that.time=payLogs[payLogs.length-1]
                
                  }
                 

                that.orderDetail=that.datas.orderDetail
                 if(that.orderDetail.finalPrice < 200000){
                     that.freight=200000
                   }else{
                     that.freight=that.orderDetail.finalPrice
                   }
                that.adress=that.orderDetail.adress  
                }
                
           
            })
          },
          // 取消删除
            heigorder:function(){
                   this.v_modal=false
                   this.deleteorderid=''
            },
            // 删除订单
            deleteorder:function(id){
                this.v_modal=true
                this.deleteorderid=id
            },
            deleteOrderid:function(){
                   let that=this;
                
               commonService.deleteOrderid(that.deleteorderid).then(function(res){
                       
                          that.v_modal=false
                          that.$router.push({path:"/myorder",query:{index:0}})
                    })
            },
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .close-order{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 0;
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
                color:#a9aeb6;
                margin-left: 0.3rem;
                line-height: @size35;
                
            }
        }
        .span1{
            float: right;
            padding-right: 20px;
            display: none;
            img{
                 width: 0.4rem;
                margin-top: @size8;
            }
        }
        .display{
            display: block;
        }
    }
    .content{
        // margin-top: @size80;
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
                    width: @size6;
                    height: @size6;
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
                font-size: 12px;
                color: black;
                span{
                    float: left;
                    font-size: 12px;
                }
            }
            div{
                padding-right: @size10;
                font-size: 12px;
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
                overflow: hidden;
                margin-left: @size10; 
                display: inline-block;
                img{
                    width: 2.75rem;
                      height: 2.1333rem;
                      margin-left: -0.35rem;
                      vertical-align: top;
                }
            }
            .box{
                display: inline-block;
                margin-left: @size15;
                padding-top: @size10;
                .money {
                    font-size: 13px;
                    font-weight: bold;
                }
                .title {
                    font-size: 12px;
                    color: rgb(133, 133, 133);
                    padding-top: @size1;
                    height: 20px;
                    line-height: 20px;
                     width: 174px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap; 
                }
                .number {
                    font-size: 10px;
                    color: rgb(133, 133, 133);
                    padding: 0 0 @size25 0;
                    line-height: @size10;
                }
            }
            
        }
        .totalMoney{
            height: @size40;
            // width: 8.933rem;
            border-bottom: 1px solid rgb(129, 135, 140);
            margin-left: @size10;
            line-height: @size40;
            .fl{
                font-size: 12px;
            }
            .fr{
                font-size: 13px;
                font-weight: bold;
                color: #fc5500;
                margin-right: 0.2667rem;
            }
        }
        .moneys{
            box-sizing: border-box;
            padding: @size5 @size10;
            border-bottom: 1px solid rgb(129, 135, 140);
            height: @size50;
            div{
                font-size: 12px;
                line-height: @size20;
            }
        }
        .orderinfo{
            padding: @size5 @size10;
            div{
                font-size: 12px;
                line-height: @size20;
            }
        }
    }
    .v_modal{
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background: rgba(0,0,0,0.5);
         
          
          .v_box{
            width: 6.5rem;
            height: 6.6rem;
            background: #fff;
            margin: 4rem auto 0; 
            position: relative;
            .v_box_top{
                 position: absolute;
                 right: 0;
                 top: 0;
                 width: @size30;
                 height: @size30;
                 background: #eb6100;
                 i{
                    font-size: @size30;
                    color:#fff;
                 }
            }
            .v_box_p{
                 padding-top: @size50;
                 font-size: 14px;
                 color: rgb(57, 57, 57);
                 font-weight: 700;
            }
            .v_box_img{
                 margin:@size24 0 @size14; 
                 width: 100%;
                 img{
                    width: @size40;
                    height: @size40;
                    margin-left: 2.72rem;
                 }
            }
            p{
                font-size: 14px;
                text-align: center;
                color: rgb(98, 98, 98);
                // padding:1rem 0.5rem;
                
            }
            .v_button{
               position: absolute;
               bottom: 0;
               left: 0;
               height: @size44;
               width: 100%;
               border-top:1px solid #353c47;
               text-align: center;
               line-height: @size44;
               font-size: 14px;
             }
          }
    }
    }
</style>

