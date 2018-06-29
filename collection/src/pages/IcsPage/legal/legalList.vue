<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar legals" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.applicationNumber" placeholder="合同号" clearable style="width:130px"></el-input>
                </el-form-item>
               <el-form-item>
                    <el-date-picker style="width:130px" v-model="filters.submissionFilingTime" @change="submissionFilingTime" type="date" value-format="yyyy-MM-dd" placeholder="立案时间"></el-date-picker>
                </el-form-item>
				 <el-form-item>
                    <el-date-picker style="width:150px" v-model="filters.firstCourtTime" @change="firstCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="第一次开庭时间"></el-date-picker>
                </el-form-item>
				<el-form-item>
                    <el-input v-model="filters.city" placeholder="城市" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.firstInstanceReference" placeholder="一审案号" clearable style="width:130px"></el-input>
                </el-form-item>               
                <el-form-item>
                    <el-button type="primary"  @click="getlists" size="mini" style="padding:7px 9px" >查询</el-button>
					<el-button type="primary"   size="mini" @click="hostList()" style="padding:7px 9px" >导出</el-button>
					<el-button type="primary"   size="mini" @click="hostListAll()" style="padding:7px 9px">全部导出</el-button>
                </el-form-item>
                <el-form-item>
                
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading"  style="width: 100%;" @selection-change="handleSelectionChange" @select-all="slelectall" ref="table" @current-change="handleCurrentChanges" stripe border>			
			 <el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column label="操作" width="60" fixed="left"  align="center" >
				<template slot-scope="scope">
					 <router-link class="a-href" :to="{path:'/IcsPage/tab/tabview/'+scope.row.missionId}"><span @click="setCurrent(scope.$index,scope.row.missionId)">处理</span></router-link>
				</template>				
			</el-table-column>
            <el-table-column  align="center" :prop="col.field" sortable :label="col.title" :width="col.width" v-for="(col, index) in cols" :key="index" >
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
import { path } from "@/config";
	export default {
		data() {
			return {
				filters: {
					applicationNumber:'',
					name:"",
					firstInstanceReference:"",
					city:"",
					firstCourtTime:"",
					submissionFilingTime:""
				},
				heights:0,
				lists: [],
				addlists: [],
				cols: [					
					{ title: '姓名', field: 'name'},
					{ title: '合同号', field: 'applicationNumber', width: "120" },
					{ title: '案件状态', field: 'status' },
					{ title: '逾期天数', field: 'overdueDays'},
					{ title: '约会日期', field: 'appointmentTime'},
					{ title: '最近行动代码', field: 'actSign', width: "120" },
					{ title: '贷款车型', field: 'loanCar', width: "150" },
					{ title: '贷款金额', field: 'loanAmount' },
					{ title: '省份', field: 'province'},	
                 	{ title: '城市', field: 'city'},
					{ title: '一审案号', field: 'firstInstanceReference',width: "180"},
					{ title: '二审案号', field: 'secondInstanceNumber',width: "180"},							
					{ title: '诉讼费', field: 'legalActionFee'},
					{ title: '保全费', field: 'preservationFee'},
					{ title: '立案时间', field: 'submissionFilingTime', width: "120" },
					{ title: '第一次开庭时间', field:'firstCourtTime', width: "120" },
					{ title: '第二次开庭时间', field:'secondCourtTime', width: "120" },				
					{ title: '一审判决时间', field: 'trialMediationTime', width: "120" },
					{ title: '判决书生效时间', field:'judgmentEffectTime', width: "120" },
					{ title: '申请执行时间', field: 'applyActionTime', width: "120" },
					{ title: '上失信被执行人时间', field: 'discreditTime', width: "180" },				
					{ title: '法院终裁日期', field: 'receiveCourtFinalDate', width: "100" },
					{ title: '核销状态', field: 'stateVerification'},
					{ title: '收车状态', field: 'receiveCarStatus' },

                ],
				total: 0,
				pagesize:500,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				multipleSelection:[],
				currentRow: null,
				

			}
		},
		methods: {
			submissionFilingTime(val){
				this.filters.submissionFilingTime=val;
			},
			firstCourtTime(val){
				this.filters.firstCourtTime=val;
			},
			handleCurrentChanges(val) {
        		this.currentRow = val;
      		},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getlists();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlists();
			},
			setCurrent(row,id) {

				this.$refs.table.setCurrentRow(row);
				localStorage.setItem("nextNum","0");
				localStorage.setItem("currentRow",parseInt(this.currentRow)+1);
				localStorage.setItem("total",this.total);
				localStorage.setItem(id,id)				
			  },
            slelectall(val) {},
           handleSelectionChange(val) {
      		this.multipleSelection = val;
			},
			hostList(item) {
				this.addlists = [];
				this.multipleSelection.forEach(f => {
					this.addlists.push(f.id);
				});
				var ids = this.addlists.toString();
				 let path12=this.exportPaths +"/legalAction/laCaseExport?ids="+ ids;
				window.open(path12)
				
			},
			//获取列表
			getlists() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-250;
				this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize,
					queueId:"120",
					applicationNumber:this.filters.applicationNumber,
					name:this.filters.name,
					city:this.filters.city,
					firstInstanceReference:this.filters.firstInstanceReference,
					firstCourtTime:this.filters.firstCourtTime,
					submissionFilingTime:this.filters.submissionFilingTime,

				};
				// this.listLoading = true;
				//NProgress.start();
				ListLegalActionMonitor(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.cols = this.cols;
					this.exportPaths = path.api;
					// this.listLoading = false;
					//NProgress.done();
				});
			},
			hostListAll(){
				let paths=this.exportPaths+"/legalAction/laCaseExportAll"
				window.open(paths)
			},							
		},
		mounted() {
            this.getlists();
        }
    }
</script>

<style scoped>

</style>