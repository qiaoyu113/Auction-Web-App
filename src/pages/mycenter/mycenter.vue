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
                    <img :src="picHead + imgler" :onerror="errorImg01"/>
                </div>
                <div class="boxHeaderRight">
                   <el-upload
                      class="avatar-uploader"
                      :action='imgurl'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-more avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <!--详细信息-->
            <div class="info">
                <div class="infoList">昵称  <span>{{user.name}}</span><div class="more" @click="changeName"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">性别  <span v-if="radio==1">男</span><span v-if="radio==2">女</span><span v-if="radio!=2&&radio!=1">未知</span><div class="more" @click="setsex"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">生日  
                <span><input type="text" name="start_date" id="start_date" v-model="startTime" placeholder="未提交" readonly="readonly" /></span>

                <div class="more">
                <img src="../../../src/assets/image/mycenter/more.png"/>
            
                </div></div>
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
             <div class="v_box" @click="heigmodal">
                 <el-radio v-model="radio" label="1">男</el-radio>
                 <el-radio v-model="radio" label="2">女</el-radio>
             </div>
        </div>  

<!-- <div style="margin: 50px;">
<input type="text" name="start_date" id="start_date" v-model="startTime" placeholder="选择开始日期" readonly="readonly" /> -->
<!--</div>-->
        <!--联系客服-->
        <div class="talk" @click="openService()">
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
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'

    // import LCalendar from '../../assets/js/lcalendar/js/lcalendar'
    import "../../assets/js/lcalendar/css/lcalendar.css"
    export default {
        data () {
            return {
                title: '传家',
                errorImg01: 'this.src="' + require('../../assets/image/mycenter/head.png') + '"',
                user:'',
                header:{
                    name:'PERSONAL SETTING',
                    name2:'个人设置'
                },
                inputName:'',//修改的名字
                hasPhone:true,//是否有手机号绑定
                radio:'1',
                startTime:'',
                // date: null,
                imgurl:'http://api.sundayauction.cn/files',
                imageUrl:'',
                imgler:'',
                ServiceBox:false,
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
            // common.onMove('.mycenter')
            this.getUsers()
            this.timeSelect();
        },
        watch:{
            radio:function(){
                this.sexPasswords()
            },
            startTime:function(){
                this.sexPasswords()
            }
        },
        methods: {
            timeSelect:function(){
          var calendar = new LCalendar();
          calendar.init({
            'trigger': '#start_date', //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
            'minDate': '1900-1-1', //最小日期
            'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
            });
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

           heigmodal:function(){
            this.$refs.modal.style.display="none"
           },
            Return:function(){
               this.$router.push({name:'personalCenter'})
            },
            //改变名字
            changeName:function(){
                let that = this;
                that.$router.push({name:'saveName',query:{id:that.user.id,name:that.user.name}})
            },
            realname:function(){
                this.$router.push({name:'realname'})
            },
            setsex:function(){
              this.$refs.modal.style.display="block"
            },
             handleAvatarSuccess(res, file) {
                this.imgler=res.datas.file
                this.sexPasswords()
                
                // this.imageUrl = URL.createObjectURL(file.raw);
             },
             beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;
            
             
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isLt2M;
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
                    that.imgler=that.user.headImg
                    let sex=that.user.sex
                    that.radio=sex + ''
                    that.startTime=that.user.birthday
              })
             },
             //修改性别
            sexPasswords:function(){
                 let that=this
              commonService.postUsersinfo({sex:that.radio,birthday:that.startTime,headImg:that.imgler}).then(function(res){

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
        // position: fixed;
        //   left: 0;
        //   right: 0;
        //   top: 0;
        //   overflow-x: scroll;
        //   bottom: 0;
        .talk{
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
            img{
                padding-top: 0.4rem;
                 width: 1rem;
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
                    width: 2.2rem;
                    // width:100%;
                    // height:100%;
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
                i{
                    font-size: @size20;
                    color: #a9aeb6;
                }
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
                position: relative;
                span{
                    color:#B1B1B1;
                    font-size:13px;
                    margin-left:0.8rem;
                }
                .more{
                    width: 1rem;
                    float:right;
                    margin-top:0.24rem;
                    img{
                        width: 0.5rem;
                        margin-top: 0.2rem;
                    }
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
                #start_date{
                   position: absolute;
                   left: 1.5rem;
                   top: 0rem;
                    width: 7.2rem;
                    height: 1rem;
                   background:transparent;
                   border: none;
                   font-size: 13px;
                  color: #B1B1B1;
                  //  text-align: center;
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

