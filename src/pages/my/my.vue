<template>
    <div class="my">
      <!--  <div class="header"><div>传家</div></div> -->
        <div class="head clearfix"><div><router-link to="/my/notstart"><span :class="{'show':indexs==0}" @click="show(0)">未开始</span></router-link></div>
            <div><router-link to="/my/lot"><span :class="{'show':indexs==1}" @click="show(1)">参拍中</span></router-link></div>
             <div><router-link to="/my/already"><span :class="{'show':indexs==2}" @click="show(2)">已拍中</span></router-link></div>
            <div><router-link to="/my/not"><span :class="{'show':indexs==3}" @click="show(3)">未拍中</span></router-link></div>
        </div>
        <router-view></router-view>
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
        <z-footer ></z-footer>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title: '茗探',
                indexs:0,
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
        },
        mounted: function() {
             if(this.$route.path=="/my/notstart"){
                   this.indexs=0
             }else if(this.$route.path=="/my/lot"){
                   this.indexs=1
             }else if(this.$route.path=="/my/already"){
                   this.indexs=2
             }else if(this.$route.path=="/my/not"){
                   this.indexs=3
             }
        },
        methods: {
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
            show:function(id){

               this.indexs=id
            }

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .my{
      //   .header{
      //      height: @size45; 
      //       div{
      //   position: fixed;
      //   top: 0;
      //   z-index: 100;
      //   width: @size375;
      //   height: @size45;
      //   background:rgba(2, 10, 2, 1);
      //   font-size: @size20;
      //   color: white;
      //   text-align: center;
      //   line-height: @size45;
      //     }
      // }
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
        .head{
            width:100%;
            height: @size40;
            border-bottom: 1px solid rgb(53,60,70);
            padding-bottom: 1px;
            position: fixed;
            top:0;
            background:#fff;
            z-index:100;
            div{
                float:left;
                width: 25%;
                text-align: center;
                line-height: @size40;
                font-size:12px;
                p{
                    font-size:0.3733rem;
                    color: rgb(153,153,153);
                }
                .show{
                    color: #333333;
                    border-bottom: 2px solid #353c46;
                    height: 1.0667rem;
                    display: inline-block;
                    padding: 0 0.16rem;
                    font-size:12px;
                }
                span{
                    color: #999999;
                    font-size:12px;
                }
            }
        }

    }


</style>

