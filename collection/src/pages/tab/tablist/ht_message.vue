<template>
	<section>
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="合同详细信息" name="1">
				<div>
					<table>	
						<tr>
							<td>申请号</td><td>{{details.hth}}</td>
							<td>合同状态</td><td>{{details.htzt}}</td>
							<td>贷款产品</td><td colspan="3">{{details.dkcp}}</td>
							
							
						</tr>
						<tr>
							<td>合同起始日期</td><td>{{details.htqsrq}}</td>
							<td>合同终止日期</td><td>{{details.htzzrq}}</td>
							<td>合同创建日期</td><td>{{details.htcjrq}}</td>
							<td>合同签署日期</td><td>{{details.htqsrq}}</td>
						</tr>
						<tr>
							<td>贷款金额</td><td>{{details.dkje}}</td>
							<td>贷款期数</td><td>{{details.dkqs}}</td>
							<td>首付比例</td><td>{{details.sfbl}}</td>
							<td>利率</td><td>{{details.ll}}</td>
						</tr>
						<tr>
							<td>贷款余额</td><td>{{details.dkye}}</td>
							<td>已偿还本金</td><td>{{details.ychbj}}</td>
							<td>剩余本金总额</td><td>{{details.sybjze}}</td>
							<td>未到期本金</td><td>{{details.wdqbj}}</td>
						</tr>
						<tr>
							<td>到期利息总计</td><td>{{details.dqlxzj}}</td>
							<td>罚息</td><td>{{details.fx}}</td>
							<td>诉讼费</td><td>{{details.ssf}}</td>
							<td>收车费</td><td>{{details.scf}}</td>
						</tr>
						<tr>
							<td>未尝催收工本费</td><td>{{details.wccsgbf}}</td>
							<td>付款日</td><td>{{details.fkr}}</td>
							<td>最近一次还款金额</td><td>{{details.zjychkje}}</td>
							<td>最近一次还款日期</td><td>{{details.zjychkje}}</td>
						</tr>
						<tr>
							<td>核销状态</td><td>{{details.hxzt}}</td>
							<td>本次逾期天数</td><td>{{details.bcyqts}}</td>
							<td>本期逾期天数</td><td>{{details.bqyqts}}</td>
							<td>逾期应收款总计</td><td>{{details.yqyskzj}}</td>
						</tr>
						<tr>
							<td>省份</td><td>{{details.sf}}</td>
							<td>城市</td><td colspan="5">{{details.cs}}</td>
							
						</tr>
					</table>
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
		border:1px solid #dfe6ec;
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
		font-size: 10px;
    	border-radius: 1px;
   		min-height: 50px;
		line-height: 50px;
  	}
	.el-col-4{
		padding: 0;
	}
 
</style>