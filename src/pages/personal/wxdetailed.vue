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
        
        <div class="content">
        <div class="contents">
            <div class="loginBox">
                <div class='loginEn'>PAYMENT HISTORY</div>
                <div class="loginCn">交易明细</div>
            </div>
            <div class="fr" @click="Return()">
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
        </div>
            <!-- 已完成 -->
            <div>
                <div class="info"><span>交易号</span>
                    <div class="infoClose">{{list.no}}</div>
                </div>
                <div class="info"><span>交易金额</span>
                    <div class="infoClose">{{list.amount | money}}CNY
                       </div>
                </div>
                <div class="info"><span>交易时间</span>
                    <div class="infoClose" v-if="list.applyTime!=null">{{list.applyTime | stampFormate2}}</div>
                </div>
                <div class="info"><span>交易种类</span>
                    <div class="infoClose">提现</div>
                     <!-- <div class="infoClose" v-if="list.channelId=='OFFLINE_BANK'">提现</div> -->
                </div>
                <div class="info"><span>交易方式</span>
                    <div class="infoClose">
                    <span class="span2" v-if="list.channelId=='WX_JSAPI'">微信</span>
                    <span class="span2" v-if="list.channelId=='ALIPAY_WAP'">支付宝</span>
                    <span class="span2" v-if="list.channelId=='OFFLINE_BANK'">银行卡</span>

                    </div>
                </div>
                <div class="info"><span>状态</span>
                    <div class="infoClose">交易关闭</div>
                  <!--   <div class="infoClose" v-if="list.status==1">提现中</div>
                    <div class="infoClose" v-if="list.status==2">交易关闭</div>
                    <div class="infoClose" v-if="list.status==3">交易失败</div> -->
                </div>
            </div>
        </div>
       
        
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

      }
    },
    components: {},
    mounted () {
       
       common.onMove('.detailed')
        this.getForms()
    },
    methods: {
           
      
            Return:function(){
               this.$router.push({path:"/myaccount"}) 
            },
        
     
             getForms:function(){
                let that = this;
                let oddNumbers=this.$route.query.id
                 commonService.getForms(oddNumbers).then(function(res){
                    that.list=res.data.datas
                    
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
 
    .content{
    	.contents{
        // margin-top: @size45;
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
            img{
                width: 1rem;
                margin-top: 1rem;
            }
        }
    }
    
        margin-bottom: 1.2rem;
        padding: 0 @size10;
      
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
                height: 1rem;
                float: left;
                border: none;
                outline: none;
                font-size: @size12;
                background: #fff;
            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
                font-size: @size12;
                padding-top: @size1;
                box-sizing: border-box;
                img{
                    height: 1rem;
                }
                .span1{
                    font-size: @size12;
                    font-weight: bold;
                    color: black;
                }
                .span2{
                    width: 3rem;
                    display: inline-block;
                    line-height: @size14;
                    font-size:@size10;
                    text-align: right;
                    line-height: 1.02rem;
                    // padding-top: @size6;
    
                }
                
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

