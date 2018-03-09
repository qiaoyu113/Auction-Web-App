<template>
    <div id="home" class="home" v-set-title="title">
        <div class="header">传家</div>
        <div id="mescroll" class="mescroll homeMescroll">
            <div class="mescroll-bounce">
                <div class="wrapper">
                    <div class="content" v-for="list in homelist">
                        <home-item :str="list"></home-item>
                    </div>
                </div>
            </div>
        </div>
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
                title: '茶叶拍卖',
                page:{num:1,size:4},
                homelist:[],
                totalPage:'1',
                isShowNoMore:false,
            }
        },
        components:{'home-item':itemc},
        mounted: function() {
            let that = this;
//            that.onMove();
            that.meScroll();
        },
        methods: {
            checked(index){
                let that = this;
                console.log(index)
//                console.log(that.$route.name);
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
                    console.log(that.homelist)
                    // 加载完成后busy为false，如果最后一页则lastpage为true
                    //          加载完成后给页数+1
                    console.log(that.page.num )
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
                    console.log(res)
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
                    console.log(res)
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
        top:1.2rem;
        bottom: 1.2rem;
        left:0;
        right:0;
        margin:auto;
        height:auto;
    }
</style>

