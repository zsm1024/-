<template>
	<section>
        <el-collapse v-model="activeNames" >
			<el-collapse-item title="各岗位任务数量" name="1">
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.station" placeholder="岗位名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"  @click="getlists" >查询</el-button>
						</el-form-item>
						<el-form-item>
						
						</el-form-item>
					</el-form>
				</el-col>
                <!--列表-->
                <el-table :data="lists" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe>
                    
                    <el-table-column label="操作"  align="center" >
                        <template  slot-scope="scope">
                            <el-button type="text" size="small" @click="addTab(scope.$index, scope.row)"  >详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" >
                    </el-table-column>
                </el-table>
       
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"  style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>
            <el-collapse-item title="各用户任务数量" name="2">
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.name" placeholder="用户名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="getliststwo" >查询</el-button>
						</el-form-item>
						<el-form-item>
						
						</el-form-item>
					</el-form>
				</el-col>
                <!--列表-->
                <el-table :data="liststwo" highlight-current-row v-loading="listLoadingtwo"  style="width: 100%;" stripe>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="操作"  align="center" >
                        <template  slot-scope="scope">
                            <el-button type="text" size="small" @click="addTabtwo(scope.$index, scope.row)"  >详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in colstwo" :key="index" >
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChangetwo" @size-change="handleSizeChangetwo" :page-size="pagesizetwo" :page-sizes="[10, 20, 50, 100]"   :total="totaltwo"  style="float:right;">
                    </el-pagination>
                </el-col>
            </el-collapse-item>
        </el-collapse>
	</section>
</template>

<script>
	
	//import NProgress from 'nprogress'
	import { stationtotal,userstationtotal } from '@/api/monitor';

	export default {
		data() {
			return {
				filters: {
					name: '',
					station:'',
				},
				activeNames: ['1','2'],
				lists: [],
				cols: [],
				total: 0,
				pagesize: 10,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				liststwo: [],
				colstwo: [],
				totaltwo: 0,
				pagetwo:1,
				pagesizetwo: 10,
				listLoadingtwo: false,
				

			}
		},
		methods: {
			addTab(index,row){
				
				var indexlink = "timedistribution";
				var label = '岗位任务实时分布监控';
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "timedistribution";
				let component = resolve => require([`@/pages/monitor/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
						label: label,
						name: indexlink,
						disabled: false,
						closable: true,
						component: component
					})

            },
            addTabtwo(index,row){
				
				var indexlink = "userdistribution";
				var label = '用户任务实时分布监控';
				this.$store.state.navTabs.tabId=row.id;
				this.$store.state.navTabs.activeTabName = "userdistribution";
				let component = resolve => require([`@/pages/monitor/${indexlink}`], resolve)
				if (this.$store.state.navTabs.tabList.filter(f => f.name == indexlink) != 0) {
					this.$store.state.navTabs.tabList = this.$store.state.navTabs.tabList.filter(f => f.name != indexlink);
				}
				this.$store.state.navTabs.tabList.push({
						label: label,
						name: indexlink,
						disabled: false,
						closable: true,
						component: component
					})

			},
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
			//获取列表
			getlists() {
				let para = {
					page: this.page,
					station: this.filters.station,
					pagesize: this.pagesize
				};
				this.listLoading = true;
				//NProgress.start();
				stationtotal(para).then((res) => {
					this.total = res.data.total;
					this.lists = res.data.data;
					this.cols = res.data.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			getliststwo() {
				let para = {
					id: this.id,
					page: this.pagetwo,
					name: this.filters.name,
					pagesize: this.pagesizetwo,
					
				};
				this.listLoadingtwo = true;
				//NProgress.start();
				userstationtotal(para).then((res) => {
					this.totaltwo = res.data.total;
					this.liststwo = res.data.data;
					this.colstwo = res.data.cols;
					this.listLoadingtwo = false;
					//NProgress.done();
				});
			},
			
			
		},
		mounted() {
            this.getlists();
            this.getliststwo();
		}
	}

</script>

<style >

</style>