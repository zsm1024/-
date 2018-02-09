<template>
    <section id="colone">
        <el-col  :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="当事人" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.applicationNumber" placeholder="合同号"  clearable>></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.overdueDays" placeholder="逾期天数"  clearable></el-input>
				</el-form-item>
					<el-form-item>
					<el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择约会时间区域" 				
					@change="dataChange"
					>
					</el-date-picker>
				</el-form-item>
				<!-- <el-form-item>
					<el-input v-model="filters.appointmentTime" placeholder="开始时间"  clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.appointmentTime" placeholder="结束时间"  clearable></el-input>
				</el-form-item> -->
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.Cnum" placeholder="合同号"></el-input>
				</el-form-item> -->
                <!-- <el-form-item>
					<el-select v-model="formInline.region" placeholder="请选择" @change="handleOptionChange">
                    <el-option label="合同号" value="合同号"></el-option>
                    <el-option label="派单时间" value="派单时间"></el-option>
                    <el-option label="当事人"  value="当事人间"></el-option>
                    </el-select>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="getUsers" size="mini">查询</el-button>
				</el-form-item>				
			</el-form>  
        </el-col>  
    <!--列表-->
		<el-table :data="datas" :max-height="heights" highlight-current-row v-loading="listLoading" border style="width: 100%;" id="asew" :row-class-name="tableRowClassName" @current-change="handleCurrentChanges" ref="singleTable3" >
			<el-table-column label="操作" width="60" fixed="left"  align="center">
				<template slot-scope="scope">
					 <router-link class="a-href" :to="{path:'/tab/tabview/'+scope.row.id}"><span @click="setCurrent(scope.$index)">处理</span></router-link>
				</template>
			</el-table-column>
			<el-table-column type="index" width="30" fixed="left" align="center">
			</el-table-column>
			<el-table-column sortable :prop="cols.field" :label="cols.title" :width="cols.width"  v-for="(cols, index) in cols" :key="index" align="center" >
			</el-table-column>
		
		</el-table>
        
		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page"  :total="total" :page-size="pagesize"  style="float:right;" :page-sizes='[100,200,500,1000,2000]' >
			</el-pagination>
		</el-col>
    </section>
</template>
<script>

	//import NProgress from 'nprogress'
	import {getEscrow} from '@/api/task';
	export default {
		data() {			
			return {
				heights:0,
				value6:"",
				times1:"",
				times2:"",
			   userid:localStorage.getItem('UserId'),
               formInline:{
                    user:"",
                    region:""
                },
				filters: {					
					name: '',
					applicationNumber:"",
					overdueDays:"",
					appointmentTime:"",
					phone:"",
					startTime:"",
					endTime:"",
				},
				datas: [],
				// cols:[],
				cols: [
					{ title: '姓名', field: 'name', width: "60" },
					{ title: '合同号', field: 'applicationNumber', width: "80" },
					{ title: '逾期天数', field: 'overdueDays', width: "75" },
					{ title: '逾期金额', field: 'overdueTotal', width: "80" },  
					{ title: '约会日期', field: 'appointmentTime', width: "80" },
					{ title: '最近行动代码', field: 'actSign', width: "120" },
					{ title: '最近行动时间', field: 'inputTime', width: "150" },					
           			{ title: '贷款车型', field: 'car', width: "150" },
					{ title: '省份', field: 'province', width: "50" },
					{ title: '城市', field: 'city', width: "50" },
					{ title: '未偿本金', field: 'residualAmount', width: "90" },
					{ title: '贷款金额', field: 'loanAmount', width: "90" },
					{ title: '职业', field: 'occupation', width: "90" },
					{ title: '贷款产品', field: 'loanProducts', width: "150" },
					{ title: '派单时间', field: 'createTime', width: "120" },					
					{ title: '区域', field: 'Region', width: "80" },		
					{ title: '核销状态', field: 'check_statues', width: "100" },
					{ title: '收车状态', field: 'car_statues', width: "100" }					
					],
				total: 0,
				page: 1,
				pagesize:1000,
				currentPage:1,
				SelectOption:"",
				listLoading: true,
				sels: [],//列表选中列
				tpageSize:20,
				NowFormatDate:"",
				currentRow: null,
            }           
		},
		watch:{
			pageSize:"changeSize"
		},
		methods: {
			 setCurrent(row) {
				this.$refs.singleTable3.setCurrentRow(row);
			  localStorage.setItem("nextNum","2");
				localStorage.setItem("currentRow",parseInt(this.currentRow)+1);
				localStorage.setItem("total",this.total)				
			  },
			handleCurrentChanges(val) {
				// console.log(val)
        		this.currentRow = val;
      		},
			// localNumber(){
			// 	localStorage.setItem("nextNum")
			// },
			dataChange(val){			
				this.times2=val.split("至").pop();
				this.times1=val.split("至").shift();
     		 },
			changeSize(){
				this._data.tpageSize=this.pageSize;
			},
			handleCurrentChange(val) {
                this.pages = val;
				this.getUsers();
            },
            handleSizeChange(val) {
			this.pagesize = val  
			this.getUsers();     
			},
			handleOptionChange(val) {
				 this.SelectOption=val;
				 this.getUsers();
            },
			//获取用户列表
			getUsers() { 
                this.listLoading = true;
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
        		this.heights=h;
				let para = {
					page: this.page,
					pageSize:this.pagesize,	
					name:this.filters.name,
					applicationNumber:this.filters.applicationNumber,
					overdueDays:this.filters.overdueDays,
					// appointmentTime:this.filters.appointmentTime
					startTime:this.times1,
					endTime:this.times2												
				};
				//NProgress.start();
				getEscrow(para).then((res) => {
					let data=res.data.result;					
					 this.datas=data.data;					 
					 this.total=data.recordsTotal;
					// this.cols = data.cols;
					//  this.datas = res;
					//  console.log(users)
					//  console.log(data)
					// this.total = res.data.total;
					// this.users = res.data.users;
					 
					//  this.total = res.data.recordsTotal;
					// let data=res.data.result.data;
					  
					//  this.cols = res.data.cols;
					  this.listLoading = false;
					//NProgress.done();
				});
			},
				getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;						
				// return currentdate;
				this.NowFormatDate=currentdate;
			},	
			tableRowClassName(row, rowIndex) {
				
				// row.appointmentTime=row.appointmentTime.replace(/\s+/g,"");
				if (row.appointmentTime <=this.NowFormatDate) {
				
				return 'warning-row';
				} 
				return '';
			}
				
		},
		mounted() {
			this.getUsers();
			this.getNowFormatDate();
		}
	}
</script>
<style>	
	#colone .cell{
		padding:0!important;
		line-height:24px!important;	
		white-space: nowrap!important	
	}; 
	.cell{white-space: nowrap!important}
	#asew td{height:24px!important;background:#fff;}
	.el-table__fixed{height:100%!important}
	#asew.el-table .warning-row {
    background: rgb(218, 149, 21)!important;
  }
.el-table#asew .warning-row td:nth-of-type(7){
	 background: rgb(233, 12, 12)!important;
	 color: #fff;
}
  #asew.el-table .success-row {
    background: #f0f9eb;
  }
</style>

