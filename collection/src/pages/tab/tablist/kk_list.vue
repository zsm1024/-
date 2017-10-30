<template>
	<section>
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
							<el-button type="primary" v-on:click="getlists" >查询</el-button>
						</el-form-item>				
					</el-form>  
				</el-col>  
				<!--列表-->
				<el-table :data="lists" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe>
					
					
					<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" >
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
import { getliushui } from "@/api/api";
export default {
		data() {
			return {
				activeNames: ['1'],
				filters: {
					region:"",
				},
				lists: [],
				cols: [],
				total: 0,
				pagesize: 20,
				page: 1,
				id:this.$store.state.navTabs.tabId,
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
				let para = {
					id: this.id,
					page: this.page,
					pagesize: this.pagesize,
					filters:this.filters
				};
				this.listLoading = true;
				//NProgress.start();
				getliushui(para).then((res) => {
					this.total = res.data.total;
					this.lists = res.data.data;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
		},
		mounted() {
			this.getlists();
		}
}
</script>

<style>
</style>