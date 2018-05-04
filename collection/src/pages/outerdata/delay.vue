<template>
<section ref="abc" style="height:100%;">
    <!-- @selection-change="handleSelectionChange" -->
    <el-form :model="filters" :inline="true">
         <el-form-item>
			<el-input v-model="filters.name" placeholder="当事人" clearable style="width:120px"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="filters.applicationNumber" placeholder="合同号"  clearable style="width:120px"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="filters.overdueDays" placeholder="逾期天数"  clearable style="width:120px"></el-input>
		</el-form-item>
        <!-- <el-form-item>
            <el-input v-model="filters.appointmentTime" placeholder="约会日期"  clearable style="width:150px"></el-input>
        </el-form-item>  -->
         <el-form-item>
            <el-input v-model="filters.processer" placeholder="用户ID"  clearable style="width:120px"></el-input>           
        </el-form-item>
        <el-form-item> 
            <el-date-picker v-model="value6" 
				type="daterange" 
				range-separator="至" 				
				placeholder="请选择约会时间区域" 				
				@change="dataChange">
			</el-date-picker>
		</el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="listShow()" style="padding:7px 9px">查询</el-button>
        </el-form-item>
    </el-form>
    <el-form :inline="true" >              
					<!-- 
					<el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择约会时间区域" 				
					@change="dataChange"
					>
					</el-date-picker> -->
				<!-- </el-form-item> -->
                <el-form-item>
                    <el-form-item label="延案到期日">
                        <el-date-picker type="date" placeholder="选择日期" v-model="escrowTime" style="width: 150px;" @change="dataChanges" ></el-date-picker>  
                    </el-form-item>
                    <!-- <el-autocomplete v-model="state" :fetch-suggestions="querySearch" size="small"  placeholder="请输入待分配人员姓名"  @select="handleSelect" class="autoInput" style="width:150px">
                    </el-autocomplete> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="hostList()" style="padding:7px 9px">延案</el-button>
                </el-form-item>
    </el-form>
           

      <!--       -->
   <el-table :data="datas"  style="width:100% ;margin-top:5px;" highlight-current-row border :max-height="this.heights"  @selection-change="handleSelectionChange"  v-loading="listLoading"  element-loading-text="加载中...">
       <el-table-column type="selection" align="center" fixed="left"></el-table-column>
       <el-table-column  :prop="cols.field" :label="cols.title"  v-for="(cols, index) in cols" :key="index" align="center" show-overflow-tooltip>
		</el-table-column>
        
   </el-table>
   <!--工具条-->
	<el-col :span="24" class="toolbar">			
		<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page" :page-size="pagesize"  :page-sizes='[100,200,500,1000,2000]' :total="total" style="float:right;">
		</el-pagination>
	</el-col>
