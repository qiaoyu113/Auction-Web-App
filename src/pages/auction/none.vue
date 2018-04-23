<template>
    <div id="auction">
        <img src="../../assets/image/mycenter/404.png"/>
        <div class="text">
            <h1>NOT FOUND</h1>
            <p>您的网络异常</p>
        </div>
        <div class="lookMore">请查看网络设置后重新加载</div>
        <div class="btn" @click="go()">重新加载</div>
    </div>
</template>

<script >
    import {commonService} from '../../service/commonService'
    import {common} from '../../assets/js/common/common'
    import item from "../../component/auction/item.vue"
    import info from "../../component/auction/info.vue"
    import record from "../../component/auction/record.vue"
    import payment from '../../component/auction/payment.vue'
    import MeScroll from 'mescroll'
    export default {
        data () {
            return {
                title: '茗探',
            }
        },
        mounted: function() {

        },
        methods: {
            go(){
                let that = this;
                that.$router.back(-1);
            }
        }
    }
</script>

<style lang="less">
    #auction{
        width:100%;
        height:100%;
        position: relative;
        background:#fff;
        img{
            width:100%;
            position: absolute;
            top:3rem;
            margin:auto;
        }
        .text{
            width:100%;
            height:1rem;
            text-align: center;
            position: absolute;
            bottom:2.4rem;
            h1{
                text-align: center;
                color:#000000;
            }
            p{
                text-align: center;
                color: #666;
                font-size: 14px;
            }
        }
        .lookMore{
            width: 100%;
            height: 0.67rem;
            line-height: 0.67rem;
            color: #fff;
            background: linear-gradient(70deg, #DC704A, #F44EA0);
            text-align: center;
            font-size: 12px;
            position: absolute;
            bottom:1.2rem;
        }
        .btn{
            width:100%;
            height:1.2rem;
            line-height:1.2rem;
            text-align: center;
            color:#333;
            border-top:1px solid #000000;
            position: absolute;
            bottom:0;
            font-size: 14px;
        }
    }
</style>