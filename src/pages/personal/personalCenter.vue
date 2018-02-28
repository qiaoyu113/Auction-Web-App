<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心 -->
    <div class="" id="personal" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content" v-if="logined">
            <div class="box clearfix ">
                <div class="boxImg fl">
                    <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                    <div class="member"><i class="iconfont icon-duigoudunpai"></i></div>
                </div>
                <div class="info fl">
                    <div class="hel">HELLO!</div>
                    <div class="name">冰箱胖</div>
                    <div class="prove">
                        <i class="iconfont icon-duigoudunpai"></i>&nbsp;实名认证
                    </div>
                </div>
                <div class="fr">...</div>
            </div>
            <div class="option clearfix">
                <div class="litbox fl">
                    <div class="pic"><i class="iconfont icon-tupian"></i></div>
                    <div class="font">全部订单</div>
                </div>
                <div class="litbox fl">
                    <div class="pic"><i class="iconfont icon-tupian"></i></div>
                    <div class="font">待付款</div>
                </div>
                <div class="litbox fl">
                    <div class="pic"><i class="iconfont icon-tupian"></i></div>
                    <div class="font">待收货</div>
                </div>
                <div class="litbox fl">
                    <div class="pic"><i class="iconfont icon-tupian"></i></div>
                    <div class="font">退款/售后</div>
                </div>
            </div>
            <div class="account">
                <div class="acc  clearfix">
                    <div class="fl">保证金账户</div>
                    <div class="fr">...</div>
                </div>
                <div class="remain clearfix">
                    <div class="mon fl">
                        <span >余额</span><br> 
                        <span class="span1">500,000CNY</span> 
                    </div>
                    <button class="fr">提现</button>
                    <button class="fr">充值</button>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">地址管理</div>
                    <div class="fr">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">会员中心</div>
                    <div class="fr">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">帮助中心</div>
                    <div class="fr">...</div>
                </div>
            </div>
            
        </div>
        <div class="content" v-if='!logined'>
            <div class="unlogin">
                <div class="pic"><span class="iconfont icon-tupian"></span></div>
                <div class="hel">HELLO!</div>
                <div class="log">请登录</div>
                <div class="link"><a @click="goLogin()">快来登录，和我们一起没羞没臊的捡漏吧！</a></div>
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
                    <li  v-for="(falg,index) in img" :style= "getPos(index)" ><img :src="falg" alt="" srcset=""></li>
                </ul>
        </div>
        <div class="give">我要送拍</div>
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue";
    export default {
        data () {
            return {
                title: '个人中心',
                logined:false,
                img:[
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'
                ],
                
            }
        },
        components:{'home-item':itemc},
        syncData({store}) {
            /*基本规则
            * 所有不需要token的请求都放在这里
            * 这里不出现window，document等DOM元素
            * 这里获得的数据都要存储在store中
            * 写法如下
            * */
            const that = this;
            /*
            * 将所有的请求处理以数组放在promise中
            * that.data().data调用数据
            * */
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
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */

        },
        methods: {
            getPos:function(index) {
                var str = 95*(index)+'px';
                str='left:'+str;
                return str;
            },
            goLogin:function(){
                let that = this;
                that.$router.push({name:'login'})
            }
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    #personal{
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
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                    .member{
                        width: 0.4533rem;
                        height: 0.4533rem;
                        position: relative;
                        margin-top: -1.7rem;
                        margin-left: 1.4rem;
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
                        i{
                            width: 100%;
                            height: 100%;
                            font-size: @size20;
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
            ul {
                width: @size375;
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

