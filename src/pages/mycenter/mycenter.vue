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
                <!-- <div class="boxHeaderLeft">
                    <img :src="picHead + imgler" :onerror="errorImg01"/>
                </div> -->
             <!--    <div class="boxHeaderRight">
                   <el-upload
                      class="avatar-uploader"
                      :action='imgurl'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-more avatar-uploader-icon"></i>
                    </el-upload>
                </div> -->
                 <div id="demo"> 
                         <!-- 遮罩层 --> 
                     <div class="container" v-show="panel"> 
                      <div> 
                      <img id="image" :src="url" alt="Picture"> 
                      </div>
                      <button type="button" id="button" @click="crop">确定</button>
                     </div> 

                     <div class="clearfix"> 
                       <div class="show"> 
                        <div class="picture" :style="'backgroundImage:url('+headerImage+')'"> 
                        </div> 
                       </div>
                       <div class="v_show"> 
                        <img src="../../../src/assets/image/mycenter/more.png"/>
                        <input type="file" id="change" accept="image" @change="change"> 
                        <label for="change"></label> 
                       </div> 
                     </div> 
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
                <div class="infoList">密码重置<div class="more" @click="changePass"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList"><i class="iconfont icon-weixin1"></i>绑定微信号
                <div class="goBind" @click="deleteorderwx()" v-if="user.wxBind==true">去解绑</div>
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
            <div class="back" @click="deleteorder()">退出登录</div>
        </div>
       <!-- 性别 -->
        <div class="v_modal" ref="modal">
             <div class="v_box" @click="heigmodal">
                 <el-radio v-model="radio" label="1">男</el-radio>
                 <el-radio v-model="radio" label="2">女</el-radio>
             </div>
        </div>  

 <div class="v_modaltou" ref="v_modaltou" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="heigorder()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">QUIT</p>

                 <p>退出</p>
                 <p  class="v_box_img">是否退出当前登录?</p>
                 <!-- <div><img src="../../assets/image/mycenter/scy.png" /></div> -->
                 <div class="v_button" @click='deleteTokens()'> 
                     确定
                 </div>
           </div>
        </div>
        <div class="v_modaltou" ref="v_modaltou" v-if="v_modalwx">
           <div class="v_box">
                  <div class="v_box_top" @click="heigorderwx()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">UNDIND</p>

                 <p>解绑</p>
                 <p  class="v_box_img">是否解绑微信?</p>
                 <!-- <div><img src="../../assets/image/mycenter/scy.png" /></div> -->
                 <div class="v_button" @click='postUnbind()'> 
                     确定
                 </div>
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
    import Cropper from 'cropperjs'
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
                v_modal:false,
                v_modalwx:false,

                headerImage:'', 
                headerImageSrc:'',
                picValue:'', 
                cropper:'', 
                croppable:false, 
                panel:false, 
                url:'',
                width:'',
                height:'',
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

             var self = this; 
             var image = document.getElementById('image'); 
             this.cropper = new Cropper(image, { 
             aspectRatio: 1, 
             viewMode: 1, 
             background:false, 
             zoomable:false, 
             ready: function () { 
                  self.croppable = true; 
              } 
  });
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



          getObjectURL (file) { 
                    var url = null ;  
                    if (window.createObjectURL!=undefined) { // basic 
                     url = window.createObjectURL(file) ; 
                    } else if (window.URL!=undefined) { // mozilla(firefox) 
                     url = window.URL.createObjectURL(file) ; 
                    } else if (window.webkitURL!=undefined) { // webkit or chrome 
                     url = window.webkitURL.createObjectURL(file) ; 
                    } 
                    return url ; 
                   }, 
         change (e) { 
                       let files = e.target.files || e.dataTransfer.files; 
                       if (!files.length) return; 
                       this.panel = true; 
                       this.picValue = files[0]; 
                       this.url = this.getObjectURL(this.picValue); 
                         //每次替换图片要重新得到新的url 
                       if(this.cropper){ 
                        this.cropper.replace(this.url); 
                       } 
                       this.panel = true; 
                      }, 
              crop () { 
                      let that=this
                       this.panel = false; 
                       var croppedCanvas; 
                       var roundedCanvas; 
                       if (!this.croppable) { 
                        return; 
                       } 
                       croppedCanvas = this.cropper.getCroppedCanvas(); 
                   
                       roundedCanvas = this.getRoundedCanvas(croppedCanvas); 

                       this.headerImage = roundedCanvas.toDataURL(); 

              
            commonService.postBase({base64Img:that.headerImage,width:that.width,height:that.height}).then(function(res){
                    let img = res.data.datas;
               

                          commonService.postUsersinfo({sex:that.radio,birthday:that.startTime,headImg:img}).then(function(res){
                                    
                                        that.getUsers()
                                   })
                  
                })

                     }, 
              getRoundedCanvas (sourceCanvas) { 
                let that = this;
                      var canvas = document.createElement('canvas'); 
                      var context = canvas.getContext('2d'); 
                      var width = sourceCanvas.width; 
                      var height = sourceCanvas.height; 

                      that.width = 270;
                      that.height = 270;
                      canvas.width = that.width; 
                      canvas.height = that.height; 

                      context.imageSmoothingEnabled = true; 
                      context.drawImage(sourceCanvas, 0, 0, that.width, that.height); 
                      context.globalCompositeOperation = 'destination-in'; 
                      context.beginPath(); 
                      context.arc(that.width / 2, that.height / 2, Math.min(that.width, that.height) / 2, 0, 2 * Math.PI, true); 
                      context.fill(); 
                      return canvas; 
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
                    that.headerImage=that.picHead + that.user.headImg
                    console.log(that.headerImage)
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

            // 取消删除
            heigorder:function(){
                   this.v_modal=false
                   
            },
            // 删除订单
            deleteorder:function(){
                this.v_modal=true
                
            },

             // 退出登录
             deleteTokens:function(){
                let that=this
                 commonService.deleteTokens().then(function(res){
                    if(res.data.code==200){
                        that.v_modal=false
                        that.$router.push({name:'personalCenter'})

                    }
              })

             },
              // 取消解绑
            heigorderwx:function(){
                   this.v_modalwx=false
                   
            },
             // 解绑微信
            deleteorderwx:function(){
                this.v_modalwx=true
                
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
            },
            // 解绑微信
            postUnbind:function(){
                let that = this;
               commonService.postUnbind().then(function(res){
                 
                      if(res.data.code==200){
                         that.getUsers()
                          that.heigorderwx()
                    }
               })
            },
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
          overflow-y: scroll;
          bottom: 0;
        .talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #343c47;
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
                padding-top: 0.6rem;
                 width: 0.8rem;
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
                font-size:12px;
                color:#333;
                position: relative;
                span{
                    color:#B1B1B1;
                    font-size:12px;
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
                    font-size:12px;
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
                   font-size: 12px;
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
            font-size:12px;
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
                .del{
                    float:right;
                    margin-right:0.1rem;
                    color:#B1B1B1;
                }
                input{
                    margin-left:0.2rem;
                    border:none;
                    outline: none;
                    font-size:12px;
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
     .v_modaltou{
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background: rgba(0,0,0,0.5);
         
          
          .v_box{
            width: 6.5rem;
            height: 6.6rem;
            background: #fff;
            margin: 4rem auto 0; 
            position: relative;
            .v_box_top{
                 position: absolute;
                 right: 0;
                 top: 0;
                 width: @size30;
                 height: @size30;
                 background: #eb6100;
                 i{
                    font-size: @size30;
                    color:#fff;
                 }
            }
            .v_box_p{
                 padding-top: @size50;
                 font-size: 14px;
                 color: rgb(57, 57, 57);
                 font-weight: 700;
            }
            .v_box_img{
                 margin:@size24 0 @size14; 
                 width: 100%;
                 img{
                    width: @size40;
                    height: @size40;
                    margin-left: 2.72rem;
                 }
            }
            p{
                font-size: 14px;
                text-align: center;
                color: rgb(98, 98, 98);
                // padding:1rem 0.5rem;
                
            }
            .v_button{
               position: absolute;
               bottom: 0;
               left: 0;
               height: @size44;
               width: 100%;
               border-top:1px solid #353c47;
               text-align: center;
               line-height: @size44;
               font-size: 14px;
             }
          }

    }

 #demo #button { 
 position: absolute; 
 right: 10px; 
 top: 10px; 
 width: 80px; 
 height: 40px; 
 border:none; 
 border-radius: 5px; 
 background:white; 
}
#demo .show { 
  float: left;
 width: 2.2rem; 
 height: 2.2rem; 
 overflow: hidden; 
 position: relative; 
 border-radius: 50%; 
 border: 1px solid #d5d5d5; 
}
#demo .picture { 
 width: 2.2rem; 
 height: 2.2rem; 
 overflow: hidden; 
 background-position: center center; 
 background-repeat: no-repeat; 
 background-size: cover; 
}
#demo .v_show{
    float: right;
    margin-top: 0.6rem;
    width: 1rem;
     height: 1rem;
    overflow: hidden;
    position: relative;
    img{
        margin-top: 0.5rem;
        width: 0.5rem;
    }
    input{
        height: 1rem;
       position: absolute;
       left: 0;
       top: 0;
       opacity: 0;
    }

}
#demo .container { 
 z-index: 99; 
 position: fixed; 
 padding-top: 60px; 
 left: 0; 
 top: 0; 
 right: 0; 
 bottom: 0; 
 background:rgba(0,0,0,1); 
}
  
