<template>
	<section>
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="合同详细信息" name="1">
				<div>

					<el-row :gutter="20">
							<el-col :span="3"  style="padding:0"><div class="grid-content bg-purple">合同号</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.hth}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">合同状态</div></el-col>
							<el-col :span="5"><div class="grid-content bg-white" >{{details.htzt}}</div></el-col>
							<el-col :span="4"><div class="grid-content bg-purple" >贷款产品</div></el-col>
							<el-col :span="5"><div class="grid-content bg-white" style="height:20px;line-height:20px;font-size:10px">{{details.dkcp}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3"  style="padding:0"><div class="grid-content bg-purple">合同起始日期</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.htqsrq}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">合同终止日期</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.htzzrq}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">合同创建日期</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.htcjrq}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">合同签署日期</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.htqsrq}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-purple">贷款金额</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.dkje}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">贷款期数</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.dkqs}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">首付比例</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.sfbl}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">利率</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.ll}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-purple">贷款余额</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.dkye}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">已偿还本金</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.ychbj}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">剩余本金总额</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.sybjze}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">未到期本金</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.wdqbj}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-purple">到期利息总计</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.dqlxzj}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">罚息</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.fx}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">诉讼费</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.ssf}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">收车费</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.scf}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-purple">未尝催收工本费</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.wccsgbf}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">付款日</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.fkr}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">最近一次还款金额</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.zjychkje}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">最近一次还款日期</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.zjychkrq}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-white"></div></el-col>
							<el-col :span="3"><div class="grid-content bg-white"></div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">本次逾期天数</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.bcyqts}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">本期逾期天数</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.bqyqts}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">逾期应收款总计</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.yqyskzj}}</div></el-col>
					</el-row>
					<el-row :gutter="20" style="border-top:0">
							<el-col :span="3" style="padding:0"><div class="grid-content bg-purple">核销状态</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.hxzt}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">省份</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.sf}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-purple">城市</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white">{{details.cs}}</div></el-col>
							<el-col :span="3"><div class="grid-content bg-white"></div></el-col>
							<el-col :span="3"><div class="grid-content bg-white"></div></el-col>
					</el-row>
				</div>
			
			</el-collapse-item>
			<el-collapse-item title="还款账号列表" name="2">
				<div>
					<el-table :data="lists" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe>
					


					<el-table-column :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" >
					</el-table-column>

					</el-table>
				</div>
			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>

//import NProgress from 'nprogress'
import { getdeal } from "@/api/api";

 export default {
    data() {
      return {
				activeNames: ['1','2'],
				details: [],
				lists: [],
				cols: [],
				id:this.$store.state.navTabs.tabId,
				listLoading: false,
      };
		},
		methods: {
			    //获取列表
				getlists() {
					let para = {
						id: this.id
					};
					this.listLoading = true;
					//NProgress.start();
					getdeal(para).then(res => {
						
						this.lists = res.data.data;
						this.cols = res.data.cols;
						this.details = res.data.details;
						this.listLoading = false;
						//NProgress.done();
					});
				},
		},
		mounted() {
    	this.getlists();
  	}
  }
</script>

<style>
	.el-row {
		border:1px solid #cccccc;
	}
	.bg-white{
		text-align: left;
		padding: 0;
	}
	.bg-purple {

		background: #d3dce6;
		text-align: center;
	
	}

	.grid-content {

    border-radius: 1px;
    min-height: 50px;
		line-height: 50px;
  }
	.el-col-4{
		padding: 0;
	}
 
</style>