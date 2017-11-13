<template>
<el-collapse v-model="activeNames">
  <el-collapse-item name="1" title="车辆信息">
	  <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in carInfo" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:400px;display:inline-block;"><span class="title">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			
  </el-collapse-item>	
  <el-collapse-item name="2" title="客户信息">
	  <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in userInfo" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:400px;display:inline-block"><span class="title">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			
  </el-collapse-item>
  <el-collapse-item name="3" title="送修人信息">
	  <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in repairPerson" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:400px;display:inline-block"><span class="title">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			
  </el-collapse-item>
  <el-collapse-item name="4" title="维保记录">
	  <el-form  inline class="expand">
		  	<el-form-item  v-for=" a in repairInfo" :key="a.title" :lable="a.title" style="margin:0">
				<label style="min-width:400px;display:inline-block"><span class="title">{{a.title}}:</span><span class="lable">{{a.field}}</span></label>	
			</el-form-item>
	  </el-form>			
  </el-collapse-item>
</el-collapse>		
</template>
<script> 
 import { repair } from "@/api/api";
export default {
  data(){
      return{
        activeNames:["1","2","3","4","5"], 
		items: [],
		carInfo:[],
		repairPerson:[],
		repairInfo:[],
		userInfo:[]
      }
  },
  methods:{
      	getlist() {                
			let para = {
				id: this.id
			};
			repair(para).then(res => {
                let data = res.data.data[0]
				 this.items=data;
				 this.carInfo=data.carInfo;
				 this.repairPerson=data.repairPerson;
				 this.repairInfo=data.repairInfo;
				 this.userInfo=data.userInfo;			     
			});
   },
  },
  mounted(){
      this.getlist();
  }
}
</script>

<style>
	.lable{color: #99a9bf;margin:0 10px;}
	.title{display:inline-block;width:90px;text-align:right}
		
</style>
