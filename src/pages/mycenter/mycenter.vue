<template>
    <div class="mycenter" v-set-title="title">
        <div class="headers">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight" @click="Return()">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <!--主页-->
        <div class="box">
            <div class="boxHeader">
                <div class="boxHeaderLeft">
                    <img :src="picHead + user.headImg" :onerror="errorImg01"/>
                </div>
                <div class="boxHeaderRight">
                    <img src="../../../src/assets/image/mycenter/more.png"/>
                </div>
            </div>
            <!--详细信息-->
            <div class="info">
                <div class="infoList">昵称  <span>{{user.name}}</span><div class="more" @click="changeName"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">性别  <span v-if="radio==1">男</span><span v-if="radio==2">女</span><span v-if="radio!=2&&radio!=1">未知</span><div class="more" @click="setsex"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">生日  <span>{{user.age}}</span><div class="more"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">手机  <span v-if="user.phone!=''">{{user.phone}}</span><span v-if="user.phone==''">暂无绑定手机号</span><div class="more" @click="changePhone"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
            </div>
            <!--修改密码-->
            <div class="info">
                <div class="infoList">修改密码<div class="more" @click="changePass"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList"><i class="iconfont icon-weixin1"></i>微信绑定号
                <div class="goBind" v-if="user.wxBind==true">已绑定</div>
                <div class="goBind" v-if="user.wxBind==null || user.wxBind==false" @click='wxlogins'>去绑定</div>
                </div>
            </div>
            <!--实名认证-->
            <div class="info">
                <div class="infoList">实名认证
                    <div class="goBind" @click="realname()" v-if="user.realNameStatus==0">去认证</div>
                    <div class="goBind" @click="realname()" v-if="user.realNameStatus==1">待审核</div>
                    <div class="goBind" v-if="user.realNameStatus==2">已认证</div>
                    <div class="goBind" @click="realname()" v-if="user.realNameStatus==3">认证失败</div>
                </div>
            </div>
            <!--退出-->
            <div class="back" @click="deleteTokens()">退出登陆</div>
        </div>
       <!-- 性别 -->
        <div class="v_modal" ref="modal">
             <div class="v_box">
                 <el-radio v-model="radio" label="1">男</el-radio>
                 <el-radio v-model="radio" label="2">女</el-radio>
             </div>
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
                title: '个人中心',
                errorImg01: 'this.src="' + require('../../assets/image/mycenter/head.png') + '"',
                user:'',
                header:{
                    name:'PERSONAL SETTING',
                    name2:'个人设置'
                },
                inputName:'',//修改的名字
                hasPhone:true,//是否有手机号绑定
                radio:'1',
            }
        },
        syncData({store}) {
            const that = this;
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
            picHead() {
                return this.$store.state.picHead
            },
        },

        mounted: function() {
            common.onMove('.mycenter')
            this.getUsers()
        },
        watch:{
            radio:function(){
                this.sexPasswords()
            }
        },
        methods: {
            Return:function(){
                window.history.go(-1)
            },
            //改变名字
            changeName:function(){
                let that = this;
                that.$router.push({name:'saveName',query:{id:that.user.id}})
            },
            realname:function(){
                this.$router.push({name:'realname'})
            },
            setsex:function(){
              this.$refs.modal.style.display="block"

            },
            //改电话号
            changePhone:function(){
                let that = this;
                if(that.hasPhone){
                    that.$router.push({name:'newPhone',query:{phone:that.user.phone}})
                }else{
                    that.$router.push({name:'savePhone'})
                }
            },
            //改密码
            changePass:function(){
                let that = this;
                that.$router.push({name:'password'})
            },
            // 获取用户信息
            getUsers:function(){
                let that=this
                 commonService.getUsers().then(function(res){
                    that.user=res.data.datas.user
                    let sex=that.user.sex
                    that.radio=sex + ''
                    // console.log(that.user)
              })
             },
             //修改性别
            sexPasswords:function(){
                 let that=this
  commonService.postUsersinfo({id:that.id,sex:that.radio}).then(function(res){
             
                that.$refs.modal.style.display="none"
              })
            },
             // 退出登录
             deleteTokens:function(){
                let that=this
                 commonService.deleteTokens().then(function(res){
                    if(res.data.code==200){
                        that.$router.push({name:'personalCenter'})
                    }
              })

             },
              //绑定微信登陆
            wxlogins:function(){
                let that = this;
                // that.wxShow = true;

               commonService.getWxpay({loginType:'WEIXIN',platform:'WXH5',jumpRouter:'wxlogins',wxscope:'snsapi_userinfo'}).then(function(res){
                   let code = res.data.code;
                   // return false
                   if(code === 200){
                       //获取静默授权地址成功
                       window.location.href = res.data.datas;
                   }
               })
            }
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .mycenter{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
    .headers{
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
    .v_modal{
        display: none;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        .v_box{
            width: 6rem;
            height: 3.4rem;
            background:#fff;
            border-right: 3px;
            margin-left: 2rem;
            margin-top: 4rem; 
            padding-top: 0.6rem;
            label{
                display: block;
                line-height: 1.4rem;
                margin-left: 1.4rem;
            }
        }
    }
}
</style>

