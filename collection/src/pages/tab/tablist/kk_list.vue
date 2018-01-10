<template>
	<section ref="abc" style="overflow-y: auto;">
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="扣款流水" name="1">
				<el-col  :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						
						<el-form-item>
							<el-select v-model="filters.region" placeholder="请选择扣款结果" >
							<el-option label="成功" value="成功"></el-option>
							<el-option label="失败" value="失败"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="mini" v-on:click="getlists" >查询</el-button>
						</el-form-item>				
					</el-form>  
				</el-col>  
				<!--列表-->
				<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe>
					
					
					<el-table-column 
                        :prop="col.field" 
                        :label="col.title" 
                        v-for="(col, index) in cols" 
                        :key="index" 
                        align="center"
						:width="col.width"
                    >
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">
					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
					</el-pagination>
				</el-col>
			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>
import { getliushui } from "@/api/tablist";
export default {
		data() {
			return {
				heights:0,
				activeNames: ['1'],
				filters: {
					region:"",
				},
				lists: [],
				cols: [
                    {title:'扣款日期',field:'chargebackDate',width:"80"},
                    {title:'扣款金额',field:'amount',width:"50"},
                    {title:'还款人',field:'repayments',width:"40"},
                    {title:'银行编号',field:'bankNumber',width:"80"},
                    {title:'银行账号',field:'bankAccount',width:"120"},
                    {title:'扣款结果',field:'debitResults',width:"50"},
                    {title:'银行备注',field:'bankNotes',width:"80"},
                    {title:'银行摘要',field:'bankAbstracts',width:"80"},
                ],
				total: 0,
				pagesize: 20,
				page: 1,
				id:this.$route.params.id,
				listLoading: false,
				seloption:"",
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
			
			//获取列表
			getlists() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-260;
        		this.heights=h;
				let para = {
					missionId: this.id,
					page: this.page,
					pageSize: this.pagesize,
					// filters:this.filters
				};
				this.listLoading = true;
				//NProgress.start();
				getliushui(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					console.log(this.lists)
					this.cols = this.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
		},
		mounted() {
			this.getlists();
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   this.$refs.abc.style.height= h+"px"
		}
}
</script>

<style>
</style>