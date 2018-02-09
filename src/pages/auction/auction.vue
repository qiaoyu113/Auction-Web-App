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
                                  <div class="fr icon">i</div>
                                  <a class="fr">查看如何参加拍卖</a>
                            </div>
                        </div>
                    </div>
                    <div class="others">
                        <div class="othersEn">OTHERS</div>
                        <div class="othersCh">本场其他</div>
                    </div>
                    <div class="sell-more clearfix">
                        <div class="sellList" @click="sellListGo(list.id)" v-for="list in specialist">
                            <div class="pic">
                                <img :src="$store.state.picHead + list.picItems[0]"/>
                                <div class="money">￥{{list.basePrice}}</div>
                                <div class="title">{{list.title}}</div>
                                <div class="number">{{list.completeNo}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<z-record></z-record>-->
        <!--<z-info></z-info>-->
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
                specialist:[],
                marketNo:'',
                totalPage:'',
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
            meScroll: function (){
                let that = this;
                that.mescroll = new MeScroll("mescroll", {
                    up: {
                        callback: that.upCallback,
                        page:{size:that.page.size},
                        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    },
                });
            },
            upCallback: function () {
                const that = this;
                that.getListData(that.page.num, that.page.size,function(curPageData) {
                    if(that.page.num == 1)  that.specialist = [];//如果是第一页需手动制空列表
                    that.specialist = that.specialist.concat(curPageData); //更新列表数据
                    // 加载完成后busy为false，如果最后一页则lastpage为true
                    //          加载完成后给页数+1
                    that.mescroll.endSuccess(curPageData.length,that.totalPage);
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
                    if(res.data.code === 200){
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
                                let specialist = res.data.datas.pager.datas
                                that.totalPage = res.data.datas.pager.totalPage;
                                successCallback&&successCallback(specialist);//成功回调
                            }
                        })
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
            //初始化数据
            onload(){
                let that = this;
                commonService.getAuction({id:that.id},that.id).then(function(res){
                    console.log(res)
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        that.img = res.data.datas.picItems;
                        that.$nextTick(function () {
                            that.onswiper();
                        });
                        that.marketNo = res.data.datas.marketNo
                        that.meScroll()
                    }
                })
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
                    border-bottom: 0.3rem solid #A6A9AF;
                    float:right;
                    position: relative;
                    margin-right:6px;
                    margin-top:0.04rem;
                    .icon{
                        width: 0;
                        height: 0;
                        border-left: 0.14rem solid transparent;
                        border-right: 0.14rem solid transparent;
                        border-bottom: 0.17rem solid #fff;
                        position: absolute;
                        left: -0.13rem;
                        top: 0.08rem;
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
                width: 4.55rem;
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
        }
    }
</style>