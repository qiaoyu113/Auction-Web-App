<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 帮助中心 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox clearfix">
                <div class='loginEn '>MY ACCOUNT</div>
                <div class="loginCn ">会员中心</div>
            </div>
            <div class="fr">...</div>
            <!--按钮-->
            <div class="menu">
                <div class='font' :class="index==1 ?'checked':''" @click="getIndex(1)">会员等级</div>
                <div class='font' :class="index==2 ?'checked':''" @click="getIndex(2)">会员规则</div>
            </div>
        </div>
        <!-- 会员等级 -->
        <div class="membox" v-if='index==1'>
            <div class="card">
                <div class="box">
                    <div class="level">VIP<br><span>会员等级</span></div>
                    <div class="point">4,000分<br><span>会员积分</span></div>
                    <div class="number">NO:000 000 000</div>
                    <div class="star">
                        <i class="iconfont icon-xianxingxing"></i>
                        <!-- <i class="iconfont icon-xianxingxing"></i> -->
                    </div>
                </div>
            </div>
            <div class="bar">
                <div class="clearfix" >
                    <div class="box fl"></div>
                    <div class="fr">VIP</div>
                </div>            
                <p class="warn">在累计6,000分即可升级</p>
            </div>
            <div class="pointDetail">
                <div class="tit">积分明细</div>
                <div class="record" v-for="list in record"  :key="list.url"  ><div class="fl">{{list.name}}</div>{{list.number}}<div class="fr">{{list.time}}</div></div>
                <!-- <div class="record"><div class="fl">拍卖成交</div> +5 <div class="fr">2018.4.44 20:11:50</div></div> --> 
            </div>
        </div>
        <!-- 会员规则 -->
        <div class="text" v-if='index==2'>
            <div class="time">更新时间：2017.11.24</div>
            <div class="box">
                <div class="tit">保证金说明</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守</p>
            </div>
            <div class="box">
                <div class="tit">1.保证金金额</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                </p>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title: '会员中心',
                index:1,
                record:[{name:'拍卖成交',number:'+5',time:'2018.04.24 20:11:50'},
                        {name:'商场消费',number:'+5',time:'2018.04.04 20:11:50'},
                        {name:'违约',number:'-10',time:'2018.04.18 20:11:50'},
                        {name:'保证金充值',number:'-10',time:'2018.12.12 20:11:50'},]
            }
        },
        components:{},
        
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
            getIndex:function(index){
                let that = this;
                if(index === 1){
                    that.index = 1;
                }else if(index==2){
                    that.index = 2;
                }
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
        width: 10rem;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    .content{
        margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid #353535;
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: bold;
                font-size:20px;
            }
            .loginCn{
                font-size: 15px;
            }
            
        }
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
        }
        .menu{
            height:0.6rem;
            line-height:0.6rem;
            position: absolute;
            bottom:1px;
            box-sizing: border-box;
            .font{
                color:rgb(153, 153, 153);
                float:left;
                box-sizing: border-box;
                padding-left: @size2;
                padding-right: @size2;
                font-size: @size10;
                margin-right: @size20;
            }
            .checked{
                color:#353535;
                border-bottom:2px solid #353535;
            }
        }
        
    }
    .text{
        padding: 0 @size20;
        .time{
            text-align: right;
            margin-top: @size40;
            font-size: @size10;
        }
        .box{
            padding-top: @size20;
            .tit{
                font-size: @size12;
            }
            .txt{
                font-size: @size11;
                color: rgb(153, 153, 153);
            }
        }
    }
    .membox{
        padding: 0 @size10;
        .card{
            margin: @size20 @size10;
            width: 8.9333rem;
            height: 4.5333rem;
            background: rgb(55, 59, 70);
            border-radius: @size5;
            .box{
                position: relative;
                width: 100%;
                height: 100%;
                .level{
                    text-align: right;
                    color: white;
                    font-weight: bold;
                    font-size: @size14;
                    span{
                        color: white;
                        font-size: @size10;
                        font-weight: lighter;
                    }
                    position: absolute;
                    right: 0.6rem;
                    top: 0.6rem;
                }
                .point{
                    text-align: right;
                    color: white;
                    font-weight: bold;
                    font-size: @size14;
                    position: absolute;
                    right: 0.6rem;
                    bottom: 0.6rem;
                    span{
                        color: white;
                        font-size: @size10;
                        font-weight: lighter;
                    }
                }
                .number{
                    font-size:@size10;
                    color: white;
                    position: absolute;
                    left: 0.6rem;
                    bottom: 0.6rem;
                }
                .star{
                    color: white;
                    position: absolute;
                    top: 0.6rem;
                    left: 0.6rem;
                    i{

                    }
                }
            }
        }
        .bar{
            padding:@size5 @size10;
            padding-bottom: @size20;
            border-bottom:1px solid rgb(153, 153, 153); 
            .box{
                float: left;
                width: @size300;
                height: @size10;
                background: gray;
                border-radius: @size10;
            }
            .fr{
                height: @size10;
                font-size: @size10;
                line-height: @size10;
            }
            .warn{
                font-size: @size10;
                text-align: left;
                line-height: @size10;
                padding-top: @size5
            }
        }
        .pointDetail{
            padding-left: @size10;
            .tit{
                height: @size40;
                text-align: left;
                font-size: @size12;
                line-height: @size40;
                
            }
            .record{
                border-top: 1px solid rgb(153, 153, 153);
                font-size: @size10;
                height: @size30;
                line-height: @size30;
                text-align: center;
                color: rgb(51, 51, 51);
                .fl{
                    width: 1.6rem;
                    text-align: left;
                }
                div{
                    font-size: @size10;
                    line-height: @size30;
                }
            }
        }
    }
</style>

