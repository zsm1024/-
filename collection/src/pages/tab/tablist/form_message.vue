<template>
<section>
	<el-row>
		<el-col :span="24" id="el-icons">	
			<i class="el-icon-message" @click="messageOpen">短信</i>
			<i class="el-icon-upload2" @click="encloOpen">附件</i>
			<i class="el-icon-edit" @click="visitList">外访记录</i>			 
		</el-col>
	</el-row>
	<!-- <div>{{callback.roleName}}</div> -->
	<div id="tables">    
		<el-form ref="mainform" :rules="rules" :model="mainform" label-width="65px"   id="FixForm" inline >		
 		<el-col id="lists">
			<el-form-item label="行动代码" prop="actSign">
				<el-select v-model="mainform.actSign" filterable clearable>
					<el-option v-for="code in getdaima" :key="code" :value="code"></el-option>
				</el-select>
			<!-- <v-select v-model="mainform.daima"  multiple :options="getdaima"></v-select> -->
		</el-form-item>	
		<el-form-item label="承诺金额" prop="allowance" >
			<el-input v-model="mainform.allowance" clearable></el-input>
		</el-form-item>
		<el-form-item label="承诺日期" prop="allDate">
			<el-col >
				<el-date-picker type="date" placeholder="选择日期" v-model="mainform.allDate" @change="dataChange1" style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>								
		<el-form-item label="联系人" prop="linkman">
			<el-autocomplete v-model="mainform.linkman"  :fetch-suggestions="querySearch1" size="small"  placeholder="请选择联系人"  @select="handleSelect" class="autoInput">
			</el-autocomplete>
			<!-- <el-select v-model="mainform.linkman" filterable clearable placeholder="请选择联系人">
				<el-option v-for="types in getname" :key="types" :value="types"></el-option>
			</el-select> -->
				<!-- <v-select v-model="mainform.name" :options="getname"></v-select> -->
		</el-form-item>
		<el-form-item label="联系方式"  prop="linkInfomation">
			<el-autocomplete v-model="mainform.linkInfomation"  :fetch-suggestions="querySearch2" size="small"  placeholder="请选择联系人"  @select="handleSelect" class="autoInput">
			</el-autocomplete>
				<!-- <v-select v-model="mainform.fangshi" :options="getfangshi"></v-select> -->
				<!-- <el-select v-model="mainform.linkInfomation" filterable clearable>
					<el-option v-for="list in getfangshi" :key="list" :value="list"></el-option>
				</el-select> -->
		</el-form-item>	
								
		<el-form-item label="约会日期" prop="appointmentTime" >
				<el-date-picker type="date" placeholder="选择约会时间" v-model="mainform.appointmentTime" style="width: 100%;" @change="dataChange"></el-date-picker>
		</el-form-item>	
		</el-col>
		<!--  -->
		<el-col id="bzt">			
			<el-form-item label="备注" prop="afpRecord" style="justify-content: space-around;display:flex">
				<span class="tips">(不超过2000字)</span>
				<el-input type="textarea" v-model="mainform.afpRecord" inline :maxlength="2000"></el-input>
				<el-button type="primary" @click="onSubmit('mainform')" :disabled="disabledto" >{{tosubtext}}</el-button>
				<el-button @click="onSubmitnext('mainform')" :disabled="disabledNex">确认&处理下一条</el-button>
				<el-button type="primary" @click="CJStore">催记暂存</el-button>
			</el-form-item>
		</el-col>  
		</el-form>							
	</div>			
	<el-dialog title="短信" :visible.sync="messageopen" :modal="true" :modal-append-to-body="false" id="MsgDialog" :show-close='false'>
			<el-form :model="messageform" :ref="messageform" >
				<el-form-item label="合同号" :label-width="formLabelWidth" >
					<el-input :value="applicationNumber" disabled style="width:300px;margin-left:5px" id="inp"></el-input>
					<!--  -->
				</el-form-item>
				<el-form-item label="手机号码 " :label-width="formLabelWidth">
					<el-autocomplete v-model="messageform.phone"  :fetch-suggestions="querySearch" size="small"  placeholder="请输入手机号码"  @select="handleSelect" class="autoInput" style="width:300px;">
					</el-autocomplete>
					<!-- <v-select v-model="messageform.phone" :options="getMesPhone" style="width:300px"></v-select> -->
				</el-form-item>
				<el-form-item label="短信模板 " :label-width="formLabelWidth">
					<el-select v-model="messageform.selectTitle" placeholder="请选择" @change="getMessage"  style="width:300px;" id="selectMes">
						<el-option v-for="(item,index) in messageModel" :key="index" :label="item.label" :value="item.value" ></el-option>
					</el-select>
					<!-- <v-select v-model="messageform.template" :options="getMesTemplate" style="width:300px"></v-select> -->
				</el-form-item>				
				<el-form-item label="内容栏 " :label-width="formLabelWidth">
						<el-input type="textarea" autosize v-model="messageform.messagedesc" style="width:300px;margin-left:5px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<!-- @click="addWorkInfo" -->
				<el-button style="padding:10px" @click="cancle" type="primary">取 消</el-button>
				<el-button type="primary" @click.native.prevent="confirmmessage('messageform')" style="padding:10px">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="附件" :visible.sync="encloopen" append-to-body="true" id="fileUpload" :modal="true" :modal-append-to-body="false" :show-close='true' :fullscreen="true">	
			<!-- <el-form >
				<el-form-item label="附件类型">
					<el-select  placeholder="请选择"  style="width:300px;" id="selectMes">
						<el-option  value="1213" label="444"></el-option>
					</el-select>
				</el-form-item>
			</el-form> -->
			<el-upload
				class='ensure ensureButt'
				ref="upload"
               :action="importFileUrl"
               :data="upLoadData"
               :on-preview="handlePreview"
			   :on-change="handleChange"
			   :on-error="uploadError"
			   :on-success="uploadSuccess"
			   :before-upload="beforeUpload"
				:auto-upload="false"
				:file-list='filelist'	
				:multiple="true"
				:show-file-list="fileListStatue"			
				>
				<!--:show-file-list="fileListStatue"  -->
				<!-- <el-select  placeholder="请选择" style="width:300px;" id="selectMes">
					<el-option :key="index" :label="item.label" :value="item.value" ></el-option>
				</el-select> -->
				<el-button slot="trigger" size="small" type="primary" @click="chooseFile">选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
				</el-upload>
				<h4 style="padding:10px 5px;margin-top:10px">附件列表</h4>
				<el-table :data="datas"  highlight-current-row  style="width: 100%;" id="uploadFile"  border>
					<el-table-column label="操作"  fixed="left"  align="center" width="140" >
						<template slot-scope="scope">
							<el-button  size="mini" type="primary" :disabled="disable" @click="downLoad(scope.row)">下载</el-button>
							<el-button style="margin-left: 10px;" size="mini" type="danger" :disabled="disable"  @click="deleteList(scope.row)">删除</el-button>
						</template>				
					</el-table-column>			
					<el-table-column  :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" align="center" >
					</el-table-column>		 
				</el-table>
        <!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total,sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page" :page-size="pagesize" :total="total" :page-sizes='[200,500,800,1000]' style="float:right;">
			</el-pagination>
		</el-col>
				<!--:onError="uploadError"
               :onSuccess="uploadSuccess"
               :beforeUpload="beforeAvatarUpload"-->
		</el-dialog>
