<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="myorder-center" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="return fl" @click="Return()">&lt;</span> 
            <span class="font fl" :class="index==0 ? 'check' : ''" @click='getIndex(0)'>全部</span>
            <span class="font fl" :class="index==1 ? 'check' : ''" @click='getIndex(1)'>待付款</span>
            <span class="font fl" :class="index==2 ? 'check' : ''" @click='getIndex(2)'>待收货</span>
            <span class="font fl" :class="index==3 ? 'check' : ''" @click='getIndex(3)'>售后</span>
            <span class="span1" @click="rto()"><img src="../../assets/image/mycenter/c3.png" /></span>
        </div>
        <div class="content">
            <!-- 待付款 -->
            <div v-if="index!=3">
            <div class="account" v-if="index!=3" v-for="(list,index) in datalist">
                <div class="item">
                    <span>订单号:{{list.orderNo}}</span>
                    <span class="fr bgcolor" v-if="list.status==1">待付款</span>
                    <span class="fr bgcolor" v-if="list.status==2">处理中</span>
                    <span class="fr" v-if="list.status==3">待发货</span>
                    <span class="fr" v-if="list.status==4">已发货</span> 
                    <div class="v_rosr" v-if="list.status==6 || list.status==5"><img src="../../assets/image/mycenter/sc.png" /></div>
                    <span class="fr" v-if="list.status==6">已关闭</span>
                    <span class="fr" v-if="list.status==5">已完成</span>
                    <div class="time fr" v-if="list.status==1">
                        <div class="fr num">15</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">00</div>
                    </div>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl" v-for="(img,index) in list.orderDetail.picItems" v-if="index==0">
                        <img :src="picHead + img" onerror="this.src='http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">{{list.amount | money}} CNY</div>
                        <div class="name">{{list.orderTitle}}</div>
                        <div class="prove"> LOT-{{list.orderDetail.auctionNo}}</div>
                        <button class="fr" @click="details(list.status,list.orderNo)">查看订单</button>
                        <button class="fr" v-if="list.status==1" @click="details(list.status,list.orderNo)">立即付款</button>
                        <button class="fr" v-if="list.status==2 || list.status==3">分享</button>
                    </div>
                </div>
            </div>
            </div>
            <!-- 售后 -->
            <div v-if="index==3">
            <div class="account" v-for="(list,index) in ordercs">
                <div class="item">
                    <span>订单号:{{list.orderNo}}</span>
                    <span class="fr" v-if="list.status!=4">售后中</span>
                    <span class="fr" v-if="list.status==4">已完成</span>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img :src="picHead + list.picItems[0]" onerror="this.src='http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'"/>
                    </div>
                    <div class="info fl">
                        <div class="hel">{{list.amount | money}} CNY</div>
                        <div class="name">{{list.auctionName}}</div>
                        <div class="prove">LOT-{{list.auctionNo}}</div>
                        <button class="fr" @click="shouhou(list.status,list.id)">查看订单</button>
                       
                    </div>
                </div>
            </div>
            </div>

        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue"
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '传家',
                index:0,
                datalist:'',
                branch:[],
                hour:[],
                ordercs:'',//售后
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
            picHead(){
                return this.$store.state.picHead
            }
        },
        mounted: function() {
            
             common.onMove('.myorder-center')
            this.routers()
            this.getOrder()
            this.getOrdercs()
            
        },
        methods: {
            rto:function(){
                this.$router.push({path:"/my"}) 
            },
            Return:function(){
                window.history.go(-1)
            },
            routers:function(){
               
                 let index= this.$route.query.index
                if(index!=''){
                    this.index=index
                }
            },
            getPos:function(index) {
                var str = 95*(index)+'px';
                str='left:'+str;
                return str;
            },
            getIndex:function(index){
                let that = this;
                if(index === 1){
                    that.index = 1;
                    that.getOrder();
                }else if(index==2){
                    that.index = 2;
                    that.getOrder();
                }else if(index==3){
                    that.index = 3;
                 

                }else if(index==0){
                    that.index = 0;
                    that.getOrder();
                }
            },
            details:function(type,id){
                if(type==6){
                    this.$router.push({path:"/closeorder",query:{id:id}})  
                }else{
                    this.$router.push({path:"/normalorder",query:{id:id}})  
                }
            },
            shouhou:function(type,id){
                  this.$router.push({path:"/afterorder",query:{id:id}})    
            },
            // 获取我的订单
            getOrder:function(){
                let that=this;
                let status='1,2,3,4,5,6'
                if(that.index === 1){
                    status = '1';
                }else if(that.index==2){
                    status = '2,3,4';
                }else if(that.index==0){
                    status = '1,2,3,4,5,6';
                }
               commonService.getOrder({pageNo:1,pageSize:10,status:status}).then(function(res){
                      that.datalist=res.data.datas.datas
                    
                    })
            },
             // 获取售后列表
            getOrdercs:function(){
                let that=this;
               commonService.getOrdercs({pageNo:1,pageSize:30}).then(function(res){
                      that.ordercs=res.data.datas.datas
                    })
            },

        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .myorder-center{
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
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        // position: fixed;
        // top: @size45;
        // z-index: 100;
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
            img{
                width: @size30;
                height: @size30;
            }
        }
        .check{
            border-bottom:2px solid black;
            color: black;
        }
    }
    .content{
        // margin-top: @size80;
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
                .v_rosr{
                    float: right;
                    width: @size20;
                    height: @size20;
                    margin-top: @size10;
                    border-left: 1px solid #ccc;
                    img{
                        width: @size24;
                        height: @size20;
                    }

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
}
</style>

