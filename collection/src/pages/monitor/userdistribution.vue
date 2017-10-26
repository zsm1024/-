<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="用户名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUsestations" >查询</el-button>
				</el-form-item>
				<el-form-item>
				
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="userstation" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="操作" width="150" >
				<template >
					
				</template>
			</el-table-column>
			
			<el-table-column prop="username" label="用户名称" width="180" >
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
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>

		
		
	</section>
</template>

<script>

	//import NProgress from 'nprogress'
	import { userstation } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				userstation: [],
				total: 0,
                page: 1,
                pagesize:20,
				listLoading: false,
				sels: [],//列表选中列

				
				

			}
        },
       
		methods: {
            
			handleSizeChange(val) {
                
                this.pagesize = val  
                this.getUsestations();     
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsestations();
			},
			//获取列表
			getUsestations() {
				let para = {
					page: this.page,
                    name: this.filters.name,
                    pagesize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				userstation(para).then((res) => {
                    
                    this.total = res.data.total;
                   
					this.userstation = res.data.userstation;
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
			this.getUsestations();
		}
	}

</script>

<style >

</style>