#demo #image { 
 max-width: 100%; 
} 
  
.cropper-view-box,.cropper-face { 
 border-radius: 50%; 
} 
/*! 
 * Cropper.js v1.0.0-rc 
 * https://github.com/fengyuanchen/cropperjs 
 * 
 * Copyright (c) 2017 Fengyuan Chen 
 * Released under the MIT license 
 * 
 * Date: 2017-03-25T12:02:21.062Z 
 */
  
.cropper-container { 
 font-size: 0; 
 line-height: 0; 
  
 position: relative; 
  
 -webkit-user-select: none; 
  
  -moz-user-select: none; 
  
  -ms-user-select: none; 
  
   user-select: none; 
  
 direction: ltr; 
 -ms-touch-action: none; 
  touch-action: none 
} 
  
.cropper-container img { 
 /* Avoid margin top issue (Occur only when margin-top <= -height) */
 display: block; 
 min-width: 0 !important; 
 max-width: none !important; 
 min-height: 0 !important; 
 max-height: none !important; 
 width: 100%; 
 height: 100%; 
 image-orientation: 0deg 
} 
  
.cropper-wrap-box, 
.cropper-canvas, 
.cropper-drag-box, 
.cropper-crop-box, 
.cropper-modal { 
 position: absolute; 
 top: 0; 
 right: 0; 
 bottom: 0; 
 left: 0; 
} 
  
