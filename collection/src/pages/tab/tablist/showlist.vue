<template>
	<section>


		<!--列表-->
		<el-table :data="lists"  border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column label="操作"  align="center"  width="40" >
				<template  slot-scope="scope">
					<el-button type="text" size="small" @click="addTab(scope.$index, scope.row)"  >详情</el-button>
				</template>
			</el-table-column>
			<el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" :width="col.width">
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
	import { repairlist } from '@/api/tablist';

	export default {
		data() {
			return {
				
				lists: [],
				cols: [ 
					{ title: '服务站名称', field: 'serviceName',width:"120" },
            		{ title: '服务站城市', field: 'serviceCity' ,width:"100" },
           		 	{ title: '服务站地址', field: 'serviceAddress',width:"100" },
            		{ title: '服务站电话', field: 'servicePhone',width:"100"  },
            		{ title: '送修人', field: 'RepairName',width:"50" },
            		{ title: '送修人手机号', field: 'Repairphone',width:"100"  },
            		{ title: '修理类别', field: 'Repairtype',width:"60" },
            		{ title: '进厂时间', field: 'incomingTime',width:"80"  },
            		{ title: '出厂时间', field: 'factoryTime' ,width:"80" },],
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
					pageSize: this.pagesize,
					missionId:this.$route.params.id
				};
				this.listLoading = true;
				//NProgress.start();
				repairlist(para).then((res) => {
					let data=res.data.result;				
					this.total = data.data.length;
					this.lists = data.data;
					this.listLoading = false;

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