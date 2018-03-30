<template>
    <div id="notatarts">
        <div id="mescroll" class="mescroll notatarts">
            <div class="mescroll-bounce">
                <div class="notstart">
                    <div class="box">
                        <div class="ros clearfix" v-for="(list,index) in myList" @click="Router(list.auction._id)">
                            <div class="ros_l">
                                <div class="ros_l2">{{reversedNum(list.auction.basePrice/100)}} CNY</div>
                                <div class="ros_l3">{{list.auction.title}}</div>
                                <div class="ros_l4">LOT-{{list.auction.completeNo}}</div>
                            </div>
                            <!-- <img src="../../assets/image/error/ufo_blue_2x.png"/> -->
                            <div class="ros_r">
                                <img :src="picHead + list.auction.picItems[0]"/>
                                <div class="date">
                                    <!--收藏图标-->
                                    <div class="collect">
                                        <!--<div class="collectIcon">-->
                                            <!--<div class="bottom"></div>-->
                                        <!--</div>-->
                                        <img class="conImg" src="../../assets/image/mycenter/collectIcon.png" />
                                    </div>
                                    <!--预展中-->
                                    <div class="collect3">
                                        <div class="icon"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ros_con">
                                <p>{{list.EndTimes}}</p>
                                <p><span>即将开始</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<z-footer ></z-footer>-->
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
                myList:[

                ],
                // 计算
                reversedNum: function (num) {
                    return common.format_number(num)
                },
                countdown:[],
                page:{num:1,size:6},
                isShowNoMore:false,
                totalPage:'',
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
        },
        methods: {
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
                commonService.getCollect({pageNo:pageNum,pageSize:pageSize,status:0}).then(function(res){
                    if(res.data.code === 200){
                        let boxlist = res.data.datas.datas;
                        that.totalPage = res.data.datas.totalPage;
                        for(let i=0;i<boxlist.length;i++){
                            let now = new Date().getTime()
                            let time = '';
                            time = boxlist[i].auction.auctionStartTime - now;
                            //初始化时间
                            let day = parseInt(time / 1000 / 60 / 60 / 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24, 10) : parseInt(time / 1000 / 60 / 60 / 24, 10);
                            let h = parseInt(time / 1000 / 60 / 60 % 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 % 24, 10) : parseInt(time / 1000 / 60 / 60 % 24, 10);
                            let m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                            let s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                            boxlist[i].EndTimes = day + ':' + h + ':' + m + ':' + s;
                            let timeRun = setInterval(function() {
                                let now = new Date().getTime()
                                time = boxlist[i].auction.auctionStartTime - now;
                                //初始化时间
                                let day = parseInt(time / 1000 / 60 / 60 / 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 / 24, 10) : parseInt(time / 1000 / 60 / 60 / 24, 10);
                                let h = parseInt(time / 1000 / 60 / 60 % 24, 10) < 10 ? '0' + parseInt(time / 1000 / 60 / 60 % 24, 10) : parseInt(time / 1000 / 60 / 60 % 24, 10);
                                let m = parseInt(time / 1000 / 60 % 60, 10) < 10 ? '0' + parseInt(time / 1000 / 60 % 60, 10) : parseInt(time / 1000 / 60 % 60, 10);
                                let s = parseInt(time / 1000 % 60, 10) < 10 ? '0' + parseInt(time / 1000 % 60, 10) : parseInt(time / 1000 % 60, 10);
                                boxlist[i].EndTimes = day + ':' + h + ':' + m + ':' + s;
                                if(time < 0){
                                    clearInterval(timeRun);
                                    that.day = '00'
                                    that.h = '00'
                                    that.m = '00'
                                    that.s = '00'
                                    that.meScroll()
                                }
                            },1000)
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
                overscroll(document.querySelector('.notatarts'));
                document.body.addEventListener('touchmove', function(evt) {
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            Router:function(id){
                this.$router.push({name:'auctionMore',params:{id:id}})
            },
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url("../../assets/css/common/mescroll.min.css");
    #notatarts{
        overflow: hidden;
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
        .notstart{
            /*position: fixed;*/
            /*left: 0;*/
            /*right: 0;*/
            /*<!--top: @size41;-->*/
            /*overflow-x: scroll;*/
            /*bottom: 1.2rem;*/
            .box{
                padding: @size10 @size20;
                .ros{
                    position: relative;
                    margin-top: @size5;
                }
                .ros_l{
                    float: left;
                    margin-top: 0.7333rem;
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
                            font-size: 10px;
                            line-height: @size16;
                            color: #4D4D4D;
                            font-weight:400;
                        }

                    }
                }
            }
        }
    }
</style>

