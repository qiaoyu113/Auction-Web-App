<template>
    <div id="login" v-set-title="title" class="login">
        <div class="header">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight" @click="Returns()">
                <img src="../../assets/image/mycenter/right.png"/>
            </div>
            <!--按钮-->
            <div class="menu">
                <div :class="login ? 'check' : 'login'" @click="getMenu(1)">登录</div>
                <div :class="!login ? 'check2' : 'register'" @click="getMenu(2)">注册</div>
            </div>
        </div>
        <!--登录中心-->
        <div class="box" v-if="login">
            <div class="boxHeader">
                <div class="boxImg" >
                    <img :src="wximg" v-if="wximg!=null"/>
                </div>
            </div>
            <!--登录账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phoneUser"/>
                <div class="infoRight" @click="remphoneUser()" v-if="phoneUser!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="passwordUser"/>
                <div class="infoRight" @click="rempasswordUser()" v-if="passwordUser!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
              <!--微信登录-->
            <div class="wxLogin" v-if="wximg==null&&wxLogin==true" @click="wxlogin">
                <i class="iconfont icon-icon_weixin"></i>微信
            </div>
            <!--联系客服-->
            <div class="talk" v-if="wximg!=null"><a href="tel:15801619600" @click="resetpassword()"><span>登录遇到问题，联系客服</span></a></div>
            <!--登录和提示-->
            <div class="v_kefu" v-if="wximg==null"><a href="javaScript:;" @click="resetpassword()">忘记密码</a> | <a href="tel:15801619600">联系客服</a></div>
            <div :class="isX ? 'bottoms':'bottom'">
                <div class="hint" v-if="hint">{{hintText}}</div>
                <div class="ok" @click="loginBtn">登 录</div>
            </div>
        </div>
        <!--注册中心-->
        <div class="box sign" v-if="!login && !wxShow">
            <!--注册账号-->
            <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phone"/>
                 <div class="infoRight" @click="remphone()" v-if="phone!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!-- <div class="info">
                <input style="width:6rem;" type="text" placeholder="输入图片验证码" v-model="kaptchaValue"/>
                <div class="code" @click="getKaptchas()"><img :src="img.imageString"/></div>
            </div> -->
           <div class="info">
                <input style="width:6rem;" type="number" placeholder="输入验证码" v-model="code"/>
                <div class="code" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}})</span></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="password"/>
                <div class="infoRight" @click="rempassword()" v-if='password!=""'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="确认密码" v-model="password2"/>
                <div class="infoRight" @click="rempassword2()" v-if="password2!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--微信登陆-->
            <div class="wxLogin" v-if="wxLogin" @click="wxlogin">
                <i class="iconfont icon-icon_weixin"></i>微信
            </div>
            <!--登陆和提示-->
            <div :class="isX ? 'bottoms':'bottom'">
                <div class="hint" v-if="hint2">{{hint2Text}}</div>
                <div class="ok" @click="sign">注 册</div>
            </div>
        </div>
        <!--微信登陆-->
        <div class="box" v-if="wxShow">
            <div class="boxHeader">
                <div class="boxImg">
                    <img :src="wximg"/>
                </div>
            </div>
           <div class="info">
                <input type="number" placeholder="输入手机号" v-model="phone"/>
                 <div class="infoRight" @click="remphone()" v-if="phone!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!-- <div class="info">
                <input style="width:6rem;" type="text" placeholder="输入图片验证码" v-model="kaptchaValue"/>
                <div class="code" @click="getKaptchas()"><img :src="img.imageString"/></div>
            </div> -->
           <div class="info">
                <input style="width:6rem;" type="number" placeholder="输入验证码" v-model="code"/>
                <div class="code" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}})</span></div>
            </div>
            <div class="info">
                <input type="password" placeholder="输入密码" v-model="password"/>
                <div class="infoRight" @click="rempassword()" v-if='password!=""'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info">
                <input type="password" placeholder="确认密码" v-model="password2"/>
                <div class="infoRight" @click="rempassword2()" v-if="password2!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--登陆和提示-->
            <div :class="isX ? 'bottoms':'bottom'">
                <div class="hint" v-if="hint2">{{hint2Text}}</div>
                <div class="ok" @click="putUsers()">注 册</div>
            </div>
        </div>
        <!--联系客服-->
        <div class="q_talk" @click="openService()">
            <img src="../../assets/image/mycenter/icon5.png"/>
        </div>
        <!--客户服务-->
        <div class="serviceBox" v-if="ServiceBox">
            <div class="serviceClose" @click="closeService()">×</div>
            <div class="serviceTop">
                <h2>ASSISTANCE</h2>
                <p>客户服务</p>
            </div>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t3.png"/>
                    <p>私恰</p>
                </div>
            </a>
            <div class="serviceWX">
                <img src="../../assets/image/mycenter/wx.png"/>
                <p>联系微信客服</p>
                <p class="p">长按识别二维码</p>
            </div>
        </div>
        <div class="serviceBk" v-if="ServiceBox"></div>
    </div>