<!-- 外访记录 -->
		<el-dialog :visible.sync="visitListDetial" :modal="true" :modal-append-to-body="false" :show-close='true' title="外访纪录" id="outerdialog">
			<!-- <visitList></visitList> -->
			<el-form ref="mainformvisit"  :model="mainformvisit"   inline >	

      <el-form-item label="外访日期" prop="appointmentTime" label-width="95px" >
         <i style="color:red">*</i> 
				<el-date-picker type="date" placeholder="选择约会时间" v-model="mainformvisit.appointmentTime" style="width:150px" @change="dataChangevisit"></el-date-picker>
		  </el-form-item>	
      <el-form-item label="地址类型 "  label-width="95px"  prop="addressType">
        <i style="color:red">*</i> 
					<el-select  style="width:150px" id="selectMes" v-model="mainformvisit.addressType" @change="changeAddressType" >
						<el-option v-for="(item,index) in addressType" :key="index" :label="item.nameType" :value="item.nameType"></el-option>
					</el-select>
				</el-form-item>	
      <el-form-item label="地址 "label-width="95px" prop="address">
        <i style="color:red">*</i>
					<el-select  style="width:150px" id="selectMes" v-model="mainformvisit.address"  >
						<el-option  v-for="(item,index) in address" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="地址是否存在 " label-width="95px" prop="istrue" >
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.istrue"  >
						<el-option v-for="(item,index) in IsTrue" :key="index" :label="item.label" :value="item.value"></el-option>
					</el-select>
          <!-- v-model="messageform.selectTitle" placeholder="请选择" @change="getMessage" -->			
				</el-form-item>	
        <el-form-item label="备注 " label-width="95px" prop="addressName"  v-if="mainformvisit.istrue=='Y'">
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.addressName" >
						<el-option v-for="(item,index) in addressName" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>	
        <span v-if="mainformvisit.istrue=='Y'" >
            <el-form-item label="是否有人应门 " label-width="95px" prop="isanswer"  v-if="mainformvisit.istrue=='Y'">
              <i style="color:red">*</i> 
              <el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isanswer" @change="isanswer" >
                <el-option v-for="(item,index) in IsTrue" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>	
				    </el-form-item>
            <el-form-item label="见到对象" label-width="95px" prop="isperson" v-if="mainformvisit.isanswer!='N'">
              <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isperson"  >
						<el-option v-for="(item,index) in isperson" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>	
        <el-form-item label="见到对象" label-width="95px" prop="isperson"  v-if="mainformvisit.isanswer=='N'">
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isperson" disabled>
						<el-option   label=" " value=""></el-option>
					</el-select>	
				</el-form-item>       
        </span> 
        <el-form-item label="地址情况 " label-width="95px" prop="addressStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.addressStn" >
						<el-option v-for="(item,index) in addressStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="房屋所有人 " label-width="95px" prop="houseStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.houseStn" >
						<el-option v-for="(item,index) in houseStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="工作情况 " label-width="95px" prop="workStn"  > 
          <i style="color:red">*</i>        
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.workStn" >
						<el-option v-for="(item,index) in workStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="控制车辆人 " label-width="95px" prop="carStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.carStn" >
						<el-option v-for="(item,index) in carStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
		</el-form-item>
			<el-form-item label="">
			 	<el-button style="padding:10px" type="primary" @click="canclevisit">取 消</el-button>
				<el-button type="primary"  style="padding:10px" @click="submitMsg">确 定</el-button>
			</el-form-item>      
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:end">
				<!-- @click="addWorkInfo" -->
				
			</div>
		</el-dialog>
