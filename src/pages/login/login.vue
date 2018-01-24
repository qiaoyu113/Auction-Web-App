<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 登录 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>LOG IN</div>
                <div class="loginCn">用户登录</div>
            </div>
            <!--按钮-->
            <div class="menu">
                <div :class="checked ? 'login' : 'login1'" @click="getMenu(1)">登陆</div>
                <div :class="checked ? 'register' : 'register1'" @click="getMenu(2)">注册</div>
                <!-- <div class='login'>登陆</div>
                <div class='register'>注册</div> -->
            </div>
        </div>
        <!-- 登录界面 -->
        <div class="box1" v-if='login'>
            <z-login></z-login>
        </div>
        <!-- 注册 -->
        <div class="box2" v-if='!login'>
            <z-register></z-register>
        </div>
        <!-- 微信注册 -->
        <div class="box" v-else-if='login==3&&wexin==true'>
            <z-resWexin></z-resWexin>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import login from '../../component/login/login.vue'
    import register from '../../component/login/register.vue'
    import registerweixin from '../../component/login/registerweixin.vue'
    export default {
        data () {
            return {
                title: '登录注册',
                login:true,
                checked:true,
                wexin:false,
            }
        },
        components:{'z-login':login,'z-register':register,'z-resWexin':registerweixin},
        
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
            getReswexin:function() {
                let that = this;
                that.wexin = true;
                that.login = 3;
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
    .content{
        margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid rgb(145, 0, 142);
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: bold;
                font-size:20px;
            }
            .loginCn{
                font-size: 15px;
            }
            
        }
        .menu{
            height:0.6rem;
            line-height:0.6rem;
            position: absolute;
            bottom:1px;
            box-sizing: border-box;
            .login{
                color:#353535;
                float:left;
                box-sizing: border-box;
                border-bottom:2px solid #353535;
                
            }
            .register{
                float:left;
                color:#A8A8A8;
                margin-left:0.2rem;
                padding:0 0.46rem;
            }
            .login1{
                color:#A8A8A8;
                float:left;
                box-sizing: border-box;
                padding-right: 0.46rem; 
                
            }
            .register1{
                float:left;
                color:#353535;
                margin-left:0.2rem;
                border-bottom:2px solid #353535;
            }
        }
        
    }
    
</style>

