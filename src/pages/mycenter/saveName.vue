<template>
    <div id="home" class="saveName" v-set-title="title">
    <v-service></v-service>
        <div class="v_header">
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
            <!--修改昵称-->
            <div class="info">
                <div class="infoList">昵称<input type="text" placeholder="请输入昵称" v-model="inputName"/><div class="del" @click="deleteName" v-if="inputName!=''"><i class="iconfont icon-closeicon"></i></div></div>
            </div>
            <!--保存-->
            <div class="saves" v-if="htmlx!=''">{{htmlx}}</div>
            <div class="save" @click="postUsersinfo()">保 &nbsp; &nbsp; 存</div>
        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '茗探',
                user:{
                    name:'吴彦祖',
                    sex:'男',
                    birthday:'1989-01-01',
                    phone:'13038008888'
                },
                header:{
                    name:'USERNAME',
                    name2:'昵称设置'
                },
                inputName:'',//修改的名字
                htmlx:'',
            }
        },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            id() {
                return this.$route.query.id 
            },
        },
        mounted: function() {
             this.name()
        },
        methods: {
            name:function(){
                this.inputName=this.$route.query.name
            },
            Return:function(){
                window.history.go(-1)
            },
            deleteName:function(){
                let that = this;
                that.inputName = '';
            },
            postUsersinfo:function(){
                 let that=this
                  if(that.inputName==''){
                      that.htmlx='昵称不能为空'
                      setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                      return false
                  }
                  // ^[A-Za-z0-9\u4e00-\u9fa5]+$
                  let reg= /^[A-Za-z0-9\u4e00-\u9fa5]{1,32}$/
                  let flag=reg.test(that.inputName)
                    if(!flag){
                        this.htmlx="昵称限32个字符,不能有空格和特殊符号"
                        setTimeout(() => {  
                                 that.htmlx=''
                             },2000) 
                        return false
                    }

                
                 commonService.postUsersinfo({id:that.id,name:that.inputName}).then(function(res){
                    if(res.data.code == 200){
                      that.$router.push({path:"/mycenter"})
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
    .saveName{
    .v_header{
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
                margin-top: 0.4rem;
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
        .saves{
           width:100%;
           height:0.67rem;
           line-height:0.67rem;
            color:#fff;
            background:linear-gradient(70deg, #DC704A, #F44EA0);
            text-align: center;
            font-size:12px;
            position:fixed;
            left: 0;
            bottom:1.2rem;
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
            font-size: 12px;
        }
    }
}
</style>

