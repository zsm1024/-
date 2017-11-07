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
                <el-form-item>
					<el-select v-model="formInline.region" placeholder="请选择" @change="handleOptionChange">
                    <el-option label="合同号" value="合同号"></el-option>
                    <el-option label="派单时间" value="派单时间"></el-option>
                    <el-option label="当事人"  value="当事人间"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" >查询</el-button>
				</el-form-item>				
			</el-form>  
        </el-col>  
    <!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" border style="width: 100%;">
			<el-table-column label="操作" width="80" fixed="left" >
				<template slot-scope="scope">
					<el-button type="text" size="small" align="center" @click="DealFile(scope.$index, scope.row)">处理</el-button>
				</template>
			</el-table-column>
			<el-table-column type="index" width="60" fixed="left" >
			</el-table-column>
			<el-table-column :prop="cols.field" :label="cols.title" :width="cols.width" v-for="(cols, index) in cols" :key="index" align="center" >
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
	import { getUserListPage} from '../../api/api';
	export default {
		data() {
			return {
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
				users: [],
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
				let para = {
					page: this.page,
					name: this.filters.name,
					val:this.pagesize,
					SelectOption:this.SelectOption
			
				};
				 this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			DealFile(index,row){
				var indexlink = "tabView";
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "tabView";
				let component = resolve => require([`@/pages/tab/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
                    label: '处理详情页',
					name: indexlink,
					disabled: false,
					closable: true,
					component: component
                })

			}		
		},
		mounted() {
			this.getUsers();
		}
	}
</script>
<style>	
</style>

