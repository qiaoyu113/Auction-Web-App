<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 帮助中心 -->
    <div class="helpcenter" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>HELP</div>
                <div class="loginCn">帮助中心</div>
            </div>
            <div class="fr" @click="Return()">...</div>
            <!--按钮-->
            <div class="menu">
                <div class='font' :class="index==1 ?'checked':''" @click="getIndex(1)">新手帮助</div>
                <div class='font' :class="index==2 ?'checked':''" @click="getIndex(2)">拍卖协议</div>
                <div class='font' :class="index==3 ?'checked':''"  @click="getIndex(3)">拍卖须知</div>
                <div class='font' :class="index==4 ?'checked':''"  @click="getIndex(4)">保证金说明</div>
            </div>
        </div>
        <div class="text">
            <div class="time">更新时间：2017.11.24</div>
            <div class="box">
                <div class="tit">保证金说明</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守</p>
            </div>
            <div class="box">
                <div class="tit">1.保证金金额</div>
                <p class="txt">为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守
                </p>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    
    export default {
        data () {
            return {
                title: '传家',
                index:3,
            }
        },
        components:{},
        
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
            Return:function(){
                window.history.go(-1)
            },
            getIndex:function(index){
                let that = this;
                if(index === 1){
                    that.index = 1;
                }else if(index==2){
                    that.index = 2;
                }else if(index==3){
                    that.index = 3;
                }else if(index==4){
                    that.index = 4;
                }
            },
        }
    }

</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .helpcenter{
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
                
                font-size: @size10;
                margin-right: @size10;
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
}
</style>

