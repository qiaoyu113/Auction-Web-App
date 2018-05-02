<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="v_myaccount" v-set-title="title">
       
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="return fl" @click="Return()">
                <i class="iconfont icon-fanhui"></i>
            </span>
        </div>
        <div id="myorder-center">
          <div id="mescroll" class="mescroll alreadys">
        <div class="mescroll-bounce">
        <div class="content">
       
            <div class="account">
                <div class="item">
                    <div class="boxx">
                        <div class="money">{{wallet!=null?wallet.totalMoney:0 | money}}CNY</div>
                        <div class="text">保证金总额</div>
                    </div>
                </div>
                <div class="box clearfix ">
                    <div class="fl">
                        <div class="sum bgcol">{{wallet!=null?wallet.availableMoney:0 | money}} CNY</div>
                        <div class="exp">保证金可用金额</div>
                        <div class="warn">可用于提现和出价</div>
                    </div>
                    <div class="bor fl"></div>
                    <div class="fl">
                        <div class="sum">{{wallet!=null?wallet.frozenMoney:0 | money}} CNY</div>
                        <div class="exp">保证金冻结金额</div>
                        <div class="warn">冻结保证金不可用于提现和出价</div>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix" style="border-bottom: 1px solid rgb(202, 209, 217);">
                    <div class="fl">保证金充值</div>
                    <div class="fr" @click="recharge()"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">保证金提现</div>
                    <div class="fr" @click="cash()"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">保证金说明</div>
                    <div class="fr" @click="helpcenter()"><img src="../../../src/assets/image/mycenter/more.png"/></div>
                </div>
            </div>
            <div class="cashDetail">
                <div class="address  clearfix">
                    <div class="fl">保证金明细</div>
                </div>
                <div class="listcontent clearfix">
                    <div class="fl">金额</div>
                    <div class="f2">原因</div>
                    <div class="f3">时间</div>
                    <div class="f4">状态</div>
                    <!-- <div class="bor"></div> -->
                </div>
                <div class="listcontent clearfix"  v-for="arr1 in myList"  :key="arr1.url" @click="detailed(arr1.formId)">
                    <div class="fl">{{arr1.flowAmount | money}}CNY</div>
                   <!--  <div class="f2 line" v-if="arr1.flowStatus==10">充值</div>
                    <div class="f2 line" v-if="arr1.flowStatus==11">参拍冻结</div>
                    <div class="f2 line" v-if="arr1.flowStatus==20">充值</div>
                    <div class="f2 line" v-if="arr1.flowStatus==21">充值</div>
                    <div class="f2 line" v-if="arr1.flowStatus==22">充值</div>
                    <div class="f2 line" v-if="arr1.flowStatus==23">充值</div>
                    <div class="f2 line" v-if="arr1.flowStatus==30">参拍冻结</div>
                    <div class="f2 line" v-if="arr1.flowStatus==31">参拍解冻</div>
                    <div class="f2 line" v-if="arr1.flowStatus==32">违约扣除</div>
                    <div class="f2 line" v-if="arr1.flowStatus==40">提现冻结</div>
                    <div class="f2 line" v-if="arr1.flowStatus==41">提现扣除</div>
                    <div class="f2 line" v-if="arr1.flowStatus==42">提现</div>
                    <div class="f2 line" v-if="arr1.flowStatus==50">提现冻结</div>
                    <div class="f2 line" v-if="arr1.flowStatus==51">提现扣除</div>
                    <div class="f2 line" v-if="arr1.flowStatus==52">提现冻结</div>
                    <div class="f2 line" v-if="arr1.flowStatus==53">提现解冻</div> -->
                    <div class="f2">{{arr1.title}}</div>
                    <div class="f3">{{arr1.createTime | stampFormate2}}</div>
                    <div class="f4 line" v-if="arr1.flowStatus==10">充值成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==11">冻结成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==20">充值中<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==21">充值成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==22">充值中<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==23">交易关闭<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==30">冻结成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==31">解冻成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==32">扣除成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==40">提现中<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==41">提现成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==42">交易关闭<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==50">提现中<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==51">提现成功<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==52">提现中<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    <div class="f4 line" v-if="arr1.flowStatus==53">交易关闭<i class="el-icon-arrow-right" v-if="arr1.formId!=null"></i></div>
                    
                </div>
            </div>
        </div>

       
        </div>
        </div>
        </div>
                   <div class="v_modaltou" ref="v_modaltou" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="remrealname()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">PROMPT</p>

                 <p>提示</p>
                 <p  class="v_box_img">请先实名认证</p>
                 <!-- <div><img src="../../assets/image/mycenter/scy.png" /></div> -->
                 <div class="v_button" @click='realname()'> 
                     去认证
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
    </div>
