<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 实名认证 -->
    <div :class="shadow" class="realname" id="" v-set-title="title">
         <div class="v_realname">
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>AUTHENTICANTION</div>
                <div class="loginCn">实名认证</div>
            </div>
            <div class="contentr" @click="Return()">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <!-- 认证下部 -->
        <div class="box1">
            <div class="service"><span>实名认证能获得更多特权，赶快来认证吧</span></div>
            <!--认证-->
            <div class="info"><span>真实姓名</span>
                <input type="text" v-if="rz.authStatus!=1" placeholder="请输入真实姓名" v-model="name"/>
                <div class="infoClose" v-if="rz.authStatus!=1&&name!=''" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
                <input type="text" v-if="rz.authStatus==1" placeholder="请输入真实姓名" disabled="disabled" v-model="name"/>
            </div>
            <div class="info"><span>身份证号</span>
                <input type="text" v-if="rz.authStatus!=1" placeholder="请输入18位证件号码" v-model="namecard"/>
                <div class="infoClose" v-if="rz.authStatus!=1&&namecard!=''" @click='removeNamecard'><i class="iconfont icon-closeicon"></i></div>
                 <input type="text" v-if="rz.authStatus==1" placeholder="请输入18位证件号码" disabled="disabled" v-model="namecard"/>
            </div>
            <!--正反面照-->
            <div class="picbox clearfix">
                <div class="z-pic fl">
                    <el-upload
                      class="avatar-uploader"
                      :action='imgurl'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <img class="v_iimg" src="../../assets/image/mycenter/zm.png" />
                      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                    </el-upload>
                <div class="hig" v-if="authFrontPic!=''" @click="shuchu()"><i class="iconfont icon-closeicon"></i></div>
                  <p>身份证正面照</p>
                    <div class="img" v-if="img1!=''"><img :src="img1" alt=""></div>
                </div>
                <div class="z-pic fl">
                  <!-- <i class="iconfont icon-tupian"></i> -->
                     <el-upload
                      class="avatar-uploader"
                      :action='imgurl'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload2">
                      <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                      <img class="v_iimg" src="../../assets/image/mycenter/bm.png" />
                      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                    </el-upload>
                <div class="hig" v-if="authBackPic!=''" @click="shuchu2()"><i class="iconfont icon-closeicon"></i></div>
                  <p>身份证背面照</p>
                    <div class="img" v-if="img2!=''"><img :src="img2" alt=""></div>
                </div>
            </div>
            <div class="sample" @click="show">照片样例</div>
            <div class="hit">
                <p>1.每日可实名认证<span>五次</span>，如有问题 <a href="tel:4001887107">联系客服</a>。 </p>
                <p>2.请手持相关证件，要求手持证件正面及背面的照片。</p>
                <p>3.手持证件照必须是正面头部照。</p>
                <p>4.必须看清证件号且证件号不被遮挡。</p>
                <p>5.照片支持jpg,jpeg,bmp格式，照片大小不超过5M。</p>
                <p>6.您提供的信息我们将会严格为您保密。</p>
            </div>
            <!--登陆和提示-->
         
        </div>  
        </div> 
        <div class="bottom">
                <div class="wrong" v-if="v_html!=''">{{v_html}}</div>
                <div class="wrong" v-if="prompt!=''&&v_html==''">{{prompt}}</div>
                <div class="log" @click="submit" v-if="rz.authStatus!=1 && rz.authStatus!=3">确认认证</div>
                <div class="log log2" v-if="rz.authStatus==1">审核中</div>
                <div class="log" @click="submit" v-if="rz.authStatus==3">去认证</div>
            </div>
        <!-- 弹窗 -->
        <div class="shadow" :class="dis">
        <div class="popWin">
                <div class="close" @click="close"><i class="iconfont icon-closeicon"></i></div>
                <div class="remove">
                    <p class="removeEn">ID PHOTOS</p>
                    <p class="removeCn">照片样例</p>
                    <p class="removeCon">请保持照片清晰，以便审核</p>
                </div>
                <div class="picbox clearfix">
                    <div class="pic"><img src="../../assets/image/mycenter/authFrontPic.jpg"></div>
                    <div class="pic"><img src="../../assets/image/mycenter/authBackPic.jpg"></div>
                </div>
                <div class="font">
                    <span>1.证件正面照</span>
                    <span>2.证件背面照</span>
                </div>
        </div>
        </div>
         <div class="v_modaltou" ref="v_modaltou" v-if="v_modal">
           <div class="v_box">
                  <div class="v_box_top" @click="heigorder()"><i class="iconfont icon-closeicon"></i></div>
                 <p class="v_box_p">FAIL</p>

                 <p>认证失败</p>
                 <p  class="v_box_img">{{fail}}</p>
                 <!-- <div><img src="../../assets/image/mycenter/scy.png" /></div> -->
                 <div class="v_button" @click='heigorder()'> 
                     确定
                 </div>
           </div>
        </div>
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
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:4001887107">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:4001887107">
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

