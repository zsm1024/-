<template>
<section style="height:100%;overflow:auto">
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container" ref="right">
			<navbar></navbar>
			<app-main style="height:95%"></app-main>
		</div>
		<el-dialog :visible.sync="dialogVisible" title="提示" class="BomTips" :modal="false" @close="closed" :close-on-click-modal="false">
			<p @click="approvalCountClick">
				<router-link class="a-href" :to="{path:'/IcsPage/spdata/splist/103'}">您有{{approvalCount}}案件待审批，请及时处理</router-link>
			</p>			 
		</el-dialog>
		<el-dialog :visible.sync="sendDialog" class="BomTips" :modal="false" :close-on-click-modal="false" title="派案审批提醒" @close="closed" >
			<p @click="sendDialogClick">
			 	<router-link class="a-href" :to="{path:'/IcsPage/outerdata/splist/127'}">您有{{applySend}}派案案件待审批，请及时处理</router-link>
			 </p>
		</el-dialog>
		<el-dialog :visible.sync="unRead" class="BomTips" :modal="false" :close-on-click-modal="false" title="提示" @close="closed">				
			<p>您有{{unReadApply}}案件已审批通过或关闭</p>
		</el-dialog>
	</div>
	<iframe id="frame2" ref="frame"  name="google_ads_frame2" width="160" height="600" frameborder="0" src="/if.html" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" style="width:99%;position:absolute;height:25px;bottom:0"></iframe>
	</section>
</template>

<script>
//import $ from 'jquery'
import { mapGetters } from 'vuex'
import {ApprovalCount,getUnReadApplyCount,getSendCaseCount,updateApplyNewsFlag} from '@/api/basedata'
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
			unRead:false,
			dialogVisible:false,
			disable:true,
			sendDialog:false,
			sendDialogfalse:true,
			// names:'liulijun',
			names:localStorage.getItem("userName"),
			phone:"",
			callphone:"",
			PhoneUserName:this.$store.getters.name,

			applyList:[],
			approvalCount:"",
			applySend:"",
			unReadApply:""
		}
		
	},
	methods:{
		changeNmeType(){
			if(this.names=="czhangliang"){	
				let a=this.names.trim().substr(1);	
				this.names=a;
			}else if(this.names=="chenjing_cms"){
				this.names=this.names.split('_').shift("_");
			}else{
				this.names=this.names
			}
		},
		 initParam:function(){ 
			   initParam(this.names);
			  
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

	   getApprovalCount(){		  		   
			ApprovalCount().then(res =>{
				if(res.data.result>0){
					this.dialogVisible=true
					this.approvalCount=res.data.result;
					setTimeout(()=>{						
						 this.closed()
						 this.dialogVisible=false;
					},6000)				
				}
			})
	   },
		getgetSendCaseCount(){
					getSendCaseCount().then(res =>{
						if(res.data.result>0){
							this.sendDialog=true
							this.applySend=res.data.result
							setTimeout(()=>{						
								this.closed()
								this.sendDialog=false;
							},6000)				
						}
					})
			},
	getUnRead(){
			getUnReadApplyCount().then(res =>{
				if(res.data.result>0){
					this.unRead=true
					this.unReadApply=res.data.result
					setTimeout(()=>{						
						 this.closed()
						 this.unRead=false;
					},6000)				
				}
			})
	   },
	   
	   approvalCountClick(item){
		   this.dialogVisible=false
	   },
	    sendDialogClick(item){
		   this.sendDialog=false
	   },
	   closed(){
		   updateApplyNewsFlag().then(res =>{
				   if(!res.data.success){
					   this.$message({
                            type: 'error',
                            message: res.data.message
                            })
			   		}
		   })
	   },
	    InterVels(){       
        setInterval(() => {
			this.getApprovalCount()
			this.getgetSendCaseCount()
			this.getUnRead()			
		},1800000);
        }      
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
	this.getApprovalCount()
	this.getgetSendCaseCount()
	this.getUnRead()
	this.InterVels()	
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
			margin-left: 205px;
		}
	}
	//  section{padding: 0 5px}
	.phoneList{height:25px;background: #f0f0f0;text-align: center;z-index: 9999;position: fixed;width: 100%;bottom:3px;}
</style>


