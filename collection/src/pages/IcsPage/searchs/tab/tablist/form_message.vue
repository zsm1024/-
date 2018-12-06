<template>
<section>
	<el-row>
		<el-col :span="24" id="el-icons">	
			<i class="el-icon-message" @click="messageOpen">短信</i>
			<i class="el-icon-edit" @click="checkPreview">征信查询</i>	
		</el-col>
	</el-row>
	<div id="tables">    
		<el-form ref="mainform" :rules="rules" :model="mainform" label-width="65px"   id="FixForm" inline >		
 		<el-col id="lists">
			<el-form-item label="行动代码" prop="actSign">
				<el-select v-model="mainform.actSign" filterable clearable>
					<el-option v-for="code in getdaima" :key="code" :value="code"></el-option>
				</el-select>
		</el-form-item>	
		<el-form-item label="承诺金额" prop="allowance" >
			<el-input v-model="mainform.allowance" clearable></el-input>
		</el-form-item>
		<el-form-item label="承诺日期" prop="allDate" >
			<el-col >
				<el-date-picker type="date" placeholder="选择日期" v-model="mainform.allDate" @change="dataChange1" style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>								
		<el-form-item label="联系人" prop="linkman">
			<el-autocomplete v-model="mainform.linkman"  :fetch-suggestions="querySearch1" size="small"  placeholder="请选择联系人"  @select="handleSelect" class="autoInput">
			</el-autocomplete>
		</el-form-item>
		<el-form-item label="联系方式"  prop="linkInfomation">
			<el-autocomplete v-model="mainform.linkInfomation"  :fetch-suggestions="querySearch2" size="small"  placeholder="请选择联系人"  @select="handleSelect" class="autoInput">
			</el-autocomplete>
		</el-form-item>	
								
		<el-form-item label="约会日期" prop="appointmentTime" >
				<el-date-picker type="date" placeholder="选择约会时间" v-model="mainform.appointmentTime" style="width: 100%;" @change="dataChange"></el-date-picker>
		</el-form-item>	
		</el-col>
		<!--  -->
		<el-col id="bzt">			
			<el-form-item label="备注" prop="afpRecord" style="justify-content: space-around;display:flex">
				<el-input type="textarea" v-model="mainform.afpRecord" inline></el-input>
				<el-button type="primary" @click="onSubmit('mainform')" :disabled="disabledto" >{{tosubtext}}</el-button>
				<el-button @click="onSubmitnext('mainform')">确认&处理下一条</el-button>
			</el-form-item>
		</el-col>  
		</el-form>							
	</div>			
	<el-dialog title="短信" :visible.sync="messageopen" :modal="true" :modal-append-to-body="false" :show-close="false">
			<el-form :model="messageform" :ref="messageform" >
				<el-form-item label="合同号" :label-width="formLabelWidth" >
					<el-input :value="applicationNumber" disabled style="width:300px;margin-left:5px" id="inp"></el-input>
					<!--  -->
				</el-form-item>
				<el-form-item label="手机号码 " :label-width="formLabelWidth">
					<el-autocomplete v-model="messageform.phone"  :fetch-suggestions="querySearch" size="small"  placeholder="请输入手机号码"  @select="handleSelect" class="autoInput" style="width:300px;">
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="短信模板 " :label-width="formLabelWidth">
					<el-select v-model="messageform.selectTitle" placeholder="请选择" @change="getMessage"  style="width:300px;" id="selectMes">
						<el-option v-for="(item,index) in messageModel" :key="index" :label="item.label" :value="item.value" ></el-option>
					</el-select>
				</el-form-item>				
				<el-form-item label="内容栏 " :label-width="formLabelWidth">
						<el-input type="textarea" autosize v-model="messageform.messagedesc" style="width:300px;margin-left:5px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button style="padding:10px" @click="cancle" type="primary">取 消</el-button>
				<el-button type="primary" @click.native.prevent="confirmmessage('messageform')" style="padding:10px">确 定</el-button>
			</div>
		</el-dialog>	
	
