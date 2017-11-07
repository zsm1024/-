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
					<el-input v-model="filters.money" placeholder="剩余金额"></el-input>
				</el-form-item>
        <el-form-item>
        <el-select v-model="filters.province" placeholder="请选择省份">
          <el-option value="河北省" label="河北省">
            
          </el-option>
        </el-select>
        <el-select v-model="filters.city" placeholder="请选择城市">
          <el-option value="保定市" label="保定市">
            
          </el-option>
        </el-select>
        <el-select v-model="filters.area" placeholder="请选择区域">
          <el-option value="南市区" label="南市区">
            
          </el-option>
        </el-select>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getlists" >查询</el-button> 
				</el-form-item>
			
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="lists"  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column type="selection" >
			</el-table-column>
			<el-table-column fixed label="操作"  >
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="addTab(scope.$index, scope.row)"  >处理</el-button>
				</template>
			</el-table-column>
			
			<el-table-column :prop="col.field" :label="col.title" width="180" v-for="(col, index) in cols" :key="index" >
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
			id:this.$store.state.navTabs.tabId ,
			lists: [],
			cols: [],
      total: 0,
      page: 1,
      pagesize: 10,
      listLoading: false,
      sels: [] //列表选中列
    };
  },

  methods: {
    addTab(index,row){
				
				var indexlink = "tabView";
				var label = '处理详情页';
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "tabView";
				let component = resolve => require([`@/pages/tab/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
						label: label,
						name: indexlink,
						disabled: false,
						closable: true,
						component: component
				})

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