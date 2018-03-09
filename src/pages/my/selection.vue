<template>

    <div class="selection">
        <div class="top">
            <p class="top_p1">SHIPPING ADDRESS</p>
            <div class="top_div clearfix">
            <p class="top_p2">地址选择</p>
            <div><i class="iconfont icon-dian1"></i></div>	
            </div>
            

        </div>
      
        <!-- 地址 -->
        <div class="address clearfix" v-for="list in address">
            <div class="address_l">
                <p>{{list.name}}</p>
            </div>
            <div class="address_r" :class="{'address_rcolor':list.defaultAdress==true}" @click="obtain(list._id)">
                <div>✔</div>
            </div>
            <div class="address_con">
                <p>{{list.phone}}</p>
                <div>
                    <p>{{list.provinceName}} {{list.cityName}} {{list.districtName}}</p>
                    <p>{{list.detailAdress}}</p>
                </div>
            </div>
        </div>
        <div class="botton">
            <div>添加新地址 + </div>
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
                address:'',
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
        	this.getAddress()
        },
        methods: {
        	obtain:function(id){
        		console.log(id)
        	},
        	// 获取地址
        	getAddress:function(){
                let that=this;
                 commonService.getAddress({pageNo:1,pageSize:30}).then(function(res){
                   that.address=res.data.datas.datas
                   console.log(that.address)
                })
            },


        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .selection{
       .top{
          padding: @size50 @size20;
          border-bottom: 2px solid rgb(53,60,70);
          .top_p1{
            font-size: 14px;
            color: rgb(51,51,51);
          }
          .top_div{

          .top_p2{
          	float: left;
            font-size: 12px;
            color: rgb(51,51,51);
            margin-top: @size10;
          }
          div{
          	float: right;
          	margin-top: @size10;
          	i{
          		font-size: 16px;
          	}
          }
           }
       }


       .address{
          padding: @size15 @size20 @size10;
          border-bottom: 1px solid #82878c;
          margin: 0 @size20;
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
            height: 1.3rem;
            margin-left: @size20;
            div{

            	// background: #000;
            	width: @size12;
            	height: @size12;
                font-size: @size10;
                margin-top: @size18;
                color: rgb(169,174,180);
                border:1px solid rgb(169,174,180);
                line-height: @size12;
                text-align: center;
            }
          }
           .address_rcolor{
           	  div{
           	  	border:1px solid #15b3b2;
           	  	color:#15b3b2;
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

