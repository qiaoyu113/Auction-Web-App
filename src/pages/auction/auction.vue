<template>
    <div id="auction" v-set-title="title">
        <div class="header">传家</div>
        <div class="nav">
            <span class="back" @click="back()"><i class="iconfont icon-fanhui"></i></span>
            <span class="span1"><i class="iconfont icon-bianji2"></i></span>
            <span class="span2">
                <div class="fang">
                    <div class="yuan"></div>
                    <div class="san">
                        <div class="san2"></div>
                    </div>
                </div>
            </span>
        </div>
        <div id="mescroll" class="mescroll content">
            <div class="mescroll-bounce">
                <div>
                    <div class="sell-list">
                        <div class="swiper-container sell-pic">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in img">
                                    <img :src="$store.state.picHead + item" >
                                </div>
                            </div>
                            <div class="dian">
                                <div class="dianList" v-for="(item,index) in img"></div>
                            </div>
                        </div>
                        <div class="sell-information">
                            <div class="font">{{details.realNum}}人</div>
                            <div class="sellicon2"><div class="icon"></div></div>
                        </div>
                        <div class='sell-content'>
                            <div class="sell-int">
                                <div class="intrEn">INTROUDCE</div>
                                <div class="intrCh">{{details.title}}</div>
                                <div class="prove">
                                    <span v-for="list in details.identifications">
                                        <span class="list" v-if="list === 1"><i class="iconfont icon-duigoudunpai"></i>认证1</span>
                                        <span class="list" v-if="list === 2"><i class="iconfont icon-duigoudunpai"></i>认证2</span>
                                        <span class="list" v-if="list === 3"><i class="iconfont icon-duigoudunpai"></i>认证3</span>
                                        <span class="list" v-if="list === 4"><i class="iconfont icon-duigoudunpai"></i>认证4</span>
                                        <span class="list" v-if="list === 5"><i class="iconfont icon-duigoudunpai"></i>认证5</span>
                                    </span>
                                </div>
                                <div class="info">
                                    <p>编号：{{details.completeNo}}</p>
                                    <p v-for="item in details.authors">作者：<span style="margin-right:0.1rem;">{{item.name}}</span></p>
                                    <div v-for="(item,key) in details.properties">
                                     <p>{{key}}：{{item}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--修复v-html不能滑动的bug-->
                            <div class="bug" v-if="bugShow"></div>
                            <div class="sell-inf" v-html="content"></div>
                            <div class="helpCenter">
                                <span class="fl">帮助中心</span>
                                  <div class="fr2 iconfont icon-daiquanquandetanhao"></div>
                                  <a class="fr">查看如何参加拍卖</a>
                            </div>
                        </div>
                    </div>
                    <div class="others">
                        <div class="othersEn">OTHERS</div>
                        <div class="othersCh">本场其他</div>
                    </div>
                    <div class="sell-more clearfix">
                        <div class="sellList" v-if="specialist.length != 0" @click="sellListGo(list.id)" v-for="list in specialist">
                            <div class="pic">
                                <img :src="$store.state.picHead + list.picItems[0]"/>
                                <div class="money">￥{{list.basePrice}}</div>
                                <div class="title">{{list.title}}</div>
                                <div class="number">{{list.completeNo}}</div>
                            </div>
                        </div>
                        <div class="sellListNo" v-if="specialist.length === 0">— 暂无更多 —</div>
                    </div>
                </div>
            </div>
        </div>
        <!--阴影-->
        <div class="dis">
            <div class="transparent" v-if="dis"></div>
            <div :class="dis ? 'record recordShow' : 'record'"  v-if="dis">
                <div class="down" @click="getNone()"><i class="iconfont icon-xialajiantou" style="color:#A9AEB6;font-size:32px;"></i></div>
                <div class="disShow">
                    <div class="pic fl"><img :src="$store.state.picHead + details.picItems[0]" alt=""></div>
                    <div class="info fl">
                        <div class="tit">起拍价格</div>
                        <div class="price">{{details.basePrice}} CNY</div>
                        <div class="title">{{details.title}}</div>
                        <div class="time">{{details.auctionStartTime}}</div>
                    </div>
                    <!-- 三种状态 index
                     1.未开始 2.进行中 3.已结束 4.流拍 5.撤拍 竞拍开始后专场不可删除下架  -->
                    <div class="moneytime fr" v-if="details.auctionStatus === 2">
                        <div class="nowTit">当前价格</div>
                        <div class="nowPrice" v-if="!offerNumDate">{{details.currentPrice}} CNY</div>
                        <div class="nowPrice" v-if="offerNumDate">{{details.basePrice}} CNY</div>
                        <div class="over">离结束还有</div>
                        <div class="time fr">
                            <div class="fr num">{{s}}</div>
                            <div class="fr colon">:</div>
                            <div class="fr num">{{m}}</div>
                            <div class="fr colon">:</div>
                            <div class="fr num">{{h}}</div>
                            <div class="fr colon"> :</div>
                            <div class="fr num">{{day}}</div>
                        </div>
                    </div>
                    <div class="moneytime fr" v-if="details.auctionStatus === 1">
                        <div class="nowTit">成交价格</div>
                        <div class="nowPrice">200,000 CNY</div>
                        <div class="over">成交时间</div>
                        <div class="time1 fr">
                            2017.10.25<br/>
                            23:30:00
                        </div>
                    </div>
                    <div class="moneytime fr" v-if="index==3">
                        <div class="nowTit">成交价格</div>
                        <div class="nowPrice">200,000 CNY</div>
                        <div class="over">付款期限</div>
                        <div class="time fr">
                            <div class="fr num">{{s}}</div>
                            <div class="fr colon">:</div>
                            <div class="fr num">{{m}}</div>
                            <div class="fr colon">:</div>
                            <div class="fr num">{{h}}</div>
                            <div class="fr colon"> :</div>
                            <div class="fr num">{{day}}</div>
                        </div>
                    </div>
                </div>
                <div class="bidRecord content">
                    <div  v-for="list in pricerecord">
                        <div class="reco">
                            <div class="price fl">{{list.money}}</div>
                            <div class="fr">
                                <div class="who ">{{list.name}}</div>
                                <div class="time">{{list.time}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--倒计时-->
        <!--1.未开始 2.进行中 3.已结束 4.流拍 5.撤拍 竞拍开始后专场不可删除下架
        1代表即将开始
        2进行中
        3拍品别人拍中
        4拍品被流拍
        5拍品被自己拍中-->
        <div class="infomation bground1 clearfix" v-if="details.auctionStatus === 1">
            <div class="time1 fr">
                <div class="fr num">{{s}}</div>
                <div class="fr colon">:</div>
                <div class="fr num">{{m}}</div>
                <div class="fr colon">:</div>
                <div class="fr num">{{h}}</div>
                <div class="fr colon"> :</div>
                <div class="fr num">{{day}}</div>
            </div>
            <div class="value1 fr">即将开始</div>
        </div>
        <!--2进行中-->
        <div class="infomation bground2 clearfix" v-else-if="details.auctionStatus === 2">
            <div class="learnMore fl" @click="lookMore()">查看更多</div>
            <div class="value fl" v-if="!offerNumDate">当前价格 {{details.currentPrice}}CNY</div>
            <div class="value fl" v-if="offerNumDate">当前价格 {{details.basePrice}}CNY</div>
            <div class="time fr">
                <div class="fr num">{{s}}</div>
                <div class="fr colon">:</div>
                <div class="fr num">{{m}}</div>
                <div class="fr colon">:</div>
                <div class="fr num">{{h}}</div>
                <div class="fr colon"> :</div>
                <div class="fr num">{{day}}</div>
            </div>
        </div>
        <div class="infomation bground3 clearfix" v-else-if="details.auctionStatus === 3">
            <div class="learnMore fl">查看更多</div>
            <div class="value fl">当前价格 200,000CNY</div>
            <div class="success fr">
                拍品成交
            </div>
        </div>
        <div class="infomation bground4 clearfix" v-else-if="details.auctionStatus === 4">
            <div class="success fr">
                拍品流拍
            </div>
        </div>
        <div class="infomation bground3 clearfix" v-else-if="details.auctionStatus === 3">
            <div class="learnMore fl">查看更多</div>
            <div class="value fl">当前价格 200,000CNY</div>
            <span class="warn">支付</span>
            <div class="time fr">
                <div class="fr num">01</div>
                <div class="fr colon">:</div>
                <div class="fr num">02</div>
                <div class="fr colon">:</div>
                <div class="fr num">03</div>
                <div class="fr colon"> :</div>
                <div class="fr num">04</div>
            </div>
        </div>
        <!--<z-info></z-info>-->
        <!--底部-->
        <!--起拍价格-->
        <div class="footer" v-if="details.auctionStatus === 1">
            <div class="value">
                <span class='label'>起拍价格</span>
                <span class="price">{{bidPrice}}CNY</span>
            </div>
            <div class="r-icon" ><i class="iconfont icon-duigoudunpai"></i></div>
        </div>
        <!--当前价格-->
        <div class="footer" v-else-if="details.auctionStatus === 2">
            <div class="value">
                <span class="btn1" @click="subtraction()">-</span>
                <span class="price">{{bidPrice}}CNY</span>
                <span class="btn2" @click="addPrice()">+</span>
            </div>
            <div class="r-icon"><i class="iconfont icon-duigoudunpai"></i></div>
            <div class="offer" @click="offerPrice()">出&nbsp;&nbsp;价</div>
        </div>
        <!--交易结束的价格-->
        <div class="footer" v-else-if="details.auctionStatus === 3">
            <div class="value">
                <span class='label'>成交价格</span>
                <span class="price">203,000 CNY</span>
            </div>
            <div class="r-icon"><i class="iconfont icon-duigoudunpai"></i></div>
        </div>
        <div class="footer" v-else-if="details.auctionStatus === 4">
            <div class="value">
                <span class='label'>成交价格</span>
                <span class="price">203,000 CNY</span>
            </div>
            <div class="r-icon" @click="getList()"><i class="iconfont icon-duigoudunpai"></i></div>

            <div class="offer">去支付</div>
        </div>
        <!--<z-foot></z-foot>-->
        <!--<z-payment></z-payment>-->

    </div>
</template>

<script >
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    import item from "../../component/auction/item.vue"
    import info from "../../component/auction/info.vue"
    import record from "../../component/auction/record.vue"
    import payment from '../../component/auction/payment.vue'
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '专场详情-拍场详情',
                id:'',
                img:'',
                details:'',
                content:'',
                bugShow:true,
                page:{num:1,size:10},
                page2:{num:1,size:10},
                specialist:[],
                marketNo:'',
                totalPage:'',
                day:'',
                h:'',
                m:'',
                s:'',
                offerNumDate:false,//是否有人拍中状态
                bidPrice:'',//出价
                isShowNoMore:false,

                baseDetail:'',
                arrays: [],
                dis:false,
                index:1,
                pricerecord:[
                    {money:'200,000CNY',
                        name:'某某某',
                        time:'2017.10.25 23:12:34'},
                ],
            }
        },
        components:{'z-foot':item,'z-info':info,'z-record':record,'z-payment':payment},
        mounted: function() {
            let that = this;
            that.onMove();
            that.id = that.$route.params.id;
            that.onload()
        },
        beforeUpdate(){
            let that = this;
            that.content = that.details.content;
            that.bugShow = false;
        },
        methods: {
            //初始化数据
            onload(){
                let that = this;
                commonService.getAuction({id:that.id},that.id).then(function(res){
                    console.log(res)
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        that.details.auctionStartTime  = common.getFormatOfDate(that.details.auctionStartTime,'yyyy-MM-dd')
                        if(that.details.offerNum != 0){
                            that.offerNumDate = false;
                        }else{
                            that.offerNumDate = true;
                        }
                        let price = res.data.datas.basePrice/100;
                        let price2 = res.data.datas.currentPrice/100;
                        if(price%1 === 0){
                            that.details.basePrice = price.toString() + '.00'
                        }else{
                            that.details.basePrice = price.toFixed(2);
                        }
                        if(price2%1 === 0){
                            that.details.currentPrice = price2.toString() + '.00'
                        }else{
                            that.details.currentPrice = price2.toFixed(2);
                        }
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                        setInterval(function(){
                            let time = that.details.mqEndTime - new Date();
                            that.day = common.getFormatOfDate(time,'dd')
                            that.h = common.getFormatOfDate(time,'h')
                            that.m = common.getFormatOfDate(time,'m')
                            that.s = common.getFormatOfDate(time,'s')
                        },1000);
                        that.img = res.data.datas.picItems;
                        that.$nextTick(function () {
                            that.onswiper();
                        });
                        that.marketNo = res.data.datas.marketNo;
                        that.meScroll()
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
                that.specialist = [];
                that.upCallback()
            },
            upCallback: function () {
                const that = this;
                that.getListData(that.page.num, that.page.size,function(curPageData) {
                    if(that.page.num == 1)  that.specialist = [];//如果是第一页需手动制空列表
                    that.specialist = that.specialist.concat(curPageData); //更新列表数据
                    // 加载完成后busy为false，如果最后一页则lastpage为true
                    //          加载完成后给页数+1
                    if(that.page.num >= that.totalPage) {
                        that.isShowNoMore = true;
                    }else{
                        that.isShowNoMore = false;
                    }
                    that.page.num = that.page.num+1;
                    that.mescroll.endSuccess(curPageData.length,that.totalPage);
                    that.mescroll.endUpScroll(that.isShowNoMore)
                }, function() {
                    that.mescroll.endErr(); //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                });
            },
            getListData:function(pageNum,pageSize,successCallback,errorCallback) {
                //延时一秒,模拟联网
                const that = this;
                commonService.getAuctionList({
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    marketNo:that.marketNo}).then(function(res){
                        console.log(res)
                    if(res.data.code === 200){
                        if(res.data.datas.pager.datas != null){
                            let auctionList = res.data.datas.pager.datas;
                            let ids = [];
                            for(let i = 0;i<auctionList.length;i++){
                                if(auctionList[i].id === that.id){
                                }else{
                                    ids.push(auctionList[i].id);
                                }
                            }
                            commonService.getAuctionList({pageNo:1,pageSize:10,auctionIds:ids}).then(function(res) {
                                console.log(res)
                                if(res.data.code === 200){
                                    if(res.data.datas.pager != null){
                                        let specialist = res.data.datas.pager.datas;
                                        that.totalPage = res.data.datas.pager.totalPage;
                                        for (let i = 0;i<specialist.length;i++){
                                            let price = specialist[i].basePrice/100;
                                            if(price%1 === 0){
                                                specialist[i].basePrice = price.toString() + '.00'
                                            }else{
                                                specialist[i].basePrice = price.toFixed(2);
                                            }
                                        }
                                        successCallback&&successCallback(specialist);//成功回调
                                    }else{
                                        let specialist = [];
                                        that.totalPage = '1';
                                        successCallback&&successCallback(specialist);//成功回调
                                    }
                                }
                            })
                        }else{

                        }
                    }
                })
            },
            //swiper初始化
            onswiper(){
                let that = this;
                let swiper = new Swiper('.swiper-container', {
                    loop: true,
                    speed: 400,
                    autoplay: 1000,
                });
            },
            //返回上一层
            back(){
                let that = this;
                that.$router.back(-1);
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
                overscroll(document.querySelector('.content'));
                document.body.addEventListener('touchmove', function(evt) {
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            //前往拍品详情
            sellListGo(id){
                let that = this;
                that.$router.push({name:'auctionMore',params:{id:id}})
            },
            //关闭拍品记录
            getNone:function() {
                let that = this;
                that.dis = false;
            },
            //查看拍品记录
            lookMore(){
                let that = this;
                that.dis = true;
                that.$nextTick(function () {
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
                            console.log(evt)
                            if(el.offsetHeight < el.scrollHeight)
                                evt._isScroller = true
                        })
                    };
                    overscroll(document.querySelector('.bidRecord'));
//                    let cc = document.querySelector('.bidRecord');
//                    console.log(cc)
//                    cc.addEventListener('touchmove', function(evt) {
//                        console.log(evt)
//                        if(cc.offsetHeight < cc.scrollHeight)
//                            evt._isScroller = true
//                    })
                    document.body.addEventListener('touchmove', function(evt) {
                        if(!evt._isScroller) {
                            evt.preventDefault()
                        }
                    })
                });
                commonService.getAuctionPrice({pageNo:that.page2.num,pageSize:50,auctionId:that.id}).then(function(res){
                    console.log(res)
                })
            },
            //减少出价
            subtraction(){
                let that = this;
                if(that.bidPrice < 1000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 100){
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice;
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                    }else{
                        that.bidPrice = parseInt(that.bidPrice)
                        that.bidPrice = that.bidPrice - 100;
                    }
                }else if(1000 <= that.bidPrice && that.bidPrice <= 10000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 1000){
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice;
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                    }else{
                        that.bidPrice = parseInt(that.bidPrice);
                        that.bidPrice = that.bidPrice - 1000;
                    }
                }else if(that.bidPrice > 10000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 10000){
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice;
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                    }else{
                        that.bidPrice = parseInt(that.bidPrice)
                        that.bidPrice = that.bidPrice - 10000;
                    }
                }
            },
            //加价出价
            addPrice(){
                let that = this;
                that.bidPrice = parseInt(that.bidPrice);
                console.log(that.bidPrice)
                if(that.bidPrice < 1000){
                    that.bidPrice = that.bidPrice + 100;
                }else if(1000 <= that.bidPrice && that.bidPrice <= 10000){
                    that.bidPrice = that.bidPrice + 1000;
                }else if(that.bidPrice > 10000) {
                    that.bidPrice = that.bidPrice + 10000;
                }
            },
            //确认出价
            offerPrice(){
                let that = this;
                console.log(that.bidPrice)
                commonService.postMyPrice({offerAmount:that.bidPrice,auctionId:that.id}).then(function(res){
                    console.log(res)
                })
            }
        },
        watch: {
            '$route' (to, from) {
                console.log(to.path)
                let that = this;
                that.$router.go(0)
            }
        }
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    @import url("../../assets/css/common/mescroll.min.css");
    @import '../../assets/css/common/swiper.min.css';
    #auction{
        .header{
            position: fixed;
            z-index: 100;
            top: 0;
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
            line-height: @size35;
            border-bottom: 1px solid rgb(53, 60, 70);
            background: rgb(255, 255, 255);
            position: fixed;
            top: @size45;
            z-index: 100;
            .back{
                line-height: @size35;
                i{
                    font-size:28px;
                    margin-left: 0.3rem;
                    color:#A9AEB6;
                }
            }
            .span1{
                float: right;
                padding-right: 20px;
                color:#A9AEB6;
            }
            .span2{
                float: right;
                padding-right: 20px;
                color:#A9AEB6;
                .fang{
                    width:0.3rem;
                    height:0.35rem;
                    margin-top:0.2rem;
                    border:0.05rem solid #A9AEB6;
                    position: relative;
                    border-radius: 1px;
                    .yuan{
                        width:0.1rem;
                        height:0.1rem;
                        background:#A9AEB6;
                        position: absolute;
                        top:0.05rem;
                        left:0;
                        right:0;
                        margin:auto;
                        border-radius: 100%;
                    }
                    .san{
                        width: 0;
                        height: 0;
                        border-right: 0.15rem solid transparent;
                        border-bottom: 0.15rem solid #A9AEB6;
                        border-left: 0.15rem solid transparent;
                        position: absolute;
                        bottom:0;
                        .san2{
                            width: 0;
                            height: 0;
                            border-right: 0.15rem solid transparent;
                            border-bottom: 0.15rem solid #fff;
                            border-left: 0.15rem solid transparent;
                            position: absolute;
                            bottom: -0.2rem;
                            left: -0.14rem;
                        }
                    }
                }
            }
        }
        #mescroll{
            width:100%;
            position: fixed;
            top:2.15rem;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            overflow-y: scroll;
        }
        .sell-list{
            .sell-pic{
                height:4.5rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 7rem;
                    margin-top:-1rem;
                }
                .dian{
                    width:0.4rem;
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:0.1rem;
                    margin:auto;
                    height: max-content;
                    .dianList{
                        width: 0.15rem;
                        height: 0.15rem;
                        background: #fff;
                        z-index: 100;
                        position: relative;
                        border-radius: 100%;
                        margin: 0.15rem 0;
                    }
                }
            }
            .sell-information {
                padding-top: 10px;
                position: relative;
                .font{
                    font-size:10px;
                    float:right;
                    margin-right:10px;
                    color: #A6A9AF;
                }
                .sellicon2{
                    width: 0;
                    height: 0;
                    border-left: 0.2rem solid transparent;
                    border-right: 0.2rem solid transparent;
                    border-bottom: 0.3rem solid  #A9AEB6;
                    float:right;
                    position: relative;
                    margin-right:6px;
                    margin-top:0.04rem;
                    .icon{
                        width: 0;
                        height: 0;
                        border-left: 0.13rem solid transparent;
                        border-right: 0.13rem solid transparent;
                        border-bottom: 0.185rem solid #fff;
                        position: absolute;
                        left: -0.13rem;
                        top: 0.07rem;
                    }
                }
            }
            .sell-content{
                box-sizing: border-box;
                margin-top: @size10;
                padding: @size10;
                .sell-int{
                    div{
                        text-align: center;
                    }
                    .intrEn{
                        font-size: 16px;
                        letter-spacing: 2px;
                        padding: @size6;
                        font-weight: bold;
                    }
                    .intrCh{
                        font-size: 12px;
                        color:rgb(133, 133, 133);
                    }
                    .prove{
                        font-size: 8px;
                        padding: @size20 0;
                        color:rgb(133, 133, 133);
                        i{
                            color: rgb(0, 184, 176);
                            margin:0 0.06rem;
                        }
                        span{
                            font-size:12px;
                        }
                        .list{
                            margin:0 0.1rem;
                        }
                    }
                    .info{
                        padding: @size10;
                        p{
                            font-size: 10px;
                            text-align: left;
                            color:rgb(133, 133, 133);
                            span{
                                font-size: 10px;
                            }
                        }
                        div{
                            text-align: left;
                            font-size: 10px;
                        }
                    }


                }
                .bug{
                    width:100%;
                    height:1000px;
                }
                .sell-inf{
                    margin-top: @size20;
                    font-size: 11px;
                    color: rgb(133, 133, 133);
                    padding: @size10;
                }
                .pic-list{
                    // width: @size375;
                    // padding: @size10;
                    box-sizing: border-box;
                    img{
                        width: 100%;
                        height: @size162;
                        // margin: @size5;
                        padding-top: @size10;
                    }
                }
                .helpCenter{
                    height: @size40;
                    width: 100%;
                    border-top: 1px solid rgb(130, 135, 140);
                    border-bottom: 1px solid rgb(130, 135, 140);
                    text-align: center;
                    line-height: @size40;
                    .fr2{
                        float:right;
                        margin-right:0.2rem;
                    }
                    span{
                        padding-left:@size10;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    a{
                        font-size: @size10;
                        text-decoration: underline;
                        color: rgb(130, 135, 140);
                        margin-right: @size5;
                    }
                    .icon{
                        width: @size12;
                        height: @size12;
                        border: 1px solid rgb(130, 135, 140);
                        border-radius:50%;
                        display: inline-block;
                        font-size: @size1;
                        line-height: @size12;
                        margin-top: @size14;
                        margin-right: @size10;
                    }
                }
            }

        }
        .others{
            text-align: center;
            margin-top: @size30;
            margin-bottom: @size20;
            .othersEn{
                font-size: 14px;
                letter-spacing: 2px;
                font-weight: bold;
            }
            .othersCh{
                padding-top: @size10;
                font-size: 11px;
                color: rgb(51, 51, 51);
            }
        }
        .sell-more{
            box-sizing: border-box;
            text-align: center;
            margin: @size5;
            .sellList {
                width: 4.49rem;
                float: left;
                margin: 0.2rem 0.15rem;
                position: relative;
                .pic {
                    width: 100%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 3.47rem;
                    }
                    .money {
                        font-size: 15px;
                        padding-top: @size15;
                    }
                    .title {
                        font-size: 14px;
                        color: rgb(133, 133, 133);
                        padding-top: @size1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .number {
                        font-size: 12px;
                        color: rgb(133, 133, 133);
                        padding: 0 0 @size25 0;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .date {
                    width: 0.7rem;
                    position: absolute;
                    right: 0;
                    top: 0;
                    .collect {
                        width: 0.35rem;
                        height: 0.35rem;
                        float: left;
                        background: #333333;
                        padding: 0.08rem 0.1rem;
                        box-sizing: border-box;
                        .collectIcon {
                            width: 100%;
                            height: 100%;
                            background: #F2CE76;
                            position: relative;
                            .bottom {
                                width: 0;
                                height: 0;
                                position: absolute;
                                bottom: 0;
                                border-right: 0.075rem solid transparent;
                                border-bottom: 0.075rem solid #333333;
                                border-left: 0.075rem solid transparent;
                            }
                        }
                    }
                    .collect2 {
                        width: 0.35rem;
                        height: 0.35rem;
                        float: right;
                        background: #5EBAA9;
                        padding: 0.09rem 0.03rem;
                        box-sizing: border-box;
                        .icon {
                            width: 0.06rem;
                            height: 100%;
                            float: left;
                            background: #fff;
                            margin: 0 0.04rem;
                        }
                    }
                    .collect3 {
                        width: 0.35rem;
                        height: 0.35rem;
                        float: right;
                        background: #F2CE76;
                        padding: 0.09rem 0.09rem;
                        box-sizing: border-box;
                        .icon {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                            background: #fff;
                        }
                    }
                    .collect4 {
                        width: 0.35rem;
                        height: 0.35rem;
                        float: right;
                        background: #EB6100;
                        padding: 0.09rem 0.09rem;
                        box-sizing: border-box;
                        position: relative;
                        .icon {
                            width: 0;
                            height: 0;
                            position: absolute;
                            left: 0.08rem;
                            border-top: 0.1rem solid transparent;
                            border-left: 0.16rem solid #fff;
                            border-bottom: 0.1rem solid transparent;
                        }
                        .icon2 {
                            width: 0.03rem;
                            height: 0.2rem;
                            background: #fff;
                            position: absolute;
                            right: 0.1rem;
                        }
                    }
                }
            }
            .sellListNo{
                width:100%;
                height:2rem;
                line-height:1rem;
                text-align: center;
                font-size:12px;
                color:#858585;
            }
        }
        .dis{
            /*display: none;*/
            .transparent{
                position: fixed;
                bottom: @size45;
                z-index: 100;
                width: 100%;
                height: 17rem;
                background:#000;
                opacity:0.6;
            }
            @keyframes show{
                0%  {bottom:-10rem;}
                100%{bottom:1.2rem;}
            }
            .recordShow{
                -webkit-animation:show 0.2s linear 1;
                -webkit-animation-fill-mode:both;
            }
            .record{
                width: @size375;
                position: fixed;
                z-index: 100;
                bottom: @size45;
                background: #fff;
                padding: 0 0.5333rem 0.4rem;
                box-sizing: border-box;
                text-align: center;
                .down{
                    height: @size30;
                    line-height: @size30;
                    width: 100%;
                    border-bottom: 1px solid rgb(202, 209, 217);
                    font-size: 25px;
                    color: rgb(202, 209, 217);
                }
                .disShow{
                    /*height: 2.99rem;*/
                    /*border-bottom: 1px solid rgb(202, 209, 217);*/
                    overflow: hidden;
                    padding-bottom:0.1rem;
                    .pic{
                        width: @size80;
                        height: @size80;
                        padding-top: @size15;
                        display: inline-block;
                        overflow: hidden;
                        img{
                            width: 130%;
                            height: 100%;
                            margin-left:-15%;
                        }
                    }
                    .info{
                        padding-left: @size15;
                        text-align: left;
                        line-height: @size15;
                        .tit{
                            margin-top: @size40;
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                        }
                        .price{
                            font-size: 10px;
                            font-weight: bold;
                        }
                        .title{
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                        }
                        .time{
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                        }
                    }
                    .moneytime{
                        text-align: right;
                        padding-top: @size13;
                        .nowTit{
                            font-size: 10px;
                            line-height: 15px;
                        }
                        .nowPrice{
                            font-size: 16px;
                            color: red;
                            font-weight: bold;
                        }
                        .over{
                            padding-top: @size10;
                            padding-bottom: 0.1rem;
                            font-size: 10px;
                            line-height: 15px;
                        }
                        .time{
                            display: inline-block;
                            color: white;
                            margin-left: @size15;
                            .num{
                                height: @size20;
                                background: black;
                                border-radius:3px;
                                padding: 2px;
                                line-height: @size22;
                                font-size: @size12;
                                font-weight: bold;
                            }
                            .colon{
                                text-align: center;
                                line-height: @size22;
                                width: @size10;
                                color: #000;
                                font-weight: bold;
                            }
                        }
                        .time1{
                            color: #000;
                            font-size: 10px;
                            line-height: @size15;
                            font-weight: bold;
                        }
                    }
                }
            }
            .bidRecord{
                padding:  0.1rem 0;
                width: 100%;
                max-height:  7.99rem;
                overflow: scroll;
                height: auto;
                .reco{
                    width: 100%;
                    height: 1.14rem;
                    .price{
                        text-align: left;
                        line-height: 1.14rem;
                        font-size: @size14;
                        font-weight: bold;
                        text-decoration: line-through;
                    }
                    .fr{
                        text-align: right;
                        .who{
                            font-size: @size10;
                            color: rgb(122, 122, 122);
                        }
                        .time{
                            font-size: @size10;
                            color: rgb(122, 122, 122);
                        }
                    }
                }
            }
        }
        .infomation{
            box-sizing: border-box;
            position: fixed;
            bottom: @size45;
            width: 100%;
            height: @size35;

            text-align: center;
            font-size: 13px;
            line-height: @size25;
            .learnMore{

                width: 1.6rem;
                height: @size15;
                border: 1px solid white;
                border-radius:3px;
                font-size:  9px;
                color: white;
                line-height: @size15;
                margin:@size10 @size10 @size10 @size10;
            }
            .value{
                font-size:  9px;
                color: white;
                margin-top:@size6;
            }
            .value1{
                color: black;
                font-size:  9px;
                margin-top:@size6;
                margin-right: @size10;
            }
            .success{
                font-size: @size5;
                color: white;
                line-height: @size35;
                padding-right: @size20;
            }
            .warn{
                font-size: @size10;
                color: white;
                line-height: @size35;
            }
            .time{
                display: inline-block;
                color: white;
                margin-right: @size15;
                .num{
                    height: @size20;
                    background: black;
                    border-radius:3px;
                    padding: 2px;
                    margin-top:@size6;
                    line-height: @size22;
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
            .time1{
                display: inline-block;
                color: black;
                margin-right: @size15;
                box-sizing: border-box;
                .num{
                    // box-sizing: border-box;
                    border: 0.5px solid rgb(129, 135, 140);
                    height: @size20;
                    background: white;
                    border-radius:3px;
                    padding: 2px;
                    margin-top:@size6;
                    line-height: @size21;
                    font-size: @size12;
                    font-weight: bold;
                }
                .colon{
                    font-weight: bold;
                    text-align: center;
                    margin-top:@size6;
                    line-height: @size22;
                    width: @size10;
                }
            }
        }
        //即将开始
        .bground1{
            background: white;
            border-top:1px solid rgb(201, 209, 218)
        }
        //进行中
        .bground2{
            background:linear-gradient(30deg,rgb(0, 224, 222) 0%,rgb(104, 105, 237) 100%);
        }
        //已经拍中
        .bground3{
            background:linear-gradient(30deg,#f54ea2 0%,#dd704c 100%);
        }
        //流拍
        .bground4{
            background:gray;
        }
        //底部
        .footer{
            width: 100%;
            height: @size45;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 101;
            background: rgb(250, 251, 252);
            box-sizing: border-box;
            border-top: 1px solid rgb(53, 60, 70);
            .value{
                float: left;
                width: 5.6rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: left;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: right;
                }
                .label{
                    font-size: 8px;
                }
                .price{
                    font-size: 11px;
                    width: 2.68rem;
                    font-weight: bold;
                }
            }
            .r-icon{
                float: right;
                height: 100%;
                width: @size45;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                i{
                    line-height: @size45;
                    font-size: @size30;
                }
            }
            .offer{
                float: right;
                width: 3.2rem;
                height: 100%;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 16px;
            }
        }
    }
</style>