.cropper-wrap-box { 
 overflow: hidden; 
} 
  
.cropper-drag-box { 
 opacity: 0; 
 background-color: #fff; 
} 
  
.cropper-modal { 
 opacity: .5; 
 background-color: #000; 
} 
  
.cropper-view-box { 
 display: block; 
 overflow: hidden; 
  
 width: 100%; 
 height: 100%; 
  
 outline: 1px solid #39f; 
 outline-color: rgba(51, 153, 255, 0.75); 
} 
  
.cropper-dashed { 
 position: absolute; 
  
 display: block; 
  
 opacity: .5; 
 border: 0 dashed #eee 
} 
  
.cropper-dashed.dashed-h { 
 top: 33.33333%; 
 left: 0; 
 width: 100%; 
 height: 33.33333%; 
 border-top-width: 1px; 
 border-bottom-width: 1px 
} 
  
.cropper-dashed.dashed-v { 
 top: 0; 
 left: 33.33333%; 
 width: 33.33333%; 
 height: 100%; 
 border-right-width: 1px; 
 border-left-width: 1px 
} 
  
.cropper-center { 
 position: absolute; 
 top: 50%; 
 left: 50%; 
  
 display: block; 
  
 width: 0; 
 height: 0; 
  
 opacity: .75 
} 
  
