<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
            <span class="return fl">&lt;</span> 
            <span class="font fl" :class="index==0 ? 'check' : ''" @click='getIndex(0)'>全部</span>
            <span class="font fl" :class="index==1 ? 'check' : ''" @click='getIndex(1)'>待付款</span>
            <span class="font fl" :class="index==2 ? 'check' : ''" @click='getIndex(2)'>待收货</span>
            <span class="font fl" :class="index==3 ? 'check' : ''" @click='getIndex(3)'>售后</span>
            <span class="span1">c</span>
        </div>
        <div class="content">
            <!-- 待付款 -->
            <div class="account" v-if="index==1||index==0">
                <div class="item">
                    <span>订单号:87540097</span>
                    <span class="fr bgcolor">待付款</span>
                    <div class="time fr">
                        <div class="fr num">01</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">02</div>
                    </div>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">500,000 CNY</div>
                        <div class="name">茶壶茶壶</div>
                        <div class="prove">20180606-100</div>
                        <button class="fr">查看订单</button>
                        <button class="fr">立即付款</button>
                    </div>
                </div>
            </div>
            <!-- 待付款-处理中 -->
            <div class="account" v-if="index==1||index==0">
                <div class="item">
                    <span>订单号:87540097</span>
                    <span class="fr bgcolor">处理中</span>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">500,000 CNY</div>
                        <div class="name">茶壶茶壶</div>
                        <div class="prove">20180606-100</div>
                        <button class="fr">查看订单</button>
                        <button class="fr">分享</button>
                    </div>
                </div>
            </div>
            <!-- 待发货 -->
            <div class="account" v-if="index==2||index==0">
                <div class="item">
                    <span>订单号:87540097</span>
                    <span class="fr">待发货</span>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">500,000 CNY</div>
                        <div class="name">茶壶茶壶</div>
                        <div class="prove">20180606-100</div>
                        <button class="fr">查看订单</button>
                    </div>
                </div>
            </div>
            <!-- 售后 -->
            <div class="account" v-if="index==3||index==0">
                <div class="item">
                    <span>订单号:87540097</span>
                    <span class="fr iconfont icon-tupian"></span>
                    <span class="fr">已完成</span>
                    
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">500,000 CNY</div>
                        <div class="name">茶壶茶壶</div>
                        <div class="prove">20180606-100</div>
                        <button class="fr">查看订单</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue";
    export default {
        data () {
            return {
                title: '个人中心',
                index:0,
                
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
            getIndex:function(index){
                let that = this;
                if(index === 1){
                    that.index = 1;
                }else if(index==2){
                    that.index = 2;
                }else if(index==3){
                    that.index = 3;
                }else if(index==0){
                    that.index = 0;
                }
            },
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
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        .return{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: @size20;
        }
        .font{
            display: inline-block;
            font-size: @size14;
            line-height: @size30;
            
            padding-top: @size3; 
            margin-left: @size25;
            color: rgb(157, 169, 177);
        }
        .span1{
            float: right;
            padding-right: 20px;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            text-align: center;
            line-height: @size30;
        }
        .check{
            border-bottom:2px solid black;
            color: black;
        }
    }
    .content{
        margin-top: @size80;
        margin-bottom: 1.2rem;
        padding:0 @size10;
        .account{
            box-sizing: border-box;
            .item{
                height: @size40;
                border-bottom: 1px solid rgb(129, 135, 140);
                line-height: @size40;
                margin-left: @size10;
                span{
                    font-size: @size10;
                    color: rgb(129, 135, 140);
                    padding-right: @size10;
                }
                .bgcolor{
                    color: red;
                }
                .time{
                    display: inline-block;
                    color: black;
                    margin-right: @size10;
                    box-sizing: border-box;
                    padding: 1px;
                    .num{
                        box-sizing: border-box;
                        height: @size25;
                        background: white;
                        border: 1px solid black;
                        border-radius:3px;
                        padding: @size3 @size2; 
                        margin-top:@size5; 
                        line-height: 0.50rem;
                        font-size: @size12;
                        font-weight: bold;
                    }
                    .colon{
                        text-align: center;
                        margin-top:@size6; 
                        line-height: @size22;
                        width: @size10;
                    }
                }
            }
            .box{
                height: 2.933rem;
                width: 100%;
                border-bottom: 1px solid rgb(51, 51, 51);
                .boxImg{
                    width: @size80;
                    height: @size80;
                    padding: @size15 0 0 @size10;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
                    margin-top: @size15;
                    padding-left: @size20;
                    width: 6.4rem;
                    .hel{
                        font-weight: bold;
                        font-size: @size15;
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
                    }
                    .fr{
                        border: 1px solid rgb(202, 209, 217);
                        margin-left: @size10;
                        background: white;
                        outline: none;
                        height: @size25;
                        width: 1.8666rem;
                        font-size: @size10;
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
</style>

