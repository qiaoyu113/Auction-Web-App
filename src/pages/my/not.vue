<template>

    <div class="not">
        <div class="box">
        <div class="now">
         <div class="ros clearfix" v-for="list in datas" v-if="list.auction.auctionEndTime>=week">
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice}} CNY</div>
                      <div class="ros_prompt">未竞价成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.auctionStatus==4">
                      <div class="ros_prompt">流拍</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.marketStatus==0">
                      <div class="ros_prompt">拍品以下架</div>
                 </div>

                 <div class="ros_l2">{{list.auctionCollect.newPrice}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">{{list.auction.auctionStartTime}}-{{list.auction.no}}</div>
             </div>
             <div class="ros_r"><img :src="picHead + list.auction.picItems[0]"/></div>
           
         </div>
       </div>
       <!-- 一周以前 -->
       <div class="week">
          <div class="ros clearfix" v-for="list in datas" v-if="list.auction.auctionEndTime<week&&list.auction.auctionEndTime>=month">
       <!-- 分割线 -->
           <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一周以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice}} CNY</div>
                      <div class="ros_prompt">未竞价成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.auctionStatus==4">
                      <div class="ros_prompt">流拍</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.marketStatus==0">
                      <div class="ros_prompt">拍品以下架</div>
                 </div>

                 <div class="ros_l2">{{list.auctionCollect.newPrice}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">{{list.auction.auctionStartTime}}-{{list.auction.no}}</div>
             </div>
             <div class="ros_r"><img :src="picHead + list.auction.picItems[0]"/></div>
           
         </div>
        </div> 
           <!-- 一月以前 -->
       <div class="week">
          <div class="ros clearfix" v-for="list in datas" v-if="list.auction.auctionEndTime<month&&list.auction.auctionEndTime>=march">
          <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一月以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice}} CNY</div>
                      <div class="ros_prompt">未竞价成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.auctionStatus==4">
                      <div class="ros_prompt">流拍</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.marketStatus==0">
                      <div class="ros_prompt">拍品以下架</div>
                 </div>

                 <div class="ros_l2">{{list.auctionCollect.newPrice}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">{{list.auction.auctionStartTime}}-{{list.auction.no}}</div>
             </div>
             <div class="ros_r"><img :src="picHead + list.auction.picItems[0]"/></div>
           
         </div>
        </div> 
           <!-- 三月以前 -->
       <div class="week">
          <div class="ros clearfix" v-for="list in datas" v-if="list.auction.auctionEndTime<march&&list.auction.auctionEndTime >= year">
           <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">三月以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice}} CNY</div>
                      <div class="ros_prompt">未竞价成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.auctionStatus==4">
                      <div class="ros_prompt">流拍</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.marketStatus==0">
                      <div class="ros_prompt">拍品以下架</div>
                 </div>

                 <div class="ros_l2">{{list.auctionCollect.newPrice}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">{{list.auction.auctionStartTime}}-{{list.auction.no}}</div>
             </div>
             <div class="ros_r"><img :src="picHead + list.auction.picItems[0]"/></div>
           
         </div>
        </div> 
             <!-- 一年以前 -->
       <div class="week">
          <div class="ros clearfix" v-for="list in datas" v-if="list.auction.auctionEndTime<year">
   <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一年以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice}} CNY</div>
                      <div class="ros_prompt">未竞价成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.auctionStatus==4">
                      <div class="ros_prompt">流拍</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.auction.marketStatus==0">
                      <div class="ros_prompt">拍品以下架</div>
                 </div>

                 <div class="ros_l2">{{list.auctionCollect.newPrice}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">{{list.auction.auctionStartTime}}-{{list.auction.no}}</div>
             </div>
             <div class="ros_r"><img :src="picHead + list.auction.picItems[0]"/></div>
           
         </div>
        </div> 
            
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '参拍中',
                datas:'',
                week:'',//一周
                month:'',//一月
                march:'',//三月
                year:'',//一年
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
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */
          this.getCollect()

        },
        methods: {
             getCollect:function(){
                let that=this;
                 commonService.getCollect({pageNo:1,pageSize:30,status:3}).then(function(res){
                   if(res.data.code==200){
                        that.datas=res.data.datas.datas
                    }
                    
                    var now = new Date();
                    var now1=new Date()
                    var now2=new Date()
                    var now3=new Date()
                    var week = now.getTime() - 7 * 24 * 3600 * 1000;
                    var month = now1.setMonth(now1.getMonth() - 1);
                    var march = now2.setMonth(now2.getMonth() - 3);
                    var year = now3.setFullYear(now3.getFullYear()-1);
                    that.week=week
                    that.month=month
                    that.march=month
                    that.year=year

                   // that.datas.auction.auctionEndTime
                    
                })
            }
            
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .not{

        .box{
            padding: @size10 @size20;
            .week{
            	.line{
                    display: none;
            		width: 9.4666rem;
                    position: relative;
            		border-bottom: 1px solid rgb(228,228,228);
            		margin: @size8 0 @size18 -@size10;

            		height: @size15;
            		
            		.line_con{
            			position: absolute;
            			top: @size6;
            			right: 1.2rem;
            			font-size: 10px;
            			color: rgb(51,51,51);
            			width: 2rem;
            			background-color: #fff;
            			text-align: center;
            		}
            		
            	}


            }
            .ros{
                position: relative;
                margin-top: @size5;
            }
            .ros:first-child .line{
                display: block;
            }
            .ros_l{
                float: left;
                margin-top: 0.7333rem;
                .ros_l_top{
                    div{
                        float: left;
                        margin-right: @size5;
                        font-size: 11px;
                        line-height: 15px;
                    }
                    .ros_offer{
                        color: rgb(153,153,153);
                        font-weight: 700;
                    }
                    .ros_prompt{
                        color: rgb(235,97,0);
                    }
                    .ros_label{
                        height: @size15;
                        padding: 0 4px;
                        background-color: rgb(235,97,0);
                        text-align: center;
                        line-height: @size15;
                        color: #fff;
                    }

                }
                .ros_l2{
                    font-size: 12px;
                    line-height: @size15;
                    font-weight: 700;
                    color: rgb(53,60,70);
                }
                .ros_l3{
                    color: rgb(51,51,51);
                    font-size: 12px;
                    line-height: @size15;
                }
            }
            .ros_r{
                float: right;
                width: 3rem;
                height: 3rem;
                background:red;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .ros_con{
                 position: absolute;
                 bottom: 0;
                 right: 3rem;
                margin-right: @size10;
                
                p{
                 text-align: right;
                 font-size: 11px;
                 line-height: @size16;
                 color: rgb(51,51,51);
                 font-weight:700;

                 span{
                    font-size: 11px;
                    line-height: @size16;
                    color: rgb(51,51,51);
                    font-weight:400;
                 }

                }
            }
        }
    }
</style>

