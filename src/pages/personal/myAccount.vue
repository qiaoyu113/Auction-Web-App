<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 个人中心-我的订单 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
            <span class="return fl">&lt;</span> 
        </div>
        <div class="content">
            <div class="account">
                <div class="item">
                    <div class="boxx">
                        <div class="money">50,000CNY</div>
                        <div class="text">保证金总额</div>
                    </div>
                </div>
                <div class="box clearfix ">
                    <div class="fl">
                        <div class="sum bgcol">40,000 CNY</div>
                        <div class="exp">可用金额</div>
                        <div class="warn">可用金额才可体现和出价</div>
                    </div>
                    <div class="bor fl"></div>
                    <div class="fl">
                        <div class="sum">10,000 CNY</div>
                        <div class="exp">冻结金额</div>
                        <div class="warn">保证金体现未至账户时即被冻结</div>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">保证金充值</div>
                    <div class="fr">...</div>
                </div>
                <div class="address  clearfix">
                    <div class="fl">保证金提现</div>
                    <div class="fr">...</div>
                </div>
            </div>
            <div class="center">
                <div class="address  clearfix">
                    <div class="fl">保证金说明</div>
                    <div class="fr">...</div>
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
                <div class="listcontent clearfix"  v-for="arr1 in arr"  :key="arr1.url">
                    <div class="fl">{{arr1.money}}</div>
                    <div class="f2">{{arr1.reason}}</div>
                    <div class="f3">{{arr1.time}}</div>
                    <div class="f4 line">{{arr1.state}}</div>
                    <div class="bor"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue";
    export default {
        data () {
            return {
                title: '个人中心',
                arr:[
                    {money:'500,000CNY',
                    reason:'提现解冻',
                    time:'2018.04.01 22:11:11',
                    state:'冻解成功>'},
                     {money:'600,000CNY',
                    reason:'提现',
                    time:'2018.04.01 22:11:11',
                    state:'提现成功>'},
                    {money:'600,000CNY',
                    reason:'线下充值',
                    time:'2018.04.01 22:11:11',
                    state:'充值成功>'},
                ]
            }
        },
        components:{'home-item':itemc},
        syncData({store}) {
            /*基本规则
            * 所有不需要token的请求都放在这里
            * 这里不出现window，document等DOM元素
            * 这里获得的数据都要存储在store中
            * 写法如下
            * */
            const that = this;
            /*
            * 将所有的请求处理以数组放在promise中
            * that.data().data调用数据
            * */
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

        },
        methods: {
            getPos:function(index) {
                var str = 95*(index)+'px';
                str='left:'+str;
                return str;
            },
            
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    
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
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 0.5px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
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
        margin-top: @size80;
        margin-bottom: 1.2rem;
        padding:0 @size10;
        .account{
            box-sizing: border-box;
            .item{
                border-bottom: 1px solid rgb(129, 135, 140);
                padding-top: @size10;
                text-align: center;
                .boxx{
                    height: @size98;
                    width:9.466rem;
                    background: blue;
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
                    border-bottom: 1px solid rgb(202, 209, 217);
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
                    width: 25%;
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
                    width: 20%;
                    font-size: @size10;
                    line-height: @size30;
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
    
</style>

