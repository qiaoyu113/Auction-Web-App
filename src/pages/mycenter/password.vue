<template>
    <div id="home" v-set-title="title">
        <div class="header">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight" @click="Return()">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <div class="box2">
            <!--原密码-->
            <div class="info">
                <div class="infoList">输入原密码<input type="password" placeholder="请输入" v-model="oldPassword"/><div class="del" @click="deleteName"><i class="iconfont icon-closeicon"></i></div></div>
            </div>
            <!--新密码-->
            <div class="info">
                <div class="infoList">请输新密码<input type="password" placeholder="请输入" v-model="newPassword"/><div class="del" @click="deleteName2"><i class="iconfont icon-closeicon"></i></div></div>
            </div>
            <!--新密码-->
            <div class="info">
                <div class="infoList">确认新密码<input type="password" placeholder="请输入" v-model="newPassword2" /><div class="del" @click="deleteName3"><i class="iconfont icon-closeicon"></i></div></div>
            </div>
            <div class="v_prompt" ref="v_prompt">{{prompt}}</div>
            <!--保存-->
            <div class="save" @click="putPasswords()">保存</div>
        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '个人中心',
                header:{
                    name:'PASSWORD',
                    name2:'密码设置'
                },
                prompt:'两次',
                oldPassword:'',//旧密码
                newPassword:'',//新密码
                newPassword2:''//确认新密码
            }
        },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
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
            Return:function(){
                window.history.go(-1)
            },
            deleteName:function(){
                let that = this;
                that.oldPassword = '';
            },
            deleteName2:function(){
                let that = this;
                that.newPassword = '';
            },
            deleteName3:function(){
                let that = this;
                that.newPassword2 = '';
            },
      
            //保存名字
            saveName:function(){
                let that = this;
                that.$router.go(-1);
            },
             putPasswords:function(){
                 let that=this
                  if(that.newPassword!=that.newPassword2){
                    that.prompt="两次密码不一致";
                     that.$refs.v_prompt.style.display = 'block';  
                setTimeout(() => {  
                       that.$refs.v_prompt.style.display = 'none';  
                   },2000)  
                     return false
                  }
    commonService.putPasswords({oldPassword:that.oldPassword,newPassword:that.newPassword}).then(function(res){
                    if(res.data.code == 200){
                     that.$router.go(-1);
                    }else{
                        that.prompt=res.data.message;
                     that.$refs.v_prompt.style.display = 'block';  
                setTimeout(() => {  
                       that.$refs.v_prompt.style.display = 'none';  
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
    .header{
        width:100%;
        height:3.7rem;
        border-bottom:1px solid #2B343D;
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
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
                font-size:13px;
                color:#333;
                span{
                    color:#B1B1B1;
                    font-size:13px;
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
                    font-size:13px;
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
                font-size:13px;
                color:#333;
                overflow: hidden;
                span{
                    color:#B1B1B1;
                    font-size:13px;
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
                    font-size:13px;
                    padding-right:0.2rem;
                }
                .del{
                    float:right;
                    margin-right:0.1rem;
                    color:#B1B1B1;
                }
                input{
                    width: 6rem;
                    margin-left:0.2rem;
                    border:none;
                    outline: none;
                    font-size:13px;
                }
            }
            .infoList:last-child{
                border-bottom: none;
            }
        }
        .v_prompt{
            display: none;
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 1.4rem;
          
                font-size: 14px;
                line-height: 20px;
                color: red;
                text-align: center;
            
        }
        .save{
            width:100%;
            height:1.4rem;
            line-height:1.4rem;
            text-align: center;
            position: fixed;
            left:0;
            right:0;
            bottom:0;
            border-top:1px solid #1A242E;
        }
    }
</style>

