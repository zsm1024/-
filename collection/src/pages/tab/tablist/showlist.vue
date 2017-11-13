<template>
	<section>


		<!--列表-->
		<el-table :data="lists" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
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
	import { repairlist } from '@/api/api';

	export default {
		data() {
			return {
				
				lists: [],
				cols: [],
				total: 0,
				pagesize: 10,
				page: 1,
				listLoading: false,
			
				
				

			}
		},
		methods: {
			addTab(index,row){
				
				var indexlink = "showdetail";
				var label = '维保信息详情';
				this.$store.state.listdetail.tabdetailId=row.id;
				this.$store.state.listdetail.activeTabdetailName = "showdetail";
				let component = resolve => require([`@/pages/tab/tablist/${indexlink}`], resolve)
				if (this.$store.state.listdetail.tabListdetail.filter(f => f.name == indexlink) != 0) {
					this.$store.state.listdetail.tabListdetail = this.$store.state.listdetail.tabListdetail.filter(f => f.name != indexlink);
				}
				this.$store.state.listdetail.tabListdetail.push({
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
					pagesize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				repairlist(para).then((res) => {
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
		created() {
			this.getlists();
		}
	}

</script>

<style >

</style>