<template>
    <div id="special" v-set-title="title">
        <div class="header">传家</div>
        <div class="container">
            <div class="nav">
                <div @click="getMenu(1)"><span :class="checked==2 ? 'check' : ''">正在进行</span></div>
                <div @click="getMenu(2)"><span :class="checked==1 ? 'check' : ''">即将开始</span></div>
                <div @click="getMenu(3)"><span :class="checked==3 ? 'check' : ''">历史记录</span></div>
            </div>
            <div id="mescroll" class="mescroll">
                <div class="mescroll-bounce">
                    <div v-for="(list,index) in specialRun" @click="goSellMore(list.id)">
                        <div class="sell">
                            <!-- 内容部分 -->
                            <div class="sell-content" v-if="checked != 3">
                                <div class="sell-time">{{list.EndTime}}</div>
                                <div class="sell-title">{{list.name}}</div>
                                <div class="sell-information">
                                    <a v-if="list.EndText === 2">拍场已开始，快去捡漏吧</a>
                                    <a v-if="list.EndText === 1">拍场已结束，快去看看成交结果</a>
                                    <a class="over" v-if="list.EndText === 3">即将开始</a>
                                    <a class="over" v-if="list.EndText === 4">正在进行</a>
                                    <span class="pos2"><img class="pos2img" src="../../assets/image/mycenter/icon3.png"/>{{list.doneUserNum}}</span>
                                    <span class="pos1"><div class="box"></div> {{list.auctionNum}}</span>
                                </div>
                            </div>
                            <div class="sell-content" v-if="checked === 3">
                                <div class="sell-time">{{list.doneAmount}}CNY</div>
                                <div class="sell-title">{{list.name}}</div>
                                <div class="sell-information">
                                    <a class="over">成交件数：{{list.doneNum}}</a>
                                    <span class="pos2"><img class="pos2img" src="../../assets/image/mycenter/icon3.png"/> {{list.doneUserNum}}</span>
                                    <span class="pos1"><div class="box"></div> {{list.auctionNum}}</span>
                                </div>
                            </div>
                            <!-- 图片部分，未实现完全 -->
                            <div class="sell-picture">
                                <div class="sell-bpic">
                                    <img :src="$store.state.picHead + list.coverUrl">
                                </div>
                                <div class="sell-hint" v-for="(img,key,index) in list.ImgList" v-if="list.id == key">
                                    <div class="sell-box">
                                        <div class="sell-spic">
                                            <ul>
                                                <li v-for="(image,index) in img" v-if="index <= 9">
                                                    <img :src="$store.state.picHead + image">
                                                </li>
                                            </ul>
                                            <div class="addIcon" v-if="img.length === 10">
                                                <i class="iconfont icon-fangdajing"></i>
                                                <span>查看更多</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import specialRun from "../../component/special/specialRun.vue";
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '专场',
                checked:2,
                page:{num:1,size:5},
                totalPage:'',
                time:'',
                arrays: [],
                flag: true,
                speciaImgList:'',
                None:false,
                isShowNoMore:false,
                specialRun:[],
                EndText:'',
                nana:''
            }
        },
