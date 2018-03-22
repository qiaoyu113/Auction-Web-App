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
            <li class="fl" @click="checked(0)">
                <img v-if="index == 0" src="../../assets/image/mycenter/c1.png"/>
                <img v-if="index != 0" src="../../assets/image/mycenter/i1.png"/>
                <p :class="index == 0 ? '':'pc'">专题</p>
            </li>
            <li class="fl" @click="checked(1)">
                <img v-if="index == 1" src="../../assets/image/mycenter/c2.png"/>
                <img v-if="index != 1" src="../../assets/image/mycenter/i2.png"/>
                <p :class="index == 1 ? '':'pc'">专场</p>
            </li>
            <li class="fl" @click="checked(2)">
                <img v-if="index == 2" src="../../assets/image/mycenter/c3.png"/>
                <img v-if="index != 2" src="../../assets/image/mycenter/i3.png"/>
                <p :class="index == 2 ? '':'pc'">我的</p>
            </li>
            <li class="fl" @click="checked(3)">
                <img v-if="index == 3" src="../../assets/image/mycenter/c4.png"/>
                <img v-if="index != 3" src="../../assets/image/mycenter/i4.png"/>
                <p :class="index == 3 ? '':'pc'">个人</p>
            </li>
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
                index:'0',
				footName: '',
				routePath: '',
				routeName: ''
			}
		},
		mounted() {
			const that = this;
			// 请求底部数据
            if(that.$route.name == 'home'){
                that.index = 0
            }else if(that.$route.name == 'special'){
                that.index = 1
            }else if(that.$route.name == 'notstart'){
                that.index = 2
            }else if(that.$route.name == 'lot'){
                that.index = 2
            }else if(that.$route.name == 'already'){
                that.index = 2
            }else if(that.$route.name == 'not'){
                that.index = 2
            }else if(that.$route.name == 'personalCenter'){
                that.index = 3
            }
		},
        methods: {
            checked(index){
                let that = this;
                that.index = index;
                if(index === 0){
                    that.$router.replace({name:'home'})
                    that.index = 0;
                }else if(index === 1){
                    that.$router.replace({name:'special'})
                    that.index = 1;
                }else if(index === 2){
                    that.$router.replace({name:'my'})
                    that.index = 2;
                }else if(index === 3){
                    that.$router.replace({name:'personalCenter'})
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
		background: #ffffff;
		box-sizing: border-box;
		border-top:1px solid rgb(53, 60, 70);
        z-index:100;
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
                img{
                    width: 0.8rem;
                    height: 0.8rem;
                    margin-top: 0.03rem;
                }
                p{
                    margin-top: -0.5rem;
                    font-size: 8px;
                }
                .pc{
                    color:#A5ACB1;
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