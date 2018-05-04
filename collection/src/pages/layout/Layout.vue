<template>
<section style="height:100%;overflow:auto">
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container" ref="right">
			<navbar></navbar>
			<app-main style="height:95%"></app-main>
		</div>
		
	</div>
	<iframe id="frame2" ref="frame"  name="google_ads_frame2" width="160" height="600" frameborder="0" src="./if.html" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" style="width:99%;position:absolute;height:25px;bottom:0"></iframe>
	
<!-- <div class="phoneList" id="AdButton">
        <el-button type="primary" size="mini" @click="clickCallOut" style="padding:4px!important"><i class="fa fa-phone"></i></el-button>
        <input id="softPhoneNumber" type="text" style="width: 125px" v-model="phone" placeholder="请输入呼出号码"/>
		<input id="btnInit" type="button" value="初始化" @click="initParam()" />
        <input id="btnSignIn" type="button" value="登录" @click="doSignIn" disabled="disabled" />
        <input id="btnAnswer" type="button" value="接听" @click="answer"   disabled="disabled" />
        <input id="btnSignOut" type="button" value="签出" @click="clickSignOut" disabled="disabled" />
        <input id="btnCallOut" type="button" value="呼出" @click="clickCallOut" disabled="disabled" />
        <input id="btnSetIdle" type="button" value="示闲" @click="clickSetIdle"  disabled="disabled" />
        <input id="btnSetBusy" type="button" value="示忙" @click="clickSetBusy" disabled="disabled" />
		<input id="btnHangup"  type="button" value="挂机" @click="clickHangup"  disabled="disabled" />
		<input id="btnHold"  type="button" value="保持" @click="Hold"  disabled="disabled"/>
		<input id="btnCannel"  type="button" value="取消" @click="cannel"  disabled="disabled"/>
		<input id="btnsetRetrieveHold"  type="button" value="唤醒" @click="setRetrieveHold"  disabled="disabled"/>
		<input id="btnConsultation"  type="button" value="咨询" @click="doConsultation"  disabled="disabled"/>
		<input id="CallNumber" type="text" style="width: 120px" v-model="callphone" placeholder="请输入咨询号码"/>
		<input id="btnTransfer"  type="button" value="转接" @click="Transfer"  disabled="disabled"/>
		<!-- <input id="btnSingleStepConfCallEx"  type="button" value="会议" @click="SingleStepConfCallEx"  disabled="disabled"/>  -->
		<!-- <input id="state" type="text" style="width: 75px" readonly="readonly" placeholder="状态" />
        </div> --> 
	</section>
</template>

<script>
//import $ from 'jquery'
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from '@/pages/layout'
import{initParam,doSignIn,clickSignOut,clickCallOut,clickSetIdle,clickSetBusy,clickHangup,Hold,cannel,setRetrieveHold,doConsultation,doTransfer,answer,SingleStepConfCallEx,Transfer} from '../../../ngcc/softPhone.js'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
	data(){
		return{
			disable:true,
			// names:'liulijun',
			names:localStorage.getItem("userName"),
			phone:"",
			callphone:"",
			PhoneUserName:this.$store.getters.name
		}
		
	},
	methods:{
		changeNmeType(){
			if(this.names=="czhangliang"){	
				let a=this.names.trim().substr(1);	
				console.log( a)	
				this.names=a;
			}else if(this.names=="chenjing_cms"){
				this.names=this.names.split('_').shift("_");
			}else{
				this.names=this.names
			}
		},
		 initParam:function(){ 
			 console.log(this.names);
			   initParam(this.names);
			  
        //   this.doSignIn()
			 },
			  clickCallOut:function(){
           clickCallOut('1',this.phone);
       },
       clickHangup:function(){
           clickHangup()
       },
       cannel:function(){
           cannel()
       },
       answer:function(){
           answer()
       },
       doSignIn:function(){
           doSignIn()
       },
       clickSignOut:function(){
           clickSignOut()
       },
       clickSetIdle:function(){
           clickSetIdle()
       },
       clickSetBusy:function(){
           clickSetBusy()
       },
       Hold:function(){
           Hold()
       },
       setRetrieveHold:function(){
           setRetrieveHold()
       },
       doConsultation:function(){
           doConsultation()
       },
       Transfer:function(){
           Transfer()
       },
       SingleStepConfCallEx:function(){
           SingleStepConfCallEx()
       },       
	},
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
	},
	...mapGetters([
      'name',
    ])
	
  },
	mounted () {
	this.changeNmeType()
	//  let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)-210;
  //   this.$refs.right.style.width= w+"px";
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.main-container {
				margin-left: 36px;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 200px;
			height: 97%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 4px;
			// z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 200px;
		}
	}
	//  section{padding: 0 5px}
	.phoneList{height:25px;background: #f0f0f0;text-align: center;z-index: 9999;position: fixed;width: 100%;bottom:3px;}
//  .el-tabs__content{padding:0 5px!important}
</style>
