<template>
    <div class="nav">
            <span class="">&lt;</span> 
            <span class="span1">c</span>
            <span class="span2">d</span>
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
.nav{
        width: @size375;
        height: @size35;
        border-bottom: 1px solid rgb(53, 60, 70);
        background: rgb(255, 255, 255);
        position: fixed;
        top: @size45;
        z-index: 100;
        span{
            display: inline-block;
            line-height: @size30;
            text-align: center;
            font-size: @size30;
            font-weight: lighter;
            color: rgb(157, 169, 177);
            margin-left: 20px;
        }
        .span1{
            float: right;
            padding-right: 20px;
        }
        .span2{
            float: right;
            padding-right: 20px;
        }
    }
    
</style>