<template>
    <div id="specialmore" class="box">
        <div class="pic">
            <img :src="str.cover" alt="">
            <div class="money">{{str.money}}</div>
            <div class="title">{{str.title}}</div>
            <div class="number">{{str.number}}</div>
        </div>
    </div>
</template>

<script >
import { appService } from "../../service/appService";
import specialRun from "../../component/special/specialRun.vue";
// import {  } from "../../component/";
export default {
    props: ['str'],
  data() {
    return {
      title: "更多",
    };
  },
  mounted: function() {

  },
  methods: {

  }
};
</script>

<style lang="less">
/*rem等基本设置都放在base中，不写多个*/
@import url("../../assets/css/base.less");
@import url("../../assets/css/icon/iconfont.css");
#specialmore{
    .sell-more {
        box-sizing: border-box;
        text-align: center;
        margin: @size5;

        .box {
            float: left;
            padding: 0.093rem;
            .pic {
                width: 4.67rem;
                height: 3.47rem;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }

            }
            .money {
                font-size: 15px;
                padding-top: @size15;
            }
            .title {
                font-size: 14px;
                color: rgb(133, 133, 133);
                padding-top: @size1;
            }
            .number {
                font-size: 12px;
                color: rgb(133, 133, 133);
                padding: 0 0 @size25 0;
            }
        }
    }
}
</style>

