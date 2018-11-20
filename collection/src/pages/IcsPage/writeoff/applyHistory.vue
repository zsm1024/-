<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
        <el-form-item>
					<el-input v-model="filters.name" placeholder="客户姓名" style="width:130px" clearable></el-input>
				</el-form-item>
        <el-form-item>
					<el-input v-model="filters.applicationPerson" placeholder="申请人"  style="width:130px" clearable></el-input>
				</el-form-item>
        <el-form-item>
					<el-input v-model="filters.applicationNumber" placeholder="合同号"  style="width:130px" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="getlists" >查询</el-button> 
				</el-form-item>
			
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border  @current-change="handleCurrentChanges" ref="singleTable2">
			
			<el-table-column sortable align="center" :prop="col.field" :label="col.title" :width="col.width" show-overflow-tooltip  v-for="(col, index) in cols" :key="index" >
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100,500,1000]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>	
	</section>
</template>

<script>
import { listReviewerHis } from "@/api/writeoff";
export default {
  data() {
    return {
      heights:0,
        value6:"",
				times1:"",
				times2:"",
        filters: {
            applicationPerson:"",
            applicationNumber: "",
            name: "",               
        },
        currentRow: null,
        id:this.$route.params.id,
        lists: [],
        cols: [
            {title:'审批状态',field:'isPass'},
            {title:'合同号',field:'applicationNumber'},
            {title:'客户姓名',field:'repaymentPeople'}, 
            {title:'还款金额',field:'repaymentMoney'},
            {title:'还款日期',field:'repaymentDay'},
            {title:'申请人',field:'booker'},
            {title:'备注',field:'remarks'},
            {title:'复核意见',field:'reason'},
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
        pageSize: this.pagesize,
        applicationNumber:this.filters.applicationNumber,
        repaymentPeople:this.filters.name,
        booker:this.filters.applicationPerson
      };
      this.listLoading = true;
      listReviewerHis(para).then(res => {                
      this.total = res.data.result.recordsTotal;     
      this.lists = res.data.result.data;
       this.lists.forEach(element => {
         if(element.isPass==1){
           element.isPass="通过"
         }else{
           element.isPass="关闭"
         }
       });
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