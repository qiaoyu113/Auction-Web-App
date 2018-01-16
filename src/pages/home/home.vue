<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 茶叶拍卖前台 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div id='' class="special">
                <h1>CHUANJIA SPECIAL</h1>
                <div>传家标题</div>
                <div class="time">2017.10.15 17:00</div>
                <i><a :href='url'>MORE</a></i>
            </div>
            <div id='special' class="special">
                <!-- <my-title></my-title> -->
            </div>
        </div>
        
        <div class="footer">
            <ul class="clearfix">
                <li class="fl"><i class="iconfont icon-shouyetianchong  check"></i></li>
                <li class="fl"><i class="iconfont icon-xiaochuizi"></i></li>
                <li class="fl"><i class="iconfont icon-shoucang1"></i></li>
                <li class="fl"><i class="iconfont icon-wodetianchong"></i></li>
            </ul>
        </div>
        <!-- <z-banner :listImg="list">sss</z-banner> -->
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
        top: 0;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    .content{
        margin-top: @size45;
        margin-bottom: 1.2rem;
    }
    .special{
        width: @size375;
        height: @size200;
        background: gray;
        margin-bottom: @size5;
        text-align: center;
        position: relative;
        i{
            position: absolute;
            top: 0;
            right: 0;
            padding-right: 3px;
            padding-left:3px;    
            background: rgb(51,51,51);
            a{
                color: white;
                font-size:@size10;
            }
        }
        h1{
            padding-top: 60px;
            font-size: @size20  ;
        }
        .t-title{
            padding: 10px;
        }
        .time{
            padding: 10px;
            font-size: @size10;
            color: white;
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

