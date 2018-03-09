<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <div class="my">
       <div class="head clearfix">
       <div><router-link to="/my/notstart"><p :class="{'show':indexs==0}" @click="show(0)">未开始</p></router-link></div>
           <div><router-link to="/my/lot"><p :class="{'show':indexs==1}" @click="show(1)">参拍中</p></router-link></div>
            <div><router-link to="/my/already"><p :class="{'show':indexs==2}" @click="show(2)">已拍中</p></router-link></div>
           <div><router-link to="/my/not"><p :class="{'show':indexs==3}" @click="show(3)">未拍中</p></router-link></div>
          
       </div>
     <div>
         <router-view></router-view>
     </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
                title: '我的',
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
        .head{
             height: @size40;
             border-bottom: 1px solid rgb(53,60,70);
             padding-bottom: 1px;
            div{
                float:left;
                width: 25%;
                text-align: center;
                line-height: @size40;
                p{
                font-size: 12px; 
                color: rgb(153,153,153);
                }
                .show{
                    color: rgb(51,51,51);
                    border-bottom: 2px solid rgb(53,60,70);
                }    
            }
        }

    }


</style>

