<template>
    
    <div class="dis">
        <div class="transparent" v-if="dis"></div>
        <div class="record"  v-if="dis">
            <div class="down" @click="getNone()">^</div>
            <div class="content">
                <div class="pic fl"><img src="../../assets/image/myimage/timg.jpg" alt=""></div>
                <div class="info fl">
                    <div class="tit">起拍价格</div>
                    <div class="price">50,000 CNY</div>
                    <div class="title">茶壶茶壶</div>
                    <div class="time">201708-076</div>
                </div>
            <!-- 三种状态 index
            1.竞拍中
            2.被别人拍中
            3被自己拍中 -->
                <div class="moneytime fr" v-if="index==1">
                    <div class="nowTit">当前价格</div>
                    <div class="nowPrice">200,000 CNY</div>
                    <div class="over">离结束还有</div>
                    <div class="time fr">
                        <div class="fr num">01</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">02</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">03</div>
                        <div class="fr colon"> :</div>
                        <div class="fr num">04</div>
                    </div>
                </div>
                <div class="moneytime fr" v-if="index==2">
                    <div class="nowTit">成交价格</div>
                    <div class="nowPrice">200,000 CNY</div>
                    <div class="over">成交时间</div>
                    <div class="time1 fr">
                        2017.10.25<br/>
                        23:30:00
                    </div>
                </div>
                <div class="moneytime fr" v-if="index==3">
                    <div class="nowTit">成交价格</div>
                    <div class="nowPrice">200,000 CNY</div>
                    <div class="over">付款期限</div>
                    <div class="time fr">
                        <div class="fr num">01</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">02</div>
                        <div class="fr colon">:</div>
                        <div class="fr num">03</div>
                        <div class="fr colon"> :</div>
                        <div class="fr num">04</div>
                    </div>
                </div>
            </div>
            <div class="bidRecord">
                <div  v-for="list in pricerecord">
                    <div class="reco">
                        <div class="price fl">{{list.money}}</div>
                        <div class="fr">
                            <div class="who ">{{list.name}}</div>
                            <div class="time">{{list.time}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>
<script type="text/ecmascript-6">
import priceRecord from'../../component/auction/priceRecord'
  export default {
    data () {
      return {
          arrays: [],
          dis:true,
          index:3,
          pricerecord:[
              {money:'200,000CNY',
              name:'某某某',
              time:'2017.10.25 23:12:34'},
              {money:'300,000CNY',
              name:'某某某',
              time:'2017.10.25 23:12:34'},
          ],
      }
    },
    components: {'z-price':priceRecord},
    mounted () {
    },
    methods: {
        getNone:function() {
            let that = this;
            that.dis = false;
        }
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
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
    .record{
        width: @size375;
        height: 12rem;
        position: fixed;
        z-index: 100;
        bottom: @size45;
        background: white;
        box-sizing: border-box;
        padding:0 @size20;
        text-align: center;
        /*display: none;*/
        .down{
            height: @size30;
            width: 100%;
            border-bottom: 1px solid rgb(202, 209, 217);
            font-size: 25px;
            color: rgb(202, 209, 217);
        }
        .content{
            height: 2.99rem;
            border-bottom: 1px solid rgb(202, 209, 217);
            .pic{
                width: @size80;
                height: @size80;
                padding-top: @size15;
                display: inline-block;
                img{
                    width: 100%;
                    height: 100%;
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
                    font-size: 14px;
                    color: red;
                    font-weight: bold;
                }
                .over{
                    padding-top: @size10;
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
        height:  7.99rem;
        // overflow: hidden;
        overflow: scroll;
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
    }
}

</style>