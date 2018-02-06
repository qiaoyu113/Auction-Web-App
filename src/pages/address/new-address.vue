<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
   
    <div class="" id="" v-set-title="title">
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>SHIPPING ADDRESS</div>
                <div class="loginCn">地址选择</div>
            </div>
            <div class="icon">
                <div ><i class="iconfont icon-tupian"></i></div>
            </div>
        </div>
        <div class="box2">
            <div class="info"><span>联系人</span>
                <input type="" placeholder="请输入"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>手机号</span>
                <input type="number" placeholder="请输入"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>所在地区</span>
                <input type="" placeholder="请选择"/>
                <div class="infoClose"><i>. . .</i></div>
            </div>
            <div class="detail">
                <textarea placeholder="请输入详细地址"></textarea>
            </div>
            <!-- <div class="resize">
                <div class="check"><i class="iconfont icon-duihao"></i></div>
                <span class="">设置为默认地址</span>
            </div> -->
            <div class="del">
                <div class="delete"><i class="iconfont icon-tupian"></i></div>
                <span>删除地址</span>
            </div>
        </div>
        <div class="footer">保&nbsp;&nbsp;存</div>
    </div>
</template>

<script >
import {appService} from '../../service/appService'
  export default {
    props: ['str'],
    data () {
      return {
          title:'地址',
          arrays: [],
        index:1,
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
       
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
    .content{
        margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid rgb(51, 51, 51);
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: 600;
                font-size:20px;
                letter-spacing: @size3;
            }
            .loginCn{
                font-size: 15px;
            }
        }
        .icon{
            float: right;
            div{
                margin-top: @size20;
                i{
                    
                }
            }
            
        }
    }
    .box2{
        width:100%;
        padding:@size20;
        box-sizing: border-box;
         padding-bottom: @size55;
        .info{
            width: 100%;
            height: @size40;
            border-bottom: 1px solid #87828c;
            text-align: left;
            span{
                width: 2rem;
                line-height: 1.02rem;
                float: left;
                font-size: @size15;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                height: 100%;
                float: left;
                border: none;
                outline: none;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
            }
        }
        .detail{
            height: 2.666rem;
            width: 8.933rem;
            background: gray;
            margin-top: @size15;
            box-sizing: border-box;
            textarea{
                width: 100%;
                height: 100%;
                background: rgb(238, 238, 238);
                border: none;
                outline: none;
                box-sizing: border-box;
                padding: @size10;
                font-size: @size13;
                letter-spacing: @size1;
            }
        }
        .resize{
            height: @size50;
            padding-top: @size15;
            .check{
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
                    top: -1px;
                    left: -11px;
                    color: rgb(0, 185, 181);
                }
            }
            span{
                font-size: @size14;
                padding-left: @size8;
                line-height: @size15;
            }
            
        }
        .del{
            height: @size40;
            border-bottom: 1px solid rgb(168, 174, 180);
            line-height: @size40;
            .delete{
                float: left;
                color: red;
                width: @size14;
                height: @size14;
            }
            span{
                font-size: @size14;
                padding-left: @size8;
                color: red;
            }
        }
    }
    .footer{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
		box-sizing: border-box;
        border-top:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 15px;
    }
</style>

