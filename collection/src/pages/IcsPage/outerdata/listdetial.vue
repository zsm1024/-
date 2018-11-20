<template>
<section ref="abc" style="height:100%;overflow:hidden">
    <el-form inline >        
        <el-form-item label="预派案公司">
           <el-autocomplete v-model="state" :fetch-suggestions="querySearch" size="small"  placeholder="请输入派案公司"  @select="handleSelect" class="autoInput" style="width:150px" clearable >
            </el-autocomplete>
      </el-form-item>
       <el-form-item label="预派案到期日">
           <el-date-picker type="date" placeholder="选择日期" v-model="escrowTime" style="width: 130px;" @change="dataChanges" ></el-date-picker>  
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="hostList()" style="padding:7px 9px">派案</el-button>
        <!-- <el-button type="primary" size="small" @click="cancelhostList()" style="padding:7px 9px">退案</el-button> -->
       </el-form-item>
    </el-form>                       
   <el-table :data="datas" :max-height="heights" style="width:100% ;margin-top:5px;" highlight-current-row border  @selection-change="handleSelectionChange"  v-loading="listLoading"  element-loading-text="加载中..." >
       <el-table-column type="selection" align="center" fixed="left"></el-table-column>
       <el-table-column  :prop="cols.field" :label="cols.title" sortable show-overflow-tooltip  v-for="(cols, index) in cols" :key="index" align="center" >
		</el-table-column>     
   </el-table>
   <!--工具条-->
	<el-col :span="24" class="toolbar">			
		<el-pagination layout="total, sizes,prev, pager, next,jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"  :current-page.sync="page" :page-size="pagesize"  :page-sizes='[100,200,500,1000,2000]' :total="total" style="float:right;">
		</el-pagination>
	</el-col>
    <el-dialog  title="取消代管" :visible.sync="cancelhost">
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
</el-dialog>  
</section>
</template>
<script >
import {
  SendListdetail,
  changeTheSendCaseApp,
  getTaskHostUser
} from "@/api/outerlist";
import {
  getTaskHostList,
  addhostList,
  cancelEscrow,
  getTaskHostUser1
} from "@/api/task";
export default {
  data() {
    return {
      escrowTime: "",
      heights: 0,
      datas: [],
      times: "",
      value6: "",
      times1: "",
      times2: "",
      restaurants: [],
      file: [],
      state: "",
      state1: "",
      items: "",
      a: [],
      willSendCompany: "",
      itemsId: "",
      addlists: [],
      userList: [],
      userLists: [],
      cancelhost: false,
      multipleSelection: [],
      cols: [
        { title: "用户ID", field: "processer", width: "60" },
        { title: "预派案公司", field: "willSendCompany", width: "60" },
        { title: "派案到期日", field: "deadTimeOfTheSendCase", width: "60" },
        { title: "委托金额", field: "entrustMoney", width: "60" },
        { title: "委托逾期天数", field: "entrustOverDueDays", width: "60" },
        { title: "委托逾期金额", field: "overdueReceivables", width: "60" },
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
        { title: "最近行动代码", field: "actSign", width: "120" },
        { title: "最近行动时间", field: "inputTime", width: "120" },
        { title: "贷款金额", field: "loanAmount", width: "90" },
        { title: "未偿本金", field: "residualAmount", width: "90" },
        { title: "派单时间", field: "createTime", width: "120" },
        { title: "核销状态", field: "check_statues", width: "100" },
        { title: "收车状态", field: "car_statues", width: "100" }
      ],
      total: 0,
      page: 1,
      pagesize:500,
      currentPage: 1,
      listLoading: false,
      filters: {
        name: "",
        applicationNumber: "",
        overdueDays: "",
        appointmentTime: "",
        processer: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  methods: {
    dataChange(val) {
      this.times2 = val.split("至").pop();
      this.times1 = val.split("至").shift();
    },
    dataChanges(val) {
      this.times = val;
    },
    querySearch(queryString, cb) {
      let data = this.restaurants;
      let results = queryString
        ? data.filter(this.createFilter(queryString))
        : data;
      cb(results);
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
    getlists() {
      // this.restaurants=this.userList;
      // this.file=this.userLists;
      this.listShow();
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 200;
      this.heights = h;
      // this.getTaskUser();
      // this. getTaskUser1()
    },
    getTaskUser() {
      getTaskHostUser().then(res => {
        let data = res.data.result;
        this.a = data;
        this.a.forEach(el => {
          this.userList.push({ value: el.nickname, id: el.id });
        });
        //  this.datas=data.data;
        // this.total=data.recordsTotal;
      });
    },
    getTaskUser1() {
      getTaskHostUser1().then(res => {
        let data = res.data.result;
        this.userLists.splice(0, this.userLists.length);
        data.forEach(el => {
          this.userLists.push({ value: el.username, id: el.id });
        });

        //  this.datas=data.data;
        // this.total=data.recordsTotal;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    hostList() {
      this.addlists = [];
      this.multipleSelection.forEach(f => {
        this.addlists.push({
          id: f.id,
          entrustMoney: f.entrustMoney,
          entrustOverDueDays: f.entrustOverDueDays
        });
      });
      let para = {
        // missionInfos:[],
        willSendCompany: this.itemsId,
        //  ids:this.addlists,
        missionInfos: this.multipleSelection,
        deadTimeOfTheSendCase: this.times
        // status:"1",
      };
      if (this.items == "" || this.addlists.length == 0) {
        this.$alert("请选择派案公司、到期日和或外派案件！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        });
      } else {
        changeTheSendCaseApp(para).then(res => {
          this.listShow();
          this.itemsId = "";
          this.state = "";
          this.escrowTime = "";
          this.times = "";
          // this.itemsId="";
          // this.times="";
        });
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
    listShow() {
      let para = {
        willSendCompany: localStorage.getItem("willSendCompany"),
        page: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;
      SendListdetail(para).then(res => {
        let data = res.data.result;
        this.datas = data.data;
        this.datas.forEach(element => {
						element.overdueDays=parseInt(element.overdueDays)

							
					});	
        this.total = data.recordsTotal;
        this.listLoading = false;
      });
      getTaskHostUser().then(res => {
        this.userList = [];
        let data = res.data.result;
        this.a = data;
        this.a.forEach(el => {
          this.userList.push({
            value: el.nickname,
            id: el.id,
            username: el.username
          });
        });
        this.restaurants = this.userList;
        this.file = this.userLists;
        //  this.datas=data.data;
        // this.total=data.recordsTotal;
      });
    },
    handleSelect(item) {
      this.items = item.value;
      console.log(item);
      this.itemsId = item.username;
    },
    cancelhostList() {
      this.cancelhost = true;
      this.getTaskUser1();
    },
    toggleSelection() {
      this.cancelhost = false;
    },
    cancel() {
      let para = {
        id: this.itemsId
      };
      cancelEscrow(para).then(res => {
        this.cancelhost = false;
        this.userLists.splice(0, this.userLists.length);
        this.getlists();
      });
    }
  },
  mounted() {
    this.listShow();
    this.willSendCompany = localStorage.getItem("willSendCompany");
    // this.getTaskUser1();

    // this.getTaskUser();
    let h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 95;
    this.heights = h;
    // console.log(this.heights)
    this.$refs.abc.style.height = h + "px";
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
/* .el-table .cell {
  padding: 0 !important;
  white-space: nowrap;
} */
</style>

