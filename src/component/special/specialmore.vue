<template>
                <div class="box">
                    <div class="pic"><img :src="str.img" alt="">
                        <z-icon  v-for="list in str" :key="list.url" :arr="str"></z-icon>
                        
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

