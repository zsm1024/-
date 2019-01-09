<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.queueName" placeholder="队列名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="getlists" >查询</el-button>
                </el-form-item>
                <el-form-item  >
                	<el-button v-if="this.haName.indexOf(isName)!=-1" type="primary" size="mini" @click="zxExport" >征信导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe border>
            
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                    <router-link class="a-href" :to="{path:'/IcsPage/monitor/timedistribution/'+scope.row.id}"><span>详情</span></router-link>
                    
                </template>
            </el-table-column>
            <el-table-column sortable align="center" :prop="col.field" :label="col.title"  :width="col.width" v-for="(col, index) in cols" :key="index" show-overflow-tooltip >
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
	import { queuetotal,digitalExport } from '@/api/monitor';
	import {findByType } from "@/api/basedata";
	export default {
		data() {
			return {
				haName:[],
      			isName:localStorage.getItem("userName"),
				filters: {
					queueName:'',
				},
				exportUrl:window.g.api,
				lists: [],
				cols: [
                    {title:'队列名称',field:'queueName'},
                    {title:'数量',field:'count'},
                    {title:'逾期应收款总计',field:'overdueTotal',width:'130'},
                    {title:'承诺还款案件数',field:'promiseNum',width:'130'},
                    {title:'未偿总金额',field:'residueTotal'},
                    {title:'已处理',field:'processed'},
                    {title:'未处理',field:'untreated'},

                ],
				total: 0,
				pagesize: 20,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				heights:0,
				
				

			}
		},
		methods: {
			findType() {
				let pa = {
					type: "export_Credit"
				};
				findByType(pa).then(res => {
					let data = res.data.result;
					data.forEach(el =>{
					this.haName.push(el.val)
					});
				});
				},
			zxExport(){
				window.open(`${this.exportUrl}/userMoitoring/digitalExport`)

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
			let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
			this.heights=h;
				let para = {
					page: this.page,
					queueName: this.filters.queueName,
					pageSize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				queuetotal(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.cols = this.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},		
		},
		created(){
			this.findType()
		},
		mounted() {
            this.getlists();
        }
    }
</script>

<style scoped>

</style>