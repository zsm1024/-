<template>
	<section>
		<div>
			<h4>催收状态</h4>
			<p>{{items.statues}}</p>
		</div>
		<div>
			<h4>客户联系信息</h4>
			<el-table :data="items.persons" border>
				<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
			</el-table-column>			
			</el-table>
		</div>
		<div>
			<h4>客户基本信息</h4>
			<table>
				<tr>
					<td>客户姓名</td><td>{{items.username}}</td>
					<td>性别</td><td>{{items.sex}}</td>
					<td>单位名称</td><td class="useraddress">{{items.useraddress}}</td>
					<td>证件类别</td><td>{{items.usercardType}}</td>
					<td>证件号码</td><td>{{items.usercardNum}}</td>
				</tr>
			</table>
		</div>
		<div>
			<h4>合同基本信息</h4>
			<table>	
				<tr>
					<td>客户姓名</td><td>{{items.username}}</td>
					<td>性别</td><td>{{items.sex}}</td>
					<td>单位名称</td><td class="useraddress">{{items.useraddress}}</td>
					<td>证件类别</td><td>{{items.usercardType}}</td>
					<td>证件号码</td><td>{{items.usercardNum}}</td>
				</tr>
			</table>
		</div>
		<div>
			<h4>逾期基本信息</h4>
			<table>
				<tr>
					<td>客户姓名</td><td>{{items.username}}</td>
					<td>性别</td><td>{{items.sex}}</td>
					<td>单位名称</td><td class="useraddress">{{items.useraddress}}</td>
					<td>证件类别</td><td>{{items.usercardType}}</td>
					<td>证件号码</td><td>{{items.usercardNum}}</td>
				</tr>
			</table>
		</div>
			<div>
			<h4>话术指引</h4>
			<p>{{items.remarkMessage}}</p>
			</table>
		</div>
	</section>
</template>

<script>
import { tab_view } from "@/api/api";
export default {
  data() {
    return {
      items: [],
      cols:[]
    };
  },
  methods: {
    getlist() {
      tab_view().then(res => {
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
	p{border: 1px solid #dfe6ec;height: 20px;padding: 10px;}
	table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border: 1px solid #dfe6ec;height: 30px;line-height: 30px;width: 30px;}	
	.useraddress{width: 150px;}
</style>