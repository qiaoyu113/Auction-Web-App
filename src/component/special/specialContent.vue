<template>
<!-- 两个模板有星星无星星 -->
<div v-if="str.flag" class="sell">
        <!-- 内容部分 -->
        <div class="sell-content">
            <div class="sell-time">{{str.timeOrMoney}}</div>
            <div class="sell-title">{{str.title}}</div>
            <div class="sell-information">
                <a :href="str.url">{{str.warn}}</a>
                <span class="iconfont icon-shangcheng pos1"> {{str.collect}}</span>
                <span class="iconfont icon-qunzu pos2"> {{str.people}}</span>
            </div>              
        </div>
        <!-- 图片部分，未实现完全 -->
        <div class="sell-picture">
                    <div class="sell-bpic">
                        <i><a href="www.baidu.com">ING</a></i>
                        <i class="iconfont icon-xing pos"><a href="#"></a></i>
                    </div>
                    <div class="sell-spic">
                        <ul class="clearfix">
                            <li class="fl"></li>
                            <li class="fl"></li> 
                            <li class="fl"></li>
                            <li class="fl"></li>
                            <li class="fl"></li>
                        </ul>
                    </div>
                </div>
</div>
<div v-else class="sell">
        <div class="sell-content">
                    <div class="sell-time">{{str.timeOrMoney}}</div>
                    <div class="sell-title">{{str.title}}</div>
                    <div class="sell-warn">{{str.warn}}
                        <span class="iconfont icon-shangcheng pos1"> {{str.collect}}</span>
                        <span class="iconfont icon-qunzu pos2"> {{str.people}}</span>
            </div>
        </div>
        <div class="sell-picture">
                <div class="sell-bpic">
                        <i><a href="www.baidu.com">ING</a></i>
                </div>
                <div class="sell-spic">
                        <ul class="clearfix">
                            <li class="fl"></li>
                            <li class="fl"></li> 
                            <li class="fl"></li>
                            <li class="fl"></li>
                            <li class="fl"></li>
                        </ul>
                </div>
        </div>
</div>
    
</template>
<script type="text/ecmascript-6">
export default {
  props: ["str"],
  data() {
    return {
      arrays: []
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
@import url("../../assets/css/base.less");
.sell-content {
  height: @size115;
  .sell-time {
    padding-top: 33px;
    padding-left: 20px;
  }
  .sell-title {
    font-size: @size14;
    padding-left: 20px;
  }
  .sell-information {
    padding-top: 10px;
    position: relative;

    a {
      font-size: @size6;
      text-decoration: underline;
      color: red;
      padding-left: 20px;
    }
    .pos2 {
      position: absolute;
      top: 15px;
      right: 10px;
      font-size: @size6;
    }
    .pos1 {
      position: absolute;
      top: 15px;
      right: 70px;
      font-size: @size6;
    }
  }
  .sell-warn {
    padding-top: 10px;
    font-size: @size6;
    padding-left: 20px;
    position: relative;
    .pos2 {
      position: absolute;
      top: 15px;
      right: 10px;
      font-size: @size6;
    }
    .pos1 {
      position: absolute;
      top: 15px;
      right: 70px;
      font-size: @size6;
    }
  }
}
.sell{
        width: @size375;
        background: rgb(236, 233, 233);
        

        .sell-picture{
            width: @size375;
            
            .sell-bpic{
                margin-bottom: @size5;
                height: @size162;
                background:gray;
                position: relative;
                i{
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding-right: 3px;
                    padding-left:3px;  
                    padding-bottom: 1px;  
                    background: rgb(0,188,181);
                    a{
                        color: white;
                        font-size:@size10;
                    }
                }
                .pos{
                    font-size:@size15;
                    padding: 2px;
                    position: absolute;
                    top: 0px;
                    right: 27px;
                    background: black;
                    color: yellow;
                }
            }
            .sell-spic{
                width:@size375 ;
                // height: @size98;
                ul{
                    //这里宽度出问题
                    width: 600px;
                    li{
                        width:@size80;
                        height: @size80;
                        margin-left:@size5;
                        background: gray; 
                    }

                }
            }
        }
    }
</style>