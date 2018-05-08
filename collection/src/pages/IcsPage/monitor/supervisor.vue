<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">

                <el-form-item>
                    <el-input v-model="filters.job" placeholder="岗位"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.queue" placeholder="任务队列"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.day" placeholder="逾期天数"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.money" placeholder="逾期金额"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="mini" @click="getlists" >查询</el-button> 
                </el-form-item>

            </el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" >
			</el-table-column>
			<el-table-column fixed label="操作"  align="center">
				<template slot-scope="scope">
					<router-link class="a-href" :to="{path:'/IcsPage/tab/tabview/'+scope.row.id}">处理</router-link>
				</template>
			</el-table-column>
			
			<el-table-column sortable align="center" :prop="col.field" :label="col.title" width="180" v-for="(col, index) in cols" :key="index" >
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
import { getsupervisor } from "@/api/monitor";

export default {
  data() {
    return {
      filters: {
        job:"",
        queue: "",
        name: "",
        day: "",
        money:"",
        province:"",
        city:"",
        area:""
      },
      heights:0,
			id:this.$store.state.navTabs.tabId,
			lists: [],
			cols: [],
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
      let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
			this.heights=h;
      let para = {
        page: this.page,
        name: this.filters.name,
				pagesize: this.pagesize,
				id:this.id
      };
      this.listLoading = true;
      //NProgress.start();

      getsupervisor(para).then(res => {
        this.total = res.data.total;
				this.lists = res.data.data;
				this.cols = res.data.cols;
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