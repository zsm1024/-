<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input  clearable v-model="filters.province" placeholder="省"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.placeStorage" placeholder="停放地点" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.findingWays" placeholder="寻找方式" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.vehicleControlMechanism" placeholder="控车机构" clearable></el-input>
                </el-form-item>
                <el-form-item>
                     <el-date-picker v-model="filters.vehicleControlDate" 
					type="date"			
					placeholder="请选择控车日期" 				
					@change="dataChange"
                    clearable
					>
					</el-date-picker>
                    <!-- type="daterange" 
					range-separator="至"  -->
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.realizeMode" placeholder="变现情况" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.carSealUp" placeholder="车辆是否查封" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="getlists" >查询</el-button>
                </el-form-item>
                <el-form-item>
                
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe border>          
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                    <router-link class="a-href" :to="{path:'/IcsPage/cars/carsControlDetial/'+scope.row.id}">详情</router-link>
                    
                </template>
            </el-table-column>
            <el-table-column sortable align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" show-overflow-tooltip :width="col.width">
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"  style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
	//import NProgress from 'nprogress'
	import { ControlVehicle } from '@/api/monitor';

	export default {
		data() {
			return {
				filters: {
                    queueName:'',
                    province:"",
                    placeStorage:"",
                    findingWays:"",
                    vehicleControlMechanism:"",
                    vehicleControlDate:"",
                    realizeMode:"",
                    carSealUp:""
				},
			
				lists: [],
				cols: [
                    {title:'申请号',field:'appNum'},
                    {title:'姓名',field:'name'},
                    {title:'控车机构',field:'vehicleControlMechanism'},
                    {title:'控车日期',field:'vehicleControlDate'},
                    {title:'车辆是否查封',field:'carSealUp',width:"130"},
                    {title:'停放地点',field:'placeStorage'},
                    {title:'省份',field:'province'},
                    {title:'城市',field:'city'},
                    {title:'逾期天数',field:'overdueDays'},
                    {title:'剩余本金总额',field:'residualAmount',width:"130"},
                    {title:'车型',field:'loanCar'},
                    {title:'寻找方式',field:'findingWays'},
                    {title:'变现情况',field:'realizeMode'},
                    {title:'费用总计',field:'totalCost'},
                    {title:'费用支付情况',field:'costPayment'},

                ],
                id:"",
				total: 0,
				pagesize: 20,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				heights:0,
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
            dataChange(val) {
                this.filters.vehicleControlDate=val;
                this.times2 = val.split("至").pop();
                this.times1 = val.split("至").shift();
            },
        //获取url
        getUrl(){
              let str =window.location.href
              let indexs=str.lastIndexOf("\/");
              str =str.substring(indexs+1,str.length)
              this.id=str;
        },
			//获取列表
			getlists() {
			let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-190;
			this.heights=h;
				let para = {
					page: this.page,
                    pageSize: this.pagesize,
                    queueId:this.id,
                    province:this.filters.province,
                    placeStorage:this.filters.placeStorage,
                    findingWays:this.filters.findingWays,
                    vehicleControlMechanism:this.filters.vehicleControlMechanism,
                    vehicleControlDate:this.filters.vehicleControlDate,
                    realizeMode:this.filters.realizeMode,
                    carSealUp:this.filters.carSealUp,
                    // startTime: this.times1,
                    // endTime: this.times2,
                };
				this.listLoading = true;
				//NProgress.start();
				ControlVehicle(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					this.cols = this.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},		
		},
		mounted() {
            this.getUrl();
            this.getlists();
        }
    }
</script>

<style scoped>

</style>