.cropper-center:before, 
 .cropper-center:after { 
 position: absolute; 
 display: block; 
 content: ' '; 
 background-color: #eee 
} 
  
.cropper-center:before { 
 top: 0; 
 left: -3px; 
 width: 7px; 
 height: 1px 
} 
  
.cropper-center:after { 
 top: -3px; 
 left: 0; 
 width: 1px; 
 height: 7px 
} 
  
.cropper-face, 
.cropper-line, 
.cropper-point { 
 position: absolute; 
  
 display: block; 
  
 width: 100%; 
 height: 100%; 
  
 opacity: .1; 
} 
  
.cropper-face { 
 top: 0; 
 left: 0; 
  
 background-color: #fff; 
} 
  
.cropper-line { 
 background-color: #39f 
} 
  
.cropper-line.line-e { 
 top: 0; 
 right: -3px; 
 width: 5px; 
 cursor: e-resize 
} 
  
.cropper-line.line-n { 
 top: -3px; 
 left: 0; 
 height: 5px; 
 cursor: n-resize 
} 
  
.cropper-line.line-w { 
 top: 0; 
 left: -3px; 
 width: 5px; 
 cursor: w-resize 
} 
  
.cropper-line.line-s { 
 bottom: -3px; 
 left: 0; 
 height: 5px; 
 cursor: s-resize 
} 
  
.cropper-point { 
 width: 5px; 
 height: 5px; 
  
 opacity: .75; 
 background-color: #39f 
} 
  
.cropper-point.point-e { 
 top: 50%; 
 right: -3px; 
 margin-top: -3px; 
 cursor: e-resize 
} 
  
.cropper-point.point-n { 
 top: -3px; 
 left: 50%; 
 margin-left: -3px; 
 cursor: n-resize 
} 
  
.cropper-point.point-w { 
 top: 50%; 
 left: -3px; 
 margin-top: -3px; 
 cursor: w-resize 
} 
  
.cropper-point.point-s { 
 bottom: -3px; 
 left: 50%; 
 margin-left: -3px; 
 cursor: s-resize 
} 
  
.cropper-point.point-ne { 
 top: -3px; 
 right: -3px; 
 cursor: ne-resize 
} 
  
.cropper-point.point-nw { 
 top: -3px; 
 left: -3px; 
 cursor: nw-resize 
} 
  
.cropper-point.point-sw { 
 bottom: -3px; 
 left: -3px; 
 cursor: sw-resize 
} 
  
.cropper-point.point-se { 
 right: -3px; 
 bottom: -3px; 
 width: 20px; 
 height: 20px; 
 cursor: se-resize; 
 opacity: 1 
} 
  
@media (min-width: 768px) { 
  
 .cropper-point.point-se { 
 width: 15px; 
 height: 15px 
 } 
} 
  
@media (min-width: 992px) { 
  
 .cropper-point.point-se { 
 width: 10px; 
 height: 10px 
 } 
} 
  
@media (min-width: 1200px) { 
  
 .cropper-point.point-se { 
 width: 5px; 
 height: 5px; 
 opacity: .75 
 } 
} 
  
.cropper-point.point-se:before { 
 position: absolute; 
 right: -50%; 
 bottom: -50%; 
 display: block; 
 width: 200%; 
 height: 200%; 
 content: ' '; 
 opacity: 0; 
 background-color: #39f 
} 
  
.cropper-invisible { 
 opacity: 0; 
} 
  
.cropper-bg { 
 background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC'); 
} 
  
.cropper-hide { 
 position: absolute; 
  
 display: block; 
  
 width: 0; 
 height: 0; 
} 
  
.cropper-hidden { 
 display: none !important; 
} 
  
.cropper-move { 
 cursor: move; 
} 
  
.cropper-crop { 
 cursor: crosshair; 
} 
  
.cropper-disabled .cropper-drag-box, 
.cropper-disabled .cropper-face, 
.cropper-disabled .cropper-line, 
.cropper-disabled .cropper-point { 
 cursor: not-allowed; 
} 
  

   
}
</style>

