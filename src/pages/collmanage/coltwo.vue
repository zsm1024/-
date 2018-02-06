<template>
    <section>
        <el-col  :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.Cnum" placeholder="合同号"></el-input>
				</el-form-item>
                <!-- <el-form-item>
					<el-select v-model="formInline.region" placeholder="请选择" @change="handleOptionChange">
                    <el-option label="合同号" value="合同号"></el-option>
                    <el-option label="派单时间" value="派单时间"></el-option>
                    <el-option label="当事人"  value="当事人间"></el-option>
                    </el-select>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" >查询</el-button>
				</el-form-item>				
			</el-form>  
        </el-col>  
    <!--列表-->
		<el-table :data="users2" :max-height="heights" highlight-current-row v-loading="listLoading" border style="width: 100%;">
			<el-table-column label="操作" width="80" fixed="left">
				<template slot-scope="scope">
					 <router-link class="a-href" :to="{path:'/tab/tabview/'+scope.row.id}">处理</router-link>
				</template>
			</el-table-column>
			<el-table-column type="index" width="60" sortable >
			</el-table-column>
			<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center">
			</el-table-column>
		
		</el-table>
        
		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page"  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    </section>
</template>
<script>

	//import NProgress from 'nprogress'
	import { getcoltwo} from '@/api/collmanage';
	export default {
		data() {
			return {
				heights:0,
               formInline:{
                    user:"",
                    region:""
                },
				filters: {					
					name: '',
					Cnum:"",
					Occupation:"",
					days:"",
					past_due:"",
					Loan_Product:"",
					Loan_Car:"",
					Special_Date:"",
					Region:"",
					Provice:"",
					City:"",
					M_Code:"",
					M_Time:"",
					Loan_Amount:"",
					No_Principal:"",
					Post_Time:"",
					Wrte_State:"",
					Receive_Statl:""

				},
				users2: [],
				cols: [],
				total: 0,
				page: 1,
				pagesize:10,
				currentPage:1,
				SelectOption:"",
				listLoading: true,
				sels: [],//列表选中列
				tpageSize:20
            }           
		},
		watch:{
			pageSize:"changeSize"
		},
		methods: {
			changeSize(){
				this._data.tpageSize=this.pageSize;
			},
			handleCurrentChange(val) {
                this.pages = val;
				this.getUsers();
            },
            handleSizeChange(val) {
			this.pagesize = val  
			this.getUsers();     
			},
			handleOptionChange(val) {
				 this.SelectOption=val;
				 this.getUsers();
            },
			//获取用户列表
			getUsers() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
        		this.heights=h;
				let para = {
					page: this.page,
					name: this.filters.name,
					val:this.pagesize,
					SelectOption:this.SelectOption
			
				};
				 this.listLoading = true;
				//NProgress.start();
				getcoltwo(para).then((res) => {
					this.total = res.data.total;
					this.users2 = res.data.users;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});				
			},
				
		},
		mounted() {
			this.getUsers();
		}
	}
</script>
<style>
	
</style>