</section>  
</template>
<script>
import { tab_view,recordAdd,getCodeAll,getNextMissonId,messageDialog,messageTemplate,messageSend } from "@/api/tablist";
import { getCustomerCredit } from "@/api/auth";
import Cookies from "js-cookie";
export default{
	props:['callback'],	
	data(){				
		return{
			websock: null,
      		backMsg: "",
     		datas: "",
     	 	tips: "",
            tosubtext:'确认',
            disabledto: false,
			items: [],
			phoneListNums:[],
			messageModel:[],
			messageTemplate:[],
			formLabelWidth:'120px',
			times:'',
			allDate:"",
			userList:[],
			userList1:[],
			userList2:[],
			UserArr:[],
			TypeArr:[],
			addressType:[],
			templateId:'',
			// UserArrList:[],		
			selectCont:'',
			state:"",
			 applicationNumber:'',
			//短信弹出层
			messageform: {
				// contractNum:this.applicationNumber,
				template:'',
				phone:"",
				messagedesc: '',
				selectTitle:"",
			},
			mainform: {
					actSign: '',
					allowance: '',
					allDate: '',
					linkman:"",
					// {
					// 	type:"",
					// 	data:this.callback.roleName,
					// },
					linkInfomation:'',
					appointmentTime: '',
					afpRecord:'',					
			},
			messageopen: false,
			getdaima: [],
			getname: [],
			getfangshi:[],
			getMesTemplate: [],	
            getMesPhone: [],	
            //备注弹出层
			// remarkform: {
			// 	remarks:'',
			// },
            rules: {
                    actSign: [
                        { required: true, message: '请输入行动代码', trigger: 'blur' }
                    ],
                    linkman: [
                        { required: true, message: '请填写联系人', trigger: 'blur' }
                    ],
                    linkInfomation: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],	
                    appointmentTime:[
                        { required: true,  message: '请选择约会日期', trigger: 'blur',type:'date'}
                    ],
                    afpRecord:[
                        { required: true, message: '请填写备注', trigger: 'blur' }
                    ],			
                },
            }
	},
	methods:{
		querySearch(queryString,cb){
		  let data =this.restaurants;
		  let results = queryString ? data.filter(this.createFilter(queryString)) :data;
          cb(results) 
      },    
	  querySearch1(queryString,cb){
		  let data =this.restaurants1;
		  let results = queryString ? data.filter(this.createFilter(queryString)) :data;
          cb(results) 
	  },
	    querySearch2(queryString,cb){
		  let data =this.restaurants2;
		  let results = queryString ? data.filter(this.createFilter(queryString)) :data;
          cb(results) 
	  },
	   createFilter(queryString){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
          }
      },
    //   createFilter1(queryString){
    //       return(item) =>{
    //            return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
    //       }
    //   },
		 dataChange(val){			
		   this.times=val;
	  },
	   dataChange1(val){			
		   this.allDate=val;
	  },
		onSubmit(mainform) {
            // var self = this;
            // var num = 10;
            // var timer = setInterval(function() {
            //     num--
            //     self.tosubtext = num+'s后点击';
            //     self.disabledto = true;
            //     if(num ===0){
            //         self.tosubtext = '确定';
            //         self.disabledto = false;
            //         clearInterval(timer);
            //     }
            // },1000)
			let para ={
    			actSign:this.mainform.actSign,
				allowance:this.mainform.allowance,
				allDate:this.allDate,
				linkman:this.mainform.linkman,
				linkInfomation:this.mainform.linkInfomation,
				appointmentTime:this.times,
				afpRecord:this.mainform.afpRecord,
				missionId: this.$route.params.id,
				userId: localStorage.getItem("UserId")
				
			};
			this.$refs[mainform].validate((valid) => {
				if (valid) {
					recordAdd(para).then(res =>{
				
						if(res.data.success){	
						this.$refs['mainform'].resetFields();
							this.$message({
                                type:'success',
                                message:'提交成功',
                            });
                            
						}else{
							this.$refs['mainform'].resetFields();
							this.$message({
								type: 'error',
								message: '提交失败，请联系管理员！'
							})
						}
				
					});
				} else {
					return false;
				}
			});
		},
	
        getlists(){	
             getCodeAll().then(res => {
                 var arrpush = [];
                 res.data.result.forEach(function(value,index){
                    arrpush.push(value.actCode);
                 })
                 this.getdaima = arrpush;
              
			});
		
			// let asd=this.callback;
			// this.callback.forEach(element =>{
			// 	console.log(element)
			// })
			
        },
		onSubmitnext(mainform) {
            let para ={
    			actSign:this.mainform.actSign,
				allowance:this.mainform.allowance,
				allDate:this.allDate,
				linkman:this.mainform.linkman,
				linkInfomation:this.mainform.linkInfomation,
				appointmentTime:this.times,
				afpRecord:this.mainform.afpRecord,
				missionId: this.$route.params.id,
				userId: localStorage.getItem("UserId"),
				id:this.$route.params.id
			};
			this.$refs[mainform].validate((valid) => {
				if (valid) {
                    getNextMissonId(para).then(res => {
						var nextId = res.data.result;
						// console.log(nextId)
						 this.$router.push(nextId)
						 
					});
					recordAdd(para).then(res =>{
						// console.log(res)				
						if(res.data.success){	
						this.$refs['mainform'].resetFields();
							this.$message({
                                type:'success',
                                message:'提交成功',
                            });
                            
						}else{
							this.$refs['mainform'].resetFields();
							this.$message({
								type: 'error',
								message: '提交失败，请联系管理员！'
							})
						}
				
					});				
					// this.$message({
					// 	type:'success',
					// 	message:'提交成功，处理下一条',
                    // });
				} else {
					return false;
				}
			});
        },
			callParent(){
				let para = {
					missionId: this.$route.params.id
				};
				tab_view(para).then( res =>{
					let data =res.data.result;
					this.lists=data;
					this.phoneListNums=data.customerPhones;
					this.applicationNumber=data.applicationNumber;					
					this.UserArr.splice(0,this.UserArr.length);
					this.TypeArr.splice(0,this.TypeArr.length)
					this.phoneListNums.forEach(el =>{
						this.UserArr.push(el.roleName)
					});
					
					data.customerAddresses.forEach(el =>{
						this.addressType.push(el.addressType.split(" ").shift())
					});
					this.phoneListNums.forEach(el =>{
						this.TypeArr.push(el.phoneType.split(" ").shift())
					});

					this.userList2=(this.TypeArr.concat(this.addressType))
					this.unique(this.UserArr,this.getname);
					this.unique(this.userList2,this.getfangshi)

				});
			},
			// concatList(arr,item){
			// 	this.unique(arr)
			// 	arr.forEach(el =>{
			// 		item.push({"value":el})
			// 	})
			// },
			 unique(arr,item){
				let res =[];
				let json= {};
				for(let i =0;i<arr.length;i++){
					if(!json[arr[i]]){
						res.push(arr[i]);
						json[arr[i]]=1;
					}
				}

				item.splice(0,item.length);

				res.forEach(el =>{
					item.push({"value":el})
				})
				//  for(let j= 0;j<res.length;j++){

			 	// item.push({"value":res[j]})
				//  }
				// res.forEach(re=>{
				// 	console.log(re[0])				
				// 	
						
				// });				
				// return res;	
			},
			//短信方法
		confirmmessage(messageform) {			
				let phoneNum =this.messageform.phone.split('-').shift("-");
				// this.messageopen=false;
				let para={
					phone:phoneNum,
					smsContent:this.messageform.messagedesc
				}

				 
			// 	this.messageform.selectTitle="";
				if(this.messageform.messagedesc==""){
					this.$message("请确认您的信息是否填写完整！")
					// this.$alert('请确认您的信息是否填写完整！','提示',{
					// 	confirmButtonText:'确定',
					// 	callback: action =>{
					// 		this.message({
					// 			type:'warning',
					// 			closeOnClickModal:"true"
					// 		})
					// 	}
						
					// })
			}else{
				messageSend(para).then(res =>{
					//  console.log(res)
				 });
				 this.messageopen=false;
				 let a="";
				//   console.log(this.messageform.messagedesc)
				this.messageform.messagedesc=a;
				this.messageform.selectTitle=a;
			}
				// resetFields()
				// this.$message({
				// 	type:'success',shi
				// 	message:'保存成功',
				// });
		},
		cancle(){
			 this.messageopen=false;
		},
		 messageOpen(){
			this.messageopen=true;  
			 this.callParent();
			 let pList=[];
			 this.phoneListNums.forEach(e =>{
				 if(e.infoSource=="CMS"&&e.roleName=="主借人"&&e.effectiveness=="Y"){
					 this.userList.push({"value":e.phone+'-'+e.roleName})
					 pList.push(e.phone)
				 }else{
					 return;
				 }				
			 })
			  this.messageform.phone=pList[0]+"-主借人"
			  this.messageform.messagedesc="";
			 messageDialog().then( res =>{				
				let data =res.data.result;
				 this.messageModel.splice(0,this.messageModel.length)
				 data.forEach(e =>{
					this.messageModel.push({"lable":e.id,"value":e.title})
					this.messageTemplate.push({"lable":e.id,"value":e.title});					
				 });	
			});
			// this.messageform.selectTitle="";
			
		 },

		getMessage(item){
			// console.log(this.messageModel.label)			
			this.messageTemplate.forEach(val =>{
				 if(val.value===item){
					 this.templateId=val.lable;					
				 }else{
					 return;
				 }
			});
			let para={
				templateId:this.templateId,
				contractNum:this.applicationNumber
				}
				// messageTemplate
				messageTemplate(para).then(res =>{
					let data =res.data.result
					this.messageform.messagedesc=data;
				});		
		},
		handleSelect(item){
		},
			//征信查询
	// getCheckInfo(){
    //   let para = {
    //     appNum:"GW-A044749000"
    //   }
    //   getCustomerCredit(para).then(res=>{
    //     this.datas=res.data.Preview
    //     console.log(res.data.Preview)

    //   })
    // },
    threadPoxi() {
      var s = {};
      s.USERNAME = "admin";
      s.TOKEN = "4dc8e5f0-bd92-4a4d-94af-c7be14a73f26";
      s.SYSTYPE = "2";
      const agentData = "CONN " + JSON.stringify(s);
      if (this.websock.readyState == this.websock.OPEN) {
        this.websocketsend(agentData);
      } else {
        this.initWebSocket();
        let that = this;
        setTimeout(function() {
          that.websocketsend(agentData);
        }, 500);
      }
      // else if(this.websock.readyState==this.websock.COMMECTING){
      //   let that =this
      //   setTimeout(function(){
      //     that.websocketsend(datas)
      //   },500)

      // }
    },
    initWebSocket() {
      const uri = window.g.ws;
      this.websock = new WebSocket(uri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e) {
      const redata = JSON.parse(e.data);
      this.backMsg = JSON.parse(e.data);
    },
    websocketsend(agentData) {
      this.websock.send(agentData);
    },
    websocketclose(e) {
      console.log(e);
    },
    checkPreview() {
		 let para = {
        appNum:this.$parent.appNum
      }
      getCustomerCredit(para).then(res=>{
        this.datas=res.data.Preview
      const datas = "Preview " + JSON.stringify(this.datas);
      if (this.backMsg.Type == "ConnOK") {
        let that = this;
        that.websocketsend(datas);
        // if(this.backMsg.Type=="SEARCH_FAIL"){
		// 	this.$message({ 
		// 	type: "error",        
        //     message:this.backMsg.Msg,
            
        //   });
        // }
        // that.threadPoxi()
      } else {
        this.threadPoxi();
		this.websocketsend(datas);
		
	  }
	})
    }
		
	},
	created() {
    this.initWebSocket();
  },
	mounted() {
	  this.threadPoxi();
      Cookies.get("Admin-Token");
	  this.getlists();
	  this.callParent();
	  this.restaurants=this.userList;
	  this.restaurants1=this.getname;
	  this.restaurants2=this.getfangshi;
	},
	 watch: {
    backMsg(curval) {
		console.log(curval)
      if (curval.Type == "SEARCH_FAIL") {		  
			this.$message({
            showClose: true,
            message:curval.Msg,
            type: "error"
          });
      }
    }
  }
}
</script>
<style>	
	#tables{display: flex;justify-content: space-between;min-height: 100px}
	 #tables .el-input{height: 24px}
	#FixForm .el-form-item{margin: 5px 5px 13px;}
	#bzt {width: 37%}
	#lists{width:60%;font-size: 13px;margin-left: 10px}
	#lists .el-form-item__label{font-size: 13px!important}
	#FixForm .el-form-item__content{width:150px!important }
	#bzt .el-form-item__content{width: 98%!important} 
	#bzt .el-button{padding: 5px;margin: 5px;font-size: 13px}
	.dropdown-menu{display: block;min-height: 100px!important}
	.el-input__inner{margin-left: 5px;height: 24px!important}
	#el-icons{font-size: 13px!important;margin-top: 5px!important}
	#inp .el-input__inner{margin-left: 0!important};
	#selectMes .el-input{height: 24px!important} 
</style>