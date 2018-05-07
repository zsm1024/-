<template>
<section ref="abc" style="height:100%;overflow:hidden">
    <el-form :model="filters" inline>
        <el-form-item>
			<el-input v-model="filters.name" placeholder="当事人" clearable style="width:120px"></el-input>
	  </el-form-item>
	  <el-form-item>
			<el-input v-model="filters.applicationNumber" placeholder="合同号"  clearable style="width:120px"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="filters.startDueDays" placeholder="委托逾期天数"  clearable style="width:80px"></el-input>至
            <el-input v-model="filters.endDueDays" placeholder="委托逾期天数"  clearable style="width:80px"></el-input>
		</el-form-item>
          <el-form-item>
            <el-input v-model="filters.processer" placeholder="用户ID"  clearable style="width:120px"></el-input>           
        </el-form-item>
        <el-form-item>
            <el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择约会时间区域" 				
					@change="dataChange"
                    clearable                   
					>
					</el-date-picker>
            <!-- <el-input v-model="filters.appointmentTime" placeholder="约会日期"  clearable style="width:150px"></el-input> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="listShow()" style="padding:7px 9px">查询</el-button>
             <el-button type="primary" size="small" @click="hostList()" style="padding:7px 9px">导出</el-button>
             <el-button type="primary" size="small" @click="hostListAll()" style="padding:7px 9px">全部导出</el-button>
        </el-form-item>
    </el-form>
    <!-- <el-form inline >         -->
      <!-- <el-form-item> -->
       
         <!-- <el-button type="primary" size="small" style="padding:7px 9px" @click="toggleSelection">全部导出</el-button> -->
       <!-- </el-form-item> -->
       <!-- </el-form-item>
    </el-form>                        -->
   <el-table :data="datas" :max-height="heights" style="width:100% ;margin-top:5px;" highlight-current-row border  @selection-change="handleSelectionChange" @select-all="slelectall" ref="table" v-loading="listLoading"  element-loading-text="加载中..." >
       <!-- <el-table-column label="操作"  align="center" > -->

			<!-- <template  slot-scope="scope">
                <el-button  size="mini"  @click='phoneEdit(scope.row)'>导出</el-button> -->
				<!-- <a @click="clickDetail(scope.row)">下载</span> -->
			<!-- </template> -->
		<!-- </el-table-column> -->
        <el-table-column type="selection" align="center">
			</el-table-column>
       <el-table-column  :prop="cols.field" :label="cols.title"   v-for="(cols, index) in cols" show-overflow-tooltip :key="index" align="center" >
		</el-table-column>     
   </el-table>
   <!--工具条-->
	<el-col :span="24" class="toolbar">			
		<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page" :page-size="pagesize"  :page-sizes='[20,50,100,200,500,1000,2000]' :total="total" style="float:right;">
		</el-pagination>
	</el-col>
