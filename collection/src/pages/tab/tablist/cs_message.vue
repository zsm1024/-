<template>
	<section  ref="abc" style="overflow-y: auto;" class="msgs" id="chatContainer">	
		<el-collapse v-model="activeNames">	
			<el-collapse-item name="10" title="客户基本信息">				
				<template slot-scope="title" >
                    <el-table :data="items.customerSimpleList" border stripe  :row-class-name="tableRowClassNames"> 
						<!-- width="60" -->
						<el-table-column :prop="baseinfo.field" :label="baseinfo.title"  v-for="(baseinfo, index) in baseinfo" :key="index"   align="center" show-overflow-tooltip  :width="baseinfo.width">
						</el-table-column>			
					</el-table>
                </template>
			</el-collapse-item>
			<el-collapse-item name="2" title="客户电话信息" id="asd" style="position:relative"> 
				<el-button class="filter-item"   type="primary" style=" position:absolute;top:14px;left:125px"   @click="addUserInfos = true">添加</el-button>
				<el-table :data="items.customerPhones" border stripe :row-class-name="tableRowClassNameCustom" >
					<el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						<template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='phoneEdit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" v-if=" scope.row.infoSource!='CMS'"  @click.native.prevent="deleteRow(scope.$index, scope.row,items.customerPhones)"> 移除</el-button>
						</template>
					</el-table-column>
					<el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" :key="index" align="center" :width="cols.width" show-overflow-tooltip >
						<template slot-scope="scope">
							<!-- v-if="cols.field!='effectiveness' &&scope.row.infoSource!='CMS' && cols.field!='infoSource'" -->
							<el-input  v-show="scope.row.edit" v-if="scope.row.infoSource!='CMS'&&(cols.field=='relationship'||cols.field=='phone')" size="small" v-model="scope.row[cols.field]" class="inputInner"></el-input>
							 <span v-show="scope.row.edit" v-if="(cols.field!='phoneNum'&&cols.field!='effectiveness' && scope.row.infoSource=='CMS')||cols.field=='infoSource'||(cols.field!='phoneNum'&&cols.field!='effectiveness' && scope.row.infoSource!='CMS')" >{{ scope.row[cols.field] }}</span>
							 <!-- <span v-show="!scope.row.edit" v-if="(cols.field!='phoneNum'&&cols.field!='effectiveness' && scope.row.infoSource=='CMS')||cols.field=='infoSource'" >{{ scope.row[cols.field] }}</span> -->
							<span style="display:inline-block;padding:0 15px" v-show="!scope.row.edit"  :class="{changecolor:scope.row['effectiveness']=='N'}" >{{ scope.row[cols.field] }}
								<i v-if="cols.field=='phone'" class="fa fa-mobile fa-2x" style="color:#20a0ff;margin-left: 5px;cursor: pointer;" @click="ring(scope.row.phone,scope.row)"></i>
								<i v-if="cols.field=='name'" class="fa fa-mobile fa-2x" style="color:#20a0ff;margin-left: 5px;cursor: pointer;" @click="ring1(scope.row.phone,scope.row)"></i>								
								</span>
								<el-select v-show="scope.row.edit" v-if="cols.field=='phoneNum'" v-model="scope.row[cols.field]" placeholder="请选择">
								<el-option v-for="(item,index) in PhoneCodeList"  :key="index" :value="item.phoneNotes  +'('+ item.phoneCode + ')'"></el-option>
							</el-select>
							<!-- ring(scope.row.phoneNum) -->
							<el-select v-show="scope.row.edit" v-if="cols.field=='effectiveness'" v-model="scope.row[cols.field]" placeholder="请选择活动区域">
								<el-option label="Y" value="Y"></el-option>
								<el-option label="N" value="N"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>				
			</el-collapse-item>	
			 <!--  @click.native.prevent="deleteRow(scope.$index, tableData4)"-->
			<el-collapse-item name="3" title="客户地址信息" style="position:relative">
				<el-button class="filter-item" style="  position:absolute;top:14px;left:125px"  type="primary"  @click="addWorkInfos = true">添加</el-button>	
				<el-table :data="items.customerAddresses" border stripe :row-class-name="tableRowClassNameAddress" >
					<el-table-column label="操作" align="center"  width="100">
						<template slot-scope="scope" >
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='addressEdit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" v-if=" scope.row.infoSource!='CMS'"  @click.native.prevent="deleteAdress(scope.$index, scope.row,items.customerAddresses)"> 移除</el-button>
						</template>
					</el-table-column>
					<el-table-column :prop="cols1.field" :label="cols1.title"  v-for="(cols1, index) in cols1" :key="index" align="center" :width="cols1.width" show-overflow-tooltip >
						<template slot-scope="scope">
							<!-- v-if="cols1.field!='effectiveness' &&scope.row.infoSource!='CMS'&& cols1.field!='infoSource'" -->
							<el-input  v-show="scope.row.edit"  v-if="scope.row.infoSource!='CMS'&&(cols1.field=='relationship'||cols1.field=='province'||cols1.field=='city'||cols1.field=='address'||cols1.field=='propertyType')" size="small" v-model="scope.row[cols1.field]" class="inputInner"></el-input>
							<span v-show="scope.row.edit" v-if="(cols1.field!='effectiveness' && scope.row.infoSource=='CMS')||cols1.field=='infoSource'||(cols1.field!='effectiveness' && scope.row.infoSource!='CMS')" >{{ scope.row[cols1.field] }}</span>
							<!-- <span v-show="scope.row.edit" v-if="(cols1.field!='effectiveness' && scope.row.infoSource!='CMS')||cols1.field=='infoSource'" >{{ scope.row[cols1.field] }}</span> -->
							<span v-show="!scope.row.edit" :class="{changecolor:scope.row['effectiveness']=='N'}">{{ scope.row[cols1.field] }}</span>
							<el-select v-show="scope.row.edit" v-if="cols1.field=='effectiveness'" v-model="scope.row[cols1.field]" placeholder="请选择活动区域">
								<el-option label="Y" value="Y"></el-option>
								<el-option label="N" value="N"></el-option>
							</el-select>
						</template>
					</el-table-column>			
				</el-table>				
			</el-collapse-item>	
			<el-collapse-item name="11" title="经销商基本信息">
				<table style="border-collapse:collapse" id="jxs">
					<tr id="titleTr">
						<td>{{JRZY}}</td>
						<td style="background:#eef1f6">{{JXSNAME}}</td>
						<td v-for="(phone ,index) in phoneList" :key="index" style="background:#eef1f6">{{phone.name}}{{index+1}}</td>	
						<td v-for="address in addressList" :key="address.index" style="background:#eef1f6" >{{address.name}} </td>					
					</tr>
					<tr>
						<td>{{dealerName}}</td>
						<td>{{jxsName}}</td>
						<td v-for="phone in phoneList" :key="phone.index">{{phone.phone}} </td>
						<td v-for="address in addressList" :key="address.index">{{address.address}} </td>	
					</tr>
				</table>
				<!-- <label v-for="phone in phoneList" :key="phone.index">
					<span>电话</span>
					<span>{{phone}}</span>	
				</label>		 -->
				<!-- <template slot-scope="title" >
                    <el-table :data="items.customerSimpleList" border stripe > 			
						<el-table-column :prop="baseinfo.field" :label="baseinfo.title"  v-for="(baseinfo, index) in baseinfo" :key="index"   align="center" :width="baseinfo.width">
						</el-table-column>			
					</el-table>
                </template> -->
			</el-collapse-item>				
			<el-collapse-item name="5" title="合同基本信息">
				<el-form :data="items" inline class="table-expand">
					
					<el-form-item label="申请号:" >
						<span>{{items.appNum}}</span>
						<!-- <span>{{items.delyNum}}</span> -->
					</el-form-item>
					<el-form-item label="合同号:">
						<span>{{items.applicationNumber}}</span>
						<!-- <span>{{items.contractNum}}</span> -->
					</el-form-item>
					<el-form-item label="首付比例(%):" >
						<span>{{items.firstRatio}}</span>
						<!-- <span>{{items.ShoufuRatio}}</span> -->
					</el-form-item>
					<el-form-item label="贷款金额:" >
						<span>{{items.loanAmount}}</span>
						<!-- <span>{{items.loan}}</span> -->
					</el-form-item>
					<el-form-item label="合同起始日:" >
						<span>{{items.startTime}}</span>
						<!-- <span>{{items.startTime}}</span> -->
					</el-form-item>
					<el-form-item label="贷款产品:" >
						<span>{{items.loanProducts}}</span>
						<!-- <span>{{items.RepayTime}}</span> -->
					</el-form-item>
					<el-form-item label="还款日:" >
						<span>{{items.datePayment}}</span>
						<!-- <span>{{items.loanTime}}</span> -->
					</el-form-item>
					<el-form-item label="贷款期数:" >
						<span>{{items.loanNum}}</span>
						<!-- <span>{{items.endTime}}</span> -->
					</el-form-item>
					<el-form-item label="合同终止日:" >
						<span>{{items.endTime}}</span>
						<!-- <span>{{items.total}}</span> -->
					</el-form-item>
				</el-form>				
			</el-collapse-item>	
			<el-collapse-item name="6" title="逾期基本信息">
				<el-form :data="items" inline class="table-expand">
					<el-form-item label="逾期日期:" >
						<span>{{items.overdueDate}}</span>
					</el-form-item>
					<el-form-item label="本次逾期天数:">
						<span>{{items.overdueDays}}</span>
						<!-- <span>{{items.ThisOverdueDay}}</span> -->
					</el-form-item>
					<el-form-item label="本期逾期天数:">
						<span>{{items.overdueDaysperiod}}</span>
						<!-- <span>{{items.ThisCurrentdDay}}</span> -->
					</el-form-item>
					<el-form-item label="月应还款金额:">
						<span>{{items.monthlyRepayment}}</span>
					</el-form-item>
					<el-form-item label="逾期本金总计:" >
						<span>{{items.sumOverdue}}</span>
					</el-form-item>
					<el-form-item label="到期利息总计:">
						<span>{{items.totalDue}}</span>
					</el-form-item>
					<el-form-item label="逾期还款总额:" >
						<span>{{items.totalPayment}}</span>
					</el-form-item>
					<el-form-item label="逾期利息:" >
						<span>{{items.overdueInterest}}</span>
					</el-form-item>
					<el-form-item label="逾期费用:" >
						<span>{{items.overdueMoney}}</span>
					</el-form-item>
					<el-form-item label="逾期应收总计:">
						<span>{{items.overdueTotal}}</span>
					</el-form-item>
					<el-form-item label="ET结算金额:">
						<span>{{ET}}</span>
					</el-form-item>
				</el-form>				
			</el-collapse-item>	
			<el-collapse-item name="8" title="备注" style="position:relative">			
                     <el-button type="primary" size="mini" v-on:click="remarkopenList" style="position:absolute;top:13px;left:70px" >编辑</el-button>					 
				<p style="word-break:break-all">{{marks}}</p>											
			</el-collapse-item>							
		</el-collapse>		
		<el-dialog title="备注" :visible.sync="remarkopen" :show-close='false' id="remarkopen">
			<el-form :model="remarkform" ref='remarkform'>
				<el-form-item label="备注内容" :label-width="formLabelWidth">
					<el-input type="textarea" :maxlength="2000"  :value="marks" v-model="remarkform.remarks" 
					></el-input>				
					<span>(不超过2000字)</span>
				</el-form-item>				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native.prevent="confirmremarkopen('remarkform')">确 定</el-button>
			</div>
		</el-dialog>
	
		<el-dialog title="新增客户电话信息" :visible.sync="addUserInfos"  id="addUserInfos" :show-close='false'>
			<el-form :model="AdduserForm" ref="AdduserForm" :rules="phonerules" :data='items.customerPhones'>
				<el-form-item label="角色：" prop="roleName" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.roleName" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" prop="name" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.name" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="关系：" prop="relationship" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.relationship" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="电话：" prop="phone" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.phone" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="电话类型：" prop="phoneType" :label-width="formLabelWidth">
					<!-- <el-select v-model="AdduserForm.phoneType" style="width:300px">
							<el-option v-for="(item,index) in items.customerPhones"  :key="index" :value="item.phoneType"></el-option>
					</el-select> -->
					<el-input v-model="AdduserForm.phoneType" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="电话码：" prop="phoneNum" :label-width="formLabelWidth">
					<el-select v-model="AdduserForm.phoneNum" style="width:300px">
							<el-option v-for="(item,index) in PhoneCodeList"  :key="index" :value="item.phoneCode +'('+ item.phoneNotes + ')'"></el-option>
					</el-select>
					<!-- <el-input v-model="AdduserForm.phoneNum" style="width:300px"> </el-input> -->
				</el-form-item>
				<el-form-item label="信息来源：" :label-width="formLabelWidth">
					<el-input disabled  v-model="AdduserForm.infoSource" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="有效性：" :label-width="formLabelWidth">
					<el-input disabled v-model="AdduserForm.effectiveness" style="width:300px"></el-input>
				</el-form-item>				
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addUserInfo">取 消</el-button>
 <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <el-button  type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
      </div>			
		</el-dialog>
		<el-dialog title="新增客户地址信息" :visible.sync="addWorkInfos"  id="addWorkInfos" :show-close='false'>
			<el-form :model="AddWorkForm" ref="AddWorkForm" :rules="addressrules">
				<el-form-item label="角色：" prop="roleName" :label-width="formLabelWidth">
					<el-input v-model="AddWorkForm.roleName" style="width:300px" ></el-input>
				</el-form-item>
				<el-form-item label="姓名：" prop="name" :label-width="formLabelWidth"  >
					<el-input v-model="AddWorkForm.name" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="关系：" prop="relationship" :label-width="formLabelWidth">
					<el-input v-model="AddWorkForm.relationship" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  label="省：" prop="province" :label-width="formLabelWidth" >
					<el-input v-model="AddWorkForm.province" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  label="市：" prop="city" :label-width="formLabelWidth" >
					<el-input v-model="AddWorkForm.city" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  label="地址：" prop="address" :label-width="formLabelWidth" >
					<el-input v-model="AddWorkForm.address" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  label="地址类型：" prop="addressType" :label-width="formLabelWidth" >
					<el-input v-model="AddWorkForm.addressType" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item  label="所有权类型：" prop="propertyType" :label-width="formLabelWidth" >
					<el-input v-model="AddWorkForm.propertyType" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="信息来源：" :label-width="formLabelWidth" >
					<el-input disabled  v-model="AddWorkForm.infoSource" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="有效性：" :label-width="formLabelWidth">
					<el-input disabled v-model="AddWorkForm.effectiveness" style="width:300px"></el-input>
				</el-form-item>					
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addWorkInfo" >取 消</el-button>
 <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <el-button  type="primary" @click.native.prevent="address('AddWorkForm')" >确 定</el-button>
      </div>			
		</el-dialog>
		<div id="bottomFrom">
			<form-message ref="CJlist"></form-message>
			<!-- :callback='callback' -->
		</div>
	</section>
