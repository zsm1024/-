<template>
    <section ref="abc" style="overflow-y: auto;">
        <el-col  :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input  v-model="filters.osCompanyName" placeholder="外包公司名称" style="width:140px"></el-input>
				</el-form-item>
				<el-form-item>
           <el-select  v-model="filters.isPay" placeholder="是否已付">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
                <el-option label="全部显示" value=""></el-option>
						</el-select>
				</el-form-item>
				<el-form-item>
          <el-date-picker style="width:140px" v-model="filters.payMonthStart" @change="payMonthStart" type="month" value-format="yyyy-MM-dd" placeholder="开始月份"></el-date-picker>
          <el-date-picker style="width:140px" v-model="filters.payMonthEnd" @change="payMonthEnd" type="month" value-format="yyyy-MM-dd" placeholder="结束月份"></el-date-picker>
					<!-- <el-input v-model="filters.payMonthStart" placeholder="开始月份" style="width:140px"></el-input> -->
          <!-- <el-input v-model="filters.payMonthEnd" placeholder="结束月份" style="width:140px"></el-input> -->
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getlists" size="mini" style="padding:10px 15px">查询</el-button>
				</el-form-item>				
			</el-form>  
        </el-col>  
        	<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" :fit="true" style="width: 100%;" stripe  >
          <el-table-column label="操作"  align="center" width="100" fixed> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" show-overflow-tooltip sortable :width="col.width" >
					<template slot-scope="scope">							
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
            <span v-show="scope.row.edit" v-if="col.field!='payMonth'&&col.field!='isValid'&&col.field!='isPay'" >{{ scope.row[col.field] }}</span>
              <el-select v-show="scope.row.edit" class="comSty" v-if="col.field=='isPay'" v-model="scope.row[col.field]" placeholder="请选择">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
              <el-select v-show="scope.row.edit" class="comSty" v-if="col.field=='isValid'" v-model="scope.row[col.field]" placeholder="请选择">
								<el-option label="否" value="0"></el-option>
								<el-option label="是" value="1"></el-option>
							</el-select>
              <el-date-picker v-show="scope.row.edit" class="comSty" v-if="(col.field=='payMonth')" v-model="scope.row[col.field]" @change="payMonth" type="month" value-format="yyyy-MM" placeholder="付款月份"></el-date-picker>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[20,30, 50, 100,500,1000,2000]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>		
    </section>
</template>
<script>
import { commissionlist,  updateCommission,} from "@/api/basedata";
export default {
  data() {
    return {
      total: 0,
      heights: 0,
      pagesize:30,
      page: 1,
      listLoading: false,
      lists: [],
      formLabelWidth: "140px",
      cols: [
        { title: "申请号", field: "appNum",width:'180px' },
        { title: "外包公司名称", field: "osCompanyName",width:'200px' },
        { title: "委案周期", field: "entrustCycle",width:'200px' },
        { title: "佣金方式", field: "mode" },
        { title: "收回金额", field: "recoveryAmount" },
        { title: "费率", field: "rate" },
        { title: "结算佣金", field: "commission" },     
        // { title: "是否控车", field: "isControlCar" },
        { title: "是否已付", field: "isPay" },
        { title: "付款月份", field: "payMonth" },
        { title: "是否有效", field: "isValid" },
      ],
      filters: {					
					osCompanyName: '',
					isPay:"0",
					payMonthStart:"",
					payMonthEnd:"",
				},
    };
  },
  methods: {
    payMonthStart(val){
      this.filters.payMonthStart=val
    },
    payMonthEnd(val){
      this.filters.payMonthEnd=val
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    payMonth(val){
      
      // this.payMonth=val
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 240;
      this.heights = h;
      if(this.filters.isPay=="是"){
        this.filters.isPay="1"
      }
      if(this.filters.isPay=="否"){
         this.filters.isPay="0"
      }
      
      let para = {
        page: this.page,
        pageSize: this.pagesize,
        osCompanyName:this.filters.osCompanyName,
				isPay:this.filters.isPay,
				payMonthStart:this.filters.payMonthStart,
				payMonthEnd:this.filters.payMonthEnd,

      };
      this.listLoading = true;
      commissionlist(para).then(res => {
        let data = res.data.result;
        this.lists = data.data;
        for(let i=0;i<this.lists.length;i++){
          if(this.lists[i].isValid==0){
            this.lists[i].isValid="否"
          }
          if(this.lists[i].isValid==1){
            this.lists[i].isValid="是"
          }         
          if(this.lists[i].isPay==0){
            this.lists[i].isPay="否"
          }
          if(this.lists[i].isPay==1){
            this.lists[i].isPay="是"
          }        
        }
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
        this.total = data.recordsTotal;
        this.listLoading = false;
      });
    },
    Edit(row) {   
       if(row.isValid=="否"){
            row.isValid="0"
          }
          if(row.isValid=="是"){
            row.isValid="1"
          }         
          if(row.isPay=="否"){
             row.isPay="0"
          }
          if( row.isPay=="是"){
             row.isPay="1"
          } 
      let para = row;
      if ((row.edit = !row.edit)) {
        return;
      } else {
        updateCommission(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.getlists()
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员！"
            });
          }
        });
      }
    }, 
  },
  mounted() {
    this.getlists();
    let h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 155;
    this.$refs.abc.style.height = h + "px";
  }
};
</script>
<style>
.comSty .el-input__inner {
  height: 30px !important;
}
</style>
 