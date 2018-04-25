<template>
    <div id="home" class="home" v-set-title="title">
        <!--<div class="header">传家</div>-->
        <div id="mescroll" class="mescroll homeMescroll">
            <div class="mescroll-bounce">
                <div class="wrapper">
                    <div class="content" v-for="list in homelist">
                        <home-item :str="list"></home-item>
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
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:4001887107">
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
        <!--<div style="width:100%;height:2rem;background:red;position:fixed;bottom:0;" @click="checked(1)"></div>-->
    </div>
</template>

<script >
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    import itemc from "../../component/home/item.vue";
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '茗探',
                page:{num:1,size:4},
                homelist:[],
                totalPage:'1',
                isShowNoMore:false,
                ServiceBox:false,
            }
        },
        components:{'home-item':itemc},
        mounted: function() {
            let that = this;
            that.onMove();
            that.meScroll();
            that.Insertion();
        },
        methods: {
            //微信分享
            wxShare(){
                let that = this;
                let url = window.location.href;
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
                        commonService.getShares({type:40,typeId:null}).then(function(res){
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
                                        desc: '', // 分享描述
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
            Insertion(){
                let that = this;
                commonService.putInsertion({businessType:5,dimensionType:1}).then(function(res){

                })
            },
            checked(index){
                let that = this;
                that.index = index;
                if(index === 0){
                    that.$router.replace({name:'home'})
                    that.index = 0;
                }else if(index === 1){
                    that.$router.replace({name:'special'})
//                    that.$router.push({name:'specialMore',params:{id:'5aa1f83badc051793d0f3bd5'}})
                    that.index = 1;
                }else if(index === 2){
                    that.$router.replace({name:'home'})
                    that.index = 2;
                }else if(index === 3){
                    that.$router.replace({name:'home'})
                    that.index = 3;
                }
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
                        callback: that.downCallback, //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
                    }
                });
            },
            upCallback: function () {
                const that = this;
                that.getListData(that.page.num, that.page.size,function(curPageData) {
                    if(that.page.num == 1)  that.homelist = [];//如果是第一页需手动制空列表
                    that.homelist = that.homelist.concat(curPageData); //更新列表数据
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
            downCallback(){
                let that = this;
                that.page.num = 1;
                that.homelist = [];
                that.upCallback()
            },
            getListData:function(pageNum,pageSize,successCallback,errorCallback) {
                //延时一秒,模拟联网
                const that = this;
                commonService.getauctionPack({pageNo:pageNum,pageSize:pageSize}).then(function(res){
                    if(res.data.code === 200){
                        let act = res.data.datas.datas;
                        that.totalPage = res.data.datas.totalPage;
                        if(act.length === 0 && that.totalPage <= 1 && that.page.num === 1){
                            let dataArr = res.data.datas.datas;
                            let activity=[];
                            for (let i = 0; i < dataArr.length; i++) {
                                dataArr[i].createTime = common.getFormatOfDate(dataArr[i].createTime,'yyyy.MM.dd h:m:s')
                                activity.push(dataArr[i]);
                            }
                            successCallback&&successCallback(activity);//成功回调
                        }else{
                            let dataArr = res.data.datas.datas;
                            let activity=[];
                            for (let i = 0; i < dataArr.length; i++) {
                                dataArr[i].createTime = common.getFormatOfDate(dataArr[i].createTime,'yyyy.MM.dd h:m:s')
                                activity.push(dataArr[i]);
                            }
                            successCallback&&successCallback(activity);//成功回调
                        }
                    }
                })
            },
            onload(){
                let that = this;
                commonService.getuction({pageNo:that.page.num,pageSize:that.page.size}).then(function(res){
                    if(res.data.code === 200){
                        if(that.page.num === 1){
                            that.homelist = res.data.datas.datas;
                            for(let i = 0;i<that.homelist.length;i++){
                                that.homelist[i].createTime = common.getFormatOfDate(that.homelist[i].createTime,'yyyy.MM.dd h:m:s')
                            }
                        }else{
                            let list = res.data.datas.datas;
                            for(let i = 0;i<list.length;i++){
                                list[i].createTime = common.getFormatOfDate(list[i].createTime,'yyyy.MM.dd h:m:s')
                            }
                            that.homelist.push(list)
                        }
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
                overscroll(document.querySelector('.homeMescroll'));
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
    @import url("../../assets/css/common/mescroll.min.css");
    *{-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}
    .noscroll,
    .noscroll body {
        overflow: hidden;
    }
    .noscroll body {
        position: relative;
    }
    #home{
        width:100%;
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
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
        #mescroll{
            position: fixed;
            top:0;
            bottom: 1.2rem;
            left:0;
            right:0;
            margin:auto;
            height:auto;
        }
    }
</style>

