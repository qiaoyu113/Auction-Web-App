<template>
    <div id="home" v-set-title="title">
        <div class="header">
            <div class="headerLeft">
                <div class="headerEn">{{header.name}}</div>
                <div class="headerCh">{{header.name2}}</div>
            </div>
            <div class="headerRight">
                <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <!--主页-->
        <div class="box">
            <div class="boxHeader">
                <div class="boxHeaderLeft">
                    <img src="http://img0.imgtn.bdimg.com/it/u=3206453844,923580852&fm=27&gp=0.jpg"/>
                </div>
                <div class="boxHeaderRight">
                    <img src="../../../src/assets/image/mycenter/more.png"/>
                </div>
            </div>
            <!--详细信息-->
            <div class="info">
                <div class="infoList">昵称  <span>{{user.name}}</span><div class="more" @click="changeName"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">性别  <span>{{user.sex}}</span><div class="more"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">生日  <span>{{user.birthday}}</span><div class="more"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList">手机  <span v-if="hasPhone">{{user.phone}}</span><span v-if="!hasPhone">暂无绑定手机号</span><div class="more" @click="changePhone"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
            </div>
            <!--修改密码-->
            <div class="info">
                <div class="infoList">修改密码<div class="more" @click="changePass"><img src="../../../src/assets/image/mycenter/more.png"/></div></div>
                <div class="infoList"><i class="iconfont icon-weixin1"></i>微信绑定号<div class="goBind">去绑定</div></div>
            </div>
            <!--实名认证-->
            <div class="info">
                <div class="infoList">实名认证<div class="goBind">去认证</div></div>
            </div>
            <!--退出-->
            <div class="back">退出登陆</div>
        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title: '个人中心',
                user:{
                    name:'吴彦祖',
                    sex:'男',
                    birthday:'1989-01-01',
                    phone:'13038008888'
                },
                header:{
                    name:'PERSONAL SETTING',
                    name2:'个人设置'
                },
                inputName:'',//修改的名字
                hasPhone:true,//是否有手机号绑定
            }
        },
        syncData({store}) {
            /*基本规则
             * 所有不需要token的请求都放在这里
             * 这里不出现window，document等DOM元素
             * 这里获得的数据都要存储在store中
             * 写法如下
             * */
            const that = this;
            /*
             * 将所有的请求处理以数组放在promise中
             * that.data().data调用数据
             * */
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
        },
        mounted: function() {
            /*
             * 所有需要token的请求都放在这里
             * 可以使用DOM元素
             * 这里的数据可以放在data中
             * */


        },
        methods: {
            //改变名字
            changeName:function(){
                let that = this;
                that.$router.push({name:'saveName'})
            },
            //改电话号
            changePhone:function(){
                let that = this;
                if(that.hasPhone){
                    that.$router.push({name:'newPhone'})
                }else{
                    that.$router.push({name:'savePhone'})
                }
            },
            //改密码
            changePass:function(){
                let that = this;
                that.$router.push({name:'password'})
            }
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
</style>

