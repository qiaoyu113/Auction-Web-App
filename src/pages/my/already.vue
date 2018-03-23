<template>
    <div class="already">
        <div class="box">
        <div class="now" v-if="loading">
      
         <div class="ros clearfix" v-for="(list,index) in datas" v-if="list.auctionEndTime>=week">
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.status=1">
                      <div class="ros_prompt">拍卖成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.doneBuy==3">
                      <div class="ros_prompt">违约，保证金被扣除</div>
                 </div>
                 <div class="ros_l2">{{list.currentPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.title}}</div>
                 <div class="ros_l3">LOT-{{list.completeNo}}</div>
             </div>
             <div class="ros_r" @click="Router(list.id)"><img :src="picHead + list.picItems[0]"/></div>
             <div class="ros_con"  v-if="list.doneBuy==1" @click="jump(list.id)">
                 去支付
             </div>
             <div class="ros_con"  v-if="list.doneBuy!=1" @click="jump(list.id)">
                 查看订单
             </div>
             <div class="ros_date" v-if="countdown[index]!=0">
                 <p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>
                 <p><span>支付拍品</span></p>
             </div>
         </div>
       </div>
      <!-- 一周以前 -->
       <div class="week"  v-if="datas.params">
          <div class="ros clearfix" v-for="(list,index) in datas" v-if="list.auctionEndTime<week&&list.auctionEndTime>=month">
       <!-- 分割线 -->
           <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一周以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.status=1">
                    
                      <div class="ros_prompt">拍卖成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.doneBuy==3">
                      <div class="ros_prompt">违约，保证金被扣除</div>
                 </div>

                 <div class="ros_l2">{{list.currentPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.title}}</div>
                 <div class="ros_l3">LOT-{{list.completeNo}}</div>
             </div>
             <div class="ros_r" @click="Router(list.id)"><img :src="picHead + list.picItems[0]"/></div>
             <div class="ros_con"  v-if="list.doneBuy==1"  @click="jump(list.id)">
                 去支付
             </div>
             <div class="ros_con"  v-if="list.doneBuy!=1" @click="jump(list.id)">
                 查看订单
             </div>
             <div class="ros_date" v-if="countdown[index]!=0">
                 <p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>
                 <p><span>支付拍品</span></p>
             </div>
           
         </div>
        </div> 
        <!-- 一月以前 -->
       <div class="week" v-if="datas.params">
          <div class="ros clearfix" v-for="(list,index) in datas" v-if="list.auctionEndTime<month&&list.auctionEndTime>=march">
          <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一月以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.status=1">
                    
                      <div class="ros_prompt">拍卖成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.doneBuy==3">
                      <div class="ros_prompt">违约，保证金被扣除</div>
                 </div>

                 <div class="ros_l2">{{list.currentPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.title}}</div>
                 <div class="ros_l3">LOT-{{list.completeNo}}</div>
             </div>
             <div class="ros_r" @click="Router(list.id)"><img :src="picHead + list.picItems[0]"/></div>
             <div class="ros_con"  v-if="list.doneBuy==1" @click="jump(list.id)">
                 去支付
             </div>
             <div class="ros_con"  v-if="list.doneBuy!=1" @click="jump(list.id)">
                 查看订单
             </div>
             <div class="ros_date" v-if="countdown[index]!=0">
                 <p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>
                 <p><span>支付拍品</span></p>
             </div>
           
         </div>
        </div> 
           <!-- 三月以前 -->
       <div class="week" v-if="datas.params">
          <div class="ros clearfix" v-for="(list,index) in datas" v-if="list.auctionEndTime<march&&list.auctionEndTime >= year">
           <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">三月以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.status=1">
                    
                      <div class="ros_prompt">拍卖成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.doneBuy==3">
                      <div class="ros_prompt">违约，保证金被扣除</div>
                 </div>

                 <div class="ros_l2">{{list.currentPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.title}}</div>
                 <div class="ros_l3">LOT-{{list.completeNo}}</div>
             </div>
             <div class="ros_r" @click="Router(list.id)"><img :src="picHead + list.picItems[0]"/></div>
             <div class="ros_con"  v-if="list.doneBuy==1" @click="jump(list.id)">
                 去支付
             </div>
             <div class="ros_con"  v-if="list.doneBuy!=1" @click="jump(list.id)">
                 查看订单
             </div>
             <div class="ros_date" v-if="countdown[index]!=0">
                 <p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>
                 <p><span>支付拍品</span></p>
             </div>
         </div>
        </div> 
             <!-- 一年以前 -->
       <div class="week" v-if="datas.params">
          <div class="ros clearfix" v-for="(list,index) in datas" v-if="list.auctionEndTime<year">
   <!-- 分割线 -->
          <div class="line clearfix">
             <div class="line_l"></div>
             <div class="line_con">一年以前</div>
            <div class="line_r"></div>
          </div>
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.status=1">
                    
                      <div class="ros_prompt">拍卖成功</div>
                      <div class="ros_label">NEW</div>
                 </div>
                  <div class="ros_l_top clearfix" v-if="list.doneBuy==3">
                      <div class="ros_prompt">违约，保证金被扣除</div>
                 </div>

                 <div class="ros_l2">{{list.currentPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.title}}</div>
                 <div class="ros_l3">LOT-{{list.completeNo}}</div>
             </div>
             <div class="ros_r" @click="Router(list.id)"><img :src="picHead + list.picItems[0]"/></div>
             <div class="ros_con"  v-if="list.doneBuy==1" @click="jump(list.id)">
                 去支付
             </div>
             <div class="ros_con"  v-if="list.doneBuy!=1" @click="jump(list.id)">
                 查看订单
             </div>
             <div class="ros_date" v-if="countdown[index]!=0">
                 <p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>
                 <p><span>支付拍品</span></p>
             </div>
         </div>
        </div> 
            
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js' 
    export default {
        data () {
            return {
                title: '传家',
                datas:'',
                loading:'false',
                week:'',//一周
                month:'',//一月
                march:'',//三月
                year:'',//一年
                countdown:[],
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
          common.onMove('.already')
          this.getCollect()
        },
        methods: {
            Router:function(id){
                this.$router.push({name:'auctionMore',params:{id:id}})
            },
            jump:function(id){
                let that =this;
        commonService.getCheckOrder({auctionId:id}).then(function(res){
                    // that.datas=res.data.datas.datas
                
                    if(res.data.datas==null){
                         that.$router.push({path:"/my/order",query:{auctionId:id}}) 
                    }else{
                        let status=res.data.datas.status
                        if(status!=6){//订单详情页
                         that.$router.push({path:"/normalorder",query:{id:res.data.datas.orderNo}}) 
                        }else if(status==6){//关闭
                         // that.$router.push({path:"/closeorder",query:{id:res.data.datas.orderNo}}) 
                          that.$router.push({path:"/my/order",query:{auctionId:id}}) 
                        }
                    }
                })
            },
            // 获取我的收藏
            getCollect:function(){
                let that=this;
                 commonService.getCollect({pageNo:1,pageSize:30,status:2}).then(function(res){
 
                    if(res.data.code==200){
                        that.datas=res.data.datas.datas
                      for(var i=0;i<that.datas.length;i++){
                        let date=new Date()
                          if(new Date(that.datas[i].mqEndTime*1)>date){
                            that.datas[i].mqEndTime=common.getTimer(that.datas[i].mqEndTime) 
                          }else{
                            that.countdown[i] = 0
                          } }
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
    .already{
          position: fixed;
          left: 0;
          right: 0;
          top: @size41;
          overflow-x: scroll;
          bottom: 1.2rem;
        .box{
            padding: @size10 @size20;
            .week{
            	.line{
                    display: none;
            		width: 9.4666rem;
                    position: relative;
            		border-bottom: 1px solid rgb(228,228,288);
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
                // float: left;
                position: absolute;
                left: 0;
                bottom: 0.8rem;
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
                 left: 0;
                  margin-right: @size10;
                  font-size: 11px;
                  color: rgb(51,51,51);
                  width: 1.8666rem;
                  height: 0.666rem;
                  border: 1px solid rgb(51,51,51);
                  line-height: 0.666rem;
                  text-align: center;
            }
            .ros_date{

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

