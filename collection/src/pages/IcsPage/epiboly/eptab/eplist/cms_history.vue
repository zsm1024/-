<template>
	<section ref="abc" style="overflow-y: auto;" id="cslist">
		<el-collapse v-model="activeNames" accordion >
			<el-collapse-item title="特殊备注" name="1">
				<span>{{spMarks}}</span>
			</el-collapse-item>			
		</el-collapse>
	</section>
</template>

<script>

import { getcmsdetails,getcmshistory,getcmsthr } from "@/api/tablist";

export default {
		data() {
			return {
				activeNames: ['1','4'],
				lists: [],
				cols: [
                    {title:'处理日期',field:'processingDate',width:"70"},
                    {title:'催收结果',field:'collectionResults',width:"100"},
                    {title:'承诺日期',field:'commitmentDate',width:"70"},
                    {title:'复催日期',field:'recoveryDate',width:"70"},
                    {title:'处理人',field:'handlePerson',width:"70"},
                    {title:'承诺金额',field:'amountCommitment',width:"70"},
                    {title:'实地状态',field:'fieldStatus',width:"70"},
                    {title:'实地日期',field:'fieldDate',width:"70"},
                    {title:'特殊案件标识',field:'specialIdentification',width:"70"},
                    {title:'代购标识',field:'purchasingLabel',width:"70"},
                    {title:'代购人姓名',field:'nameAgent',width:"70"},
                    {title:'代购人身份证',field:'purchasingId',width:"90"},
                    // {title:'催收备注',field:'afpRecord',width:"220"},
                    //  {title:'特殊备注',field:'spRecord',width:"70"},
                
                ],
				total: 0,
				pagesize:50,
				page: 1,
				id:this.$route.params.id,
				listLoading: false,
				liststwo: [],
				// colstwo: [
                //     {title:'费用描述',field:'costDescription',width:"70"},
                //     {title:'费用总计',field:'totalCost',width:"70"},
                //     {title:'豁免%',field:'exemption',width:"70"},
                //     {title:'豁免额',field:'exemptionAmount',width:"70"},
                //     {title:'核销额',field:'writeAmount',width:"70"},
                //     {title:'到期金额',field:'dueAmount',width:"70"},
                //     {title:'豁免日期',field:'exemptionDate',width:"70"},
                //     {title:'豁免人',field:'exemptionUser',width:"70"},
                // ],
				totaltwo: 0,
				pagetwo:1,
				pagesizetwo: 10,
				listLoadingtwo: false,
				liststhr: [],
				colsthr:[
					{title:'租期号',field:'rentalId',width:"70"},
                    {title:'费用总计',field:'overdueAmt',width:"70"},
                    {title:'豁免%',field:'chargeWaivePct',width:"70"},
                    {title:'豁免额',field:'chargeWaiveAmt',width:"70"},
                    {title:'核销额',field:'settleAmt',width:"70"},
                    {title:'净逾期额',field:'netOverdueAmt',width:"70"},
                    {title:'豁免日期',field:'waiveDte',width:"70"},
                    {title:'豁免人',field:'waivedBy',width:"70"},
				],
				totalthr: 0,
				pagethr:1,
				pagesizethr: 10,
				listLoadingthr: false,
				spMarks:'',
			}
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

			handleSizeChangetwo(val) {
				this.pagesizetwo = val;
				this.getliststwo();
			},
			handleCurrentChangetwo(val) {
				this.pagetwo = val;
				this.getliststwo();
			},
			
			handleSizeChangethr(val) {
				this.pagesizethr = val;
				this.getliststhr();
			},
			handleCurrentChangethr(val) {
				this.pagethr = val;
				this.getliststhr();
			},
			getlists() {
				let para = {
					missionId: this.$route.params.id,
					page: this.page,
					pageSize: this.pagesize,				
				};
				// this.listLoading = true;
				//NProgress.start();
				getcmshistory(para).then((res) => {
					let data=res.data.result
					this.total=data.recordsTotal;
					this.lists= data.data;
					this.spMarks=this.lists[0].spRecord;
					// this.lists.forEach(element => {
					// 	console.log(element[0])
					// });
					// this.listLoading = false;
					//NProgress.done();
				});
			},

			getliststwo() {
				let para = {
					missionId: this.$route.params.id,
					page: this.pagetwo,
					pageSize: this.pagesizetwo,					
				};
				this.listLoadingtwo = true;
				//NProgress.start();
				getcmsdetails(para).then((res) => {
					let data=res.data.result;
					this.totaltwo = data.recordsTotal;
					this.liststwo = data.data;
					this.listLoadingtwo = false;
					//NProgress.done();
				});
			},
			getliststhr() {
				let para = {
					missionId: this.$route.params.id,
					page: this.pagethr,
					pageSize: this.pagesizethr,					
				};
				this.listLoadingthr = true;
				//NProgress.start();
				getcmsthr(para).then((res) => {
					 let data=res.data.result;
					 this.totalthr = data.recordsTotal;
					 this.liststhr = data.data;
					 this.listLoadingthr = false;
					//NProgress.done();
				});
			},

		},
		mounted() {
			this.getlists();
			this.getliststwo();
			this.getliststhr();
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.abc.style.height= h+"px"
		}


}
</script>
