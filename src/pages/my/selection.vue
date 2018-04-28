<template>

    <div class="selection">
        <div class="top">
            <p class="top_p1">SHIPPING ADDRESS</p>
            <div class="top_div clearfix">
            <p class="top_p2">地址选择</p>
            <div @click="obtain()" class="v_dian"><img src="../../assets/image/mycenter/right.png"/></div>	
            </div>
            

        </div>
      
        <!-- 地址 -->
        <div class="address clearfix" v-for="list in address">
            <div class="address_l clearfix">
                <p class="address_l_l">{{list.name}}</p>
                <p class="address_l_r">{{list.phone}}</p>
                <div class="address_con">
                <div class="v_fei">
                    <p>{{list.provinceName}} {{list.cityName}} {{list.districtName}}</p>
                    <p>{{list.detailAdress}}</p>
                </div>
            </div>
            <div class="v_moren" v-if="list.defaultAdress==true">默认地址</div>
            </div>
            <div class="address_r" :class="{'address_rcolor':list._id==addressId}" @click="addressIds(list._id)">
                <div><i class="iconfont icon-duihao" v-if="list._id==addressId"></i></div>
            </div>
            
        </div>
        <div class="botton">
            <div @click="xing()">添加新地址 + </div>
        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js' 
    export default {
        data () {
            return {
                title: '茗探',
                address:'',
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

        },
        mounted: function() {
          common.onMove('.selection')
        	this.getAddress()

        },
        methods: {
          addressIds:function(id){
                 this.addressId=id
                 // this.$router.push({path:"/my/order",query:{addressId:this.addressId,auctionId:this.auctionId}})
          },
          xing:function(){
            this.$router.push({path:"/address",query:{id:''}})
          },
        	obtain:function(){
            this.$router.push({path:"/my/order",query:{addressId:this.addressId,auctionId:this.auctionId}})  

        	},
        	// 获取地址
        	getAddress:function(){
                let that=this;
                 commonService.getAddress({pageNo:1,pageSize:30}).then(function(res){
                   that.address=res.data.datas.datas

                })
            },


        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .selection{
      position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 0;
       .top{
          padding: @size50 @size20;
          border-bottom: 2px solid rgb(53,60,70);
          .top_p1{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: rgb(51,51,51);
          }
          .top_div{

          .top_p2{
          	float: left;
            font-size: 12px;
            line-height: 20px;
            color: rgb(51,51,51);
            // margin-top: @size10;
          }
          div{
          	float: right;
          	margin-top: @size10;
          	i{
          		font-size: 16px;
          		
          	}
          }
          .v_dian{
             // margin-right: 0.2667rem;
              img{
                width: 0.8rem;
                margin-top: 0rem;
              }
           }
          }
       }


       .address{
          padding: @size15 @size4 @size10;
          border-bottom: 1px solid #82878c;
          margin: 0 @size20;
          .address_l{
            float: left;
            width: 7.4rem;
            position: relative;
            p{
                font-size: 12px;
                color: rgb(51,51,51);
            }
            .v_moren{
               position: absolute;
               bottom: 0;
               left: 0;
               color: #ee8640;
               font-size: 12px;
            }
            .address_l_l{
              float: left;
              min-width: 5rem;
            }
            .address_l_r{
              float: right;
            }
             .address_con{
                float: right;
                p{
                    font-size: 12px;
                    color: rgb(51,51,51);
                    text-align: right;
                }
                div{
                    margin-top: 0.1rem;
                    p{
                        font-size: 12px;
                        color: rgb(102,102,102);
                    }
                }
                .v_fei{
                   p{
                     max-width: 5.8rem;
                     // text-align: left;
                     color: rgb(190, 190, 190);
                   }
                }
          }

          }
          .address_r{
            float: right;
            padding-left: @size20;
            border-left: 1px solid rgb(217,217,217);
            height: 1.3rem;
            // margin-left: @size20;
            div{

            	// background: #000;
            	width: @size10;
            	height: @size10;
                font-size: @size10;
                margin-top: @size18;
                color: rgb(169,174,180);
                border:2px solid rgb(169,174,180);
                // line-height: @size10;
                text-align: center;
                i{
                  font-size: @size10;
                  line-height: @size10;
                  // margin-left: -1px;
                }
            }
          }
           .address_rcolor{
           	  div{
           	  	border:2px solid #15b3b2;
           	  	color:#15b3b2;
           	  }
           }

         

       }
     
       .botton{
          height: 40px;
          div{
            position: fixed;
            left: @size10;
            right: @size10;
            bottom: @size10;
            z-index: 999;
            // width: 100%;
            box-sizing: border-box;
            height: 40px;
            background: #fff;
            border: 2px solid rgb(53,60,70);
            text-align: center;
            line-height: 40px;
            font-size: 12px;
          }
       }


    }
</style>

