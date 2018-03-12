<template>
<el-collapse v-model="activeNames" v-loading="listLoading">
  <el-collapse-item name="1" title="车辆信息">
	  <table class="ht_table">
		  <tbody>
			  <tr>
				<td class="tds">车牌号</td><td>{{carInfo.cph}}</td>
				<td class="tds">厂牌</td><td>{{carInfo.labelInfo}}</td>
				<td class="tds">底盘号</td><td>{{carInfo.dph}}</td>
					<td class="tds">发动机号</td><td>{{carInfo.fdjh}}</td>			
			  </tr>
			  <tr>
				<td class="tds">车系</td><td>{{carInfo.car}}</td>				
				<td class="tds">车辆颜色</td><td>{{carInfo.clys}}</td>
				<td class="tds">购车日期</td><td>{{carInfo.dateCarPurchase}}</td>
				<td class="tds" >领证日期</td><td>{{carInfo.dateCertification}}</td>
				
			  </tr>
			  <tr>
				
				<td class="tds">首次来厂日期</td><td>{{carInfo.sclcrq}}</td>
				<td class="tds">首次到店</td><td>{{carInfo.fwzh_scdd}}</td>
				<td class="tds">最近到店</td><td>{{carInfo.fwzh_scdd}}</td>
				<td class="tds">最近修理日期</td><td>{{carInfo.zjxlrq}}</td>
			  </tr>
			  <tr>
				
			  </tr>
			  <tr>
				<td class="tds">首次接待</td><td>{{carInfo.firstReception}}</td>
				<td class="tds">家装说明</td><td colspan="5">{{carInfo.jzsm}}</td>	
			  </tr>
			  <tr>
					<td class="tds">下次保养日期</td><td colspan="3">{{carInfo.xcbyrq}}</td>
					<td class="tds">下次保养里程</td><td colspan="3">{{carInfo.xcbylc}}</td>	
				  
			  </tr>									
		  </tbody>
	  </table>	 
  </el-collapse-item>	
   <el-collapse-item name="2" title="客户信息">
	    <table class="ht_table">
		  <tbody>
			  <tr>
				<td class="tds">客户姓名</td><td>{{customerBasic.cz}}</td>
				<td class="tds">车辆数</td><td>{{customerBasic.cs}}</td>
				<td class="tds">性别</td><td>{{customerBasic.sex}}</td>
				<td class="tds">民族</td><td>{{customerBasic.nation}}</td>				
			  </tr>
			  <tr>
							
				<td class="tds">所在省份</td><td>{{customerBasic.szs}}</td>
				<td class="tds">所在城市</td><td>{{customerBasic.szdq}}</td>	
				<td class="tds">所在区县</td><td>{{customerBasic.szxq}}</td>
				<td class="tds">购车目的</td><td>{{customerBasic.gcmd}}</td>
			  </tr>
			  <tr>
				<td class="tds">所在行业</td><td>{{customerBasic.szhy}}</td>
				<td class="tds">证件类型</td><td>{{customerBasic.zjlx}}</td>
				<td class="tds">证件号码</td><td>{{customerBasic.khsbh}}</td>
				<td class="tds">手机</td><td>{{customerBasic.sj}}</td>							
			  </tr>
			  <tr>
				
			  </tr>
			  <tr>
				<td class="tds">家庭电话</td><td>{{customerBasic.jtdh}}</td>
				<td class="tds">办公电话</td><td>{{customerBasic.bgdh}}</td>
				<td class="tds">QQ号码</td><td>{{customerBasic.qq}}</td>
				<td class="tds">微信号码</td><td>{{customerBasic.wxhm}}</td>			
			  </tr>
			  <tr>
				<td class="tds">地址</td><td colspan="2">{{customerBasic.dz}}</td>
				<td class="tds">隶属公司名称</td><td colspan="2">{{customerBasic.dygsmc}}</td><td class="tds">学历</td><td>{{customerBasic.education}}</td>	  
			  </tr>	
			  <tr>			
				<td class="tds">电子邮箱</td><td>{{customerBasic.email}}</td>
				<td class="tds">客户爱好</td><td>{{customerBasic.khah}}</td>
					<td class="tds">职位</td><td>{{customerBasic.s_profession}}</td>
				<td class="tds">月收入</td><td>{{customerBasic.ysr}}</td>				
			  </tr>	
			  <tr>			
			
				<td class="tds">家庭结构</td><td>{{customerBasic.s_family}}</td
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
				  <td class="tds">送修人姓名</td><td>{{maintenanceRepairInfo.sxr}}</td>
				  <td class="tds">性别</td><td>{{maintenanceRepairInfo.sex}}</td>
					 <td class="tds">民族</td><td>{{maintenanceRepairInfo.nation}}</td>
				  <td class="tds">身份证号</td><td>{{maintenanceRepairInfo.zjhm}}</td>
			  </tr>
			  <tr>				 
				  <td class="tds">出生日期</td><td>{{maintenanceRepairInfo.birthDate}}</td>
				  <td class="tds">驾驶证号码</td><td>{{maintenanceRepairInfo.driverNum}}</td>
					<td class="tds">手机号码</td><td>{{maintenanceRepairInfo.sxr_sjh}}</td>
				  <td class="tds">家庭电话</td><td>{{maintenanceRepairInfo.sxr_jydh}}</td>
			  </tr>
			  <tr>				 
				  <td class="tds">办公电话</td><td>{{maintenanceRepairInfo.sxr_dwdh}}</td>
					<td class="tds">所在省份</td><td>{{maintenanceRepairInfo.province}}</td>
				  <td class="tds">所在城市</td><td>{{maintenanceRepairInfo.city}}</td>
				  <td class="tds">所在区县</td><td>{{maintenanceRepairInfo.counties}}</td>
			  </tr>
			  <tr>
				  <td class="tds">地址</td><td colspan="7">{{maintenanceRepairInfo.sxr_dz}}</td>
			  </tr>			 
		  </tbody>
	  </table>
  </el-collapse-item>
  <el-collapse-item name="4" title="维保记录">
	   <table class="ht_table">
		  <tbody>
			  <tr>
				  <td class="tds">服务站名称</td><td colspan="3">{{maintenanceRecord.fwz_mc}}</td>
					<td class="tds">服务站地址</td><td colspan="3">{{maintenanceRecord.dz}}</td>	
			  </tr>
			  <tr> 
					<td class="tds">服务站城市</td><td>{{maintenanceRecord.szdz}}</td>
				  <td class="tds">服务站电话</td><td>{{maintenanceRecord.ywdh}}</td>
				  <td class="tds">进厂时间</td><td>{{maintenanceRecord.jzrq}}</td>
				  <td class="tds">出厂时间</td><td>{{maintenanceRecord.jcrq}}</td>
			  </tr>
			  <tr>
				  <td class="tds">累计里程</td><td>{{maintenanceRecord.xslc}}</td>
				  <td class="tds">是否救援</td><td>{{maintenanceRecord.rescue}}</td>
				  <td class="tds">服务类型</td><td>{{maintenanceRecord.serviceType}}</td>
 					<td class="tds">上门服务日期</td><td>{{maintenanceRecord.homeServiceDate}}</td>
			  </tr>
			  <tr>
				 
				  <td class="tds">服务开始时间</td><td>{{maintenanceRecord.serviceStartTime}}</td>
				  <td class="tds">服务结束时间</td><td>{{maintenanceRecord.serviceEndTime}}</td> 
					<td class="tds">修理类别</td><td colspan="3">{{maintenanceRecord.xllb}}</td>
			  </tr>
			  <tr><td class="tds">故障描述</td><td colspan="7">{{maintenanceRecord.gzms}}</td></tr>
			  <tr><td class="tds">初步诊断</td><td colspan="7">{{maintenanceRecord.cbzd}}</td></tr>

		  </tbody>
	  </table>
	  <!-- <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in repairInfo" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:270px;display:inline-block"><span class="titles">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			 -->
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
		// carInfoTitle:[
		// 		{ title: '车牌号', field: '鲁BU5E62' },
        //         { title: '厂牌', field: '长城' },
        //         { title: '底盘号', field: 'LGWEF3A53CF119444' },
        //         { title: '车系', field: 'H6' },
        //         { title: '发动机号', field: 'SLX1513' },
        //         { title: '车辆颜色', field: '雅致银' },
        //         { title: '购车日期', field: '2017-02-14' },
        //         { title: '领证日期', field: '2012-02-14' },
        //         { title: '首保日期', field: '2015-03-14' }, 
        //         { title: '首次接待', field: '孙艳' },
        //         { title: '下次保养日期', field: '2017-03-27' },
        //         { title: '下次保养里程', field: '41000' },
        //         { title: '首次来厂日期', field: '2017-06-15' }, 
        //         { title: '最近修理日期', field: '2017-07-15' }, 
        //         { title: '首次到店', field: '2017-06-15' },
        //         { title: '最近到店', field: '2017-06-15' },
        //         { title: '加装说明', field: '奥术大师多请问我小窗口从上课文在笑口常开阿伟去玩了看情况外科' },
		// ],
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
				console.log(res)
				let data =res.data.result;			
				this.items=data;
				console.log(data)
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
