<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 茶叶拍卖前台 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div v-for="list in homelist" :key="list.url">
                <home-item :str="list"></home-item>
            </div>
        </div>
        <z-footer >
            
        </z-footer>
        
        <!-- <z-banner :listImg="list">sss</z-banner> -->
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import itemc from "../../component/home/item.vue";
    export default {
        data () {
            return {
                title: '茶叶拍卖',
                homelist:[
                    {
                        title:"CHUANJIA SPECIAL",
                        subtitle:"传家标题1",
                        url:"http://www.baidu.com",
                        time:"2017.10.15 17:00",
                    },{
                        title:"CHUANJIA SPECIAL",
                        subtitle:"传家标题2",
                        url:"http://www.baidu.com",
                        time:"2017.10.15 16:00",
                    },
                    {
                        title:"CHUANJIA SPECIAL",
                        subtitle:"传家标题2",
                        url:"http://www.baidu.com",
                        time:"2017.10.15 16:00",
                    }
                ],
                
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
    .content{
        margin-top: @size45;
        margin-bottom: 1.2rem;
    }
    
    
</style>

