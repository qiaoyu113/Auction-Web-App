<template>

    <div class="lot">
        <div class="box">
         <div class="ros clearfix" v-for="(list,index) in datas">
             <div class="ros_l">
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice<list.auction.finalPrice">
                      <div class="ros_offer">{{list.auction.finalPrice | money}} CNY</div>
                      <div class="ros_prompt">出价被超出</div>
                      <div class="ros_label">NEW</div>
                 </div>
                 <div class="ros_l_top clearfix" v-if="list.auctionCollect.newPrice==list.auction.finalPrice">
                      <div class="ros_prompt">暂时领先</div>
                 </div>
                 <div class="ros_l2">{{list.auctionCollect.newPrice | money}} CNY</div>
                 <div class="ros_l3">{{list.auction.title}}</div>
                 <div class="ros_l3">LOT-{{list.auction.completeNo}}</div>
             </div>
             <!-- <img src="../../assets/image/error/ufo_blue_2x.png"/> -->
             <div class="ros_r" @click="Router(list.auction._id)"><img :src="picHead + list.auction.picItems[0]"/></div>
             <div class="ros_con">
                 <p>{{countdown[index].dd}}-{{countdown[index].hh}}-{{countdown[index].mm}}-{{countdown[index].ss}}</p>
                 <p><span>即将结束</span></p>
             </div>
         </div>
<!--          <div class="ros clearfix">
             <div class="ros_l">
                 <div class="ros_l_top clearfix">
                      
                      <div class="ros_prompt">暂时领先</div>
                   
                 </div>
                 <div class="ros_l2">70.000 CNY</div>
                 <div class="ros_l3">茶壶茶壶</div>
                 <div class="ros_l3">20180801-011</div>
             </div>
             <div class="ros_r"><img src="../../assets/image/error/ufo_blue_2x.png"/></div>
             <div class="ros_con">
                 <p>00:00:20:30</p>
                 <p><span>即将结束</span></p>
             </div>
         </div>
         <div class="ros clearfix">
             <div class="ros_l">
       
                 <div class="ros_l2">70.000 CNY</div>
                 <div class="ros_l3">茶壶茶壶</div>
                 <div class="ros_l3">20180801-011</div>
             </div>
             <div class="ros_r"><img src="../../assets/image/error/ufo_blue_2x.png"/></div>
             <div class="ros_con">
                 <p>00:00:20:30</p>
                 <p><span>即将结束</span></p>
             </div>
         </div>
         <div class="ros clearfix">
             <div class="ros_l">
                 <div class="ros_l_top clearfix">
                      <div class="ros_offer">70.000 CNY</div>
                      <div class="ros_prompt">出价被超出</div>
                      <div class="ros_label">NEW</div>
                 </div>
                 <div class="ros_l2">70.000 CNY</div>
                 <div class="ros_l3">茶壶茶壶</div>
                 <div class="ros_l3">20180801-011</div>
             </div>
             <div class="ros_r"><img src="../../assets/image/error/ufo_blue_2x.png"/></div>
             <div class="ros_con">
                 <p>00:00:20:30</p>
                 <p><span>即将结束</span></p>
             </div>
         </div> -->
            
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
            common.onMove('.lot')
           this.getCollect()
        },
        methods: {
            Router:function(id){

                this.$router.push({name:'auctionMore',params:{id:id}})
            },
            // 获取我的收藏
            getCollect:function(){
                let that=this;
                 commonService.getCollect({pageNo:1,pageSize:30,status:1}).then(function(res){
                   if(res.data.code==200){
                        that.datas=res.data.datas.datas
                          for(var i=0;i<that.datas.length;i++){
                          that.countdown[i]=common.getTimer(that.datas[i].auction.mqEndTime)
                          }
                       
                    }
                })
            }

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .lot{
         position: fixed;
          left: 0;
          right: 0;
          top:@size40;
          overflow-x: scroll;
          bottom: 0;
        .box{
            padding: @size10 @size20;
            .ros{
                position: relative;
                margin-top: @size5;
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

