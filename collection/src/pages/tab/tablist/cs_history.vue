<template>
	<section>
	<div>
		<h4>催收信息</h4>
		<el-table :data="items" border>
			<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
			</el-table-column>			
		</el-table>
		<p class="p_marks"><span>备注:</span><span class="marks">{{marks}}</span></p>
	</div>
	<div>
		<h4>案件备注</h4>
		<el-table :data="item" border>
			<el-table-column :prop="title.field" :label="title.title" :width="title.width" v-for="(title, index) in title" :key="index" align="center">
		</el-table-column>			
		</el-table>
		
		
	</div>	
	
	
	
	</section>
</template>

<script>
	import { tab_message } from "@/api/api";
	export default{
		data(){
			return{
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