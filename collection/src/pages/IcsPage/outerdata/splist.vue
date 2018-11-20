<template>
<section ref="abc" style="height:100%;overflow:hidden">
    <el-form inline >        
      <el-form-item>
        <el-button type="primary" size="small" @click="hostList()" style="padding:7px 9px">批准</el-button>
        <el-button type="primary" size="small" @click="cancelhostList()" style="padding:7px 9px">拒绝</el-button>
       </el-form-item>
    </el-form>                       
   <el-table :data="datas" :max-height="heights" style="width:100% ;margin-top:5px;" highlight-current-row border  @selection-change="handleSelectionChange"  v-loading="listLoading"  element-loading-text="加载中..." >
       <el-table-column type="selection" align="center" fixed="left"></el-table-column>
       <el-table-column label="操作"  align="center" >
			<template  slot-scope="scope">
				<router-link class="a-href" :to="{path:'/IcsPage/outerdata/listdetial'}" ><span @click="clickDetail(scope.row)">详情</span></router-link>
			</template>
		</el-table-column>
       <el-table-column  :prop="cols.field" :label="cols.title" sortable  v-for="(cols, index) in cols" show-overflow-tooltip :key="index" align="center" >
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
import {listApproveOsCase,sendTheCaseApp,approveSendCaseApp} from '@/api/outerlist';     
import { getTaskHostList,getTaskHostUser,addhostList,cancelEscrow,getTaskHostUser1} from '@/api/task';
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
          itemsId:0,
          addlists:[],
          userLists:[],
          multipleSelection:[],   
           cols: [   
                    { title: '预派案公司', field: 'willSendCompany', width: "60" },
                    { title: '数量', field: 'caseAmount', width: "60"},
                    { title: '委托金额', field: 'entrustMoneys', width: "60" },
                    { title: '委托逾期金额', field: 'overdueTotals', width: "80" },
                    ],
				total: 0,
				page: 1,
				pagesize:500,
                currentPage:1,
                listLoading: false, 
      }
  },
  methods: {
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
    hostList(){
        this.addlists=[];
        this.multipleSelection.forEach(f =>{
               this.addlists.push(f.willSendCompany);
            });          
        let para={
            // missionInfos:[],
            approveOperation:"agreement",
            //  ids:this.addlists,
            willSendCompanys:this.addlists.toString(),
            // deadTimeOfTheSendCase: this.times,
            // status:"1",
        }
        if(this.addlists.length==0){          
             this.$alert('请选择待派案案件！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
        }else{
             approveSendCaseApp(para).then( res=>{ 
                     this.listShow() 
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
    clickDetail(item){
        localStorage.setItem("willSendCompany",item.willSendCompany)        
    }, 
    listShow(){       
        let para = {
			page: this.page,
            pageSize:this.pagesize,											
        };
        this.listLoading = true;
        listApproveOsCase(para).then((res) => {
            let data =res.data.result;           
            this.datas=data.data;
            this.datas.forEach(element => {
                element.caseAmount=parseInt(element.caseAmount)               
            });
            this.total=data.recordsTotal;
            this.listLoading = false;
        });
         
       
    },

    cancelhostList(){
        this.addlists=[];
        this.multipleSelection.forEach(f =>{
               this.addlists.push(f.willSendCompany);
            });          
        let para={
            // missionInfos:[],
            approveOperation:"refused",
            //  ids:this.addlists,
             willSendCompanys:this.addlists.toString(),
            // deadTimeOfTheSendCase: this.times,
            // status:"1",
        }
        if(this.addlists.length==0){          
             this.$alert('请选择用户ID或代管案件！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
        }else{
             approveSendCaseApp(para).then( res=>{ 
                this.listShow()
             }) 
        }


        
    },

},
  mounted () {
    this.listShow();
    // this.getTaskUser1();
   
    // this.getTaskUser();
    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-95;
   this.heights=h;
    // console.log(this.heights)
    this.$refs.abc.style.height= h+"px";
  }
}
</script>
<style>
    table{width: 100%;text-align: center;}
	tr{width: 100%;}
	td{border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;height:23px!important;line-height: 23px!important;background: #f0f0f0;}
    /* .el-table .cell{padding: 0!important;white-space:nowrap}; */
</style>

