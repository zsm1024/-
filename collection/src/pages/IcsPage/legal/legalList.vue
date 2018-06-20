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
	import { ListLegalActionMonitor } from '@/api/legal';

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
                 	{ title: '城市', field: 'city', width: "60" },
					{ title: '一审案号', field: 'firstInstanceReference', width: "80" },
					{ title: '二审案号', field: 'secondInstanceNumber', width: "80" },
					{ title: '诉讼标的', field: 'target', width: "80" },  			
					{ title: '诉讼费', field: 'legalActionFee', width: "150" },
					{ title: '保全费', field: 'preservationFee', width: "150" },
					{ title: '立案时间', field: 'submissionFilingTime', width: "80" },
					{ title: '第一次开庭时间', field:'firstCourtTime', width: "80" },
					{ title: '第二次开庭时间', field:'secondCourtTime', width: "50" },				
					{ title: '一审判决时间', field: 'trialMediationTime', width: "100" },
					{ title: '判决书生效时间', field:'judgmentEffectTime', width: "100" },
					{ title: '申请执行时间', field: 'applyActionTime', width: "80" },
					{ title: '上失信被执行人时间', field: 'discreditTime', width: "50" },				
					{ title: '法院终裁日期', field: 'receiveCourtFinalDate', width: "100" },
					{ title: '核销状态', field: 'state', width: "100" },
					{ title: '收车状态', field: 'receiveCarStatus', width: "100" },

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
					
					// applicationNumber:this.filters.applicationNumber,
					// name:this.filters.name,
					// documentType:this.filters.documentType,
					// documentNum:this.filters.documentNum,
					// appNum:this.filters.appNum

				};
				// this.listLoading = true;
				//NProgress.start();
				ListLegalActionMonitor(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.cols = this.cols;
					// this.listLoading = false;
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