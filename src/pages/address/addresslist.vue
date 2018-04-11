<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
   <div class="v_addresslist"> 
     <div class="nav">
            <span class="back" @click="Return()"><i class="iconfont icon-fanhui"></i></span>
        </div>
    <div class="addresslist" id="" v-set-title="title">
        <!-- <div class="header">传家</div> -->
        <!-- <z-nav></z-nav> -->
     
        <div class="content clearfix">
            <div v-for="list in data">
                <div class="peo clearfix">
                    <div class="fl">{{list.name}}</div>
                    <div class="fr">{{list.phone}}</div>
                </div>
                <div class="addr">{{list.provinceName}}{{list.cityName}}{{list.districtName}}</div>
                <div class="addr">{{list.detailAdress}}</div>
                <div class="bor"></div>
                <div class="resize">
                    <div class="checked" :class="list.defaultAdress==false?'check':'checked'" @click="postAddressid(list._id)"><i class="iconfont icon-duihao"></i></div>
                     <span :class="list.defaultAdress==false?'':'color'">默认地址</span>
                    <span class="fr v_fr"  @click="edit(list._id)">编辑</span>
                    <span class="fr v_fr"  @click="vmodeal(list._id)">删除 |</span>
                </div>
            </div>
        </div>
     
         <div class="v_modal" ref="v_modal" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="heig()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">REMOVE ITEM</p>
                 <p>删除</p>
                 <div class="v_box_img"><img src="../../assets/image/mycenter/scy.png" /></div>
                 <p>是否删除地址?</p>
                 <div class="v_button" @click='deleteAddress()'> 
                     确定
                 </div>
           </div>
        </div>
        <!--联系客服-->
        <div class="talk" @click="openService()">
            <img src="../../assets/image/mycenter/icon5.png"/>
        </div>
        <!--客户服务-->
        <div class="serviceBox" v-if="ServiceBox">
            <div class="serviceClose" @click="closeService()">×</div>
            <div class="serviceTop">
                <h2>ASSISTANCE</h2>
                <p>客户服务</p>
            </div>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t3.png"/>
                    <p>私恰</p>
                </div>
            </a>
            <div class="serviceWX">
                <img src="../../assets/image/mycenter/wx.png"/>
                <p>联系微信客服</p>
                <p class="p">长按识别二维码</p>
            </div>
        </div>
        <div class="serviceBk" v-if="ServiceBox"></div>
    </div>
     <div class="footer" @click="jump()">添加新地址&nbsp;&nbsp;<span>+</span></div>
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
          data:'',
          v_modal:false,
          id:'',
          ServiceBox:false,
      }
    },
    components: {},
    mounted () {
         common.onMove('.addresslist')
    	 this.getAddress()
    },
    methods: {
        //打开客服
        openService(){
            let that = this;
            that.ServiceBox = true;
        },
        //关闭客服
        closeService(){
            let that = this;
            that.ServiceBox = false;
        },
          Return:function(){
            window.history.go(-1)
          },
          heig:function(){
            this.v_modal=false
          },
          vmodeal:function(id){
            this.v_modal=true
            this.id=id
          },
    	  getAddress:function(){
               let that = this
               commonService.getAddress({pageNo:1,pageSize:30}).then(function(res){
                // that.bankCard=res.data.datas
                that.data=res.data.datas.datas
                })
            },
  
            deleteAddress:function(){
               let that = this
               commonService.deleteAddress(that.id).then(function(res){
                // that.bankCard=res.data.datas
                  if(res.data.code==200){
                     that.getAddress()
                     that.v_modal=false
                  }
  
                })
            },
            postAddressid:function(id){
               let that = this
               commonService.postAddressid(id,{type:2}).then(function(res){
                // that.bankCard=res.data.datas
                 if(res.data.code==200){
                     that.getAddress()
                  }
                })
            },
            jump:function(){
            this.$router.push({path:"/address",query:{id:''}})
            },
            edit:function(id){
            this.$router.push({path:"/address",query:{id:id}})
            },
            // v_modal:function(){
            //    this.$refs.modal.style.display="none"
            //    this.$refs.add_layer.style.display="none"   

            // }
            

            

       
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .v_addresslist{
         .nav{
        width: @size375;
        height: @size35;
        line-height: @size35;
        border-bottom: 1px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: 0;
        z-index: 100;
        .back{
            line-height: @size35;
            i{
                font-size:28px;
                margin-left: 0.3rem;
                color:#A9AEB6;
            }
        }
    }

    .addresslist{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
        .talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #000;
            border-right: none;
            border-bottom-left-radius: 6px;
            border-top-left-radius:6px;
            padding:0.2rem;
            box-sizing:border-box;
            img{
                width:0.56rem;
                height:0.5rem;
            }
        }
        .serviceBk{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#000000;
            opacity: 0.65;
            z-index:200;

        }
        .serviceBox{
            width:7rem;
            height:9.2rem;
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background:#fff;
            padding:0.5rem;
            z-index:201;
            .serviceClose{
                position: absolute;
                right:0;
                top:0;
                width:0.8rem;
                height:0.8rem;
                background:#EB6100;
                color:#fff;
                text-align: center;
                line-height:0.7rem;
                font-size: 0.9rem;
            }
            .serviceTop{
                text-align: center;
                margin-top:0.5rem;
                margin-bottom:0.4rem;
                h2{
                    font-size:18px;
                }
                p{
                    font-size:12px;
                    margin-top:0.2rem;
                }
            }
            .serviceList{
                overflow: hidden;
                font-size: 12px;
                padding:0.3rem 0 0.3rem 2.3rem;
                border-top:1px solid #B5B8BA;
                img{
                    float:left;
                    width:0.5rem;
                }
                p{
                    width:2rem;
                    text-align: center;
                    float:left;
                    font-size:12px;
                }
            }
            .serviceWX{
                overflow: hidden;
                font-size: 12px;
                border-top:1px solid #B5B8BA;
                text-align: center;
                img{
                    width:2rem;
                    height:2rem;
                    margin: 0.4rem auto;
                }
                p{
                    font-size:12px;
                }
                .p{
                    font-size:9px;
                    color:#C3C3C3;
                }
            }
        }
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
   
    .content{
        padding: 0 @size10;
        margin-top:@size35;
        padding-bottom: 1.2rem;

        .peo{
            padding:@size15 @size10;
            height: @size20;
            .fl{font-size:@size12;} 
            .fr{font-size:@size12;} 
        }
        .addr{
            color: gray;
            font-size: @size12;
            width: 100%;
            text-align: right;
            box-sizing: border-box;
            padding-right:@size10;
        }
        .bor{
            border-bottom: 1px solid rgb(96, 99, 104);
            margin-left: @size10;
            margin-top: @size10;
        }
        .resize{
            height: @size30;
            padding-top: @size15;
            padding-left: @size10;
            border-bottom: 1px solid rgb(96, 99, 104);
         
              
            
            .checked{
                float: left;
                box-sizing: border-box;
                border: 3px solid rgb(0, 185, 181);
                width: @size14;
                height: @size14;
                position: relative;
                i{
                    font-size: @size10;
                    line-height: @size10;
                    position: absolute;
                    top: -@size1;
                    left: -@size1;
                    color: rgb(0, 185, 181);
                }
                .v_span{
                   color: rgb(0, 185, 181);
                }
            }
            .check{
                float: left;
                box-sizing: border-box;
                border: 3px solid rgb(153, 153, 153);
                width: @size14;
                height: @size14;
                position: relative;
                i{
                    display: none;
                }
            }
            span{
                font-size: @size14;
                padding-left: @size10;
                line-height: @size15;
               
            }
            .color{
               color: rgb(0, 185, 181);
            }
            button{
                margin:0 @size10;
                outline: none;
                font-size: @size14;
                line-height: @size11;
            }
            .v_fr{
               color: gray;
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
   .footer{
        background: #fff;
        position:fixed;
        bottom:0;
        width: 9.73rem;
        height: 1.2rem;
        box-sizing: border-box;
        margin:@size5; 
        border:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 12px;
        span{
            font-weight: bold;
            line-height: 1rem;
        }
    }
}
</style>