</section>
</template>
<script >
import {delayList,delayTheCaseApp} from '@/api/outerlist';  
import {getTaskHostUser,leaveTheCaseApp} from '@/api/task';
export default {
  data(){
      return{  
          escrowTime:'',   
          heights:0,    
          datas: [],
          restaurants:[],
          state:'',
          items:"",
          value6:"",
		  times1:"",
		  times2:"",
          itemsId:0,
          addlists:[],
          userList:[],
          multipleSelection:[],   
          cols: [   { title: '用户ID', field: 'processer', width: "60" },
                    { title: '派案到期日', field: 'deadTimeOfTheSendCase', width: "60" },
					{ title: '姓名', field: 'name', width: "60" },
            		{ title: '合同号', field: 'applicationNumber', width: "80" },
                    { title: '职业', field: 'occupation', width: "90" },
                    // { title: '延案到期日', field: 'deadTimeOfTheSendCase', width: "150" },
           			{ title: '逾期天数', field: 'overdueDays', width: "75" },
                    { title: '逾期金额', field: 'overdueTotal', width: "80" },
                    { title: '委托逾期天数', field: 'entrustOverDueDays', width: "60" },
                     { title: '委托金额', field: 'entrustMoney', width: "60" }, 
                    { title: '委托逾期金额', field: 'overdueReceivables', width: "60" },
					{ title: '贷款产品', field: 'loanProducts', width: "180" },
					{ title: '贷款车型', field: 'car', width: "180" },
					{ title: '约会日期', field: 'appointmentTime', width: "150" },
					{ title: '区域', field: 'Region', width: "80" },
					{ title: '省份', field: 'province', width: "50" },
					{ title: '城市', field: 'city', width: "50" },
					{ title: '最近行动代码', field: 'M_Code', width: "140" },
					{ title: '最近行动时间', field: 'M_Time', width: "140" },
					{ title: '贷款金额', field: 'loanAmount', width: "90" },
					{ title: '未偿本金', field: 'residualAmount', width: "90" },
					{ title: '派单时间', field: 'updateTime', width: "150" },
					{ title: '核销状态', field: 'check_statues', width: "100" },
					{ title: '收车状态', field: 'car_statues', width: "100" },],
				total: 0,
				page: 1,
				pagesize:10,
                currentPage:1,
                listLoading: false, 
                labelWidth:"120px",
                filters: {					
					name: '',
					applicationNumber:"",
					overdueDays:"",
					appointmentTime:"",
					processer:"",
					startTime:"",
					endTime:"",
                },               
      }
  },
  methods: {
      dataChange(val){			
			this.times2=val.split("至").pop();
			this.times1=val.split("至").shift();
     	},
    //   querySearch(queryString,cb){
    //       var data =this.restaurants;
    //       var results = queryString ? data.filter(this.createFilter(queryString)) :data;
    //       cb(results) 
    //   },
      dataChanges(val){
           this.times=val;
      },
      createFilter(queryString){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
          }
      },
    getlists(){
        this.listShow();
        let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-500;
        this.heights=h;

    },  
    getTaskUser(){
        //  getTaskHostUser().then((res) => {
        //      this.userList=[];
        //      let data =res.data.result;
        //      data.forEach(el => {
        //          this.userList.push({"value":el.nickname,"id":el.id})
        //      });
        //      this.restaurants=this.userList;
        //     //  this.datas=data.data;
        //     // this.total=data.recordsTotal;
        // })
    },
     handleSelectionChange(val){        
            this.multipleSelection=val;
        },
    hostList(){
        this.addlists=[];
         let b=[]
        this.multipleSelection.forEach(f =>{
               this.addlists.push(f.id);           
            });            
            // for(let i=0;i< this.multipleSelection.length;i++){
            //     if( this.multipleSelection[i].lockFlag!=null){
            //         b.push(this.multipleSelection[i].lockFlag)                  
            //     }
            // }
            // console.log(b)
            //   if(b.length==0){
                      let para={
            // userId:this.itemsId,
                        missionIds:this.addlists,
                        // status:"2",
                        delayTime: this.times
                    }
                    if(this.escrowTime==""|| this.addlists.length==0){          
                        this.$alert('请选择延案日期或待延案案件！','提示',{
                                confirmButtonText:'确定',
                                type:'warning',
                                center:'true'
                        })
                    }else{
                        delayTheCaseApp(para).then( res=>{
                            this.listShow()
                            this.$alert('延案申请成功！','提示',{
                                confirmButtonText:'确定',
                                type:'success',
                                center:'true'
                            })
                            this.times="";
                            this.escrowTime=""
                            this.addlists=[];
                        }) 
                    }
            //    }else{
            //        this.$alert('请选未申请的案件！','提示',{
            //                     confirmButtonText:'确定',
            //                     type:'warning',
            //                     center:'true'
            //             })
            //    }   
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
        this.listLoading = true;
        let para = {
			page: this.page,
            pageSize:this.pagesize,
            name:this.filters.name,
			applicationNumber:this.filters.applicationNumber,
			overdueDays:this.filters.overdueDays,
			appointmentTime:this.filters.appointmentTime,
			startTime:this.times1,
            endTime:this.times2	,
            username:this.filters.processer,																
        };
        delayList(para).then((res) => {
            console.log(res)
            let data =res.data.result;
            this.datas=data.data;
            this.total=data.recordsTotal;
            this.listLoading = false;
        })
    },
    // handleSelect(item){
    //    this.items=item.value;
    //    this.itemsId=item.id
    // },
},
  mounted () {
    this.getlists();
    this.getTaskUser();
    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-210;
    this.heights=h;
    // console.log(this.heights)
    // this.$refs.abc.style.height= h+"px";
  }
}
</script>
<style>
    table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;height:23px!important;line-height: 23px!important;background: #f0f0f0;}
    .el-table .cell{padding: 0!important;white-space:nowrap};
</style>

