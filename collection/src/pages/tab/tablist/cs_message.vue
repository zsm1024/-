<template>
	<section>
		<el-collapse v-model="activeNames">
			<el-collapse-item name="1" title="催收状态">				
				<p>{{items.statues}}</p>				
			</el-collapse-item>	
			<el-collapse-item name="2" title="客户联系信息">	
				<el-table :data="items.persons" border >
					<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
					</el-table-column>			
				</el-table>				
			</el-collapse-item>	
			<el-collapse-item name="3" title="客户基本信息">
				<table>
					<tr>
						<td>客户姓名</td><td>{{items.username}}</td>
						<td>性别</td><td>{{items.sex}}</td>
						<td>单位名称</td><td class="useraddress">{{items.useraddress}}</td>
						<td>证件类别</td><td>{{items.usercardType}}</td>
						<td>证件号码</td><td>{{items.usercardNum}}</td>
					</tr>
				</table>
			</el-collapse-item>	
			<el-collapse-item name="4" title="合同基本信息">
				<table>	
					<tr>
						<td>申请号</td><td>{{items.delyNum}}</td>
						<td>合同号</td><td>{{items.contractNum}}</td>
						<td>首付比例</td><td>{{items.ShoufuRatio}}</td>
						<td>贷款金额</td><td>{{items.loan}}</td>
						<td>合同起始日</td><td>{{items.startTime}}</td>
					</tr>
					<tr>
						<td>贷款产品</td><td>{{items.loanProdut}}</td>
						<td>付款日</td><td>{{items.RepayTime}}</td>
						<td>贷款期限</td><td>{{items.loanTime}}</td>
						<td> </td><td></td>
						<td>合同终止日</td><td>{{items.endTime}}</td>
					</tr>
				</table>
			</el-collapse-item>	
			<el-collapse-item name="5" title="逾期基本信息">
				<table>
					<tr>
						<td>客户姓名</td><td>{{items.username}}</td>
						<td>性别</td><td>{{items.sex}}</td>
						<td>单位名称</td><td class="useraddress">{{items.useraddress}}</td>
						<td>证件类别</td><td>{{items.usercardType}}</td>
						<td>证件号码</td><td>{{items.usercardNum}}</td>
					</tr>
				</table>
			</el-collapse-item>	
			<el-collapse-item name="6" title="话术指引">			
				<p>{{items.remarkMessage}}</p>
			</el-collapse-item>	
		</el-collapse>		

	</section>
</template>

<script>
import { tab_view } from "@/api/api";
export default {
  data() {
    return {
    	activeNames:["1","2","3","4","5","6"],
     	items: [],
     	cols:[],
     	id:this.$store.state.navTabs.tabId,
    };
  },
  methods: {
    getlist() {
    	let para = {
			id: this.id
		};
      tab_view(para).then(res => {
        let data = res.data.msg[0]
        this.items = data.data[0];
        this.cols=data.cols;
      });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style>
	
	h4{background: #eef1f6;padding: 10px;border: 1px solid #dfe6ec;font-weight: bold;}
	table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border: 1px solid #dfe6ec;height: 50px;line-height: 50px;background: #f0f0f0;}	
	.useraddress{width: 150px;}
	.el-collapse-item__header{
		font-size:15px;
		font-weight: bold;
		background:#dfe6ec;
		border: 1px solid #f0f0f0;
	}
</style>