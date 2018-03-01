<template>
    <div id="speciailinfo" v-set-title="title">
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
        <div id="mescroll" class="mescroll container">
            <div class="mescroll-bounce">
                <div class="titleEn">{{details.title}}</div>
                <div class="titleCh">{{details.subTitle}}</div>
                <div class="speTime">{{details.createTime}}</div>
                <div class="speCont" v-html="details.content"></div>
                <div class="recommend" v-if="recoCh">RECOMMEND</div>
                <!--<div class="recoCh" v-if="recoCh">拍品推荐</div>-->
                <div class="recoCh" v-if="recoCh">推荐</div>
                <div class="sell-more clearfix" v-if="recoCh">
                    <!--推荐拍品列表-->
                    <div class="sellList" @click="sellListGo(list.id)" v-for="list in auctionDetail">
                        <div class="pic">
                            <img :src="$store.state.picHead + list.picItems[0]"/>
                            <div class="money">￥{{list.basePrice}}</div>
                            <div class="title">{{list.title}}</div>
                            <div class="number">{{list.completeNo}}</div>
                        </div>
                        <div class="date">
                            <!--收藏图标-->
                            <div class="collect" v-if="list.collect">
                                <div class="collectIcon">
                                    <div class="bottom"></div>
                                </div>
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
                title: '专题详情',
                id:'',
                details:'',
                auctionDetail:[],
                page:{num:1,size:10},
                recoCh:false,
                isShowNoMore:false,
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
            that.id = that.$route.query.id;
            that.onload()
        },
        methods: {
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
                }, function() {
                    that.mescroll.endErr(); //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                });
            },
            getListData:function(pageNum,pageSize,successCallback,errorCallback) {
                //延时一秒,模拟联网
                const that = this;
                commonService.getAuctionList({
                    pageNo:pageNum,
                    pageSize:pageSize,
                    auctionIds:that.details.auctionIds.toString()
                }).then(function(res){
                    if(res.data.code === 200){
                        let act = res.data.datas.pager.datas;
                        let collects = res.data.datas.collects;
                        that.totalPage = res.data.datas.pager.totalPage;
                        let dataArr = '';
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
                        console.log(that.details.auctionIds)
                        if(that.details.auctionIds != null){
                            that.recoCh = true;
                            that.meScroll();
                        }else{
                            that.recoCh = false;
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
                that.$router.back({name:'/'})
            },
            //前往拍品详情
            sellListGo(id){
                let that = this;
                that.$router.push({name:'auctionMore',params:{id:id}})
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
            position: fixed;
            top:2.16rem;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
        }
        .container{
            text-align: center;
            overflow-y: scroll;
            .titleEn{
                /*font-size: 14px;*/
                font-weight: bold;
                padding-top: @size30;
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
                width:100%;
                padding: 0.093rem;
                box-sizing: border-box;
                .sellList{
                    width: 4.57rem;
                    float:left;
                    margin:0.2rem 0.13rem;
                    position: relative;
                    .pic {
                        width:100%;
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
                            text-overflow:ellipsis;
                        }
                        .number {
                            font-size: 12px;
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
                            padding:0.08rem 0.1rem;
                            box-sizing: border-box;
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
            }
        }
    }
</style>

