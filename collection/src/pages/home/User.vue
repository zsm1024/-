<template>
    <section>
        <el-col  :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item> -->
                <el-form-item>
					<el-select v-model="formInline.region" placeholder="请选择">
                    <el-option label="合同号" value="合同号"></el-option>
                    <el-option label="派单时间" value="派单时间"></el-option>
                    <el-option label="当事人"  value="当事人间"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>				
			</el-form>  
        </el-col>  
    <!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="合同号" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="age" label="职业" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="逾期天数" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="逾期金额" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="贷款产品" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="贷款车型" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="约会日期" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="区域" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="省份" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="城市" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="最近行动代码" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="最近行动时间" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="贷款金额" min-width="180" sortable>
			</el-table-column>
            <el-table-column prop="addr" label="未尝本金" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">处理</el-button>
				</template>
			</el-table-column>
		</el-table>
        
		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="sizes,prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size=" 10" :current-page="1"  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    </section>
</template>
<script>

	//import NProgress from 'nprogress'
	import { getUserListPage} from '../../api/api';

	export default {
		data() {
			return {
               formInline:{
                    user:"",
                    region:""
                },
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
			handleCurrentChange(val) {
                this.page = val;
				this.getUsers();
            },
            handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			}		
		},
		mounted() {
			this.getUsers();
		}
	}

</script>