</template>

<script >
     import MeScroll from 'mescroll'
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue"

    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'

    export default {
        data () {
            return {
                title: '茗探',
                wallet:'',
                arr:[
                    // {money:'500,000CNY',
                    // reason:'提现解冻',
                    // time:'2018.04.01 22:11:11',
                    // state:'冻解成功>'},
                    //  {money:'600,000CNY',
                    // reason:'提现',
                    // time:'2018.04.01 22:11:11',
                    // state:'提现成功>'},
                    // {money:'600,000CNY',
                    // reason:'线下充值',
                    // time:'2018.04.01 22:11:11',
                    // state:'充值成功>'},
                ],
                ServiceBox:false,
                totalPage:'',
                myList:[

                ],
                 page:{num:1,size:30},
                isShowNoMore:false,
                list:'',
                v_modal:false,
            }
        },
        components:{'home-item':itemc},
        syncData({store}) {
            const that = this;
            return Promise.all([
                appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
                }),
                service.getParam().then(res=>{
//                    store.state.homeStore.noticelist = res.data.datas;
                }),
            ])
        },
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
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */ 
            
            // common.onMove('#mescroll')
            this.onMove()
            // this.getBails()
            this.getUsers()
            this.meScroll()
            this.getUsersss()

        },
        methods: {
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
            Return:function(){
              this.$router.push({path:"/personalCenter"})  
            },
            remrealname:function(){
             this.v_modal=false
            },
            //去认证 
             realname:function(){
                this.$router.push({name:'realname'})
            },
            detailed:function(id){
           
                // return false
                if(id!=null&&id!=undefined){
                   this.$router.push({path:"/detailed",query:{id:id}})  
                }
              
            },
            getPos:function(index) {
                var str = 95*(index)+'px';
                str='left:'+str;
                return str;
            },
            recharge:function(){
                this.$router.push({path:"/recharge"})
            },
             cash:function(){
                 console.log(this.list)
                 if(this.list.realNameStatus==2){
                    this.$router.push({path:"/cash"})
                }else{
                    this.v_modal=true
                }
            },
            helpcenter:function(){ 
                this.$router.push({path:"/helpcenter",query:{index:4}})
            },
               // 获取个人信息
            getUsersss:function(){
                let that = this;
                  commonService.getUsers().then(function(res){
                    if(res.data.code==200){
                      that.list=res.data.datas.user
                    }

                 }) 
            },
            //获取保证金明细
            getBails:function(){
                let that = this;
               commonService.getBails({pageNo:1,pageSize:30}).then(function(res){

                    that.arr=res.data.datas.datas
                    
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
               commonService.getBails({pageNo:pageNum,pageSize:pageSize}).then(function(res){
                    if(res.data.code === 200){
                        let boxlist = res.data.datas.datas;
                        that.totalPage = res.data.datas.totalPage;
                      
                        successCallback&&successCallback(boxlist);//成功回调
                    }else{
                        let boxlist = [];
                        successCallback&&successCallback(boxlist);//成功回调
                    }
                })
            },

             getUsers:function(){
                let that = this;
               commonService.getUsers().then(function(res){
                    that.wallet=res.data.datas.user.wallet
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
                overscroll(document.querySelector('#mescroll'));
                document.body.addEventListener('touchmove', function(evt) {
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
    .v_myaccount{
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

    .nav{

        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;

        .return{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: 0.3rem;
            i{
                font-size:28px;
                color:#A9AEB6;
                line-height: @size35;
            }
        }
        
    }
      #mescroll{
            width:9.6rem;
            max-width:10rem;
            position: fixed;
            top:  @size36;
            bottom:0rem;
            left:0rem;
            right:0rem;
            margin:auto;
            height:inherit;
            overflow: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
        }
    .content{
            // width:9.6rem;
            // max-width:10rem;
            // position: fixed;
            // top: @size36;
            // bottom:0;
            // left:0.2rem;
            // right:0.2rem;
            // overflow-y: scroll;
            // -webkit-overflow-scrolling:touch;
            // padding: 0 0.2rem;
        .account{
            box-sizing: border-box;

            .item{
                // border-bottom: 1px solid rgb(129, 135, 140);
                // padding-top: @size10;
                text-align: center;
                .boxx{
                    height: @size98;
                    // width: 100%;
                    background-image:url('../../assets/image/mycenter/suiyuan.png');
                    background-size: 100% 100%;
                    margin-top: @size10;
                    .money{
                        font-weight: bold;
                        color: white;
                        font-size: @size20;
                        padding-top: @size25;
                    }
                    .text{
                        font-size: @size10;
                        line-height: @size10;
                        color: white;
                    }
                }
                
            }
            .box{
                height:@size98;
                width: 9.6rem;
                border-bottom: 1px solid rgb(130, 135, 140);
                box-sizing: border-box;
                position: relative;
                .fl{
                    width: 50%;
                    text-align: center;
                    .sum{
                        padding-top: @size15;
                        font-size:14px;
                        font-weight: bold;
                        color: gray;
                    }
                    .exp{
                        font-size: 10px;
                        color: rgb(51, 51, 51);
                    }
                    .warn{
                        font-size: 10px;
                        color: rgb(153, 153, 153);
                    }
                    .bgcol{
                        color: rgb(92, 182, 169);
                    }
                }
                .bor{
                    border-left: 1px solid rgb(202, 209, 217);
                    height: 1.8666rem;
                    position: absolute;
                    right:0;
                    top: @size15;
                }
            }
        }
        .center{
                border-bottom: 1px solid rgb(130, 135, 140);
                box-sizing: border-box;
                .address{
                    // box-sizing: border-box;
                    height: @size35;
                    // border-bottom: 1px solid rgb(202, 209, 217);
                    margin-left: @size10;
                    .fl{
                        font-size: 12px;
                        line-height: @size35;
                        color: rgb(51, 51, 51);
                    }
                    .fr{
                        letter-spacing: @size3;
                        font-weight: bold;  
                        padding-right: @size10;
                        img{
                        width: 0.5rem;
                        margin-top: @size16;
                    }
                    }
                }
        }
        .cashDetail{
             height: 500px;
            // box-sizing: border-box;
            .address{
                // box-sizing: border-box;
                height: @size35;
                margin-left: @size10;
                border-bottom: 1px solid rgb(202, 209, 217);
                width: 9.4rem;
                // margin-left: 0.2rem;
                .fl{
                    font-size: 12px;
                    line-height: @size35;
                    color: rgb(51, 51, 51);
                }
            }
            .listcontent{
                height: @size30;
                text-align: center;
                border-bottom: 1px solid rgb(202, 209, 217);
                width: 9.4rem;
                margin-left: 0.2rem;
                .fl{
                    width: 20%;
                    text-align: center;
                    font-size: 10px;
                    line-height: @size30;
                    color: rgb(51, 51, 51);
                }
                .f2{
                    float: left;
                    width: 20%;
                    font-size: 10px;
                    line-height: @size30;
                    color: rgb(51, 51, 51);

                }
                .f3{
                    float: left;
                    width: 35%;
                    font-size: 10px;
                    line-height: @size30;
                    color: rgb(51, 51, 51);
                }
                .f4{
                    float: left;
                    width: 25%;
                    font-size: 10px;
                    line-height: @size30;
                    color: rgb(51, 51, 51);
                    i{
                        font-size: 10px;
                    }
                }
                .line{
                    text-decoration: underline;
                }
                .bor{
                    border-bottom: 1px solid rgb(202, 209, 217);
                    margin-left: @size10;
                }
            }
        }
    }
     .v_modaltou{
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background: rgba(0,0,0,0.5);
         
          
          .v_box{
            width: 6.5rem;
            height: 6.6rem;
            background: #fff;
            margin: 4rem auto 0; 
            position: relative;
            .v_box_top{
                 position: absolute;
                 right: 0;
                 top: 0;
                 width: @size30;
                 height: @size30;
                 background: #eb6100;
                 i{
                    font-size: @size30;
                    color:#fff;
                 }
            }
            .v_box_p{
                 padding-top: @size50;
                 font-size: 14px;
                 color: rgb(57, 57, 57);
                 font-weight: 700;
            }
            .v_box_img{
                 margin:@size24 0 @size14; 
                 width: 100%;
                 img{
                    width: @size40;
                    height: @size40;
                    margin-left: 2.72rem;
                 }
            }
            p{
                font-size: 14px;
                text-align: center;
                color: rgb(98, 98, 98);
                // padding:1rem 0.5rem;
                
            }
            .v_button{
               position: absolute;
               bottom: 0;
               left: 0;
               height: @size44;
               width: 100%;
               border-top:1px solid #353c47;
               text-align: center;
               line-height: @size44;
               font-size: 14px;
             }
          }
    }

    }
</style>

