<template>
	<section ref="abcd" style="overflow-y: auto;" id="cslists">
		<el-button type="primary"  @click='openDilog' style="margin-bottom:9px!important;padding:10px 15px!important">分单</el-button>
		<el-button type="primary"  @click='detain' style="margin-bottom:9px!important;padding:10px 15px!important">同步扣款情况</el-button>	
			<span class="T1">新增逾期案件:<b>{{total}}</b></span>
			<span class="T1">转队列案件:<b>{{totaltwo}}</b></span>
			<span class="T1">预审出队列案件:<b>{{totalthr}}</b></span>		
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="新增逾期案件" name="1">
				<!--列表-->
				<el-table :data="lists" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >									
					<el-table-column 
                        :prop="col.field" 
                        :label="col.title" 
                        v-for="(col, index) in cols" 
                        :key="index" 
                        align="center"
						sortable
                    >
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[100,200,500,1000,2000,5000]"   :total="total"   style="float:right;">
					</el-pagination>
				</el-col>
			</el-collapse-item>
			 <el-collapse-item title="转队列案件" name="2">
				<el-table :data="liststwo" border highlight-current-row v-loading="listLoadingtwo" style="width: 100%;" stripe >									
					<el-table-column 
                        :prop="col.field" 
                        :label="col.title" 
                        v-for="(col, index) in colstwo" 
                        :key="index" 
                        align="center" sortable
                    >
					</el-table-column>
				</el-table>
				<el-col :span="24" class="toolbar">					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangetwo" @size-change="handleSizeChangetwo" :page-size="pagesizetwo" :page-sizes="[100,200,500,1000,2000,5000]"   :total="totaltwo"   style="float:right;">
					</el-pagination>
				</el-col>

			</el-collapse-item>
			 <el-collapse-item title="预审出队列案件" name="3">
				<el-table :data="liststhr" border highlight-current-row v-loading="listLoadingthr" style="width: 100%;" stripe >									
					<el-table-column 
                        :prop=" col.field" 
                        :label=" col.title" 
                        v-for="(col, index) in colsthr" 
                        :key="index" 
                        align="center" sortable
                    >
					</el-table-column>
				</el-table>
				<el-col :span="24" class="toolbar">
					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangethr" @size-change="handleSizeChangethr" :page-size="pagesizethr" :page-sizes="[100,200,500,1000,2000,5000]"   :total="totalthr"   style="float:right;">
					</el-pagination>
				</el-col>

			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>

import {listOut,listInput,listUpdate,listSend ,updateOverdue} from "@/api/sendList";

export default {
		data() {
			return {
				activeNames: ['1','2','3','4'],
				lists: [],
				cols: [
                    {title:'主借人',field:'borrower'},
                    {title:'合同号',field:'applicationNumber'},                  
                    {title:'逾期天数',field:'overdueDays'},
                    {title:'还款日',field:'datePayment'},
                
                ],
				total: 0,
				pagesize:2000,
				page: 1,
				id:this.$route.params.id,
				listLoading:false,
				liststwo: [],
				colstwo: [
                     {title:'主借人',field:'borrower'},
					 {title:'处理人',field:'username'},
                    {title:'合同号',field:'applicationNumber'},                  
                    {title:'逾期天数',field:'overdueDays'},
                    {title:'还款日',field:'datePayment'},
                ],
				totaltwo: 0,
				pagetwo:1,
				pagesizetwo:1000,
				listLoadingtwo: false,
				liststhr: [],
				colsthr:[
					{title:'主借人',field:'borrower'},
                    {title:'合同号',field:'applicationNumber'},                  
                    {title:'完成人',field:'completeUser'},
                    {title:'队列名称',field:'queueName'},
				],
				totalthr: 0,
				pagethr:1,
				pagesizethr:2000,
				listLoadingthr: false,
				// spMarks:'',
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pagesize = val;
				this.getlists();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlists();
			},

			handleSizeChangetwo(val) {
				this.pagesizetwo = val;
				this.getliststwo();
			},
			handleCurrentChangetwo(val) {
				this.pagetwo = val;
				this.getliststwo();
			},
			
			handleSizeChangethr(val) {
				this.pagesizethr = val;
				this.getliststhr();
			},
			handleCurrentChangethr(val) {
				this.pagethr = val;
				this.getliststhr();
			},
			getlists() {
                
				let para = {
					// missionId: this.$route.params.id,
					page: this.page,
					pageSize: this.pagesize,
				
				};
				this.listLoading = true;				
				//NProgress.start();
				listInput(para).then((res) => {
					let data=res.data.result
					this.total=data.recordsTotal;
					this.lists= data.data;
					// this.spMarks=this.lists[0].spRecord;
					// this.lists.forEach(element => {
					// 	console.log(element[0])
					// });
					
					//NProgress.done();
                });
                 this.listLoading = false;
			},

			getliststwo() {
				let para = {
					missionId: this.$route.params.id,
					page: this.pagetwo,
					pageSize: this.pagesizetwo,					
				};
				this.listLoadingtwo = true;
				//NProgress.start();
				listUpdate(para).then((res) => {
					let data=res.data.result;
					this.totaltwo = data.recordsTotal;
					this.liststwo = data.data;
					this.listLoadingtwo = false;
					//NProgress.done();
				});
			},
			getliststhr() {
				let para = {
					missionId: this.$route.params.id,
					page: this.pagethr,
					pageSize: this.pagesizethr,					
				};
				this.listLoadingthr = true;
				//NProgress.start();
				listOut(para).then((res) => {
					 let data=res.data.result;
					 this.totalthr = data.recordsTotal;
					 this.liststhr = data.data;
					 this.listLoadingthr = false;
					//NProgress.done();
				});
			},
			openDilog(){				
					this.$confirm('此操作将执行分单任务，是否继续？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let params={
							userid:localStorage.getItem("UserId")
						}
						listSend(params).then(()=>{
							this.getlists();
							this.getliststwo();
							this.getliststhr();
							this.$message({
							type:'success',
							message:'分单成功！'
						})
						})
						
					}).catch(() => {
						this.$message({
							type:'info',
							message:'已取消分单'
						})
					});
			},
			detain(){
				updateOverdue().then(res =>{
					if(res.data.success){
						this.$message({
							type: 'success',
							message: res.data.message
              		})
					}else{
						this.$message.error(res.data.message)
					}
				})
			}

		},
		mounted() {
			this.getlists();
			this.getliststwo();
			this.getliststhr();
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-90;
   			this.$refs.abcd.style.height= h+"px"
		}


}
</script>

<style>
.T1{margin-left: 20px;font-size: 14px;}
#cslists .el-table__expanded-cell{padding: 0;}
#cslists .el-form-item__content{line-height: 20px;margin-left: 10px}
#cslists .el-form-item__label{padding: 0;}
.el-table__expand-icon{height:24px!important}
.el-collapse-item__header {font-size: 13px!important;font-weight: bold!important;background: #dfe6ec!important;border: 1px solid #f0f0f0;}
</style>