<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="v_myorder-center"> 
        <div class="nav">
            <span class="return fl" @click="Return()">
                <i class="iconfont icon-fanhui"></i>
            </span>
            <span class="font fl" :class="index==0 ? 'check' : ''" @click='getIndex(0)'>全部</span>
            <span class="font fl" :class="index==1 ? 'check' : ''" @click='getIndex(1)'>待支付</span>
            <span class="font fl" :class="index==2 ? 'check' : ''" @click='getIndex(2)'>待收货</span>
            <span class="font fl" :class="index==3 ? 'check' : ''" @click='getIndex(3)'>售后</span>
            <span class="span1" @click="rto()"><img src="../../assets/image/mycenter/icon1.png" /></span>
        </div>
        <div id="myorder-center">
        <div id="mescroll" class="mescroll notatarts">
            <div class="mescroll-bounce">
    <div class="myorder-center" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
      
        <div class="content">
            <!-- 待付款 -->
            <div v-if="index!=3">
            <div class="account" v-for="(list,index) in myList">
                <div class="item">
                    <span>订单号:{{list.orderNo}}</span>
                    <span class="fr bgcolor" v-if="list.status==1">待支付</span>
                    <span class="fr bgcolor" v-if="list.status==2">待处理</span>
                    <span class="fr" v-if="list.status==3">待发货</span>
                    <span class="fr" v-if="list.status==4">已发货</span> 
                    <div class="v_rosr" v-if="list.status==6 || list.status==5"><img src="../../assets/image/mycenter/sc.png"  @click="deleteorder(list.orderNo)"/></div>
                    <span class="fr" v-if="list.status==6">已关闭</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==0">已完成</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==1">已完成</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==2">售后中</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==3">售后中</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==4">已完成</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==5">已完成</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==6">已完成</span>

                   <!--  <span class="fr" v-if="list.status==5&&list.csStatus==7">售后中</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==8">已完成</span>
                    <span class="fr" v-if="list.status==5&&list.csStatus==9">售后中</span> -->
                    <div class="time fr" v-if="list.status==1">
                        <div class="fr num">{{list.expireTimes2}}</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">{{list.expireTimes}}</div>
                    </div>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl" v-for="(img,index) in list.orderDetail.picItems" v-if="index==0">
                        <img :src="picHead + img" onerror="this.src='http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'"/>
                    </div>
                    <div class="info fl clearfix">
                        <div class="hel">{{list.amount | money}} CNY</div>
                        <div class="name">{{list.orderTitle}}</div>
                        <div class="prove"> LOT-{{list.orderDetail.auctionNo}}</div>
                        
                        <button class="fr" @click="details(list.status,list.orderNo,list.csStatus)">查看订单</button>
                     <!--    <button class="fr"  v-if="list.csStatus!=0" @click="shouhou(list.status,list.id)">查看订单</button> -->

                        <button class="fr" v-if="list.status==1" @click="details(list.status,list.orderNo)">立即支付</button>
                        <!-- <button class="fr" v-if="list.status==2 || list.status==5">分享</button> -->
                    </div>
                </div>
            </div>
            </div>
            <!-- 售后 -->
            <div v-if="index==3">
            <div class="account" v-for="(list,index) in ordercs">
                <div class="item">
                    <span>订单号:{{list.orderNo}}</span>
                    <span class="fr" v-if="list.status!=6 && list.status!=8">售后中</span>
                    <span class="fr" v-if="list.status==6 || list.status==8">已完成</span>
                </div>
                <div class="box clearfix ">
                    <div class="boxImg fl">
                        <img :src="picHead + list.picItems[0]" onerror="this.src='http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg'"/>
                    </div>
                    <div class="info fl clearfix">
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
        </div>
        </div>
        </div>
         <div class="v_modal" ref="v_modal" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="heigorder()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">REMOVE ITEM</p>
                 <p>删除</p>
                 <div class="v_box_img"><img src="../../assets/image/mycenter/scy.png" /></div>
                 <p>是否删除订单?</p>
                 <div class="v_button" @click='deleteOrderid()'> 
                     确定
                 </div>
           </div>
        </div>
        <!--分享提示-->
        <div class="shareBox" v-if="shareHint">可以使用浏览器分享按钮分享给好友哦</div>
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
     import MeScroll from 'mescroll'
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
                countdown:[],
                myList:[

                ],
                page:{num:1,size:10},
                isShowNoMore:false,
                totalPage:'',
                ServiceBox:false,
                shareHint:false,
                v_modal:false,
                deleteorderid:'',//删除订单ID
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
            
             common.onMove('#mescroll')
            this.routers()
            // this.getOrder()
            this.getOrdercs()
            this.meScroll()
        
            
        },
        //  watch:{
        //      index:function(){
        //           this.myList=[]
        //           this.page= {num:1,size:10}
        //      }
        // },
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
         
            rto:function(){
                this.$router.push({path:"/my"}) 
            },
            Return:function(){
                 this.$router.push({path:"/personalCenter"}) 
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
                this.$router.push({path:"/myorder",query:{index:index}})  
                location.reload();
                // if(index === 1){
                //     that.index = 1;
                //      that.myList=[]
                //      that.page.num= 1
                //      that.totalPage=''
                //      that.isShowNoMore=true,
                //     that.meScroll();
                // }else if(index==2){
                //     that.index = 2;
                //      that.myList=[]
                //      that.page.num= 1
                //      that.totalPage=''
                //      that.isShowNoMore=true,
                //     that.meScroll();
                // }else if(index==3){
                //     that.index = 3;
                //     that.getOrdercs()
                // }else if(index==0){
                //      that.index = 0;
                //      that.myList=[]
                //      that.totalPage=''
                //      that.page.num= 1
                //      that.isShowNoMore=true,
                //     that.meScroll();
                // }
            },
            details:function(type,id,csStatus,list){
        
                if(type==6){
                    this.$router.push({path:"/closeorder",query:{id:id}})  
                }else if(type==5 && csStatus!=0 && csStatus!=1 ){
                     this.$router.push({path:"/afterorder",query:{id:id,type:'whole'}}) 
                }else{
                    this.$router.push({path:"/normalorder",query:{id:id}}) 
                }
            },
            shouhou:function(type,id){
                  this.$router.push({path:"/afterorder",query:{id:id,type:'cs'}})    
            },
            // 获取我的订单
            getOrder:function(){
                let that=this;
                let status='1,2,3,4,5,6'
                if(that.index === 1){
                    status = '1,2';
                }else if(that.index==2){
                    status = '3,4';
                }else if(that.index==0){
                    status = '1,2,3,4,5,6';
                }
               commonService.getOrder({pageNo:1,pageSize:10,status:status}).then(function(res){
                      that.datalist=res.data.datas.datas
                     
                  
                
                      
                    })
            },
            // 取消删除
            heigorder:function(){
                   this.v_modal=false
                   this.deleteorderid=''
            },
            // 删除订单
            deleteorder:function(id){
                this.v_modal=true
                this.deleteorderid=id
            },
            deleteOrderid:function(){
                   let that=this;
               commonService.deleteOrderid(that.deleteorderid).then(function(res){
                          that.v_modal=false
                          that.meScroll()
                    })
            },
             // 获取售后列表
            getOrdercs:function(){
                let that=this;
               commonService.getOrdercs({pageNo:1,pageSize:30}).then(function(res){
                      that.ordercs=res.data.datas.datas
                    })
            },
            //下拉刷新、加载
            meScroll: function (){
                let that = this;
                let scrollUp = document.getElementsByClassName('mescroll-upwarp');
                let scrollDown = document.getElementsByClassName('mescroll-downwarp-reset');
                for(let i = 0;i<scrollUp.length;i++){
                    scrollUp[i].parentNode.removeChild(scrollUp[i]);
                }
                for(let i = 0;i<scrollDown.length;i++){
                    scrollDown[i].parentNode.removeChild(scrollDown[i]);
                }
                let scrollWarp = document.getElementsByClassName('mescroll-downwarp');
                for(let i = 0;i<scrollWarp.length;i++){
                    scrollWarp[i].parentNode.removeChild(scrollWarp[i]);
                }
                that.mescroll = new MeScroll("mescroll", {
                    up: {
                        callback: that.upCallback,
                        page:{size:that.page.size},
                        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    },
                    down: {
                        callback: that.downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了

                    }
                });
            },
            downCallback(){
                let that = this;
                that.page.num = 1;
                that.myList = [];
                that.upCallback()
            },
            upCallback: function () {
                const that = this;
                   
                that.getListData(that.page.num, that.page.size,function(curPageData) {
              
                    if(that.page.num === 1){
                        that.myList = [];//如果是第一页需手动制空列表

                    }
                       that.myList = that.myList.concat(curPageData);    //更新列表数据 
                    

                    
                    // 加载完成后busy为false，如果最后一页则lastpage为true
                    //          加载完成后给页数+1
                    if(that.page.num >= that.totalPage) {
                        that.isShowNoMore = true;
                    }else{
                        that.isShowNoMore = false;
                    }
                    that.page.num = that.page.num + 1;
                    that.mescroll.endSuccess(curPageData.length,that.totalPage);
                    that.mescroll.endUpScroll(that.isShowNoMore)
                }, function() {
                    that.mescroll.endErr(); //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                });
            },
            getListData:function(pageNum,pageSize,successCallback,errorCallback) {
                //延时一秒,模拟联网
                const that = this;
                let status='1,2,3,4,5,6'

                if(that.index == 1){
                    status = '1,2';
                }else if(that.index==2){
                    status = '3,4';
                }else if(that.index==0){
                    status = '1,2,3,4,5,6';
                }
          
                commonService.getOrder({pageNo:pageNum,pageSize:pageSize,status:status}).then(function(res){
                
                    if(res.data.code == 200){
                        let boxlist = res.data.datas.datas;
                        that.totalPage = res.data.datas.totalPage;

                for(let i=0;i<boxlist.length;i++){
                  
                            if(boxlist[i].status == 1){
                                let now = new Date().getTime()
                                let time = '';
                                let week = Number(boxlist[i].expireTime)
                                time = week - now;
                                //初始化时间
                                if(time < 0){
                                    boxlist[i].expireTimes = '00'
                                    boxlist[i].expireTimes2 = '00'
                                    break;
                                }
                
                                let m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                                let s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                boxlist[i].expireTimes = m;
                                boxlist[i].expireTimes2 = s;
                                let timeRun = setInterval(function() {
//                                  //初始化时间
                                    let now = new Date().getTime()
                                    let week = Number(boxlist[i].expireTime);
                                    time = week - now;
                                   
                                    let ms = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                                    let ss = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                    boxlist[i].expireTimes = ms;
                                    boxlist[i].expireTimes2 = ss;
                                    if(time < 0){
                                        clearInterval(timeRun);
                                        boxlist[i].expireTimes = '00'
                                        boxlist[i].expireTimes2 = '00'
                                    }
                                },1000)
                            }
                        }

                        successCallback&&successCallback(boxlist);//成功回调
                    }else{
                        let boxlist = [];
                        successCallback&&successCallback(boxlist);//成功回调
                    }
                })
            },
            //页面滑动问题
            onMove:function(){
                let overscroll = function(el) {
                    el.addEventListener('touchstart', function() {
                        let top = el.scrollTop
                            , totalScroll = el.scrollHeight
                            , currentScroll = top + el.offsetHeight;
                        if(top === 0) {
                            el.scrollTop = 1
                        } else if(currentScroll === totalScroll) {
                            el.scrollTop = top - 1
                        }
                    });
                    el.addEventListener('touchmove', function(evt) {
                        if(el.offsetHeight < el.scrollHeight)
                            evt._isScroller = true
                    })
                };
                overscroll(document.querySelector('#mescroll'));
                document.body.addEventListener('touchmove', function(evt) {
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
    @import url("../../assets/css/common/mescroll.min.css");
.v_myorder-center{
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
    .shareBox{
            width:6rem;
            height:2rem;
            padding:0.5rem;
            box-sizing: border-box;
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
            background:#333;
            opacity: 0.9;
            text-align: center;
            color:#fff;
            font-size:14px;
            border-radius: 8px;
        }
    .nav{
        position: fixed;
        left: 0;
        top:0;
        z-index: 999;
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
            // margin-left: @size20;
             i{
                    font-size:28px;
                    margin-left: 0.3rem;
                    color:#A9AEB6;
                    // line-height: @size35;
                }
        }
        .font{
            display: inline-block;
            font-size: 13px;
            line-height: @size30;
            
            padding-top: @size3; 
            margin-left: @size25;
            color: rgb(153, 153, 153);
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
                margin-top: @size4;
            }
        }
        .check{
            border-bottom:2px solid black;
            color: rgb(51, 51, 51);
        }
    }


    #myorder-center{
        // overflow: hidden;
        #mescroll{
            width:100%;
            max-width:10rem;
            position: fixed;
            top:  @size36;
            bottom:0rem;
            left:0;
            right:0;
            margin:auto;
            height:inherit;
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
        }
    .myorder-center{
        // position: fixed;
        //   left: 0;
        //   right: 0;
        //   top: 0;
        //   overflow-x: scroll;
        //   bottom: 0;
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
        // margin-top: @size80;
        // margin-bottom: 1.2rem;
        padding:0 @size10;
        .account{
            box-sizing: border-box;
            .item{
                height: @size40;
                border-bottom: 1px solid rgb(129, 135, 140);
                line-height: @size40;
                margin-left: @size10;
                span{
                    font-size: 10px;
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
                        width: @size16;
                        height: @size16;
                        margin-top: @size2;
                        margin-left: @size4;
                    }

                }

                .bgcolor{
                    color: rgb(235, 97, 0);
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
                        font-size: 12px;
                        width: 24px;
                        text-align: center;
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
                    margin: @size15 0 0 @size10;
                    overflow: hidden;
                    img{
                        // width: 100%;
                        // height: 100%;
                        width: 2.75rem;
                      height: 2.1333rem;
                      margin-left: -0.35rem;
                      vertical-align: top;
                    }
                }
                .info{
                    margin-top: @size15;
                    padding-left: @size10;
                    width: 6.4rem;
                    .hel{
                        font-weight: bold;
                        font-size: 14px;
                        line-height: 18px;
                        letter-spacing: 1px;
                    }
                    .name{
                        font-size: 12px;
                        line-height: 18px;
                        height: 18px;
                        width: 168px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap; 
                    }
                    .prove{
                        font-size: 10px;
                        color:rgb(133, 133, 133);
                        line-height: 14px;
                    }
                    .fr{
                        border: 1px solid rgb(51, 51, 51);
                        margin-left: @size10;
                        background: white;
                        outline: none;
                        height: @size25;
                        line-height: @size25;
                        width: 1.8666rem;
                        font-size: 10px;
                    }
                    button{
                        color:rgb(51, 51, 51);
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
}

 .v_modal{
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

