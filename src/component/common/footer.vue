<template>
	<!--<div class="footer" id="footer">-->
		<!--<router-link v-for="(item, index) in listFoot" :key="item.type"-->
        	<!--:to="{ name :item.imgType == '1'? 'home'-->
                    <!--:item.imgType == '2'? 'special'-->
                    <!--:item.imgType == '3'? 'knowledge'-->
                    <!--:item.imgType == '4'? 'mycenter': 'article' }"-->
        	<!--class="single-bottom index-page" ref="myBoxa" replace>-->

			<!--<i v-if="item.imgType == footName" class="iconfont changecolor footer-btn"-->
            	<!--v-bind:class="{'icon-shouyetianchong': item.imgType == '1',-->
                            <!--'icon-zhishitianchong': item.imgType == '2',-->
                            <!--'icon-wenzhangtianchong': item.imgType == '3',-->
                            <!--'icon-wodetianchong': item.imgType == '4'}"></i>-->
			<!--<i v-else class="iconfont"-->
            	<!--v-bind:class="{'icon-shouye1': item.imgType == '1',-->
                            <!--'icon-huodong4': item.imgType == '5',-->
                            <!--'icon-zhishi3': item.imgType == '4',-->
                            <!--'icon-wode1': item.imgType == '2',-->
                            <!--'icon-wenzhang1': item.imgType == '3'}"></i>-->
			<!--&lt;!&ndash;<p>{{item.name}}</p>&ndash;&gt;-->
		<!--</router-link>-->
	<!--</div>-->
	<div class="footer">
        <ul class="clearfix">
            <li class="fl" @click="checked(0)"><i :class="index == 0 ? 'iconfont icon-shouyetianchong check' : 'iconfont icon-shouyetianchong'"></i></li>
            <li class="fl" @click="checked(1)"><i :class="index == 1 ? 'iconfont icon-zhishitianchong check' : 'iconfont icon-zhishitianchong'"></i></li>
            <li class="fl" @click="checked(2)"><i :class="index == 2 ? 'iconfont icon-wenzhangtianchong check' : 'iconfont icon-wenzhangtianchong'"></i></li>
            <li class="fl" @click="checked(3)"><i :class="index == 3 ? 'iconfont icon-wodetianchong check' : 'iconfont icon-wodetianchong'"></i></li>
        </ul>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				listFoot: [
                    {type:"1",
                     imgType:'1',
                     name:''
                    },
                    {type:"2",
                        imgType:'2',
                        name:''
                    },
                    {type:"3",
                        imgType:'3',
                        name:''
                    },
                    {type:"4",
                        imgType:'4',
                        name:''
                    }
                ],
                index:0,
				footName: '',
				routePath: '',
				routeName: ''
			}
		},
		mounted() {
			const that = this;
			// 请求底部数据
//            console.log(that.$route.name);
            if(that.$route.name == 'home'){
                that.index = 0
            }else if(that.$route.name == 'special'){
                that.index = 1
            }
		},
        methods: {
            checked(index){
                let that = this;
                console.log(index)
//                console.log(that.$route.name);
                that.index = index;
                if(index === 0){
                    that.$router.replace({name:'home'})
                    that.index = 0;
                }else if(index === 1){
                    that.$router.push({name:'special'})
//                    that.$router.push({name:'specialMore',params:{id:'5aa1f83badc051793d0f3bd5'}})
                    that.index = 1;
                }else if(index === 2){
                    that.$router.replace({name:'home'})
                    that.index = 2;
                }else if(index === 3){
                    that.$router.replace({name:'home'})
                    that.index = 3;
                }
            }
        }

	}
</script>

<style lang="less">
/*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
//自己做的
	.footer{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
		background: rgb(249,248,243);
		box-sizing: border-box;
		border-top:1px solid rgb(53, 60, 70); 
        ul{
            li{
                width: 25%;
                height: 1.2rem;
                text-align: center;
                line-height: 1.2rem;
                i{
                    font-size: @size20;
                    color:rgb(168, 174, 180);
                    border: none;
                }
            }
            .check{
                color: black;
            }
        }
    }

	//原先组件本身的
	.index-bottom {
		max-width: 450px;
		width: 100%;
		height: 1.334rem;
		background: #FFFFFF;
		box-shadow: 0 -1px 0 0 #DDDDDD;
		position: fixed;
		bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		display: -webkit-flex;
		display: flex;
		box-sizing: border-box;
		z-index: 20;
		.single-bottom {
			padding: .1rem 0;
			flex: 1;
			-webkit-flex: 1;
			-moz-flex: 1;
			text-align: center;
			display: inline-block;
			text-decoration-line: none;
			top: 0.10133rem;
			.iconfont {
				display: inline-block;
				font-size: .586rem;
			}
			.changecolor {
				color: #6699FF
			}
			p {
				margin-top: .10667rem;
				/*font-size: .02666rem;*/
				color: #666666;
				width: 100%;
				height: .3117rem;
				line-height: .3117rem;
			}
		}
	}
	
	@media only screen and (min-device-width:320px) and (max-device-width:374px) {
		.index-bottom .single-bottom p {
			font-size: 9px;
		}
	}
	
	@media only screen and (min-device-width:375px) and (max-device-width:413px) {
		.index-bottom .single-bottom p {
			font-size: 10px;
		}
	}
	
	@media only screen and (min-device-width:414px) and (max-device-width:474px) {
		.index-bottom .single-bottom p {
			font-size: 11px;
		}
	}
	
	@media only screen and (min-device-width:475px) {
		.index-bottom .single-bottom p {
			font-size: 13px;
		}
	}
</style>