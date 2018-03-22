<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 帮助中心 -->
    <div class="membercenter" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox clearfix">
                <div class='loginEn '>MY ACCOUNT</div>
                <div class="loginCn ">会员中心</div>
            </div>
            <div class="fr" @click="Return()">...</div>
            <!--按钮-->
            <div class="menu">
                <div class='font' :class="index==1 ?'checked':''" @click="getIndex(1)">会员等级</div>
                <div class='font' :class="index==2 ?'checked':''" @click="getIndex(2)">会员规则</div>
            </div>
        </div>
        <!-- 会员等级 -->
        <div class="membox" v-if='index==1'>
            <div class="card">
                <div class="box">
                    <div class="level" v-if="user.vipLevel==1">VIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==2">SVIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==3">SSVIP<br><span>会员等级</span></div>
                    <div class="level" v-if="user.vipLevel==4">SSSVIP<br><span>会员等级</span></div>
                    <div class="point">{{pointNum}}分<br><span>会员积分</span></div>
                    <div class="number">NO:{{user.vipNo}}</div>
                    <div class="star">
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==1"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==2"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==3"></i></div>
                        <div><i class="iconfont icon-xianxingxing" v-if="user.vipLevel==4"></i></div>
                    </div>
                </div>
            </div>
            <div class="bar" v-if="integral!=''">
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
            <div class="bar" v-if="integral==''">
                <p class="warn">恭喜您！您已是顶级会员了哟～～～</p>      
                <p class="warn">更多会员权益敬请期待！</p>
            </div>

            <div class="pointDetail">
                <div class="tit">积分明细</div>
                <div class="record" v-for="list in records"    >
                  <div class="fl">{{list.name}}</div>{{list.num}}<div class="fr" v-if="list.getTime!=null">{{list.getTime | stampFormate2 }}</div></div>
                <!-- <div class="record"><div class="fl">拍卖成交</div> +5 <div class="fr">2018.4.44 20:11:50</div></div> --> 
            </div>
        </div>
        <!-- 会员规则 -->
        <div class="text" v-if='index==2'>
            <div class="time">更新时间：{{rule.createTime | stampFormate2}}</div>
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
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import {common} from '../../assets/js/common/common'
    import {commonService} from '../../service/commonService.js'
    export default {
        data () {
            return {
                title: '传家',
                index:1,
                user:'',
                records:'',
                pointNum:'',//会员积分
                integral:'',//再次升级所需的积分
                width:'',
                colorValue1:'',
                colorValue2:'',
                rule:'',//规则
            }
        },
        components:{},
        mounted: function() {
            
            common.onMove('.membercenter')
            this.getUsers()
            this.getPoint()
            this.getDoctype()
        },
        methods: {
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
                    console.log(that.width)
                   
                    }
              })
             },
             // 获取积分明细
             getPoint:function(){
                let that=this
                 commonService.getPoint({pageNo:1,pageSize:30}).then(function(res){
                 that.records=res.data.datas.datas
              })
             },
             // 获取会员规则
              getDoctype:function(){
                let that=this
                 commonService.getDoctype({type:2}).then(function(res){
                  console.log(res)
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
    .membercenter{
        position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
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
        border-bottom:2px solid #353535;
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
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
        }
        .menu{
            height:0.6rem;
            line-height:0.6rem;
            position: absolute;
            bottom:1px;
            box-sizing: border-box;
            .font{
                color:rgb(153, 153, 153);
                float:left;
                box-sizing: border-box;
                padding-left: @size2;
                padding-right: @size2;
                font-size: @size10;
                margin-right: @size20;
            }
            .checked{
                color:#353535;
                border-bottom:2px solid #353535;
            }
        }
        
    }
    .text{
        padding: 0 @size20;
        .time{
            text-align: right;
            margin-top: @size40;
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
        .card{
            margin: @size20 @size10;
            width: 8.9333rem;
            height: 4.5333rem;
            background: rgb(55, 59, 70);
            border-radius: @size5;
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
                padding-top: @size5
            }
        }
        .pointDetail{
            padding-left: @size10;
            .tit{
                height: @size40;
                text-align: left;
                font-size: @size12;
                line-height: @size40;
                
            }
            .record{
                border-top: 1px solid rgb(153, 153, 153);
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
</style>

