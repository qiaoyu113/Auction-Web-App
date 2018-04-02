<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="v_myaccount" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="nav">
            <span class="return fl" @click="Return()">&lt;</span> 
        </div>
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
                        <div class="exp">可用金额</div>
                        <div class="warn">可用金额才可体现和出价</div>
                    </div>
                    <div class="bor fl"></div>
                    <div class="fl">
                        <div class="sum">{{wallet!=null?wallet.frozenMoney:0 | money}} CNY</div>
                        <div class="exp">冻结金额</div>
                        <div class="warn">保证金体现未至账户时即被冻结</div>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix" style="border-bottom: 1px solid rgb(202, 209, 217);">
                    <div class="fl">保证金充值</div>
                    <div class="fr" @click="recharge()">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">保证金提现</div>
                    <div class="fr" @click="cash()">...</div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">保证金说明</div>
                    <div class="fr" @click="helpcenter()">...</div>
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
                    <div class="bor"></div>
                </div>
                <div class="listcontent clearfix"  v-for="arr1 in arr"  :key="arr1.url" @click="detailed(arr1.formId)">
                    <div class="fl">{{arr1.flowAmount | money}}</div>
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
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue"
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '传家',
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
                ]
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
            
            common.onMove('.v_myaccount')
            this.getBails()
            this.getUsers()

        },
        methods: {
            Return:function(){
              this.$router.push({path:"/personalCenter"})  
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
                this.$router.push({path:"/cash"})
            },
            helpcenter:function(){ 
                this.$router.push({path:"/helpcenter",query:{index:4}})
            },
            getBails:function(){
                let that = this;
               commonService.getBails({pageNo:1,pageSize:30}).then(function(res){
                
                    that.arr=res.data.datas.datas
                    
              })
            },
             getUsers:function(){
                let that = this;
               commonService.getUsers().then(function(res){
                    that.wallet=res.data.datas.user.wallet
              })
            },
            
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .v_myaccount{
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: auto;
          height: auto;
            overflow-x: scroll;
    //  .header{
    //       position: fixed;
    //        top: 0;
    //     z-index: 100;
    //     width: @size375;
    //     height: @size45;
    //     background:rgba(2, 10, 2, 1);
    //     font-size: @size20;
    //     color: white;
    //     text-align: center;
    //     line-height: @size45;
    // }
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        
        .return{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: @size20;
        }
        
    }
    .content{
     
        margin-bottom: 1.2rem;
        padding:0 @size10;
        .account{
            box-sizing: border-box;
            .item{
                // border-bottom: 1px solid rgb(129, 135, 140);
                padding-top: @size10;
                text-align: center;
                .boxx{
                    height: @size98;
                    width:9.466rem;
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
                width: 100%;
                border-bottom: 1px solid rgb(51, 51, 51);
                box-sizing: border-box;
                position: relative;
                .fl{
                    width: 50%;
                    text-align: center;
                    .sum{
                        padding-top: @size15;
                        font-size:@size14;
                        font-weight: bold;
                        color: gray;
                    }
                    .exp{
                        font-size: @size10;
                    }
                    .warn{
                        font-size: @size10;
                        color: rgb(153, 153, 153);
                    }
                    .bgcol{
                        color: rgb(92, 182, 169);
                    }
                }
                .bor{
                    border-left: 1px solid rgb(153, 153, 153);
                    height: 1.8666rem;
                    position: absolute;
                    left:4.65rem ;
                    top: @size15;
                }
            }
        }
        .center{
                border-bottom: 1px solid black;
                box-sizing: border-box;
                .address{
                    // box-sizing: border-box;
                    height: @size35;
                    // border-bottom: 1px solid rgb(202, 209, 217);
                    margin-left: @size10;
                    .fl{
                        font-size: @size12;
                        line-height: @size35;
                    }
                    .fr{
                        letter-spacing: @size3;
                        font-weight: bold;  
                        padding-right: @size10;
                    }
                }
        }
        .cashDetail{
            box-sizing: border-box;
            .address{
                // box-sizing: border-box;
                height: @size35;
                margin-left: @size10;
                .fl{
                    font-size: @size12;
                    line-height: @size35;
                }
            }
            .listcontent{
                height: @size30;
                text-align: center;
                .fl{
                    width: 20%;
                    text-align: center;
                    font-size: @size10;
                    line-height: @size30;
                }
                .f2{
                    float: left;
                    width: 20%;
                    font-size: @size10;
                    line-height: @size30;

                }
                .f3{
                    float: left;
                    width: 35%;
                    font-size: @size10;
                    line-height: @size30;
                }
                .f4{
                    float: left;
                    width: 25%;
                    font-size: @size10;
                    line-height: @size30;
                    i{
                        font-size: @size10;
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

    }
</style>

