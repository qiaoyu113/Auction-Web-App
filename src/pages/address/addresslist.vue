<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
   
    <div class="addresslist" id="" v-set-title="title">
        <div class="header">传家</div>
        <div class="returncla"><span @click="Vreturn">&lt;</span></div>
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
                    <span :class="list.defaultAdress==false?'color':''">默认地址</span>
                    <button class="fr" :class="list.defaultAdress==false?'color':''" @click="edit(list._id)">编辑</button>
                    <button class="fr" :class="list.defaultAdress==false?'color':''" @click="deleteAddress(list._id)">删除</button>
                </div>
            </div>

        </div>
        <div class="footer" @click="jump()">添加新地址&nbsp;&nbsp;<span>+</span></div>
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'地址列表',
          arrays: [],
          index:1,
          data:'',
          
      }
    },
    components: {},
    mounted () {
    	 this.getAddress()
    },
    methods: {
    	  getAddress:function(){
               let that = this
               commonService.getAddress({pageNo:1,pageSize:30}).then(function(res){
                // that.bankCard=res.data.datas
                that.data=res.data.datas.datas
                })
            },
            deleteAddress:function(id){
               let that = this
               commonService.deleteAddress(id).then(function(res){
                // that.bankCard=res.data.datas
                  if(res.data.code==200){
                     that.getAddress()
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
            Vreturn:function(){
             window.history.go(-1)
            },

            

       
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .addresslist{
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
    .returncla{
        width: @size375;
        height: @size35;
        border-bottom: 1px solid rgb(53, 60, 70);
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

    }
    .content{
        padding: 0 @size10;
        margin-top:@size80;
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
                    left: 0;
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
                padding-left: @size12;
                line-height: @size15;
            }
            .color{
                color: rgb(153, 153, 153);
            }
            button{
                margin:0 @size10;
                outline: none;
                font-size: @size14;
                line-height: @size11;
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
        margin: @size5; 
        border:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 15px;
        span{
            font-weight: bold;
            line-height: 1rem;
        }
    }
 }
</style>

