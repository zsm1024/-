<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.overdueDays" placeholder="逾期天数" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="getlists()">查询</el-button>
				</el-form-item>
				<el-form-item>
				
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border align="center">
			<el-table-column label="操作"  align="center" >
				<template  slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/realdata/realdetial/'+scope.row.overdueDays}">详情</router-link>
				</template>
			</el-table-column>
			<el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" sortable >
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
				cols: [
                    {title:'队列名称',field:'queueName'},
                    {title:'逾期天数',field:'overdueDays'},
                    {title:'日数量',field:'count'},
                    {title:'承诺还款案件数',field:'promiseNum'},
                    {title:'逾期应收款总计',field:'overdueTotal'},
                    {title:'未偿总金额',field:'residueTotal'},
                    {title:'已处理',field:'processed'},
                    {title:'未处理',field:'untreated'},
                ],
				total: 0,
				pagesize:100,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
                id: this.$route.params.id,
				heights:0,
				

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
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
				this.heights=h;
				let para = {
                    page: this.page,
                    queueId: this.id,
					overdueDays: this.filters.overdueDays,
					pageSize: this.pagesize
                };
				this.listLoading = true;
				//NProgress.start();
				station(para).then((res) => {
                    
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.lists.forEach(element => {
						if(element.overdueDays&&element.overdueDays!=null){
						element.overdueDays=Number(element.overdueDays)                    
						} 
					});
					this.cols = this.cols;
					this.listLoading = false;
					//NProgress.done();ss
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