<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.applicationNumber" placeholder="合同号" clearable style="width:130px"></el-input>
                </el-form-item>
               <el-form-item>
                    <el-input v-model="filters.appNum" placeholder="申请号" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="当事人" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.documentType" placeholder="证件类型" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.documentNum" placeholder="证件号" clearable style="width:200px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="getlists" size="mini" >查询</el-button>
                </el-form-item>
                <el-form-item>
                
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe border>
            
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                     <router-link class="a-href" :to="{path:'/searchs/colsearchdetail/'+scope.row.id}">详情</router-link> 
                      <!-- <router-link class="a-href" :to="{path:'/searchs/123'}">详情</router-link> -->
                </template>
            </el-table-column>
            <el-table-column  align="center" :prop="col.field" sortable :label="col.title"  v-for="(col, index) in cols" :key="index" >
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[50, 100,500,1000,2000]"   :total="total"  style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
	//import NProgress from 'nprogress'
	import { getcontractInfos } from '@/api/collmanage';

	export default {
		data() {
			return {
				filters: {
					applicationNumber:'',
					name:"",
					documentType:"",
					documentNum:"",
					appNum:""
				},
				heights:0,
				lists: [],
				cols: [
                 	{ title: '姓名', field: 'name', width: "60" },
            		{ title: '合同号', field: 'applicationNumber', width: "80" },  { title: '申请号', field: 'appNum', width: "80" },  			
					{ title: '贷款产品', field: 'loanProducts', width: "150" },
					{ title: '贷款车型', field: 'loanCar', width: "150" },
					{ title: '付款日期', field: 'datePayment', width: "80" },
					{ title: '证件类型', field: 'documentType', width: "80" },
					{ title: '证件号', field: 'documentNum', width: "50" },				
					{ title: '合同状态', field: 'state', width: "100" },

                ],
				total: 0,
				pagesize:500,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				
				

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
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-180;
				this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize,
					applicationNumber:this.filters.applicationNumber,
					name:this.filters.name,
					documentType:this.filters.documentType,
					documentNum:this.filters.documentNum,
					appNum:this.filters.appNum

				};
				this.listLoading = true;
				//NProgress.start();
				getcontractInfos(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.cols = this.cols;
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

<style scoped>

</style>