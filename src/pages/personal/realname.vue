<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 实名认证 -->
    <div :class="shadow" class="realname" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>AUTHENTICANTION</div>
                <div class="loginCn">实名认证</div>
            </div>
        </div>
        <!-- 认证下部 -->
        <div class="box1">
            <div class="service"><span>实名认证能获得更多特权，赶快来认证吧</span></div>
            <!--认证-->
            <div class="info"><span>真实姓名</span>
                <input type="" placeholder="请输入真实姓名" v-model="name"/>
                <div class="infoClose" @click='removeName'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>身份证号</span>
                <input type="" placeholder="请输入18位证件号码" v-model="namecard"/>
                <div class="infoClose" @click='removeNamecard'><i class="iconfont icon-closeicon"></i></div>
            </div>
            <!--正反面照-->
            <div class="picbox clearfix">
                <div class="z-pic fl">
                    <el-upload
                      class="avatar-uploader"
                      :action='pingjie'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                <div class="hig" v-if="authFrontPic!=''" @click="shuchu()"><i class="iconfont icon-closeicon"></i></div>
                  <p>身份证正面照</p>
                    <!-- <div class="img"><img src="../../assets/image/myimage/pic.png" alt=""></div> -->
                </div>
                <div class="z-pic fl">
                  <!-- <i class="iconfont icon-tupian"></i> -->
                     <el-upload
                      class="avatar-uploader"
                      :action='pingjie'
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload2">
                      <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                <div class="hig" v-if="authBackPic!=''" @click="shuchu2()"><i class="iconfont icon-closeicon"></i></div>
                  <p>身份证背面照</p>
                    <!-- <div class="img"><img src="../../assets/image/myimage/pic.png" alt=""></div> -->
                </div>
            </div>
            <div class="sample" @click="show">照片样例</div>
            <div class="hit">
                <p>1.每日只可验证<span>三次</span>，如有问题 <a href="">联系客服</a>。 </p>
                <p>2.请手持相关证件，要求手持证件正面及背面的照片。</p>
                <p>3.手持证件照必须是正面头部照。</p>
                <p>4.必须看清证件号且证件号不被遮挡。</p>
                <p>5.照片支持jpg,jpeg,bmp格式，照片大小不超过2M。</p>
                <p>6.您提供的信息我们将会严格为您保密。</p>
            </div>
            <!--登陆和提示-->
            <div class="bottom">
                <div class="wrong">密码错误</div>
                <div class="log" @click="submit">确认认证</div>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="shadow" :class="dis">
        <div class="popWin">
                <div class="close" @click="close"><i class="iconfont icon-closeicon"></i></div>
                <div class="remove">
                    <p class="removeEn">ID PHOTOS</p>
                    <p class="removeCn">照片样例</p>
                    <p class="removeCon">请保持照片清晰，方便审核</p>
                </div>
                <div class="picbox clearfix">
                    <div class="pic"><img v-if="imageUrl" :src="imageUrl"></div>
                     <div class="pic"><img v-if="imageUrl2" :src="imageUrl2"></div>
                </div>
                <div class="font">
                    <span>1.证件正面照</span>
                    <span>2.证件背面照</span>
                </div>
        </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
   import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                url:'',
                title: '实名认证',
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
              return "http://api.sundayauction.cn/files/base64?base64Img="+this.base+"&width="+this.width+"&height="+this.height

            }
        },
        mounted: function() {
            // this.shuchu()
            // this.getAuths()
        },
        methods: {
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
            removeNamecard:function(){
                let that = this;
                that.namecard = ''
            },
            // 获取实名认证信息
            getAuths:function(){
               commonService.getAuths().then(function(res){
                    console.log(res)  
                    })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
             },
           beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
         
            var reader = new FileReader();
            var that = this;
             reader.readAsDataURL(file);
            reader.onload = function(e){
            var img = new Image();
              // console.log(this.result)
              that.base=this.result
              that.base=that.base.split(',')[1];  
              that.base=window.atob(that.base);  
              var ia = new Uint8Array(that.base.length);  
              for (var i = 0; i < that.base.length; i++) {  
                ia[i] = that.base.charCodeAt(i);  
              };  
              var blob=new Blob([ia], {type:"image/png"});  
              var formdata=new FormData();
              that.base=formdata
            img.src = e.target.result;
            img.onload = function(){
                that.width=this.width
                that.height=this.height
    commonService.postBase({base64Img:that.base,width:this.width,height:this.height}).then(function(res){
                    console.log(res)
                    if(res.data.code==200){
                    that.authFrontPic=res.data.datas
                    }
                    // that.url='http://test.resource.vjuzhen.com/'+ res.data.datas
           })
               }
            }
            // if (!isJPG) {
            //      this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
          },
          handleAvatarSuccess2(res, file) {
                this.imageUrl2 = URL.createObjectURL(file.raw);
             },
           beforeAvatarUpload2(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
         
            var reader = new FileReader();
            var that = this;
             reader.readAsDataURL(file);
            reader.onload = function(e){
            var img = new Image();
              // console.log(this.result)
              that.base=this.result
              that.base=that.base.split(',')[1];  
              that.base=window.atob(that.base);  
              var ia = new Uint8Array(that.base.length);  
              for (var i = 0; i < that.base.length; i++) {  
                ia[i] = that.base.charCodeAt(i);  
              };  
              var blob=new Blob([ia], {type:"image/png"});  
              var formdata=new FormData();
              that.base=formdata
            img.src = e.target.result;
            img.onload = function(){
                that.width=this.width
                that.height=this.height
    commonService.postBase({base64Img:that.base,width:this.width,height:this.height}).then(function(res){
                    if(res.data.code==200){
                    that.authBackPic=res.data.datas
                    console.log(that.authBackPic)
                    }
                    // that.url='http://test.resource.vjuzhen.com/'+ res.data.datas
           })
               }
            }
            // if (!isJPG) {
            //      this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
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
            commonService.putAuths({authIdCard:that.namecard,authRealName:that.name,authFrontPic:that.authFrontPic,authBackPic:that.authBackPic}).then(function(res){
                console.log(res)
                  
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
                font-size:20px;
            }
            .loginCn{
                font-size: 15px;
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
                font-size: @size12;
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
                font-size: @size12;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: @size12;
                padding-top: @size1;
            }
        }
        .service{
            width: 100%;
            text-align: center;
            span{
                font-size: 0.24rem;
                border-bottom: 1px solid #87828c;
                color: #87828c
            }
        }
        .picbox{
            margin-top: @size15;
            
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
                    z-index: 1;
                    height:@size115;
                    width: @size115;
                    img{
                        height:@size115;
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
                  .avatar-uploader .el-upload {
                    // border: 1px  #d9d9d9;
                    // border-radius: 6px;
                    cursor: pointer;
                    position: relative;
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
                    height: @size115;
                    display: block;
                  }
            }
        }
        .hit{
            margin:2.05rem 0; 
            p{
                font-size: @size10;
                padding-left: @size10;
                color: rgb(153, 153, 153);
                span{
                    font-size: @size10;
                    color: red;
                }
                a{
                    font-size: @size10;
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
    // 弹窗样式
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
                font-size: @size12;
            }
            .removeCon{
                color: #333333;
                font-size:@size12;
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
                font-size:@size11;
            }
        }
    }
}
</style>

