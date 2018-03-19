<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 登录 -->
    <div class="" id="" v-set-title="title">
        
        
        <div class="box2" >
            <!-- <div class="boxImg">
            </div> -->
            <!--注册账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="number" placeholder="输入验证码" v-model="code"/>
                <div class="infoClose" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}})</span></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="确认密码"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!-- 微信注册提醒 -->
            <div class="wchat" @click="getReswexin">
                <i class="iconfont icon-icon_weixin"></i><span>微信</span>
            </div>
            <!--注册和提示-->
            <div class="bottom">
                <div class="wrong">两遍密码错误</div>
                <div class="log">注 册</div>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    
    export default {
        data () {
            return {
                title: '注册',
                timeOver:60,
                codeShow:false,
                code:'',
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
            //获取验证码
            getcode:function(){
                let that = this;
                if(that.codeShow){

                }else{
                    that.codeShow = true;
                    let time = setInterval(function(){
                        if(that.timeOver === 0){
                            clearInterval(time)
                            that.codeShow = false;
                            that.timeOver = 60;
                        }else{
                            that.timeOver = that.timeOver -= 1
                        }
                    },1000)
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
    
    .box2{
        width:100%;
        padding:0.3rem;
        box-sizing: border-box;
         padding-top: @size55 ;
         padding-bottom: @size55 ;
        // .boxImg{
            
        //     // margin: auto;
        //     padding: @size55 0 @size55 0;
            
        // }
        .info{
            width: 100%;
            height: 1.02rem;
            border-bottom: 1px solid #87828c;
            input{
                padding-left:0.2rem; 
                width: 4rem;
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
        .wchat{
            width: 100%;
            height: 1rem;
            text-align: center;
            padding-top: 0.3rem;
            box-sizing: border-box;
            line-height: 1.02rem;
            i{
                color:black;
                font-size: 0.64rem;
                padding-top: 1px;
            }
            span{
                display: inline-block;
                font-size: 0.40rem;
                color: #87828c;
                padding-left: 0.2rem;
                position: relative;
                top: -3px;
                
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

