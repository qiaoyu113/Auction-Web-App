<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心 -->
    <div class="gologin"  v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content" v-if="logined">
            <div class="box clearfix ">
                <div class="boxImg fl" @click="mycenter()">
                    <img src="../../assets/image/mycenter/ph.png"/>
                    <div class="member">v{{list.vipLevel}}</div>
                </div>
                <div class="info fl">
                    <div class="hel">HELLO!</div>
                    <div class="name">{{list.name}}</div>
                    <div class="prove" v-if="list.realNameStatus==2">
                        <i class="iconfont icon-duigoudunpai"></i>&nbsp;实名认证
                    </div>
                </div>
                <div class="fr" @click="mycenter()">...</div>
            </div>
            <div class="option clearfix">
                <div class="litbox fl" @click="order(0)">
                    <div class="pic"><i class="iconfont icon-tupian"></i></div>
                    <div class="font">全部订单</div>
                </div>
                <div class="litbox fl" @click="order(1)">
                    <div class="pic"><i class="iconfont icon-tupian"></i><div class="number" v-if="numItem.noPayNum!=0&&numItem.noPayNum!=null">{{numItem.noPayNum}}</div></div>
                    <div class="font">待付款</div>
                </div>
                <div class="litbox fl" @click="order(2)">
                    <div class="pic"><i class="iconfont icon-tupian"></i><div class="number" v-if="numItem.noGetNum!=0&&numItem.noPayNum!=null">{{numItem.noGetNum}}</div></div>
                    <div class="font">待收货</div>
                </div>
                <div class="litbox fl">
                    <div class="pic"><i class="iconfont icon-tupian"></i><div class="number" v-if="numItem.saleNum!=0&&numItem.noPayNum!=null">{{numItem.saleNum}}</div></div>
                    <div class="font">退款/售后</div>
                </div>
            </div>
            <div class="account">
                <div class="acc  clearfix">
                    <div class="fl">保证金管理</div>
                    <div class="fr" @click="bond">...</div>
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
                    <div class="fr" @click="address()">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">会员中心</div>
                    <div class="fr" @click="member">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">帮助中心</div>
                    <div class="fr" @click="help">...</div>
                </div>
            </div>
            
        </div>
        <div class="content" v-if='!logined'>
            <div class="unlogin">
                <div class="pic"><img src="../../assets/image/mycenter/ph.png"/></div>
                <div class="hel">HELLO!</div>
                <div class="log">请登录</div>
                <div class="link" @click="logins()">快来登录，和我们一起没羞没臊的捡漏吧</div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">帮助中心</div>
                    <div class="fr" @click="help()"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
            </div>
        </div>
        <div class="sell-spic">
                <ul >
                    <li  v-for="(falg,index) in footPrint" :style= "getPos(index)" ><div class="xiajia" v-if="falg.available==false"><p>已下架</p></div><img :src="picHead + falg.picItems[0]" alt="" srcset="" @click="Routerid(falg.id)"></li>
                </ul>
                <!-- available -->
        </div>
        <div :class="isX ? 'gives':'give'">
           <p><a href="tel:15801619600">我要送拍</a></p>
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
                title: '传家',
                logined:false,
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
            common.onMove('.gologin')
            common.onMove2('.sell-spic')
