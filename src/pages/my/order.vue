<template>

    <div class="order">
        <div class="top">
            <p class="top_p1">PLACE ORDER</p>
            <p class="top_p2">提交订单</p>
        </div>
        <div class="time clearfix">
            <p class="time_l">请在规定时间内支付，超时则扣除保证金</p>
            <div class="time_r clearfix ">
                <div>00</div>
                <p>:</p>
                <div>00</div>
                <p>:</p>
                <div>00</div>
                <p>:</p>
                <div>00</div>
            </div>
        </div>
        <!-- 地址 -->
        <div class="address clearfix" v-if="address!=null">
            <div class="address_l">
                <p>{{address.name}}</p>
            </div>
            <div class="address_r" @click="jump()">
                <i class="iconfont icon-shezhi"></i>
            </div>
            <div class="address_con">
                <p>{{address.phone}}</p>
                <div>
                    <p>{{address.provinceName}} {{address.cityName}} {{address.districtName}}</p>
                    <p>{{address.detailAdress}}</p>
                </div>
            </div>
        </div>
        <div class="address clearfix" v-if="address==null">
            <div class="address_l">
                <p>地址</p>
            </div>
            <div class="address_rr" @click="jump()">
                <i class="iconfont icon-shezhi"></i>
            </div>
         
        </div>
        <!-- 颜色条 -->
        <div class="color_bar"></div>
        <!-- 拍品支付 -->
        <div class="payment">
            <div class="goods clearfix">
                <div class="goods_l" v-if="picItems!=''">
                    <img :src="picHead + picItems" />
                    
                </div>
                <div class="goods_r">
                    <p class="p1">{{datas.finalPrice}} CNY</p>
                    <p class="p2">{{datas.marketName}}</p>
                    <p class="p3">{{datas.auctionEndTime}}-{{datas.marketNo}}</p>
                </div>
            </div>
            <div class="money">
                <div class="total clearfix">
                    <div class="total_l">订单总额</div>
                    <div class="total_r">{{datas.finalPrice + datas.finalPrice / 100}} CNY</div>
                </div>
                <div class="scattered clearfix">
                    <div class="scattered_l">
                        <p>拍品价格 : </p>
                        <p>保险+运费 : </p>
                    </div>
                    <div class="scattered_r">
                        <p>{{datas.finalPrice}} CNY</p>
                        <p>{{datas.finalPrice / 100}} CNY</p>
                    </div>
                </div>
            </div>
              <!-- 支付方式 -->
                <div class="payment_method">
                    <div class="payment_top">支付方式</div>
                    <div class="ros clearfix" :class="{'ros_ll':index==1}" @click="selected(1)">
                        <div class="ros_l"><span>✔</span></div>
                        <div class="ros_con"><i class="iconfont icon-icon_weixinzhifu"></i></div>
                        <div class="ros_r">
                           <p>微信支付</p>
                           <p>单笔最高5.000-50.000CNY</p>
                        </div>
                    </div>
                    <div class="ros clearfix" :class="{'ros_ll':index==2}" @click="selected(2)">
                        <div class="ros_l"><span>✔</span></div>
                        <div class="ros_con"><i class="iconfont icon-icon_zhifubao"></i></div>
                        <div class="ros_r">
                           <p class="linh">支付宝支付</p>
                           
                        </div>
                    </div>
                    <div class="ros clearfix" :class="{'ros_ll':index==3}" @click="selected(3)">
                        <div class="ros_l"><span>✔</span></div>
                        <div class="ros_con"><i class="iconfont icon-icon_zhifubao"></i></div>
                        <div class="ros_r">
                           <p class="linh">转账汇款</p>
                        </div>
                    </div>

                </div>

        </div>
        <div class="botton" @click="postOrders()">
            <div>提交订单</div>
        </div>

    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '订单确认',
                index:1,
                address:'',
                datas:'',
                picItems:'',
                payLimitTime:'',//超时
                auctionId:this.$route.query.auctionId,
                addressId:this.$route.query.addressId,
            }
        },
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
            picHead(){
                return this.$store.state.picHead
            }

        },
        mounted: function() {
            
            this.addresst()
            this.getAuctions()
        },
        methods: {
            addresst:function(){
                if(this.addressId==undefined){
                   this.getDefault()
                }else{
                    this.getAddressid()
                }
            },
            jump:function(){
               this.$router.push({path:"/my/selection",query:{auctionId:this.auctionId}})
            },
            //获取默认地址 
            getDefault:function(){
                console.log(this.addressId)
                 let that=this;
                 commonService.getDefault().then(function(res){
                    console.log(res)
                    if(res.data.datas!=null){
                        that.address=res.data.datas
                    }
                })
            },
            //获取详情地址地址 
            getAddressid:function(){
                 let that=this;
                 commonService.getAddressid(that.addressId).then(function(res){
                    // console.log(res)
                    if(res.data.datas!=null){
                        that.address=res.data.datas
                    }
                   // that.address=res.data.datas
                })
            },
            selected:function(id){
                 this.index=id
            },
            //获取订单
            getAuctions:function(){
                 let that=this;
                 commonService.getAuctions(that.auctionId).then(function(res){
                    if(res.data.code==200){
                   that.datas=res.data.datas
                   // console.log(that.datas)
                   that.picItems=that.datas.picItems[0]
                   // console.log(that.datas)
                    }
                })
            },
            // 提交订单
            postOrders:function(){
                let that=this;
                let channelIds=''
                 if(that.index === 1){//微信
                    channelIds = 'WX_JSAPI'
                }else if(that.index === 3){//转账汇款
                    channelIds = 'UNIONPAY'
                }else if(that.index === 2){//支付宝
                    channelIds = 'ALIPAY_WAP'
                }
                 commonService.postOrders(that.auctionId,{addressId:that.address.id,channelId:channelIds}).then(function(res){
                    console.log(res)
                    if(res.data.code==200){
                   // that.datas=res.data.datas
                   // that.picItems=that.datas.picItems[0]
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .order{
       .top{
          padding: @size50 @size20;
          border-bottom: 2px solid rgb(53,60,70);
          .top_p1{
            font-size: 14px;
            color: rgb(51,51,51);
          }
          .top_p2{
            font-size: 12px;
            color: rgb(51,51,51);
            margin-top: @size10;
          }

       }
       .time{
         padding: 0 @size10;
         background-color: red;
         height: 1rem;
         .time_l{
            float: left;
            color: #fff;
            font-size: 6px;
            line-height: 1rem;

         }
         .time_r{
            float: right;
            margin-top: 0.22rem;
            div{
                float: left;
                width: 0.56rem;
                height: 0.56rem;
                background-color: rgb(0,0,0);
                font-size: 9px;
                text-align: center;
                line-height: 0.56rem;
                border-radius: 3px;
                color: #fff;
            }
            p{
                float: left;
                padding:0 2px;
                color: #fff;
                font-size: 11px;
            }
         }
       }
       .address{
          padding: @size15 @size20 @size10;
          .address_l{
            float: left;
            p{
                font-size: 11px;
                color: rgb(51,51,51);
            }
          }
          .address_r{
            float: right;
            padding-left: @size20;
            border-left: 1px solid rgb(217,217,217);
            line-height: 1.3rem;
            margin-left: @size20;
            i{
                font-size: 12px;
                color: rgb(169,174,180);
            }
          }
          .address_rr{
            float: right;
            padding-left: @size20;
            border-left: 1px solid rgb(217,217,217);
            // line-height: 1.3rem;
            margin-left: @size20;
              i{
                font-size: 12px;
                color: rgb(169,174,180);
            }
          }
          .address_con{
                float: right;
                p{
                    font-size: 11px;
                    color: rgb(51,51,51);
                    text-align: right;
                }
                div{
                    margin-top: 0.1rem;
                    p{
                        font-size: 10px;
                        color: rgb(102,102,102);
                    }
                }
          }

       }
       .color_bar{
        height: 4px;
        background-color: red;
       }
       .payment{
          .goods{
            margin: @size15 @size10 0;
            padding-bottom: @size10;
            border-bottom: 1px solid rgb(53,60,70);
            .goods_l{
                float: left;
                width: 2.1333rem;
                height: 2.1333rem;
                margin-left: @size10;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .goods_r{
                float: left;
                margin-left: @size15;
                .p1{
                   font-size: 13px;
                   color: rgb(51,51,51);
                   font-weight: 700;
                }
                .p2{
                    font-size: 11px;
                    color: rgb(77,77,77);
                }
                .p3{
                    font-size: 9px;
                    color: rgb(77,77,77);
                }
            }
          }
          .money{
            margin:0 @size10;
            border-bottom: 1px solid rgb(53, 60, 70);
            .total{
                height: @size40;
                margin: 0 @size10;
                border-bottom: 1px solid rgb(224,224,224);
                .total_l{
                    float: left;
                    // margin-left: @size10;
                    line-height: @size40;
                    color: rgb(53,60,70);
                    font-size: 13px;
                }
                .total_r{
                    float: right;
                    // margin-right: @size10;
                    line-height: @size40;
                    color: rgb(221,112,74);
                    font-size: 13px;
                }
            }
            .scattered{
                margin:@size8 @size10;
                .scattered_l{
                   float: left;
                   // margin-left: @size10;
                   p{
                    font-size: 11px;
                   line-height: 15px;
                   color: rgb(51,51,51);
                   }
                   
                }
                .scattered_r{
                    float: right;
                    // margin-right: @size10;
                    p{
                      font-size: 11px;
                      line-height: 15px;
                      color: rgb(51,51,51); 
                      text-align: right; 
                    }
                }
            }
          } 
          .payment_method{
             margin:0 @size10;
            // border-bottom: 1px solid rgb(53, 60, 70);

                .payment_top{
                    height: @size40;
                    margin: 0 @size10;
                    line-height: @size40;
                    font-size: 11px;
                    color: rgb(51,51,51);
                    border-bottom: 1px solid rgb(224,224,224);
                }
                .ros{
                    border-bottom: 1px solid rgb(224,224,224);
                    padding: @size13 0;
                    margin: 0 @size10;
                    .ros_l{
                        float: left;
                        width: @size10;
                        height: @size10;
                        margin-top: @size6;
                        text-align: center;
                        border:2px solid rgb(224,224,224);
                        span{
                            font-size: @size6;
                            color:rgb(224,224,224);
                            line-height: @size10;
                           
                        }
                    }
                    .ros_con{
                        float: left;
                        margin: 0 @size10;
                        i{
                          font-size: @size26;  
                          color:rgb(224,224,224);
                        }
                        
                    }
                    .ros_r{
                        float: left;
                        p{
                            font-size: 10px;
                            line-height: @size13;
                        }
                        .linh{
                            line-height: @size26;
                        }
                    }
                }
               .ros_ll{
                        .ros_l{
                        border:2px solid #15b3b2;
                        span{
                            font-size: @size6;
                            color:#15b3b2;
                            line-height: @size10;
                           }
                        }
                        .ros_con{
                            i{
                              color:#4dbc4c;  
                            }
                        }
                    }
            }
       }
       .botton{
          height: @size45;
          div{
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: @size45;
            background: #fff;
            border-top: 1px solid rgb(53,60,70);
            text-align: center;
            line-height: @size45;
            font-size: 12px;
          }
       }


    }
</style>

