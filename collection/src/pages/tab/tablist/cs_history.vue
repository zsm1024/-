<template>
	<section class="cslist" ref="abc" style="overflow-y: auto;">
		<el-collapse v-model="activeNames">
			<el-collapse-item name="1">
				<template slot="title" ><span class="titles">催收信息</span></template>					
				<el-table :data="items" border :default-expand-all="true">
					<el-table-column type="expand">
						<template slot-scope="items">
							<el-form  inline class="demo-table-expand BZ">
         						<el-form-item label="备注：">
           							 {{ items.row.content_msg }}
          						</el-form-item>							
							</el-form>
						</template>
					</el-table-column>
					<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
					</el-table-column>									
				</el-table>
								
			</el-collapse-item>	
			<el-collapse-item name="2">
				<template slot="title" ><span class="titles">案件备注</span></template>	
				<el-table :data="item" border >
					<el-table-column :prop="title.field" :label="title.title" :width="title.width" v-for="(title, index) in title" :key="index" align="center">
					</el-table-column>			
				</el-table>				
			</el-collapse-item>
			<el-collapse-item name="3">
				<template slot="title" ><span class="titles">催收轨迹</span></template>	
				<el-table :data="pathMsg" border >
					<el-table-column :prop="path.field" :label="path.title" :width="path.width" v-for="(path, index) in path" :key="index" align="center">
					</el-table-column>			
				</el-table>				
			</el-collapse-item>
			<el-collapse-item name="4">
				<template slot="title" ><span class="titles">行动代码</span></template>	
				<el-table :data="activeMsg" border >
					<el-table-column :prop="actives.field" :label="actives.title" :width="actives.width" v-for="(actives, index) in actives" :key="index" align="center">
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
			activeNames:["1","2","3","4"],
			 items:[],
			 cols:[],
			 title:[],
			 item:[],
			 path:[],
			 pathMsg:[],
			 actives:[],
			 activeMsg:[],
			 marks:"",
			 id:this.$store.state.navTabs.tabId
			}
		},
		methods:{
			getmessage() {
				let para = {
					id: this.id
				};
     		 	tab_message(para).then(res => {
        		let data = res.data.msg[0] 
        		this.marks=res.data.msg[0].content_msg; 
      			this.items = data.data;
				this.cols=data.cols;
				this.title=data.marks[0].title;
				this.item=data.marks[0].msg;
				this.path=data.path[0].title;
				this.pathMsg=data.path[0].msgs;
				this.actives=data.activeCode[0].title;
				this.activeMsg=data.activeCode[0].data;
				
      			});
   			 }		
		},
		mounted() {
   			this.getmessage();
   			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   this.$refs.abc.style.height= h+"px"
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
	.cslist .el-table__expanded-cell{
		padding: 0;
	}
	.BZ{min-height: 30px;}
	.cslist .el-form-item{width: 100%;text-align: left;margin: 0;}
	.cslist .el-form-item label{margin-left: 10px;}
	.cslist .el-form--inline .el-form-item__content{vertical-align: baseline;}
</style>