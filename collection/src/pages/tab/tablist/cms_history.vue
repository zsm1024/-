<template>
	<section ref="abc" style="overflow-y: auto;">
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="催收历史明细表" name="1">
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
			<el-collapse-item title="罚息减免明细表" name="2">
				<!--列表-->
				<el-table :data="liststwo" border highlight-current-row v-loading="listLoadingtwo" style="width: 100%;" stripe>									
					<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in colstwo" :key="index" >
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">
					
					<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangetwo" @size-change="handleSizeChangetwo" :page-size="pagesizetwo" :page-sizes="[10, 20, 50, 100]"   :total="totaltwo"   style="float:right;">
					</el-pagination>
				</el-col>

			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>

import { getcmsdetails,getcmshistory } from "@/api/api";

export default {
		data() {
			return {
				activeNames: ['1','2'],
				lists: [],
				cols: [],
				total: 0,
				pagesize:10,
				page: 1,
				id:this.$store.state.navTabs.tabId,
				listLoading: false,

				liststwo: [],
				colstwo: [],
				totaltwo: 0,
				pagetwo:1,
				pagesizetwo: 10,
				listLoadingtwo: false,
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

			getlists() {
				let para = {
					id: this.id,
					page: this.page,
					pagesize: this.pagesize,
				
				};
				this.listLoading = true;
				//NProgress.start();
				getcmshistory(para).then((res) => {
					this.total = res.data.total;
					this.lists = res.data.data;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},

			getliststwo() {
				let para = {
					id: this.id,
					pagetwo: this.pagetwo,
					pagesizetwo: this.pagesizetwo,
					
				};
				this.listLoadingtwo = true;
				//NProgress.start();
				getcmsdetails(para).then((res) => {
					this.totaltwo = res.data.total;
					this.liststwo = res.data.data;
					this.colstwo = res.data.cols;
					this.listLoadingtwo = false;
					//NProgress.done();
				});
			},

		},
		mounted() {
			this.getlists();
			this.getliststwo();
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.abc.style.height= h+"px"
		}


}
</script>

<style>
</style>