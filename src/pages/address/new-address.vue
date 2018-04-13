<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
   
    <div class="new-address" id="" v-set-title="title">
        <!-- <div class="header">传家</div> -->
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>SHIPPING ADDRESS</div>
                <div class="loginCn">地址选择</div>
            </div>
            <div>
            	<!-- <v-distpicker></v-distpicker> -->
            </div>
            <div class="icon" @click="Return()">
                <div ><img src="../../assets/image/mycenter/right.png"/></div>
            </div>
        </div>
        <div class="box2">
            <div class="info"><span>联系人</span>
                <input type="" placeholder="请输入联系人姓名" v-model="name"/>
                <div class="infoClose" @click="remname()" v-if="name!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>联系方式</span>
                <input type="number" placeholder="请输入联系人的手机号码" v-model="phone"/>
                <div class="infoClose" @click="remphone()" v-if="phone!=''"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>所在地区</span>
                <!-- <input type="" placeholder="请选择"/> -->
           <span class="diqu">
            <el-select v-model="provinceIndex" placeholder="请选择" @change="selChange()" class="select-city">
                <el-option
                        v-for="item,index in province"
                        :key="item.id"
                        :label="item.name"
                        :value="index+1"
                        >
                </el-option>
            </el-select>
            <el-select v-model="cityIndex"  placeholder="请选择" @change="selChange2()" class="select-city">
                <el-option
                        v-for="item,index in city"
                        :key="item.id"
                        :label="item.name"
                        :value="index+1">
                </el-option>
            </el-select>
            <el-select v-model="countyIndex"  placeholder="请选择" @change="selChange3()" class="select-city">
                <el-option
                        v-for="item,index in county"
                        :key="item.id"
                        :label="item.name"
                        :value="index+1">
                </el-option>
            </el-select>
        	<!--<select id="citySel" @change="selChange()">
        	    <option>请选择</option>
        		<option v-for="list in province">{{list.name}}</option>
        	</select>
        	<select id="citySel2" @change="selChange2()">
        	    <option>请选择</option>
        		<option v-for="list in city">{{list.name}}</option>
        	</select>
        	<select id="citySel3" @change="selChange3()">
        	    <option>请选择</option>
        		<option v-for="list in county">{{list.name}}</option>
        	</select>-->
        </span>
                <div class="infoClose"><i>. . .</i></div>
            </div>
            <div class="detail">
                <textarea placeholder="请输入详细地址，小区、门牌等信息，5-60个字" v-model="detailAdress"></textarea>
            </div>
            <!-- <div class="resize">
                <div class="check"><i class="iconfont icon-duihao"></i></div>
                <span class="">设置为默认地址</span>
            </div> -->
           <!--  <div class="del">
                <div class="delete"><i class="iconfont icon-tupian"></i></div>
                <span>删除地址</span>
            </div> -->
        </div>
        <div class="prompt" v-if="prompt!=''">{{prompt}}</div>
        <div class="footer" @click="postAddress()" v-if="addressid==''">保&nbsp;&nbsp;存</div>
        <div class="footer" @click="postAddressid()" v-if="addressid!=''">保&nbsp;&nbsp;存</div>
        <!--联系客服-->
        <div class="talk" @click="openService()">
            <img src="../../assets/image/mycenter/icon5.png"/>
        </div>
        <!--客户服务-->
        <div class="serviceBox" v-if="ServiceBox">
            <div class="serviceClose" @click="closeService()">×</div>
            <div class="serviceTop">
                <h2>ASSISTANCE</h2>
                <p>客户服务</p>
            </div>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t1.png"/>
                    <p>电话委托</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t2.png"/>
                    <p>客服服务</p>
                </div>
            </a>
            <a href="tel:15801619600">
                <div class="serviceList">
                    <img src="../../assets/image/mycenter/t3.png"/>
                    <p>私恰</p>
                </div>
            </a>
            <div class="serviceWX">
                <img src="../../assets/image/mycenter/wx.png"/>
                <p>联系微信客服</p>
                <p class="p">长按识别二维码</p>
            </div>
        </div>
        <div class="serviceBk" v-if="ServiceBox"></div>
 <!--        <div class="vv_anbu">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>5</p>
          <p>6</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>5</p>
          <p>6</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
        </div> -->
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {common} from '../../assets/js/common/common'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
        title:'传家',
        arrays: [],
        index:1,
        name:'',//联系人
        phone:'',//手机号
        detailAdress:'',//详细地址 
        cityInfo: '',
        province:'',
        provinceid:'',
        provinceName:'',
        city:'',
        cityid:'',
        cityName:'',
        county:'',
        countyid:'',
        countyName:'',
        addressid:'',//地址id
        defaultAdress:'',//是否是默认地址
        prompt:'',
          provinceIndex:'',
          cityIndex:'',
          countyIndex:'',
          ServiceBox:false,
      }
    },
