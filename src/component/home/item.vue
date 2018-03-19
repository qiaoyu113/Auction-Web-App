<template>
    <div>
        <div id='specials' class="specials" @click="goDetails(str.id)">
            <img :src="$store.state.picHead + str.cover"/>
            <div class="text">
                <h1>{{str.title}}</h1>
                <div class="t-title">{{str.subTitle}}</div>
                <div class="time">{{str.smTitle}}</div>
                <i><a :href="str.url">. . .</a></i>
            </div>
        </div>
    </div>
</template>

<script>
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
    methods: {
        goDetails(id){
            let that = this;
            that.$router.push({name:'specialinfo',query:{id:id}})
        }
    }
  }
</script>

<style lang="less">
@import url('../../assets/css/base.less');
#specials{
    width: 100%;
    height: 4.5rem;
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin-bottom: @size5;
    text-align: center;
    position: relative;
    img{
        width:100%;
        height:100%;
    }
    .text{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
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
            width:80%;
            margin:auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            padding-top: 1.2rem;
            font-size: 24px;
            font-weight: 400;
            color: rgb(255, 255, 255);
        }
        .t-title{
            width:70%;
            margin:auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            color: rgb(255, 255, 255);
            font-size: 14px;
            font-weight: 400;
            margin-top:@size2;
        }
        .time{
            padding-top: @size14;
            font-size: 14px;
            color: rgb(255, 255, 255);
        }
    }
}
    
</style>