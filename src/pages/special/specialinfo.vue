<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-即将开始 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
            <span class="">&lt;</span> 
            <span class="span1">c</span>
            <span class="span2">d</span>
        </div>
        
        <div class="container">
            <div class="titleEn">CHUANJIA SPECIAL</div>
            <div class="titleCh">传家专题</div>
            <div class="speTime">2017.10.15 17:00</div>
            <div class="speCont">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行
            </div>
            <div class="spePic">
                <img src="../../assets/image/myimage/eg.gif" alt="">
                <div class="picTit">器物拍卖专场</div>
            </div>
            <div class="spePic">
                <img src="../../assets/image/myimage/eg.gif" alt="">
                <div class="picTit">器物拍卖专场</div>
            </div>
            <div class="speCont">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行
            </div>
            <div class="recommend">RECOMMEND</div>
            <div class="recoCh">拍品推荐</div>
            <div class="sell-more clearfix">
                <div v-for="list in specialist" :key="list.url">
                    <special-more :str="list"></special-more>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import specialmore from "../../component/special/specialmore.vue";
    export default {
       
        data () {
            return {
                title: '专题详情',
                specialist:[
                    {
                        collected:false,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                    {
                        collected:true,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                    {
                        collected:true,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                ],
            }
        },
        components:{'special-more':specialmore},
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
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 1px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        span{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: 20px;
            
            
        }
        .span1{
            float: right;
            padding-right: 20px;
        }
        .span2{
            float: right;
            padding-right: 20px;
        }
    }
     .container{
        margin-top: @size75;
        margin-bottom: 1.334rem;
        text-align: center;
        box-sizing: border-box;
        .titleEn{
            font-size: 14px;
            font-weight: bold;
            padding-top: @size30;
        }
        .titleCh{
            font-size: 12px;
            line-height: 25px;
            color: rgb(51, 51, 51);
        }
        .speTime{
            font-size: 9px;
            padding-top: @size15;
            color: rgb(51, 51, 51);
        }
        .speCont{
            padding: @size20 @size20 @size15 @size20;
            text-align: left;
            font-size: 12px;
            line-height: 25px;
            color: rgb(51, 51, 51);
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
        }
        .recoCh{
            font-size: 10px;
            padding-bottom: @size10;
        }
    }
</style>

