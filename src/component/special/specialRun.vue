<template>
<!-- 两个模板有星星无星星 -->
<div class="sell">
        <!-- 内容部分 -->
    <span>{{str}}</span>
        <!--<div class="sell-content">-->
            <!--<div class="sell-time">{{str.timeOrMoney}}</div>-->
            <!--<div class="sell-title">{{str.name}}</div>-->
            <!--<div class="sell-information">-->
                <!--<a :href="str.url">{{str.warn}}</a>-->
                <!--<span class="iconfont icon-shangcheng pos1"> {{str.collect}}</span>-->
                <!--<span class="iconfont icon-qunzu pos2"> {{str.people}}</span>-->
            <!--</div>-->
        <!--</div>-->
        <!-- 图片部分，未实现完全 -->
        <!--<div class="sell-picture">-->
            <!--<div class="sell-bpic">-->
                <!--<img :src="str.img[0]" alt="" srcset="">-->
                <!--<z-icon  v-for="list in str" :key="list.url" :arr="str"></z-icon>-->
            <!--</div>-->
            <!--<div class="sell-spic">-->
                <!--<ul  v-for="index in str.img.length">-->
                    <!--<li ><img :src="str.img[index]" alt="" srcset=""></li>-->
                    <!--<li style="left:95px"><img :src="str.img[2]" alt="" srcset=""></li>-->
                    <!--<li style="left:190px"><img :src="str.img[3]" alt="" srcset=""></li>-->
                    <!--<li style="left:285px"><img :src="str.img[4]" alt="" srcset=""></li>-->
                    <!--<li style="left:380px"><img :src="str.img[5]" alt="" srcset=""></li>-->

                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
import {common} from '../../assets/js/common/common'
export default {
    props: ["str"],
    data() {
        return {
            time:'',
            str:''
        };
    },
    computed:{
        'time': function(){
            return this.str;
        }
    },
    methods: {
        setTime(){
            let that = this;
            setInterval(function(){
                let time = that.time - new Date();
                that.str = common.getFormatOfDate(time,'dd:h:m:s')
            },1000);
        }
    }
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
      color: rgb(65, 62, 62);
    }
    .pos1 {
      position: absolute;
      top: 15px;
      right: 70px;
      font-size: @size6;
      color: rgb(51, 51, 51);
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
.sell {
  width: @size375;
//   background: rgb(236, 233, 233);

  .sell-picture {
    width: @size375;
    .sell-bpic {
      margin-bottom: @size5;
      height: @size150;
      //   background:url(../../assets/image/myimage/timg.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      img {
        width: @size375;
        height: @size150;
      }
      
    }
    .sell-spic {
      width: @size375; 
      height: @size80;
      overflow: hidden;
        overflow-x: auto;
      // height: @size98;
      ul {
        //这里宽度出问题
        width: @size375;
       position: relative;
        li {position: absolute;
          width: @size80;
          height: @size80;
          margin-left: @size5;
          background: gray;
          img {
            width: @size80;
            height: @size80;
          }
        }
      }
    }
  }
}
</style>