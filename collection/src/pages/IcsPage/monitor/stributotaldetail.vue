<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
      <el-form-item>
					<el-input v-model="filters.name" placeholder="当事人" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.applicationNumber" placeholder="合同号"  clearable>></el-input>
				</el-form-item>
				<el-form-item>
          <el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择时间区域" 				
					@change="dataChange"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="getlists" >查询</el-button> 
				</el-form-item>
			
			</el-form>
		</el-col>

		<!--列表-->
		<el-table v-if="this.haName.indexOf(isName)!=-1" :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border  align="center" @current-change="handleCurrentChanges" ref="singleTable1">
			<el-table-column type="selection" align="center" >
			</el-table-column>
			<el-table-column fixed label="操作" align="center" width="80" >
				<template slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/tab/tabview/'+scope.row.id}"><span @click="setCurrent(scope.$index,scope.row.id)">处理</span></router-link>
        </template>
			</el-table-column>			
			<el-table-column sortable align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in colsMore" :key="index" :width='col.width' show-overflow-tooltip >
			</el-table-column>
		</el-table>
  <el-table v-else :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border  align="center" @current-change="handleCurrentChanges" ref="singleTable1">
			<el-table-column type="selection" align="center" >
			</el-table-column>
			<el-table-column fixed label="操作" align="center" width="80" >
				<template slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/tab/tabview/'+scope.row.id}"><span @click="setCurrent(scope.$index,scope.row.id)">处理</span></router-link>
				</template>
			</el-table-column>			
			<el-table-column sortable align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" :width='col.width' show-overflow-tooltip >
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[50, 100,500,1000]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>

		
		
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import { getsupervisor } from "@/api/monitor";
import {findByType } from "@/api/basedata";
export default {
  data() {
    return {
      haName:[],
      isName:localStorage.getItem('userName'),
      value6:"",
      heights:0,
				times1:"",
				times2:"",
        filters: {
            name: '',
				  	applicationNumber:"",
					  overdueDays:"",
					  startTime:"",
					  endTime:"",  
					  phone:""
          },
          currentRow: null,
        id:this.$route.params.id,
        lists: [],
        cols: [
          {title:'借款人',field:'name',width:80}, 
          {title:'合同号',field:'applicationNumber',width:80},
          {title:'逾期天数',field:'overdueDays',width:80},
          {title:'逾期金额',field:'sumOverdue',width:80},
          {title:'岗位ID',field:'position'},
          {title:'处理人',field:'realUser'},
          {title:'用户ID',field:'username'},
          {title:'最近行动代码',field:'actSign',width:130},
          {title:'最近行动时间',field:'inputTime',width:130},
          {title:'贷款金额',field:'loanAmount'},
          {title:'未偿本金',field:'residualAmount'},           
          {title:'职业',field:'occupation',width:100},
          {title:'首付比例',field:'firstRatio'},
            // {title:'承诺兑现标识',field:'mark'},
          {title:'省份',field:'province',width:80},
          {title:'城市',field:'city',width:80},
          {title:'车型',field:'loanCar',width:160}, 
          {title:'经销商',field:'dealer',width:120},
          {title:'贷款产品',field:'loanProducts',width:120},  
          {title:'核销状态',field:'isnodis'},
        ],
         colsMore: [
            {title:'借款人',field:'name',width:80}, 
            {title:'合同号',field:'applicationNumber',width:80},
            {title:'逾期天数',field:'overdueDays',width:80},
            {title:'逾期金额',field:'sumOverdue',width:80},
            {title:'岗位ID',field:'position'},
            {title:'处理人',field:'realUser'},
            {title:'用户ID',field:'username'},
            {title:'最近行动代码',field:'actSign',width:100},
            {title:'最近行动时间',field:'inputTime',width:160},
            {title:'贷款金额',field:'loanAmount'},
            {title:'未偿本金',field:'residualAmount'},           
            {title:'职业',field:'occupation',width:100},
            {title:'首付比例',field:'firstRatio'},
            {title:'省份',field:'province',width:80},
            {title:'城市',field:'city',width:80},
             {title:'车型',field:'loanCar',width:160}, 
            {title:'经销商',field:'dealer',width:120},
            {title:'贷款产品',field:'loanProducts',width:120},  
            {title:'核销状态',field:'isnodis'},
            {title:'征信评分',field:'digital'},
            {title:'评分卡分值',field:'scores',width:100},
            {title:'评分排名',field:'rankingDigital'},
        ],
        total: 0,
        page: 1,
        pagesize: 500,
        listLoading: false,
        sels: [] //列表选中列
    };
  },

  methods: {
     findType() {
    let pa = {
        type: "credit_Nor"
      };
      findByType(pa).then(res => {
        let data = res.data.result;
        data.forEach(el =>{
          this.haName.push(el.val)
        });
      });
    },
    setCurrent(row,id) {
				this.$refs.singleTable1.setCurrentRow(row);
			localStorage.setItem("nextNum","1");
				localStorage.setItem("currentRow",parseInt(this.currentRow)+1);
        localStorage.setItem("total",this.total)
        localStorage.setItem(id,id)
        				
			  },
			handleCurrentChanges(val) {
				// console.log(val)
        		this.currentRow = val;
      		},
    // localNumber(){
      
    // },
    dataChange(val){			
				this.times2=val.split("至").pop();
				this.times1=val.split("至").shift();
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
        name: this.filters.name,
        applicationNumber:this.filters.applicationNumber,
        startTime:this.times1,
				endTime:this.times2	,
        pageSize: this.pagesize,
        overdueDays:this.id,
        queueId:localStorage.getItem("overDueId")
      };
      this.listLoading = true;
      //NProgress.start();

      getsupervisor(para).then(res => {
            this.total = res.data.result.recordsTotal;
      
      this.lists = res.data.result.data;
      this.lists.forEach(element => {
        if(element.overdueDays&&element.overdueDays!=null){
          element.overdueDays=Number(element.overdueDays)                    
        }
        
      });
            this.cols = this.cols;
            this.listLoading = false;
        //NProgress.done();
      });
    },

    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  created(){
    this.findType()
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style >

</style>