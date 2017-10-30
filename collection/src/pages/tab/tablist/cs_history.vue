<template>
	<section>
		<el-collapse v-model="activeNames">
			<el-collapse-item name="1">
				<template slot="title" ><span class="titles">催收信息</span></template>					
				<el-table :data="items" border >
					<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
					</el-table-column>			
				</el-table>
				<p class="p_marks"><span>备注:</span><span class="marks">{{marks}}</span></p>					
			</el-collapse-item>	
			<el-collapse-item name="2">
				<template slot="title" ><span class="titles">案件备注</span></template>	
				<el-table :data="item" border >
					<el-table-column :prop="title.field" :label="title.title" :width="title.width" v-for="(title, index) in title" :key="index" align="center">
					</el-table-column>			
				</el-table>				
			</el-collapse-item>
		</el-collapse >
	</section>
</template>

<script>
	import { tab_message } from "@/api/api";
	export default{
		data(){
			return{
			activeNames:["1","2"],
			 items:[],
			 cols:[],
			 title:[],
			 item:[],
			 marks:""
			}
		},
		methods:{
			getmessage() {
     		 	tab_message().then(res => {
        		let data = res.data.msg[0] 
        		this.marks=res.data.msg[0].content_msg; 
      			this.items = data.data;
				this.cols=data.cols;
				this.title=data.marks[0].title;
				this.item=data.marks[0].msg;
      			});
   			 }		
		},
		mounted() {
   			this.getmessage()
  		}
	}
</script>

<style>
	table{
		width:100%!important;
	}
	.p_marks{min-height: 20px;}
	.p_marks .marks{
		margin-left: 10px;
	}
</style>