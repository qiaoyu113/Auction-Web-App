<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-即将开始 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="container">
            <div class="nav">
                <span class="check">正在进行</span><span class="">即将开始</span><span>历史记录</span>
            </div>
            
            <div v-for="list in specialContent" :key="list.id">
                    <special-content :str="list"></special-content>
            </div>
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import specialCont from "../../component/special/specialContent.vue";
    // import {  } from "../../component/";
    export default {
        data () {
            return {
                title: '茶叶拍卖',
                specialContent:[
                    {
                        flag:true,
                        timeOrMoney:"00:00:00:00",
                        title:"器物拍卖专场v",
                        warn:"拍卖已开始，快去捡漏吧",
                        url:"http://www.baidu.com",
                        collect:50,
                        people:20000,
                    },{
                        flag:true,
                        timeOrMoney:"150,000CNY",
                        title:"器物拍卖专场c",
                        warn:"2017.09.01 9:00开始",
                        url:"http://www.baidu.com",
                        collect:20,
                        people:30000,
                    }
                ]
            }
        },
        components:{'special-content':specialCont},
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
        margin-bottom: 1.334rem;
    }
    .nav{
        width: @size375;
        height: @size35;
        border-bottom: 1px solid rgb(185, 186, 187);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        span{
            display: inline-block;
            line-height: @size35;
            text-align: center;
            font-size: @size14;
            color: rgb(162, 162, 162);
            width: 33.3%;
            
            
        }
        .check{
            border-bottom: 4px solid black;
            // width: ;
        }
        
    }
    
    .footer{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
        background: rgb(249,248,243);
        ul{
            li{
                width: 25%;
                height: 1.2rem;
                text-align: center;
                line-height: 1.2rem;
                i{
                    font-size: @size25;
                    color:rgb(217, 217, 217);
                    border: none;
                }
            }
            .check{
                color: black;
            }
        }
    }
</style>

