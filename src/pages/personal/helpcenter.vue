<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 帮助中心 -->
    <div class="helpcenter" id="" v-set-title="title">
        
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>HELP</div>
                <div class="loginCn">帮助中心</div>
            </div>
            <div class="fr" @click="Return()">
            <img src="../../../src/assets/image/mycenter/right.png"/>
            </div>
           
        </div> 
        <!--按钮-->
            <div class="menu v_rost" >
              <div class="v_transverse">
                <div class='font' v-for="list in datas" :class="list.order==order ?'checked':''" @click="getIndex(list.order)" >{{list.title}}</div>
                </div>
                
            </div>
        <div class="text" v-for="lists in datas" v-if="lists.order==order">
            <div class="time">更新时间：{{lists.createTime | stampFormate2}}</div>
         <!--    <div class="box">
                <div class="tit">保证金说明</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守</p>
            </div> -->
            <div class="box" v-html="lists.content">

         <!--        <div class="tit">1.保证金金额</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                </p> -->
            </div>
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
                // index:3,
                datas:'',
                order:1,
            }
        },
        components:{},
        
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
            common.onMove('.helpcenter')
            common.onMove2('.v_transverse')
           this.getDoctype()
           this.orderroute()
        },
        methods: {
            orderroute:function(){
                let index=this.$route.query.index
                console.log(index)
                if(index!=null || index!= undefined){
                   this.order=index
                }
          

            },
            Return:function(){
                window.history.go(-1)
            },
            getIndex:function(index){
                let that = this;
                that.order=index
         
            },
               // 获取帮助信息
            getDoctype:function(){
                let that = this;
                  commonService.getDoctype({type:1}).then(function(res){
                    if(res.data.code==200){
                      that.datas=res.data.datas
                    }
                  
                 }) 
            },


        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .helpcenter{
           position: fixed;
          left: 0;
          right: 0;
          top: 0;
          overflow-x: scroll;
          bottom: 0;
    .content{
        width:100%;
        height:3.7rem;
        // border-bottom:2px solid #353535;
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
    
        
    }   
     .menu{
            height:0.6rem;
            line-height:0.6rem;
            width: 9rem;
            // margin: 0 0.5rem;
            overflow-x: scroll;
            // position: absolute;
            // bottom:1px;
            // box-sizing: border-box;
            padding:0 0.5rem 2px 0.5rem;
            border-bottom:2px solid #353535;
            position: relative;
              
              .v_transverse{
                margin-left: 0.5rem;
                 width: 20rem;
                 position: absolute;
                 left: 0;
                 right: 0;
                  top: 0;
                 overflow-x: scroll;
                  bottom: 0;
              }

            .font{
                color:rgb(153, 153, 153);
                float:left;
                box-sizing: border-box;
                
                font-size: @size10;
                margin-right: @size10;
            }
            .checked{
                color:#353535;
                border-bottom:2px solid #353535;
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
}
</style>

