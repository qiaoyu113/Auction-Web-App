<template>
    <!-- 删除订单 -->
            <div class="popWin" v-if="msg.type==1">
                <div class="close" @click="close"><i class="iconfont icon-closeicon"></i></div>
                <div class="remove">
                    <p class="removeEn">{{msg.enInfo}}</p>
                    <p class="removeCn">{{msg.chInfo}}</p>
                    <p :class='msg.classObject' class="iconfont removeIco"></p>
                    <p class="removeCon">{{msg.confirm}}</p>
                </div>
                <div class="confirm">确 定</div>
            </div>
            <!-- 确认订单 -->
            <div class="popWin" v-else-if="msg.type==2">
                <div class="close" @click="close"><i class="iconfont icon-closeicon"></i></div>
                <div class="remove">
                    <p class="removeEn">{{msg.enInfo}}</p>
                    <p class="removeCn">{{msg.chInfo}}</p>
                    <p :class='msg.classObject' class="iconfont removeIco"></p>
                    <p class="removeCon">{{msg.confirm}}</p>
                </div>
                <div class="confirm">确 定</div>
            </div>
            <!-- 客服服务 -->
            <div class="popWin" v-else-if="msg.type==3">
                <div class="close" @click="close"><i class="iconfont icon-closeicon"></i></div>
                <div class="remove">
                    <p class="removeEn">ASSISTANCE</p>
                    <p class="removeCn">客户服务</p>
                </div>
                <div class="option">
                    <div class="">电话服务</div>
                    <div class=""><i class="iconfont icon-huiyuanzhongxin"></i>客服委托</div>
                    <div class="">私洽</div>
                </div>
            </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['msg'],
    data () {
      return {
          arrays: [],
          
      }
    },
    components: {},
    mounted () {
    },
    methods: {
        close: function() {
            this.msg.type = 0;
        },
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
@import url('../../assets/css/icon/iconfont.css');
.popWin{
        position: absolute;
        top:100px;
        left: 50px;
        width: 7.33rem;
        height: 7.33rem;
        margin: auto;
        background: white;
        .close{
            position: absolute;
            right: 0;top: 0;
            width: @size30;
            height: @size30;
            background: #eb6100;
            i{
                font-size: @size30;
                color: white;
            }
        }
        .remove{
            padding-top: 1.2rem;
            margin: auto;
            
            text-align: center;
            .removeEn{
                font-size: 14px;
                font-weight: bold;
            }
            .removeCn{
                color: #333333;
                font-size: 11px;
            }
            .removeIco{
                font-size: 1rem;
                color: #363c45;
                padding-top: 20px;
            }
            .removeCon{
                color: #333333;
                font-size: 11px;
                padding: 15px;
            }
        }
        .confirm{
            width: 100%;
            height: @size45;
            position: absolute;
            bottom: 0px;
            left: 0;
            border-top: 1px solid #353c46;
            text-align: center;
            line-height: @size45;
            
        }
        .option{
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            position: absolute;
            bottom: 3px;
            padding: 0 0.53rem;
            div{
                font-size: 11px;
                color: black;
                height: @size40;
                line-height: @size40;
                padding-bottom: 3px;
                border-top: 1px solid rgba(124, 137, 131, 1);
                i{
                    padding-right: 5px;
                    color: #363c45;
                }
            }
        }
    }
    
</style>