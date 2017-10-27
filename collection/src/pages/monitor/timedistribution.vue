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
		<el-table :data="station" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="操作" width="150" >
				<template  scope="scope">
					<el-button type="text" size="small" @click="addTab(scope.$index, scope.row)"  >处理</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="queuename" label="队列名称" width="180" >
			</el-table-column>
			<el-table-column prop="stationname" label="岗位名称" width="180" >
			</el-table-column>
			<el-table-column prop="num" label="数量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="overduerec" label="逾期应收款总计" width="200" sortable>
			</el-table-column>
			<el-table-column prop="surplustotalmoney" label="剩余总金额" min-width="200" sortable>
			</el-table-column>
            <el-table-column prop="isdispose" label="已处理" width="100" sortable>
			</el-table-column>
            <el-table-column prop="isnodispose" label="未处理" width="100" sortable>
			</el-table-column>
			
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :page-sizes="[10, 20, 50, 100]" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		
		
	</section>
</template>

<script>
	
	//import NProgress from 'nprogress'
	import { station } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				station: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				
				

			}
		},
		methods: {
			addTab(index,row){
				
				var indexlink = "ceshi";
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "ceshi";
				let component = resolve => require([`@/pages/home/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
						label: '主页',
						name: indexlink,
						disabled: false,
						closable: true,
						component: component
					})

			},
			handleCurrentChange(val) {
				this.page = val;
				this.getStations();
			},
			//获取列表
			getStations() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				station(para).then((res) => {
					this.total = res.data.total;
					this.station = res.data.station;
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
			this.getStations();
		}
	}

</script>

<style >

</style>