<template>
	<section>
		<div>
			<h4>催收状态</h4>
			<label>{{items.statues}}</label>
		</div>
		<div>
			<h4>客户联系信息</h4>
			<el-table :data="items.persons" border>
				<el-table-column prop="persontype" label="角色" width="90" align="center"></el-table-column>
				<el-table-column prop="name" label="姓名" width="90" align="center"></el-table-column>
				<el-table-column prop="phoneNum" label="电话" width="130" align="center"></el-table-column>		
				<el-table-column prop="address" label="地址" width="160" align="center"></el-table-column>
				<el-table-column prop="m_path" label="信息来源" width="100" align="center"></el-table-column>
				<el-table-column prop="validity" label="有效性" width="100" align="center"></el-table-column>
			</el-table>
		</div>
		<div>
			<h4>客户联系信息</h4>
			<table>
				<tr>
					<td>客户姓名</td>
					<td>{{items.username}}</td>
					<td>1</td>
					<td>1</td>
					
				</tr>
			</table>
		</div>
	</section>
</template>

<script>
import { tab_view } from "@/api/api";
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    getlist() {
      tab_view().then(res => {
        let data = res.data.msg[0]
        this.items = data;
        console.log(data)
      });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style>
</style>