//            this.onMove();
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
            logins:function(){
                this.$router.push({path:"/login"})
            },
            helpcenters:function(){
                this.$router.push({path:"/helpcenter"})
            },
            getPos:function(index) {
                var str = 95*(index)+'px';
                str='left:'+str;
                return str;
            },
            bond:function(){
                 this.$router.push({path:"/myaccount"})
            },
            Routerid:function(){
                this.$router.push({name:'auctionMore',params:{id:id}})
            },
            mycenter:function(){
                this.$router.push({path:"/mycenter"})
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
            // 帮助中心
            help:function(){
              this.$router.push({path:"/helpcenter"})  
            },
            //浏览记录
                getFootPrint(){
                let that = this;
                let cookiesId  = window.localStorage.getItem('cookiesId');
             
                if(cookiesId  == undefined || cookiesId  == '' || cookiesId  == null){
                    cookiesId  = Date.parse(new Date());
                    cookiesId  = "zstat" + "-" + cookiesId  + "-" + Math.round(Math.random() * 3000000000);
                    window.localStorage.setItem('cookiesId',cookiesId );
                }
                commonService.getFootPrint({pageNo:1,pageSize:30,cookiesId:cookiesId }).then(function(res){
                    if(res.data.code === 200){
                        that.footPrint=res.data.datas.datas
                    }
                })
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
            //页面滑动问题
            onMove:function(){
                let overscroll = function(el) {
                    el.addEventListener('touchstart', function() {
                        let top = el.scrollTop
                            , totalScroll = el.scrollHeight
                            , currentScroll = top + el.offsetHeight
                        if(top === 0) {
                            el.scrollTop = 1
                        } else if(currentScroll === totalScroll) {
                            el.scrollTop = top - 1
                        }
                    })
                    el.addEventListener('touchmove', function(evt) {
                        //if the content is actually scrollable, i.e. the content is long enough
                        //that scrolling can occur
                        if(el.offsetHeight < el.scrollHeight)
                            evt._isScroller = true
                    })
                }
                overscroll(document.querySelector('.gologin'));
                document.body.addEventListener('touchmove', function(evt) {
                    //In this case, the default behavior is scrolling the body, which
                    //would result in an overflow.  Since we don't want that, we preventDefault.
                    if(!evt._isScroller) {
                        evt.preventDefault()
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
    .gologin{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 0;
          margin:auto;
        .talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #343c47;
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
        // margin-top: @size45;
        padding:0 @size10;
        .box{
            height: 3.4rem;
            width: 100%;
            border-bottom: 1px solid rgb(51, 51, 51);
            .boxImg{
                width: 1.73rem;
                height: 1.73rem;
                padding: 0.866rem 0 0 @size20;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
                .member{
                    width: 0.4533rem;
                    height: 0.4533rem;
                    position: relative;
                    border:1px solid red;
                    border-radius: 50%;
                    background: #fff;
                    margin-top: -1.7rem;
                    margin-left: 1.2rem;
                    text-align: center;
                    line-height: 0.4533rem;
                    color: red;
                    font-size: 8px;
                }
            }
             .info{
                margin-top: @size35;
                padding-left: @size20;
                .hel{
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                .name{
                    font-size: @size14;
                    line-height: @size14;
                }
                .prove{
                        font-size: 8px;
                        color:rgb(133, 133, 133);
                        padding-top:@size3 ;
                        i{
                            color: rgb(0, 184, 176)
                        }
                }
            }
            .fr{
                letter-spacing: @size3;
                font-weight: bold;
                margin-top: 1.8rem;
            }
        }
        .option{
            height: @size98;
            border-bottom: 1px solid rgb(51, 51, 51);
            .litbox{
                width: 25%;
                height: 100%;
                .pic{
                    width: @size22;
                    height: @size18;
                    display: inline-block;
                    margin-top: @size30;
                    margin-left: @size35;
                    position: relative;
                    i{
                        width: 100%;
                        height: 100%;
                        font-size: @size20;
                    }
                    .number{
                      position: absolute;
                      right: -@size6;
                      top: -@size6;
                      width: @size14;
                      height: @size14;
                      background: red;
                      border:1px solid red;
                      border-radius: 50%;
                      font-size: 8px;
                      color: #fff;
                      text-align: center;
                      line-height: @size14;
                    }
                }
                .font{
                    font-size: @size15;
                    text-align: center;
                    padding-top: @size10;
                    font-size: @size10;
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
                    font-size: @size12;
                    line-height: @size35;
                }
                .fr{
                    letter-spacing: @size3;
                    font-weight: bold;  
                    padding-right: @size10;
                }
            }
            .remain{
                height: @size55;
                border-bottom: 1px solid rgb(51, 51, 51);
                padding-right: @size10;
                .mon{
                    padding-left: @size10;
                    padding-top: @size10;
                    span{
                        font-size: @size10;
                    }
                    .span1{
                        font-size: @size14;
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
                    width: 1.8rem;
                    font-size: @size10;
                }
            }
        }
        .center{
            border-bottom: 1px solid black;
            box-sizing: border-box;
            .address{
                // box-sizing: border-box;
                height: @size35;
                margin-left: @size10;
                .fl{
                    font-size: @size12;
                    line-height: @size35;
                }
                .fr{
                    letter-spacing: @size3;
                    font-weight: bold;  
                    padding-right: @size10;
                    margin-top: 0.06rem;
                      img{
                        width: 0.5rem;
                        margin-top: @size16;
                    }
                }
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
                font-size:@size12;
                font-size: 12px;
            }
            .link{
                font-size: 10px;
                padding-top: @size25;
                text-decoration: underline;
                color: rgb(237, 121, 60);
                a{
                    font-size: @size10;
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
                    margin-left: @size5;
                    background: gray;
                    img {
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
        font-size: @size10;
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
    .gives{
        height: @size35;
        width: 100%;
        background-image:url('../../assets/image/mycenter/zu8.png') ;
        background-size: 100% 100%;
        color: white;
        position: fixed;
        left: 0;
        bottom: 1.6rem;
        font-size: @size10;
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

</style>

