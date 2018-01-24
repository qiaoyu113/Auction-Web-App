<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 登录 -->
    <div class="" id="" v-set-title="title">
         <div class="header">传家</div>
        <div class="container" v-for="list in msgs" :key="list.id">
            <!-- 弹窗 -->
            <z-service :msg='list'></z-service>
            
        </div>
        
    </div>
   
</template>

<script >
    import {appService} from '../../service/appService'
    import service from "../../component/service/service.vue"
    export default {
        data () {
            return {
                title: '客服',
                msgs:[
                    // {type:'1',
                    // enInfo:'REMOVE ITEM',
                    // chInfo:'删除',
                    // classObject:'icon-pinpai',
                    // confirm:'是否删除订单',
                    // },
                    // {type:'2',
                    // enInfo:'SUCCESS',
                    // chInfo:'成功',
                    // classObject:'icon-Play',
                    // confirm:'您的体现申请以提交成功!\n'
                    //             +'正在处理',
                    // },
                    {type:'3',}
                ],
            }
        },
        components:{'z-service':service},
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
        width: 10rem;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    .container{
        width: 100%;
        height: 100%;
        margin-top: @size45;
        background: rgba(1, 3, 1,0.7);
        box-sizing: border-box;
        position: relative;
    }
    
</style>

