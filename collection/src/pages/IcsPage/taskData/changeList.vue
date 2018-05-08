<template>
<section ref="abc" style="height:100%">
    <el-form :model="filters" inline>
        <el-form-item>
			<el-input v-model="filters.name" placeholder="当事人" clearable style="width:150px"></el-input>
	  </el-form-item>
	  <el-form-item>
			<el-input v-model="filters.applicationNumber" placeholder="合同号"  clearable style="width:150px"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="filters.overdueDays" placeholder="逾期天数"  clearable style="width:150px"></el-input>
		</el-form-item>
          <el-form-item>
            <el-input v-model="filters.processer" placeholder="用户ID"  clearable style="width:150px"></el-input>           
        </el-form-item>
        <el-form-item>
            <el-date-picker v-model="value6" 
					type="daterange" 
					range-separator="至" 				
					placeholder="请选择约会时间区域" 				
					@change="dataChange"
					>
					</el-date-picker>
            <!-- <el-input v-model="filters.appointmentTime" placeholder="约会日期"  clearable style="width:150px"></el-input> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="listShow()" style="padding:7px 9px">查询</el-button>
        </el-form-item>
    </el-form>
    
    <!-- @selection-change="handleSelectionChange" -->
     <el-form :model="AdduserForms" ref="AdduserForm" inline>
        <el-form-item label="请选择:" id="city_pre" >
             <el-select v-model="AdduserForms.areaList" placeholder="请选择队列" @change="getMessage1" >
            <el-option v-for="item in options2" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="AdduserForms.positionId" placeholder="请选择岗位" @change="getMessage" >
            <el-option v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="AdduserForms.stateCode" placeholder="人员" @change="getMessages" >
            <el-option v-for="item in options1" :key="item.id" :label="item.nickname" :value="item.id"></el-option>
          </el-select>
		</el-form-item>      
        <!-- <el-form-item label="协办人姓名"> -->
           <!-- <el-autocomplete v-model="state" :fetch-suggestions="querySearch" size="small"  placeholder="请输入协办人姓名"  @select="handleSelect" class="autoInput" style="width:150px">
            </el-autocomplete> -->
      <!-- </el-form-item> -->
       <!-- <el-form-item label="协办到期日">
           <el-date-picker type="date" placeholder="选择日期" v-model="escrowTime" style="width: 150px;" @change="dataChanges" ></el-date-picker>  
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="small" @click="hostList()" style="padding:7px 9px">转换队列</el-button>
        <!-- <el-button type="primary" size="small" @click="cancelhostList()" style="padding:7px 9px">取消</el-button> -->
       </el-form-item>
    </el-form>                       
   <el-table :data="datas" :max-height="heights" style="width:100% ;margin-top:5px;" highlight-current-row border  @selection-change="handleSelectionChange"  v-loading="listLoading"  element-loading-text="加载中...">
       <el-table-column type="selection" align="center" fixed="left"></el-table-column>
       <el-table-column sortable :prop="cols.field" :label="cols.title"   v-for="(cols, index) in cols" :key="index" align="center" >
		</el-table-column>     
   </el-table>
   <!--工具条-->
	<el-col :span="24" class="toolbar">			
		<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page" :page-size="pagesize"  :page-sizes='[100,200,500,1000,2000]' :total="total" style="float:right;">
		</el-pagination>
	</el-col>
    <el-dialog  title="取消协办" :visible.sync="cancelhost">
         <el-form inline ref="multipleTable">
            <el-form-item label="用户ID">
                 <el-autocomplete v-model="state1" :fetch-suggestions="querySearchs" size="small"  placeholder="请输入用户ID"  @select="handleSelect" class="autoInput" style="width:100%">
            </el-autocomplete>
            </el-form-item>
            <el-form-item >
                <el-button style="padding:10px 15px"  @click="toggleSelection()" >取 消</el-button>
                <el-button type="primary" style="padding:10px 15px" @click="cancel()">确 定</el-button> 
            </el-form-item>
         </el-form>
    <!-- <!-- <el-table :data="addList" border height="400" @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column  type="selection" aline="center" ></el-table-column>
       <el-table-column v-for="(item,index) in cols1" :key="index" :prop="item.field" :label="item.title" aline="center" ></el-table-column>
    </el-table> -->
  <!-- <div slot="footer" class="dialog-footer">
    <el-button style="padding:10px 15px"  >取 消</el-button>
   <el-button type="primary" style="padding:10px 15px" @click="addChange()">确 定</el-button> 
  </div> --> 
