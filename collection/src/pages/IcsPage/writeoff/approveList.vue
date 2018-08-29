<template>
	<section>
		<!--工具条-->
		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe border  @current-change="handleCurrentChanges" ref="singleTable2">
			<!-- <el-table-column type="selection"  align="center">
			</el-table-column> -->
			<el-table-column fixed label="操作"  align="center" width="90">
				<template slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/writeoff/writeoffapprove/'+scope.row.id}"><span @click="setCurrent(scope.$index,scope.row.id)">处理</span></router-link>
				</template>
			</el-table-column>
			
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
import { getMissionListByUser } from "@/api/monitor";
import { listReviewer } from "@/api/writeoff";
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
            {title:'合同号',field:'applicationNumber'},
            {title:'客户姓名',field:'repaymentPeople'}, 
            {title:'还款金额',field:'repaymentMoney'},
            {title:'还款日期',field:'repaymentDay'},
            {title:'用户ID',field:'booker'},
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
        // name: this.filters.name,
        // applicationNumber: this.filters.applicationNumber,
        pageSize: this.pagesize,
        // applicant:this.filters.applicant,
        // startTime:this.times1,
				// endTime:this.times2	
      };
      this.listLoading = true;
      listReviewer(para).then(res => {                
      this.total = res.data.result.recordsTotal;     
      this.lists = res.data.result.data;
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