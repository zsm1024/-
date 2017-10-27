<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="用户名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getlists" >查询</el-button>
				</el-form-item>
				<el-form-item>
				
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="操作" width="150" >
				<template >
					
				</template>
			</el-table-column>
			
			<el-table-column prop="username" label="借款人" width="180" >
			</el-table-column>
			<el-table-column prop="career" label="职业" width="100" >
			</el-table-column>
			<el-table-column prop="overday" label="逾期天数" width="200" sortable>
			</el-table-column>
      <el-table-column prop="overmoney" label="逾期金额" width="200" sortable>
			</el-table-column>

			<el-table-column prop="dealer" label="经销商" min-width="200" >
			</el-table-column>
      <el-table-column prop="product" label="贷款产品" width="100" >
			</el-table-column>
      <el-table-column prop="carmodels" label="车型" width="100" >
			</el-table-column>
			<el-table-column prop="contractnum" label="合同号" width="100" sortable>
			</el-table-column>
      <el-table-column prop="province" label="省份" width="180" >
			</el-table-column>
			<el-table-column prop="city" label="城市" width="100" >
			</el-table-column>
      	<el-table-column prop="code" label="最近行动代码" width="100" sortable>
			</el-table-column>
			<el-table-column prop="postid" label="岗位ID" width="200" sortable>
			</el-table-column>
			<el-table-column prop="process" label="处理人" min-width="200" >
			</el-table-column>
      <el-table-column prop="userid" label="用户ID" width="100" sortable>
			</el-table-column>
      <el-table-column prop="neartime" label="最近行动时间" width="100" sortable>
			</el-table-column>
      <el-table-column prop="loanmoney" label="贷款金额" width="100" sortable>
			</el-table-column>
			<el-table-column prop="unpaidmoney" label="未尝本金" width="100" sortable>
			</el-table-column>
      <el-table-column prop="firstscale" label="首付比例" width="100" >
			</el-table-column>
      <el-table-column prop="mark" label="承诺兑现标示" width="100" >
			</el-table-column>
			<el-table-column prop="isnodis" label="核销状态" width="100" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>

		
		
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import { getsupervisor } from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      list: [],
      total: 0,
      page: 1,
      pagesize: 20,
      listLoading: false,
      sels: [] //列表选中列
    };
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
      let para = {
        page: this.page,
        name: this.filters.name,
        pagesize: this.pagesize
      };
      this.listLoading = true;
      //NProgress.start();
      getsupervisor(para).then(res => {
        this.total = res.data.total;

        this.list = res.data.supervisor;
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