<script >
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
   import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                url:'',
                title: '茗探',
                dis:'dis',
                shadow:'shadow',
                name:'',
                namecard:'',
                imageUrl:'',
                imageUrl2:'',
                base:'',
                height:'',
                width:'',
                authFrontPic:'',//正面照片
                authBackPic:'',//方面照片
                prompt:'',//提示文字
                img1:'',
                img2:'',
                rz:'',
                imgurl:'http://api.dimanche.net.cn/files',
                ServiceBox:false,
                v_modal:false,
                fail:'',
                v_html:'',
            }
        },
        components:{
           
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
             pingjie(){
              return "http://api.dimanche.net.cn/files/base64?base64Img="+this.base+"&width="+this.width+"&height="+this.height
            },
            picHead() {
                return this.$store.state.picHead
            },

        },
        mounted: function() {
            // this.shuchu()
            
            common.onMove('.v_realname')
            this.getAuths()
         
        },
        methods: {
            // 取消删除
            heigorder:function(){
                   this.v_modal=false
                   
            },
            // 删除订单
            deleteorder:function(){
                this.v_modal=true
                
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
            close:function() {
                this.dis='dis';
            },
            show:function(){
                this.dis=''
            },
            removeName:function(){
                let that = this;
                that.name = ''
            },
            Return:function(){
                window.history.go(-1)
            },
            removeNamecard:function(){
                let that = this;
                that.namecard = ''
            },
            // 获取实名认证信息
            getAuths:function(){
                let that=this
               commonService.getAuths().then(function(res){
                    if(res.data.datas!=null){
                        that.rz=res.data.datas
                        if(that.rz.authStatus==3){
                             // that.prompt="认证失败，" + that.rz.varifyContent
                               that.fail=that.rz.varifyContent
                               that.deleteorder()
                              that.name=''
                              that.namecard=''
                              that.authFrontPic=''
                              that.authBackPic=''
                        }else if(that.rz.authStatus==1){
                        that.name=that.rz.authRealName
                        that.namecard=that.rz.authIdCard
                        that.img1=that.picHead + that.rz.authFrontPic
                        that.img2=that.picHead + that.rz.authBackPic
                        that.prompt='实名认证审核中！客服正进行资料审核，请耐心等待！'
                        }else{
                         that.name=that.rz.authRealName
                        that.namecard=that.rz.authIdCard
                        that.img1=that.picHead + that.rz.authFrontPic
                        that.img2=that.picHead + that.rz.authBackPic   

                        }
                    }
                    })
            },
            handleAvatarSuccess(res, file) {
                
                this.authFrontPic=res.datas.file
                this.imageUrl = URL.createObjectURL(file.raw);
             },
           beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpg';
            const isJPG2 = file.type === 'image/jpeg';
            const isJPG3 = file.type === 'image/png';
            const isJPG4 = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 5;
       
         
            // var reader = new FileReader();
            // var that = this;
             // reader.readAsDataURL(file);
      
   
    //         reader.onload = function(e){
    //         var img = new Image();
    //          
    //           that.base=this.result
    //           that.base=that.base.split(',')[1];  
    //           that.base=window.atob(that.base);  
    //           var ia = new Uint8Array(that.base.length);  
    //           for (var i = 0; i < that.base.length; i++) {  
    //             ia[i] = that.base.charCodeAt(i);  
    //           };  
    //           var blob=new Blob([ia], {type:"image/png"});  
    //           var formdata=new FormData();
    //           that.base=formdata


    //         img.src = e.target.result;
    //         img.onload = function(){
    //             that.width=this.width
    //             that.height=this.height


    // commonService.postBase({base64Img:that.base,width:that.width,height:that.height}).then(function(res){
    //               
    //                 if(res.data.code==200){
    //                   that.authFrontPic=res.data.datas
    //                 }else{
    //                  that.prompt=res.data.message
    //                 }
    //                 // that.url='http://test.resource.vjuzhen.com/'+ res.data.datas
    //        })
    //            }
    //         }
            if (!isJPG && !isJPG2 && !isJPG3 && !isJPG4) {
                 this.v_html='上传图片只能是jpg、jpeg、png、bmp格式!';
                    setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
            }
            if (!isLt2M) {
              this.v_html='上传图片大小不能超过 5MB!';
              setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
            }
            return  (isJPG || isJPG2 || isJPG3 || isJPG4) && isLt2M;
          },
          handleAvatarSuccess2(res, file) {
                this.authBackPic=res.datas.file
                this.imageUrl2 = URL.createObjectURL(file.raw);
             },
           beforeAvatarUpload2(file) {
            const isJPG = file.type === 'image/jpg';
            const isJPG2 = file.type === 'image/jpeg';
            const isJPG3 = file.type === 'image/png';
            const isJPG4 = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 5;
            // var reader = new FileReader();
            // var that = this;
            //  reader.readAsDataURL(file);
    //         reader.onload = function(e){
    //         var img = new Image();
    //           that.base=this.result
    //           that.base=that.base.split(',')[1];  
    //           that.base=window.atob(that.base);  
    //           var ia = new Uint8Array(that.base.length);  
    //           for (var i = 0; i < that.base.length; i++) {  
    //             ia[i] = that.base.charCodeAt(i);  
    //           };  
    //           var blob=new Blob([ia], {type:"image/png"});  
    //           var formdata=new FormData();
    //           that.base=formdata
    //         img.src = e.target.result;
    //         img.onload = function(){
    //             that.width=this.width
    //             that.height=this.height
    // commonService.postBase({base64Img:that.base,width:this.width,height:this.height}).then(function(res){

    //                 if(res.data.code==200){
    //                 that.authBackPic=res.data.datas
    //                 }
    //                 // that.url='http://test.resource.vjuzhen.com/'+ res.data.datas
    //        })
    //            }
    //         }
            if (!isJPG && !isJPG2 && !isJPG3 && !isJPG4) {
                 this.v_html='上传图片只能是jpg、jpeg、png、bmp格式!';
                    setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
            }
            if (!isLt2M) {
              this.v_html='上传图片大小不能超过 5MB!';
              setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
            }
            return  (isJPG || isJPG2 || isJPG3 || isJPG4) && isLt2M;
          },
          shuchu:function(){

            this.imageUrl=''
            this.authFrontPic=''
          },
          shuchu2:function(){
            this.imageUrl2=''
            this.authBackPic=''
          },
       
          //提交
          submit:function(){
            let that=this;

            if(that.name==''){
                 that.v_html="真实姓名不能为空"
                  setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
                 
                 return false
            }
            if(that.namecard==''){
                 that.v_html="身份证号不能为空"
                 setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
                 return false
            }
            if(that.authFrontPic==''){
                that.v_html="身份证正面照不能为空"
                setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
                return false
            }
            if(that.authBackPic==''){
                that.v_html="身份证反面照不能为空"
                setTimeout(() => { 
                                    this.v_html = ''
                                      },2000) 
                return false
            }

            commonService.putAuths({authIdCard:that.namecard,authRealName:that.name,authFrontPic:that.authFrontPic,authBackPic:that.authBackPic}).then(function(res){
                       if(res.data.code==200){
                           that.getAuths()
                       }else{
                        that.v_html=res.data.message;
                        setTimeout(() => { 
                                    that.v_html = ''
                                      },2000) 
                       }
                    // that.url='http://test.resource.vjuzhen.com/'+ res.data.datas
            })
          },
 

        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .realname{
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
        .v_realname{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-y: scroll;
          bottom: 1.2rem;
    // .header{
    //     position: fixed;
    //     top: 0;
    //     z-index: 100;
    //     width: 10rem;
    //     height: @size45;
    //     background:rgba(2, 10, 2, 1);
    //     font-size: @size20;
    //     color: white;
    //     text-align: center;
    //     line-height: @size45;
    // }
    .content{
   
        width:100%;
        height:3.7rem;
        border-bottom:2px solid black;
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: bold;
                font-size:14px;
            }
            .loginCn{
                font-size: 12px;
            }
            
        }
        .contentr{
            float: right;
            margin-top: 0.3rem;
            img{
                width: 0.8rem;
                margin-top: 0.4rem;
            }
        }
        
    }
    .box1{
        width:100%;
        padding:0.3rem;
        box-sizing: border-box;
        .info{
            width: 100%;
            height: @size40;
            border-bottom: 1px solid #87828c;
            text-align: left;
            span{
                width: 2rem;
                line-height: 1.02rem;
                float: left;
                font-size: 12px;
                padding-left: @size10;
                padding-top: @size1;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                margin-top: 2px;
                line-height: 1rem;
                float: left;
                border: none;
                outline: none;
                background: #fff;
                font-size: 12px;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: 12px;
                padding-top: @size1;
            }
        }
        .service{
            width: 100%;
            text-align: center;
            height: 24px;
            border-bottom: 1px solid #87828c;
            span{
                font-size: 10px;
                border-bottom: 1px solid #87828c;
                color: #87828c
            }
        }
        .picbox{
            margin-top: @size25;
            
            .z-pic{
                position: relative;
                width: @size115;
                height: @size115;
                background: rgb(201, 209, 217);
                margin-left: @size40;
                text-align: center;
                position: relative;
                .img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    height:@size115;
                    width: @size115;
                    overflow: hidden;
                    img{
                        // height:@size115;
                        width: @size115;
                    }
                }
                .hig{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: @size20;
                    height: @size20;
                    font-size: @size20;
                    text-align: center;
                    line-height: @size20;
                    color:#fff;
                    background: #eb6100;
                }
                // i{
                //     display: inline-block;
                //     font-weight: 100;
                //     margin-top: @size20;
                //     font-size: @size50;
                //     color: white;

                // }
                p{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    color: white;
                    height: @size20;
                    line-height: @size20;
                    font-size: 10px;
                    background: #65686c;
                    text-align: center;
                    width: 100%;
                    z-index: 300;
                    // padding-top: @size10;
                    

                }
                .avatar-uploader .v_iimg{
                     width: 1.7066rem;
                     margin-top:@size30;
                }
                  .avatar-uploader .el-upload {
                    // border: 1px  #d9d9d9;
                    // border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                     width: @size115;
                    height: @size115;
                    overflow: hidden;
                  }
                  .avatar-uploader .el-upload:hover {
                    border-color: #409EFF;

                  }
                  .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: @size115;
                    height: @size115;
                    line-height: @size115;
                    text-align: center;
                  }
                  .avatar {
                    width: @size115;
                    // height: @size115;
                    display: block;
                  }
            }
        }
        .hit{
            margin:0.988rem 0; 
            p{
                font-size: 10px;
                padding-left: @size10;
                color: rgb(153, 153, 153);
                span{
                    font-size: 10px;
                    color: #eb6200;
                }
                a{
                    font-size: 10px;
                    color:#ec6c1a;
                    text-decoration: underline;
                }
            }
        }
    }
    .sample{
        text-align: right;
        margin-right: @size40;
        margin-top: @size10;
        font-size: 10px;
        color:#ec6c1a;
        text-decoration: underline;

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
            background: #fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: 12px;
        }
        .log2{
            color: #ccc;
        }
        .wrong{
            width: 100%;
            height: @size25;
            background:linear-gradient(30deg,#f54ea2 0%,#dd704c 100%);
            text-align: center;
            color:#fff;
            font-size: 10px;
            line-height: @size25;
        }
    }
    // 弹窗样式
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
    .shadow{
        width: 100%;
        height: 100%;
        background: rgba(2, 10, 2, 0.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99999;
    }
    .dis{
        display: none;
    }
    .popWin{
        position: absolute;
        z-index: 10;;
        bottom:3.7333rem;
        left: @size30;
        width:8.4rem;
        height: 8.9333rem;
        background: white;
        box-sizing: border-box;
        .close{
            position: absolute;
            right: 0;top: 0;
            width: @size30;
            height: @size30;
            background: #eb6100;
            i{
                font-size: @size30;
                color: white;
            }
        }
        .remove{
            padding-top: @size50;
            margin: auto;
            
            text-align: center;
            .removeEn{
                font-size: 14px;
                font-weight: bold;
            }
            .removeCn{
                color: #333333;
                font-size: 12px;
            }
            .removeCon{
                color: #333333;
                font-size:12px;
                padding: @size15;
            }
        }
        .picbox{
            margin: @size5;
            margin-top: @size30;
            width: 100%;
            box-sizing: border-box;
            .pic{
                box-sizing: border-box;
                margin-left: @size35;
                float: left;
                width: 2.6666rem;
                height: @size115;
                background: gray;
                border-radius: 4px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .font{
            padding:@size10 0.6rem;
            text-align: center;
            span{
                float: left;
                width: 50%;
                font-size:12px;
            }
        }
    }
}
</style>

