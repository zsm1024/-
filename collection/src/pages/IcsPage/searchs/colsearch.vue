<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.applicationNumber" placeholder="合同号" clearable style="width:130px"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="当事人" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.documentType" placeholder="证件类型" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.documentNum" placeholder="证件号" clearable style="width:200px"></el-input>
                </el-form-item>
				<el-form-item>
                  <el-input v-model="filters.appNum" placeholder="申请号" clearable style="width:630px"></el-input> 
					<!-- <el-select v-model="filters.appNum" multiple filterable style="width:630px"  placeholder="申请号" >
						<el-option v-for="(item,index) in appNumList" :key="index" :label="item.label" :value="item.value" ></el-option>
					</el-select> -->
                </el-form-item>
				<el-form-item>
                    <el-button type="primary"  @click="getlists" size="mini" class="buttons" >查询</el-button>
                </el-form-item>                
                <el-form-item>
                
                </el-form-item>
            </el-form>
			<el-form :inline="true" style="margin-bottom:10px">
				<el-button class="buttons" type="primary" size="mini"  @click="writeoffExport()">核销清单导出</el-button>
				<el-button class="buttons" type="primary" size="mini" @click="ourterExport()">外包派案情况导出</el-button>
				<el-button class="buttons" type="primary" size="mini" @click="listExport()">催收记录导出</el-button>
				<el-button class="buttons" type="primary" size="mini" @click="FilesExport()">附件下载</el-button>

			</el-form>
        </el-col>
        <!--列表-->
        <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange"   style="width: 100%;" stripe border>
            <el-table-column type="selection" align="center" fixed="left"></el-table-column>
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                     <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+scope.row.id}">详情</router-link> 
                      <!-- <router-link class="a-href" :to="{path:'/searchs/123'}">详情</router-link> -->
                </template>
            </el-table-column>
            <el-table-column  align="center" :prop="col.field" sortable :label="col.title" :width="col.width"  v-for="(col, index) in cols" :key="index" >
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[50, 100,500,1000,2000]"   :total="total"  style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
	//import NProgress from 'nprogress'
	import { getcontractInfos,exportWoBill,getAppNumAll } from '@/api/collmanage';
	import {path} from '@/config'
	export default {
		data() {
			return {
				filters: {
					applicationNumber:'',
					name:"",
					documentType:"",
					documentNum:"",
					appNum:""
				},
				listsArray:[],
				heights:0,
				lists: [],
				listPath:"",
				cols: [
                 	{ title: '姓名', field: 'name', },
					{ title: '合同号', field: 'applicationNumber', },
					{ title: '申请号', field: 'appNum', width: "150" },  			
					{ title: '贷款产品', field: 'loanProducts', width: "150" },
					{ title: '贷款车型', field: 'loanCar', width: "150" },
					{ title: '付款日期', field: 'datePayment' },
					{ title: '证件类型', field: 'documentType',width: "100"  },
					{ title: '证件号', field: 'documentNum',width: "150" },				
					{ title: '合同状态', field: 'state'  },

                ],
				total: 0,
				pagesize:500,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				appNumList:[]
				
				

			}
		},
		methods: {
			 handleSelectionChange(val){        
             this.multipleSelection=val;
        	},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getlists();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getlists();
            },
            
           
			//获取列表
			getlists() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-230	;
				this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize,
					applicationNumber:this.filters.applicationNumber,
					name:this.filters.name,
					documentType:this.filters.documentType,
					documentNum:this.filters.documentNum,
					appNum:this.filters.appNum
					
				};
				this.listLoading = true;
				//NProgress.start();
				getcontractInfos(para).then((res) => {
					this.total = res.data.result.recordsTotal;
					this.lists = res.data.result.data;
					// res.data.result.data.forEach(el => {
					// 	this.appNumList.push({'value':el.appNum,'label':el.appNum})
					// });
					this.cols = this.cols;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			listExport(){
				this.listsArray=[];
				this.multipleSelection.forEach(el =>{
					this.listsArray.push(el.appNum)
				});
				this.listsArray=this.listsArray.toString()
				let as =this.listPath + "/wo/exportAfpRecord?appNums=" +this.listsArray;
				window.open(this.listPath + "/wo/exportAfpRecord?appNums=" +this.listsArray )
				// window.open()
			},
			writeoffExport(){
				this.listsArray=[];
				this.multipleSelection.forEach(el =>{
					this.listsArray.push(el.appNum)
				});
				this.listsArray=this.listsArray.toString()
				window.open(this.listPath + "/wo/exportWoBill?appNums=" +this.listsArray )
			},
			ourterExport(){
				this.listsArray=[];
				this.multipleSelection.forEach(el =>{
					this.listsArray.push(el.appNum)
				});
				this.listsArray=this.listsArray.toString()

				window.open(this.listPath + "/wo/exportOsBill?appNums=" +this.listsArray )
			},
			FilesExport(){
				this.listsArray=[];
				this.multipleSelection.forEach(el =>{
					this.listsArray.push(el.appNum)
				});
				this.listsArray=this.listsArray.toString()
				let as =this.listPath + "/wo/exportFile?appNums=" +this.listsArray;
				window.open(this.listPath + "/wo/exportFile?appNums=" +this.listsArray )
			},
		getAppNumAlls(){
			getAppNumAll().then(res =>{
				if(res.data.success){
					let datas=res.data.result
					this.appNumList= datas;
				}else{
					console.log(res.data.message)	
				}				
			})	
		}
			
			
		},
		mounted() {
			this.getlists();
			this.listPath=path.api;
			
        }
    }
</script>

<style scoped>
.buttons{
	padding:4px 10px
}
</style>