<template>
	<section>
		<el-collapse v-model="activeNames">
			<el-collapse-item name="1">
				<template slot="title" ><span class="titles">当事人基本信息</span></template>
				<div>
					<el-table :data="baseData" border stripe>
						<el-table-column :prop="baseTitle.field" :label="baseTitle.title" :width="baseTitle.width" v-for="(baseTitle, index) in baseTitle" :key="index" align="center">
						</el-table-column>			
					</el-table>
				</div>
				
			</el-collapse-item>
			<el-collapse-item name="2">
				<template slot="title" ><span class="titles">联系电话信息</span></template>
				<div>					
					<el-table :data="phonedata" border stripe>
						<el-table-column :prop="phoneinfo.field" :label="phoneinfo.title" :width="phoneinfo.width" v-for="(phoneinfo, index) in phoneinfo" :key="index" align="center">
						</el-table-column>			
					</el-table>

	
				</div>
				
			</el-collapse-item>
			<el-collapse-item name="3">
				<template slot="title" ><span class="titles">联系地址信息</span></template>
				<div>
					<el-table :data="addressdata" border stripe>
						<el-table-column :prop="addressinfo.field" :label="addressinfo.title" :width="addressinfo.width" v-for="(addressinfo, index) in addressinfo" :key="index" align="center">
						</el-table-column>			
					</el-table>
					
					
				</div>
				
			</el-collapse-item>
		</el-collapse>	
	</section>
</template>

<script>
	import { userInfo } from "@/api/api";
	export default{
		data() {
	      return {
	        activeNames: ['1','2','3'],
	        baseTitle:[],
	        baseData:[],
	        phoneinfo:[],
	        phonedata:[],
	        addressdata:[],
	        addressinfo:[],
	        id:this.$store.state.navTabs.tabId
	      };
   	 	},
   	 	methods:{
   	 		getinfo(){
   	 			let para = {
					id: this.id
				};
   	 			userInfo(para).then(res =>{
   	 			 	let data = res.data.msg[0];
   	 			 	this.baseTitle=res.data.msg[0].baseinfo;
   	 			 	this.baseData=res.data.msg[0].basedata;
   	 			 	this.phoneinfo=res.data.msg[0].phoneinfo;
   	 			 	this.phonedata=res.data.msg[0].phonedata;
   	 			 	this.addressdata=res.data.msg[0].addressdata;
   	 			 	this.addressinfo=res.data.msg[0].addressinfo;
	
   	 			 })
   	 		}
   	 	},
   	 	mounted(){
   	 		this.getinfo();
   	 	}
	}
	 
	
</script>

<style>	
</style>