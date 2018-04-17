<template>
    <div id="auction" v-set-title="title">
        <!--<div class="header">传家</div>-->
        <div class="nav">
            <span class="back" @click="back()"><i class="iconfont icon-fanhui"></i></span>
            <span class="span1" @click="share()">
                <img src="../../assets/image/mycenter/icon2.png"/>
            </span>
            <span class="span2" @click="goMy()">
                <img v-if="!hintShow" src="../../assets/image/mycenter/icon1.png"/>
                <img v-if="hintShow" src="../../assets/image/mycenter/icon4.png"/>
            </span>
        </div>
        <div id="mescroll" class="mescroll content">
            <div class="mescroll-bounce">
                <div>
                    <div class="sell-list">
                        <div class="swiper-container sell-pic">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in img">
                                    <a href='javascript:void(0)'>
                                        <img :src="$store.state.picHead + item" >
                                    </a>
                                </div>
                            </div>
                            <div class="dian">
                                <div :class="dianIndex == index ? 'dianNow' : 'dianList'" v-for="(item,index) in img"></div>
                            </div>
                        </div>
                        <div class="sell-information">
                            <div class="font">{{details.realNum}}人</div>
                            <div class="sellicon2">
                                <img src="../../assets/image/mycenter/icon3.png"/>
                            </div>
                        </div>
                        <div class='sell-content'>
                            <div class="sell-int">
                                <div class="intrEn">INTROUDCE</div>
                                <div class="intrCh">{{details.title}}</div>
                                <div class="prove">
                                    <span v-for="list in details.identifications">
                                        <!--<span class="list" v-if="list === 1"><i class="iconfont icon-duigoudunpai"></i>质量认证</span>-->
                                        <span class="list" v-if="list === 1"><img src="../../assets/image/mycenter/rzIcon.png">质量认证</span>
                                        <span class="list" v-if="list === 2"><img src="../../assets/image/mycenter/rzIcon.png">作者认证</span>
                                        <span class="list" v-if="list === 3"><img src="../../assets/image/mycenter/rzIcon.png">专家认证</span>
                                    </span>
                                </div>
                                <div class="info">
                                    <p>LOT-{{details.completeNo}}</p>
                                    <p v-for="item in details.authors">作者：<span style="margin-right:0.1rem;">{{item.name}}</span></p>
                                    <div v-for="(item,key) in details.properties">
                                     <p>{{key}}：{{item}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--修复v-html不能滑动的bug-->
                            <div class="bug" v-if="bugShow"></div>
                            <div class="sell-inf" id="html" v-html="content"></div>
                            <div class="helpCenters">
                                <span class="fl">帮助中心</span>
                                <div class="fr2">
                                    <img src="../../assets/image/mycenter/hint.png">
                                </div>
                                <a class="fr" @click="goRule()">查看相应竞拍规则</a>
                            </div>
                        </div>
                    </div>
                    <div class="others">
                        <div class="othersEn">OTHERS</div>
                        <div class="othersCh">更多拍品</div>
                    </div>
                    <div class="sell-more clearfix">
                        <div class="sellList" v-if="specialist.length != 0" @click="sellListGo(list.id)" v-for="list in specialist">
                            <div class="pic">
                                <a href='javascript:void(0)'>
                                    <img :src="$store.state.picHead + list.picItems[0]"/>
                                </a>
                                <div class="money">{{reversedNum(list.currentPrice)}} CNY</div>
                                <div class="title">{{list.title}}</div>
                                <div class="number">LOT-{{list.completeNo}}</div>
                            </div>
                            <div class="date">
                                <!--收藏图标-->
                                <div class="collect" v-if="list.collect">
                                    <!--<div class="collectIcon">-->
                                        <!--<div class="bottom"></div>-->
                                    <!--</div>-->
                                    <img src="../../assets/image/mycenter/collectIcon.png" />
                                </div>
                                <!--进行中-->
                                <div class="collect2" v-if="list.auctionStatus === 2">
                                    <!--<div class="icon"></div>-->
                                    <!--<div class="icon"></div>-->
                                    <img src="../../assets/image/mycenter/zan.png" />
                                </div>
                                <!--预展中-->
                                <div class="collect3"  v-if="list.auctionStatus === 1">
                                    <div class="icon"></div>
                                </div>
                                <!--已结束-->
                                <div class="collect4"  v-if="list.auctionStatus === 3 || list.auctionStatus === 5">
                                    <div class="icon"></div>
                                    <div class="icon2"></div>
                                </div>
                                <!--流拍-->
                                <div class="collect5"  v-if="list.auctionStatus === 4">
                                    <div class="icon"></div>
                                    <div class="icon2"></div>
                                </div>
                            </div>
                        </div>
                        <div class="sellListNo" v-if="specialist.length === 0">— 暂无更多 —</div>
                    </div>
                </div>
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

        <!--阴影-->
        <div class="dis">
            <div class="transparent" v-if="dis"></div>
            <div :class="dis ? 'record recordShow' : 'record'"  v-if="dis">
                <div class="down" @click="getNone()"><i class="iconfont icon-xialajiantou" style="color:#A9AEB6;font-size:32px;"></i></div>
                <div class="disShow">
                    <div class="pic fl">
                        <a href='javascript:void(0)'>
                            <img :src="$store.state.picHead + details.picItems[0]" alt="">
                        </a>
                    </div>
                    <div class="info fl">
                        <div class="tit">起拍价格</div>
                        <div class="price">{{reversedNum(details.basePrice)}} CNY</div>
                        <div class="title">{{details.title}}</div>
                        <div class="time">LOT-{{details.completeNo}}</div>
                    </div>
                    <!-- 三种状态 index
                     1.未开始 2.进行中 3.已结束 4.流拍 5.撤拍 竞拍开始后专场不可删除下架  -->
                    <div class="moneytime fr" v-if="details.auctionStatus === 2">
                        <div class="nowTit">当前价格</div>
                        <div class="nowPrice" v-if="!offerNumDate">{{reversedNum(details.currentPrice)}} CNY</div>
                        <div class="nowPrice" v-if="offerNumDate">{{reversedNum(details.basePrice)}} CNY</div>
                        <div class="over">距结束</div>
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
                    <div class="moneytime fr" v-if="(details.auctionStatus === 3 && details.doneBuy != '1')||(details.auctionStatus === 3 && details.userId != userId && details.doneBuy == '1')">
                        <div class="nowTit">成交价格</div>
                        <div class="nowPrice">{{reversedNum(details.currentPrice)}} CNY</div>
                        <div class="over">成交时间</div>
                        <div class="time1 fr">
                            {{mqEndTime}}<br/>
                            {{auctionEndTimeHMS}}
                        </div>
                    </div>
                    <div class="moneytime fr" v-if="details.auctionStatus === 3 && details.userId == userId && details.doneBuy == '1'">
                        <div class="nowTit">成交价格</div>
                        <div class="nowPrice">{{reversedNum(details.currentPrice)}} CNY</div>
                        <div class="over">支付期限</div>
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
                    <div  v-for="(list,index) in pricerecord">
                        <div :class="list.userId == userId ? 'mycolor': 'reco'">
                            <div :class="index == 0 ? 'price fl':'price fl line'">{{reversedNum(list.offerAmount)}} CNY</div>
                            <div :class="index == 0 ? 'fr' : 'fr fr2'">
                                <div v-if="list.userId != userId" class="who">{{list.userName}}</div>
                                <div v-if="list.userId == userId" class="who">我的出价</div>
                                <div class="time">{{list.offerTime}}</div>
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
        <div :class="isX ? 'infomations bground1 clearfix':'infomation bground1 clearfix'" v-if="details.auctionStatus === 1">
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
        <div :class="isX ? 'infomations bground2 clearfix' : 'infomation bground2 clearfix'" v-else-if="details.auctionStatus === 2">
            <div class="learnMore fl" @click="lookMore()">出价记录{{details.offerNum}}</div>
            <div class="value fl" v-if="!offerNumDate">当前价格 {{reversedNum(details.currentPrice)}} CNY</div>
            <div class="value fl" v-if="offerNumDate">当前价格 {{reversedNum(details.basePrice)}} CNY</div>
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
        <div :class="isX ? 'infomations bground3 clearfix' : 'infomation bground3 clearfix'" v-else-if="(details.auctionStatus == 3 && details.userId != userId && details.doneBuy == '1')||(details.auctionStatus == 3 && details.doneBuy == '2')||(details.auctionStatus == 3 && details.doneBuy == '3')||(details.auctionStatus == 3 && details.doneBuy == '4')">
            <div class="learnMore fl" @click="lookMore()">出价记录{{details.offerNum}}</div>
            <div class="value fl">当前价格 {{reversedNum(details.currentPrice)}} CNY</div>
            <div class="success fr">
                拍品成交
            </div>
        </div>
        <div :class="isX ? 'infomations bground4 clearfix':'infomation bground4 clearfix'" v-else-if="details.auctionStatus === 4">
            <div class="success fr">
                拍品流拍
            </div>
        </div>
        <div :class="isX ? 'infomations bground3 clearfix':'infomation bground3 clearfix'" v-else-if="details.auctionStatus === 3 && details.userId == userId && details.doneBuy == '1'">
            <div class="learnMore fl" @click="lookMore()">出价记录{{details.offerNum}}</div>
            <div class="value fl">当前价格 {{reversedNum(details.currentPrice)}} CNY</div>
            <!--<span class="warn">支付</span>-->
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
        <!--<z-info></z-info>-->
        <!--底部-->
        <!--起拍价格-->
        <div :class="isX ? 'footers':'footer'" v-if="details.auctionStatus === 1">
            <div class="value values">
                <span class='label'>起拍价格</span>
                <span class="price">{{reversedNum(bidPrice)}} CNY</span>
            </div>
            <div class="r-icon" @click="collectBtn()">
                <img v-if="hasCollect" src="../../assets/image/mycenter/collect.png"/>
                <img v-if="!hasCollect" src="../../assets/image/mycenter/collectNo.png"/>
            </div>
        </div>
        <!--当前价格-->
        <div :class="isX ? 'footers':'footer'" v-else-if="details.auctionStatus === 2">
            <div class="value" v-if="frozen && !latest">
                <span :class="noPriceBtn ? 'btn1 nobtn1' : 'btn1'" @click="subtraction()">-</span>
                <span class="price">{{reversedNum(bidPrice)}} CNY</span>
                <span class="btn2" @click="addPrice()">+</span>
            </div>
            <div class="value2" v-if="frozen && latest">
                <span :class="noPriceBtn ? 'btn1 nobtn1' : 'btn1'">-</span>
                <span class="price">{{reversedNum(details.currentPrice)}} CNY</span>
                <span class="btn2">+</span>
            </div>
            <div class="value values" v-if="!frozen">
                <span class='label'>保证金</span>
                <span class="price2">{{reversedNum(deposit)}} CNY</span>
            </div>
            <!--收藏状态-->
            <div class="r-icon" @click="collectBtn()">
                <img v-if="hasCollect" src="../../assets/image/mycenter/collect.png"/>
                <img v-if="!hasCollect" src="../../assets/image/mycenter/collectNo.png"/>
            </div>
            <div class="offer" @click="offerPrice()" v-if="!frozen">参与竞拍</div>
            <div class="offer" @click="offerPrice()" v-if="frozen && !latest">出 价</div>
            <div class="offer2" v-if="frozen && latest">出价领先</div>
        </div>
        <!--交易结束的价格-->
        <div :class="isX ? 'footers':'footer'" v-else-if="details.auctionStatus === 3">
            <div class="value3">
                <span class='label'>成交价格</span>
                <span class="price">{{reversedNum(details.currentPrice)}} CNY</span>
            </div>
            <div class="r-icon" @click="collectBtn()">
                <img v-if="hasCollect" src="../../assets/image/mycenter/collect.png"/>
                <img v-if="!hasCollect" src="../../assets/image/mycenter/collectNo.png"/>
            </div>
            <div class="goBuy" @click="payOrder()" v-if="details.userId == userId && details.doneBuy == '1'">立即支付</div>
        </div>
        <!--流拍-->
        <div :class="isX ? 'footers':'footer'" v-else-if="details.auctionStatus === 4">
            <div class="value values">
                <span class='label'>起拍价格</span>
                <span class="price">{{reversedNum(details.basePrice)}} CNY</span>
            </div>
            <div class="r-icon" @click="collectBtn()">
                <img v-if="hasCollect" src="../../assets/image/mycenter/collect.png"/>
                <img v-if="!hasCollect" src="../../assets/image/mycenter/collectNo.png"/>
            </div>
        </div>
        <!--<z-foot></z-foot>-->
        <!--<z-payment></z-payment>-->

        <!--缴纳保证金-->
        <div class="dis2" v-if="dis2Show">
            <div class="transparent"></div>
            <div class="popWin" >
                <div class="close" @click="closePay()"><i class="iconfont icon-closeicon"></i></div>
                <div class="payEn">PAYMENT</div>
                <div class="payCh">保证金缴纳</div>
                <div class="remind">
                    <p class="p1">{{reversedNum(deposit)}} CNY</p>
                    <p class="p2">当前需缴纳保证金金额</p>
                </div>
                <div class="pay" v-if="!walletDate">
                    <div class="check2"><i class="iconfont icon-closeicon"></i></div>
                    <img src="../../assets/image/mycenter/mypriceno.png"/>
                    <div class="infoWexin">
                        <div class="span1">保证金可用金额支付</div>
                        <div class="span2">保证金可用金额：{{reversedNum(userWallet)}} CNY <span style="font-size:11px;color:#E95500;">余额不足</span></div>
                    </div>
                </div>
                <div class="pay" @click="getIndex(0)" v-if="walletDate">
                    <div :class="index==0 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                    <img v-if="index==0" src="../../assets/image/mycenter/myprice.png"/>
                    <img v-if="index!=0" src="../../assets/image/mycenter/mypriceno.png"/>
                    <div class="infoWexin">
                        <div :class="index==0 ? 'span3' : 'span1'">保证金可用金额支付</div>
                        <div class="span2">保证金可用金额：{{reversedNum(userWallet)}} CNY</div>
                    </div>
                </div>
                <div class="pay" @click="getIndex(1)" v-if="wxShow">
                    <div :class="index==1 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                    <i :class="index==1 ? 'background1' : ''" class="iconfont icon-icon_weixinzhifu"></i>
                    <!--<div class="infoWexin">-->
                        <!--<div :class="index==1 ? 'span3' : 'span1'">微信支付</div>-->
                        <!--&lt;!&ndash;<div class="span2">单笔最高5,000-50,000 CNY</div>&ndash;&gt;-->
                    <!--</div>-->
                    <div  :class="index==1 ? 'infoAlipay2' : 'infoAlipay'">微信支付</div>
                </div>
                <div class="pay" @click="getIndex(2)" v-if="!wxShow">
                    <div :class="index==2 ? 'check' : 'check1'"><i class="iconfont icon-duihao"></i></div>
                    <i :class="index==2 ? 'background2' : ''" class="iconfont icon-icon_zhifubao"></i>
                    <div  :class="index==2 ? 'infoAlipay2' : 'infoAlipay'">支付宝支付</div>
                </div>
                <div class="footer" @click="payYes()">确认支付</div>
            </div>
        </div>

        <!--成功提示弹窗-->
        <div class="dis3" v-if="dis3Show">
            <div class="transparent"></div>
            <div class="popWin">
                <div class="close" @click="closePay()"><i class="iconfont icon-closeicon"></i></div>
                <div class="payEn">SUCCESS</div>
                <div class="payCh">成功</div>
                <div class="remind">
                    <img src="../../assets/image/mycenter/yesHint.png"/>
                    <p class="p2">{{hintText}}</p>
                </div>
                <div class="footer" @click="closePay()">确定</div>
            </div>
        </div>

        <!--失败提示弹窗-->
        <div class="dis3" v-if="dis4Show">
            <div class="transparent"></div>
            <div class="popWin">
                <div class="close" @click="closePay()"><i class="iconfont icon-closeicon"></i></div>
                <div class="payEn">WARN</div>
                <div class="payCh">警告</div>
                <div class="remind">
                    <i class="iconfont icon-tanhao"></i>
                    <p class="p2">{{hintText}}</p>
                </div>
                <div class="footer" @click="closePay()">确定</div>
            </div>
        </div>

        <div class="payOK"></div>

        <!--分享提示-->
        <div class="shareBox" v-if="shareHint">可以使用浏览器分享按钮分享给好友哦</div>
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
                title: '传家',
                id:'',
                useId:'',
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
                bidPrice2:'',//出价
                isShowNoMore:false,
                baseDetail:'',
                arrays: [],
                dis:false,
                index:1,
                dis2Show:false,
                dis3Show:false,
                dis4Show:false,
                deposit:'',
                userWallet:'',
                walletDate:false,
                wxShow:false,//判断是否是微信打开
                checked:false,//调用支付
                hintText:'',//提示字体
                pricerecord:[],
                hasCollect:false,
                noPriceBtn:true,//不能减价
                ServiceBox:false,
                dianIndex:'',
                BayOK:false,
                doneBuy:'',//1.未支付。2.已支付。3.违约
                userId:'',
                // 计算
                reversedNum: function (num) {
                    return common.format_number(num)
                },
                mqEndTime:'',
                auctionEndTimeHMS:'',
                frozen:false,//是否缴纳保证金
                latest:false,//是否当前最高价
                hintShow:false,
                shareHint:false,
                goMyNum:'0',
                isX:false,
            }
        },
        components:{'z-foot':item,'z-info':info,'z-record':record,'z-payment':payment},
        mounted: function() {
            let that = this;
            that.onMove();
            that.id = that.$route.params.id;
            that.meScroll()
            that.WebSocketTest()
            that.isPrint()
            //记录是否返回支付页
            window.localStorage.setItem('back','no')
            //是否支付成功
            let payOk = window.localStorage.getItem('payOk');
            let overTime = window.localStorage.getItem('overTime');
            let now = new Date().getTime();
            let timePass = now - overTime
            if(timePass <= 10000){
                if(payOk != null){
                    if(payOk == '1'){
                        that.dis2Show = false;
                        that.dis3Show = true;
                        that.hintText = '保证金支付成功';
                    }else{
                        that.dis4Show = true;
                        that.hintText = '保证金支付失败';
                    }
                }
            }
            let token = window.localStorage.getItem('token');
            if(token != null){
                that.isCollect();
                let JWT = token.split('.');
                let info = JWT[1];
                let tokenData = common.packageUserInfo(info);
                that.userId = tokenData.userId
            }else{
            }
            if(that.isIphoneX()){
                that.isX = true;
            }else{
                that.isX = false;
            }
        },
        beforeUpdate(){
            let that = this;
            that.content = that.details.content;
            that.bugShow = false;
        },
        methods: {
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
            //微信分享
            wxShare(){
                let that = this;
                let url = window.location.href;
                let html = document.getElementById("html").innerText;
                commonService.getWxShare({url:url}).then(function(res){
                    if(res.data.code === 200){
                        let wxMore = res.data.datas;
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: wxMore.appId, // 必填，公众号的唯一标识
                            timestamp:wxMore.wxTimestamp , // 必填，生成签名的时间戳
                            nonceStr: wxMore.wxNoncestr, // 必填，生成签名的随机串
                            signature: wxMore.wxSignature,// 必填，签名，见附录1
                            jsApiList: ['onMenuShareTimeline',
                                'onMenuShareAppMessage'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        commonService.getShares({type:10,typeId:that.id}).then(function(res){
                            if(res.data.code === 200){
                                wx.ready(function(){
                                    let wxShare = res.data.datas
                                    wx.onMenuShareTimeline({
                                        title: wxShare.title, // 分享标题
                                        link: url, // 分享链接
                                        imgUrl: that.$store.state.picHead + wxShare.imgUrl, // 分享图标
                                        success: function () {
                                            // 用户确认分享后执行的回调函数
                                        },
                                        cancel: function () {
                                            // 用户取消分享后执行的回调函数
                                        }
                                    });
                                    wx.onMenuShareAppMessage({
                                        title: wxShare.title, // 分享标题
                                        link: url, // 分享链接
                                        imgUrl: that.$store.state.picHead + wxShare.imgUrl, // 分享图标
                                        desc: html, // 分享描述
                                        type: '', // 分享类型,music、video或link，不填默认为link
                                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                        success: function () {
                                            // 用户确认分享后执行的回调函数
                                        },
                                        cancel: function () {
                                            // 用户取消分享后执行的回调函数
                                        }
                                    });
                                });
                            }
                        })
                    }
                })
            },
            //socket连接
            WebSocketTest(){
                let that = this;
                let stompClient = null;
//                let socket = new SockJS('http://shik.s1.natapp.cc/auction');
                let socket = new SockJS('http://api.sundayauction.cn/auction');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    // 2.有人出价后后台会回调这里
                    stompClient.subscribe('/auction/offerHis/'+ that.id, function(r) {
//                        console.log(eval('(' + r.body + ')'));
                        that.details.offerNum ++;
                        let body = eval('(' + r.body + ')');
                        let Price = body.offerAmount/100;
                        that.details.currentPrice = Price.toString() + '.00';
                        if(that.bidPrice <= that.details.currentPrice){
                            that.bidPrice = Price.toString() + '.00'
                        }
                        if(that.dis){
                            that.lookMore()
                        }
                        that.downCallback()
                    });
                });
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
                    that.wxShare()
                }, function() {
                    that.mescroll.endErr(); //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                });
            },
            getListData:function(pageNum,pageSize,successCallback,errorCallback) {
                //延时一秒,模拟联网
                const that = this;
                that.isCollect();
                //查看有无新消息
                commonService.getHasNewHint({}).then(function(res){
                    if(res.data.code === 200){
                        if(res.data.datas != 4){
                            that.hintShow = true;
                            that.goMyNum = res.data.datas
                        }else{
                            that.hintShow = false;
                        }
                    }
                })
                //查看最高价和是否缴纳保证金
                commonService.getHasCheck({auctionId:that.id}).then(function(res){
                    if(res.data.code === 200){
                        that.frozen = res.data.datas.frozen
                        that.latest = res.data.datas.latest
                    }
                })
                commonService.getAuction({id:that.id},that.id).then(function(res){
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        //插入统计数据
                        commonService.putInsertion({businessType:1,dimensionType:1,businessTypeId:that.id,businessNo:that.details.completeNo,businessName:that.details.title,}).then(function(res){})
                        if(that.details.basePrice === 0){
                            that.deposit = '300.00'
                        }else{
                            if(that.details.basePrice <= 10000){
                                that.deposit = '10.00'
                            }else{
                                let deposit = Math.round(that.details.basePrice/1000);
                                that.deposit = deposit.toString() + '.00'
                            }
                        }
                        let startTime = that.details.auctionStartTime
                        that.details.auctionStartTime  = common.getFormatOfDate(that.details.auctionStartTime,'yyyy-MM-dd')
                        let mqEndTime = that.details.mqEndTime
                        that.mqEndTime  = common.getFormatOfDate(mqEndTime,'yyyy-MM-dd')
                        that.auctionEndTimeHMS  = common.getFormatOfDate(mqEndTime,'hh:mm:ss')
                        if(that.details.offerNum != 0){
                            that.offerNumDate = false;
                            that.BayOK = true;
                        }else{
                            that.offerNumDate = true;
                            that.BayOK = false;
                        }
                        if(that.details.auctionStatus == '5'){
                            that.details.auctionStatus = 3
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
                            if(that.details.currentPrice <= 10000){
                                that.bidPrice = Number(that.details.currentPrice) + 100
                            }else if(that.details.currentPrice > 10000 && that.details.currentPrice < 100000){
                                that.bidPrice = Number(that.details.currentPrice) + 1000
                            }else if(that.details.currentPrice >= 100000){
                                that.bidPrice = Number(that.details.currentPrice) + 10000
                            }
                            that.bidPrice = that.bidPrice.toString() + '.00'
                        }
                        if(that.details.auctionStatus == '1'){
                            startTime = Number(startTime);
                            let timeRun = setInterval(function(){
                                let timestamp = new Date();
                                let time = startTime - timestamp;
                                that.day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                that.h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                that.m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                that.s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                if(time < 0){
                                    clearInterval(timeRun);
                                    that.day = '00'
                                    that.h = '00'
                                    that.m = '00'
                                    that.s = '00'
                                    if(that.details.auctionStatus == '2'){
                                        that.page.num = 1;
                                        that.specialist = [];
                                        that.upCallback()
                                    }
                                }
                            },1000);
                        }else if(that.details.auctionStatus == '3'){
                            that.details.mqEndTime = Number(that.details.mqEndTime) + 604800000;
                            let timeRun = setInterval(function(){
                                let timestamp = new Date();
                                let time = that.details.mqEndTime - timestamp;
                                that.day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                that.h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                that.m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                that.s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                if(time < 0){
                                    clearInterval(timeRun);
                                    that.day = '00'
                                    that.h = '00'
                                    that.m = '00'
                                    that.s = '00'
                                    if(that.details.auctionStatus == '2'){
                                        that.page.num = 1;
                                        that.specialist = [];
                                        that.upCallback()
                                    }
                                }
                            },1000);
                        }else{
                            that.details.mqEndTime = Number(that.details.mqEndTime);
                            let timeRun = setInterval(function(){
                                let timestamp = new Date();
                                let time = that.details.mqEndTime - timestamp;
                                that.day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                that.h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                that.m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                that.s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                if(time < 0){
                                    clearInterval(timeRun);
                                    that.day = '00'
                                    that.h = '00'
                                    that.m = '00'
                                    that.s = '00'
                                    if(that.details.auctionStatus == '2'){
                                        that.page.num = 1;
                                        that.specialist = [];
                                        that.upCallback()
                                    }
                                }
                            },1000);
                        }
                        that.img = res.data.datas.picItems;
                        that.$nextTick(function () {
                            that.onswiper();
                        });
                        that.marketNo = res.data.datas.marketNo;
//                        commonService.getAuctionList({
//                            pageNo:that.page.num,
//                            pageSize:that.page.size,
//                            marketNo:that.marketNo}).then(function(res){
//                            if(res.data.code === 200){
//                                if(res.data.datas.pager.datas != null){
//                                    let auctionList = res.data.datas.pager.datas;
//                                    that.totalPage = Number(res.data.datas.pager.totalCount);
//                                    let ids = [];
//                                    for(let i = 0;i<auctionList.length;i++){
//                                        if(auctionList[i].id === that.id){
//                                            ids.push(auctionList[i].id);
//                                        }else{
//
//                                        }
//                                    }
                                    commonService.getAuctionList({pageNo:that.page.num,pageSize:that.page.size,auctionIds:that.id,type:1}).then(function(res) {
                                        if(res.data.code === 200){
                                            if(res.data.datas.pager != null){
                                                let specialist = res.data.datas.pager.datas;
                                                let collects = res.data.datas.collects;
                                                that.totalPage = Number(res.data.datas.pager.totalCount);
                                                let dataArr = [];
                                                if(specialist.length != 0){
                                                    for (let i = 0;i<specialist.length;i++){
                                                        if(specialist[i].currentPrice === 0){
                                                            specialist[i].currentPrice = specialist[i].basePrice
                                                        }
                                                        let price = specialist[i].currentPrice/100;
                                                        if(price%1 === 0){
                                                            specialist[i].currentPrice = price.toString() + '.00'
                                                        }else{
                                                            specialist[i].currentPrice = price.toFixed(2);
                                                        }
                                                        let collect = collects.indexOf(specialist[i].id)
                                                        if(collect === -1){
                                                            specialist[i]['collect'] = false;
                                                            dataArr = specialist;
                                                        }else{
                                                            specialist[i]['collect'] = true;
                                                            dataArr = specialist;
                                                        }
                                                    }
                                                }
                                                successCallback&&successCallback(dataArr);//成功回调
                                            }else{
                                                let specialist = [];
//                                                that.totalPage = '1';
                                                successCallback&&successCallback(specialist);//成功回调
                                            }
                                        }
                                    })
//                                }else{
//
//                                }
//                            }
//                        })
                    }else{
                        that.$router.replace({name:'none'})
                    }
                })
            },
            //浏览记录
            isPrint(){
                let that = this;
                let cookiesId = window.localStorage.getItem('cookiesId');
                if(cookiesId == undefined || cookiesId == '' || cookiesId == null){
                    cookiesId = Date.parse(new Date());
                    cookiesId = "zstat" + "-" + cookiesId + "-" + Math.round(Math.random() * 3000000000);
                    window.localStorage.setItem('cookiesId',cookiesId);
                }
                commonService.postFootPrint({auctionId:that.id,cookiesId:cookiesId}).then(function(res){
                    if(res.data.code === 200){
                    }
                })
            },
            //是否收藏接口
            isCollect(){
              let that = this;
              commonService.getOrderCollect({id:that.id},that.id).then(function(res){
                  if(res.data.code === 200){
                      that.hasCollect = res.data.datas;
                  }
              })
            },
            //swiper初始化
            onswiper(){
                let that = this;
                let swiper = new Swiper('.swiper-container', {
                    loop: true,
                    speed: 400,
                    autoplay: true,
                    on: {
                        slideChangeTransitionEnd: function(){
                            if(that.dianIndex != that.img.length - 1){
                                if(this.activeIndex == '0'){
                                    that.dianIndex = that.img.length - 1
                                }else {
                                    that.dianIndex = this.activeIndex - 1
                                }
                            }else{
                                if(this.activeIndex > that.img.length){
                                    that.dianIndex = '0'
                                }else{
                                    that.dianIndex = this.activeIndex - 1
                                }
                            }
                        },
                    },
                });
            },
            //返回上一层
            back(){
                let that = this;
                let routerBack = window.localStorage.getItem('routerName');
                window.localStorage.removeItem('routerName')
                if(routerBack != 'wxPay'){
                    that.$router.back(-1);
                }else{
                    that.$router.replace({name:'special'})
                }
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
                            if(el.offsetHeight < el.scrollHeight)
                                evt._isScroller = true
                        })
                    };
                    overscroll(document.querySelector('.bidRecord'));
                    document.body.addEventListener('touchmove', function(evt) {
                        if(!evt._isScroller) {
                            evt.preventDefault()
                        }
                    })
                });
                commonService.getAuctionPrice({pageNo:that.page2.num,pageSize:1000,auctionId:that.id}).then(function(res){
                    if(res.data.code === 200){
                        that.pricerecord = res.data.datas.datas;
                        for(let i = 0;i < that.pricerecord.length;i++){
                            let price = that.pricerecord[i].offerAmount/100;
                            that.pricerecord[i].offerAmount = price.toString()+ '.00';
                            that.pricerecord[i].offerTime = common.getFormatOfDate(that.pricerecord[i].offerTime,'yyyy-MM-dd h:m:s')
                        }
                    }
                })
            },
            //减少出价
            subtraction(){
                let that = this;
                if(that.bidPrice <= 10000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 200){
                        if(that.offerNumDate){
                            that.bidPrice = Number(that.details.basePrice);
                        }else{
                            that.bidPrice = Number(that.details.currentPrice) + 100;
                        }
                        that.noPriceBtn = true;
                    }else{
                        if(that.bidPrice <= Number(that.details.currentPrice) + 200){
                            that.bidPrice = Number(that.details.currentPrice) + 100;
                            that.noPriceBtn = true;
                        }else{
                            that.bidPrice = parseInt(that.bidPrice)
                            let bidPrice = that.bidPrice - 100;
                            that.bidPrice = bidPrice.toString() + '.00';
                            that.noPriceBtn = false;
                        }
                    }
                }else if(10000 < that.bidPrice && that.bidPrice <= 100000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 1000){
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice;
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                        that.noPriceBtn = true;
                    }else{
                        if(that.bidPrice <= Number(that.details.currentPrice) + 1000){
                            that.bidPrice = that.details.currentPrice;
                            that.noPriceBtn = true;
                        }else{
                            that.bidPrice = parseInt(that.bidPrice)
                            let bidPrice = that.bidPrice - 1000;
                            that.bidPrice = bidPrice.toString() + '.00';
                            that.noPriceBtn = false;
                        }
                    }
                }else if(that.bidPrice > 100000){
                    if(that.bidPrice <= Number(that.details.basePrice) + 10000){
                        if(that.offerNumDate){
                            that.bidPrice = that.details.basePrice;
                        }else{
                            that.bidPrice = that.details.currentPrice
                        }
                        that.noPriceBtn = true;
                    }else{
                        if(that.bidPrice <= Number(that.details.currentPrice) + 10000){
                            that.bidPrice = that.details.currentPrice;
                            that.noPriceBtn = true;
                        }else{
                            that.bidPrice = parseInt(that.bidPrice)
                            let bidPrice = that.bidPrice - 10000;
                            that.bidPrice = bidPrice.toString() + '.00';
                            that.noPriceBtn = false;
                        }
                    }
                }
            },
            //加价出价
            addPrice(){
                let that = this;
                that.noPriceBtn = false;
                that.bidPrice = parseInt(that.bidPrice);
                if(that.bidPrice < 10000){
                    let bidPrice = that.bidPrice + 100;
                    that.bidPrice = bidPrice.toString() + '.00';
                }else if(10000 <= that.bidPrice && that.bidPrice < 100000){
                    let bidPrice = that.bidPrice + 1000;
                    that.bidPrice = bidPrice.toString() + '.00';
                }else if(that.bidPrice >= 100000) {
                    let bidPrice = that.bidPrice + 10000;
                    that.bidPrice = bidPrice.toString() + '.00';
                }
            },
            //确认出价
            offerPrice(){
                let that = this;
                let bidPrice = Number(that.bidPrice) * 100
                that.monitor();
                //冻结保证金
                commonService.postMyPrice({offerAmount:bidPrice,auctionId:that.id}).then(function(res){
                    if(res.data.code === 537126){
                        //查看用户余额是否够冻结
                        commonService.getUsers().then(function(res){
                            if(res.data.datas.user.wallet == null){
                                that.userWallet = '0.00';
                            }else{
                                that.userWallet = Math.round(res.data.datas.user.wallet.availableMoney/100)
                            }
                            that.dis2Show = true;

                            if(that.deposit*1 < that.userWallet*1){
                                that.walletDate = true;
                                that.getIndex(0)
                            }else{
                                that.walletDate = false;
                                that.getIndex(1)
                                if(that.wxShow){
                                    that.getIndex(1)
                                }else{
                                    that.getIndex(2)
                                }
                            }
                        })
                    }else if(res.data.code === 200){
                        that.dis3Show = true;
                        that.hintText = '出价成功';
                    }else{
                        that.dis4Show = true;
                        that.hintText = res.data.message;
                    }
                })
            },
            //保证金支付
            getIndex: function(index) {
                let that = this;
                if(index==1){
                    that.index=1
                }else if(index==2){
                    that.index=2
                }else{
                    that.index=0
                }
            },
            //关闭提示窗
            closePay:function() {
                let that = this;
                window.localStorage.removeItem('payOk');
                that.dis2Show = false;
                that.dis3Show = false;
                that.dis4Show = false;
                that.$router.replace({name:'auctionMore',params:{id:that.id}})
            },
            //判断浏览器
            monitor(){
                let that = this
                function isWeiXin() {
                    var ua = window.navigator.userAgent.toLowerCase();
//                console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        return true;
                    } else {
                        return false;
                    }
                }
                if(isWeiXin()){
//                    console.log(" 是来自微信内置浏览器")
                    that.wxShow = true;
                }else{
//                    console.log("不是来自微信内置浏览器")
                    that.wxShow = false;
                }
            },
            //生成订单并选择支付方式
            payYes(){
                let that = this;
                let channelIds = '';
                if(that.index === 1){//微信
                    channelIds = 'WX_JSAPI'
                }else if(that.index === 0){//余额
                    channelIds = 'NATIVE'
                }else{//支付宝
                    channelIds = 'ALIPAY_WAP'
                }
                window.localStorage.setItem('id',that.id);
                window.localStorage.setItem('route','auction');
                commonService.setbails({auctionId:that.id,channelId:channelIds}).then(function(res){
                    if(res.data.code === 200){
                        if(that.index === 1){//微信支付
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                                if(res.data.success){
                                    commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxbaselogin',wxscope:'snsapi_base'}).then(function(res){
                                        if(res.data.code === 200){
                                            //获取静默授权地址成功
                                            window.localStorage.removeItem('back');
                                            window.location.href = res.data.datas;
                                        }
                                    })
                                }
                            })
                        }else if(that.index === 0){//账户余额
                            that.dis2Show = false;
                            that.dis3Show = true;
                            that.hintText = '保证金支付成功';
                            that.upCallback()
                        }else{//支付宝
                            let orderNo = res.data.datas;
                            window.localStorage.setItem('orderNo',orderNo);
                            commonService.putOrders({orderNo:orderNo,channelId:channelIds}).then(function(res){
                                if(res.data.success){
                                    window.localStorage.removeItem('back');
                                    let payOK = document.getElementsByClassName("payOK");
                                    payOK[0].innerHTML = res.data.datas.payUrl;
                                    document.punchout_form.submit()
                                }
                            })
                        }
                    }
                })
            },
            //收藏
            collectBtn:function(){
                let that = this;
                let collectDate = ''
                if(that.hasCollect){
                    collectDate = false
                }else{
                    collectDate = true
                }
                commonService.postCollect({id:that.id,collect:collectDate},that.id).then(function(res){
                    if(res.data.code === 537134){
                        that.dis4Show = true;
                        that.hintText = res.data.message;
                    }else if(res.data.code === 537135){
                        that.dis4Show = true;
                        that.hintText = "拍品已出价,不可取消收藏";
                    }else if(res.data.code === 200){//收藏成功
                        that.hasCollect = !that.hasCollect;
                    }else{
                        that.dis4Show = true;
                        that.hintText = res.data.message;
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
            //已拍中去支付
            payOrder(){
                let that = this;
                commonService.getCheckOrder({auctionId:that.id}).then(function(res){
                   if(res.data.code === 200){
                       if(res.data.datas != null){
                           if(res.data.datas.status != '6'){
                               let orderNo = res.data.datas.orderNo
                               that.$router.push({name:'normalorder',query:{id:orderNo}})
                           }else{
                               that.$router.push({name:'order',query:{auctionId:that.id}})
                           }
                       }else{
                           that.$router.push({name:'order',query:{auctionId:that.id}})
                       }
                   }else{
                       that.dis4Show = true;
                       that.hintText = '支付失败';
                   }
                })
            },
            //跳我的
            goMy(){
                let that = this;
                if(that.goMyNum == 0){
                    that.$router.replace({name:'my'})
                }else if(that.goMyNum == 1){
                    that.$router.replace({name:'lot'})
                }else if(that.goMyNum == 2){
                    that.$router.replace({name:'already'})
                }else if(that.goMyNum == 3){
                    that.$router.replace({name:'not'})
                }
            },
            //跳查看规则
            goRule(){
                let that = this;
                that.$router.push({name:'helpcenter',query:{index:'3'}})
            },
            //分享
            share(){
                let that = this;
                that.shareHint = true;
                setTimeout(function(res){
                    that.shareHint = false;
                },2500)
            },
        },
        watch: {
            '$route' (to, from) {
              
                let that = this;
                that.$router.go(0)
            },
            bidPrice(value){
                let that = this;
                if(that.offerNumDate){
                    if(value == that.details.basePrice){
                        that.noPriceBtn = true;
                    }
                }else{
                    if(value == that.details.currentPrice){
                        that.noPriceBtn = true;
                    }
                }
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
            background: rgba(255, 255, 255,0.5);
            position: fixed;
            top: 0;
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
                img{
                    /*width: 0.6rem;*/
                    /*margin-top: 0.15rem;*/
                    width: 0.45rem;
                    margin-top: 0.23rem;
                }
            }
            .span2{
                float: right;
                padding-right: 20px;
                color:#A9AEB6;
                img{
                    width: 0.7rem;
                    margin-top: 0.1rem;
                }
            }
        }
        #mescroll{
            width:100%;
            max-width:10rem;
            position: fixed;
            top: 0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
        }
        .sell-list{
            .sell-pic{
                height:7.5rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    /*height: 8rem;*/
                    /*margin-top:-1rem;*/
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
                    .dianNow{
                        width: 0.15rem;
                        height: 0.15rem;
                        background: #EB6100;
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
                    font-weight: 500;
                    margin-right:10px;
                    color: #A6A9AF;
                    line-height: 0.47rem;
                }
                .sellicon2{
                    /*width: 0;*/
                    /*height: 0;*/
                    /*border-left: 0.2rem solid transparent;*/
                    /*border-right: 0.2rem solid transparent;*/
                    /*border-bottom: 0.3rem solid  #A9AEB6;*/
                    float:right;
                    /*position: relative;*/
                    /*margin-right:6px;*/
                    /*margin-top:0.04rem;*/
                    img{
                        width: 0.4rem;
                        margin-right: 0.1rem;
                    }
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
                        font-size: 14px;
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
                            img{
                                width:0.35rem;
                                margin-right:0.15rem;
                                margin-top:0.05rem;
                            }
                        }
                    }
                    .info{
                        padding: @size10;
                        p{
                            font-size: 12px;
                            text-align: left;
                            color:rgb(133, 133, 133);
                            span{
                                font-size: 12px;
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
                    img{
                        width:100% !important;
                        height: auto !important;
                    }
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
                .helpCenters{
                    height: @size40;
                    width: 100%;
                    border-top: 1px solid rgb(130, 135, 140);
                    border-bottom: 1px solid rgb(130, 135, 140);
                    text-align: center;
                    line-height: @size40;
                    .fr2{
                        float:right;
                        margin-right:0.2rem;
                        img{
                            width: 0.45rem;
                            height: 0.45rem;
                            margin-top: 0.3rem;
                        }
                    }
                    span{
                        padding-left:@size10;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    a{
                        font-size: @size10;
                        text-decoration: initial;
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
                        img{
                            width:100%;
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
                        /*padding: 0.09rem 0.03rem;*/
                        box-sizing: border-box;
                        img{
                            width:100%;
                        }
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
                top:0;
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
                    border-bottom: 1px solid rgb(202, 209, 217);
                    overflow: hidden;
                    padding-bottom:0.4rem;
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
                            font-size: 12px;
                            font-weight: bold;
                        }
                        .title{
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                            width:3rem;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
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
                            color:#7a7a7a;
                        }
                        .nowPrice{
                            font-size: 16px;
                            color: #ED6506;
                            font-weight: bold;
                        }
                        .over{
                            padding-top: @size10;
                            padding-bottom: 0.1rem;
                            font-size: 10px;
                            line-height: 15px;
                            color:#7a7a7a;
                        }
                        .time{
                            display: inline-block;
                            color: white;
                            margin-left: @size15;
                            .num{
                                height: .6rem;
                                background: #000;
                                border-radius: 3px;
                                margin-top: .16rem;
                                line-height: .6rem;
                                font-size: .32rem;
                                font-weight: 700;
                                width: .55rem;
                                text-align: center;
                            }
                            .colon{
                                text-align: center;
                                line-height: 0.85rem;
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
                .mycolor{
                    width: 100%;
                    height: 1.14rem;
                    color:#ED6506 !important;
                    .price{
                        text-align: left;
                        line-height: 0.8rem;
                        font-size: @size14;
                        font-weight: bold;
                    }
                    .line{
                        text-decoration: line-through;
                        color:#ED6506;
                    }
                    .fr{
                        text-align: right;
                        .who{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                        .time{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                    }
                    .fr2{
                        color:#ED6506;
                    }
                }
                .reco{
                    width: 100%;
                    height: 1.14rem;
                    .price{
                        text-align: left;
                        line-height: 1.14rem;
                        font-size: @size14;
                        font-weight: bold;
                    }
                    .line{
                        text-decoration: line-through;
                        color:#8D8D8D;
                    }
                    .fr{
                        text-align: right;
                        .who{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                        .time{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                    }
                    .fr2{
                        color:#8D8D8D;
                    }
                }
            }
        }
        .dis2{
            z-index:102;
            .transparent{
                position: fixed;
                bottom: 0;
                z-index: 102;
                width: 100%;
                height: 100%;
                background:#000;
                opacity:0.6;
                display: block;
            }
            .popWin{
                height: 11rem;
                width: 8.67rem;
                background: white;
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
                right:0;
                margin:auto;
                z-index: 1000;
                text-align: center;
                box-sizing: border-box;
                padding: 0 @size20;
                display: block;
                .close{
                    position: absolute;
                    right: 0;top: 0;
                    width: @size30;
                    height: @size30;
                    background: #eb6100;
                    i{
                        font-size: 0.7rem;
                        color: white;
                    }
                }
                .payEn{
                    padding-top: @size50;
                    font-size:@size14;
                    font-weight: bold;
                }
                .payCh{
                    font-size: 11px;
                    color: rgb(51, 51, 51);
                    line-height: @size11;
                }
                .remind{
                    padding: @size25 0;
                    font-size: 12px;
                    img{
                        width:1rem;
                        margin-bottom:0.3rem;
                    }
                    .p1{
                        color: #E95500;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .p2{
                        font-size: 11px;
                        color:#373737;
                    }
                }
                .warn{
                    border-top: 1px solid rgb(129, 135, 140);
                    text-align: left;
                    height: @size40;
                    font-size: 10px;
                    line-height: @size40;
                }
                .value{
                    width: 100%;
                    height: @size40;
                    line-height: @size40;
                    position: relative;
                    text-align: center;
                    border: 1px solid rgb(129, 135, 140);
                    .nobtn1{
                        color:#E6E6E6 !important;
                    }
                    .btn1{
                        width: 1.46rem;
                        position: absolute;
                        left: 0;
                        top: -3px;
                        font-size: 50px;
                        line-height: 40px;
                        color: #3C434D;
                    }
                    .btn2{

                        width: 1.46rem;
                        position: absolute;
                        right: 0;
                        top: -3px;
                        font-size: 35px;
                        line-height: 40px;
                        color: #E85800;
                    }
                    .label{
                        font-size: 12px;
                    }
                    .price{
                        font-size: 12px;
                        width: 2.68rem;
                        font-weight: bold;
                    }
                }
                .worthy{
                    box-sizing: border-box;
                    height: 1.52rem;
                    border-bottom: 1px solid rgb(129, 135, 140);
                    padding-top: 10px;
                    .tit{
                        font-size: 10px;
                        color: rgb(129, 135, 140);
                    }
                    .money{
                        font-size: 11px;
                        font-weight: bold;
                    }
                }
                .explain{
                    font-size: 10px;
                    color: rgb(129, 135, 140);
                    text-align: left;
                    box-sizing: border-box;
                    padding-top: @size10;
                    span{
                        font-weight: bold;
                        font-size: 10px;
                        color: #000;

                    }
                }
                .payway{
                    font-size: 14px;
                    padding-top: @size25;
                    text-align: left;
                }
                .pay{
                    height: @size50;
                    border-top: 1px solid rgb(129, 135, 140);
                    .check{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(0, 185, 181);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -11px;
                            color: rgb(0, 185, 181);
                        }
                    }
                    .check1{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -12px;
                            display: none
                        }
                    }
                    .check2{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            font-weight: bold;
                            position: absolute;
                            top: -0.54rem;
                            left: -0.3rem;
                        }
                    }
                    i{
                        font-size: 25px;
                        color: rgb(168, 174, 180);
                        float: left;
                        margin-left: @size10;
                        line-height:  @size50;

                    }
                    img{
                        width: 0.67rem;
                        height: 0.67rem;
                        margin-top: 13px;
                        float: left;
                        margin-left: 0.23rem;
                    }
                    .background1{
                        color: rgb(107, 184, 105)
                    }
                    .background2{
                        color: rgb(0, 157, 235)
                    }
                    .infoWexin{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: @size16;
                        color: rgb(129, 135, 140);
                        .span1{
                            font-size: 13px;
                            line-height: @size13;
                            color: rgb(129, 135, 140);
                        }
                        .span2{
                            font-size: 10px;
                            line-height: @size10;
                            color: rgb(129, 135, 140);
                            margin-top: 0.06rem;
                        }
                        .span3{
                            font-size: 13px;
                            line-height: @size13;
                            color: #000;
                        }
                    }
                    .infoAlipay{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 0.39rem;
                        color: rgb(129, 135, 140);
                        font-size: 13px;
                    }
                    .infoAlipay2{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 0.39rem;
                        color: #000000;
                        font-size: 13px;
                    }
                }

                .footer{
                    height: @size45;
                    box-sizing: border-box;
                    border-top: 1px solid rgb(53, 60, 70);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    line-height: @size45;
                    font-size: 14px;
                }
            }
        }
        .dis3{
            z-index:102;
            .transparent{
                position: fixed;
                bottom: 0;
                z-index: 102;
                width: 100%;
                height: 100%;
                background:#000;
                opacity:0.6;
                display: block;
            }
            .popWin{
                height: 7rem;
                width: 6.67rem;
                background: white;
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
                right:0;
                margin:auto;
                z-index: 1000;
                text-align: center;
                box-sizing: border-box;
                padding: 0 @size20;
                display: block;
                .close{
                    position: absolute;
                    right: 0;top: 0;
                    width: @size30;
                    height: @size30;
                    background: #eb6100;
                    i{
                        font-size: 0.7rem;
                        color: white;
                    }
                }
                .payEn{
                    padding-top: @size50;
                    font-size:@size14;
                    font-weight: bold;
                }
                .payCh{
                    font-size: 11px;
                    color: rgb(51, 51, 51);
                    line-height: @size11;
                }
                .remind{
                    padding: @size25 0;
                    font-size: 12px;
                    i{
                        font-size:1rem;
                        color:#ECC261;
                    }
                    img{
                        width:1rem;
                        margin-bottom:0.3rem;
                    }
                    .p1{
                        color: #E95500;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .p2{
                        font-size: 11px;
                        color:#373737;
                    }
                }
                .warn{
                    border-top: 1px solid rgb(129, 135, 140);
                    text-align: left;
                    height: @size40;
                    font-size: 10px;
                    line-height: @size40;
                }
                .value{
                    width: 100%;
                    height: @size40;
                    line-height: @size40;
                    position: relative;
                    text-align: center;
                    border: 1px solid rgb(129, 135, 140);
                    .nobtn1{
                        color:#E6E6E6 !important;
                    }
                    .btn1{
                        width: 1.46rem;
                        position: absolute;
                        left: 0;
                        top: -3px;
                        font-size: 50px;
                        line-height: 40px;
                        color: #3C434D;
                    }
                    .btn2{

                        width: 1.46rem;
                        position: absolute;
                        right: 0;
                        top: -3px;
                        font-size: 35px;
                        line-height: 40px;
                        color: red;
                    }
                    .label{
                        font-size: 12px;
                    }
                    .price{
                        font-size: 12px;
                        width: 2.68rem;
                        font-weight: bold;
                    }

                    .price2{
                        font-size: 14px;
                        width: 2.68rem;
                        font-weight: bold;
                        color:#E85800;
                    }
                }
                .worthy{
                    box-sizing: border-box;
                    height: 1.52rem;
                    border-bottom: 1px solid rgb(129, 135, 140);
                    padding-top: 10px;
                    .tit{
                        font-size: 10px;
                        color: rgb(129, 135, 140);
                    }
                    .money{
                        font-size: 11px;
                        font-weight: bold;
                    }
                }
                .explain{
                    font-size: 10px;
                    color: rgb(129, 135, 140);
                    text-align: left;
                    box-sizing: border-box;
                    padding-top: @size10;
                    span{
                        font-weight: bold;
                        font-size: 10px;
                        color: #000;

                    }
                }
                .payway{
                    font-size: 14px;
                    padding-top: @size25;
                    text-align: left;
                }
                .pay{
                    height: @size50;
                    border-top: 1px solid rgb(129, 135, 140);
                    .check{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(0, 185, 181);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -11px;
                            color: rgb(0, 185, 181);
                        }
                    }
                    .check1{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -12px;
                            display: none
                        }
                    }
                    .check2{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            font-weight: bold;
                            position: absolute;
                            top: -0.54rem;
                            left: -0.3rem;
                        }
                    }
                    i{
                        font-size: 25px;
                        color: rgb(168, 174, 180);
                        float: left;
                        margin-left: @size10;
                        line-height:  @size50;

                    }
                    img{
                        width: 0.67rem;
                        height: 0.67rem;
                        margin-top: 13px;
                        float: left;
                        margin-left: 0.23rem;
                    }
                    .background1{
                        color: rgb(107, 184, 105)
                    }
                    .background2{
                        color: rgb(0, 157, 235)
                    }
                    .infoWexin{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: @size16;
                        color: rgb(129, 135, 140);
                        .span1{
                            font-size: 13px;
                            line-height: @size13;
                            color: rgb(129, 135, 140);
                        }
                        .span2{
                            font-size: 10px;
                            line-height: @size10;
                            color: rgb(129, 135, 140);
                        }
                        .span3{
                            font-size: 13px;
                            line-height: @size13;
                            color: #000;
                        }
                    }
                    .infoAlipay{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: rgb(129, 135, 140);
                        font-size: 15px;
                    }
                    .infoAlipay2{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: #000000;
                        font-size: 15px;
                    }
                }

                .footer{
                    height: @size45;
                    box-sizing: border-box;
                    border-top: 1px solid rgb(53, 60, 70);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    line-height: @size45;
                    font-size: 14px;
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
                /*width: 1.6rem;*/
                //height: @size15;
                border: 1px solid white;
                border-radius:3px;
                font-size:  11px;
                color: white;
                margin:0.22rem @size10 @size10 0.5rem;
                padding:0.03rem 0.1rem;
                line-height: 0.38rem;
            }
            .value{
                font-size:  12px;
                color: white;
                margin-top:@size6;
            }
            .value1{
                color: black;
                font-size:  12px;
                margin-top:@size6;
                margin-right: @size10;
            }
            .success{
                font-size: 12px;
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
                    height: .6rem;
                    background: #000;
                    border-radius: 3px;
                    margin-top: .16rem;
                    line-height: .6rem;
                    font-size: .32rem;
                    font-weight: 700;
                    width: .55rem;
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
                    border: 0.6px solid #81878c;
                    height: .6rem;
                    background: white;
                    border-radius: 3px;
                    margin-top: .16rem;
                    line-height: .6rem;
                    font-size: .32rem;
                    font-weight: 700;
                    width: .55rem;
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
        .infomations{
            box-sizing: border-box;
            position: fixed;
            bottom: 1.6rem;
            width: 100%;
            height: @size35;
            text-align: center;
            font-size: 13px;
            line-height: @size25;
            .learnMore{
                /*width: 1.6rem;*/
                //height: @size15;
                border: 1px solid white;
                border-radius:3px;
                font-size:  11px;
                color: white;
                margin:0.22rem @size10 @size10 0.5rem;
                padding:0.03rem 0.1rem;
                line-height: 0.38rem;
            }
            .value{
                font-size:  12px;
                color: white;
                margin-top:@size6;
            }
            .value1{
                color: black;
                font-size:  12px;
                margin-top:@size6;
                margin-right: @size10;
            }
            .success{
                font-size: 12px;
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
                    height: .6rem;
                    background: #000;
                    border-radius: 3px;
                    margin-top: .16rem;
                    line-height: .6rem;
                    font-size: .32rem;
                    font-weight: 700;
                    width: .55rem;
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
            border-top:1px solid rgb(201, 209, 218);
            max-width: 10rem;
        }
        //进行中
        .bground2{
            background:linear-gradient(30deg,rgb(0, 224, 222) 0%,rgb(104, 105, 237) 100%);
            max-width: 10rem;
        }
        //已经拍中
        .bground3{
            background:linear-gradient(30deg,#dd704c 0%,#f54ea2 100%);
            max-width: 10rem;
        }
        //流拍
        .bground4{
            background:gray;
            max-width: 10rem;
        }
        //底部
        //底部
        .footers{
            width: 100%;
            max-width: 10rem;
            height: 1.6rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 101;
            background: #fafbfc;
            box-sizing: border-box;
            border-top: 1px solid #353c46;
            .goBuy{
                float: right;
                width: 3rem;
                height: 100%;
                line-height: 1.2rem;
                text-align: center;
                font-size: 14px;
                color:#333;
                border-left: 1px solid #cdd4dc;
            }
            .value{
                float: left;
                width: 5.8rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                padding-left: 0.5rem;
                box-sizing:border-box;
                .nobtn1{
                    color:#E6E6E6 !important;
                }
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #3C434D;
                    float: left;
                    margin-left: -0.4rem;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: right;
                }
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                }
                .price2{
                    font-size: 14px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
            }
            .value2{
                float: left;
                width: 5.4rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                padding-left: 0.5rem;
                .nobtn1{
                    color:#E6E6E6 !important;
                }
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #E3E3E3;
                    float: left;
                    margin-left: -0.4rem;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #E3E3E3;
                    float: right;
                    /*margin-top: 0.04rem;*/
                }
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
                .price2{
                    font-size: 14px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
            }
            .values{
                text-align: left !important;
            }
            .value3{
                float: left;
                width: 5.6rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: left;
                padding-left: 0.5rem;
                box-sizing:border-box;
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
            }
            .r-icon{
                float: right;
                height: 1.2rem;
                width: @size45;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                i{
                    line-height: @size45;
                    font-size: @size30;
                }
                img{
                    width: 70%;
                    height: 67%;
                    margin: 0.2rem auto;
                }
            }
            .offer{
                float: right;
                width: 2.8rem;
                height: 1.2rem;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 14px;
            }
            .offer2{
                float: right;
                width: 2.8rem;
                height: 1.2rem;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 14px;
                color:#E85800;
            }
        }
        .footer{
            width: 100%;
            max-width: 10rem;
            height: 1.2rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 101;
            background: #fafbfc;
            box-sizing: border-box;
            border-top: 1px solid #353c46;
            .goBuy{
                float: right;
                width: 3rem;
                height: 100%;
                line-height: 1.2rem;
                text-align: center;
                font-size: 14px;
                color:#333;
                border-left: 1px solid #cdd4dc;
            }
            .value{
                float: left;
                width: 5.8rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                padding-left: 0.5rem;
                box-sizing:border-box;
                .nobtn1{
                    color:#E6E6E6 !important;
                }
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #3C434D;
                    float: left;
                    margin-left: -0.4rem;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: right;
                }
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                }
                .price2{
                    font-size: 14px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
            }
            .value2{
                float: left;
                width: 5.4rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                padding-left: 0.5rem;
                .nobtn1{
                    color:#E6E6E6 !important;
                }
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #E3E3E3;
                    float: left;
                    margin-left: -0.4rem;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: #E3E3E3;
                    float: right;
                    /*margin-top: 0.04rem;*/
                }
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
                .price2{
                    font-size: 14px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
                }
            }
            .values{
                text-align: left !important;
            }
            .value3{
                float: left;
                width: 5.6rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: left;
                padding-left: 0.5rem;
                box-sizing:border-box;
                .label{
                    font-size: 12px;
                }
                .price{
                    font-size: 15px;
                    width: 2.68rem;
                    font-weight: bold;
                    color:#E85800;
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
                img{
                    width: 70%;
                    height: 67%;
                    margin: 0.2rem auto;
                }
            }
            .offer{
                float: right;
                width: 2.8rem;
                height: 100%;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 14px;
            }
            .offer2{
                float: right;
                width: 2.8rem;
                height: 100%;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 14px;
                color:#E85800;
            }
        }
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
    }
</style>