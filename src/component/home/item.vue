<template>
    <div>
        <div id='specials' class="specials" @click="goDetails(str.id)">
            <a href='javascript:void(0)'>
                <img :src="$store.state.picHead + str.cover"/>
            </a>
            <div class="bg"></div>
            <div class="text">
                <h1>{{str.title}}</h1>
                <div class="t-title">{{str.subTitle}}</div>
                <div class="time">{{str.smTitle}}</div>
                <i></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
          arrays: [],
          
      }
    },
    components: {},
    mounted () {
//        this.Insertion()
    },
    methods: {
        goDetails(id){
            let that = this;
            that.$router.push({name:'specialinfoMore',params:{id:id}})
//            window.location.href = 'http://sundayauction.cn/packages/'+ id;
        }
    }
  }
</script>

<style lang="less">
@import url('../../assets/css/base.less');
#specials{
    width: 100%;
    height: 5.6rem;
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin-bottom: @size5;
    text-align: center;
    position: relative;
    img{
        width:100%;
        height:100%;
    }
    .bg{
        width:100%;
        height:100%;
        background: #000;
        opacity:0;
        position: absolute;
        top: 0;
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
            background: url("../../assets/image/mycenter/more2.png")no-repeat;
            background-size:100% 100%;
        }
        h1{
            width:80%;
            margin:auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            padding-top: 1.8rem;
            font-size: 18px;
            font-weight: 500;
            color: rgb(255, 255, 255);
        }
        .t-title{
            width:70%;
            margin:auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            color: rgb(255, 255, 255);
            font-size: 13px;
            font-weight: 400;
            margin-top:0.2rem;
        }
        .time{
            padding-top: 0.4rem;
            font-size: 12px;
            color: rgb(255, 255, 255);
        }
    }
}
    
</style>