</template>

<script>
//import $ from 'jquery'
import { tab_view,addInfo,addAddress,delPhoneInfo,updatePhoneInfo,updateAddress,delAddress,recordAdd,addMessage,jxsInfo,getdeal,colHistory_note} from "@/api/tablist";
import { isCodeNum, isPhoneNum,isChinaName } from "@/utils/validate";
import formMessage from '../tablist/form_message';
import {clickCallOut,initParam} from '../../../../ngcc/softPhone';
import {PhoneCodeListAll} from "@/api/basedata";
// import{initParam,doSignIn,clickSignOut,clickCallOut,clickSetIdle,clickSetBusy,clickHangup,Hold,cannel,setRetrieveHold,doConsultation,doTransfer,answer,SingleStepConfCallEx} from "../../../../ngcc/softPhone"
export default {
  data() {	 
    	return {
			floatForm:{
				 background:"#fff",
				 zIndex:"10"
	 		},
			classObject: {
				active: true,
				'text-danger': false
			},
			activeNames:["1","2","3","4","5","6",'7',"8","9","10",'11'],
			items: [],
			marks:"",
			phoneList:[],
			addressList:[],	
			PhoneCodeList:[],
			jxsName:"",	
			JXSNAME:"",
			dealerName:"",
			JRZY:"",
			ET:'',
			dealerName:"",
			cols:[
				{title:'角色',field:'roleName',width:"70"},
            	{title:'姓名',field:'name',width:"80"}, 
            	{title: '关系', field: 'relationship', width: "50" },         
            	{title:'电话',field:'phone',width:"140"},
            	{title: '电话类型', field: 'phoneType', width: "90" },
            	{title: '电话码', field: 'phoneNum', width: "90" },	
            	{title:'信息来源',field:'infoSource',width:"60"},
            	{title:'有效性',field:'effectiveness',width:"60"},
			],
			dialogStatus: '',
			cols1:[
				{title:'角色',field:'roleName',width:"70"},
            	{title:'姓名',field:'name',width:"80"},
				{title:'关系', field: 'relationship', width: "50" }, 
				{title:'省',field:'province',width:"60"},
				{title:'市',field:'city',width:"60"},     
				{title:'地址',field:'address',width:"200"},				
				{title: '地址类型', field: 'addressType', width: "70" },
				{title:'所有权类型',field:'propertyType',width:"60"},
            	{title:'信息来源',field:'infoSource',width:"60"},
				{title:'有效性',field:'effectiveness',width:"60"},
				
			],
			baseinfo:[
				{ title: '角色名', field: 'roleName', width: "60" },
				{ title: '姓名', field: 'name', width: "80" },
				// { title: '拼音', field: 'pinyin', width: "80" },
				{ title: '职业', field: 'occupation', width: "80" },
				{ title: '单位名称', field: 'unitName', width: "110" },
				{ title: '性别', field: 'sex', width: "45" },
				{ title: '证件类型', field: 'documentType', width: "90"},
				{ title: '证件号码', field: 'documentNum', width: "145"},
				{ title: '出生日期', field: 'birthDate', width: "80"}
			],
			callback:{
				phoneType:'',
				roleName:'',
			},		
			id:this.$store.state.navTabs.tabId,	
			remarkopen: false,
			messageopen: false,
			addUserInfos:false,
			addWorkInfos:false,
			 formLabelWidth: '120px',
			//备注弹出层
			remarkform: {
				remarks:'',
			},

			//用户信息弹出层
			AdduserForm:{
				roleName:"",
				name:"",
				relationship:"",
				phone:"",
				phoneType:"",
				phoneNum:"",
				infoSource:"ICS",
				effectiveness:"Y",	
			},
			AddWorkForm:{
				roleName:"",
				name:"",
				relationship:"",
				province:"",
				city:"",
				address:"",
				addressType:"",
				propertyType:"",
				infoSource:"ICS",
				effectiveness:"Y",	
			},							
	
			phonerules: {
			    roleName: [
                    { required: true, message: '请输入角色', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                relationship: [
                    { required: true, message: '请输入关系', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                phoneType: [
                    { required: true, message: '请输入电话类型', trigger: 'blur' }
                ],
                // phoneNum: [
                //     { required: true, message: '请输入电话码', trigger: 'blur' }
                // ],
            },
            addressrules:{
                roleName: [
                    { required: true, message: '请输入角色', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                relationship: [
                    { required: true, message: '请输入关系', trigger: 'blur' }
				],
				 province: [
                    { required: true, message: '请输入省名', trigger: 'blur' }
				],
				 city: [
                    { required: true, message: '请输入市名', trigger: 'blur' }
				],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
				],				
                addressType: [
                    { required: true, message: '请输入地址类型', trigger: 'blur' }
                ],
               
            }
    };
  },
  methods: {
	  //电话信息
 		choice(AdduserForm){			
 			let para ={
    			roleName:this.AdduserForm.roleName,
				name:this.AdduserForm.name,
				relationship:this.AdduserForm.relationship,
				phone:this.AdduserForm.phone,
				phoneType:this.AdduserForm.phoneType,
				phoneNum:this.AdduserForm.phoneNum,
				infoSource:'ICS',
				effectiveness:"Y",
				afpId: this.$route.params.id,
				
            };
            this.$refs[AdduserForm].validate((valid) => {
                if(valid){
                    addInfo(para).then(res =>{
                    // debugger;
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.items.customerPhones.unshift(
                        {"roleName":this.$refs['AdduserForm'].model.roleName,"name":this.$refs['AdduserForm'].model.name,"relationship":this.$refs['AdduserForm'].model.relationship,
                        "phone":this.$refs['AdduserForm'].model.phone,
                        "phoneType":this.$refs['AdduserForm'].model.phoneType,"phoneNum":this.$refs['AdduserForm'].model.phoneNum,                                         
                        "infoSource":"ICS","effectiveness":"Y","edit":false},	
                        
                    );
                    this.addUserInfos=false;
                    this.$refs['AdduserForm'].resetFields();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '添加失败，请联系管理员'
                        })
                        
                    }   		   		
                    })
                }else{   		
                    this.addUserInfos=true;
                    this.$refs.AdduserForm.validate((valid) => {
                        if (valid) {				
                        alert('submit!');
                        } else {
                            return false;
                        }
                    });
                } 
            });  	
		},
		//备注方法
		getmessage_note() {
				let paras = {
					missionId:this.$route.params.id,					
				};

     		colHistory_note(paras).then(res => {			 
				let data = res.data.result;
				if(data==null){
					return false;
				}else{
					this.marks=data.remarks;	
				}					
					// this.item.push(data);			
      		});
		},
		remarkopenList(){
			this.getmessage_note()
			this.remarkopen=true;
			this.remarkform.remarks=this.marks
		},
		confirmremarkopen(remarkform) {
			this.getmessage_note()
				this.remarkopen=false;
				let para ={
					remarks:this.remarkform.remarks,
					id:this.$route.params.id
				}
				this.$refs[remarkform].validate((valid) => {
                if(valid){
                    addMessage(para).then(res =>{
						
                        if(res.data.success){
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            })
                            // this.items.customerAddresses.unshift(
                            // {"roleName":this.$refs['AddWorkForm'].model.roleName,"name":this.$refs['AddWorkForm'].model.name,"relationship":this.$refs['AddWorkForm'].model.relationship,
                            // "address":this.$refs['AddWorkForm'].model.address,
                            // "addressType":this.$refs['AddWorkForm'].model.addressType,                  
                            // "infoSource":"WCMS","effectiveness":"Y","edit":false},	
                            
                            // );
						this.remarkopen=false;
						
						// this.$refs['remarkform'].resetFields();
						this.getmessage_note()
                        }else{
                            this.$message({
                            type: 'error',
                            message: '添加失败，请联系管理员'
                            })
                        }   		   		
                    })
                }else{   		
                    this.remarkopen=true;
                    this.$refs.remarkform.validate((valid) => {
                        if (valid) {                       
                        alert('submit!');
                        } else {
                            return false;
                        }
                    });
                } 
            }); 
				this.$message({
					type:'success',
					message:'保存成功',
				});

		},
		 //地址信息
		 address(AddWorkForm){			
 			let para ={
    			roleName:this.AddWorkForm.roleName,
				name:this.AddWorkForm.name,
				relationship:this.AddWorkForm.relationship,
				province:this.AddWorkForm.province,
				city:this.AddWorkForm.city,
				address:this.AddWorkForm.address,
				addressType:this.AddWorkForm.addressType,
				propertyType:this.AddWorkForm.propertyType,
				infoSource:'ICS',
				effectiveness:"Y",
				afpId: this.$route.params.id,
			};
            this.$refs[AddWorkForm].validate((valid) => {
				
                if(valid){
                    addAddress(para).then(res =>{
                        if(res.data.success){
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
							})
                            this.items.customerAddresses.unshift(
							{"roleName":this.$refs['AddWorkForm'].model.roleName,
							"name":this.$refs['AddWorkForm'].model.name,
							"relationship":this.$refs['AddWorkForm'].model.relationship,
							"province":this.$refs['AddWorkForm'].model.province,
							"city":this.$refs['AddWorkForm'].model.city,
                            "address":this.$refs['AddWorkForm'].model.address,
							"addressType":this.$refs['AddWorkForm'].model.addressType, 
							"propertyType":this.$refs['AddWorkForm'].model.propertyType,                                          
							"infoSource":"ICS","effectiveness":"Y","edit":false,"id":res.data.result
							},	                          
							);
                        this.addWorkInfos=false;
                        this.$refs['AddWorkForm'].resetFields();
                        }else{
                            this.$message({
                            type: 'error',
                            message: '添加失败，请联系管理员'
                            })
                        }   		   		
                    })
                }else{   		
                    this.addWorkInfos=true;
                    this.$refs.AddWorkForm.validate((valid) => {
                        if (valid) {
                        
                        alert('submit!');
                        } else {
                            return false;
                        }
                    });
                } 
            });    	
 		},
		deleteRow(index, rows, datas) {
			let para ={
				id:rows.id,
			}
			this.$confirm('确定删除信息吗？','提示',{
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type:'warning'
			}).then(() => {
				delPhoneInfo(para).then(res =>{
			
					if(res.data.success){
						datas.splice(index, 1);
						this.$message({
							type: 'success',
							message: '删除成功！'
						})
					}else{
						this.$message({
							type: 'error',
							message: '删除失败，请联系管理员！'
						})
					}
				});
				
			}).catch(() =>{
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});

			
		},
		deleteAdress(index, rows, datas) {
				let para ={
				id:rows.id,
			}
			this.$confirm('确定删除信息吗？','提示',{
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type:'warning'
			}).then(() => {
				delAddress(para).then(res =>{
			
					if(res.data.success){
						datas.splice(index, 1);
						this.$message({
							type: 'success',
							message: '删除成功！'
						})
					}else{
						this.$message({
							type: 'error',
							message: '删除失败，请联系管理员！'
						})
					}
				});
				
			}).catch(() =>{
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		ring(phoneNum,row,){
			window.frames['']
			var pattern="-";
			phoneNum=phoneNum.replace(new RegExp(pattern),"");
			// let a=phoneNum;
			// a.replace(/(^\s*)|(\s*$)/g, "");
			// console.log(phoneNum.length)
			// console.log(a.length);
			// phoneNum=phoneNum.replace(/\s+/g,"")
			// phoneNum="0"+a;
			localStorage.removeItem("CJPhone");
			localStorage.setItem("phoneNum","0"+phoneNum);
			localStorage.setItem("CJPhone",phoneNum);
			this.$refs.CJlist.PhoneCtr();
			var user=localStorage.getItem("userName");
			let phoneNumVal="0"+phoneNum
			document.getElementById("frame2").contentWindow.telNumVal(phoneNumVal);
			// initParam(user)
			document.getElementById("frame2").contentWindow.clickCallOut("0","0"+phoneNum,this.appNum,row.name);
			// clickCallOut("0","0"+phoneNum,row.name,this.applicationNumbers)
		},	
		ring1(phoneNum,row,){
			var pattern="-";			
			phoneNum=phoneNum.replace(new RegExp(pattern),"");
			// phoneNum=phoneNum;	
			localStorage.removeItem("CJPhone");
			localStorage.setItem("phoneNum",phoneNum);
			localStorage.setItem("CJPhone",phoneNum);
			this.$refs.CJlist.PhoneCtr();
			var user=localStorage.getItem("userName");
			document.getElementById("frame2").contentWindow.telNumVal(phoneNum);
			document.getElementById("frame2").contentWindow.clickCallOut("0",phoneNum,this.appNum,row.name);
        	// initParam(user)
			// clickCallOut("0",phoneNum,row.name,this.applicationNumbers)			
		},	
		phoneEdit(row){
			let para = row
			
			if(row.edit=!row.edit){
			
			}else{
				updatePhoneInfo(para).then(res =>{
						if(res.data.success){
							this.$message({
								type: 'success',
								message: '编辑成功'
							})
						}else{
							this.$message({
								type: 'error',
								message: '编辑失败，请联系管理员！'
							})
						}
				});
				
				
			}
			//row.edit=!row.edit;
		
		},
		
		addressEdit(row){
			let para = row
			if(row.edit=!row.edit){
			
			}else{
				updateAddress(para).then(res =>{
						if(res.data.success){
							this.$message({
								type: 'success',
								message: '编辑成功！'
							})
						}else{
							this.$message({
								type: 'error',
								message: '编辑失败，请联系管理员！'
							})
						}
				});
				
				
			}
		},
		//短信方法
		confirmmessage() {
				this.messageopen=false;
				this.$message({
					type:'success',
					message:'保存成功',
				});
		},
		
		//添加客户信息方法
		addUserInfo(){
			this.addUserInfos=false;
			this.$refs['AdduserForm'].resetFields();
		},
		//添加客户地址信息方法
		addWorkInfo(){
			this.addWorkInfos=false;
			this.$refs['AddWorkForm'].resetFields();
		},
		// slibceshi(){
           
		// 	let para = {
		// 		missionId: this.$route.params.id
		// 	};
		// 	tab_view(para).then(res => {
		// 		 let data = res.data.result;			
		// 		 this.items = data;								
		// 		this.items.customerPhones = this.items.customerPhones.map(v => {
                   
		// 			this.$set(v, 'edit', false)
		// 			return v;
					
		// 		});
				
		// 		this.items.customerAddresses = this.items.customerAddresses.map(v => {
		// 			this.$set(v, 'edit', false)
		// 			return v
		// 		})
		// 		this.remarkform.remarks = this.items.remarks;
		// 		// this.cols=data.cols;
        //         // this.cols1=data.cols1; 
		// 		this.height=document.documentElement.clientHeight-400;       
		// 	});
        // },	
		getlist() {
			let para = {
				missionId: this.$route.params.id
			};
			tab_view(para).then(res => {
				 let data = res.data.result;			
				 this.items = data;	
				 this.appNum=data.appNum;	
				
				this.items.customerPhones = this.items.customerPhones.map(v => {
					this.$set(v, 'edit', false)
					return v;
					
				});
				
				this.items.customerAddresses = this.items.customerAddresses.map(v => {
					this.$set(v, 'edit', false)
					return v
				})
				this.remarkform.remarks = this.items.remarks;
				// this.cols=data.cols;
                // this.cols1=data.cols1; 
				this.height=document.documentElement.clientHeight-400;       
			});
			getdeal(para).then(res =>{
				let data =res.data.result;
				this.ET=data.et;			
			})
   },
	//经销商信息
	getJxsInfo(){
		let para = {
			missionId: this.$route.params.id
		};
			jxsInfo(para).then(res =>{
				if(res.data.success){
				let data =res.data.result;
				this.JRZY="金融专员";
				this.jxsName=data.name;
				this.dealerName=data.dealerName;
				this.JXSNAME="名称"
				data.phone.forEach(element => {
					this.phoneList.push({"phone":element.phone,"name":"电话"})
				});
				data.address.forEach(element => {					
					 this.addressList.push({"address":element,"name":"地址"})
				});
				}
				
				// console.log(data.address)
			})
	},
	//  getCodeAll().then(res => {
	// 			 console.log(res)
    //              var arrpush = [];
    //              res.data.result.forEach(function(value,index){
    //                 arrpush.push(value.actCode+"-"+value.actNotes);
    //              })
    //              this.getdaima = arrpush;
              
	// 		});
	//获取电话码
	getPhoneCode(){
		PhoneCodeListAll().then(res =>{
			let data =res.data.result;
			this.PhoneCodeList =data;
		})
	},
	//客户基本信息中英文
	tableRowClassNames(row,rowIndex){
		row.documentType=row.documentType.split(" ").shift(" ").trim()
		row.sex=row.sex.split("(").shift("(").trim()
	},
	tableRowClassNameCustom(row,rowIndex){
		row.phoneType=row.phoneType.split(" ").shift(" ").trim();
		// let reg=/[a-zA-Z]/g;
		// console.log(row.relationship.replace(reg," ").trim())
		// row.relationship=row.relationship.replace(reg," ").trim()
	},
	tableRowClassNameAddress(row,rowIndex){
		let rows=row.addressType.split(":").pop(":").trim();
		row.addressType=rows.split(" ").shift(" ").trim();
		// let reg=/[a-zA-Z]/g;
		// console.log(row.relationship.replace(reg," ").trim());
		// row.relationship=row.relationship.replace(reg," ").trim()
	},
// 	c(s){
// 		console.log(s.value.length)
//     // if(s.value.length > 3){
//     //     return s.value = s.value.substr(0, 3), alert('最大字符数为3');
//     // }
//     // return !0;
// }
  },
  components:{
	  formMessage
  },
  mounted() {
	this.getlist();
	this.getJxsInfo()
	this.getPhoneCode();
	this.getmessage_note();
    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-270;
   	this.$refs.abc.style.height= h+"px";
  }
};
</script>
<style>
	h4{background: #eef1f6;padding: 10px;border: 1px solid #dfe6ec;font-weight: bold;}
	table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;height:23px!important;line-height: 23px!important;background: #f0f0f0;}	
	.useraddress{width: 150px;}
	.el-collapse-item__header{font-size:13px!important;font-weight: bold!important;background:#dfe6ec!important;border: 1px solid #f0f0f0;}
	.abc{height: 500px!important; }
	.el-col .el-icon-edit,.el-col .el-icon-message,.el-col .el-icon-upload2,.el-col .el-icon-time{cursor: pointer; color: #20a0ff;margin-left: 5px;}
	.el-col .el-icon-upload2:hover{color: #4db3ff;}
	.el-col .el-icon-edit:hover{color: #4db3ff;}
	.el-col .el-icon-message:hover{color:#4db3ff}
	.el-col .el-icon-time:hover{color:#4db3ff}
	.changecolor{color: red;}
	.el-tabs--border-card>.el-tabs__content{padding: 0!important}
	.el-collapse-item__content{padding:5px!important}
	.el-form-item__label{padding: 5px 0!important}
	.el-form-item__content{line-height: 24px!important}
  	.table-expand label { width:90px!important;text-align:el-pagination__rightwrapper;}
  	.table-expand .el-form-item {margin: 0 0 0 2px!important; min-width:220px!important;color: #269aff!important;}
  	.el-table .cell{padding: 0!important;white-space:nowrap!important};
	.floatForm{position: fixed;bottom: 0;right:0}
	::-webkit-scrollbar{width:2px;height:12px }
	::-webkit-scrollbar-track{background-color:#fff;border-radius: 8px}
 	::-webkit-scrollbar-thumb{background-color:#bee1eb;border-radius: 8px}
	::-webkit-scrollbar-thumb:active {background-color:#bee1eb} 
	.el-button{padding: 2px!important;font-size: 13px!important}
	.el-table th{height: 0px!important}
	#bottomFrom{position: fixed;bottom: 30px}
	/* #jxs td{display:inline-block;min-width: 120px} */
	#titleTr td{background:#eef1f6}
	.el-table::after,.el-table::before{background-color: transparent!important}
	#addWorkInfos .el-form-item,#addUserInfos .el-form-item{margin-bottom: 22px} 
	#addWorkInfos .addWorkInfos{top:66%;left:11px } 
	#addWorkInfos button,#addUserInfos button{padding:8px }
	.inputInner .el-input__inner{margin-left: 0px!important}
	.tips{font-size: 12px;color: red}
</style>