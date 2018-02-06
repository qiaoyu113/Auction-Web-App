<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="container">
            <div class="nav">
                <div @click="getMenu(1)"><span :class="checked==1 ? 'check' : ''">正在进行</span></div>
                <div @click="getMenu(2)"><span :class="checked==2 ? 'check' : ''">即将开始</span></div>
                <div @click="getMenu(3)"><span :class="checked==3 ? 'check' : ''">历史记录</span></div>
            </div>
            
            <div v-for="list in getContent()" :key="list.id">
                <spe-run :str="list"></spe-run>
            </div>
        </div>
        <z-footer ></z-footer>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import specialRun from "../../component/special/specialRun.vue";
    // import {  } from "../../component/";
    export default {
        data () {
            return {
                title: '专场',
                checked:1,
                specialRun:[
                    {
                        index:1,
                        collected:false,
                        flag:true,
                        timeOrMoney:"00:00:00:00",
                        title:"器物拍卖专场v",
                        warn:"拍卖已开始，快去捡漏吧",
                        url:"http://www.baidu.com",
                        collect:50,
                        people:20000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       },{
                        index:1,
                        collected:true,
                        flag:true,
                        timeOrMoney:"00:00:20:00",
                        title:"器物拍卖专场c",
                        warn:"2017.09.01 9:00结束",
                        url:"http://www.baidu.com",
                        collect:20,
                        people:30000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       }
                ],
                specialWill:[
                    {
                        index:2,
                        collected:true,
                        flag:true,
                        timeOrMoney:"00:00:00:00",
                        title:"器物拍卖专场111",
                        warn:"拍卖已开始，快去捡漏吧",
                        url:"http://www.baidu.com",
                        collect:50,
                        people:20000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       },{
                        index:2,
                        collected:false,
                        flag:true,
                        timeOrMoney:"00:00:20:00",
                        title:"器物拍卖专场sss",
                        warn:"2017.09.01 9:00开始",
                        url:"http://www.baidu.com",
                        collect:20,
                        people:30000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       }
                ],
                specialHis:[
                    {
                        index:3,
                        collected:false,
                        flag:true,
                        timeOrMoney:"200,000,00CNY",
                        title:"器物拍卖专场",
                        warn:"成交数量：50",
                        url:"http://www.baidu.com",
                        collect:50,
                        people:20000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       },{
                        index:3,
                        collected:true,
                        flag:true,
                        timeOrMoney:"500,000,00CNY",
                        title:"器物拍卖专场",
                        warn:"成交数量：30",
                        url:"http://www.baidu.com",
                        collect:20,
                        people:30000,
                        img:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg'],
                       }
                ]
            }
        },
        components:{'spe-run':specialRun},
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
            getMenu:function(index){
                let that = this;
                if(index === 1){
                    that.checked = 1;
                    // that.children.className='check';
                }else if(index===2){
                    that.checked = 2;
                    // that.login = false;
                }else{
                    that.checked = 3;
                }
            },
            getContent: function() {
                let that = this;
                if(that.checked==1){
                    return that.specialRun;
                }else if(that.checked==2){
                    return that.specialWill;
                }
                else if(that.checked==3){
                    return that.specialHis;
                }
            }
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
    .nav{
        width: @size375;
        height: @size35;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        div{
            display: inline-block;
            
            
            float: left;
            color: rgb(153, 153, 162);
            width: 33.3%;
            span{
                // display: inline-block;
                text-align: center;
                font-size: @size14;
                line-height: @size35;
                margin-left: @size35;
                // padding-left: @size55;
            }
            .check{
                box-sizing: border-box;
                padding-bottom: 8px;
                border-bottom: 2px solid black;
                color: rgb(51, 51, 51)
            }
        }
        
        
    }
    
    
</style>

