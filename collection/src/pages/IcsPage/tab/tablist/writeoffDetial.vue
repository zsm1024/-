<template>
  <section ref="abc" style="overflow-y: auto;">
      <el-collapse v-model="activeNames" >
			<el-collapse-item title="核销数据" name="1">
				<div>
					<table class="ht_table">	
						<tr>
							<td class="tds">已核销本金总额</td><td>{{details.writeOffPrincipal}}</td>
							<td class="tds">已核销利息总额</td><td>{{details.writeOffInterest}}</td>		
							<td class="tds">已核罚息</td><td>{{details.writeOffPenalty}}</td>							
						</tr>
						<tr>
							<td class="tds">已核费用</td><td>{{details.writeOffFee}}</td>
							<td class="tds">核销总额</td><td>{{details.writeOffTotalAmount}}</td>
							<td class="tds">核销日期</td><td>{{details.writeOffDate}}</td>
						</tr>
					</table>
				</div>			
			</el-collapse-item>
          <el-collapse-item title="核销后还款" name="2" style="position:relative">
			  <table  class="ht_table"  ref="writeoff" :model="writeoff">
				<tr>
					
					<td class="tds">核销后还款金额</td><td>{{details.repaymentAmountAfterWo}}</td>
					<td class="tds">剩余本金总额</td><td>{{details.residualPrincipal}}</td>		
					<td class="tds">剩余利息总额</td><td>{{details.residualInterest}}</td>							
				</tr>
				<tr>
					<td class="tds">核销前罚息总额</td><td>{{details.penaltyAmountBeforeWo}}</td>
					<td class="tds">核销前费用总额</td><td>{{details.feeAmountBeforeWo}}</td>
					<td class="tds">核销后罚息总额</td><td>{{details.penaltyAmountAfterWo}}</td>
				</tr>
				<tr>
					<td class="tds">合同利率</td><td>{{details.rate}}</td>
					<td class="tds">核销后是否追偿</td>
					<td colspan="3">
						<input type="text" readonly v-model="details.isRecourse">
					</td>
				</tr>
				<tr>
					<td class="tds">催收状态</td><td colspan="5">
            		<span>曾进行过的催收状态</span>
						<el-checkbox-group v-model="writeoff.b" @change="changes" readonly>
							<el-checkbox v-for="(col,index ) in coList" :label="col.name" readonly :value="col.field" :key="index"></el-checkbox>
						</el-checkbox-group>
					</td>
				</tr>
				<tr>
					<td class="tds">核销原因</td>
					<td colspan="5">
						<el-input   readonly v-model="writeoff.c"  type="textarea"></el-input>
					</td>
				</tr>
			  </table>
			</el-collapse-item>
      </el-collapse>
  </section>
</template>
<script>

//import NProgress from 'nprogress'
import { writeOffDetail } from "@/api/writeoff";

 export default {
    data() {
		return {
			activeNames: ['1','2'],
			details: [],
			lists: [],
			cols: [
			{title:'冲账后本金',field:'updateDate'},
            {title:'冲账后利息',field:'repayments'},
            {title:'冲账后费用',field:'bankAccount'},
    		{title:'WCS产生利息',field:'bankName'},
            {title:'日期',field:'bankBranch'},
			],
			checkList:[],
			coList: [
				{name:'电催',field:'updateDate'},
				{name:'实地',field:'repayments'},
				{name:'外包',field:'bankAccount'},
				{name:'收车',field:'bankName'},
				{name:'诉讼（立案）',field:'bankName'},
				{name:'拍卖',field:'bankName'},
			],
			writeoff:{
				a: "",
				b: [],
				c: "",
			},
			id:this.$store.state.navTabs.tabId,
			listLoading: false,
		};
		},
		methods: {
			changes(val){
				this.writeoff.payDepositTime=val;
			},
			    //获取列表
			getlists() {
				let para = {
					missionId: this.$route.params.id
				};
			this.listLoading = true;
			writeOffDetail(para).then(res => {
				let data=res.data.result;				
						//   this.lists =data.contractBanks;
            this.details = data;
            this.writeoff.a=data.isRecourse;
            this.writeoff.b=data.afpStates;
            this.writeoff.c=data.writeOffReason
            this.listLoading = false;          
	        });
        },
        addInfos(){
          
        }
		},
		mounted() {
	
    	this.getlists();
    	 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   this.$refs.abc.style.height= h+"px"
  	}
  }
</script>

<style scoped>

</style>

<style scoped>
.ht_table td{color:#269aff;font-size: 13px } 
.ht_table .tds{color: #000;} 

.ht_table input, .ht_table select{
  height:25px;
  width:98%!important;
  border-radius: 4px;
  border: 1px solid #bfcbd9
}
</style>
