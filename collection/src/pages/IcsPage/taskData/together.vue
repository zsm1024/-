<template>
<section ref="abc" style="height:100%">
    <el-form :model="filters" inline>
        <el-form-item>
			<el-input v-model="filters.name" placeholder="当事人" clearable  size="mini" style="width:100px"></el-input>
	  </el-form-item>
	  <el-form-item>
			<el-input v-model="filters.applicationNumber" placeholder="合同号" size="mini" clearable style="width:100px"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="filters.overdueDays" placeholder="逾期天数" size="mini" clearable style="width:100px"></el-input>
		</el-form-item>
          <el-form-item>
            <el-input v-model="filters.processer" placeholder="用户ID" size="mini" clearable style="width:150px"></el-input>           
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
        <el-select v-model="filters.userInfos" multiple filterable placeholder="请选择协办催收员" size="mini" class="checkmore" @change="colchange">
        <el-option
          v-for="item in userInfos"
          :key="item.id"
          :label="item.nickname"
          :value="item.username">
        </el-option>
        </el-select> 
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="listShow('filters')" style="padding:7px 9px">查询</el-button>
        </el-form-item>
    </el-form>
    
    <!-- @selection-change="handleSelectionChange" -->
     <el-form :model="AdduserForms" ref="AdduserForm" inline>
        <el-form-item label="请选择:" id="city_pre" >
             <el-select v-model="AdduserForms.areaList" placeholder="请选择队列" @change="getMessage1" style="width:120px">
            <el-option v-for="item in options2" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="AdduserForms.positionId" placeholder="请选择岗位" @change="getMessage" style="width:120px">
            <el-option v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="AdduserForms.stateCode" placeholder="人员" @change="getMessages" style="width:120px">
            <el-option v-for="item in options1" :key="item.id" :label="item.nickname" :value="item.id"></el-option>
          </el-select>
          <el-date-picker type="date" placeholder="协办到期日" v-model="coTime" style="width: 150px;" @change="dataChanges" ></el-date-picker>
		</el-form-item>       
      <el-form-item>
         <el-button type="primary" size="small" @click="addList" style="padding:7px 9px">新增</el-button>
        <el-button type="primary" size="small" @click="hostList" style="padding:7px 9px" :disabled="NoUse">协办</el-button>
        <el-button type="primary" size="small" @click="cancelhostList" style="padding:7px 9px">取消协办</el-button>
       </el-form-item>
       <el-table :data="allList" style="width:650px" max-height="90" :show-header="false" >
          <el-table-column  prop="coUser" label="队列" ></el-table-column>
          <el-table-column prop="position" label="岗位" ></el-table-column>
          <el-table-column prop="nickname" label="人员" ></el-table-column>
          <el-table-column prop="coTime" label="协办到期日" ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteListRow(scope.$index, allList,coVoList)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
       </el-table>
        <!-- <el-input type="textarea"  v-model="allList" placeholder="备注" style="width: 380px;"></el-input>  -->
       <el-form-item label="备注:">
      <el-input type="textarea"  v-model="AdduserForms.remarks" :rows="2" :maxlength="2000" placeholder="备注且不能超过2000字" style="width: 380px;"></el-input>  
    </el-form-item>
    </el-form>                       
   <el-table :data="datas" :max-height="heights" style="width:100% ;margin-top:5px;" highlight-current-row border  @selection-change="handleSelectionChange"  v-loading="listLoading"  element-loading-text="加载中...">
       <el-table-column type="selection" align="center" fixed="left" disabled></el-table-column>
       <el-table-column show-overflow-tooltip  sortable :prop="cols.field" :label="cols.title" :width="cols.width"  v-for="(cols, index) in cols" :key="index" align="center" >
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
import { authlist } from "@/api/basedata";
import {
  coMissionApp,
  cancelEscrow,
  getTaskHostUser1,
  listCoMission,
  positionUser,
  cancelCoUer
} from "@/api/task";
import { getAuthUser, getAuthtree, sysPositionslistAll,getUsersAll } from "@/api/auth";
export default {
  data() {
    return {
      coTime: "",
      heights: 0,
      datas: [],
      times: "",
      NoUse:true,
      value6: "",
      times1: "",
      times2: "",
      file: [],
      state: "",
      state1: "",
      items: "",
      a: [],
      b: [],
      itemsId: 0,
      addlists: [],
      cancleList: [],
      //   userList:[],
      //   userLists:[],
      options: [],
      options1: [],
      options2: [],
      treedata: [],
      userInfos:[],
      value5:[],
      k: [],
      ss:[],
      cancelhost: false,
      multipleSelection: [],
      cols: [
        { title: "用户ID", field: "processer", width: "60" },
        { title: "协办催收员", field: "coUser", width: "80" },
        { title: "协办到期日", field: "coTime", width: "80" },
        { title: "案件状态", field: "coStatus", width: "60" },
        { title: "姓名", field: "name", width: "60" },
        { title: "合同号", field: "applicationNumber", width: "80" },
        { title: "职业", field: "occupation", width: "90" },
        { title: "逾期天数", field: "overdueDays", width: "75" },
        { title: "逾期金额", field: "overdueTotal", width: "80" },
        { title: "贷款产品", field: "loanProducts", width: "150" },
        { title: "贷款车型", field: "car", width: "150" },
        { title: "约会日期", field: "appointmentTime", width: "80" },
        { title: "省份", field: "province", width: "50" },
        { title: "城市", field: "city", width: "50" },
        { title: "最近行动代码", field: "actSign", width: "160" },
        { title: "最近行动时间", field: "inputTime", width: "160" },
        { title: "贷款金额", field: "loanAmount", width: "90" },
        { title: "未偿本金", field: "residualAmount", width: "90" },
        { title: "派单时间", field: "createTime", width: "120" },
        { title: "核销状态", field: "check_statues", width: "100" },
        { title: "收车状态", field: "car_statues", width: "100" }
      ],
      total: 0,
      page: 1,
      pagesize: 1000,
      currentPage: 1,
      listLoading: false,
      filters: {
        name: "",
        applicationNumber: "",
        overdueDays: "",
        appointmentTime: "",
        processer: "",
        startTime: "",
        endTime: "",
        userInfos:"",
      },
      allList:[],
      AdduserForms: {
        positionId: "",
        stateCode: "",
        areaList:"",
        remarks:""
      },
      obj1:{},
      obj2:{},
      obj3:{},
      coVoList:[]
    };
  },
  methods: {
    colchange(val){
      //  this.ss=val      
    },
    //获取用户信息
    getuserInfos(){  
      getUsersAll().then(res => {
        this.userInfos=[],
         res.data.forEach(f=>{
           this.userInfos.push({"username":f.username,"nickname":f.nickname,"id":f.id})
         })    
      });
    },
    
    dataChange(val) {
      this.times2 = val.split("至").pop();
      this.times1 = val.split("至").shift();
    },
    dataChanges(val) {
      this.times = val;
    },
    getMessage(val) {
      this.AdduserForms.areaCode = val; 
       this.obj2 = this.options.find((item)=>{
        return item.id ===val;
      });  
      let para = {
        positionId: this.AdduserForms.positionId
      };
      positionUser(para).then(res => {
        this.options1 = [];
        let data = res.data.result;
        this.options1 = data;
      });
    },
    getMessage1(val) {
      this.AdduserForms.areaList = val;
      this.obj1 = this.options2.find((item)=>{
        return item.id ===val ;
      });
      //  this.getUser();
      //  this.getAllList()
    },
    getMessages(val) {
      this.AdduserForms.stateCode = val;
       this.obj3 = this.options1.find((item)=>{
        return item.id ===val ;
      });
      //  this.getUser();
      //  this.getAllList()
    },
    querySearchs(queryString, cb) {
      let datas = this.file;
      let files = queryString
        ? datas.filter(this.createFilters(queryString))
        : datas;
      cb(files);
    },
    createFilters(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    createFilter(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //获取所有队列
    getDl_AllList() {
      authlist().then(res => {
        this.options2 = res.data.result;
        
      });
    },
    getlists() {
      this.listShow();
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) -500;
        this.heights = h;

    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addList(){
      
      if(this.AdduserForms.stateCode&&this.AdduserForms.areaList&&this.AdduserForms.positionId){
         this.allList.push({coUser:this.obj1.queueName,position:this.obj2.position,nickname:this.obj3.nickname,coTime:this.times} )
         this.coVoList.push({coQueueId:this.AdduserForms.areaList,coTime:this.times,coUser:this.AdduserForms.stateCode})
         this.AdduserForms.areaList="";this.AdduserForms.positionId="";this.AdduserForms.stateCode="";this.coTime="";
       }else{
          this.$alert("请将队列/岗位/人员填写完整！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        });
        return;
       }
    },
    hostList() {
      this.addlists = [];
      this.multipleSelection.forEach((f, i) => {
        this.addlists.push(f.id);
      });
      this.b = [];
     this.multipleSelection.forEach((f,i)=>{
        if(f.turnStatus||f.turnStatus!=null||f.coStatus||f.coStatus!=null||f.backCaseStatus||f.backCaseStatus!=null||f.leaveStatus||f.leaveStatus!=null ){      
        this.b.push(f.coStatus)
        }
      })
      if(this.b.length>0){
          this.$alert("请选未申请的案件！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        });
      }else{
        this.NoUse = true;
         let para = {
          // coUser: this.AdduserForms.stateCode,
          missionIds: this.addlists,
          coVoList:this.coVoList,
          // coTime: this.times,
          status: "1",
          // queueId: this.AdduserForms.areaList,
          remarks:this.AdduserForms.remarks
         }
         if(this.addlists.length == 0||this.AdduserForms.remarks ==""||this.coVoList.length==0){
           this.$alert("请检查所选案件、备注、协办列表是否填写完整！", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            center: "true"
         })
         }else{
           coMissionApp(para).then(res => {
            this.AdduserForms.stateCode = "";
            this.AdduserForms.areaList = "";
            this.AdduserForms.remarks =="";
            this.AdduserForms.positionId=""
            this.times = "";
            this.coTime = "";
            this.addlists = [];
            this.NoUse = false;
            this.coVoList=[];
            this.allList=[];
            this.listShow();
          });
         }
      }
    },
    handleCurrentChange(val) {
      this.pages = val;
      this.getlists();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    listShow(filters) {
      let para = {
        page: this.page,
        pageSize: this.pagesize,
        name: this.filters.name,
        applicationNumber: this.filters.applicationNumber,
        overdueDays: this.filters.overdueDays,
        appointmentTime: this.filters.appointmentTime,
        startTime: this.times1,
        endTime: this.times2,
        username: this.filters.processer,
        userInfos:this.filters.userInfos.toString()
      };
      this.listLoading = true;
      listCoMission(para).then(res => {
        let data = res.data.result;
        this.datas = data.data;
        this.total = data.recordsTotal;
        this.listLoading = false;
        this.NoUse = false;
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
    handleSelect(item) {
      this.items = item.value;
      this.itemsId = item.id;
    },
    cancelhostList() {
      this.cancleList = [];
      this.multipleSelection.forEach((f, i) => {
        this.cancleList.push(f.id);
      });
      this.k = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (
          this.multipleSelection[i].coTime == null||this.multipleSelection[i].coStatus != null
        ) {
          this.k.push("NO");
        }
      }
      if (this.k.length==0) {
        let para = {
          ids: this.cancleList
        };
        cancelCoUer(para).then(res => {
          this.cancleList = [];
          this.listShow();
        });
      }else{
        this.$message({
            showClose: true,
          message: '存在不能取消协办的案件，请重新选择！',
          type: 'error'
        })
      }
    },
    toggleSelection() {
      this.cancelhost = false;
    },
    cancel() {
      let para = {
        id: this.itemsId
      };
      //    cancelEscrow(para).then(res =>{
      //        this.cancelhost=false;
      //        this.userLists.splice(0,this.userLists.length)
      //        this.getlists();
      //    })
    },
    deleteListRow(index, rows,item){
        rows.splice(index, 1);
        item.splice(index, 1);
    }
  },
  mounted() {
    this.listShow();
    this.getDl_AllList();
    this.getuserInfos()
    let h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 350;
    this.heights = h;
    // console.log(this.heights)
    // this.$refs.abc.style.height= h+"px";
  }
};
</script>
<style>
table {
  width: 100%;
  text-align: center;
}
tr {
  width: 100%;
}
td {
  border-right: 1px solid #dfe6ec;
  border-bottom: 1px solid #dfe6ec;
  height: 23px !important;
  line-height: 23px !important;
  background: #f0f0f0;
}
.checkmore .el-select__tags{max-width:100%!important}
</style>

