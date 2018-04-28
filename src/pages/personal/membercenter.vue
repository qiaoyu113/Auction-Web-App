<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 帮助中心 -->
  <div class="v_membercenter">
    <div class="membercenter">
    
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox clearfix">
                <div class='loginEn '>MY ACCOUNT</div>
                <div class="loginCn ">会员中心</div>
            </div>
            <div class="fr" @click="Return()">
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
            <!--按钮-->
            <div class="menu">
                <div class='font' :class="index==1 ?'checked':''" @click="getIndex(1)">会员等级</div>
                <div class='font' :class="index==2 ?'checked':''" @click="getIndex(2)">会员规则</div>
            </div>
        </div>
        <!-- 会员等级 -->
        <div class="membox" v-if='index==1'>
            <div class="card">
               <img class="v_vip" v-if="user.vipLevel==1" src="../../assets/image/mycenter/v1_b.png" />
               <img class="v_vip" v-if="user.vipLevel==2" src="../../assets/image/mycenter/v2_b.png" />
               <img class="v_vip" v-if="user.vipLevel==3" src="../../assets/image/mycenter/v3_b.png" />
               <img class="v_vip" v-if="user.vipLevel==4" src="../../assets/image/mycenter/v4_b.png" />
                <div class="box">
                    <div class="level" v-if="user.vipLevel==1">VIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==2">SVIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==3">SSVIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==4">SSSVIP<br><span>会员等级</span></div>
                    <div class="point">{{pointNum}}分<br><span>会员积分</span></div>
                    <div class="number">NO:{{user.vipNo}}</div>
                   <!--  <div class="star">
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==1"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==2"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==3"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==4"></i></div>
                    </div> -->
                </div>
            </div>
            <div class="bar" v-if="integral!=''" :class="integral==null?'v_bar':''">
                <div class="clearfix" >
                    <div class="box fl">
                        <div class="progress" :style="'width:'+ width + ';' + 'background: linear-gradient(to right,'+colorValue1+','+ colorValue2 +');'"></div>
                    </div>
                    <div class="fr" v-if="user.vipLevel==1">SVIP</div>
                    <div class="fr" v-if="user.vipLevel==2">SSVIP</div>
                    <div class="fr" v-if="user.vipLevel==3">SSSVIP</div>
                </div>            
                <p class="warn">在累计{{integral}}分即可升级</p>
            </div>
            <div class="bar" v-if="integral==''" :class="integral==null?'v_bar':''">
                <p class="warn">恭喜您！您已是顶级会员了哟～～～</p>      
                <p class="warn">更多会员权益敬请期待！</p>
            </div>

            <div class="pointDetail">
                <div class="tit">积分明细</div>
                <div class="record" v-for="list in records">
                  <div class="fl">{{list.name}}</div>{{list.num}}<div class="fr" v-if="list.getTime!=null">{{list.getTime | stampFormate2 }}</div>
                </div>
                <!-- <div class="record"><div class="fl">拍卖成交</div> +5 <div class="fr">2018.4.44 20:11:50</div></div> --> 
            </div>
        </div>
        <!-- 会员规则 -->
        <div class="text" v-if='index==2'>
            <div class="time" v-if="rule.updateTime!=null">更新时间：{{rule.updateTime | stampFormate2}}</div>
            <div v-html='rule.content'>
        <!--         <div class="tit">保证金说明</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守</p> -->
            </div>
        <!--     <div class="box">
                <div class="tit">1.保证金金额</div>
                <div class="txt" v-html='rule'>
                为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                </div>
            </div> -->
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
  </div>
</template>