</section>
</template>
<script >
import {listApproveOsCase,sendTheCaseApp,approveSendCaseApp,SendList,excelImport,listOutsource,listAllExport} from '@/api/outerlist';     
import { getTaskHostList,getTaskHostUser,addhostList,cancelEscrow,getTaskHostUser1} from '@/api/task';
// import{Path} from "@/utils/path";
import {path} from '@/config'
export default {
  data(){
      return{  
          escrowTime:'',  
          heights:0,    
          datas: [],
          times:"",
          value6:"",
		  times1:"",
		  times2:"",
          restaurants:[],
          file:[],
          state:'',
          items:"",
          a:[],
          b:[],
          idsAllexport:"",
          idsAll:[],
          itemsId:0,
          addlists:[],
          userLists:[],
          multipleSelection:[],   
         cols: [   { title: '用户ID', field: 'processer', width: "60" },
                    { title: '预派案公司', field: 'willSendCompany', width: "60" },
                    { title: '预派案到期日', field: 'deadTimeOfTheSendCase', width: "60" },
                    { title: '委托金额', field: 'entrustMoney', width: "60" },
                    { title: '委托逾期天数', field: 'entrustOverDueDays', width: "60" },
                    { title: '委托逾期金额', field: 'overdueReceivables', width: "60" },
					{ title: '姓名', field: 'name', width: "60" },
            		{ title: '合同号', field: 'applicationNumber', width: "80" },
           			{ title: '职业', field: 'occupation', width: "90" },
           			{ title: '逾期天数', field: 'overdueDays', width: "75" },
					{ title: '逾期金额', field: 'overdueTotal', width: "80" },
					{ title: '贷款产品', field: 'loanProducts', width: "150" },
					{ title: '贷款车型', field: 'car', width: "150" },
					{ title: '约会日期', field: 'appointmentTime', width: "80" },
					{ title: '区域', field: 'Region', width: "80" },
					{ title: '省份', field: 'province', width: "50" },
					{ title: '城市', field: 'city', width: "50" },
					{ title: '最近行动代码', field: 'M_Code', width: "120" },
					{ title: '最近行动时间', field: 'M_Time', width: "120" },
					{ title: '贷款金额', field: 'loanAmount', width: "90" },
					{ title: '未偿本金', field: 'residualAmount', width: "90" },
					{ title: '派单时间', field: 'updateTime', width: "120" },
					{ title: '核销状态', field: 'check_statues', width: "100" },
					{ title: '收车状态', field: 'car_statues', width: "100" },],
				total: 0,
				page: 1,
				pagesize:20,
                currentPage:1,
                listLoading: false,
                exportPaths:"",
                filters: {					
					name: '',
					applicationNumber:"",
                    startDueDays:"",
                    endDueDays:"",
					appointmentTime:"",
					processer:"",
					startTime:"",
					endTime:"",
				}, 
      }
  },
  methods: {
      PathList(){
            this.exportPaths=path.exportPath;
        },
      dataChange(val){			
		this.times2=val.split("至").pop();
		this.times1=val.split("至").shift();
     	},
      dataChanges(val){
           this.times=val;
      },
        createFilters(queryString){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
          }
      },
    getlists(){
        this.listShow();
        let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-200;
        this.heights=h;

    },  
     handleSelectionChange(val){        
            this.multipleSelection=val;
        },
        slelectall(val){
          
        },
        toggleSelection(){
            for(let a=0;a<this.datas.length;a++){
                this.$refs.table.toggleRowSelection(this.datas[a],true)
                this.b.push(this.datas[a])                 
            }
       
        },
    hostList(item){       
        this.addlists=[];
        this.multipleSelection.forEach(f =>{
               this.addlists.push(f.id);
            }); 
        var ids = this.addlists.toString();
        window.open(this.exportPaths+ids)
    },
       hostListAll(item){   
           let para = {		
            name:this.filters.name,
			applicationNumber:this.filters.applicationNumber,
            startDueDays:this.filters.startDueDays,
            endDueDays:this.filters.endDueDays,
			appointmentTime:this.filters.appointmentTime,
			startTime:this.times1,
            endTime:this.times2	,
            username:this.filters.processer,	          													
        };
        this.listLoading = true;
        listAllExport(para).then((res) => {         
            let data =res.data.result; 
            this.idsAll=[];
             data.forEach(f=>{
                 this.idsAll.push(f.id)
                //  console.log(f.id)
             }) 
            //  console.log(this.idsAll)
            // this.datas=data.data;

            this.idsAllexport=this.idsAll.toString();         
            this.total=data.recordsTotal;
            this.listLoading = false; 
            window.open(this.exportPaths+this.idsAllexport)
        }); 
         
        // this.listShowExport() ; 
        // 
       
        //
        // this.addlists=[];
        // this.multipleSelection.forEach(f =>{
        //        this.addlists.push(f.id);
        //     }); 
        // var ids =   this.addlists.toString();
        // window.open(this.exportPaths+ids)
    },
    handleCurrentChange(val) {
        this.pages = val;
		this.getlists();
    },
    handleSizeChange(val) {
	    this.pagesize = val  
		this.getlists();     
    }, 
    listShow(){       
           let para = {
			page: this.page,
            pageSize:this.pagesize,
            name:this.filters.name,
			applicationNumber:this.filters.applicationNumber,
            startDueDays:this.filters.startDueDays,
            endDueDays:this.filters.endDueDays,
			appointmentTime:this.filters.appointmentTime,
			startTime:this.times1,
            endTime:this.times2	,
            username:this.filters.processer,	          													
        };
        this.listLoading = true;
        listOutsource(para).then((res) => {        
            let data =res.data.result;           
            this.datas=data.data;
            this.total=data.recordsTotal;
            this.listLoading = false;
        });
    },
    
    // cancelhostList(){
    //     this.addlists=[];
    //     this.multipleSelection.forEach(f =>{
    //            this.addlists.push(f.willSendCompany);
    //         });          
    //     let para={
    //         approveOperation:"refused",
    //          willSendCompanys:this.addlists.toString(),
    //     }
    //     if(this.addlists.length==0){          
    //          this.$alert('请选择用户ID或代管案件！','提示',{
    //                 confirmButtonText:'确定',
    //                 type:'warning',
    //                 center:'true'
    //           })
    //     }else{
    //          approveSendCaseApp(para).then( res=>{ 
    //             this.listShow()
    //          }) 
    //     }       
    // },
},
  mounted () {
    this.listShow();
    this.PathList();
    // this.listShowExport();
    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-95;
   this.heights=h;
    this.$refs.abc.style.height= h+"px";
  }
}
</script>
<style>
    table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;height:23px!important;line-height: 23px!important;background: #f0f0f0;}
    .el-table .cell{padding: 0!important;white-space:nowrap};
</style>

