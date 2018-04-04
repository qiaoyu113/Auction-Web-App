<template>
    <div id="alreadys">
        <div id="mescroll" class="mescroll alreadys">
            <div class="mescroll-bounce">
                <div class="already">
                    <div class="box">
                        <div class="now">
                            <div class="ros clearfix" v-for="(list,index) in myList">
                                <div class="line clearfix" v-if="list.auction._id == lineId">
                                    <div class="line_l"></div>
                                    <div class="line_con">一周以前</div>
                                    <div class="line_r"></div>
                                </div>
                                <div class="line clearfix" v-if="list.auction._id == lineId2">
                                    <div class="line_l"></div>
                                    <div class="line_con">1个月以前</div>
                                    <div class="line_r"></div>
                                </div>
                                <div class="line clearfix" v-if="list.auction._id == lineId3">
                                    <div class="line_l"></div>
                                    <div class="line_con">6个月以前</div>
                                    <div class="line_r"></div>
                                </div>
                                <div class="line clearfix" v-if="list.auction._id == lineId4">
                                    <div class="line_l"></div>
                                    <div class="line_con">一年以前</div>
                                    <div class="line_r"></div>
                                </div>
                                <div class="ros_l">
                                    <div class="ros_l_top clearfix" v-if="list.auction.doneBuy==1">
                                        <div class="ros_prompt">拍卖成功</div>
                                        <div class="ros_label" v-if="list.auctionCollect.show">NEW</div>
                                    </div>
                                    <div class="ros_l_top clearfix" v-if="list.auction.doneBuy==3">
                                        <div class="ros_prompt">违约，保证金被扣除</div>
                                        <div class="ros_label" v-if="list.auctionCollect.show">NEW</div>
                                    </div>
                                    <div class="ros_l2">{{list.auction.currentPrice | money}} CNY</div>
                                    <div class="ros_l3">{{list.auction.title}}</div>
                                    <div class="ros_l4">LOT-{{list.auction.completeNo}}</div>
                                    <div class="ros_con"  v-if="list.auction.doneBuy==1" @click="jump(list.auction._id)">
                                        去支付
                                    </div>
                                    <div class="ros_con"  v-if="list.auction.doneBuy!=1 && list.auction.doneBuy!=3" @click="jump(list.auction._id)">
                                        查看订单
                                    </div>
                                </div>
                                <div class="ros_r" @click="Router(list.auction._id)">
                                    <img :src="picHead + list.auction.picItems[0]"/>
                                    <div class="date">
                                        <!--收藏图标-->
                                        <div class="collect">
                                            <!--<div class="collectIcon">-->
                                                <!--<div class="bottom"></div>-->
                                            <!--</div>-->
                                            <img class="conImg" src="../../assets/image/mycenter/collectIcon.png" />
                                        </div>
                                        <!--已结束-->
                                        <div class="collect4">
                                            <div class="icon"></div>
                                            <div class="icon2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ros_date" v-if="list.auction.doneBuy==1">
                                    <p>{{list.EndTimes}}</p>
                                    <p><span>支付拍品</span></p>
                                </div>
                            </div>
                        </div>
                        <!-- 一周以前 -->
                        <!--<div class="week"  v-if="myList.params">-->
                            <!--<div class="ros clearfix" v-for="(list,index) in myList" v-if="list.auction.auctionEndTime < week && list.auction.auctionEndTime >= month">-->
                                <!--&lt;!&ndash; 分割线 &ndash;&gt;-->
                                <!--<div class="line clearfix">-->
                                    <!--<div class="line_l"></div>-->
                                    <!--<div class="line_con">一周以前</div>-->
                                    <!--<div class="line_r"></div>-->
                                <!--</div>-->
                                <!--<div class="ros_l">-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==1">-->
                                        <!--<div class="ros_prompt">拍卖成功</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==3">-->
                                        <!--<div class="ros_prompt">违约，保证金被扣除</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l2">{{list.auction.currentPrice | money}} CNY</div>-->
                                    <!--<div class="ros_l3">{{list.auction.title}}</div>-->
                                    <!--<div class="ros_l4">LOT-{{list.auction.completeNo}}</div>-->
                                <!--</div>-->
                                <!--<div class="ros_r" @click="Router(list.auction._id)"><img :src="picHead + list.auction.picItems[0]"/></div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy==1"  @click="jump(list.auction._id)">-->
                                    <!--去支付-->
                                <!--</div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy!=1" @click="jump(list.auction._id)">-->
                                    <!--查看订单-->
                                <!--</div>-->
                                <!--<div class="ros_date" v-if="list.auction.doneBuy==1">-->
                                    <!--<p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>-->
                                    <!--<p><span>支付拍品</span></p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!-- 一月以前 -->
                        <!--<div class="week" v-if="myList.params">-->
                            <!--<div class="ros clearfix" v-for="(list,index) in myList" v-if="list.auction.auctionEndTime<month&&list.auction.auctionEndTime>=march">-->
                                <!--&lt;!&ndash; 分割线 &ndash;&gt;-->
                                <!--<div class="line clearfix">-->
                                    <!--<div class="line_l"></div>-->
                                    <!--<div class="line_con">一月以前</div>-->
                                    <!--<div class="line_r"></div>-->
                                <!--</div>-->
                                <!--<div class="ros_l">-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==1">-->
                                        <!--<div class="ros_prompt">拍卖成功</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==3">-->
                                        <!--<div class="ros_prompt">违约，保证金被扣除</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l2">{{list.auction.currentPrice | money}} CNY</div>-->
                                    <!--<div class="ros_l3">{{list.auction.title}}</div>-->
                                    <!--<div class="ros_l4">LOT-{{list.auction.completeNo}}</div>-->
                                <!--</div>-->
                                <!--<div class="ros_r" @click="Router(list.auction._id)"><img :src="picHead + list.auction.picItems[0]"/></div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy==1" @click="jump(list.auction._id)">-->
                                    <!--去支付-->
                                <!--</div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy!=1" @click="jump(list.auction._id)">-->
                                    <!--查看订单-->
                                <!--</div>-->
                                <!--<div class="ros_date" v-if="list.auction.doneBuy==1">-->
                                    <!--<p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>-->
                                    <!--<p><span>支付拍品</span></p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!-- 三月以前 -->
                        <!--<div class="week" v-if="myList.params">-->
                            <!--<div class="ros clearfix" v-for="(list,index) in myList" v-if="list.auction.auctionEndTime<march&&list.auction.auctionEndTime >= year">-->
                                <!--&lt;!&ndash; 分割线 &ndash;&gt;-->
                                <!--<div class="line clearfix">-->
                                    <!--<div class="line_l"></div>-->
                                    <!--<div class="line_con">三月以前</div>-->
                                    <!--<div class="line_r"></div>-->
                                <!--</div>-->
                                <!--<div class="ros_l">-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==1">-->
                                        <!--<div class="ros_prompt">拍卖成功</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==3">-->
                                        <!--<div class="ros_prompt">违约，保证金被扣除</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l2">{{list.auction.currentPrice | money}} CNY</div>-->
                                    <!--<div class="ros_l3">{{list.auction.title}}</div>-->
                                    <!--<div class="ros_l4">LOT-{{list.auction.completeNo}}</div>-->
                                <!--</div>-->
                                <!--<div class="ros_r" @click="Router(list.auction._id)"><img :src="picHead + list.auction.picItems[0]"/></div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy==1" @click="jump(list.auction._id)">-->
                                    <!--去支付-->
                                <!--</div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy!=1" @click="jump(list.auction._id)">-->
                                    <!--查看订单-->
                                <!--</div>-->
                                <!--<div class="ros_date" v-if="list.auction.doneBuy==1">-->
                                    <!--<p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>-->
                                    <!--<p><span>支付拍品</span></p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!-- 一年以前 -->
                        <!--<div class="week" v-if="myList.params">-->
                            <!--<div class="ros clearfix" v-for="(list,index) in myList" v-if="list.auction.auctionEndTime < year">-->
                                <!--&lt;!&ndash; 分割线 &ndash;&gt;-->
                                <!--<div class="line clearfix">-->
                                    <!--<div class="line_l"></div>-->
                                    <!--<div class="line_con">一年以前</div>-->
                                    <!--<div class="line_r"></div>-->
                                <!--</div>-->
                                <!--<div class="ros_l">-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==1">-->

                                        <!--<div class="ros_prompt">拍卖成功</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->
                                    <!--<div class="ros_l_top clearfix" v-if="list.auction.doneBuy==3">-->
                                        <!--<div class="ros_prompt">违约，保证金被扣除</div>-->
                                        <!--<div class="ros_label" v-if="list.auctionCollect.show==true">NEW</div>-->
                                    <!--</div>-->

                                    <!--<div class="ros_l2">{{list.auction.currentPrice | money}} CNY</div>-->
                                    <!--<div class="ros_l3">{{list.auction.title}}</div>-->
                                    <!--<div class="ros_l4">LOT-{{list.auction.completeNo}}</div>-->
                                <!--</div>-->
                                <!--<div class="ros_r" @click="Router(list.auction._id)"><img :src="picHead + list.auction.picItems[0]"/></div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy==1" @click="jump(list.auction._id)">-->
                                    <!--去支付-->
                                <!--</div>-->
                                <!--<div class="ros_con"  v-if="list.auction.doneBuy!=1" @click="jump(list.auction._id)">-->
                                    <!--查看订单-->
                                <!--</div>-->
                                <!--<div class="ros_date" v-if="list.auction.doneBuy==1">-->
                                    <!--<p>{{countdown[index].dd}}:{{countdown[index].hh}}:{{countdown[index].mm}}:{{countdown[index].ss}}</p>-->
                                    <!--<p><span>支付拍品</span></p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import MeScroll from 'mescroll'
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js' 
    export default {
        data () {
            return {
                title: '传家',
                datas:'',
                loading:'false',
                lineId:'',
                lineId2:'',
                lineId3:'',
                lineId4:'',
                Now:'',//现在
                week:'',//一周
                month:'',//一月
                march:'',//三月
                year:'',//一年
                myList:[

                ],
                // 计算
                reversedNum: function (num) {
                    return common.format_number(num)
                },
                countdown:[],
                page:{num:1,size:10},
                isShowNoMore:false,
                totalPage:'',
                weekEndsOpen:true,
                weekEndsOpen2:true,
                weekEndsOpen3:true,
                weekEndsOpen4:true,
            }
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
            let that = this;
            that.meScroll()
            that.onMove()
            that.Now = new Date().getTime()
        },
        methods: {
            Router:function(id){
                this.$router.push({name:'auctionMore',params:{id:id}})
            },
            jump:function(id){
                let that =this;
                commonService.getCheckOrder({auctionId:id}).then(function(res){
                    // that.datas=res.data.datas.datas
                   
                   
                    if(res.data.datas==null){
                         that.$router.push({path:"/my/order",query:{auctionId:id}}) 
                    }else{
                        let status=res.data.datas.status
                        if(status!=6){//订单详情页
                         that.$router.push({path:"/normalorder",query:{id:res.data.datas.orderNo}}) 
                        }else if(status==6){//关闭
                         // that.$router.push({path:"/closeorder",query:{id:res.data.datas.orderNo}}) 
                          that.$router.push({path:"/my/order",query:{auctionId:id}}) 
                        }
                    }
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
                    if(that.page.num === 1)  that.myList = [];//如果是第一页需手动制空列表
                    that.myList = that.myList.concat(curPageData); //更新列表数据

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
                commonService.getCollect({pageNo:pageNum,pageSize:pageSize,status:2}).then(function(res){
                    if(res.data.code === 200){
                        let boxlist = res.data.datas.datas;
                        that.totalPage = res.data.datas.totalPage;
                        for(let i=0;i<boxlist.length;i++){
                            let date=new Date()
                            let now = new Date().getTime()
                            let weekEnd = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000;
                            let weekEnd2 = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000 * 30;
                            let weekEnd3 = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000 * 180;
                            let weekEnd4 = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000 * 365;
                            let weekEnds = weekEnd - now;
                            let weekEnds2 = weekEnd2 - now;
                            let weekEnds3 = weekEnd3 - now;
                            let weekEnds4 = weekEnd4 - now;
                            if(weekEnds < 0 && that.weekEndsOpen){
                                that.lineId = boxlist[i].auction._id
                                that.weekEndsOpen = false;
                            }
                            if(weekEnds2 < 0 && that.weekEndsOpen2){
                                that.lineId2 = boxlist[i].auction._id
                                that.weekEndsOpen2 = false;
                            }
                            if(weekEnds3 < 0 && that.weekEndsOpen3){
                                that.lineId3 = boxlist[i].auction._id
                                that.weekEndsOpen3 = false;
                            }
                            if(weekEnds4 < 0 && that.weekEndsOpen4){
                                that.lineId4 = boxlist[i].auction._id
                                that.weekEndsOpen4 = false;
                            }
                            if(boxlist[i].auction.doneBuy == '1'){
                                let now = new Date().getTime()
                                let time = '';
                                let week = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000;
                                time = week - now;
                                //初始化时间
                                if(time < 0){
                                    boxlist[i].EndTimes = '00:00:00:00'
                                    break;
                                }
                                let day = parseInt(time / 1000 / 60 / 60 / 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24, 10) : parseInt(time / 1000 / 60 / 60 / 24, 10);
                                let h = parseInt(time / 1000 / 60 / 60 % 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 % 24, 10) : parseInt(time / 1000 / 60 / 60 % 24, 10);
                                let m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                                let s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                boxlist[i].EndTimes = day + ':' + h + ':' + m + ':' + s;
                                let timeRun = setInterval(function() {
//                                  //初始化时间
                                    let now = new Date().getTime()
                                    let week = Number(boxlist[i].auction.mqEndTime) + 7 * 24 * 3600 * 1000;
                                    time = week - now;
                                    let days = parseInt(time / 1000 / 60 / 60 / 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24, 10) : parseInt(time / 1000 / 60 / 60 / 24, 10);
                                    let hs = parseInt(time / 1000 / 60 / 60 % 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 % 24, 10) : parseInt(time / 1000 / 60 / 60 % 24, 10);
                                    let ms = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                                    let ss = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                    boxlist[i].EndTimes = days + ':' + hs + ':' + ms + ':' + ss;
                                    if(time < 0){
                                        clearInterval(timeRun);
                                        boxlist[i].EndTimes = '00:00:00:00'
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
                overscroll(document.querySelector('.alreadys'));
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
    @import url("../../assets/css/common/mescroll.min.css");
    #alreadys{
        #mescroll{
            width:100%;
            max-width:10rem;
            position: fixed;
            top: @size35;
            bottom:1.2rem;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
        }
        .already{
            .box{
                padding: @size10 @size20;
                .line{
                    width: 9rem;
                    position: relative;
                    border-bottom: 1px solid rgb(228,228,288);
                    height: @size15;
                    float:right;
                    margin-bottom: 0.3rem;
                    .line_con{
                        position: absolute;
                        top: @size6;
                        right: 1.2rem;
                        font-size: 10px;
                        color: rgb(51,51,51);
                        width: 2rem;
                        background-color: #fff;
                        text-align: center;
                    }
                }
                .week{

                }
                .ros{
                    position: relative;
                    margin-top: @size5;
                }
                .ros:first-child .line{
                    display: block;
                }
                .ros_l{
                    // float: left;
                    position: absolute;
                    left: 0;
                    bottom: 0;

                    .ros_l_top{
                        div{
                            float: left;
                            margin-right: @size5;
                            font-size: 11px;
                            line-height: 15px;
                        }
                        .ros_offer{
                            color: rgb(153,153,153);
                            font-weight: 700;
                        }
                        .ros_prompt{
                            color: rgb(235,97,0);
                        }
                        .ros_label{
                            height: @size15;
                            padding: 0 4px;
                            background-color: rgb(235,97,0);
                            text-align: center;
                            line-height: @size15;
                            color: #fff;
                        }

                    }
                    .ros_l2{
                        font-size: 15px;
                        font-weight: bold;
                        color: rgb(53,60,70);
                    }
                    .ros_l3{
                        color: #4D4D4D;
                        font-size: 12px;
                        line-height: @size15;
                    }
                    .ros_l4{
                        color: #4D4D4D;
                        font-size: 10px;
                        line-height: @size15;
                    }
                }
                .ros_r{
                    float: right;
                    width: 3rem;
                    height: 3rem;
                    overflow: hidden;
                    position: relative;
                    img{
                        width: 4rem;
                        height: 3rem;
                        margin-left: -0.5rem;
                    }
                    .date{
                        width:0.7rem;
                        position: absolute;
                        right:0;
                        top:0;
                        .collect{
                            width:0.35rem;
                            height:0.35rem;
                            float:left;
                            background:#333333;
                            /*padding:0.08rem 0.1rem;*/
                            box-sizing: border-box;
                            .conImg{
                                width:100%;
                                height:100%;
                                margin-left:0;
                            }
                            .collectIcon{
                                width:100%;
                                height:100%;
                                background:#F2CE76;
                                position: relative;
                                .bottom{
                                    width: 0;
                                    height: 0;
                                    position: absolute;
                                    bottom:0;
                                    border-right: 0.075rem solid transparent;
                                    border-bottom: 0.075rem solid #333333;
                                    border-left: 0.075rem solid transparent;
                                }
                            }
                        }
                        .collect2{
                            width:0.35rem;
                            height:0.35rem;
                            float:right;
                            background:#5EBAA9;
                            padding: 0.09rem 0.03rem;
                            box-sizing: border-box;
                            .icon{
                                width: 0.06rem;
                                height: 100%;
                                float: left;
                                background: #fff;
                                margin: 0 0.04rem;
                            }
                        }
                        .collect3{
                            width:0.35rem;
                            height:0.35rem;
                            float:right;
                            background:#F2CE76;
                            padding: 0.09rem 0.09rem;
                            box-sizing: border-box;
                            .icon{
                                width:100%;
                                height:100%;
                                border-radius: 100%;
                                background:#fff;
                            }
                        }
                        .collect4{
                            width:0.35rem;
                            height:0.35rem;
                            float:right;
                            background:#EB6100;
                            padding: 0.09rem 0.09rem;
                            box-sizing: border-box;
                            position: relative;
                            .icon{
                                width: 0;
                                height: 0;
                                position: absolute;
                                left: 0.08rem;
                                border-top: 0.1rem solid transparent;
                                border-left: 0.16rem solid #fff;
                                border-bottom: 0.1rem solid transparent;
                            }
                            .icon2{
                                width: 0.03rem;
                                height: 0.2rem;
                                background: #fff;
                                position: absolute;
                                right: 0.1rem;
                            }
                        }
                        .collect5{
                            width:0.35rem;
                            height:0.35rem;
                            float:right;
                            background:#808080;
                            padding: 0.09rem 0.09rem;
                            box-sizing: border-box;
                            position: relative;
                            .icon{
                                width: 0;
                                height: 0;
                                position: absolute;
                                left: 0.08rem;
                                border-top: 0.1rem solid transparent;
                                border-left: 0.16rem solid #fff;
                                border-bottom: 0.1rem solid transparent;
                            }
                            .icon2{
                                width: 0.03rem;
                                height: 0.2rem;
                                background: #fff;
                                position: absolute;
                                right: 0.1rem;
                            }
                        }
                    }
                }
                .ros_con{
                    /*position: absolute;*/
                    /*top: 2.3rem;*/
                    margin-top:0.2rem;
                    left: 0;
                    margin-right: @size10;
                    font-size: 12px;
                    color: #4D4D4D;
                    width: 1.8666rem;
                    height: 0.75rem;
                    border: 1px solid #4D4D4D;
                    line-height: 0.75rem;
                    text-align: center;
                }
                .ros_date{
                    position: absolute;
                    bottom: 0;
                    right: 3rem;
                    margin-right: @size10;
                    p{
                        text-align: right;
                        font-size: 15px;
                        line-height: @size16;
                        color: rgb(51,51,51);
                        font-weight:700;

                        span{
                            font-size: 11px;
                            line-height: @size16;
                            color: rgb(51,51,51);
                            font-weight:400;
                        }

                    }

                }
            }
        }
    }
</style>