</section>  
</template>
<script>
import { tab_view,recordAdd,getCodeAll,getNextMissonId,messageDialog,messageTemplate,messageSend,ListFilses,role,delet } from "@/api/tablist";
import {RecordsFind} from "@/api/visit"
import visitList from "../tablist/visit_list"
// import{tab_view} from "@/api/tablist"
import{findByType,AddresssfindByType,AddresssfindAddress,VisitRecords} from "@/api/basedata"
export default{
	props:['callback'],	
	data(){				
		return{
			disable:false,
			total: 0,
			page: 1,
			pagesize:200,			
			fileListStatue:true,
            tosubtext:'确认',
			disabledto: false,
			disabledNex:false,
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
			datas:[],
			templateId:'',
			phone:'',
			// UserArrList:[],		
			selectCont:'',
			state:"",
			 applicationNumber:'',
			 sort:"1",
			//短信弹出层
			messageform: {
				// contractNum:this.applicationNumber,
				template:'',
				phone:"",
				messagedesc: '',
				selectTitle:"",
			},
			cols:[
				{title:'附件类型',field:'type',width:"70"},
				{title:'上传用户ID',field:'createUser',width:"70"},				
				{title:'上传时间', field: 'createTime', width: "50" }, 
				{title:'附件名称',field:'name',width:"60"},				
			],
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
			encloopen:false,
			visitListDetial:false,
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
                
                    // allowance:[
                    //     {required: true, message: '请输入承诺金额', trigger: 'blur',}
                    // ],
                    // allDate:[
                    //     { required: true,  message: '请选择承诺日期', trigger: 'blur',type:'date'}
                    // ],
                    linkman: [
                        { required: true, message: '请填写联系人', trigger: 'blur' }
                    ],
                    linkInfomation: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],	
                    appointmentTime:[
                        { required: true,  message: '请选择约会日期'}
                    ],
                    afpRecord:[
                        { required: true, message: '请填写备注', trigger: 'blur' }
                    ],			
				},
				importFileUrl:"http://192.168.2.113:8081/files/upload",
				filelist:[],
				upLoadData:{
					icsId:this.$route.params.id,	
					username:localStorage.getItem("userName")				
				},
		timesvisit:"",
      IsTrue:"",
      addressStn:[],
      houseStn:[],
      workStn:[],
      carStn:[],
      roleName:"",
      type:"",
      address:[],
      addressType:[],
      formLabelWidth:'60px',
      mainformvisit: {
          appointmentTime: '',
          addressType:"",
          address:"",
          istrue:"",
          addressName:"",
          isanswer:"",
          isperson:"",
          personmarks:"",
          addressStn:"",
          houseStn:"",
          workStn:"",
          carStn:""

      },
      IsTrue:[
        {"label":"Y","value":"Y"},
        {"label":"N","value":"N"},
      ],
       IsTrue1:[],
      addressName:[],
			}
			
	},
	methods:{
		handleCurrentChange(val) {
                this.pages = val;
				this.encloOpen();
            },
            handleSizeChange(val) {
			this.pagesize = val  
			this.encloOpen();     
			},
		querySearch(querySt,cb){
		  let data =this.restaurants;
		  let results = querySt ? data.filter(this.createFilter(querySt)) :data;
          cb(results) 
      },    
	  querySearch1(querySt,cb){
		  let data =this.restaurants1;
		  let results = querySt ? data.filter(this.createFilter(querySt)) :data;
          cb(results) 
	  },
	    querySearch2(querySt,cb){
		  let data =this.restaurants2;
		  let results = querySt ? data.filter(this.createFilter(querySt)) :data;
          cb(results) 
	  },
	   createFilter(querySt){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(querySt.toLowerCase()) ===0)
          }
      },
    //   createFilter1(querySt){
    //       return(item) =>{
    //            return (item.value.toLowerCase().indexOf(querySt.toLowerCase()) ===0)
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
    			actSign:this.mainform.actSign.split("-").shift("-"),
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
					this.disabledto=true;
					recordAdd(para).then(res =>{
				// console.log(res)			
						if(res.data.success){	
						this.$refs['mainform'].resetFields();
							this.$message({
                                type:'success',
                                message:'提交成功',
							});							
							setTimeout(()=>{
								this.disabledto=false;
							},1000)                            
						}else{
							this.$refs['mainform'].resetFields();
							this.$message({
								type: 'error',
								message: '提交失败，请联系管理员！'
							});
							setTimeout(()=>{
								this.disabledto=false;
							},1000)
						}				
					});
				} else {
					return false;
				}
			});
			localStorage.removeItem("CJPhone");
			localStorage.removeItem("REefresh")
		},
	
        getlists(){	
             getCodeAll().then(res => {
                 var arrpush = [];
                 res.data.result.forEach(function(value,index){
                    arrpush.push(value.actCode+"-"+value.actNotes);
                 })
                 this.getdaima = arrpush;
              
			});
		
			// let asd=this.callback;
			// this.callback.forEach(element =>{
			// 	console.log(element)
			// })
			
        },
		onSubmitnext(mainform) {
			let NextIndex=parseInt(localStorage.getItem("currentRow"));
			let TotalNum=parseInt(localStorage.getItem("total"));
			let  CJBZ="";
			CJBZ+=localStorage.getItem("CJPhone");
			if(NextIndex>=TotalNum){
				this.sort="1",
				localStorage.setItem("currentRow","1");
			}else{
				this.sort=NextIndex+1;
				localStorage.setItem("currentRow",this.sort);				
			}
            let para ={
    			actSign:this.mainform.actSign.split("-").shift("-"),
				allowance:this.mainform.allowance,
				allDate:this.allDate,
				linkman:this.mainform.linkman,
				linkInfomation:this.mainform.linkInfomation,
				appointmentTime:this.times,
				afpRecord:this.mainform.afpRecord,
				missionId: this.$route.params.id,
				userId: localStorage.getItem("UserId"),
				id:this.$route.params.id,
				type:localStorage.getItem("nextNum"),
				sort:this.sort,
			};
			this.$refs[mainform].validate((valid) => {
				if (valid) {
					this.disabledNex=true;
                    getNextMissonId(para).then(res => {						
						var nextId = res.data.result;
						// console.log(nextId)
						 this.$router.push(nextId);
						 localStorage.setItem(nextId,nextId)						 
					});
					recordAdd(para).then(res =>{
						
						// console.log(res)				
						if(res.data.success){	
						this.$refs['mainform'].resetFields();
							this.$message({
                                type:'success',
                                message:'提交成功',
							});							
                            setTimeout(()=>{
								this.disabledNex=false;
							},1000)
							localStorage.removeItem("REefresh");
							localStorage.removeItem(nextId,nextId)
						}else{
							this.$refs['mainform'].resetFields();
							this.$message({
								type: 'error',
								message: '提交失败，请联系管理员！'
							});
							 setTimeout(()=>{
								this.disabledNex=false;
							},1000);
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
			localStorage.removeItem("CJPhone");
			
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
		cancle(){
			this.messageopen=false;
			let a="";
			this.messageform.messagedesc=a;
			this.messageform.selectTitle=a;
			this.userList=[];
		},
		 messageOpen(){
			this.messageopen=true;  
			 this.callParent();
			 let pList=[];
			//   this.userList=[];
			 this.phoneListNums.forEach(e =>{
				 if(//e.infoSource=="CMS"&&e.roleName=="主借人"&&
				 e.effectiveness=="Y"){
					 e.phone=e.phone.replace(/\s+/g,"");
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
		encloOpen(){
			// let paras={
			// 	username:localStorage.getItem("userName")
			// }
			// role(paras).then(res=>{
			// 	console.log(res)
			// });
				this.encloopen=true;
				this.listrefresh()
				
		},
		listrefresh(){
			this.fileListStatue=true;
			let para={
					page:this.page,
					pageSize:this.pagesize
				}
				ListFilses(para).then(res=>{
					let data=res.data.data;
					this.datas=data;					
					this.total=res.data.recordsTotal;
				})
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
				contractNum:this.applicationNumber,
				phone:this.messageform.phone.split("-").shift("-")
				}
				// messageTemplate
				messageTemplate(para).then(res =>{
					let data =res.data.result
					this.messageform.messagedesc=data;
				});		
		},
			confirmmessage(messageform) {			
				let phoneNum =this.messageform.phone.split('-').shift("-");
				// this.messageopen=false;
				let para={
					phone:phoneNum,
					smsContent:this.messageform.messagedesc,
					missionId: this.$route.params.id,
					linkman:this.messageform.phone.split('-').pop("-")
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
					if(res.data.success){
						this.$message({
                            type:'success',
                            message:'短信已发送！',
                        });
					}else{
						this.$message({
                            type:'warning',
                            message:'短信未发送！',
                        });
					}
					//  console.log(res)
				 });
				 this.messageopen=false;
				 let a="";
				//   console.log(this.messageform.messagedesc)
				this.messageform.messagedesc=a;
				this.messageform.selectTitle=a;
				this.userList=[];
			}
				// resetFields()
				// this.$message({
				// 	type:'success',shi
				// 	message:'保存成功',
				// });
		},
		handleSelect(item){
		},
		PhoneCtr(){
			let nums=localStorage.getItem("CJPhone");
			this.mainform.afpRecord+=nums;
		},
		//催记暂存
	CJStore(){
		let REefresh={
			actSign:this.mainform.actSign,
			allowance:this.mainform.allowance,
			allDate:this.allDate,
			linkman:this.mainform.linkman,
			linkInfomation:this.mainform.linkInfomation,
			appointmentTime:this.times,
			afpRecord:this.mainform.afpRecord,
			RowId:this.$route.params.id,
		}			
		localStorage.setItem("REefresh",JSON.stringify(REefresh))
		this.$message({
            type:'success',
            message:'暂存成功！',
        });
	},

	NoRefresh(){
	let RowIds=localStorage.getItem(this.$route.params.id);
		if(localStorage.getItem("REefresh")!=""){
			let FreshList=JSON.parse(localStorage.getItem("REefresh"));
			if(RowIds==FreshList.RowId){
				this.mainform.actSign=FreshList.actSign,
				this.mainform.allowance=FreshList.allowance,
				this.mainform.allDate=FreshList.allDate,
				this.mainform.linkman=FreshList.linkman,
				this.mainform.linkInfomation=FreshList.linkInfomation,
				this.mainform.appointmentTime=FreshList.appointmentTime,
				this.mainform.afpRecord=FreshList.afpRecord
			// console.log(typeof(this.mainform.appointmentTime))						
			}else{
				return false;
			}
		}
	},
	//文件上传部分
	chooseFile(){
		this.fileListStatue=true;
	},
		 // 上传成功后的回调
		submitUpload() {
			this.$refs.upload.submit();			
			// console.log(this.$refs.upload);
		  },
		handleRemove(file,fileList){
			// console.log(file,fileList)
		},
		handlePreview(file){
			//  console.log(file)
		},
		handleChange(file,fileList){			
			console.log(this.fileListStatue)
			console.log(file)
		},
		beforeUpload:function(file){
			const isLt2M = file.size / 1024 / 1024 < 100
		if (!isLt2M) {
			alert('上传模板大小不能超过 100MB!')
		}
		return isLt2M
			
		}, 
			// 上传错误
		uploadError (response, file, fileList) {

			console.log('上传失败，请重试！')
		},
		uploadSuccess (response, file, fileList) {
			// 
			console.log('上传文件', response)
			if(response.success==true){
				this.$message({
                    type:'success',
                    message:'上传成功！',
				});
				this.listrefresh()
				  this.fileListStatue=false;
				  this.$refs.upload.clearFiles()
			}else{
				this.$message({
                    type:'danger',
                    message:'上传失败！',
				});
				this.listrefresh()
			}			
		},
		downLoad(item){
			// console.log(item)
			window.open("http://192.168.2.94/"+item.path);
			this.listrefresh()
		},
		deleteList(item){
			let para={
				id:item.id
			}
			delet(para).then(res=>{
				if(res.data.success==true){
					this.$message({
                    type:'success',
                    message:'删除成功！',
				});
				this.listrefresh()
				}else{
					this.$message({
                    type:'danger',
                    message:'删除失败！',
				});
					this.listrefresh()
				}
				 
				// console.log(res)
			})
			// console.log(item)
			
		},
		visitList(){
			this.visitListDetial=true;
			let para={
				id:this.$route.params.id
			}
			RecordsFind(para).then(res=>{
				console.log(res)
			})
		},
//外访记录
	dataChangevisit(val){			
		this.timesvisit=val;
    },
    getMessagesvisit(val) {
      this.IsTrue=val;
    },
    isanswer(val){
      if(val=="N"){
        this.mainformvisit.isperson=""
      }
    },
//     getlistvisit() {
// 			let para = {
// 				missionId: this.$route.params.id
// 			};
// 			tab_view(para).then(res => {
// 				 let data = res.data.result;			
//          	this.items = data;							 
//       });
      
//    },
   getaddress(){
     let para={
       type:"object"
     }
     let paras0={
      type:"address_status"
    }
    let paras={
      type:"house_owner"
    }
    let paras1={
      type:"work_status"
    }
    let paras2={
      type:"car_control"
    }
    let paras3={
      type:"address_remarks"
    }
    findByType(para).then(res=>{
      let data=res.data.result;
      this.isperson=data
    });
     findByType(paras0).then(res=>{
      let data=res.data.result;
      this.addressStn=data
    });
    findByType(paras).then(res=>{
      let data=res.data.result;
      this.houseStn=data
    });
     findByType(paras1).then(res=>{
      let data=res.data.result;
      this.workStn=data
    });
     findByType(paras2).then(res=>{
      let data=res.data.result;
      this.carStn=data
    });
    findByType(paras3).then(res=>{
      let data=res.data.result;
      this.addressName=data
    });
   },
   getaddressType(){
     let para={
       	missionId: this.$route.params.id
     }
     AddresssfindByType(para).then(res=>{
       let data=res.data.result;
       this.addressType=data
     })
   },
   changeAddressType(val){
     this.roleName=val.split("-").shift();
     this.type=val.split("-").pop();
     this.address=[];
     let para={
       missionId: this.$route.params.id,
       roleName:this.roleName,
       type:this.type
     }
     AddresssfindAddress(para).then(res=>{
       let data=res.data.result
       this.address=data;
      for(let a=0;a<this.address.length;a++){
        this.mainformvisit.address=this.address[0]
      }
     });
     
   },
   canclevisit(){  
	   this.visitListDetial=false;
    //  this.$refs.mainforms.resetFields();
   },
   submitMsg(){
     let para={
          missionId: this.$route.params.id,
          outsideTime:this.timesvisit,
          addressType:this.mainformvisit.addressType,
          address:this.mainformvisit.address,
          addressReal:this.mainformvisit.istrue,
          addressRemarks:this.mainformvisit.addressName,
          callReal:this.mainformvisit.isanswer,
          seeIt:this.mainformvisit.isperson,
          // seeItS:this.mainformvisit.ispersons,
          personmarks:this.mainformvisit.personmarks,
          cusAddressSituation:this.mainformvisit.addressStn,
          ownerHource:this.mainformvisit.houseStn,
          cusWorkSituation:this.mainformvisit.workStn,
          carControl:this.mainformvisit.carStn
      }
      VisitRecords(para).then(res=>{
        console.log(res)
      })
   }


	// 	// 上传错误
	// 	uploadError (response, file, fileList) {
	// 		console.log(response)
	// 		console.log(file)
	// 		console.log(fileList)
	// 	console.log('上传失败，请重试！')
	// 	},
	// 	// 上传前对文件的大小的判断
	// 	beforeAvatarUpload (file) {
	// 	const extension = file.name.split('.')[1] === 'xls'
	// 	const extension2 = file.name.split('.')[1] === 'xlsx'
	// 	const extension3 = file.name.split('.')[1] === 'doc'
	// 	const extension4 = file.name.split('.')[1] === 'docx'
	// 	const isLt2M = file.size / 1024 / 1024 < 10
	// 	if (!extension && !extension2 && !extension3 && !extension4) {
	// 		alert('上传模板只能是 xls、xlsx、doc、docx 格式!')
	// 	}
	// 	if (!isLt2M) {
	// 		alert('上传模板大小不能超过 10MB!')
	// 	}
	// 	return extension || extension2 || extension3 || extension4 && isLt2M
	// 	},
	// 	submitUpload() {
    //     this.$refs.upload.submit();
    //   },
	},
// 	components:{
// 	  visitList
//   },
  beforeMount(){
	  	
		
  },
	mounted() {
	this.getlists();
	this.callParent();
	this.restaurants=this.userList;
	this.restaurants1=this.getname;
	this.restaurants2=this.getfangshi;
	this.NoRefresh();
	// this.getlistvisit();
    this.getaddress();
    this.getaddressType()
    }
}
</script>
<style>	
	#tables{display: flex;justify-content: space-between;min-height: 100px}
	 #tables .el-input{height: 24px}
	#FixForm .el-form-item{margin: 0px 5px 13px;}
	#bzt {width: 53%}
	#lists{width:45%;font-size: 13px;margin-left: 10px}
	#lists .el-form-item__label{font-size: 13px!important}
	#FixForm .el-form-item__content{width:150px!important }
	#bzt .el-form-item__content{width: 98%!important} 
	#bzt .el-button{padding: 5px;margin: 5px;font-size: 13px}
	.dropdown-menu{display: block;min-height: 100px!important}
	.el-input__inner{margin-left: 5px;height: 24px!important}
	#el-icons{font-size: 13px!important;margin-top: 5px!important}
	#inp .el-input__inner{margin-left: 0!important};
	#selectMes .el-input{height: 24px!important} 
	#FixForm .el-form-item{margin-bottom: 5px!important}
	#MsgDialog .el-form-item{margin-bottom: 15px!important}
	.tips{font-size: 12px;color: red}
	#fileUpload .el-dialog--small{width:97%!important;max-height:700px;overflow: auto!important;top:2%!important};
	#fileUpload .el-dialog__body{padding: 10px 20px!important;}
	#uploadFile .el-button{padding: 2px!important;font-size: 13px!important}
	#outerdialog .el-dialog--small{width:97%!important;max-height:700px;overflow: auto!important;top:2%!important}
	#outerdialog .el-form-item__content{width:165px!important }
	#outerdialog .el-input__inner{height: 30px!important}
	@media screen and (max-width:1250px) {
	/* #FixForm{display:flex} */
		#bzt {width: 45%}
		#lists{width:52%;font-size: 13px;margin-left: 10px}
		#FixForm .el-form-item__content{width:125px!important}
		#bzt .el-form-item__content{width: 98%!important}
	} 
</style>