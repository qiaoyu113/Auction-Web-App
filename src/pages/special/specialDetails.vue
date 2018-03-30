<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-排场详情 -->
    <div class="" id="specialDetails" v-set-title="title">
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
        <div id="mescroll" class="mescroll">
            <div class="mescroll-bounce">
                <div class="container">
                    <div class="sell-list">
                        <div class="sell-pic">
                            <a href='javascript:void(0)'>
                                <img :src="img">
                            </a>
                        </div>
                        <div class="sell-information">
                            <div class="font">{{details.realUserNum}}人</div>
                            <div class="sellicon2">
                                <img src="../../assets/image/mycenter/icon3.png"/>
                            </div>
                            <div class="font">{{details.auctionNum}}件</div>
                            <div class="sellicon1"></div>
                        </div>
                        <div class='sell-content'>
                            <div class="sell-int">
                                <div class="time" v-if="details.auctionStatus != '3'">{{EndTime}}</div>
                                <div class="time" v-if="details.auctionStatus == '3'">{{reversedNum(details.doneAmount/100)}} CNY</div>
                                <div class="title">{{details.name}}</div>
                                <div class="info" v-if="details.auctionStatus === 2">{{overTime}} 结束</div>
                                <div class="info" v-if="details.auctionStatus === 1">{{startTime}} 开始</div>
                                <div class="info" v-if="details.auctionStatus === 3">成交件数: {{details.doneNum}}</div>
                                <div class="state" v-if="details.auctionStatus === 2">
                                    <!--<div  class="span1" :class="getBgcolor(details.auctionStatus)">-->
                                        <!--<div class="xian"></div>-->
                                        <!--<div class="xian"></div>-->
                                    <!--</div>-->
                                    <img src="../../assets/image/mycenter/zan.png"/>
                                    <span>拍卖中</span>
                                </div>
                                <div class="state" v-if="details.auctionStatus === 1">
                                    <div  class="span1" :class="getBgcolor(details.auctionStatus)">
                                        <div class="icon1"></div>
                                    </div>
                                    <!--<img src="../../assets/image/mycenter/zan.png"/>-->
                                    <span>预展中</span>
                                </div>
                                <div class="state" v-if="details.auctionStatus === 3">
                                    <!--<div  class="span1" :class="getBgcolor(details.auctionStatus)">-->
                                        <!--<div class="icon4"></div>-->
                                        <!--<div class="icon5"></div>-->
                                    <!--</div>-->
                                    <img src="../../assets/image/mycenter/end.png"/>
                                    <span>已结束</span>
                                </div>
                                <div class="sta-over">开始时间：{{startTime}}</div>
                                <div class="sta-over">结束时间：{{details.auctionEndTime}}</div>
                            </div>
                            <div class="sell-html" v-html="details.content"></div>
                        </div>
                    </div>
                    <div class="sell-more clearfix" v-if="recoCh">
                        <!--推荐拍品列表-->
                        <div class="sellList" @click="sellListGo(list.id)" v-for="list in auctionDetail">
                            <div class="pic">
                                <a href='javascript:void(0)'>
                                    <img :src="$store.state.picHead + list.picItems[0]"/>
                                </a>
                                <div class="money">{{reversedNum(list.currentPrice)}} CYN</div>
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
                                    <!--<div class="icon"></div>-->
                                    <!--<div class="icon2"></div>-->
                                    <img src="../../assets/image/mycenter/end.png" />
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
        </div>
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
                details:'',
                img:'',
                title: '传家',
                index:2,
                id:'',
                page:{num:1,size:5},
                totalPage:'',
                startTime:'',
                EndTime:'',//倒计时
                overTime:'',//结束时间
                completeNo:'',//专场号
                recoCh:false,
                collects:'',//拍品列表数据
                auctionDetail:[],
                isShowNoMore:false,
                collect:false,
                hintShow:false,
                shareHint:false,
                goMyNum:'0',
                // 计算
                reversedNum: function (num) {
                    // `this` 指向 vm 实例
                    return common.format_number(num)
                }
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
            that.id = that.$route.params.id;
            that.onMove()
            that.meScroll();
        },
        methods: {
            //获取数据
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
                that.specialRun = [];
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
                commonService.getAuctionMarketsList({id:that.id},that.id).then(function(res){
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        commonService.putInsertion({businessType:2,dimensionType:1,businessTypeId:that.id,businessNo:that.details.completeNo,businessName:that.details.name}).then(function(res){})
                        that.img = that.$store.state.picHead + res.data.datas.coverUrl;
                        setTimeout(function(){
                            let now = new Date().getTime()
                            let time = '';
//                            if(that.details.auctionStatus == '1'){
//                                time = that.details.auctionStartTime - now;
//                            }else{
//                                time = that.details.auctionEndTime - now;
//                            }
                            time = that.details.mqEndTime - now;
                            let day = '';
                            let h =  '';
                            let m =  '';
                            let s =  '';
                            if(time < 0){
                                day = '00';
                                h =  '00';
                                m =  '00';
                                s =  '00';
                                clearInterval(timeRun)
                            }else{
                                day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                            }
                            that.EndTime = day + ':' + h + ':' + m + ':' + s;
                        },0)
                        let timeRun = setInterval(function(){
                            let now = new Date().getTime()
                            let time = '';
//                            if(that.details.auctionStatus == '1'){
//                                time = that.details.auctionStartTime - now;
//                            }else{
//                                time = that.details.auctionEndTime - now;
//                            }
                            time = that.details.mqEndTime - now;
                            let day = '';
                            let h =  '';
                            let m =  '';
                            let s =  '';
                            if(time < 0){
                                day = '00';
                                h =  '00';
                                m =  '00';
                                s =  '00';
                                clearInterval(timeRun)
                            }else{
                                day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                            }
                            that.EndTime = day + ':' + h + ':' + m + ':' + s;
                        },1000);
                        that.overTime = common.getFormatOfDate(that.details.mqEndTime,'yyyy.MM.dd h:m')
                        that.startTime = common.getFormatOfDate(that.details.auctionStartTime,'yyyy.MM.dd h:m')
                        that.details.auctionEndTime = common.getFormatOfDate(that.details.auctionEndTime,'yyyy.MM.dd h:m')
                        that.completeNo = that.details.completeNo;
                        commonService.getAuctionList({pageNo:pageNum,pageSize:pageSize,marketNo:that.completeNo}).then(function(res){
                            if(res.data.code === 200){
                                that.collects = res.data.datas.pager.datas
                                if(that.collects.length === 0){
                                    let specialist = res.data.datas.pager.datas;
                                    that.totalPage = res.data.datas.pager.totalPage
                                    successCallback&&successCallback(specialist);//成功回调
                                }else{
                                    that.recoCh = true;
                                    let specialist = res.data.datas.pager.datas;
                                    let collects = res.data.datas.collects;
                                    that.totalPage = res.data.datas.pager.totalPage
                                    let dataArr = '';
                                    if(collects.length != 0){
                                        that.collect = true;
                                    }
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
                                    successCallback&&successCallback(dataArr);//成功回调
                                }
                            }
                        })
                    }else{
                        that.$router.replace({name:'none'})
                    }
                })
            },
            //分享
            share(){
                let that = this;
                that.shareHint = true;
                setTimeout(function(res){
                    that.shareHint = false;
                },2500)
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
                overscroll(document.querySelector('.mescroll'));
                document.body.addEventListener('touchmove', function(evt) {
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            //背景色
            getBgcolor:function(index) {
                if(index==2){
                    return 'bgcolor1';
                }else if(index==1){
                    return 'bgcolor2';
                }else if(index==3){
                    return 'bgcolor3';
                }
            },
            //返回按钮
            back(){
              let that = this;
//              that.$router.replace({name:'special'});
              that.$router.back(-1);
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
        }
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    @import url("../../assets/css/common/mescroll.min.css");
    #specialDetails{
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
            background: rgb(255, 255, 255);
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
                    width: 0.6rem;
                    margin-top: 0.15rem;
                }
            }
        }
        #mescroll{
            width:100%;
            max-width:10rem;
            position: fixed;
            top:@size35;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            .mescroll-bounce{
                width:100%;
            }
        }
        .container{
            width:100%;
            .sell-more{
                padding: 0.093rem;
                box-sizing: border-box;
                .sellList{
                    width: 4.57rem;
                    float:left;
                    margin:0.2rem 0.1rem;
                    position: relative;
                    .pic {
                        width:100%;
                        position: relative;
                        img {
                            width: 100%;
                            height: 3.47rem;
                        }
                        .money {
                            font-size: 14px;
                            padding-top: @size15;
                            font-weight: 500;
                        }
                        .title {
                            font-size: 12px;
                            color: rgb(133, 133, 133);
                            padding-top: @size1;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                        }
                        .number {
                            font-size: 10px;
                            color: rgb(133, 133, 133);
                            padding: 0 0 @size25 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
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
                            /*padding: 0.09rem 0.09rem;*/
                            box-sizing: border-box;
                            position: relative;
                            img{
                                width:100%;
                            }
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
            }
        }
        .sell-list{
            .sell-pic{
                width:100%;
                height: @size162;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .sell-information {
                padding: 0.26rem;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
                .sellicon1{
                    width:0.15rem;
                    height:0.15rem;
                    float:right;
                    border: 0.05rem solid #A6A9AF;
                    margin-right:0.1rem;
                    margin-top:0.06rem;
                }
                .font{
                    font-size:10px;
                    float:right;
                    margin-right:0.2rem;
                    font-weight:500;
                    line-height:0.38rem;
                    color:#A6A9AF;
                }
                .sellicon2{
                    /*width: 0;*/
                    /*height: 0;*/
                    /*border-left: 0.2rem solid transparent;*/
                    /*border-right: 0.2rem solid transparent;*/
                    /*border-bottom: 0.3rem solid #A6A9AF;*/
                    float:right;
                    /*position: relative;*/
                    /*margin-right:10px;*/
                    /*margin-top:0.04rem;*/
                    img{
                        width: 0.36rem;
                        height: 0.36rem;
                        margin-right: 0.04rem;
                    }
                    .icon{
                        width: 0;
                        height: 0;
                        border-left: 0.1rem solid transparent;
                        border-right: 0.1rem solid transparent;
                        border-bottom: 0.15rem solid #fff;
                        position: absolute;
                        left: -0.1rem;
                        top: 0.1rem;
                    }
                }
                a {
                    font-size: @size6;
                    text-decoration: underline;
                    color: red;
                    padding-left: 20px;
                }
                .pos2 {
                    position: absolute;
                    top: 15px;
                    right: 10px;
                    font-size: @size6;
                    color: rgb(65, 62, 62);
                }
                .pos1 {
                    position: absolute;
                    top: 15px;
                    right: 70px;
                    font-size: @size6;
                    color: rgb(51, 51, 51);
                }
            }
            .sell-content{
                box-sizing: border-box;
                padding: 0.26rem 0.5333rem 0 0.5333rem;
                .sell-html{
                    margin-top:0.2rem;
                    img{
                        width:100% !important;
                        height: auto !important;
                    }
                }
                .sell-int{
                    div{
                        text-align: center;
                    }
                    .time{
                        font-size: 18px;
                        font-weight: bold;
                        transform: translateZ(0px);
                    }
                    .title{
                        font-size: 12px;
                        padding-top: @size5;
                        color:rgb(133, 133, 133);
                    }
                    .info{
                        font-size: 10px;
                        padding-top: 0.4rem;
                        padding-bottom: @size25;
                        color:rgb(133, 133, 133);
                    }
                    .state{
                        font-size: 10px;
                        text-align: left;
                        color:rgb(133, 133, 133);
                        overflow: hidden;
                        margin-bottom:0.1rem;
                        line-height:0.46rem;
                        img{
                            width: @size15;
                            height: @size15;
                            float:left;
                            margin-right:0.1rem;
                            margin-top:0.03rem;
                        }
                        span{
                            font-size: 10px;
                        }
                        .span1 {
                            width: @size15;
                            height: @size15;
                            display: inline-block;
                            float: left;
                            background: rgb(0, 188, 181);
                            box-sizing: border-box;
                            text-align: center;
                            padding: 0.1rem 0.05rem;
                            margin-right:0.1rem;
                            position: relative;
                            .xian{
                                width:0.1rem;
                                height:0.2rem;
                                background:#fff;
                                float:left;
                                margin:0 0.02rem;
                            }
                            .icon1{
                                width: 70%;
                                height: 100%;
                                border-radius: 100%;
                                background: #fff;
                                margin: auto;
                            }
                            .icon4{
                                width: 0;
                                height: 0;
                                position: absolute;
                                left: 0.08rem;
                                border-top: 0.1rem solid transparent;
                                border-left: 0.16rem solid #fff;
                                border-bottom: 0.1rem solid transparent;
                            }
                            .icon5{
                                width: 0.03rem;
                                height: 0.2rem;
                                background: #fff;
                                position: absolute;
                                right: 0.1rem;
                            }
                        }
                        .bgcolor1{
                            background: rgb(0, 188, 181);
                        }
                        .bgcolor2{
                            background: rgb(233, 199, 115);
                        }
                        .bgcolor3{
                            background: rgb(235, 97, 0);
                        }
                    }
                    .sta-over{
                        font-size: 10px;
                        text-align: left;
                        color: rgb(133, 133, 133);
                    }
                }
                .sell-inf{
                    margin-top: @size20;
                    font-size: 11px;
                    line-height: @size24;
                    color: rgb(133, 133, 133);
                }
            }
        }
        .sell-more{
            box-sizing: border-box;
            text-align: center;
            margin: @size5;
        }
    }
</style>

