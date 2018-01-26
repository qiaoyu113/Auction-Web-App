<template>
                <div class="box">
                    <div class="pic"><img :src="str.img" alt="">
                        <div class="labelbox">
                            <span  class="span1" :class="getBgcolor(str.index)"><i class="">||</i></span>
                            <!-- 是否被收藏 -->
                            <span class="span2" v-if="str.collected"><i class="iconfont icon-xing"></i></span>
                        </div>
                    </div>
                    <div class="money">{{str.money}}</div>
                    <div class="title">{{str.title}}</div>
                    <div class="number">{{str.number}}</div>
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
  syncData({ store }) {
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
      appervice.getParam().then(res => {
        //                    store.state.homeStore.listImg = res.data;
      }),
      service.getParam().then(res => {
        //                    store.state.homeStore.noticelist = res.data.datas;
      })
    ]);
  },
  computed: {
    //将存在store中的数据取出
    listImg() {
      return this.$store.state.homeStore.listImg || [];
    },
    noticelist() {
      return this.$store.state.homeStore.noticelist || [];
    }
  },
  mounted: function() {
    /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */
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
};
</script>

<style lang="less">
/*rem等基本设置都放在base中，不写多个*/
@import url("../../assets/css/base.less");
@import url("../../assets/css/icon/iconfont.css");
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
      .labelbox {
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
        .bgcolor1{
            background: rgb(0, 188, 181);
        }
        .bgcolor2{
            background: rgb(233, 199, 115);
        }
        .bgcolor3{
            background: rgb(235, 97, 0);
        }
        .span2 {
          width: @size15;
          height: @size15;
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

</style>

