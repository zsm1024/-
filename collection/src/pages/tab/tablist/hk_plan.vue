<template>
	<section>
	<el-collapse v-model="activeNames" >
		<el-collapse-item title="还款计划" name="1">
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
import { getplan } from "@/api/api";
export default {
		data() {
			return {
				activeNames: ['1'],
				lists: [],
				cols: [],
				total: 0,
				pagesize: 20,
				page: 1,
				id:this.$store.state.navTabs.tabId,
				listLoading: false,
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
					pagesize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				getplan(para).then((res) => {
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