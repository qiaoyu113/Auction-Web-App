<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 拍品详情 -->
    <div class="" id="" v-set-title="title">
        <div class="header">传家</div>
        <z-nav></z-nav>
        <div class="container">
            <div class="sell-list">
                <div class="sell-pic">
                    <img src="../../assets/image/myimage/pic.png" alt="" srcset="">
                </div>
                <div class="sell-information">
                    <span class="iconfont icon-qunzu pos2"> 200000</span>
                </div> 
                <div class='sell-content'>
                    <div class="sell-int">
                        <div class="intrEn">INTROUDCE</div>
                        <div class="intrCh">拍品名称</div>
                        <div class="prove">
                            <i class="iconfont icon-duigoudunpai"></i>&nbsp;质量认证
                            <i class="iconfont icon-duigoudunpai"></i>&nbsp;作者认证
                            <i class="iconfont icon-duigoudunpai"></i>&nbsp;专家认证
                        </div>
                        <div class="info">
                            编号：20170827-076<br/>
                            作者：某某某<br/>
                            器行：器行<br/>
                            材质：陶瓷<br/>
                            尺寸：80x90x20mm
                        </div>
                    </div>
                    <div class="sell-inf">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行
                    </div>
                    <div class="pic-list">
                        <img src="../../assets/image/myimage/pic.png" alt="" srcset="">
                        <img src="../../assets/image/myimage/pic.png" alt="" srcset="">
                    </div>
                    <div class="sell-inf">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行
                    </div>
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
            <!-- 本场其他 -->
            <div class="sell-more clearfix">
                <div v-for="list in specialist" :key="list.url">
                    <special-more :str="list"></special-more>
                </div>
            </div>
        </div>
        <!-- 出价记录 -->
        <z-record></z-record>
        <!-- 彩色信息条 -->
        <z-info></z-info>
        <!-- 底部竞拍栏 -->
        <z-foot></z-foot>
        <!-- 保证金充值弹窗 -->
        <z-payment></z-payment>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import specialmore from "../../component/special/specialmore.vue";
    import item from "../../component/auction/item.vue"
    import info from "../../component/auction/info.vue"
    import record from "../../component/auction/record.vue"
    import payment from '../../component/auction/payment.vue'
    export default {
        data () {
            return {
                title: '专场详情-拍场详情',
                index:1,
                timemoney:"00:57:00:00",
                title:"器物拍卖专场",
                time:"2017.10.15 23:00",
                startTime:'2017.12.17 17：00',
                endTime:'2017.12.18 18：00',
                specialist:[
                    {
                        index:1,
                        collected:false,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                    {
                        index:1,
                        collected:true,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                ],
            }
        },
        components:{'special-more':specialmore,'z-foot':item,'z-info':info,'z-record':record,'z-payment':payment},
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
            
        }
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
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
        margin-bottom: @size45;
    }
    .sell-list{
        .sell-pic{
            height: @size162;
            background: gray;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .sell-information {
            padding-top: 10px;
            position: relative;
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
        }
        .sell-content{
            box-sizing: border-box;
            margin-top: @size10;
            padding: @size10;
            .sell-int{
                div{
                    text-align: center;
                    padding: @size10;
                }
                .intrEn{
                    font-size: 13px;
                    letter-spacing: 2px;
                    padding: @size10;
                }
                .intrCh{
                    font-size: 10px;
                    padding-top: @size2;
                    color:rgb(133, 133, 133);
                    padding: @size10;
                }
                .prove{
                    font-size: 8px;
                    padding-top: @size20;
                    padding-bottom: @size25;
                    color:rgb(133, 133, 133);
                    padding: @size10;
                    i{
                        color: rgb(0, 184, 176)
                    }
                }
                .info{
                    font-size: 8px;
                    text-align: left;
                    padding: @size10;
                }
            }
            .sell-inf{
                margin-top: @size20;
                font-size: 11px;
                line-height: @size24;
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
    }
    
    
</style>