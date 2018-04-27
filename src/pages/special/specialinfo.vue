<template>
    <div id="speciailinfo" v-set-title="title">
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
        <div id="mescroll" class="mescroll container">
            <div class="mescroll-bounce">
                <div class="titleEn">{{details.title}}</div>
                <div class="titleCh">{{details.subTitle}}</div>
                <div class="speTime">{{details.smTitle}}</div>
                <div class="speCont" id="html" v-html="details.content"></div>
                <div class="recommend" v-if="recoCh">RECOMMEND</div>
                <!--<div class="recoCh" v-if="recoCh">拍品推荐</div>-->
                <div class="recoCh" v-if="recoCh">推荐</div>
                <div class="sell-more clearfix" v-if="recoCh">
                    <!--推荐拍品列表-->
                    <div class="sellList" @click="sellListGo(list.id)" v-for="list in auctionDetail">
                        <div class="pic">
                            <a href='javascript:void(0)'>
                                <img :src="$store.state.picHead + list.picItems[0]"/>
                            </a>
                            <div class="money">{{reversedNum(list.basePrice)}} CNY</div>
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
                                <div class="icon"></div>
                                <div class="icon"></div>
                            </div>
                            <!--预展中-->
                            <div class="collect3"  v-if="list.auctionStatus === 1">
                                <div class="icon"></div>
                            </div>
                            <!--已结束-->
                            <div class="collect4"  v-if="list.auctionStatus === 3">
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
        <!--分享提示-->
        <div class="shareBox" v-if="shareHint">可以使用浏览器分享按钮分享给好友哦</div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    import specialmore from "../../component/special/specialmore.vue";
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '茗探',
                id:'',
                details:'',
                auctionDetail:[],
                page:{num:1,size:10},
                recoCh:false,
                isShowNoMore:false,
                collect:false,
                hintShow:false,
                ServiceBox:false,
                // 计算
                reversedNum: function (num) {
                    // `this` 指向 vm 实例
                    return common.format_number(num)
                },
                shareHint:false,
                goMyNum:'0',
            }
        },
        components:{'special-more':specialmore},
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
            let that = this;
            that.onMove()
            that.id = that.$route.params.id;
            that.onload();
        },
        methods: {
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
                        commonService.getShares({type:20,typeId:that.id}).then(function(res){
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
                that.auctionDetail = [];
                that.upCallback()
            },
            upCallback: function () {
                const that = this;
                that.getListData(that.page.num, that.page.size,function(curPageData) {
                    if(that.page.num == 1)  that.auctionDetail = [];//如果是第一页需手动制空列表
                    that.auctionDetail = that.auctionDetail.concat(curPageData); //更新列表数据
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
                commonService.getauctionPackId({id:that.id},that.id).then(function(res){
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        commonService.putInsertion({businessType:3,dimensionType:1,businessTypeId:that.id,businessName:that.details.title}).then(function(res){})
                        that.details.createTime = common.getFormatOfDate(that.details.createTime,'yyyy.MM.dd h:m:s')
                        let dataArr = [];
                        if(that.details.auctionIds != null && that.details.auctionIds.length != 0){
                            that.recoCh = true;
                            commonService.getAuctionList({
                                pageNo:pageNum,
                                pageSize:pageSize,
                                auctionIds:that.details.auctionIds.toString(),
                                type:2
                            }).then(function(res){
                                if(res.data.code === 200){
                                    let act = res.data.datas.pager.datas;
                                    let collects = res.data.datas.collects;
                                    that.totalPage = res.data.datas.pager.totalPage;
                                    if(collects.length != 0){
                                        that.collect = true;
                                    }
                                    for (let i = 0;i<act.length;i++){
                                        let price = act[i].basePrice/100;
                                        if(price%1 === 0){
                                            act[i].basePrice = price.toString() + '.00'
                                        }else{
                                            act[i].basePrice = price.toFixed(2);
                                        }
                                        let collect = collects.indexOf(act[i].id);
                                        if(collect === -1){
                                            act[i]['collect'] = false
                                            dataArr = act;
                                        }else{
                                            act[i]['collect'] = true;
                                            dataArr = act;
                                        }
                                    }
                                    successCallback&&successCallback(dataArr);//成功回调
                                }else{
                                    that.recoCh = false;
                                    successCallback&&successCallback(dataArr);//成功回调
                                }
                            })
                        }else{
                            that.recoCh = false;
                            successCallback&&successCallback(dataArr);//成功回调
                        }
                    }
                })
            },
            //初始化数据
            onload(){
                let that = this;
                commonService.getauctionPackId({id:that.id},that.id).then(function(res){
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        that.details.createTime = common.getFormatOfDate(that.details.createTime,'yyyy.MM.dd h:m:s')
                        if(that.details.auctionIds != null){
                            that.recoCh = true;
                            that.meScroll();
                        }else{
                            that.recoCh = false;
                            setTimeout(function(){
                                that.wxShare()
                            },500)
                        }
                    }
                })
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
                overscroll(document.querySelector('.container'));
                document.body.addEventListener('touchmove', function(evt) {
                    //In this case, the default behavior is scrolling the body, which
                    //would result in an overflow.  Since we don't want that, we preventDefault.
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            //返回上一层
            back:function(){
                let that = this;
                that.$router.replace({name:'home'})
            },
            //前往拍品详情
            sellListGo(id){
                let that = this;
                that.$router.push({name:'auctionMore',params:{id:id}})
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
            //分享
            share(){
                let that = this;
                that.shareHint = true;
                setTimeout(function(res){
                    that.shareHint = false;
                },2500)
            }
        },
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url("../../assets/css/common/mescroll.min.css");
    @import url('../../assets/css/icon/iconfont.css');
    #speciailinfo{
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
            background:  rgba(255, 255, 255,0.5);
            position: fixed;
            top: 0;
            z-index: 100;
            // opacity: 0.5;
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
                font-size:20px;
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
            position: fixed;
            max-width:10rem;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            padding-top:0.93rem;
            overflow-y: auto;
        }
        .container{
            text-align: center;
            overflow-y: scroll;
            .titleEn{
                /*font-size: 14px;*/
                font-weight: bold;
                padding: .8rem .5rem 0 .5rem;
            }
            .titleCh{
                font-size: 12px;
                line-height: 25px;
                color: rgb(51, 51, 51);
            }
            .speTime{
                font-size: 12px;
                padding-top: @size15;
                color: rgb(51, 51, 51);
            }
            .speCont{
                padding: @size20 @size20 @size15 @size20;
                text-align: left;
                img{
                    width:100% !important;
                    height: auto !important;
                }
            }
            .spePic{
                width: 9.47rem;
                height: @size211;
                padding: @size10;
                img{
                    width: 100%;
                    height: @size200;
                }
                .picTit{
                    text-align: right;
                    font-size: 9px;
                    padding-top: 5px;
                }

            }
            .recommend{
                letter-spacing: 2px;
                padding-top: @size20;
                font-weight: bold;
            }
            .recoCh{
                font-size: 12px;
                padding-bottom: @size20;
                color:#212121;
            }
            .sell-more{
                /*width:100%;*/
                padding: 0.16rem;
                margin: 0.1333rem;
                box-sizing: border-box;
                .sellList{
                    width: 4.57rem;
                    float:left;
                    margin: 0.2rem 0.065rem;
                    position: relative;
                    .pic {
                        width:100%;
                        position: relative;
                        img {
                            width: 100%;
                            height: 3.47rem;
                        }
                        .money {
                            font-size: 12px;
                            padding-top: @size15;
                            color:rgb(51,51,51);
                            font-weight:bold;
                        }
                        .title {
                            font-size: 12px;
                            color:rgb(51,51,51);
                            padding-top: @size1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                        }
                        .number {
                            font-size: 10px;
                            color:rgb(51,51,51);
                            padding: 0 0 @size25 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                        }
                    }
                    .date{
                        width:0.8rem;
                        position: absolute;
                        right:0;
                        top:0;
                        .collect{
                            width:0.4rem;
                            height:0.4rem;
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
                            width:0.4rem;
                            height:0.4rem;
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
                            width:0.4rem;
                            height:0.4rem;
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
                            width:0.4rem;
                            height:0.4rem;
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
                            width:0.4rem;
                            height:0.4rem;
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
            }
        }
    }
</style>

