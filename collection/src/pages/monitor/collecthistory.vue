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
			
			<el-table-column prop="coldata" label="催收日期" width="180" >
			</el-table-column>
			<el-table-column prop="contact" label="联系方式" width="100" >
			</el-table-column>
			<el-table-column prop="username" label="联系人" width="200" sortable>
			</el-table-column>
            <el-table-column prop="code" label="催收代码" width="200" sortable>
			</el-table-column>

			<el-table-column prop="colresult" label="催收结果" min-width="200" >
			</el-table-column>
            <el-table-column prop="colmark" label="催收备注" width="100" >
			</el-table-column>
            <el-table-column prop="menttime" label="约会时间" width="100" >
			</el-table-column>
			<el-table-column prop="promisemoney" label="承诺金额" width="100" sortable>
			</el-table-column>
            <el-table-column prop="promisedata" label="承诺日期" width="180" >
			</el-table-column>
            <el-table-column prop="contract" label="合同号" width="180" >
			</el-table-column>
			<el-table-column prop="userid" label="用户ID" width="100" >
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
import { gethistory } from "../../api/api";

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
      gethistory(para).then(res => {
        this.total = res.data.total;

        this.list = res.data.history;
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