</el-dialog>  
</section>
</template>
<script >
import {authlist,} from "@/api/basedata";
import { turnQueue,cancelEscrow,getTaskHostUser1,positionUser,listTurnQueue} from '@/api/task';
import { getAuthUser,getAuthtree,sysPositionslistAll} from "@/api/auth";
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
          file:[],
          state:'',
          state1:"",
          items:"",
          a:[],
          b:[],
          itemsId:0,
          addlists:[],
        //   userList:[],
        //   userLists:[],
          options: [],
          options1: [],
           options2: [],
           treedata:[],
          cancelhost:false,
          multipleSelection:[],   
          cols: [   { title: '用户ID', field: 'processer', width: "60" },
                    { title: '目标催收员', field: 'turnUser', width: "60" },
                    // { title: '协办到期日', field: 'escrowTime', width: "60" },
                    { title: '案件状态', field: 'turnStatus', width: "60" },
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
				pagesize:1000,
                currentPage:1,
                listLoading: false, 
                filters: {					
					name: '',
					applicationNumber:"",
					overdueDays:"",
					appointmentTime:"",
					processer:"",
					startTime:"",
					endTime:"",
                },
                 AdduserForms: {
                    positionId: "",
                    stateCode: "",
                    areaList:""
                },
      }
  },
  methods: {
      dataChange(val){			
		this.times2=val.split("至").pop();
		this.times1=val.split("至").shift();
     	},
    //   dataChanges(val){
    //        this.times=val;
    //   },
    //   querySearch(queryString,cb){
    //       let data =this.restaurants;
    //       let results = queryString ? data.filter(this.createFilter(queryString)) :data;
    //       cb(results) 
    //   },
      getMessage(val) {
      this.AdduserForms.areaCode = val;
      let para={
       positionId:this.AdduserForms.positionId
        };
         positionUser(para).then(res => {
            // this.AdduserForms.positionId="";
            this.options1=[];
            let data = res.data.result;
            this.options1 = data; 
        });
       
    },
    getMessage1(val) {
      this.AdduserForms.areaList = val;
    //  this.getUser();
    //  this.getAllList()
    },
    getMessages(val) {
      this.AdduserForms.stateCode = val;
    //  this.getUser();
    //  this.getAllList()
    },
      querySearchs(queryString,cb){
          let datas =this.file;
          let files = queryString ? datas.filter(this.createFilters(queryString)) :datas;
          cb(files) 
      },
        createFilters(queryString){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
          }
      },
      createFilter(queryString){
          return(item) =>{
               return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0)
          }
      },
      //获取所有队列
      getDl_AllList(){
      authlist().then(res => {
         this.options2 = res.data.result;
         // this.listLoading = false;
        });
      },
       
    getlists(){
        // this.restaurants=this.userList;
        // this.file=this.userLists; 
        this.listShow();
        let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-210;
        this.heights=h;
        // this.getTaskUser();
        // this. getTaskUser1()

    },  
    // getTaskUser(){
    //      getTaskHostUser().then((res) => {
    //          let data =res.data.result;
    //          this.a=data;
    //          this.a.forEach(el => {
    //              this.userList.push({"value":el.nickname,"id":el.id})
    //          });
    //         //  this.datas=data.data;
    //         // this.total=data.recordsTotal;
    //     })
    // },
    // getTaskUser1(){
    //      getTaskHostUser1().then((res) => {
    //          let data =res.data.result;
    //          this.userLists.splice(0,this.userLists.length)
    //          data.forEach(el => {
    //                 this.userLists.push({"value":el.username,"id":el.id})      
    //          });
            
    //         //  this.datas=data.data;
    //         // this.total=data.recordsTotal;
    //     })
    // },
     handleSelectionChange(val){        
            this.multipleSelection=val;
        },
    hostList(){
        this.addlists=[];
        this.multipleSelection.forEach(f =>{
               this.addlists.push(f.id);             
        });
            this.b=[]
            for(let i=0;i< this.multipleSelection.length;i++){
                if( this.multipleSelection[i].lockFlag!="null"||this.multipleSelection[i].lockFlag=="Y"){
                   this.b.push(this.multipleSelection[i].lockFlag)                  
                }
            } 
             if(this.b.indexOf("N",0)==-1){
                    let para={
                        turnUser:this.AdduserForms.stateCode,
                        missionIds:this.addlists,
                        // escrowTime: this.times,
                        // status:"1",
                        queueId: this.AdduserForms.areaList,
                    }
                    if(this.AdduserForms.stateCode==""||this.AdduserForms.areaList==""|| this.addlists.length==0){          
                        this.$alert('请选择用户ID或转队列案件！','提示',{
                                confirmButtonText:'确定',
                                type:'warning',
                                center:'true'
                        })
                    }else{
                         turnQueue(para).then( res=>{
                            this.listShow()
                         }) 
                    }
                }else{
                   this.$alert('请选未申请的案件！','提示',{
                                confirmButtonText:'确定',
                                type:'warning',
                                center:'true'
                        }) 
                }     
       
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
			overdueDays:this.filters.overdueDays,
			appointmentTime:this.filters.appointmentTime,
			startTime:this.times1,
            endTime:this.times2	,
            username:this.filters.processer,													
        };
        this.listLoading = true;
        listTurnQueue(para).then((res) => {
            let data =res.data.result;           
            this.datas=data.data;
            console.log(data)
            this.total=data.recordsTotal;
            this.listLoading = false;
        });
         //获取岗位信息
         sysPositionslistAll().then(res => {
                this.options = res.data.result;
            });
            





        //  getTaskHostUser().then((res) => {
        //      this.userList=[];
        //      let data =res.data.result;
        //      this.a=data;
        //      this.a.forEach(el => {
        //          this.userList.push({"value":el.nickname,"id":el.id})
        //      });
        //     this.restaurants=this.userList;
        //     this.file=this.userLists;
        //     //  this.datas=data.data;
        //     // this.total=data.recordsTotal;
        // })
    },
    handleSelect(item){
       this.items=item.value;
       this.itemsId=item.id;      
    },
    cancelhostList(){
        this.cancelhost=true;
        this.getTaskUser1();
    },
     toggleSelection(){
        this.cancelhost=false;
    },
    cancel(){
        let para={
            id:this.itemsId
        }
    //    cancelEscrow(para).then(res =>{
    //        this.cancelhost=false;
    //        this.userLists.splice(0,this.userLists.length) 
    //        this.getlists();
    //    })
    }
},
  mounted () {
    this.listShow();
     this.getDl_AllList()
    // this.getTaskUser1();
   
    // this.getTaskUser();
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

