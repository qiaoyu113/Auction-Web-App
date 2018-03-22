<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 订单详情-订单正常-订单完成 -->
    <div class="rules" id="" v-set-title="title">
        <div class="header">传家</div>
        <div :class="dis">
            <div class="transparent"></div>
            <div class="popWin" >
                <div class="close" @click="close()"><i class="iconfont icon-closeicon"></i></div>
                <div class="titleEn">RULES</div>
                <div class="titleCh">到账周期说明</div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：</p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
                <div class="explain1">
                    <p class="title">到账周期说明</p>
                    <p>为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    为了维护拍卖交易秩序，保障平台用户的合法权益，以下规则请大家务必遵守：
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import {appService} from '../../service/appService'
  export default {
    props: ['str'],
    data () {
      return {
          title:'配送中',
          arrays: [],
          dis:'',
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        close:function() {
            this.dis='dis';
        }
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .rules{
    .header{
        position: fixed;
        top: 0;
        z-index: 100;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    
    
.dis{
    display: none;
}
.transparent{
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background:#000;  
    opacity:0.6;
}
.popWin{
    height: 14.72rem;
    width: 8.67rem;
    background: white;
    position: fixed;
    bottom:@size25;
    left: @size25;
    z-index: 1000;
    text-align: center;
    box-sizing: border-box;
    padding: 0 @size20;
    overflow: scroll;
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
    .titleEn{
        padding-top: @size50;
        letter-spacing: 2px;
        font-size: @size14;
        font-weight: bold;
    }
    .titleCh{
        font-size: @size11;
        padding-bottom: @size25;
    }
    .explain1{
        padding: 0 @size10 @size25 @size10;
        text-align: left;
        .title{
            font-size: @size10;
            color: black;
            padding-bottom: @size4;
        }
        p{
            font-size: @size10;
            color: gray;
        }
    }
}
}
</style>

