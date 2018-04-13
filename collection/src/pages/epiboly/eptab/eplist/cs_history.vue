<template>
	<section class="cslist" ref="abc" style="overflow-y: auto;">
		<el-collapse v-model="activeNames" accordion>
			<el-collapse-item name="1">
				<template slot="title" ><span class="titles">催收信息</span></template>					
				<el-table :data="items" border :default-expand-all="true">					
					<el-table-column type="expand" >						
						<template slot-scope="props">
							<el-form  inline class="demo-table-expand">
         						<el-form-item label="备注：">
           							 {{ props.row.afpRecord }}
          						</el-form-item>							
							</el-form>
						</template>
					</el-table-column>
					<el-table-column align="center" type="index"  label="序号" width="40">
						</el-table-column>
					<el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" :key="index" align="center" >
					</el-table-column>									
				</el-table>
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[5,10, 20, 50, 100]"   :total="total"   style="float:right;">
					</el-pagination>
				</el-col>				
			</el-collapse-item>	
			 <el-collapse-item name="2">
				<template slot="title" ><span class="titles">案件备注</span></template>	
				<span style="margin-left:10px">{{marks}}</span>
				<!-- <el-table :data="item" border >
					<el-table-column :prop="title.field" :label="title.title"  v-for="(title, index) in titles" :key="index" align="center">
					</el-table-column>			
				</el-table>				  -->
			</el-collapse-item>
			<el-collapse-item name="3">
				<template slot="title"><span class="titles">催收轨迹</span></template>	
				<el-table :data="pathMsg" border>
					<el-table-column :prop="path.field" :label="path.title"  v-for="(path, index) in path" min-width="60" :key="index" align="center">
					</el-table-column>			
				</el-table>	
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangeTrail" @size-change="handleSizeChangeTrail" :page-size="pagesizeTrail" :page-sizes="[5,10, 20, 50, 100]"   :total="totalTrail"   style="float:right;">
					</el-pagination>
				</el-col>			
			</el-collapse-item>
			<el-collapse-item name="4">
				<template slot="title" ><span class="titles">行动代码</span></template>	
				<el-table :data="activeMsg" border>
					<el-table-column aline="center" type="index" width="30" label="序号">
						</el-table-column>
					<el-table-column :prop="actives.field" :label="actives.title"  v-for="(actives, index) in actives" :key="index" align="center">
					</el-table-column>			
				</el-table>	
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangeCode" @size-change="handleSizeChangeCode" :page-size="pagesizeCode" :page-sizes="[5,10, 20, 50, 100]"   :total="totalCode"   style="float:right;">
					</el-pagination>
				</el-col>			
			</el-collapse-item> 
		</el-collapse >
	</section>
</template>

<script>
	import { colHistory_msg,colHistory_note,colHistory_trail,colHistory_code } from "@/api/tablist";
	export default{
		data(){
			return{
			activeNames:["1"],
			 items:[],
			 cols:[
              	{title:'催收日期',field:'afpDate',width:"190"},
              	{title:'联系方式',field:'linkInfomation',width:"60"},
              	{title:'联系人',field:'linkman',width:"60"},
              	{title:'催收代码',field:'actSign',width:"60"},
             	{title:'代码名称',field:'actNotes',width:"130"},
              	{title:'约会日期',field:'appointmentTime',width:"190"},
              	{title:'承诺金额',field:'allowance',width:"60"},
              	{title:'承诺日期',field:'allDate',width:"190"},
				{title:'用户ID',field:'username',width:"60"},	
				{title:'录入人',field:'realUser',width:"60"},				
				],
			 titles:[
					],
			//  item:[],
			 path:[
                  {"title":'用户ID',field:'username',width:"70"},
                  {"title":'实际处理人',field:'realUser',width:"80"},
                  {"title":'代管人',field:'escrowUser',width:"90"},
                  {"title":'任务队列',field:'missionType',width:"100"},
                  {"title":'队列名称',field:'missionName',width:"170"},
                  {"title":'岗位',field:'position',width:"130"},
                  {"title":'创建时间',field:'createTime',width:"190"},
                  {"title":'关闭时间',field:'closeTime',width:"190"},],
			 pathMsg:[],
			 totalTrail:0,
			 pagesizeTrail:5,
			 pageTrail:1,
			 actives:[
                  {"title":'用户ID',field:'username',width:"70"},
                  {"title":'行动代码',field:'actSign',width:"80"},
                  {"title":'行动代码注释',field:'actNotes',width:"120"},
				  {"title":'录入时间',field:'inputTime',width:"120"},
				  {"title":'录入人',field:'realUser',width:"120"},
				],
			 activeMsg:[],
			 totalCode:0,
			 pagesizeCode:5,
			 pageCode:1,
			 marks:"",
			 id:this.$store.state.navTabs.tabId,
			 total: 0,
			 pagesize:10,
			 page: 1,
			}
		},
		methods:{
			// asd(){
			// 	// this.getmessage()
			// },
			handleSizeChange(val) {
				this.pagesize = val;
				this.getmessage();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getmessage();
			},
			getmessage() {
				let para = {
					missionId: this.$route.params.id,
					page:this.page,
					pageSize:this.pagesize
				};
     		 	colHistory_msg(para).then(res => {				 
					let data = res.data.result;
					this.total=data.recordsTotal
					this.items=data.data;					
      			});
				},
				getmessage_note() {
				let para = {
					missionId:this.$route.params.id,					
				};

     		 	colHistory_note(para).then(res => {				 
					let data = res.data.result;
					if(data==null){
						return false;
					}else{
						this.marks=data.remarks;	
					}					
					// this.item.push(data);			
      			});
				},
				handleSizeChangeTrail(val) {
				this.pagesize = val;
				this.getmessage_trail();
			},
			handleCurrentChangeTrail(val) {
				this.page = val;
				this.getmessage_trail();
			},
				getmessage_trail() {
				let para = {
					missionId: this.$route.params.id,
					page:this.pageTrail,
					pageSize:this.pagesizeTrail
				};
     		 	colHistory_trail(para).then(res => {				 
					 let data = res.data.result;0
					this.totalTrail=data.recordsTotal
					this. pathMsg=data.data;
								
      			});
				},
			handleSizeChangeCode(val) {
				this.pagesize = val;
				this.getmessage_code();
			},
			handleCurrentChangeCode(val) {
				this.page = val;
				this.getmessage_code();
			},
				getmessage_code() {
				let para = {
					missionId: this.$route.params.id,
					page:this.pageCode,
					pageSize:this.pagesizeCode
				};
     		 	colHistory_code(para).then(res => {				 
					let data = res.data.result;
					this.totalCode=data.recordsTotal
					this.activeMsg=data.data;			
      			});
				},		
		},
		mounted() {
			this.getmessage();
			this.getmessage_note();
			this.getmessage_trail();
			this.getmessage_code();
   			let h = (window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight)-155;
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
	.el-table__expand-icon{height:24px!important}
	/* .BZ{min-height: 30px;} */
	.cslist .el-form-item{width: 100%;text-align: left;margin: 0;}
	.cslist .el-form-item label{margin-left: 10px;}
	.cslist .el-form--inline .el-form-item__content{vertical-align: baseline;}
</style>