</template>

<script>
    import {commonService} from '../../service/mycenterService'
    export default {
        data () {
            return {
                title: '传家',
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
                // kaptchaValue:'',
                img:'',
                wx:this.$route.query.wx,
                wximg:'',
                ServiceBox:false,
                isX:false,
            }
        },
     // asyncData({store,route}) {
     //        return Promise.all([
     //            commonService.getKaptchas().then(res=>{
     //                store.state.homeStore.list=res;
     //            }),
               
     //        ])
     //    },
        computed: {
            //将存在store中的数据取出
            // list() {
            //     return this.$store.state.homeStore.list 
            // },
        },
        mounted: function() {
            this.onMove()
            // this.getKaptchas()
            this.vwx()
            this.vwximg()
            // if(this.login){
            //     let phoneNum = window.localStorage.getItem('phone');
            //     this.phoneUser = phoneNum
            // }
//            首次加载判断在什么浏览器下打开
            let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
//                    这里是微信浏览器
                this.wxLogin = true;
            } else {
//                    这里不是微信浏览器
                this.wxLogin = true;
            }
            if(this.isIphoneX()){
                this.isX = true;
            }else{
                this.isX = false;
            }
        },
        methods: {
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
            //打开客服
            openService(){
                let that = this;
                that.ServiceBox = true;
            },
            //关闭客服
            closeService(){
                let that = this;
                that.ServiceBox = false;
            },
            remphoneUser:function(){
                this.phoneUser=''
            },
            rempasswordUser:function(){
                this.passwordUser=''
            },
            remphone:function(){
                this.phone=''
            },
            rempassword:function(){
                this.password=''
            },
            rempassword2:function(){
                this.password2=''
            },
            resetpassword:function(){
                this.$router.push({path:"/resetpassword"}) 
            },
            Returns:function(){
                this.$router.push({path:"/personalCenter"}) 
            },
            vwximg:function(){

              this.wximg=window.localStorage.getItem('headImg')
              
            },
            vwx:function(){
              if(this.wx=='wx'){
                this.wxShow=true
                this.checked = false;
                this.login = false;
            }
            },
            // // 获取图片验证码
            // getKaptchas:function(){
            //     let that=this
            //      commonService.getKaptchas().then(function(res){
            //         that.img=res.data.datas
            //   })
            // },
            //点击注册
            sign:function(){
                let that = this;
                if(that.phone==''){
                     that.hint2 = true;
                    that.hint2Text = '手机号不能为空';
                    setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                }
                if(that.phoneOk){
                    if(that.checkPassword){
                        if(that.password == that.password2){
                            if(that.code != ''){
                                commonService.goSignup({phone:that.phone,password:that.password,smsCode:that.code,type:1,platform:that.platform}).then(function(res){
                                    if(res.data.code === 200){
                                        that.phoneUser = that.phone;
                                        window.localStorage.setItem('phone',that.phone)
                                        that.login = true;
                                        that.wxShow = false;
                                    }else if(res.data.code === 512104){
                                        // that.getKaptchas()
                                        that.hint2 = true;
                                        that.hint2Text = '短信验证码已过期';
                                        setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                                        // that.getKaptchas()
                                    }else{
                                        that.hint2 = true;
                                        that.hint2Text = res.data.message; 
                                         setTimeout(() => {  
                      
                                          that.hint2 = false;
                                          that.hint2Text = ''
                                      },2000) 
                                    }
                                })
                            }else{
                                that.hint2 = true;
                                that.hint2Text = '请输入验证码';
                                setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                            }
                        }else{
                            that.hint2 = true;
                            that.hint2Text = '两次密码输入不一致';
                            setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                        }
                    }else{
                        that.hint2 = true;
                        that.hint2Text = '密码为字母、数字、组合且长度为6-20的字符';
                        setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                    }
                }else{
                    that.hint2 = true;
                    that.hint2Text = '手机号格式错误';
                    setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                }
            },
            //点击登陆
            loginBtn:function(){
                let that = this;
                commonService.goLogin({phone:that.phoneUser,password:that.passwordUser,platform:that.platform}).then(function(res){
                    if(res.data.code === 200){
                        let token = res.data.datas;
                        window.localStorage.setItem('token',token)
                        that.$router.replace({name:'personalCenter'})
                    }else if(res.data.code === 513110){
                        that.hint = true;
                        that.hintText = '用户不存在,请注册';
                        setTimeout(() => { 
                                    that.hint = false;
                                    that.hint2Text = ''
                                      },2000) 
                    }else if(res.data.code === 513114){
                        that.hint = true;
                        that.hintText = '账号密码错误,请重新输入';
                        setTimeout(() => { 
                                    that.hint = false;
                                    that.hintText = ''
                                      },2000) 
                    }else{
                        that.hint = true;
                        that.hintText = res.data.message
                        setTimeout(() => { 
                                    that.hint = false;
                                    that.hintText = ''
                                      },2000) 
                    }
                })
            },
           
         
            getMenu:function(index){
                let that = this;
                if(index === 1){
                    that.checked = true;
                    that.login = true;
                    that.wxShow = false;
                }else if(that.wx!='wx'){
                    that.checked = false;
                    that.login = false;
                }else if(that.wx=='wx'){
                    that.checked = false;
                    that.login = false;
                    that.wxShow=true
                }
            },
            //获取验证码
            getcode:function(){
                let that = this;
                if(that.phoneOk){
                    if(that.codeShow){
                     that.hint2 = true;
                     that.hint2Text = '已发送';
                     setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                    }else{
                        
                        // if(that.kaptchaValue==''){
                        //      that.hint2 = true;
                        //      that.hint2Text = '请填写图片验证码';
                        // }
                        commonService.getQR({phone:that.phone,type:1}).then(function(res){
                            if(res.data.code === 200){
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
                            }else{
                                that.codeShow = false;
                                that.hint2 = true;
                                that.hint2Text = res.data.message;
                                setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                                // that.getKaptchas()
                            }
                            // if(res.data.code === 513109){
                            //     that.codeShow = false;
                            //     that.hint2 = true;
                            //     that.hint2Text = '用户已存在，请直接登陆';
                            // }
                        });
                    }
                }else{
                    that.hint2 = true;
                    that.hint2Text = '手机号格式错误';
                    setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                }
            },
            //微信注册提交
            putUsers:function(){
                let that=this;
                let infoKey= window.localStorage.getItem('redisInfoKey')
                if(that.phoneOk){
                    if(that.checkPassword){
                        if(that.password == that.password2){
                            if(that.code != ''){
                                commonService.putUserss({infoKey:infoKey,type:1,smsCode:that.code,phone:that.phone,platfrom:'WXH5',password:that.password}).then(function(res){
               
                                    if(res.data.code === 512104){
                                        that.hint2 = true;
                                        that.hint2Text = '短信验证码已过期';
                                        setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                                        // that.getKaptchas()
                                    }else if(res.data.code === 200){
                                       that.phoneUser = that.phone;
                                        window.localStorage.setItem('phone',that.phone)
                                        that.login = true;
                                        that.wxShow = false;
                                    }
                                })
                            }else{
                                that.hint2 = true;
                                that.hint2Text = '请输入验证码';
                                setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                            }
                        }else{
                            that.hint2 = true;
                            that.hint2Text = '两次密码输入不一致';
                            setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                        }
                    }else{
                        that.hint2 = true;
                        that.hint2Text = '密码为字母、数字、组合且长度为6-20的字符';
                        setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
                    }
                }else{
                    that.hint2 = true;
                    that.hint2Text = '手机号格式错误';
                    setTimeout(() => { 
                                    that.hint2 = false;
                                    that.hint2Text = ''
                                      },2000) 
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
                // that.wxShow = true;
               commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxlogin',wxscope:'snsapi_userinfo'}).then(function(res){
                   let code = res.data.code;
                   if(code === 200){
                       //获取静默授权地址成功
                       window.location.href = res.data.datas;
                   }
               })
            }
          },

        beforeRouteEnter(to, from, next){
            next(vm => {
                vm.url = to.path;
                if(vm.url == '/login'){

                    if(vm.wx!='wx'){
                      vm.login = true;  
                    }else if(vm.wx=='wx'){
                      vm.login = false; 
                    }
                    
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
                let re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
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
        bottom:1.87rem;
        margin:auto;
        .q_talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #000;
            border-right: none;
            border-bottom-left-radius: 6px;
            border-top-left-radius:6px;
            padding:0.2rem;
            box-sizing:border-box;
            img{
                width:0.56rem;
                height:0.5rem;
            }
        }
        .serviceBk{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#000000;
            opacity: 0.65;
            z-index:200;

        }
        .serviceBox{
            width:7rem;
            height:9.2rem;
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background:#fff;
            padding:0.5rem;
            z-index:201;
            .serviceClose{
                position: absolute;
                right:0;
                top:0;
                width:0.8rem;
                height:0.8rem;
                background:#EB6100;
                color:#fff;
                text-align: center;
                line-height:0.7rem;
                font-size: 0.9rem;
            }
            .serviceTop{
                text-align: center;
                margin-top:0.5rem;
                margin-bottom:0.4rem;
                h2{
                    font-size:18px;
                }
                p{
                    font-size:12px;
                    margin-top:0.2rem;
                }
            }
            .serviceList{
                overflow: hidden;
                font-size: 12px;
                padding:0.3rem 0 0.3rem 2.3rem;
                border-top:1px solid #B5B8BA;
                img{
                    float:left;
                    width:0.5rem;
                }
                p{
                    width:2rem;
                    text-align: center;
                    float:left;
                    font-size:12px;
                }
            }
            .serviceWX{
                overflow: hidden;
                font-size: 12px;
                border-top:1px solid #B5B8BA;
                text-align: center;
                img{
                    width:2rem;
                    height:2rem;
                    margin: 0.4rem auto;
                }
                p{
                    font-size:12px;
                }
                .p{
                    font-size:9px;
                    color:#C3C3C3;
                }
            }
        }
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
                img{
                    width: 1rem;
                    margin-top: 0.4rem;
                }
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
                .code{
                    img{
                        height: 1rem;
                    }
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
        .v_kefu{
                text-align: center;
                font-size: 10px;
                margin-top: 2.3rem;

                a{
                  font-size: 10px;  
                  text-decoration: underline; 
                }
               
            }
        .bottom{
            position: fixed;
            left:0;
            right:0;
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
                background: #fff;
            }
        }
        .bottoms{
            position: fixed;
            left:0;
            right:0;
            bottom:0.4rem;

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
                background: #fff;
            }
        }
    }
</style>

