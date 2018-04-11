<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 测试~~~~~~~~~~ -->
    <!-- 帮助中心 -->
    <div class="helpcenter" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>HELP</div>
                <div class="loginCn">帮助中心</div>
            </div>
            <div class="fr" @click="Return()">
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div> 
        <!--按钮-->
        <div class="v_menu">
            <div class="menu v_rost" >
              <div class="v_transverse">
                <div class='font' v-for="list in datas" :class="list.order==order ?'checked':''" @click="getIndex(list.order)" >{{list.title}}</div>
                </div>
            </div>
            </div>
        <div class="text" v-for="lists in datas" v-if="lists.order==order">
            <div class="time">更新时间：{{lists.createTime | stampFormate}}</div>
         <!--    <div class="box">
                <div class="tit">保证金说明</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守</p>
            </div> -->
            <div class="box" v-html="lists.content">

         <!--        <div class="tit">1.保证金金额</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                </p> -->
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
</template>

<script >
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '传家',
                // index:3,
                datas:'',
                order:1,
                ServiceBox:false,
            }
        },
        components:{},
        
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
            common.onMove('.helpcenter')
            common.onMove2('.menu')
           this.getDoctype()
           this.orderroute()
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
            orderroute:function(){
                let index=this.$route.query.index
             
                if(index!=null || index!= undefined){
                   this.order=index
                }
          

            },
            Return:function(){
                window.history.go(-1)
            },
            getIndex:function(index){
                let that = this;
                that.order=index
         
            },
               // 获取帮助信息
            getDoctype:function(){
                let that = this;
                  commonService.getDoctype({type:1}).then(function(res){
                    if(res.data.code==200){
                      that.datas=res.data.datas
                    }
                  
                 }) 
            },


        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .helpcenter{
           position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
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
    .content{
        width:100%;
        height:3.7rem;
        // border-bottom:2px solid #353535;
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:24px;
                font-weight: bold;
                font-size:16px;
            }
            .loginCn{
                font-size: 14px;
            }
            
        }
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
            img{
                width: 1rem;
                margin-top: 1rem;
            }
        }    
    }   
  .v_menu{
     height: 0.6rem;  
     padding:0 @size10 2px @size10;
     // margin: 
     border-bottom:2px solid #353535;
     width: 9.3333rem;
     overflow: hidden;
     background: rgba(255, 255, 255,0);
     // background: red;
  }

     .menu{
            height:0.8rem;
            line-height:0.6rem;
            width: 9.3333rem;
            overflow: hidden;
            overflow-x: auto;
            // margin: 0 0.5rem;
            
            // position: absolute;
            // bottom:1px;
            // box-sizing: border-box;
          
            // position: relative;
              .v_transverse{
                 // margin-left: 0.5rem;
                 
                 width: 30rem;
                 // height: 0.6rem;
                 // position: fixed;
                 // left: 0;
                 // right: 0;
                 //  top: 0;
                 //  overflow-x: scroll;
                 //  bottom: 0;
                  div{
                    font-size: 12px;
                  }
              }


            .font{
                color:rgb(153, 153, 153);
                float:left;
                box-sizing: border-box;
                font-size: @size10;
                margin-right: @size10;
            }
            .checked{
                color:#353535;
                border-bottom:2px solid #353535;
            }
        }
    .text{
        padding: 0 @size20;
        .time{
            text-align: right;
            margin-top: @size40;
            font-size: @size10;
        }
        .box{
            padding-top: @size20;
            .tit{
                font-size: @size12;
            }
            .txt{
                font-size: @size11;
                color: rgb(153, 153, 153);
            }
        }
    }
}
</style>

