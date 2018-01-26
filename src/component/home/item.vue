<template>
    <div>
        <div id='' class="special">
            <h1>{{str.title}}</h1>
            <div class="t-title">{{str.subtitle}}</div>
            <div class="time">{{str.time}}</div>
            <i><a :href="str.url">. . .</a></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['str'],
    data () {
      return {
          arrays: [],
          
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
.special{
        width: @size375;
        height: @size211;
        background: url(../../assets/image/myimage/timg.jpg);
        background-repeat:no-repeat; 
        background-size:100% 100%;
        margin-bottom: @size5;
        text-align: center;
        position: relative;
        i{
            position: absolute;
            top: 0;
            right: 0;
            width: @size40;
            height: @size15;
            box-sizing: border-box;
            padding-right: 3px;
            padding-left:3px;
            background: rgb(53,60,70);
            a{
                color: white;
                font-size:@size15;
                line-height: @size8;
                font-weight: bold;
            }
        }
        h1{
            padding-top: 2.24rem;
            font-size: @size15;
            color: rgb(255, 255, 255);
        }
        .t-title{
            color: rgb(255, 255, 255);
            font-size: @size11;
        }
        .time{
            padding-top: @size25;
            font-size: @size6;
            // color: black;
            color: rgb(255, 255, 255);
        }
    }
    
</style>