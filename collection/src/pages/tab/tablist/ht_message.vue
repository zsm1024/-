<template>
	<section ref="abc" style="overflow-y: auto;">
		<el-collapse v-model="activeNames" >
			<el-collapse-item title="合同详细信息" name="1">
				<div>
					<table class="ht_table">	
						<tr>
							<td class="tds">申请号</td><td>{{details.applicationNumber}}</td>
							<td class="tds">合同状态</td><td>{{details.state}}</td>		
							<td class="tds">省份</td><td>{{details.province}}</td>
							<td class="tds">城市</td><td colspan="5">{{details.city}}</td>
							
						</tr>
						<tr>
							<td class="tds">合同起始日期</td><td>{{details.startTime}}</td>
							<td class="tds">合同终止日期</td><td>{{details.endTime}}</td>
							<td class="tds">合同创建日期</td><td>{{details.creteTime}}</td>
							<td class="tds">合同签署日期</td><td>{{details.signTime}}</td>
						</tr>
						<tr>
							<td class="tds">贷款金额</td><td>{{details.loanAmount}}</td>
							<td class="tds">贷款期数</td><td>{{details.loanNum}}</td>
							<td class="tds">首付比例</td><td>{{details.firstRatio}}</td>
							<td class="tds">利率</td><td>{{details.interstRate}}</td>
						</tr>
						<tr>
							<td class="tds">贷款余额</td><td>{{details.loanBalance}}</td>
							<td class="tds">已偿还本金</td><td>{{details.paidPrincipal}}</td>
							<td class="tds">剩余本金总额</td><td>{{details.residualAmount}}</td>
							<td class="tds">未到期本金</td><td>{{details.outstandingPrincipal}}</td>
						</tr>
						<tr>
							<td class="tds">到期利息总计</td><td>{{details.interestDue}}</td>
							<td class="tds">罚息</td><td>{{details.penalty}}</td>
							<td class="tds">诉讼费</td><td>{{details.litigationFee}}</td>
							<td class="tds">收车费</td><td>{{details.collectFare}}</td>
						</tr>
						<tr>
							<td class="tds">未偿催收工本费</td><td>{{details.withoutFee}}</td>
							<td class="tds">付款日</td><td>{{details.datePayment}}</td>
							<td class="tds">最近一次还款金额</td><td>{{details.latestRepayment}}</td>
							<td class="tds">最近一次还款日期</td><td>{{details.latestDate}}</td>
						</tr>
						<tr>
							<td class="tds">核销状态</td><td>{{details.stateVerification}}</td>
							<td class="tds">本次逾期天数</td><td>{{details.overdueDays}}</td>
							<td class="tds">本期逾期天数</td><td>{{details.numberOverdue}}</td>
							<td class="tds">逾期应收款总计</td><td>{{details.overdueReceivables}}</td>
						</tr>
						<tr>
							<td class="tds">ET结算金额</td><td>{{details.loanProducts}}</td>
							<td class="tds">贷款产品</td><td colspan="2">{{details.loanProducts}}</td>
							<td class="tds">贷款车型</td><td colspan="3">{{details.loanCar}}</td>
						</tr>
					</table>
				</div>
			
			</el-collapse-item>
			<el-collapse-item title="还款账号列表" name="2">
				<div>
					<el-table :data="lists" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe>					
					<el-table-column :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" align="center" >
					</el-table-column>

					</el-table>
				</div>
			</el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>

//import NProgress from 'nprogress'
import { getdeal } from "@/api/tablist";

 export default {
    data() {
		return {
			activeNames: ['1','2'],
			details: [],
			lists: [],
			cols: [
			{title:'更新日期',field:'updateDate'},
            {title:'还款人',field:'repayments'},
            {title:'银行账号',field:'bankAccount'},
    		{title:'银行名称',field:'bankName'},
            {title:'支行名称',field:'bankBranch'},

			],
			id:this.$store.state.navTabs.tabId,
			listLoading: false,
		};
		},
		methods: {
			    //获取列表
				getlists() {
					let para = {
						 missionId: this.$route.params.id
					};
					this.listLoading = true;
					//NProgress.start();
					getdeal(para).then(res => {

						let data=res.data.result;				
						  this.lists =data.contractBanks;
						
						// this.cols = res.data.cols;
						 this.details = data;
						this.listLoading = false;
						//NProgress.done();
					});
				},
		},
		mounted() {
    	this.getlists();
    	 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   this.$refs.abc.style.height= h+"px"
  	}
  }
</script>

<style>
	/* .el-row {
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
   		min-height: 28px;
		line-height: 28px;
  	}
	.el-col-4{
		padding: 0;
	} */
	 /* #ht_table{border-collapse: collapse;border:none} */
	.ht_table td{color:#269aff;font-size: 13px } 
	.ht_table .tds{color: #000;} 
</style>