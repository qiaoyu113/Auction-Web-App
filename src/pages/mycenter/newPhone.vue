<template>
    <div id="home" class="newPhone" v-set-title="title">
    <v-service></v-service>
        <div class="headertt">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight" @click="Return()">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <!--设置昵称-->
        <div class="box2">
            <!--新手机号码-->
            <div class="info">
                <div class="infoList">原手机号码<div class="phone">{{phone}}</div></div>
            </div>
            <!--图片-->
          <!--   <div class="info">
                <div class="infoList">图片验证 <input class="codeInp" type="text" placeholder="请输入" v-model="kaptchaValue"/><div class="code" @click="getKaptchas()"><img :src="img.imageString"/></div></div>
            </div> -->
            <!--短信验证码-->
            <div class="info">
                <div class="infoList">短信验证码<input class="codeInp" type="number" placeholder="请输入短信验证码" v-model="inputNum"/><div class="code" @click="getcode">获取验证码<span v-if="codeShow" style="margin:0;">({{timeOver}}s)</span></div></div>
            </div>
            <div id="captcha-box"></div>
            <!--保存-->
            <div class="saves" v-if="htmlx!=''">{{htmlx}}</div>
            <div class="save" @click="save">下一步</div>
        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '茗探',
                header:{
                    name:'CELL PHONE NUMBER',
                    name2:'手机号码修改'
                },
                timeOver:0,//短信验证码倒计时
                inputPhone:'',//手机号
                inputNum:'',//验证码
                codeShow:false,
                img:'',
                kaptchaValue:'',
                htmlx:'',
               
            }
        },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
             phone() {
                return this.$route.query.phone 
            },
        },
        mounted: function() {
            /*
             * 所有需要token的请求都放在这里
             * 可以使用DOM元素
             * 这里的数据可以放在data中
             * */
             common.onMove('.newPhone')
             
             // this.getGaptchas()
             // this.mounted()
             // this.getKaptchas()
        },
        methods: {
            Return:function(){
                window.history.go(-1)
            },
            deleteName:function(){
                let that = this;
                that.inputPhone = '';
            },
            //换手机号
            save:function(){
                let that = this;
         commonService.getCheckCode({phone:that.phone,type:5,smsCode:that.inputNum}).then(function(res){
                    if(res.data.code == 200){
                      that.$router.push({name:'savePhone'})
                    }else{
                        that.htmlx=res.data.message
                        setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 

                    }
              })
            },
            // 获取图片验证码
            // getKaptchas:function(){
            //     let that=this
            //      commonService.getKaptchas().then(function(res){
            //         that.img=res.data.datas
            //   })
            // },
 
            //获取验证码
          getcode:function(){
                let that = this;

                if(that.phone==''){
                      that.htmlx="请输入手机号"
                        setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                        return false
                }
                 let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    let flag = reg.test(that.phone)
                    if(!flag){
                        this.htmlx="手机号码不正确"
                        setTimeout(() => {  
                                 this.htmlx=''
                             },2000) 
                        return false
                    }

               if(that.timeOver != 0){
                     return false
                }
        
                // 获取短信验码
                 commonService.getSendMessage({phone:that.phone,type:5}).then(function(res){
                    
                    if(res.data.code == 200){
                 if(that.timeOver==0){
                    that.codeShow = true;
                    that.timeOver = 90;
                    let time = setInterval(function(){
                   
                        if(that.timeOver == 0){
                            // clearInterval(time)
                           that.codeShow = false;
                            clearInterval(time)
                         
                        }else{ 
                          
                            that.timeOver = that.timeOver -= 1
                        }
                    },1000)
               }else{
                  return false
               }

                    }else{
                        that.htmlx=res.data.message
                        setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                    }
              })
            },

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
  .newPhone{
    position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 0;
    .headertt{
        width:100%;
        height:3.7rem;
        border-bottom:2px solid rgb(53, 60, 70);
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        .headerLeft{
            width:80%;
            float:left;
            .headerEn{
                height:0.75rem;
                font-weight: bold;
                font-size:14px;
            }
            .headerCh{
                font-size: 12px;
            }
        }
        .headerRight{
            float: right;
            margin-top:0.3rem;
            img{
                width: 0.8rem;
                margin-top: 0.6rem;
            }
        }
    }
    .box{
        width:100%;
        padding:0.27rem;
        box-sizing: border-box;
        .boxHeader{
            width:100%;
            height:2.4rem;
            border-bottom:1px solid #7E8689;
            position: relative;
            .boxHeaderLeft{
                width:2.2rem;
                height:2.2rem;
                float:left;
                border-radius: 100%;
                overflow: hidden;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .boxHeaderRight{
                width:1rem;
                height:0.6rem;
                float:right;
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                margin:auto;
            }
        }
        .info{
            width:100%;
            padding-left:0.2rem;
            box-sizing: border-box;
            border-bottom:1px solid #7E8689;
            .infoList{
                width:100%;
                height:1rem;
                line-height:1rem;
                border-bottom:1px solid #C9D0D8;
                font-size:12px;
                color:#333;

                span{
                    color:#B1B1B1;
                    font-size:12px;
                    margin-left:0.8rem;
                }
                .more{
                    width: 1rem;
                    float:right;
                    margin-top:0.24rem;
                }
                .icon-weixin1{
                    margin-right:0.2rem;
                }
                .goBind{
                    float:right;
                    color:#6F6F6F;
                    font-size:12px;
                    padding-right:0.2rem;
                }
            }
            .infoList:last-child{
                border-bottom: none;
            }
        }
        .back{
            width:100%;
            height:1.2rem;
            line-height:1.2rem;
            border:1px solid #28313A;
            text-align: center;
            box-sizing: border-box;
            margin-top:0.8rem;
            font-size:14px;
        }
    }
    .box2{
        width:100%;
        padding:0.27rem;
        box-sizing: border-box;
        .info{
            width:100%;
            padding-left:0.2rem;
            box-sizing: border-box;
            border-bottom:1px solid #7E8689;
            .infoList{
                width:100%;
                height:1rem;
                line-height:1rem;
                border-bottom:1px solid #C9D0D8;
                font-size:12px;
                color:#333;
                overflow: hidden;
                img{
                    height: 1rem;
                }
                span{
                    color:#B1B1B1;
                    font-size:12px;
                    margin-left:0.8rem;
                }
                .more{
                    width: 1rem;
                    float:right;
                    margin-top:0.24rem;
                }
                .icon-weixin1{
                    margin-right:0.2rem;
                }
                .goBind{
                    float:right;
                    color:#6F6F6F;
                    font-size:12px;
                    padding-right:0.2rem;
                }
                .phone{
                    float:right;
                    margin-right:0.1rem;
                    color:#333;
                    font-size:12px;
                }
                .code{
                    float:right;
                    margin-right:0.1rem;
                    color:#B1B1B1;
                    font-size:10px;
                    span{
                        font-size: 10px;
                    }
                }
                input{
                    margin-left:0.2rem;
                    border:none;
                    outline: none;
                    font-size:12px;
                    color:#333;
                }
                input::-webkit-input-placeholder {
                    color:#C1C1C1;
                    font-size:12px;
                }
                input:-moz-placeholder {
                    color:#C1C1C1;
                    font-size:12px;
                }
                input::-moz-placeholder {
                    color:#C1C1C1;
                    font-size:12px;
                }
                input:-ms-input-placeholder {
                    color:#C1C1C1;
                    font-size:12px;
                }
                .codeInp{
                    width:3rem;
                }
            }
            .infoList:last-child{
                border-bottom: none;
            }
        }
        .saves{
           width:100%;
           height:0.67rem;
           line-height:0.67rem;
            color:#fff;
            background:linear-gradient(70deg, #DC704A, #F44EA0);
            text-align: center;
            font-size:12px;
            position:fixed;
            bottom:1.2rem;
            left: 0;
        }
        .save{
            width:100%;
            height:1.2rem;
            line-height:1.2rem;
            text-align: center;
            position: fixed;
            left:0;
            right:0;
            bottom:0;
            border-top:1px solid #1A242E;
            background: #fff;
            font-size: 12px;
        }
         #captcha-box{
        width:100%;
        /*background: rgba(0, 0, 0, 0.1);*/
        border-radius: 5px;
        color: #454545;
        margin-bottom:30px;
        /*overflow: hidden;*/
    }
    }
}
</style>

