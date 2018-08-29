<template>
   <section>
       <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.applicationNumber" placeholder="合同号" clearable style="width:130px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="客户姓名" clearable style="width:130px"></el-input>
                </el-form-item>                
                <el-form-item>
                    <el-button type="primary"  @click="getlists" size="mini" class="btns" >查询</el-button>
                    <el-button type="primary"   size="mini" class="btns" @click="exportList">导出</el-button>
                </el-form-item>
            </el-form>
       </el-col>
       <el-table :data="lists" :max-height="heights" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange"  style="width: 100%;" stripe border>
              <el-table-column type="selection" align="center" fixed="left" disabled></el-table-column>
             <el-table-column label="查看"  align="center" >
                <template  slot-scope="scope">
                   <router-link class="a-href"  type="primary" :to="{path:'/IcsPage/writeoff/writeoffMessage/'+scope.row.afpId}"> 查看</router-link> 
                </template>
             </el-table-column>                     
            <el-table-column  align="center" :prop="col.field" sortable :label="col.title" :width="col.width"  v-for="(col, index) in cols" :key="index" >
                <template slot-scope="scope">                    
                      <span v-show="!scope.row.edit"  v-if="col.field!='applicationNumber'">{{ scope.row[col.field] }}</span>
                      <router-link class="a-href" v-show="!scope.row.edit" v-if="col.field=='applicationNumber'" type="primary" :to="{path:'/IcsPage/tab/tabview/'+scope.row.missionId}"> {{ scope.row[col.field] }}</router-link> 
                </template>
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
import { writeOffList } from "@/api/writeoff";
import {path} from '@/config'
export default {
  data() {
    return {
      filters: {
        applicationNumber: "",
        name: "",
        documentType: "",
        documentNum: "",
        appNum: ""
      },
      heights: 0,
      lists: [],
      cols: [
        { title: "合同号", field: "applicationNumber",width: "150"  },
        { title: "经销商", field: "dealer",width: "200"  },  
        { title: "核销原因", field: "writeOffReason",width: "150" },
        { title: "核销后是否追偿", field: "isRecourse",width: "200" },
        { title: "客户姓名", field: "name"},
        { title: "省份", field: "province"},
        { title: "城市", field: "city"},
        { title: "贷款金额", field: "loanAmount" },
        { title: "逾期天数", field: "overdueDays" },
      ],
      total: 0,
      pagesize: 500,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      multipleSelection:[],
      listPath:"",
      listsStr:[],
    };
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

    //获取列表
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 230;
      this.heights = h;
      let para = {
        page: this.page,
        pageSize: this.pagesize,
        applicationNumber: this.filters.applicationNumber,
        name: this.filters.name,
        // documentType: this.filters.documentType,
        // documentNum: this.filters.documentNum,
        // appNum: this.filters.appNum
      };
      this.listLoading = true;
      //NProgress.start();
      writeOffList(para).then(res => {
        this.total = res.data.result.recordsTotal;
        this.lists = res.data.result.data;
        this.cols = this.cols;
        this.listLoading = false;
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
        //NProgress.done();
      });     
    },
     EditInfo(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    exportList(){
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach(element => {
        this.listsStr.push(element.afpId)
      });
      this.listsStr=this.listsStr.toString();
      let as=this.listPath + "/wo/exportWriteOffAccount?afpIds=" +this.listsStr;
      window.open(this.listPath + "/wo/exportWriteOffAccount?afpIds=" +this.listsStr )
      }else{
         this.$alert("请选择要导出的案件！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        })
      }
      
    }

  },
  mounted() {
    this.getlists();
    this.listPath=path.api
  }
};
</script>
  <style scoped>
   .btns{padding:6px}
</style>





