<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="岗位名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
				<el-form-item>
				
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="操作"  align="center" >
				<template  slot-scope="scope">
					<el-button type="text" size="small" @click="addTab(scope.$index, scope.row)"  >详情</el-button>
				</template>
			</el-table-column>
			<el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" >
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"  style="float:right;">
			</el-pagination>
		</el-col>

		
		
	</section>
</template>

<script>
	
	//import NProgress from 'nprogress'
	import { station } from '@/api/monitor';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				lists: [],
				cols: [],
				total: 0,
				pagesize: 10,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				
				

			}
		},
		methods: {
			addTab(index,row){
				
				var indexlink = "supervisor";
				var label = '岗位任务详情';
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "supervisor";
				let component = resolve => require([`@/pages/monitor/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
						label: label,
						name: indexlink,
						disabled: false,
						closable: true,
						component: component
					})

			},
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
					page: this.page,
					name: this.filters.name,
					pagesize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				station(para).then((res) => {
					this.total = res.data.total;
					this.lists = res.data.data;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			
			//全选单选多选
			selsChange: function (sels) {
				this.sels = sels;
			},
			
		},
		mounted() {
			this.getlists();
		}
	}

</script>

<style >

</style>