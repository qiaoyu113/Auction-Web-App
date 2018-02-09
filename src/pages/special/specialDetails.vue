<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <!-- 专场列表-排场详情 -->
    <div class="" id="" v-set-title="title">
        
        <div class="header">传家</div>
        <z-nav></z-nav>
        
        <div class="container">
            <div class="sell-list">
                <div class="sell-pic">
                    <img :src="img">
                </div>
                <div class="sell-information">
                    <div class="font">{{details.readNum}}</div>
                    <div class="sellicon2"><div class="icon"></div></div>
                    <div class="font">{{details.title}}</div>
                    <div class="sellicon1"></div>
                </div>
                <div class='sell-content'>
                    <div class="sell-int">
                        <div class="time">{{timemoney}}</div>
                        <div class="title">{{title}}</div>
                        <div class="info">{{time}}结束</div>
                        <div class="state"><span  class="span1" :class="getBgcolor(index)"><i class="">||</i></span>&nbsp;&nbsp;拍卖中</div>
                        <div class="sta-over">开始：{{startTime}}</div>
                        <div class="sta-over">结束：{{endTime}}</div>
                    </div>
                    <div class="sell-inf">在广大藏家的热切期待下，2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行.2017拍卖会如期而至。
                         预展将于2018年-2019年在北京国际饭店会议中心举行
                    </div>
                </div>
            </div>
            <div class="sell-more clearfix">
                <div v-for="list in specialist" :key="list.url">
                    <special-more :str="list"></special-more>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {appService} from '../../service/appService'
    import {commonService} from '../../service/commonService'
    import specialmore from "../../component/special/specialmore.vue";
    export default {
        data () {
            return {
                details:'',
                img:'',
                title: '专场详情-拍场详情',
                index:2,
                id:'',
                timemoney:"00:57:00:00",
//                title:"器物拍卖专场",
                time:"2017.10.15 23:00",
                startTime:'2017.12.17 17：00',
                endTime:'2017.12.18 18：00',
                specialist:[
                    {
                        index:2,
                        collected:false,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                    {
                        index:2,
                        collected:true,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516784700115&di=f6b8e9cf4f25f3c564b1baed63ffa6f6&imgtype=0&src=http%3A%2F%2Fimg387.ph.126.net%2FjLY_ZSMwX5h9geAwDcehWA%3D%3D%2F2427158724177097031.jpg',
                        money:'200,000CNY',
                        title:'器物拍卖专场',
                        number:"NX00012"
                    },
                ],
            }
        },
        components:{'special-more':specialmore},
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
            let that = this;
            that.id = that.$route.query.id;
            that.onload()
        },
        methods: {
            //初始化数据
            onload(){
                let that = this;
                commonService.getAuction({id:that.id},that.id).then(function(res){
                    console.log(res)
                    if(res.data.code === 200){
                        that.details = res.data.datas;
                        that.img = that.$store.state.picHead + res.data.datas.picItems[0];
//                        console.log(that.details)
                    }
                })
            },
            //背景色
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
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .header{
        position: fixed;
        z-index: 100;
        top: 0;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
    .container{
        margin-top: @size75;
        margin-bottom: 1.334rem;
    }
    .sell-list{
        .sell-pic{
            width:100%;
            height: @size162;
            overflow: hidden;
            img{
                width: 100%;
                height: 5.6267rem;
                margin-top:-0.7rem;
            }
        }
        .sell-information {
            padding: 10px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            .sellicon1{
                width:0.16rem;
                height:0.16rem;
                float:right;
                border: 0.06rem solid #A6A9AF;
                margin-right:10px;
                margin-top:0.06rem;
            }
            .font{
                font-size:10px;
                float:right;
                margin-right:10px;
            }
            .sellicon2{
                width: 0;
                height: 0;
                border-left: 0.2rem solid transparent;
                border-right: 0.2rem solid transparent;
                border-bottom: 0.3rem solid #A6A9AF;
                float:right;
                position: relative;
                margin-right:10px;
                margin-top:0.04rem;
                .icon{
                    width: 0;
                    height: 0;
                    border-left: 0.1rem solid transparent;
                    border-right: 0.1rem solid transparent;
                    border-bottom: 0.15rem solid #fff;
                    position: absolute;
                    left: -0.1rem;
                    top: 0.1rem;
                }
            }
            a {
            font-size: @size6;
            text-decoration: underline;
            color: red;
            padding-left: 20px;
            }
            .pos2 {
            position: absolute;
            top: 15px;
            right: 10px;
            font-size: @size6;
            color: rgb(65, 62, 62);
            }
            .pos1 {
            position: absolute;
            top: 15px;
            right: 70px;
            font-size: @size6;
            color: rgb(51, 51, 51);
            }
        }
        .sell-content{
            box-sizing: border-box;
            margin-top: @size20;
            padding: @size20;
            .sell-int{
                div{
                    text-align: center;
                }
                .time{
                    font-size: 13px;
                }
                .title{
                    font-size: 10px;
                    padding-top: @size5;
                    color:rgb(133, 133, 133);
                }
                .info{
                    font-size: 9px;
                    padding-top: @size25;
                    padding-bottom: @size25;
                    color:rgb(133, 133, 133);
                }
                .state{
                    font-size: @size10;
                    text-align: left;
                    color:rgb(133, 133, 133);
                    .span1 {
                        width: @size15;
                        height: @size15;
                        // display: inline-block;
                        float: left;
                        background: rgb(0, 188, 181);
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
                }
                .sta-over{
                    font-size: 9px;
                    text-align: left;
                    color: rgb(133, 133, 133);
                }
            }
            .sell-inf{
                margin-top: @size20;
                font-size: 11px;
                line-height: @size24;
                color: rgb(133, 133, 133);
            }
        }
    }
    .sell-more{
        box-sizing: border-box;
        text-align: center;
        margin: @size5;
    }
    
</style>

