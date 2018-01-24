<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 登录 -->
    
        <!-- 登录界面 -->
        <div class="box1" v-if='login'>
            <div class="boxImg">
                <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
            </div>
            <!--登陆账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phone"/>
                <div class="infoClose" @click='removePhone'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码"  v-model="password"/>
                <div class="infoClose" @click='removePassword'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--联系客服-->
            <div class="service"><span>登陆遇到问题，联系客服</span></div>
            <!--登陆和提示-->
            <div class="bottom">
                <div class="wrong">密码错误</div>
                <div class="log">登 陆</div>
            </div>
        </div>

</template>

<script >
    import {appService} from '../../service/appService'
    import login from '../../component/login/login.vue'
    export default {
        data () {
            return {
                title: '登录注册',
                login:true,
                checked:true,
                phone:'',
                password:'',
                
            }
        },
        components:{'z-login':login},
        
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
                    that.checked = true;
                    that.login = true;
                }else{
                    that.checked = false;
                    that.login = false;
                }
            },
            removePhone:function(){
                let that = this;
                that.phone = ''
            },
            removePassword:function(){
                let that = this;
                that.password = ''
            },
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    
    
    .box1{
        width:100%;
        padding:0.3rem;
        box-sizing: border-box;
        .boxImg{
            width: 1.73rem;
            height: 1.73rem;
            margin: auto;
            padding: @size55 0 @size55 0;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .info{
            width: 100%;
            height: 1.02rem;
            border-bottom: 1px solid #87828c;
            input{
                padding-left:0.2rem; 
                width: 6rem;
                height: 100%;
                float: left;
                border: none;
                outline: none;

            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
            }
        }
        .service{
            width: 100%;
            text-align: center;
            padding-top: 0.1rem;
            span{
                font-size: 0.24rem;
                border-bottom: 1px solid #87828c;
                color: #87828c
            }
        }
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        .log{
            border-top:1px solid #333;
            width: 100%;
            height: @size45;
            line-height: 1.2rem;
            text-align: center;
            font-size: 14px;
        }
        .wrong{
            width: 100%;
            height: @size25;
            background:linear-gradient(30deg,#f54ea2 0%,#dd704c 100%);
            text-align: center;
            color:#87828c;
            font-size: 13px;
            line-height: @size25;
        }
    }
</style>

