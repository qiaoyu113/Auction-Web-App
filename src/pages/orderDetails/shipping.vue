<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 订单详情-订单正常-订单完成 -->
    <div class="logistics">
        <div class="header">传家</div>
        <div :class="dis">
            <div class="transparent"></div>
            <div class="popWin" >
                <div class="close" @click="close()"><i class="iconfont icon-closeicon"></i></div>
                <div class="titleEn">SHIPPING</div>
                <div class="titleCh">物流信息</div>
                <div class="num">运单号<span class="fr">1234567890ppp</span></div>
                <div class="num">快递公司<span class="fr">顺风速运</span></div>
                <div class="num num1">预计送达<span class="fr">2018.05.11</span></div>
                <div class="box">
                    <div class="line">
                    </div>
                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单已签收。签收人：李先生</p>
                        <p>感谢您在本平台成功拍得心仪作品！</p>
                        <p>期待与你下一次合作</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>
                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单正在派送。感谢您的等待！</p>
                        <p>配送员：李松松，电话：138 1234 8888</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>
                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单已到达[北京望京战]</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>
                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单已签收。签收人：李先生</p>
                        <p>感谢您在本平台成功拍得心仪作品！</p>
                        <p>期待与你下一次合作</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>
                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单正在派送。感谢您的等待！</p>
                        <p>配送员：李松松，电话：138 8888 8888</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>

                    <div class="content">
                        <div class="circle"></div>
                        <p>[朝阳区]您的订单正在派送。感谢您的等待！</p>
                        <p>配送员：李松松，电话：138 8888 8888</p>
                        <p>2018.06.11 15:08:55</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
   
</template>

<script >
import {appService} from '../../service/appService'

  export default {
    props: ['str'],
    data () {
      return {
          title:'茗探',
          arrays: [],
          dis:'',
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        close:function() {
            this.dis='dis';
        }
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .logistics{
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
    
    
.dis{
    display: none;
}
.transparent{
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background:#000;  
    opacity:0.6;
}
.popWin{
    height: 14.72rem;
    width: 8.67rem;
    background: white;
    position: fixed;
    bottom:@size25;
    left: @size25;
    z-index: 1000;
    text-align: center;
    box-sizing: border-box;
    padding: 0 @size20;
    overflow: scroll;
    .close{
            position: absolute;
            right: 0;top: 0;
            width: @size30;
            height: @size30;
            background: #eb6100;
            i{
                font-size: @size30;
                color: white;
            }
    }
    .titleEn{
        padding-top: @size50;
        letter-spacing: 2px;
        font-size: @size14;
        font-weight: bold;
    }
    .titleCh{
        font-size: @size11;
        padding-bottom: @size25;
    }
    .num{
        width: 7.6rem;
        height: @size40;
        border-top: 1px solid gray;
        font-size: @size14;
        line-height: @size40;
        text-align: left;
        .fr{
            font-size: @size14;
            color: gray;
        }
    }
    .num1{
        border-bottom: 1px solid gray;
    }
    .box{
        height: 8.4rem;
        overflow:hidden;
        overflow-y: scroll;
        .line{
            float: left;
            height: 10rem;
            border-left:2px solid gray; 
            box-sizing: border-box;
            margin-left: @size10;
            margin-top: @size20;
            padding-right: @size10;
        }
        .content{
            position: relative;
            .circle{
                width: @size5;
                height: @size5;
                border-radius: 50%;
                border: 3px solid gray;
                display: inline-block;
                position: absolute;
                top: @size15;
                left: -0.44rem;
                background: gray;
            }
            border-bottom: 1px solid gray;
            text-align: left;
            float: left;
            width:  7rem;
            // height: 2.4rem;
            box-sizing: border-box;
            padding: @size13 0;
            p{
                font-size: @size10;
            }
        }
    }
}
}
</style>

