<template>
    <div>
        <div id='' class="special">
            <h1>{{str.title}}</h1>
            <div>{{str.subtitle}}</div>
            <div class="time">{{str.time}}</div>
            <i><a :href="str.url">MORE</a></i>
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
        height: @size200;
        background: gray;
        margin-bottom: @size5;
        text-align: center;
        position: relative;
        i{
            position: absolute;
            top: 0;
            right: 0;
            padding-right: 3px;
            padding-left:3px;    
            background: rgb(51,51,51);
            a{
                color: white;
                font-size:@size10;
            }
        }
        h1{
            padding-top: 60px;
            font-size: @size20  ;
        }
        .t-title{
            padding: 10px;
        }
        .time{
            padding: 10px;
            font-size: @size10;
            color: white;
        }
    }
    
</style>