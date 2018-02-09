<template>
    <div id="login" v-set-title="title" class="login">
        <div class="header">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
            <!--按钮-->
            <div class="menu">
                <div :class="login ? 'check' : 'login'" @click="getMenu(1)">登陆</div>
                <div :class="!login ? 'check2' : 'register'" @click="getMenu(2)">注册</div>
            </div>
        </div>
        <!--登陆中心-->
        <div class="box" v-if="login">
            <div class="boxHeader">
                <div class="boxImg">
                    <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                </div>
            </div>
            <!--登陆账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phoneUser"/>
                <div class="infoRight" @click="deletePhone"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="passwordUser"/>
                <div class="infoRight" @click="deletePassword"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--联系客服-->
            <div class="talk"><a href="tel:+10086"><span>登陆遇到问题，联系客服</span></a></div>
            <!--登陆和提示-->
            <div class="bottom">
                <div class="hint" v-if="hint">{{hintText}}</div>
                <div class="ok" @click="loginBtn">登 陆</div>
            </div>
        </div>
        <!--注册中心-->
        <div class="box sign" v-if="!login && !wxShow">
            <!--注册账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phone"/>
                <div class="infoRight" @click="removePhone"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input style="width:6rem;" type="number" placeholder="输入验证码" v-model="code"/>
                <div class="code" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}})</span></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="password"/>
                <div class="infoRight" @click="removePassword"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="确认密码" v-model="password2"/>
                <div class="infoRight" @click="removePassword2"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--微信登陆-->
            <div class="wxLogin" v-if="wxLogin" @click="wxlogin">
                <i class="iconfont icon-icon_weixin"></i>微信
            </div>
            <!--登陆和提示-->
            <div class="bottom">
                <div class="hint" v-if="hint2">{{hint2Text}}</div>
                <div class="ok" @click="sign">注 册</div>
            </div>
        </div>
        <!--微信登陆-->
        <div class="box" v-if="wxShow">
            <div class="boxHeader">
                <div class="boxImg">
                    <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                </div>
            </div>
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phone"/>
                <div class="infoRight" @click="removePhone"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input style="width:6rem;" type="number" placeholder="输入验证码" v-model="code"/>
                <div class="code" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}})</span></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="password"/>
                <div class="infoRight" @click="removePassword"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="确认密码" v-model="password2"/>
                <div class="infoRight" @click="removePassword2"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--登陆和提示-->
            <div class="bottom">
                <div class="hint" v-if="hint2">{{hint2Text}}</div>
                <div class="ok" @click="sign">注 册</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/mycenterService'
    export default {
        data () {
            return {
                title: '个人中心',
                header:{
                    name:'LOG IN',
                    name2:'用户登录'
                },
                wxShow:false,
                checked:true,
                hint:false,
                hint2:false,
                hint2Text:'',
                hintText:'',
                phoneOk:false,//判断手机号是否正确
                login:true,//1.true登陆页面  2.false注册页面
                timeOver:60,//短信验证码倒计时
                inputPhone:'',//手机号
                inputNum:'',//验证码
                codeShow:false,
                phone:'',
                code:'',
                password:'',
                password2:'',
                checkPassword:false,
                platform:'WAP_H5',//判断平台,
                passwordUser:'',//登陆账户
                phoneUser:'',//登陆密码
                wxLogin:false,//微信登陆
            }
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
            this.onMove()
            if(this.login){
                let phoneNum = window.localStorage.getItem('phone');
                this.phoneUser = phoneNum
            }
//            首次加载判断在什么浏览器下打开
            let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
//                    这里是微信浏览器
                this.wxLogin = true;
            } else {
//                    这里不是微信浏览器
                this.wxLogin = true;
            }
        },
        methods: {
            //点击注册
            sign:function(){
                let that = this;
                if(that.phoneOk){
                    if(that.checkPassword){
                        if(that.password == that.password2){
                            if(that.code != ''){
                                commonService.goSignup({phone:that.phone,password:that.password,smsCode:that.code,type:1,platform:that.platform}).then(function(res){
                                    console.log(res.data)
                                    if(res.data.code === 200){
                                        that.phoneUser = that.phone;
                                        window.localStorage.setItem('phone',that.phone)
                                        that.login = true;
                                        that.wxShow = false;
                                    }else if(res.data.code === 512104){
                                        that.hint2 = true;
                                        that.hint2Text = '短信验证码已过期';
                                    }
                                })
                            }else{
                                that.hint2 = true;
                                that.hint2Text = '请输入验证码';
                            }
                        }else{
                            that.hint2 = true;
                            that.hint2Text = '两次密码输入不一致';
                        }
                    }else{
                        that.hint2 = true;
                        that.hint2Text = '密码为字母、数字、下划线组合且长度为6-16的字符';
                    }
                }else{
                    that.hint2 = true;
                    that.hint2Text = '手机号格式错误';
                }
            },
            //点击登陆
            loginBtn:function(){
                let that = this;
                console.log(that.phoneUser);
                commonService.goLogin({phone:that.phoneUser,password:that.passwordUser,platform:that.platform}).then(function(res){
                    console.log(res)
                    if(res.data.code === 200){
                        console.log('登陆成功')
                        let token = res.data.datas;
                        window.localStorage.setItem('token',token)
                        that.$router.replace({name:'home'})
                    }else if(res.data.code === 513110){
                        that.hint = true;
                        that.hintText = '用户不存在,请注册';
                    }else if(res.data.code === 513114){
                        that.hint = true;
                        that.hintText = '账号密码错误,请重新输入';
                    }
                })
            },
            //删除登陆手机号
            deletePhone:function(){
                let that = this;
                that.phoneUser = '';
            },
            //删除密码
            deletePassword:function(){
                let that = this;
                that.passwordUser = '';
            },
            getMenu:function(index){
                let that = this;
                if(index === 1){
                    that.checked = true;
                    that.login = true;
                    that.wxShow = false;
                }else{
                    that.checked = false;
                    that.login = false;
                }
            },
            //获取验证码
            getcode:function(){
                let that = this;
                if(that.phoneOk){
                    if(that.codeShow){

                    }else{
                        that.codeShow = true;
                        commonService.getQR({phone:that.phone,type:1}).then(function(res){
                            console.log(res.data)
                            if(res.data.code === 200){
                                console.log('短信发送成功')
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
                            if(res.data.code === 513109){
                                that.codeShow = false;
                                that.hint2 = true;
                                that.hint2Text = '用户已存在，请直接登陆';
                            }
                        });
                    }
                }else{
                    that.hint2 = true;
                    that.hint2Text = '手机号格式错误';
                }
            },
            //删除手机号
            removePhone:function(){
                let that = this;
                that.phone = ''
            },
            //删除密码
            removePassword:function(){
                let that = this;
                that.password = ''
            },
            removePassword2:function(){
                let that = this;
                that.password2 = ''
            },
            //页面滑动问题
            onMove:function(){
                let overscroll = function(el) {
                    el.addEventListener('touchstart', function() {
                        let top = el.scrollTop
                            , totalScroll = el.scrollHeight
                            , currentScroll = top + el.offsetHeight
                        if(top === 0) {
                            el.scrollTop = 1
                        } else if(currentScroll === totalScroll) {
                            el.scrollTop = top - 1
                        }
                    })
                    el.addEventListener('touchmove', function(evt) {
                        //if the content is actually scrollable, i.e. the content is long enough
                        //that scrolling can occur
                        if(el.offsetHeight < el.scrollHeight)
                            evt._isScroller = true
                    })
                }
                overscroll(document.querySelector('.login'));
                document.body.addEventListener('touchmove', function(evt) {
                    //In this case, the default behavior is scrolling the body, which
                    //would result in an overflow.  Since we don't want that, we preventDefault.
                    if(!evt._isScroller) {
                        evt.preventDefault()
                    }
                })
            },
            //绑定微信登陆
            wxlogin:function(){
                let that = this;
                that.wxShow = true;
//                commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxbaselogin',wxscope:'snsapi_base'}).then(function(res){
//                    let code = res.data.code;
//                    if(code === 200){
//                        //获取静默授权地址成功
//                        window.location.href = res.data.datas;
//                    }
//                })
            }
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                vm.url = to.path;
                if(vm.url == '/login'){
                    vm.login = true;
                }
                if(vm.url == '/signup'){
                    vm.login = false;
                }
            })
        },
        watch:{
            phone(curVal,oldVal){
                let that = this;
                let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                let flag = reg.test(curVal)
                if(flag){
                    that.phoneOk = true;
                    that.hint2 = false;
                }else{
                    that.phoneOk = false;
                }
            },
            password(curVal){
                let that = this;
                let re = /^([\d]|[\w]){6,16}$/;
                that.checkPassword = re.test(curVal);
                if(that.checkPassword){
                    that.hint2 = false;
                }
            }
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    *{-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}
    .noscroll,
    .noscroll body {
        overflow: hidden;
    }
    .noscroll body {
        position: relative;
    }
    #login{
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin:auto;
        .header{
            width:100%;
            height:3.7rem;
            border-bottom:1px solid #2B343D;
            padding:1.07rem 0.53rem;
            box-sizing: border-box;
            position: relative;
            .headerLeft{
                width:80%;
                float:left;
                .headerEn{
                    height:0.75rem;
                    font-weight: bold;
                    font-size:20px;
                }
            }
            .headerRight{
                float: right;
                margin-top:0.3rem;
            }
            .menu{
                height:0.8rem;
                line-height:0.8rem;
                position: absolute;
                bottom:1px;
                box-sizing: border-box;
                .login{
                    float:left;
                    color:#A8A8A8;
                    padding:0 0.14rem;
                }
                .register{
                    float:left;
                    color:#A8A8A8;
                    margin-left:0.2rem;
                    padding:0 0.14rem;
                }
                .check2{
                    float:left;
                    color:#353535;
                    margin-left:0.2rem;
                    padding:0 0.14rem;
                    box-sizing: border-box;
                    border-bottom:1px solid #353535;
                }
                .check{
                    color:#353535;
                    float:left;
                    padding:0 0.14rem;
                    box-sizing: border-box;
                    border-bottom:1px solid #353535;
                }
            }
        }
        .box{
            width:100%;
            padding:0.2rem;
            box-sizing: border-box;
            .wxLogin{
                width: 2rem;
                text-align: center;
                margin:0.5rem auto;
                i{
                    font-size:28px;
                    float:left;
                    line-height: 0.6rem;
                }
            }
            .boxHeader{
                width:100%;
                padding:1.6rem 0 1.4rem 0;
                text-align: center;
                .boxImg{
                    width:1.86rem;
                    height:1.86rem;
                    border-radius: 100%;
                    overflow: hidden;
                    margin:auto;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
            .info{
                width:100%;
                height:1.06rem;
                padding-left:0.2rem;
                box-sizing: border-box;
                border-bottom:1px solid #7E8689;
                overflow: hidden;
                input{
                    width:8rem;
                    height:99%;
                    float:left;
                    border:none;
                    outline: none;
                    font-size:14px;
                }
                input::-webkit-input-placeholder {
                    color:#C1C1C1;
                }
                input:-moz-placeholder {
                    color:#C1C1C1;
                }
                input::-moz-placeholder {
                    color:#C1C1C1;
                }
                input:-ms-input-placeholder {
                    color:#C1C1C1;
                }
                .infoRight{
                    float:right;
                    margin-right:0.2rem;
                    margin-top:0.3rem;
                    color:#C1C1C1;
                }
            }
            .talk{
                width:100%;
                text-align: center;
                height:0.8rem;
                line-height:1rem;
                font-size:12px;
                color:#333;
                span{
                    border-bottom:1px solid #333;
                    font-size: 11px;
                }
            }
        }
        .sign{
            padding-top:2.4rem;
        }
        .code{
            height: 1.06rem;
            line-height: 1.06rem;
            float:right;
            margin-right:0.1rem;
            color:#B1B1B1;
            font-size:12px;
            span{
                font-size: 12px;
            }
        }
        .bottom{
            left:0;
            right:0;
            position: fixed;
            bottom:0;
            .hint{
                width:100%;
                height:0.67rem;
                line-height:0.67rem;
                color:#fff;
                background:linear-gradient(70deg, #DC704A, #F44EA0);
                text-align: center;
                font-size:12px;
            }
            .ok{
                width:100%;
                height:1.2rem;
                line-height:1.2rem;
                border-top:1px solid #333;
                text-align: center;
                font-size:14px;
            }
        }
    }
</style>

