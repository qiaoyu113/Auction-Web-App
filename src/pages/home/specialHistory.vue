<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-即将开始 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
                <span class="">正在进行</span><span class="">即将开始</span><span class="check">历史记录</span>
        </div>
        <div class="container">
            
            <div class="sell">
                <div class="sell-content">
                    <div class="sell-time">150,000CNY</div>
                    <div class="sell-title">器物拍卖专场</div>
                    <div class="sell-warn">成交数量：30
                        <span class="iconfont icon-shangcheng pos1"> 50</span>
                        <span class="iconfont icon-qunzu pos2"> 20000</span>
                    </div>
                </div>
                <div class="sell-picture">
                    <div class="sell-bpic">
                        <i><a href="www.baidu.com">END</a></i>
                        <i class="iconfont icon-xing pos"><a href="#"></a></i>
                        
                    </div>
                    <div class="sell-spic">
                        <ul class="clearfix">
                            <li class="fl"></li>
                            <li class="fl"></li> 
                            <li class="fl"></li>
                            <li class="fl"></li>
                            <li class="fl"></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div class="sell">
                <div class="sell-content">
                    <div class="sell-time">150,000CNY</div>
                    <div class="sell-title">器物拍卖专场</div>
                    <div class="sell-warn">成交数量：50
                        <span class="iconfont icon-shangcheng pos1"> 50</span>
                        <span class="iconfont icon-qunzu pos2"> 20000</span>
                    </div>
                </div>
                <div class="sell-picture">
                    <div class="sell-bpic">
                        <i><a href="www.baidu.com">END</a></i>
                    </div>
                    <div class="sell-spic">
                        <ul class="clearfix">
                            <li class="fl"></li>
                            <li class="fl"></li> 
                            <li class="fl"></li>
                            <li class="fl"></li>
                            <li class="fl"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    // import {  } from "../../component/";
    export default {
        data () {
            return {
                title: '茶叶拍卖',
                list:[]
            }
        },
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

    // Vue.component('my-title',{
    //     template:'<h1>CHUANJIA SPECIAL</h1>'+
    //             '<div>传家标题</div>'+
    //             '<div class="time">2017.10.15 17:00</div>'+
    //             '<i><a href="/src/pages/home/home.vue">MORE</a></i>'

    // })
    // new Vue({
    //     el:'#special'
    // })
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
    .sell{
        width: @size375;
        background: rgb(236, 233, 233);
        // margin-top: @size35;
        .sell-content{
            height: @size115;
            .sell-time{
                padding-top: 33px;
                padding-left: 20px;
            }
            .sell-title{
                font-size: @size14;
                padding-left: 20px;
            }
            
            .sell-warn{
                padding-top:10px; 
                font-size: @size6;
                padding-left: 20px;
                position: relative;
                .pos2{
                    position: absolute;
                    top: 15px;
                    right: 10px;
                    font-size: @size6;
                }
                .pos1{
                    position: absolute;
                    top: 15px;
                    right: 70px;
                    font-size: @size6;
                }
            }
        }

        .sell-picture{
            width: @size375;
            
            
            .sell-bpic{
                margin-bottom: @size5;
                height: @size162;
                background:rgb(234, 224, 235);
                position: relative;
                i{
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding-right: 3px;
                    padding-left:3px;    
                    background: gray;
                    a{
                        color: white;
                        font-size:@size10;
                    }
                }
                .pos{
                    font-size:@size10;
                    padding: 2px;
                    position: absolute;
                    top: 0px;
                    right: 32px;
                    background: black;
                    color: yellow;
                }
            }
            .sell-spic{
                width:@size375 ;
                // height: @size98;
                ul{
                    //这里宽度出问题
                    width: 600px;
                    li{
                        width:@size80;
                        height: @size80;
                        margin-left:@size5;
                        background: gray; 
                    }

                }
            }
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

