<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
        <el-form-item>
					<el-input v-model="filters.name" placeholder="当事人" style="width:130px" clearable></el-input>
				</el-form-item>
        <el-form-item>
					<el-input v-model="filters.applicant" placeholder="申请人"  style="width:130px" clearable></el-input>
				</el-form-item>
        <el-form-item>
					<el-input v-model="filters.applicationNumber" placeholder="合同号"  style="width:130px" clearable></el-input>
				</el-form-item>
        <el-form-item>
          <el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择时间区域" 				
					@change="dataChange"
					>
					</el-date-picker>
					<!-- <el-input v-model="filters.inputTime" placeholder="最近行动时间"></el-input> -->
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="getlists" >查询</el-button> 
				</el-form-item>
			
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border  @current-change="handleCurrentChanges" ref="singleTable2">
			<el-table-column type="selection"  align="center">
			</el-table-column>
			<el-table-column fixed label="操作"  align="center" width="90">
				<template slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/spdata/splist/historyList/'+scope.row.id}"><span @click="setCurrent(scope.$index,scope.row.id)">查看</span></router-link>
				</template>
			</el-table-column>
			
			<el-table-column sortable align="center" :prop="col.field" :label="col.title" :width="col.width" v-for="(col, index) in cols" :key="index" >
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100,500,1000]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>
    
		
		<!-- <router-link class="a-href" :to="{path:'/spdata/splist/listRemarks'}"><span>处理</span></router-link> -->
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import { getMissionListByUser } from "@/api/monitor";
 import { ListHistory } from "@/api/sp";
export default {
  data() {
    return {
      heights:0,
        value6:"",
				times1:"",
				times2:"",
        filters: {
            overdueDays:"",
            applicationNumber: "",
            name: "",
            startTime:"",
            endTime:"",  
            applicant:""       
        },
        currentRow: null,
        id:this.$route.params.id,
        lists: [],
        cols: [
            {title:'标题',field:'title'}, 
            {title:'合同号',field:'applicationNumber'},
            {title:'申请人',field:'applicant'},
            {title:'创建日期',field:'createTime'},
            {title:'最后提交日',field:'updateTime'},
        ],
        total: 0,
        page: 1,
        pagesize: 500,
        listLoading: false,
        sels: [] //列表选中列
    };
  },

  methods: {
    setCurrent(row,id) {
				this.$refs.singleTable2.setCurrentRow(row);
			  localStorage.setItem("nextNum","0");
				localStorage.setItem("currentRow",parseInt(this.currentRow)+1);
        localStorage.setItem("total",this.total)
        sessionStorage.setItem(id,id)				
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
        applicationNumber: this.filters.applicationNumber,
        pageSize: this.pagesize,
        applicant:this.filters.applicant,
        // userId:this.id,
        startTime:this.times1,
				endTime:this.times2	
      };
      this.listLoading = true;
      //NProgress.start();
      ListHistory(para).then(res => {                
      this.total = res.data.result.recordsTotal;    
      this.lists = res.data.result.data;
      // console.log( res)
            // this.cols = this.lists;
          this.listLoading = false;
        //NProgress.done();
      });
    },

    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style >

</style>