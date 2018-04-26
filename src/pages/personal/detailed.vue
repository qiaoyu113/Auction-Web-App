<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 保证金提现步骤 -->
    <!-- flag三种状态
    1.支付宝提现
    2.银行卡提现
    3.微信提现 
    index三种状1.填写信息 2.审核中 3.已完成
    -->
    <div class="detailed" v-set-title="title">
          <div class="contents">
            <div class="loginBox">
                <div class='loginEn'>PAYMENT HISTORY</div>
                <div class="loginCn">交易明细</div>
            </div>
            <div class="fr" @click="Return()">
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
        <div class="content">
      
            <!-- 已完成 -->
            <div>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">{{list.formNo}}</div>
                </div>
                <div class="info"><span>交易金额</span>
                    <div class="infoClose v_chu">{{list.flowAmount | money}} CNY
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose" v-if="list.createTime!=null">{{list.createTime | stampFormate2}}</div>
                </div>
                <div class="info"><span>交易种类</span>
                    <div class="infoClose">{{list.title}}</div>
                     <!-- <div class="infoClose" v-if="list.channelId=='OFFLINE_BANK'">提现</div> -->
                </div>
                <div class="info"><span>交易方式</span>
                    <div class="infoClose">
                    <span class="span2" v-if="list.channelId=='WX_JSAPI'">微信</span>
                    <span class="span2" v-if="list.channelId=='ALIPAY_WAP'">支付宝</span>
                    <span class="span2" v-if="list.channelId=='OFFLINE_BANK'">转账汇款</span>

                    </div>
                </div>
                <div class="info"><span>状态</span>
                    <div class="infoClose" v-if="list.flowStatus==10">已完成</div>
                    <div class="infoClose" v-if="list.flowStatus==11">已完成</div>
                    <div class="infoClose v_colorj" v-if="list.flowStatus==20">处理中</div>
                    <div class="infoClose" v-if="list.flowStatus==21">已完成</div>
                    <div class="infoClose v_colorj" v-if="list.flowStatus==22">处理中</div>
                    <div class="infoClose" v-if="list.flowStatus==23">交易关闭</div>
                    <div class="infoClose" v-if="list.flowStatus==30">交易关闭</div>
                    <div class="infoClose" v-if="list.flowStatus==31">交易关闭</div>
                    <div class="infoClose" v-if="list.flowStatus==32">交易关闭</div>
                    <div class="infoClose v_colorj" v-if="list.flowStatus==40">处理中</div>
                    <div class="infoClose" v-if="list.flowStatus==41">已完成</div>
                    <div class="infoClose" v-if="list.flowStatus==42">交易关闭</div>
                    <div class="infoClose v_colorj" v-if="list.flowStatus==50">处理中</div>
                    <div class="infoClose" v-if="list.flowStatus==51">已完成</div>
                    <div class="infoClose v_colorj" v-if="list.flowStatus==52">处理中</div>
                    <div class="infoClose" v-if="list.flowStatus==53">交易关闭</div>

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
import {card} from '../../assets/js/common/card'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          title:'茗探',
          list:'',
          card:'',
           ServiceBox:false,

      }
    },
    components: {},
    mounted () {
       
       common.onMove('.detailed')
        this.getForms()
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
        
     
             getForms:function(){
                let that = this;
                let oddNumbers=this.$route.query.id
                 commonService.getBailsid(oddNumbers).then(function(res){
                    that.list=res.data.datas
                    that.card=card.bankCardAttribution(that.list.userBankCardNo)
                    
                 })
            },
         
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
  .detailed{
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
    .contents{
        // margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid #353535;
        padding:1.07rem @size20;
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
        .fr{
            font-weight: bold;
            letter-spacing: @size3;
            font-size: @size20;
            img{
                width: 0.8rem;
                margin-top: 0.9rem;
            }
        }
    }
    .content{
    
    
        margin-bottom: 1.2rem;
        padding: 0 @size10;
      
        .info{
            width: 100%;
            height: @size40;
            border-bottom: 1px solid rgb(202, 209, 217);
            margin-left: @size10;
            text-align: left;
            span{
                width: 2rem;
                line-height: 1.02rem;
                float: left;
                font-size: 12px;
                // padding-left: @size10;
                padding-top: @size1;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                height: 1rem;
                float: left;
                border: none;
                outline: none;
                font-size: 12px;
                background: #fff;
            }
            .v_chu{
                font-weight: 700;
            }
            .infoClose{
                float: right;
                color:rgb(51, 51, 51);
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: 12px;
                padding-top: @size1;
                box-sizing: border-box;
              
                img{
                    height: 1rem;
                }
                .span1{
                    font-size: 12px;
                    font-weight: bold;
                    color: black;
                }
                .span2{
                    width: 3rem;
                    display: inline-block;
                    line-height: @size14;
                    font-size:12px;
                    text-align: right;
                    line-height: 1.02rem;
                    // padding-top: @size6;
    
                }
                
            }
            .v_colorj{
                color:#eb6200;
            }
            .infomore{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                font-size: @size12;
                padding-top: @size1;
                box-sizing: border-box;
                margin-right: 0.1rem;
                .more{
                    font-weight: bold;
                    letter-spacing: @size3;
                    text-align: right;
                    line-height: @size35;
                }
            }
        }
    }

  }
    
    
</style>

