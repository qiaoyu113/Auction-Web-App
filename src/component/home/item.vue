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
    // @size2: .0533rem;
    // @size9: .24rem;
    // @size14: .3733rem;
    // @size15: .4rem;
    // @size16: .4rem;
    // @size20: .5333rem;
    // @size22: .5867rem;
    // @size35: .9333rem;

  // .item{
  //   padding:@size15 0;border-bottom:@size2 solid #eee;display:flex;justify-content:flex-start;
  //   .left{
  //     position:relative;
  //     .cover{}
  //     .mark{padding:0 @size2;color: #333;position:absolute;top:0;left:0;
  //       .txtScale{font-size: @size9; white-space:nowrap;}
  //     }
  //     .mark.yellow{background:#fc0;}
  //     .mark.grey{background:#ddd;}
  //   }
  //   .right{
  //     margin-left: @size15; position:relative;
  //     .p1,.p2,.p3,.p4{width:100%;}
  //     .p1{font-size: @size16;line-height:@size22;color: #333;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:2;text-overflow: ellipsis;overflow: hidden;}
  //     .p2{margin:@size2 0;line-height:@size20;font-size: @size14;color: #666;}
  //     .p3{line-height:@size20;font-size: @size14;color: #999;}
  //     .p4{line-height:@size22;font-size: @size16;color: #F4A21B;position:absolute;bottom:0;}
  //   }
  // }
</style>