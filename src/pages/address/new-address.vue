<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
   
    <div class="new-address" id="" v-set-title="title">
        <div class="header">传家</div>
        <div class="content">
            <div class="loginBox">
                <div class='loginEn'>SHIPPING ADDRESS</div>
                <div class="loginCn">地址选择</div>
            </div>
            <div>
            	<!-- <v-distpicker></v-distpicker> -->
            </div>
            <div class="icon">
                <div ><i class="iconfont icon-tupian"></i></div>
            </div>
        </div>
        <div class="box2">
            <div class="info"><span>联系人</span>
                <input type="" placeholder="请输入" v-model="name"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>手机号</span>
                <input type="number" placeholder="请输入" v-model="phone"/>
                <div class="infoClose"><i class="iconfont icon-closeicon"></i></div>
            </div>
            <div class="info"><span>所在地区</span>
                <!-- <input type="" placeholder="请选择"/> -->
           <span class="diqu">
        	<select id="citySel" @change="selChange()">
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
        	</select>
        </span>
                <div class="infoClose"><i>. . .</i></div>
            </div>
            <div class="detail">
                <textarea placeholder="请输入详细地址" v-model="detailAdress"></textarea>
            </div>
            <!-- <div class="resize">
                <div class="check"><i class="iconfont icon-duihao"></i></div>
                <span class="">设置为默认地址</span>
            </div> -->
            <div class="del">
                <div class="delete"><i class="iconfont icon-tupian"></i></div>
                <span>删除地址</span>
            </div>
        </div>
      
        <div class="footer" @click="postAddress()" v-if="addressid==''">保&nbsp;&nbsp;存</div>
        <div class="footer" @click="postAddressid()" v-if="addressid!=''">保&nbsp;&nbsp;存</div>
    </div>
</template>

<script >
import {appService} from '../../service/appService'
import {commonService} from '../../service/commonService.js'
  export default {
    props: ['str'],
    data () {
      return {
        title:'地址',
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

      }
    },
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
    	// console.log(this.listImg)
    	this.getCitys()
    	this.getAddressid()
    	
    },
    methods: {

    	getAddressid:function(){
            let that = this
            that.addressid=this.$route.query.id
             if(that.addressid!=''){
             	commonService.getAddressid(that.addressid).then(function(res){
                // that.bankCard=res.data.datas
                  let list=res.data.datas
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
                  that.getCitys()
                  that.getCitysId()
                  that.getCitysId2()
                  setTimeout(function (){
                       that.defaults()
                     }, 1000);
                 
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
            defaults:function(){
            	let that=this;
                  if(that.province!=''){
                  	var Sel=document.getElementById("citySel");
                    for (var i = 0; i < Sel.options.length; i++){
                     if (Sel.options[i].value == that.provinceName){  
                         Sel.options[i].selected = true;   
                        }  
                       } 
                  }
                    if(that.city!=''){
                  	var Sel2=document.getElementById("citySel2");
                  for (var i = 0; i < Sel2.options.length; i++){ 
                     if (Sel2.options[i].value == that.cityName){  
                         Sel2.options[i].selected = true;   
                        }  
                    } 
                  }
                    if(that.county!=''){
                 var  Sel3=document.getElementById("citySel3");
                  for (var i = 0; i < Sel3.options.length; i++){  
                     if (Sel3.options[i].value == that.countyName){  
                         Sel3.options[i].selected = true;   
                        }  
                       } 
                 }

            },
            // 选择省
            selChange:function(){

            	var  Sel=document.getElementById("citySel");
            	// var oTxt = document.getElementById('citySel2').select();
            	var index=Sel.selectedIndex;
            	if(index!=0){
            	this.provinceid=this.province[index-1].cityId
            	this.provinceName=this.province[index-1].name	
            	}else{
            	this.provinceid=''
            	this.provinceName=''
            	}
            	
            	this.getCitysId()
            },
            // 选择市
             selChange2:function(){
            	var  Sel=document.getElementById("citySel2");
            	var index=Sel.selectedIndex;
            	if(index!=0){
                  this.cityid=this.city[index-1].cityId
                  this.cityName=this.city[index-1].name
            	}else{
            		this.cityid=''
            		this.cityName=''
            	}
            	this.getCitysId2()
            },
            // 选择县
              selChange3:function(){
            	var  Sel=document.getElementById("citySel3");
            	var index=Sel.selectedIndex;
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
               commonService.postAddress({name:that.name,phone:that.phone,provinceName:that.provinceName,provinceId:that.provinceid,cityName:that.cityName,cityId:that.cityid,districtName:that.countyName,districtId:that.countyid,detailAdress:that.detailAdress}).then(function(res){
                // that.bankCard=res.data.datas
                  // console.log(res)
                  
                 })
            },
            // 修改地址
             postAddressid:function(){
               let that = this
               commonService.postAddressid(that.addressid,{type:1,defaultAdress:that.defaultAdress,available:true,name:that.name,phone:that.phone,provinceName:that.provinceName,provinceId:that.provinceid,cityName:that.cityName,cityId:that.cityid,districtName:that.countyName,districtId:that.countyid,detailAdress:that.detailAdress}).then(function(res){
                // that.bankCard=res.data.datas
                  // console.log(res)
                  
                 })
            },
       
    }
  }
</script>

<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    @import url('../../assets/css/icon/iconfont.css');
    .new-address{
    .header{
        position: fixed;
        top: 0;
        z-index: 100;
        width: @size375;
        height: @size45;
        background:rgba(2, 10, 2, 1);
        font-size: @size20;
        color: white;
        text-align: center;
        line-height: @size45;
    }
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
                font-size:20px;
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
                i{
                    
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
                font-size: @size15;
            }
            input{
                // padding-left:2rem; 
                width: 4rem;
                height: 100%;
                float: left;
                border: none;
                outline: none;
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
            textarea{
                width: 100%;
                height: 100%;
                background: rgb(238, 238, 238);
                border: none;
                outline: none;
                box-sizing: border-box;
                padding: @size10;
                font-size: @size13;
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
                    font-size: @size10;
                    line-height: @size10;
                    position: absolute;
                    top: -1px;
                    left: -11px;
                    color: rgb(0, 185, 181);
                }
            }
            span{
                font-size: @size14;
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
                font-size: @size14;
                padding-left: @size8;
                color: red;
            }
        }
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
        font-size: 15px;
    }
}
</style>

