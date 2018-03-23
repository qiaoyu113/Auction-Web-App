<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心 -->
    <div class="personalCenter"  v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content" v-if="logined">
            <div class="box clearfix ">
                <div class="boxImg fl" @click="mycenter()">
                    <img :src="picHead + list.headImg" alt="" :onerror="errorImg01"/>
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
                    <div class="font">待付款</div>
                </div>
                <div class="litbox fl" @click="order(2)">
                    <div class="pic">
                    <!-- <i class="iconfont icon-tupian"></i> -->
                    <img src="../../assets/image/mycenter/usre3.png" />
                    <div class="number" v-if="numItem.noGetNum!=0&&numItem.noPayNum!=null">{{numItem.noGetNum}}</div></div>
                    <div class="font">待收货</div>
                </div>
                <div class="litbox fl">
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
                    <li  v-for="(falg,index) in footPrint" :style= "getPos(index)" ><div class="xiajia" v-if="falg.available==false"><p>已下架</p></div><img :src="picHead + falg.picItems[0]" alt="" srcset="" @click="Routerid(falg.id)"></li>
                </ul>
                <!-- available -->
        </div>
        <div class="give">我要送拍</div>
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
            this.getUsers()
            this.getFootPrint()

        },
        methods: {
            logins:function(){
                this.$router.push({path:"/login"})
            },
            getPos:function(index) {
                var str = 95*(index)+'px';
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
                this.$router.push({path:"/cash"})
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
            // 获取个人信息
            getUsers:function(){
                let that = this;
                  commonService.getUsers().then(function(res){
                    if(res.data.code==200){
                      that.list=res.data.datas.user
                      console.log(that.list)
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


        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .personalCenter{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
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
        padding:0 @size10;
        .box{
            height: 3.4rem;
            width: 100%;
            border-bottom: 1px solid rgb(51, 51, 51);
            .boxImg{
                width: 1.73rem;
                height: 1.73rem;
                padding: 0.866rem 0 0 @size20;
                position: relative;
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
                    img{
                        width: @size22;
                        height: @size22;
                        
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
            }
            .link{
                padding-top: @size25;
                text-decoration: underline;
                color: red;
                a{
                    font-size: @size10;
                    color: red;
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
                        width: @size80;
                        height: @size80;
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
        background: gray;
        color: white;
        position: fixed;
        left: 0;
        bottom: @size45;
        font-size: @size10;
        line-height: @size35;
        padding-left: @size20;
    }
}

</style>

