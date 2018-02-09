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
            <div class="learnMore fl">查看更多</div>
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
            <div class="learnMore fl">查看更多</div>
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
            <div class="learnMore fl">查看更多</div>
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

</style>