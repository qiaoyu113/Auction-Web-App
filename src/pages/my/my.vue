<template>
    <div class="my">
      <!--  <div class="header"><div>传家</div></div> -->
        <div class="head clearfix"><div><router-link to="/my/notstart"><span :class="{'show':indexs==0}" @click="show(0)">未开始</span></router-link></div>
            <div><router-link to="/my/lot"><span :class="{'show':indexs==1}" @click="show(1)">参拍中</span></router-link></div>
             <div><router-link to="/my/already"><span :class="{'show':indexs==2}" @click="show(2)">已拍中</span></router-link></div>
            <div><router-link to="/my/not"><span :class="{'show':indexs==3}" @click="show(3)">未拍中</span></router-link></div>
        </div>
        <router-view></router-view>
        <z-footer ></z-footer>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title: '传家',
                indexs:0,
            }
        },
        syncData({store}) {
            const that = this;
            return Promise.all([
                appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
                }),
                service.getParam().then(res=>{
//                    store.state.homeStore.noticelist = res.data.datas;
                }),
            ])
        },
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
             if(this.$route.path=="/my/notstart"){
                   this.indexs=0
             }else if(this.$route.path=="/my/lot"){
                   this.indexs=1
             }else if(this.$route.path=="/my/already"){
                   this.indexs=2
             }else if(this.$route.path=="/my/not"){
                   this.indexs=3
             }
        },
        methods: {
            show:function(id){

               this.indexs=id
            }

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .my{
      //   .header{
      //      height: @size45; 
      //       div{
      //   position: fixed;
      //   top: 0;
      //   z-index: 100;
      //   width: @size375;
      //   height: @size45;
      //   background:rgba(2, 10, 2, 1);
      //   font-size: @size20;
      //   color: white;
      //   text-align: center;
      //   line-height: @size45;
      //     }
      // }
        .head{
            width:100%;
            height: @size40;
            border-bottom: 1px solid rgb(53,60,70);
            padding-bottom: 1px;
            position: fixed;
            top:0;
            background:#fff;
            z-index:100;
            div{
                float:left;
                width: 25%;
                text-align: center;
                line-height: @size40;
                font-size:0.3733rem;
                p{
                    font-size:0.3733rem;
                    color: rgb(153,153,153);
                }
                .show{
                    color: #333333;
                    border-bottom: 2px solid #353c46;
                    height: 1.0667rem;
                    display: inline-block;
                    padding: 0 0.16rem;
                    font-size:0.3733rem;
                }
                span{
                    color: #999999;
                    font-size:0.3733rem;
                }
            }
        }

    }


</style>

