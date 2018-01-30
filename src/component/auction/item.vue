<template>
    <!-- 底部竞拍栏
    五种状态，index
    1代表即将开始
    2进行中
    3拍品别人拍中
    4拍品被流拍
    5拍品被自己拍中 -->
    <div class="footer" v-if="index==1||index==4">
            <div class="value">
                <span class='label'>起拍价格</span>
                <span class="price">203,000 CNY</span>
            </div>
            <div class="r-icon" ><i class="iconfont icon-duigoudunpai"></i></div>
    </div>
    <div class="footer" v-else-if="index==2">
            <div class="value">
                <span class="btn1">-</span>
                <span class="price">203,000 CNY</span>
                <span class="btn2">+</span>
            </div>
            <div class="r-icon"><i class="iconfont icon-duigoudunpai"></i></div>
            <div class="offer">出&nbsp;&nbsp;价</div>
    </div>
    <div class="footer" v-else-if="index==3">
            <div class="value">
                <span class='label'>成交价格</span>
                <span class="price">203,000 CNY</span>
            </div>
            <div class="r-icon"><i class="iconfont icon-duigoudunpai"></i></div>
    </div>
    <div class="footer" v-else-if="index==5">
            <div class="value">
                <span class='label'>成交价格</span>
                <span class="price">203,000 CNY</span>
            </div>
            <div class="r-icon" @click="getList()"><i class="iconfont icon-duigoudunpai"></i></div>

            <div class="offer">去支付</div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['str'],
    data () {
      return {
          arrays: [],
          index:5,
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        getList:function() {
            let that = this;
            that.dis='';
        }
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
    .footer{
        width: 100%;
        height: @size45;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: rgb(250, 251, 252);
        box-sizing: border-box;
        border-top: 1px solid rgb(53, 60, 70); 
        .value{
            float: left;
            width: 5.6rem;
            height: 100%;
            line-height: @size45;
            position: relative;
            text-align: center;
            .btn1{
                width: 1.46rem;
                position: absolute;
                left: 0;
                font-size: 50px;
                line-height: 40px;
                color: red;
            }
            .btn2{
                
                width: 1.46rem;
                position: absolute;
                right: 0;
                font-size: 35px;
                line-height: 40px;
                color: red;
            }
            .label{
                font-size: 8px;
            }
            .price{
                font-size: 11px;
                width: 2.68rem;
                font-weight: bold;
            }
        }
        .r-icon{
            float: right;
            height: 100%;
            width: @size45;
            box-sizing: border-box;
            border-left:1px solid rgb(205, 212, 220); 
            text-align: center;
            i{
                line-height: @size45;
                font-size: @size30;
            }
        } 
         .offer{
            float: right;
            width: 3.2rem;
            height: 100%;
            box-sizing: border-box;
            border-left:1px solid rgb(205, 212, 220); 
            text-align: center;
            line-height: @size45;
            font-size: 16px;
        }
    }
    
</style>