//        components:{'spe-run':specialRun},
        mounted: function() {
            let that = this;
            that.onMove()
            that.meScroll();
        },
        methods: {
            //切换状态栏
            getMenu:function(index){
                let that = this;
                if(index === 1){
                    that.checked = 2;
                    that.page.num = 1;
                    that.specialRun = [];
                    that.downCallback()
                }else if(index===2){
                    that.checked = 1;
                    that.page.num = 1;
                    that.specialRun = [];
                    that.downCallback()
                }else{
                    that.checked = 3;
                    that.page.num = 1;
                    that.specialRun = [];
                    that.downCallback()
                }
            },
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
                    if(that.page.num == 1)  that.specialRun = [];//如果是第一页需手动制空列表
                    that.specialRun = that.specialRun.concat(curPageData); //更新列表数据
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
                commonService.getAuctionMarkets({
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    auctionStatus:that.checked,
                }).then(function(res){
                    if(res.data.code === 200){
                        if(res.data.datas.pager.datas == null || res.data.datas.pager.datas.length === 0){
                            that.isShowNoMore = true;
                        }else{
                            if(that.checked === 3){
                                let specialist = res.data.datas.pager.datas;
                                let speciaImgList = res.data.datas.auctionMarketPic
                                that.totalPage = res.data.datas.pager.totalPage
                                console.log(specialist)
                                for(let i = 0;i<specialist.length;i++){
                                    specialist[i].ImgList = speciaImgList;
                                    let price = specialist[i].doneAmount/100;
                                    if(price%1 === 0){
                                        specialist[i].doneAmount = price.toString() + '.00'
                                    }else{
                                        specialist[i].doneAmount = price.toFixed(2);
                                    }
                                }
                                successCallback&&successCallback(specialist);//成功回调
                            }else{
                                let specialist = res.data.datas.pager.datas;
                                let speciaImgList = res.data.datas.auctionMarketPic
                                that.totalPage = res.data.datas.pager.totalPage
                                for(let i = 0;i<specialist.length;i++){
                                    specialist[i].EndTime = '';
                                    specialist[i].ImgList = speciaImgList;
                                    let timeRun = setInterval(function(){
                                        let now = new Date().getTime()
                                        let time = '';
                                        if(that.checked == '2'){
                                            time = specialist[i].auctionEndTime - now;
                                        }else{
                                            time = specialist[i].auctionStartTime - now;
                                        }

                                        let day = parseInt(time / 1000 / 60 / 60 / 24 , 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24 , 10) : parseInt(time / 1000 / 60 / 60 / 24 , 10);
                                        let h =  parseInt(time / 1000 / 60 / 60 % 24 , 10) < 10 ? '0' +  parseInt(time / 1000 / 60 / 60 % 24 , 10) :  parseInt(time / 1000 / 60 / 60 % 24 , 10);
                                        let m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' +  parseInt(time / 1000 / 60 % 60 , 10) :  parseInt(time / 1000 / 60 % 60 , 10);
                                        let s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                        specialist[i].EndTime = day + ':' + h + ':' + m + ':' + s;
                                        if(time <= 0){
                                            if(that.checked === 2){
                                                specialist[i].EndText = 1;
                                                specialist[i].EndTime = '00:00:00:00'
                                                clearInterval(timeRun)
                                            }else if(that.checked === 1){
                                                specialist[i].EndText = 2
                                                specialist[i].EndTime = '00:00:00:00'
                                                clearInterval(timeRun)
                                            }
                                        }else{
                                            if(that.checked === 2){
                                                specialist[i].EndText = 4
                                            }else if(that.checked === 1){
                                                specialist[i].EndText = 3
                                            }
                                        }
                                    },1000);
                                }
                                successCallback&&successCallback(specialist);//成功回调
                            }
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
            //数据请求判断
            getContent: function() {
                let that = this;
                if(that.checked == 2){
                    return that.specialRun;
                }else if(that.checked == 1){
                    return that.specialWill;
                }
                else if(that.checked == 3){
                    return that.specialHis;
                }
            },
            //跳转详情页
            goSellMore(id){
                let that = this;
                console.log(id);
                that.$router.push({name:'specialMore',params:{id:id}})
            }
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    @import url("../../assets/css/common/mescroll.min.css");
    #special{
        #mescroll{
            width:100%;
            position: fixed;
            top:2.14rem;
            bottom: 1.2rem;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            overflow: scroll;
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
        .container{
            margin-top: @size75;
        }
        .nav{
            width: @size375;
            height: @size35;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(53, 60, 70);
            background: rgb(255, 255, 255);
            position: fixed;
            top: @size45;
            z-index: 100;
            div{
                display: inline-block;
                float: left;
                color: rgb(153, 153, 162);
                width: 33.3%;
                text-align: center;
                span{
                    // display: inline-block;
                    text-align: center;
                    font-size: @size14;
                    line-height: @size35;
                    //margin-left: @size35;
                    // padding-left: @size55;
                }
                .check{
                    box-sizing: border-box;
                    padding-bottom: 0.17rem;
                    border-bottom: 2px solid black;
                    color: rgb(51, 51, 51)
                }
            }
        }
        .sell-content {
            height: @size115;
            overflow: hidden;
            .sell-time {
                font-size:18px;
                margin-top: 0.74rem;
                padding-left: 20px;
                font-weight: bold;
                text-align: left;
                width: 100%;
                height: 0.65rem;
                box-sizing: border-box;
            }
            .sell-title {
                width:100%;
                font-size: 12px;
                text-align: left;
                padding-left: 20px;
                box-sizing: border-box;
            }
            .sell-information {
                width:100%;
                padding-top: 10px;
                text-align: left;
                box-sizing: border-box;
                overflow: hidden;
                .over{
                    font-size:12px;
                    text-decoration: underline;
                    color:#333;
                    padding-left: 20px;
                }
                a {
                    font-size:12px;
                    text-decoration: underline;
                    color:#F0946A;
                    padding-left: 20px;
                }
                .pos2 {
                    float:right;
                    font-size: 12px;
                    color: #A9AEB6;
                    margin-right:0.2rem;
                    line-height: 0.4rem;
                    .pos2img{
                        width:0.45rem;
                        float:left;
                        margin-right: 0.1rem;
                        margin-top: -0.01rem;
                    }
                    .sellicon2{
                        width: 0;
                        height: 0;
                        border-left: 0.2rem solid transparent;
                        border-right: 0.2rem solid transparent;
                        border-bottom: 0.3rem solid  #A9AEB6;
                        float:left;
                        position: relative;
                        margin-right:10px;
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
                .pos1 {
                    float:right;
                    font-size: 12px;
                    color: #A9AEB6;
                    margin-right:0.4rem;
                    line-height: 0.4rem;
                    .box{
                        width: 0.25rem;
                        height: 0.25rem;
                        border: 2px solid #A9AEB6;
                        float: left;
                        margin-top: 0.01rem;
                        margin-right: 10px;
                    }
                }
            }
            .sell-warn {
                padding-top: 10px;
                font-size: @size6;
                padding-left: 20px;
                position: relative;
                .pos2 {
                    position: absolute;
                    top: 15px;
                    right: 10px;
                    font-size: @size6;
                }
                .pos1 {
                    position: absolute;
                    top: 15px;
                    right: 70px;
                    font-size: @size6;
                }
            }
        }
        .sell {
            width: 100%;
            box-sizing: border-box;
            //   background: rgb(236, 233, 233);

            .sell-picture {
                width: 100%;
                .sell-bpic {
                    width: 100%;
                    margin-bottom: @size5;
                    height: @size150;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }

                }
                .sell-hint{
                    width:100%;
                    height:2.2rem;
                    overflow: hidden;
                    .sell-box {
                        height: 2.5rem;
                        overflow: hidden;
                        overflow-x: auto;
                        .sell-spic {
                            width: -webkit-max-content;
                            width: -moz-max-content;
                            width: max-content;
                            overflow: hidden;
                            overflow-x: auto;
                            padding-left: @size5;
                            // height: @size98;
                            ul {
                                //这里宽度出问题
                                overflow: hidden;
                                width: -webkit-max-content;
                                width: -moz-max-content;
                                width: max-content;
                                float: left;
                                li {
                                    width: @size80;
                                    height: @size80;
                                    margin-right: @size5;
                                    background: gray;
                                    float: left;
                                    overflow: hidden;
                                    img {
                                        width: 2.6rem;
                                        height: @size80;
                                        margin-left:-0.3rem;
                                    }
                                }
                            }
                            .addIcon{
                                width: @size80;
                                height: @size80;
                                margin-right: @size5;
                                background:#CAD1D9;
                                float: left;
                                text-align: center;
                                color:#fff;
                                padding:0.3rem;
                                box-sizing: border-box;
                                i{
                                    font-size:40px;
                                    color:#fff;
                                    display: block;
                                }
                                span{
                                    font-size:12px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

