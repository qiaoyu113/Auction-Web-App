<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-即将开始 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="nav">
            <span class="">&lt;</span> 
            <span class="">c</span>
            <span>c</span>
        </div>
        
        <div class="container">
            <div class="sell-list">
                <div class="sell-pic"></div>
                <div class='sell-content'>
                    <div class="sell-int">
                        
                    </div>
                    <div class="sell-inf">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行</div>
                </div>
            </div>
        </div>
        <!-- <z-history></z-history> -->
        <!-- <backhome></backhome> -->
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
                
            }
        },
        // components:{'special-content':specialCont},
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
    .sell-list{
        .sell-pic{
            height: @size162;
            background: gray;
        }
        .sell-content{
            height: @size256;
        }
        
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
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: 20px;
            
            
        }
        .check{
            border-bottom: 4px solid black;
        }
        
    }
    
</style>

