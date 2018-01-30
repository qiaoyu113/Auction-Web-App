<template>
<!-- index代表物品的状态
1进行中
2即将开始
3历史纪录
collected代表物品是否被人收藏 -->
    <div class="labelBox" >
                            <span  class="span1" :class="getBgcolor(arr.index)"><i class="">||</i></span>
                            <!-- 是否被收藏 -->
                            <span class="span2" v-if="arr.collected"><i class="iconfont icon-xing"></i></span>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['arr'],
    data () {
      return {
          arrays: [],
          index:1,
          collected:true,
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        getBgcolor:function(index) {
          if(index==1){
              return 'bgcolor1';
          }else if(index==2){
              return 'bgcolor2';
          }else if(index==3){
              return 'bgcolor3';
          }
      },
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
.labelBox {
        width: @size30;
        height: @size15;
        position: absolute;
        top: 0;
        right: 0;
        .span1 {
          width: @size15;
          height: @size15;
          float: right;
          font-size: @size10;
          box-sizing: border-box;
          i {
            width: @size15;
            height: @size15;
            color: white;
            font-size: @size10;
            font-weight: bold;
            text-align: center;
            padding: 1px;
            line-height: @size15;
          }
        }
        .span2 {
          width: @size15;
          height: @size15;
          // display: inline-block;
          float: right;
          background: black;
          font-size: @size10;
          box-sizing: border-box;
          i {
            width: @size15;
            height: @size15;
            color: white;
            font-size: @size10;
            font-weight: bold;
            text-align: center;
            padding: 1px;
            line-height: @size15;
            color: rgb(233, 199, 115);
          }
        }
      }
    .bgcolor1{
        background: rgb(0, 188, 181);
    }
    .bgcolor2{
        background: rgb(233, 199, 115);
    }
    .bgcolor3{
        background: rgb(235, 97, 0);
    }
</style>