<script >
    import MeScroll from 'mescroll'
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
               
                index:1,
                user:'',
                records:'',
                pointNum:'',//会员积分
                integral:null,//再次升级所需的积分
                width:'',
                colorValue1:'',
                colorValue2:'',
                rule:'',//规则
                ServiceBox:false,
                page:{num:1,size:10},
                isShowNoMore:false,
                totalPage:'',
                myList:[],
            }
        },
        components:{},
        mounted: function() {
            document.body.addEventListener('touchmove', function (event) {
            // if (!evt._isScroller) {
                event.returnValue = true;
            // }
           },false)
          
            this.getUsers()
            this.getPoint()
            this.getDoctype()

            
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
            Return:function(){
              window.history.go(-1)
            },
            getIndex:function(index){
                let that = this;
                if(index === 1){
                    that.index = 1;
                }else if(index==2){
                    that.index = 2;
                }
            },
            // 获取会员信息
             getUsers:function(){
                let that=this
                 commonService.getUsers().then(function(res){
                    that.user=res.data.datas.user
                    that.pointNum=res.data.datas.user.numItem.pointNum
                    
                    if(that.user.vipLevel == 1){
                       that.colorValue1='#e3864f'
                       that.colorValue2='#df575d'
                    }else  if(that.user.vipLevel == 2){
                       that.colorValue1='#4ac7af'
                       that.colorValue2='#3c8eda'
                    }else  if(that.user.vipLevel == 3){
                       that.colorValue1='#a43f69'
                       that.colorValue2='#4b0b44'
                    }
                    if(res.data.code==200){
                        that.getVip(that.user.vipLevel)
                    }
              })
             },
             // 获取积分等级
             getVip:function(level){
                let that=this
                 commonService.getVip(level+1).then(function(res){

                    if(res.data.datas!=null){
                      that.integral=res.data.datas.pointNum - that.pointNum
                    that.width=that.pointNum / res.data.datas.pointNum * 100+ '%'
                   
                    }else{
                        that.integral=''
                    }
              })
             },
              //获取积分明细
             getPoint:function(){
                let that=this
                 commonService.getPoint({pageNo:1,pageSize:100}).then(function(res){
                   that.records=res.data.datas.datas
              })
             },
             // 获取会员规则
              getDoctype:function(){
                let that=this
                 commonService.getDoctype({type:2}).then(function(res){
              
                  that.rule=res.data.datas

              })
             },
  
          

        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    @import url("../../assets/css/common/mescroll.min.css");
  .v_membercenter{
    .membercenter{
            // width:100%;
            // max-width:10rem;
            // position: fixed;
            // top: 0;
            // bottom:0;
            // left:0;
            // right:0;
            // overflow-y: scroll;
            // -webkit-overflow-scrolling:touch;
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
      
        width:100%;
        height:3.7rem;
        border-bottom:2px solid rgb(53, 60, 70);
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        .loginBox{
            width:80%;
            float:left;
            .loginEn{
                height:24px;
                font-weight: bold;
                line-height: 24px;
                font-size:14px;
            }
            .loginCn{
                font-size: 12px;
            }
            
        }
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
            img{
                width: 0.8rem;
                margin-top: 0.8rem;
            }
        }
        .menu{
            height:0.6rem;
            line-height:0.6rem;
            position: absolute;
            bottom:2px;
            box-sizing: border-box;
            .font{
                color:rgb(153, 153, 153);
                float:left;
                box-sizing: border-box;
                padding-left: @size2;
                padding-right: @size2;
                font-size: 12px;
                margin-right: @size20;
            }
            .checked{
                color:#353535;
                border-bottom:3px solid rgb(53, 60, 70);
            }
        }
        
    }
    .text{
        padding: 0 @size20;
        .time{
            text-align: right;
            margin: @size40 0 @size20 0;

            font-size: @size10;
        }
        .box{
            padding-top: @size20;
            .tit{
                font-size: @size12;
            }
            .txt{
                font-size: @size11;
                color: rgb(153, 153, 153);
            }
        }
    }
    .membox{
        padding: 0 @size10;
        // margin-bottom: 1rem;
        .card{
            margin: @size20 @size10;
            width: 8.9333rem;
            height: 4.5333rem;
            // background: rgb(55, 59, 70);
            border-radius: @size5;
            position: relative;
            .v_vip{
                position: absolute;
                left: 0;
                top:0;
                width: 8.9333rem;
                height: 4.5333rem;
            }
            .box{
                position: relative;
                width: 100%;
                height: 100%;
                .level{
                    text-align: right;
                    color: white;
                    font-weight: bold;
                    font-size: @size14;
                    span{
                        color: white;
                        font-size: @size10;
                        font-weight: lighter;
                    }
                    position: absolute;
                    right: 0.6rem;
                    top: 0.6rem;
                }
                .point{
                    text-align: right;
                    color: white;
                    font-weight: bold;
                    font-size: @size14;
                    position: absolute;
                    right: 0.6rem;
                    bottom: 0.6rem;
                    span{
                        color: white;
                        font-size: @size10;
                        font-weight: lighter;
                    }
                }
                .number{
                    font-size:@size10;
                    color: white;
                    position: absolute;
                    left: 0.6rem;
                    bottom: 0.6rem;
                }
                .star{
                    color: white;
                    position: absolute;
                    top: 0.6rem;
                    left: 0.6rem;
                    i{

                    }
                }
            }
        }
        .bar{
            padding:@size5 @size10;
            padding-bottom: @size20;
            border-bottom:1px solid rgb(153, 153, 153); 
            .box{
                float: left;
                width: @size300;
                height: @size10;
                background: #d9d9d9;
                border-radius: @size10;
                .progress{
                   
                   height: @size10;
                   border-radius: @size10 0 0 @size10;
                    
                }
            }
            .fr{
                height: @size10;
                font-size: @size10;
                line-height: @size10;
            }
            .warn{
                font-size: @size10;
                text-align: left;
                line-height: @size10;
                padding-top: @size5;
            
            }
        }
        .v_bar{
            .box{
                display: none;
            }
            .fr{
                 color: #fff;
            }
          .warn{
            color:#fff;
          }

        }
        .pointDetail{
            padding-left: @size10;
            // min-height: 1000px;
            .tit{
                height: @size40;
                text-align: left;
                font-size: @size12;
                line-height: @size40;
                
            }
            .record{
                border-top: 1px solid rgb(202, 209, 217);
                font-size: @size10;
                height: @size30;
                line-height: @size30;
                text-align: center;
                color: rgb(51, 51, 51);
                .fl{
                    width: 1.6rem;
                    text-align: left;
                }
                div{
                    font-size: @size10;
                    line-height: @size30;
                }
            }
        }
    }
}
}

</style>

