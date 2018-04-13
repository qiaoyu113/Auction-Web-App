<template>
    <div id="auction" v-set-title="title">

    </div>
</template>

<script >
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    //    import item from "../../component/auction/item.vue"
    //    import info from "../../component/auction/info.vue"
    //    import record from "../../component/auction/record.vue"
    //    import payment from '../../component/auction/payment.vue'
    //    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '支付成功',
            }
        },
        mounted: function() {
            let that = this;
            let route = window.localStorage.getItem('route');
            let id = window.localStorage.getItem('id');
            if(route == 'auction'){
                let id = window.localStorage.getItem('id');
                window.localStorage.setItem('routerName','wxPay');
                that.$router.replace({name:'auctionMore',params:{id:id},query:{pay:true}})
            }
            if(route == 'recharge'){
                that.$router.replace({name:'recharge'})
            }
            if(route == 'cash'){
                that.$router.replace({name:'cash'})
            }
             if(route == 'order'){
             let id = window.localStorage.getItem('id');
                  // that.$router.push({path:"/normalorder",query:{id:id}}) 
              that.$router.push({path:"/myorder",query:{index:0}}) 
             }

        },
        methods: {

        }
    }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    @import url("../../assets/css/common/mescroll.min.css");
    @import '../../assets/css/common/swiper.min.css';
    #auction{
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
        .nav{
            width: @size375;
            height: @size35;
            line-height: @size35;
            border-bottom: 1px solid rgb(53, 60, 70);
            background: rgb(255, 255, 255);
            position: fixed;
            top: @size45;
            z-index: 100;
            .back{
                line-height: @size35;
                i{
                    font-size:28px;
                    margin-left: 0.3rem;
                    color:#A9AEB6;
                }
            }
            .span1{
                float: right;
                padding-right: 20px;
                color:#A9AEB6;
                img{
                    width: 0.6rem;
                    margin-top: 0.15rem;
                }
            }
            .span2{
                float: right;
                padding-right: 20px;
                color:#A9AEB6;
                img{
                    width: 0.6rem;
                    margin-top: 0.15rem;
                }
            }
        }
        #mescroll{
            width:100%;
            max-width:10rem;
            position: fixed;
            top:2.15rem;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            height:auto;
            overflow-y: scroll;
        }
        .sell-list{
            .sell-pic{
                height:7.5rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    /*height: 8rem;*/
                    /*margin-top:-1rem;*/
                }
                .dian{
                    width:0.4rem;
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:0.1rem;
                    margin:auto;
                    height: max-content;
                    .dianList{
                        width: 0.15rem;
                        height: 0.15rem;
                        background: #fff;
                        z-index: 100;
                        position: relative;
                        border-radius: 100%;
                        margin: 0.15rem 0;
                    }
                    .dianNow{
                        width: 0.15rem;
                        height: 0.15rem;
                        background: #EB6100;
                        z-index: 100;
                        position: relative;
                        border-radius: 100%;
                        margin: 0.15rem 0;
                    }
                }
            }
            .sell-information {
                padding-top: 10px;
                position: relative;
                .font{
                    font-size:10px;
                    float:right;
                    margin-right:10px;
                    color: #A6A9AF;
                }
                .sellicon2{
                    /*width: 0;*/
                    /*height: 0;*/
                    /*border-left: 0.2rem solid transparent;*/
                    /*border-right: 0.2rem solid transparent;*/
                    /*border-bottom: 0.3rem solid  #A9AEB6;*/
                    float:right;
                    /*position: relative;*/
                    /*margin-right:6px;*/
                    /*margin-top:0.04rem;*/
                    img{
                        width: 0.4rem;
                        margin-right: 0.1rem;
                    }
                    .icon{
                        width: 0;
                        height: 0;
                        border-left: 0.13rem solid transparent;
                        border-right: 0.13rem solid transparent;
                        border-bottom: 0.185rem solid #fff;
                        position: absolute;
                        left: -0.13rem;
                        top: 0.07rem;
                    }
                }
            }
            .sell-content{
                box-sizing: border-box;
                margin-top: @size10;
                padding: @size10;
                .sell-int{
                    div{
                        text-align: center;
                    }
                    .intrEn{
                        font-size: 16px;
                        letter-spacing: 2px;
                        padding: @size6;
                        font-weight: bold;
                    }
                    .intrCh{
                        font-size: 14px;
                        color:rgb(133, 133, 133);
                    }
                    .prove{
                        font-size: 8px;
                        padding: @size20 0;
                        color:rgb(133, 133, 133);
                        i{
                            color: rgb(0, 184, 176);
                            margin:0 0.06rem;
                        }
                        span{
                            font-size:12px;
                        }
                        .list{
                            margin:0 0.1rem;
                        }
                    }
                    .info{
                        padding: @size10;
                        p{
                            font-size: 12px;
                            text-align: left;
                            color:rgb(133, 133, 133);
                            span{
                                font-size: 12px;
                            }
                        }
                        div{
                            text-align: left;
                            font-size: 10px;
                        }
                    }


                }
                .bug{
                    width:100%;
                    height:1000px;
                }
                .sell-inf{
                    margin-top: @size20;
                    font-size: 11px;
                    color: rgb(133, 133, 133);
                    padding: @size10;
                    img{
                        width:100% !important;
                        height: auto !important;
                    }
                }
                .pic-list{
                    // width: @size375;
                    // padding: @size10;
                    box-sizing: border-box;
                    img{
                        width: 100%;
                        height: @size162;
                        // margin: @size5;
                        padding-top: @size10;
                    }
                }
                .helpCenter{
                    height: @size40;
                    width: 100%;
                    border-top: 1px solid rgb(130, 135, 140);
                    border-bottom: 1px solid rgb(130, 135, 140);
                    text-align: center;
                    line-height: @size40;
                    .fr2{
                        float:right;
                        margin-right:0.2rem;
                    }
                    span{
                        padding-left:@size10;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    a{
                        font-size: @size10;
                        text-decoration: underline;
                        color: rgb(130, 135, 140);
                        margin-right: @size5;
                    }
                    .icon{
                        width: @size12;
                        height: @size12;
                        border: 1px solid rgb(130, 135, 140);
                        border-radius:50%;
                        display: inline-block;
                        font-size: @size1;
                        line-height: @size12;
                        margin-top: @size14;
                        margin-right: @size10;
                    }
                }
            }

        }
        .others{
            text-align: center;
            margin-top: @size30;
            margin-bottom: @size20;
            .othersEn{
                font-size: 14px;
                letter-spacing: 2px;
                font-weight: bold;
            }
            .othersCh{
                padding-top: @size10;
                font-size: 11px;
                color: rgb(51, 51, 51);
            }
        }
        .sell-more{
            box-sizing: border-box;
            text-align: center;
            margin: @size5;
            .sellList {
                width: 4.49rem;
                float: left;
                margin: 0.2rem 0.15rem;
                position: relative;
                .pic {
                    width: 100%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 3.47rem;
                    }
                    .money {
                        font-size: 15px;
                        padding-top: @size15;
                    }
                    .title {
                        font-size: 14px;
                        color: rgb(133, 133, 133);
                        padding-top: @size1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .number {
                        font-size: 12px;
                        color: rgb(133, 133, 133);
                        padding: 0 0 @size25 0;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .date{
                    width:0.7rem;
                    position: absolute;
                    right:0;
                    top:0;
                    .collect{
                        width:0.35rem;
                        height:0.35rem;
                        float:left;
                        background:#333333;
                        padding:0.08rem 0.1rem;
                        box-sizing: border-box;
                        .collectIcon{
                            width:100%;
                            height:100%;
                            background:#F2CE76;
                            position: relative;
                            .bottom{
                                width: 0;
                                height: 0;
                                position: absolute;
                                bottom:0;
                                border-right: 0.075rem solid transparent;
                                border-bottom: 0.075rem solid #333333;
                                border-left: 0.075rem solid transparent;
                            }
                        }
                    }
                    .collect2{
                        width:0.35rem;
                        height:0.35rem;
                        float:right;
                        background:#5EBAA9;
                        padding: 0.09rem 0.03rem;
                        box-sizing: border-box;
                        .icon{
                            width: 0.06rem;
                            height: 100%;
                            float: left;
                            background: #fff;
                            margin: 0 0.04rem;
                        }
                    }
                    .collect3{
                        width:0.35rem;
                        height:0.35rem;
                        float:right;
                        background:#F2CE76;
                        padding: 0.09rem 0.09rem;
                        box-sizing: border-box;
                        .icon{
                            width:100%;
                            height:100%;
                            border-radius: 100%;
                            background:#fff;
                        }
                    }
                    .collect4{
                        width:0.35rem;
                        height:0.35rem;
                        float:right;
                        background:#EB6100;
                        padding: 0.09rem 0.09rem;
                        box-sizing: border-box;
                        position: relative;
                        .icon{
                            width: 0;
                            height: 0;
                            position: absolute;
                            left: 0.08rem;
                            border-top: 0.1rem solid transparent;
                            border-left: 0.16rem solid #fff;
                            border-bottom: 0.1rem solid transparent;
                        }
                        .icon2{
                            width: 0.03rem;
                            height: 0.2rem;
                            background: #fff;
                            position: absolute;
                            right: 0.1rem;
                        }
                    }
                    .collect5{
                        width:0.35rem;
                        height:0.35rem;
                        float:right;
                        background:#808080;
                        padding: 0.09rem 0.09rem;
                        box-sizing: border-box;
                        position: relative;
                        .icon{
                            width: 0;
                            height: 0;
                            position: absolute;
                            left: 0.08rem;
                            border-top: 0.1rem solid transparent;
                            border-left: 0.16rem solid #fff;
                            border-bottom: 0.1rem solid transparent;
                        }
                        .icon2{
                            width: 0.03rem;
                            height: 0.2rem;
                            background: #fff;
                            position: absolute;
                            right: 0.1rem;
                        }
                    }
                }
            }
            .sellListNo{
                width:100%;
                height:2rem;
                line-height:1rem;
                text-align: center;
                font-size:12px;
                color:#858585;
            }
        }
        .dis{
            /*display: none;*/
            .transparent{
                position: fixed;
                bottom: @size45;
                z-index: 100;
                width: 100%;
                height: 17rem;
                background:#000;
                opacity:0.6;
            }
            @keyframes show{
                0%  {bottom:-10rem;}
                100%{bottom:1.2rem;}
            }
            .recordShow{
                -webkit-animation:show 0.2s linear 1;
                -webkit-animation-fill-mode:both;
            }
            .record{
                width: @size375;
                position: fixed;
                z-index: 100;
                bottom: @size45;
                background: #fff;
                padding: 0 0.5333rem 0.4rem;
                box-sizing: border-box;
                text-align: center;
                .down{
                    height: @size30;
                    line-height: @size30;
                    width: 100%;
                    border-bottom: 1px solid rgb(202, 209, 217);
                    font-size: 25px;
                    color: rgb(202, 209, 217);
                }
                .disShow{
                    /*height: 2.99rem;*/
                    border-bottom: 1px solid rgb(202, 209, 217);
                    overflow: hidden;
                    padding-bottom:0.4rem;
                    .pic{
                        width: @size80;
                        height: @size80;
                        padding-top: @size15;
                        display: inline-block;
                        overflow: hidden;
                        img{
                            width: 130%;
                            height: 100%;
                            margin-left:-15%;
                        }
                    }
                    .info{
                        padding-left: @size15;
                        text-align: left;
                        line-height: @size15;
                        .tit{
                            margin-top: @size40;
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                        }
                        .price{
                            font-size: 10px;
                            font-weight: bold;
                        }
                        .title{
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                            width:3rem;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .time{
                            font-size: 10px;
                            color: rgb(122, 122, 122);
                        }
                    }
                    .moneytime{
                        text-align: right;
                        padding-top: @size13;
                        .nowTit{
                            font-size: 10px;
                            line-height: 15px;
                        }
                        .nowPrice{
                            font-size: 16px;
                            color: #ED6506;
                            font-weight: bold;
                        }
                        .over{
                            padding-top: @size10;
                            padding-bottom: 0.1rem;
                            font-size: 10px;
                            line-height: 15px;
                        }
                        .time{
                            display: inline-block;
                            color: white;
                            margin-left: @size15;
                            .num{
                                height: @size20;
                                background: black;
                                border-radius:3px;
                                padding: 2px;
                                line-height: @size22;
                                font-size: @size12;
                                font-weight: bold;
                            }
                            .colon{
                                text-align: center;
                                line-height: @size22;
                                width: @size10;
                                color: #000;
                                font-weight: bold;
                            }
                        }
                        .time1{
                            color: #000;
                            font-size: 10px;
                            line-height: @size15;
                            font-weight: bold;
                        }
                    }
                }
            }
            .bidRecord{
                padding:  0.1rem 0;
                width: 100%;
                max-height:  7.99rem;
                overflow: scroll;
                height: auto;
                .mycolor{
                    color:#ED6506;
                }
                .reco{
                    width: 100%;
                    height: 1.14rem;
                    .price{
                        text-align: left;
                        line-height: 1.14rem;
                        font-size: @size14;
                        font-weight: bold;
                    }
                    .line{
                        text-decoration: line-through;
                    }
                    .fr{
                        text-align: right;
                        .who{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                        .time{
                            font-size: @size10;
                            /*color: rgb(122, 122, 122);*/
                        }
                    }
                }
            }
        }
        .dis2{
            z-index:102;
            .transparent{
                position: fixed;
                bottom: 0;
                z-index: 102;
                width: 100%;
                height: 100%;
                background:#000;
                opacity:0.6;
                display: block;
            }
            .popWin{
                height: 11rem;
                width: 8.67rem;
                background: white;
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
                right:0;
                margin:auto;
                z-index: 1000;
                text-align: center;
                box-sizing: border-box;
                padding: 0 @size20;
                display: block;
                .close{
                    position: absolute;
                    right: 0;top: 0;
                    width: @size30;
                    height: @size30;
                    background: #eb6100;
                    i{
                        font-size: 0.7rem;
                        color: white;
                    }
                }
                .payEn{
                    padding-top: @size50;
                    font-size:@size14;
                    font-weight: bold;
                }
                .payCh{
                    font-size: 11px;
                    color: rgb(51, 51, 51);
                    line-height: @size11;
                }
                .remind{
                    padding: @size25 0;
                    font-size: 12px;
                    img{
                        width:1rem;
                        margin-bottom:0.3rem;
                    }
                    .p1{
                        color: #E95500;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .p2{
                        font-size: 11px;
                        color:#373737;
                    }
                }
                .warn{
                    border-top: 1px solid rgb(129, 135, 140);
                    text-align: left;
                    height: @size40;
                    font-size: 10px;
                    line-height: @size40;
                }
                .value{
                    width: 100%;
                    height: @size40;
                    line-height: @size40;
                    position: relative;
                    text-align: center;
                    border: 1px solid rgb(129, 135, 140);
                    .nobtn1{
                        color:#3C434D !important;
                    }
                    .btn1{
                        width: 1.46rem;
                        position: absolute;
                        left: 0;
                        top: -3px;
                        font-size: 50px;
                        line-height: 40px;
                        color: red;
                    }
                    .btn2{

                        width: 1.46rem;
                        position: absolute;
                        right: 0;
                        top: -3px;
                        font-size: 35px;
                        line-height: 40px;
                        color: red;
                    }
                    .label{
                        font-size: 10px;
                    }
                    .price{
                        font-size: 11px;
                        width: 2.68rem;
                        font-weight: bold;
                    }
                }
                .worthy{
                    box-sizing: border-box;
                    height: 1.52rem;
                    border-bottom: 1px solid rgb(129, 135, 140);
                    padding-top: 10px;
                    .tit{
                        font-size: 10px;
                        color: rgb(129, 135, 140);
                    }
                    .money{
                        font-size: 11px;
                        font-weight: bold;
                    }
                }
                .explain{
                    font-size: 10px;
                    color: rgb(129, 135, 140);
                    text-align: left;
                    box-sizing: border-box;
                    padding-top: @size10;
                    span{
                        font-weight: bold;
                        font-size: 10px;
                        color: #000;

                    }
                }
                .payway{
                    font-size: 14px;
                    padding-top: @size25;
                    text-align: left;
                }
                .pay{
                    height: @size50;
                    border-top: 1px solid rgb(129, 135, 140);
                    .check{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(0, 185, 181);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -11px;
                            color: rgb(0, 185, 181);
                        }
                    }
                    .check1{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -12px;
                            display: none
                        }
                    }
                    .check2{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            font-weight: bold;
                            position: absolute;
                            top: -0.54rem;
                            left: -0.3rem;
                        }
                    }
                    i{
                        font-size: 25px;
                        color: rgb(168, 174, 180);
                        float: left;
                        margin-left: @size10;
                        line-height:  @size50;

                    }
                    img{
                        width: 0.67rem;
                        height: 0.67rem;
                        margin-top: 13px;
                        float: left;
                        margin-left: 0.23rem;
                    }
                    .background1{
                        color: rgb(107, 184, 105)
                    }
                    .background2{
                        color: rgb(0, 157, 235)
                    }
                    .infoWexin{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: @size16;
                        color: rgb(129, 135, 140);
                        .span1{
                            font-size: 13px;
                            line-height: @size13;
                            color: rgb(129, 135, 140);
                        }
                        .span2{
                            font-size: 10px;
                            line-height: @size10;
                            color: rgb(129, 135, 140);
                        }
                        .span3{
                            font-size: 13px;
                            line-height: @size13;
                            color: #000;
                        }
                    }
                    .infoAlipay{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: rgb(129, 135, 140);
                        font-size: 15px;
                    }
                    .infoAlipay2{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: #000000;
                        font-size: 15px;
                    }
                }

                .footer{
                    height: @size45;
                    box-sizing: border-box;
                    border-top: 1px solid rgb(53, 60, 70);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    line-height: @size45;
                    font-size: 14px;
                }
            }
        }
        .dis3{
            z-index:102;
            .transparent{
                position: fixed;
                bottom: 0;
                z-index: 102;
                width: 100%;
                height: 100%;
                background:#000;
                opacity:0.6;
                display: block;
            }
            .popWin{
                height: 7rem;
                width: 6.67rem;
                background: white;
                position: fixed;
                top:0;
                bottom:0;
                left: 0;
                right:0;
                margin:auto;
                z-index: 1000;
                text-align: center;
                box-sizing: border-box;
                padding: 0 @size20;
                display: block;
                .close{
                    position: absolute;
                    right: 0;top: 0;
                    width: @size30;
                    height: @size30;
                    background: #eb6100;
                    i{
                        font-size: 0.7rem;
                        color: white;
                    }
                }
                .payEn{
                    padding-top: @size50;
                    font-size:@size14;
                    font-weight: bold;
                }
                .payCh{
                    font-size: 11px;
                    color: rgb(51, 51, 51);
                    line-height: @size11;
                }
                .remind{
                    padding: @size25 0;
                    font-size: 12px;
                    i{
                        font-size:1rem;
                        color:#ECC261;
                    }
                    img{
                        width:1rem;
                        margin-bottom:0.3rem;
                    }
                    .p1{
                        color: #E95500;
                        font-size: 15px;
                        font-weight: bold;
                    }
                    .p2{
                        font-size: 11px;
                        color:#373737;
                    }
                }
                .warn{
                    border-top: 1px solid rgb(129, 135, 140);
                    text-align: left;
                    height: @size40;
                    font-size: 10px;
                    line-height: @size40;
                }
                .value{
                    width: 100%;
                    height: @size40;
                    line-height: @size40;
                    position: relative;
                    text-align: center;
                    border: 1px solid rgb(129, 135, 140);
                    .nobtn1{
                        color:#3C434D !important;
                    }
                    .btn1{
                        width: 1.46rem;
                        position: absolute;
                        left: 0;
                        top: -3px;
                        font-size: 50px;
                        line-height: 40px;
                        color: red;
                    }
                    .btn2{

                        width: 1.46rem;
                        position: absolute;
                        right: 0;
                        top: -3px;
                        font-size: 35px;
                        line-height: 40px;
                        color: red;
                    }
                    .label{
                        font-size: 10px;
                    }
                    .price{
                        font-size: 11px;
                        width: 2.68rem;
                        font-weight: bold;
                    }
                }
                .worthy{
                    box-sizing: border-box;
                    height: 1.52rem;
                    border-bottom: 1px solid rgb(129, 135, 140);
                    padding-top: 10px;
                    .tit{
                        font-size: 10px;
                        color: rgb(129, 135, 140);
                    }
                    .money{
                        font-size: 11px;
                        font-weight: bold;
                    }
                }
                .explain{
                    font-size: 10px;
                    color: rgb(129, 135, 140);
                    text-align: left;
                    box-sizing: border-box;
                    padding-top: @size10;
                    span{
                        font-weight: bold;
                        font-size: 10px;
                        color: #000;

                    }
                }
                .payway{
                    font-size: 14px;
                    padding-top: @size25;
                    text-align: left;
                }
                .pay{
                    height: @size50;
                    border-top: 1px solid rgb(129, 135, 140);
                    .check{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(0, 185, 181);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -11px;
                            color: rgb(0, 185, 181);
                        }
                    }
                    .check1{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            line-height: @size10;
                            position: absolute;
                            top: -1px;
                            left: -12px;
                            display: none
                        }
                    }
                    .check2{
                        float: left;
                        margin-top: 18px;
                        box-sizing: border-box;
                        border: 3px solid rgb(168, 174, 180);
                        width: @size14;
                        height: @size14;
                        position: relative;
                        text-align: center;
                        i{
                            font-size: @size10;
                            font-weight: bold;
                            position: absolute;
                            top: -0.54rem;
                            left: -0.3rem;
                        }
                    }
                    i{
                        font-size: 25px;
                        color: rgb(168, 174, 180);
                        float: left;
                        margin-left: @size10;
                        line-height:  @size50;

                    }
                    img{
                        width: 0.67rem;
                        height: 0.67rem;
                        margin-top: 13px;
                        float: left;
                        margin-left: 0.23rem;
                    }
                    .background1{
                        color: rgb(107, 184, 105)
                    }
                    .background2{
                        color: rgb(0, 157, 235)
                    }
                    .infoWexin{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: @size16;
                        color: rgb(129, 135, 140);
                        .span1{
                            font-size: 13px;
                            line-height: @size13;
                            color: rgb(129, 135, 140);
                        }
                        .span2{
                            font-size: 10px;
                            line-height: @size10;
                            color: rgb(129, 135, 140);
                        }
                        .span3{
                            font-size: 13px;
                            line-height: @size13;
                            color: #000;
                        }
                    }
                    .infoAlipay{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: rgb(129, 135, 140);
                        font-size: 15px;
                    }
                    .infoAlipay2{
                        text-align: left;
                        float: left;
                        margin-left: @size10;
                        margin-top: 17px;
                        color: #000000;
                        font-size: 15px;
                    }
                }

                .footer{
                    height: @size45;
                    box-sizing: border-box;
                    border-top: 1px solid rgb(53, 60, 70);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    line-height: @size45;
                    font-size: 14px;
                }
            }
        }
        .infomation{
            box-sizing: border-box;
            position: fixed;
            bottom: @size45;
            width: 100%;
            height: @size35;

            text-align: center;
            font-size: 13px;
            line-height: @size25;
            .learnMore{

                width: 1.6rem;
                height: @size15;
                border: 1px solid white;
                border-radius:3px;
                font-size:  9px;
                color: white;
                line-height: @size15;
                margin:@size10 @size10 @size10 @size10;
            }
            .value{
                font-size:  12px;
                color: white;
                margin-top:@size6;
            }
            .value1{
                color: black;
                font-size:  12px;
                margin-top:@size6;
                margin-right: @size10;
            }
            .success{
                font-size: 12px;
                color: white;
                line-height: @size35;
                padding-right: @size20;
            }
            .warn{
                font-size: @size10;
                color: white;
                line-height: @size35;
            }
            .time{
                display: inline-block;
                color: white;
                margin-right: @size15;
                .num{
                    height: @size20;
                    background: black;
                    border-radius:3px;
                    padding: 2px;
                    margin-top:@size6;
                    line-height: @size22;
                    font-size: @size12;
                    font-weight: bold;
                }
                .colon{
                    text-align: center;
                    margin-top:@size6;
                    line-height: @size22;
                    width: @size10;
                }
            }
            .time1{
                display: inline-block;
                color: black;
                margin-right: @size15;
                box-sizing: border-box;
                .num{
                    // box-sizing: border-box;
                    border: 0.5px solid rgb(129, 135, 140);
                    height: @size20;
                    background: white;
                    border-radius:3px;
                    padding: 2px;
                    margin-top:@size6;
                    line-height: @size21;
                    font-size: @size12;
                    font-weight: bold;
                }
                .colon{
                    font-weight: bold;
                    text-align: center;
                    margin-top:@size6;
                    line-height: @size22;
                    width: @size10;
                }
            }
        }
        //即将开始
        .bground1{
            background: white;
            border-top:1px solid rgb(201, 209, 218);
            max-width: 10rem;
        }
        //进行中
        .bground2{
            background:linear-gradient(30deg,rgb(0, 224, 222) 0%,rgb(104, 105, 237) 100%);
            max-width: 10rem;
        }
        //已经拍中
        .bground3{
            background:linear-gradient(30deg,#f54ea2 0%,#dd704c 100%);
            max-width: 10rem;
        }
        //流拍
        .bground4{
            background:gray;
            max-width: 10rem;
        }
        //底部
        .footer{
            width: 100%;
            max-width: 10rem;
            height: 1.2rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 101;
            background: #fafbfc;
            box-sizing: border-box;
            border-top: 1px solid #353c46;
            .value{
                float: left;
                width: 5.6rem;
                height: 100%;
                line-height: @size45;
                position: relative;
                text-align: center;
                .nobtn1{
                    color:#3C434D !important;
                }
                .btn1{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: left;
                }
                .btn2{
                    width: 1.46rem;
                    line-height:@size40;
                    font-size: 35px;
                    color: red;
                    float: right;
                }
                .label{
                    font-size: 8px;
                }
                .price{
                    font-size: 11px;
                    width: 2.68rem;
                    font-weight: bold;
                }
            }
            .r-icon{
                float: right;
                height: 100%;
                width: @size45;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                i{
                    line-height: @size45;
                    font-size: @size30;
                }
                img{
                    width: 70%;
                    height: 67%;
                    margin: 0.2rem auto;
                }
            }
            .offer{
                float: right;
                width: 3.2rem;
                height: 100%;
                box-sizing: border-box;
                border-left:1px solid rgb(205, 212, 220);
                text-align: center;
                line-height: @size45;
                font-size: 14px;
            }
        }
        .talk{
            width: 1rem;
            height: 0.9rem;
            background: #fff;
            position: fixed;
            right: 0;
            top: 5.5rem;
            bottom: 0;
            margin: auto;
            border: 2px solid #343c47;
            border-right: none;
            border-bottom-left-radius: 6px;
            border-top-left-radius:6px;
            padding:0.2rem;
            box-sizing:border-box;
            img{
                width:0.56rem;
                height:0.5rem;
            }
        }
        .serviceBk{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#000000;
            opacity: 0.65;
            z-index:200;

        }
        .serviceBox{
            width:7rem;
            height:9.2rem;
            position: absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background:#fff;
            padding:0.5rem;
            z-index:201;
            .serviceClose{
                position: absolute;
                right:0;
                top:0;
                width:0.8rem;
                height:0.8rem;
                background:#EB6100;
                color:#fff;
                text-align: center;
                line-height:0.7rem;
                font-size: 0.9rem;
            }
            .serviceTop{
                text-align: center;
                margin-top:0.5rem;
                margin-bottom:0.4rem;
                h2{
                    font-size:18px;
                }
                p{
                    font-size:12px;
                    margin-top:0.2rem;
                }
            }
            .serviceList{
                overflow: hidden;
                font-size: 12px;
                padding:0.3rem 0 0.3rem 2.3rem;
                border-top:1px solid #B5B8BA;
                img{
                    float:left;
                    width:0.5rem;
                }
                p{
                    width:2rem;
                    text-align: center;
                    float:left;
                    font-size:12px;
                }
            }
            .serviceWX{
                overflow: hidden;
                font-size: 12px;
                border-top:1px solid #B5B8BA;
                text-align: center;
                img{
                    width:2rem;
                    height:2rem;
                    margin: 0.4rem auto;
                }
                p{
                    font-size:12px;
                }
                .p{
                    font-size:9px;
                    color:#C3C3C3;
                }
            }
        }
    }
</style>