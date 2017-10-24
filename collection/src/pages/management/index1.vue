<template>
	<div id="index1" >
		<h4>逾期2至5天电催队列</h4>
		<table >
			<thead>
					<tr style="border: 1px solid #000;">
						<td>#</td>
						<td>当事人</td>
						<td>合同号</td>
						<td>职业</td>
						<td>逾期天数</td>
						<td>逾期金额</td>
						<td>贷款产品</td>
						<td>车型</td>
						<td>约会日期</td>
						<td>区域</td>
						<td>省份名称</td>
						<td>城市名称</td>
						<td>行动代码</td>
						<td>行动时间</td>
						<td>贷款金额</td>
						<td>未尝本金</td>
						<td>派单时间</td>
						<td>核销状态</td>
						<td>收车状态</td>
					</tr>
			</thead>
			<tbody >			
					<tr v-for="b in items" style="border: 1px solid #000;">
						<td>{{b.statue}}</td>
						<td>{{b.name}}</td>
						<td>{{b.Cnum}}</td>
						<td>{{b.Occupation}}</td>
						<td>{{b.days}}</td>
						<td>{{b.past_due}}</td>
						<td>{{b.Loan_Product}}</td>
						<td>{{b.Loan_Car}}</td>
						<td>{{b.Special_Date}}</td>
						<td>{{b.Region}}</td>
						<td>{{b.Provice}}</td>
						<td>{{b.City}}</td>
						<td>{{b.M_Code}}</td>
						<td>{{b.M_Time}}</td>
						<td>{{b.Loan_Amount}}</td>
						<td>{{b.No_Principal}}</td>
						<td>{{b.Post_Time}}</td>
						<td>{{b.Write_State}}</td>
						<td>{{b.Receive_State}}</td>
					</tr>
	
			</tbody>
		</table>
		
			<!--<el-table style="width: 100%;" >
				
				<el-table-column  prop="b.statue" :label="b.statue">
					
					
				</el-table-column>
				
			</el-table>-->
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				items:[]
			}
			
		},
		created:function(){
			this.List1();
		},
		methods:{
			List1:function(){
			var that =this;
			this.$http.get('http://localhost:3000/list')
			.then(function(ret) {
				var data=ret.data;
				this.items=data[0].list[0].P_list1;				
				console.log()
				})
			}
			
			
		}	
	}
</script>

<style>
	#index1{
		padding: 10px;
	}
	table{
		border-collapse:collapse ;
		width:100%;
	}
	tr,td{
		border: 1px solid #000;
	}
</style>