//      components:{'city-picker':city},
      syncData({store}) {
      const that = this;
      return Promise.all([
        appervice.getCitys().then(res=>{
                   store.state.homeStore.listImg = res;
        }),
    ])
    },
    computed: {
      //将存在store中的数据取出
      listImg() {
        return this.$store.state.homeStore.listImg || []
      },
      // noticelist() {
      //   return this.$store.state.homeStore.noticelist || []
      // },

    },
    mounted () {
      // common.onMove('.new-address')
     document.body.addEventListener('touchmove', function (event) {
            // if (!evt._isScroller) {
                event.returnValue = true;
            // }
        },false)
    	this.getCitys()
    	this.getAddressid()
      // this.onMove()
    	
    },
    methods: {
      Return:function(){
        window.history.go(-1)
      },
        //打开客服
        openService(){
            let that = this;
            that.ServiceBox = true;
        },
        //关闭客服
        closeService(){
            let that = this;
            that.ServiceBox = false;
        },
        remname:function(){
          this.name=''
        },
        remphone:function(){
           this.phone=""
        },
    	getAddressid:function(){
            let that = this
            that.addressid=this.$route.query.id
             if(that.addressid!=''){
              commonService.getAddressid(that.addressid).then(function(res){
                // that.bankCard=res.data.datas
                  let list=res.data.datas
                  console.log(list)
                  that.name=list.name
                  that.phone=list.phone
                  that.detailAdress=list.detailAdress
                  that.defaultAdress=list.defaultAdress
                  that.provinceid=list.provinceId
                  that.provinceName=list.provinceName
                  that.cityid=list.cityId
                  that.cityName=list.cityName
                  that.countyid=list.districtId
                  that.countyName=list.districtName

                  that.provinceIndex=list.provinceName
                  that.cityIndex=list.cityName
                  that.countyIndex=list.districtName
                  that.getCitys()
                  that.getCitysId()
                  that.getCitysId2()

                  // setTimeout(function (){
                  //      that.defaults()
                  //    }, 1000);

                 
                 })
             }
               
      },
          // 获取省
    	 getCitys:function(){
               let that = this;
               commonService.getCitys().then(function(res){
                  that.province=res.data.datas
                 })
            },
            // 获取市
            getCitysId:function(){
               let that = this
               commonService.getCitysId(that.provinceid).then(function(res){
                  that.city=res.data.datas
                 })
            },
            // 获取县
             getCitysId2:function(){
               let that = this
               commonService.getCitysId(that.cityid).then(function(res){
                  that.county=res.data.datas
                 })
            },
            // 默认地址
            // defaults:function(){
            // 	let that=this;
            //       if(that.province!=''){
            //       	var Sel=document.getElementById("citySel");
            //         for (var i = 0; i < Sel.options.length; i++){
            //          if (Sel.options[i].value == that.provinceName){  
            //              Sel.options[i].selected = true;   
            //             }  
            //            } 
            //       }
            //         if(that.city!=''){
            //       	var Sel2=document.getElementById("citySel2");
            //       for (var i = 0; i < Sel2.options.length; i++){ 
            //          if (Sel2.options[i].value == that.cityName){  
            //              Sel2.options[i].selected = true;   
            //             }  
            //         } 
            //       }
            //         if(that.county!=''){
            //      var  Sel3=document.getElementById("citySel3");
            //       for (var i = 0; i < Sel3.options.length; i++){  
            //          if (Sel3.options[i].value == that.countyName){  
            //              Sel3.options[i].selected = true;   
            //             }  
            //            } 
            //      }

            // },
            // 选择省
            selChange:function(){
                var  Sel=document.getElementById("citySel");
            	// var oTxt = document.getElementById('citySel2').select();
            	var index=this.provinceIndex;
          
              
            	if(index!=0){
            	this.provinceid=this.province[index-1].cityId
            	this.provinceName=this.province[index-1].name	
            	}else{
            	this.provinceid=''
            	this.provinceName=''
            	}
            	
            	this.getCitysId()
              this.cityIndex=''
              this.countyIndex=''
            },
            // 选择市
             selChange2:function(){
//            	var  Sel=document.getElementById("citySel2");
            	var index=this.cityIndex;
              this.county=''
            	if(index!=0){
                  this.cityid=this.city[index-1].cityId
                  this.cityName=this.city[index-1].name
            	}else{
            		this.cityid=''
            		this.cityName=''
            	}
            	this.getCitysId2()
              this.countyIndex=''
            },
            // 选择县
              selChange3:function(){
//            	var  Sel=document.getElementById("citySel3");
            	var index=this.countyIndex;
            	if(index!=0){
                this.countyid=this.county[index-1].cityId
            	this.countyName=this.county[index-1].name
            	}else{
            	this.countyid=''
            	this.countyName=''	
            	}
            },
            // 新增地址
             postAddress:function(){
               let that = this
               
                 let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                 let flag = reg.test(that.phone)
                 if(!flag){
                  that.prompt='手机格式不正确'
                   setTimeout(() => { 
                                 
                          that.prompt= ''
                        },2000) 

                   return false
                 }
              
                   if(that.detailAdress.length < 5||that.detailAdress.length>60){
                  that.prompt='详细地址5-60个字'
                   setTimeout(() => { 
                                 
                                   that.prompt= ''
                                      },2000) 
                   return false
                 }
                    
                    return false
                 if(that.name=='' || that.phone=='' || that.provinceName=='' || that.cityName=='' || that.detailAdress=='' || that.districtName==''){
                  that.prompt='请填写完整'
                  return false
                 }
               commonService.postAddress({name:that.name,phone:that.phone,provinceName:that.provinceName,provinceId:that.provinceid,cityName:that.cityName,cityId:that.cityid,districtName:that.countyName,districtId:that.countyid,detailAdress:that.detailAdress}).then(function(res){
                // that.bankCard=res.data.datas
                   if(res.data.code==200){
                      window.history.go(-1)
                   }
                  
                 })
            },
            // 修改地址
             postAddressid:function(){
               let that = this
               let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                 let flag = reg.test(that.phone)
                 if(!flag){
                  that.prompt='手机格式不正确'
                   return false
                 }
                 if(that.name=='' || that.phone=='' || that.provinceName=='' || that.cityName=='' || that.detailAdress=='' || that.districtName==''){
                  that.prompt='请填写完整'
                  return false
                 }
               commonService.postAddressid(that.addressid,{type:1,defaultAdress:that.defaultAdress,available:true,name:that.name,phone:that.phone,provinceName:that.provinceName,provinceId:that.provinceid,cityName:that.cityName,cityId:that.cityid,districtName:that.countyName,districtId:that.countyid,detailAdress:that.detailAdress}).then(function(res){
                // that.bankCard=res.data.datas
                  if(res.data.code==200){
                      window.history.go(-1)
                   }
                  
                 })
            },
    //       onMove: function () {
    //     let overscroll = function (el) {
    //       console.log(el)
    //       for (var i = 0; i < el.length; i++) {
    //         el[i].addEventListener('touchstart', function () {
    //             let top = el[i].scrollTop
    //                 , totalScroll = el[i].scrollHeight
    //                 , currentScroll = top + el[i].offsetHeight;
    //             if (top === 0) {
    //                 el[i].scrollTop = 1
    //             } else if (currentScroll === totalScroll) {
    //                 el[i].scrollTop = top - 1
    //             }
    //         });
    //         el[i].addEventListener('touchmove', function (evt) {
    //             if (el[i].offsetHeight < el[i].scrollHeight)
    //                 evt._isScroller = true
    //         })
    //       }
    //     };
    //     overscroll(document.getElementsByClassName('el-scrollbar__wrap'));
    //     document.body.addEventListener('touchmove', function (evt) {
    //         if (!evt._isScroller) {
    //             evt.preventDefault()
    //         }
    //     })
    // },
       
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .new-address{
         // position: fixed;
         //  left: 0;
         //  right: 0;
         //  top: 0;
         //  overflow-y: scroll;
         //  bottom: 0;
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
    // .header{
    //     position: fixed;
    //     top: 0;
    //     z-index: 100;
    //     width: @size375;
    //     height: @size45;
    //     background:rgba(2, 10, 2, 1);
    //     font-size: @size20;
    //     color: white;
    //     text-align: center;
    //     line-height: @size45;
    // }
    .content{
        margin-top: @size45;
        width:100%;
        height:3.7rem;
        border-bottom:2px solid rgb(51, 51, 51);
        padding:1.07rem 0.53rem;
        box-sizing: border-box;
        position: relative;
        
        .loginBox{
            // width:80%;
            float:left;
            .loginEn{
                height:0.75rem;
                font-weight: 600;
                font-size:16px;
                letter-spacing: @size3;
            }
            .loginCn{
                font-size: 15px;
            }
        }
        .icon{
            float: right;
            div{
                margin-top: @size20;
                img{
                  width: 1rem;
                  margin-top: 0.2rem;
                    
                }
            }
            
        }
    }
    .box2{
        width:100%;
        padding:@size20;
        box-sizing: border-box;
         padding-bottom: @size55;
        .info{
            width: 100%;
            height: @size40;
            border-bottom: 1px solid #87828c;
            text-align: left;
            // position: relative;
            span{
                width: 2rem;
                line-height: 1.02rem;
                float: left;
                font-size: 14px;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                height: 100%;
                float: left;
                border: none;
                outline: none;
                font-size: 14px;
            }
            .diqu{
            	width: 6rem;
                // position: absolute;
                // left: 2rem;
                // top: 0;
                // z-index: 40;
                float: left;
                margin-top: 1px;
            	
            	select{
            		width: 1.8rem;
            		height: 1.02rem;
            		// border-radius: 2px;
            		border:none;
            		outline:medium;
            	}

            }
            .infoClose{
                float: right;
                color:#87828c;
                line-height: 1.02rem;
                margin-right: 0.2rem;
            }
        }
        .detail{
            height: 2.666rem;
            width: 8.933rem;
            background: gray;
            margin-top: @size15;
            box-sizing: border-box;
            overflow: hidden;
            border-radius: 6px;
            textarea{
                width: 100%;
                height: 100%;
                background: rgb(238, 238, 238);
                border: none;
                outline: none;
                box-sizing: border-box;
                padding: @size10;
                font-size: 13px;
                letter-spacing: @size1;
            }
        }
        .resize{
            height: @size50;
            padding-top: @size15;
            .check{
                float: left;
                box-sizing: border-box;
                border: 3px solid rgb(0, 185, 181);
                width: @size14;
                height: @size14;
                position: relative;
                i{
                    font-size: 10px;
                    line-height: @size10;
                    position: absolute;
                    top: -1px;
                    left: -11px;
                    color: rgb(0, 185, 181);
                }
            }
            span{
                font-size: 14px;
                padding-left: @size8;
                line-height: @size15;
            }
            
        }
        .del{
            height: @size40;
            border-bottom: 1px solid rgb(168, 174, 180);
            line-height: @size40;
            .delete{
                float: left;
                color: red;
                width: @size14;
                height: @size14;
            }
            span{
                font-size: 14px;
                padding-left: @size8;
                color: red;
            }
        }
    }
    .prompt{
       position:fixed;
        bottom:1.2rem;
        left: 0;
        width: 100%;
       height: 0.67rem;
       line-height: 0.67rem;
        color: #fff;
        background: linear-gradient(70deg, #DC704A, #F44EA0);
        text-align: center;
         font-size: 12px;

    }
    .footer{
        position:fixed;
        bottom:0;
        width: @size375;
        height: 1.2rem;
		box-sizing: border-box;
        border-top:1px solid rgb(53, 60, 70); 
        text-align: center;
        line-height: 1.2rem;
        font-size: 12px;
    }
        .select-city.el-select {
            height: 38px;
            line-height: 38px;
            display: inline-block;
            width: 1.8rem;
            overflow: hidden;
            span{
                display: none;
            }
        }
        


}
    .el-select-dropdown {
        margin-top: 40px!important;
       
    }
    .el-scrollbar__wrap{
       overflow: hidden!important;
       overflow-y: auto!important;
    }
    .vv_anbu{
      width: 300px;
      max-height: 100px;
      background: red;
      
      p{
        line-height: 20px;

      }
    }
   
  


</style>

