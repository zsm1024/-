<template>
<el-collapse v-model="activeNames" v-loading="listLoading">
  <el-collapse-item name="1" title="车辆信息">
	  <table class="ht_table">
		  <tbody>
			  <tr>
				<td class="tds">车牌号</td><td>{{carInfo.licensePlate}}</td>
				<td class="tds">厂牌</td><td>{{carInfo.labelInfo}}</td>
				<td class="tds">底盘号</td><td>{{carInfo.chassisNumber}}</td>
					<td class="tds">发动机号</td><td>{{carInfo.engineNumber}}</td>			
			  </tr>
			  <tr>
				<td class="tds">车系</td><td>{{carInfo.car}}</td>				
				<td class="tds">车辆颜色</td><td>{{carInfo.vehicleColor}}</td>
				<td class="tds">购车日期</td><td>{{carInfo.dateCarPurchase}}</td>
				<td class="tds" >领证日期</td><td>{{carInfo.dateCertification}}</td>
				
			  </tr>
			  <tr>
				
				<td class="tds">首次来厂日期</td><td>{{carInfo.firstArrivalDate}}</td>
				<td class="tds">首次到店</td><td>{{carInfo.firstShop}}</td>
				<td class="tds">最近到店</td><td>{{carInfo.latestShop}}</td>
				<td class="tds">最近修理日期</td><td>{{carInfo.latestRepairDate}}</td>
			  </tr>
			  <tr>
				
			  </tr>
			  <tr>
				<td class="tds">首次接待</td><td>{{carInfo.firstReception}}</td>
				<td class="tds">家装说明</td><td colspan="5">{{carInfo.installationExplanation}}</td>	
			  </tr>
			  <tr>
					<td class="tds">下次保养日期</td><td colspan="3">{{carInfo.nextMaintenanceDate}}</td>
					<td class="tds">下次保养里程</td><td colspan="3">{{carInfo.nextMaintenanceMileage}}</td>	
				  
			  </tr>									
		  </tbody>
	  </table>	 
  </el-collapse-item>	
   <el-collapse-item name="2" title="客户信息">
	    <table class="ht_table">
		  <tbody>
			  <tr>
				<td class="tds">客户姓名</td><td>{{customerBasic.name}}</td>
				<td class="tds">车辆数</td><td>{{customerBasic.labelInfo}}</td>
				<td class="tds">性别</td><td>{{customerBasic.sex}}</td>
				<td class="tds">民族</td><td>{{customerBasic.nation}}</td>				
			  </tr>
			  <tr>
							
				<td class="tds">所在省份</td><td>{{customerBasic.province}}</td>
				<td class="tds">所在城市</td><td>{{customerBasic.city}}</td>	
				<td class="tds">所在区县</td><td>{{customerBasic.counties}}</td>
				<td class="tds">购车目的</td><td>{{customerBasic.objective}}</td>
			  </tr>
			  <tr>
				<td class="tds">所在行业</td><td>{{customerBasic.industry}}</td>
				<td class="tds">证件类型</td><td>{{customerBasic.documentType}}</td>
				<td class="tds">证件号码</td><td>{{customerBasic.documentNum}}</td>
				<td class="tds">手机</td><td>{{customerBasic.latestRepairDate}}</td>							
			  </tr>
			  <tr>
				
			  </tr>
			  <tr>
				<td class="tds">家庭电话</td><td>{{customerBasic.homePhone}}</td>
				<td class="tds">办公电话</td><td>{{customerBasic.officePhone}}</td>
				<td class="tds">QQ号码</td><td>{{customerBasic.qq}}</td>
				<td class="tds">微信号码</td><td>{{customerBasic.wechat}}</td>			
			  </tr>
			  <tr>
				<td class="tds">地址</td><td colspan="2">{{customerBasic.installationExplanation}}</td>
				<td class="tds">隶属公司名称</td><td colspan="2">{{customerBasic.firstReception}}</td><td class="tds">学历</td><td>{{customerBasic.education}}</td>	  
			  </tr>	
			  <tr>			
				<td class="tds">电子邮箱</td><td>{{customerBasic.email}}</td>
				<td class="tds">客户爱好</td><td>{{customerBasic.hobby}}</td>
					<td class="tds">职位</td><td>{{customerBasic.position}}</td>
				<td class="tds">月收入</td><td>{{customerBasic.monthlyIncome}}</td>				
			  </tr>	
			  <tr>			
			
				<td class="tds">家庭结构</td><td>{{customerBasic.familyStructure}}</td
				><td class="tds">开户行</td><td>{{customerBasic.firstReception}}</td>
				<td class="tds">账号</td><td>{{customerBasic.nextMaintenanceDate}}</td>	
				<td class="tds">税号</td><td>{{customerBasic.nextMaintenanceMileage}}</td>
			  </tr>
			  <tr>
					
					<td class="tds">负责人</td><td>{{customerBasic.personCharge}}</td>	
					<td class="tds">负责人职位</td><td>{{customerBasic.personChargePosition}}</td>											
					<td class="tds">联系人</td><td>{{customerBasic.firstReception}}</td>
					<td class="tds">联系人电话</td><td>{{customerBasic.nextMaintenanceDate}}</td>
				
			
			  </tr>	
			  <tr>
					<td class="tds">负责人地址</td><td colspan="3">{{customerBasic.personChargeAddress}}</td>
				 <td class="tds">联系人地址</td><td colspan="3">{{customerBasic.address}}</td>
			  </tr>				  								
		  </tbody>
	  </table>
	  <!-- <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in userInfo" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:270px:270px;display:inline-block"><span class="titles">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			 -->
  </el-collapse-item>
  <el-collapse-item name="3" title="送修人信息">
	  <table class="ht_table">
		  <tbody>
			  <tr>
				  <td class="tds">送修人姓名</td><td>{{maintenanceRepairInfo.repairName}}</td>
				  <td class="tds">性别</td><td>{{maintenanceRepairInfo.sex}}</td>
					 <td class="tds">民族</td><td>{{maintenanceRepairInfo.nation}}</td>
				  <td class="tds">身份证号</td><td>{{maintenanceRepairInfo.idNumber}}</td>
			  </tr>
			  <tr>				 
				  <td class="tds">出生日期</td><td>{{maintenanceRepairInfo.birthDate}}</td>
				  <td class="tds">驾驶证号码</td><td>{{maintenanceRepairInfo.driverNum}}</td>
					<td class="tds">手机号码</td><td>{{maintenanceRepairInfo.phone}}</td>
				  <td class="tds">家庭电话</td><td>{{maintenanceRepairInfo.homePhone}}</td>
			  </tr>
			  <tr>				 
				  <td class="tds">办公电话</td><td>{{maintenanceRepairInfo.officePhone}}</td>
					<td class="tds">所在省份</td><td>{{maintenanceRepairInfo.province}}</td>
				  <td class="tds">所在城市</td><td>{{maintenanceRepairInfo.city}}</td>
				  <td class="tds">所在区县</td><td>{{maintenanceRepairInfo.counties}}</td>
			  </tr>
			  <tr>
				  <td class="tds">地址</td><td colspan="7">{{maintenanceRepairInfo.address}}</td>
			  </tr>			 
		  </tbody>
	  </table>
  </el-collapse-item>
  <el-collapse-item name="4" title="车辆信息">
	   <table class="ht_table">
		  <tbody>
			  <tr>
				  <td class="tds">服务站名称</td><td colspan="3">{{maintenanceRecord.serviceName}}</td>
					<td class="tds">服务站地址</td><td colspan="3">{{maintenanceRecord.serviceAddress}}</td>	
			  </tr>
			  <tr> 
					<td class="tds">服务站城市</td><td>{{maintenanceRecord.serviceCity}}</td>
				  <td class="tds">服务站电话</td><td>{{maintenanceRecord.servicePhone}}</td>
				  <td class="tds">进厂时间</td><td>{{maintenanceRecord.incomingTime}}</td>
				  <td class="tds">出厂时间</td><td>{{maintenanceRecord.factoryTime}}</td>
			  </tr>
			  <tr>
				  <td class="tds">累计里程</td><td>{{maintenanceRecord.cumulativeMileage}}</td>
				  <td class="tds">是否救援</td><td>{{maintenanceRecord.rescue}}</td>
				  <td class="tds">服务类型</td><td>{{maintenanceRecord.serviceType}}</td>
 					<td class="tds">上门服务日期</td><td>{{maintenanceRecord.homeServiceDate}}</td>
			  </tr>
			  <tr>
				 
				  <td class="tds">服务开始时间</td><td>{{maintenanceRecord.serviceStartTime}}</td>
				  <td class="tds">服务结束时间</td><td>{{maintenanceRecord.serviceEndTime}}</td> 
					<td class="tds">修理类别</td><td colspan="3">{{maintenanceRecord.repairCategory}}</td>
			  </tr>
			  <tr><td class="tds">故障描述</td><td colspan="7">{{maintenanceRecord.faultDescription}}</td></tr>
			  <tr><td class="tds">初步诊断</td><td colspan="7">{{maintenanceRecord.preliminaryDiagnosis}}</td></tr>
			
		  </tbody>
	  </table>
  </el-collapse-item> 
</el-collapse>		
</template>
<script> 
 import { repair } from "@/api/tablist";
export default {
  data(){
      return{
        activeNames:["1","2","3","4","5"], 
		items: [],
		carInfo:[],
		maintenanceRepairInfo:[],
		maintenanceRecord:[],
		customerBasic:[],
		listLoading: true,
      }
  },
  methods:{
      	getlist() {                
			let para = {
				maintenanceId:this.$route.params.id
			};
			
			repair(para).then(res => {
				let data =res.data.result;			
				this.items=data;
				this.carInfo=data.carInfo;
				this.customerBasic=data.customerBasic;
				this.maintenanceRepairInfo=data.maintenanceRepairInfo;
				this.maintenanceRecord=data.maintenanceRecord;	
				this.listLoading = false;			     
			});
   },
  },
  mounted(){
      this.getlist();
  }
}
</script>

<style>
	.lable{color: #99a9bf;margin:0 5px;min-width: 255px;display: inline-block;font-size: 13px}
	.titles{display:inline-block;width:90px;text-align:right;font-size:13px}
		
</style>
