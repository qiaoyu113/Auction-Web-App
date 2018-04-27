<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心 -->
    <div class="v_personalCenter"  v-set-title="title">
        <div class="personalCenter">
        <!-- <div class="header">传家</div> -->
        <div class="content" v-if="logined">
            <div class="box clearfix ">
                <div class="v_boxImg fl" @click="mycenter()">
                    <div class="v_img"><img :src="picHead + list.headImg" alt="" :onerror="errorImg01"/></div>
                    <div class="member">
                    <img v-if="list.vipLevel==1" src="../../../src/assets/image/mycenter/v1.png"/>
                    <img v-if="list.vipLevel==2" src="../../../src/assets/image/mycenter/v2.png"/>
                    <img v-if="list.vipLevel==3" src="../../../src/assets/image/mycenter/v3.png"/>
                    <img v-if="list.vipLevel==4" src="../../../src/assets/image/mycenter/v4.png"/>
                    </div>
                </div>
                <div class="info fl">
                    <div class="hel">HELLO!</div>
                    <div class="name">{{list.name}}</div>
                    <div class="prove" v-if="list.realNameStatus==2">
                        <img src="../../../src/assets/image/mycenter/rzIcon.png"/>&nbsp;实名认证
                    </div>
                </div>
                <div class="fr" @click="mycenter()">
                 <img src="../../../src/assets/image/mycenter/more.png"/>
                </div>
            </div>
            <div class="option clearfix">
                <div class="litbox fl" @click="order(0)">
                    <div class="pic">
                    <!-- <i class="iconfont icon-tupian"></i> -->
                    <img src="../../assets/image/mycenter/usre1.png" />
                    </div>
                    <div class="font">全部订单</div>
                </div>
                <div class="litbox fl" @click="order(1)">
                    <div class="pic">
                    <!-- <i class="iconfont icon-tupian"></i> -->
                    <img src="../../assets/image/mycenter/usre2.png" />
                    <div class="number" v-if="numItem.noPayNum!=0&&numItem.noPayNum!=null">{{numItem.noPayNum}}</div></div>
                    <div class="font">待支付</div>
                </div>
                <div class="litbox fl" @click="order(2)">
                    <div class="pic">
                    <!-- <i class="iconfont icon-tupian"></i> -->
                    <img src="../../assets/image/mycenter/usre3.jpg" />
                    <div class="number" v-if="numItem.noGetNum!=0&&numItem.noPayNum!=null">{{numItem.noGetNum}}</div></div>
                    <div class="font">待收货</div>
                </div>
                <div class="litbox fl" @click="order(3)">
                    <div class="pic">
                    <!-- <i class="iconfont icon-tupian"></i> -->
                    <img src="../../assets/image/mycenter/usre4.png" />
                    <div class="number" v-if="numItem.saleNum!=0&&numItem.noPayNum!=null">{{numItem.saleNum}}</div></div>
                    <div class="font">退款/售后</div>
                </div>
            </div>
            <div class="account">
                <div class="acc  clearfix">
                    <div class="fl">保证金管理</div>
                    <div class="fr" @click="bond"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
                <div class="remain clearfix">
                    <div class="mon fl">
                        <span >保证金总额</span><br> 
                        <!-- <span class="span1">{{list.wallet.totalMoney}}CNY</span>  -->
                        <span class="span1">{{totalMoney | money}}CNY</span>
                    </div>
                    <button class="fr" @click="cash">提现</button>
                    <button class="fr" @click="recharge">充值</button>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">地址管理</div>
                    <div class="fr" @click="address()"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">会员中心</div>
                    <div class="fr" @click="member"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">帮助中心</div>
                    <div class="fr" @click="help"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
            </div>
            
        </div>
        <div class="content" v-if='!logined'>
            <div class="unlogin">
                <div class="pic"><span class="iconfont icon-tupian"></span></div>
                <div class="hel">HELLO!</div>
                <div class="log">请登录</div>
                <div class="link" @click="logins()">快来登录，和我们一起没羞没臊的捡漏吧！</div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">帮助中心</div>
                    <div class="fr">...</div>
                </div>
            </div>
        </div>
        <div class="sell-spic">
                <ul >
                    <li  v-for="(falg,index) in footPrint" :style= "getPos(index)" >
                       <div class="xiajia" v-if="falg.available==false"><p>已下架</p></div>
                       <img :src="picHead + falg.picItems[0]" alt="" srcset="" @click="Routerid(falg.id)">
                    </li>
                </ul>
                <!-- available -->
        </div>
        <div class="v_modaltou" ref="v_modaltou" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="remrealname()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">PROMPT</p>

                 <p>提示</p>
                 <p  class="v_box_img">请先实名认证</p>
                 <!-- <div><img src="../../assets/image/mycenter/scy.png" /></div> -->
                 <div class="v_button" @click='realname()'> 
                     去认证
                 </div>
           </div>
        </div>
        <div :class="isX ? 'gives':'give'"><p><a href="tel:4001887107">马上送拍</a></p></div>
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
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:4001887107">
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
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue";
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '茗探',
                logined:true,
                errorImg01: 'this.src="' + require('../../assets/image/mycenter/head.png') + '"',
                img:[
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'
                ],
                list:'',
                numItem:'',//数字
                totalMoney:'',//保证金总额
                noPayNum:'',//待支付数量
                noGetNum:'',//待收货数量
                saleNum:'',//售后数量
                footPrint:'',//浏览记录
                ServiceBox:false,
                v_modal:false,
                isX:false,
            }
        },
        components:{'home-item':itemc},
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
            picHead() {
                return this.$store.state.picHead
            },
        },
        mounted: function() {
            common.onMove('.personalCenter')
            common.onMove2('.sell-spic')
            this.getUsers()
            this.getFootPrint()
            if(this.isIphoneX()){
                this.isX = true;
            }else{
                this.isX = false;
            }
        },
        methods: {
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
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
            logins:function(){
                this.$router.push({path:"/login"})
            },
            getPos:function(index) {
                var str = 2.3*(index)+'rem';
                str='left:'+str;
                return str;
            },
            bond:function(){
                 this.$router.push({path:"/myaccount"})
            },
            Routerid:function(id){
                this.$router.push({name:'auctionMore',params:{id:id}})
            },
            mycenter:function(){
                this.$router.push({path:"/mycenter"})
            },
            cash:function(){
                if(this.list.realNameStatus==2){
                    this.$router.push({path:"/cash"})
                }else{
                    this.v_modal=true
                }
            },
            recharge:function(){

               this.$router.push({path:"/recharge"}) 
            },
            order:function(index){
              this.$router.push({path:"/myorder",query:{index:index}})       
            },
            address:function(){
          this.$router.push({path:"/addresslist"}) 
            },
            member:function(){
              this.$router.push({path:"/membercenter"})   
            },
            help:function(){
              this.$router.push({path:"/helpcenter"})  
            },
            remrealname:function(){
             this.v_modal=false
            },
            //去认证 
             realname:function(){
                this.$router.push({name:'realname'})
            },
            // 获取个人信息
            getUsers:function(){
                let that = this;
                  commonService.getUsers().then(function(res){
                    if(res.data.code==200){
                      that.list=res.data.datas.user
                       if(that.list.wallet!=null){
                        that.totalMoney=that.list.wallet.totalMoney
                       }
                      that.numItem=that.list.numItem  
                    }else{
                        that.logined=false
                    }

                 }) 
            },
       
            //浏览记录
                getFootPrint(){
                let that = this;
                let cookiesId  = window.localStorage.getItem('cookiesId');
             
                if(cookiesId  == undefined || cookiesId  == '' || cookiesId  == null){
                    // cookiesId  = Date.parse(new Date());
                    // cookiesId  = "zstat" + "-" + cookiesId  + "-" + Math.round(Math.random() * 3000000000);
                    // window.localStorage.setItem('cookiesId',cookiesId );
                    cookiesId=''
                }
                commonService.getFootPrint({pageNo:1,pageSize:50,cookiesId:cookiesId }).then(function(res){
                    if(res.data.code === 200){
                        that.footPrint=res.data.datas.datas
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
    .v_personalCenter{
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
    .personalCenter{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 1.2rem;

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
        // margin-top: @size45;
        padding:0 @size10;
        .box{
            height: 3.4rem;
            width: 100%;
            border-bottom: 1px solid rgb(130, 135, 140);
            .v_boxImg{
                width: 1.73rem;
                height: 1.73rem;
                margin: 0.866rem 0 0 @size20;
               
                position: relative;
                .v_img{
                    width: 1.73rem;
                    height: 1.73rem;
                    border-radius: 50%;
                    overflow: hidden;
                img{
                    width: 1.93rem;
                    height: 1.93rem;
                    margin: -0.1rem -0.1rem;
                    // height: 100%;
                     
                }
               }
               
                .member{
                    width: 0.5rem;
                    height: 0.5rem;
                    position: relative;
                    // border:1px solid red;
                    border-radius: 50%;
                    background: #fff;
                    margin-top: -1.7rem;
                    margin-left: 1.2rem;
                    text-align: center;
                    line-height: 0.4533rem;
                    color: red;
                    font-size: 8px;
                    img{
                        width: 0.5rem;
                        height: 0.5rem;
                    }
                }
            }
             .info{
                margin-top: @size35;
                padding-left: @size20;
                .hel{
                    font-weight: bold;
                    letter-spacing: 1px;
                    font-size: 14px;
                    color: rgb(51, 51, 51);
                }
                .name{
                    font-size: 12px;
                    line-height: @size14;
                }
                .prove{
                        font-size: 10px;
                        line-height: 12px;
                        color:rgb(133, 133, 133);
                        padding-top:@size12;
                        img{
                            width: 12px;
                        }
                }
            }
            .fr{
                letter-spacing: @size3;
                font-weight: bold;
                margin-top: 1.2rem;
                img{
                    padding-top: 0.8rem;
                    width: 0.5rem;
                    margin-right: 0.4rem;
                }

            }
        }
        .option{
            height: @size98;
            border-bottom: 1px solid rgb(130, 135, 140);
            .litbox{
                width: 25%;
                height: 100%;
                .pic{
                    width: @size22;
                    height: @size18;
                    display: inline-block;
                    margin-top: 0.54rem;
                    margin-left: @size30;
                    position: relative;
                    i{
                        width: 100%;
                        height: 100%;
                        font-size: @size20;
                    }
                    img{
                        width: @size30;
                        height: @size30;
                        
                    }
                    .number{
                      position: absolute;
                      right: -@size10;
                      top: -@size2;
                      width: @size14;
                      height: @size14;
                      background: #eb6200;
                      border:1px solid #eb6200;
                      border-radius: 50%;
                      font-size: 8px;
                      color: #fff;
                      text-align: center;
                      line-height: @size14;
                    }
                }
                .font{
                    font-size: 12px;
                    text-align: center;
                    padding-top: @size20;
                    color: rgb(51,51,51);
                
                }
            }
            
            
            
        }
        .account{
            box-sizing: border-box;
            .acc{
                height: @size35;
                border-bottom: 1px solid rgb(202, 209, 217);
                margin-left: @size10;
                .fl{
                    font-size: 12px;
                    line-height: @size35;
                    color: rgb(51, 51, 51);
                }
                .fr{
                    letter-spacing: @size3;
                    font-weight: bold;  
                    padding-right: @size10;
                    line-height: 0.8rem;
                     img{
                        width: 0.5rem;
                        margin-top: @size16;
                    }

                }
            }
            .remain{
                height: @size55;
                border-bottom: 1px solid rgb(130, 135, 140);
                padding-right: @size10;
                .mon{
                    padding-left: @size10;
                    padding-top: @size10;
                    span{
                        font-size: 10px;
                    }
                    .span1{
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
                .fr{
                    margin-top: @size15;
                    border: 1px solid rgb(202, 209, 217);
                    margin-left: @size10;
                    background: white;
                    outline: none;
                    height: @size25;
                    line-height: @size25;
                    width: 1.8rem;
                    font-size: 12px;
                    color: rgb(51, 51, 51);
                }
            }
        }
        .center{
            border-bottom: 1px solid rgb(130,135,140);
            box-sizing: border-box;
            .address{
                // box-sizing: border-box;
                height: @size35;
                border-bottom: 1px solid rgb(202, 209, 217);
                margin-left: @size10;
                .fl{
                    font-size: 12px;
                    line-height: @size35;
                }
                .fr{
                    letter-spacing: @size3;
                    font-weight: bold;  
                    padding-right: @size10;
                    line-height: 0.8rem;
                     img{
                        width: 0.5rem;
                        margin-top: @size16;
                    }
                }
            }
            .address:last-child{
                border-bottom:none;
            }
        }
        .unlogin{
            height: 10.3333rem;
            border-bottom: 1px solid black;
            box-sizing: border-box;
            text-align: center;
            .pic{
                padding-top: 3rem;

                span{
                    font-size: @size80;
                }
            }
            .hel{
                font-weight: bold;
                padding-top: @size20;
            }
            .log{
                font-size:12px;
            }
            .link{
                font-size: 10px;
                padding-top: @size25;
                text-decoration: underline;
                color: rgb(237, 121, 60);
                a{
                    font-size: 10px;
                    color: rgb(237, 121, 60);
                }
            }
        }
    }
    .sell-spic {
            width: 9.4666rem; 
            height: @size80;
            overflow: hidden;
            overflow-x: auto;
            margin-top: @size10;
            margin-left: @size10;
            padding-bottom: 2.4rem;
            ul {
                width: @size375;
                height: @size80;
                position: relative;
                li {
                    position: absolute;
                    width: @size80;
                    height: @size80;
                    // margin-left: @size5;
                    // margin-right: 10px;
                    background: gray;
                    overflow: hidden;
                    
                    img {
                        // width: @size80;
                       width: 2.75rem;
                      height: 2.1333rem;
                      margin-left: -0.35rem;
                      vertical-align: top;
                    }
                    .xiajia{
                    position: absolute;
                    width: @size80;
                    height: @size80;
                    // z-index: 10;
                    // background: #000;
                    // opacity: 0.5;
                     background-color: rgba(0,0,0,0.5);
                       p{
                         position: absolute;
                         bottom: 0;
                         left: 0;
                         width: 100%;
                         height: @size20;
                         line-height: @size20;
                         font-size: 12px; 
                         color:#fff;
                         text-align: center;

                      }
                    }
                }
            }
    }
    .give{
        height: @size35;
        width: 100%;
        background-image:url('../../assets/image/mycenter/zu8.png') ;
        background-size: 100% 100%;
        color: white;
        position: fixed;
        left: 0;
        bottom: @size45;
        font-size: 10px;
        line-height: @size35;
        padding-left: @size20;
        p{
            margin-right: 1.4rem;
            font-size: 10px;
            text-align: right; 
            a{  
                padding: 4px 10px;
                background: rgb(0, 27, 72);
                border-radius: 3px;
                color: #fff;
                font-size: 10px;
            }
        }
        
        
    }
    .gives{
        height: @size35;
        width: 100%;
        background-image:url('../../assets/image/mycenter/zu8.png') ;
        background-size: 100% 100%;
        color: white;
        position: fixed;
        left: 0;
        bottom: 1.6rem;
        font-size: 10px;
        line-height: @size35;
        padding-left: @size20;
        p{
            margin-right: 1.4rem;
            font-size: 10px;
            text-align: right;
            a{
                color: #fff;
                font-size: 12px;
            }
        }


    }
}
 .v_modaltou{
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

</style>

