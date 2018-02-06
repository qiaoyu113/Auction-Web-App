<template>
    <div class="reco">
            <div class="price fl">{{str.money}}</div>
            <div class="fr">
                <div class="who ">{{str.name}}</div>
                <div class="time">{{str.time}}</div>
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
    .reco{
        width: 100%;
        height: 1.14rem;
        .price{
            text-align: left;
            line-height: 1.14rem;
            font-size: @size14;
            font-weight: bold;
            text-decoration: line-through;
        }
        .fr{
            text-align: right;
            .who{
                font-size: @size10;
                color: rgb(122, 122, 122);
            }
            .time{
                font-size: @size10;
                color: rgb(122, 122, 122);
            }
        }
    }
    
</style>