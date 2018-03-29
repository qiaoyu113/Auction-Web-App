<template>
 <!-- 
    五种状态，index
    1代表即将开始
    2进行中
    3拍品别人拍中
    4拍品被流拍
    5拍品被自己拍中 -->
    <div class="infomation bground1 clearfix" v-if="index==1">

        <div class="time1 fr">
               <div class="fr num">01</div>
               <div class="fr colon">:</div>
                <div class="fr num">02</div>
                <div class="fr colon">:</div>
                <div class="fr num">03</div>
                <div class="fr colon"> :</div>
                <div class="fr num">04</div>
        </div>
        <div class="value1 fr">即将开始</div>
    </div>
    <div class="infomation bground2 clearfix" v-else-if="index==2">
            <div class="learnMore fl">出价记录</div>
            <div class="value fl">当前价格 200,000CNY</div>
            <div class="time fr">
               <div class="fr num">01</div>
               <div class="fr colon">:</div>
                <div class="fr num">02</div>
                <div class="fr colon">:</div>
                <div class="fr num">03</div>
                <div class="fr colon"> :</div>
                <div class="fr num">04</div>
            </div>
    </div>
    <div class="infomation bground3 clearfix" v-else-if="index==3">
            <div class="learnMore fl">出价记录</div>
            <div class="value fl">当前价格 200,000CNY</div>
            <div class="success fr">
               拍品成交
            </div>
    </div>
    <div class="infomation bground4 clearfix" v-else-if="index==4">
            <div class="success fr">
               拍品流拍
            </div>
    </div>
    <div class="infomation bground3 clearfix" v-else-if="index==5">
            <div class="learnMore fl">出价记录</div>
            <div class="value fl">当前价格 200,000CNY</div>
            <span class="warn">支付</span>
            <div class="time fr">
               <div class="fr num">01</div>
               <div class="fr colon">:</div>
                <div class="fr num">02</div>
                <div class="fr colon">:</div>
                <div class="fr num">03</div>
                <div class="fr colon"> :</div>
                <div class="fr num">04</div>
            </div>
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
    methods: {}
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
    .infomation{
        box-sizing: border-box;
        position: fixed;
        bottom: @size45;
        width: 100%;
        height: @size35;

        text-align: center;
        font-size: 13px;
        line-height: @size25;
        .learnMore{

            width: 1.6rem;
            height: @size15;
            border: 1px solid white;
            border-radius:3px;
            font-size:  9px;
            color: white;
            line-height: @size15;
            margin:@size10 @size10 @size10 @size10;
        }
        .value{
            font-size:  9px;
            color: white;
            margin-top:@size6;
        }
        .value1{
            color: black;
            font-size:  9px;
            margin-top:@size6;
            margin-right: @size10;
        }
        .success{
            font-size: @size5;
            color: white;
            line-height: @size35;
            padding-right: @size20;
        }
        .warn{
            font-size: @size10;
            color: white;
            line-height: @size35;
        }
        .time{
            display: inline-block;
            color: white;
            margin-right: @size15;
            .num{
                height: @size20;
                background: black;
                border-radius:3px;
                padding: 2px;
                margin-top:@size6;
                line-height: @size22;
                font-size: @size12;
                font-weight: bold;
            }
            .colon{
                text-align: center;
                margin-top:@size6;
                line-height: @size22;
                width: @size10;
            }
        }
        .time1{
            display: inline-block;
            color: black;
            margin-right: @size15;
            box-sizing: border-box;
            .num{
                // box-sizing: border-box;
                border: 0.5px solid rgb(129, 135, 140);
                height: @size20;
                background: white;
                border-radius:3px;
                padding: 2px;
                margin-top:@size6;
                line-height: @size21;
                font-size: @size12;
                font-weight: bold;
            }
            .colon{
                font-weight: bold;
                text-align: center;
                margin-top:@size6;
                line-height: @size22;
                width: @size10;
            }
        }
    }
    //即将开始
    .bground1{
        background: white;
        border-top:1px solid rgb(201, 209, 218)
    }
    //进行中
    .bground2{
        background:linear-gradient(30deg,rgb(0, 224, 222) 0%,rgb(104, 105, 237) 100%);
    }
    //已经拍中
    .bground3{
        background:linear-gradient(30deg,#f54ea2 0%,#dd704c 100%);
    }
    //流拍
    .bground4{
        background:gray;
    }

</style>