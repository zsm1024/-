<template>
  <section ref="abc" style="overflow-y: auto;">
      <el-collapse v-model="activeNames" >
			<el-collapse-item title="合同详细信息" name="1">
				<div>
					<table class="ht_table">	
						<tr>
							<td class="tds">合同号</td><td>123</td>
							<td class="tds">客户姓名</td><td>123</td>		
							<td class="tds">核销标识</td><td>123</td>
							<td class="tds">核销后不再追偿标识</td><td >123</td>
							
						</tr>
						<tr>
							<td class="tds">转待核销时间</td><td>{{details.startTime}}</td>
							<td class="tds">CMS核销时间</td><td>{{details.endTime}}</td>
							<td class="tds">CMS核销本金</td><td>{{details.creteTime}}</td>
							<td class="tds">CMS核销利息</td><td>{{details.signTime}}</td>
						</tr>
						<tr>
							<td class="tds">CMS核销费用</td><td>{{details.loanAmount}}</td>
							<td class="tds">冲账后本金</td><td>{{details.loanNum}}</td>
							<td class="tds">冲账后利息</td><td>{{details.firstRatio}}</td>
							<td class="tds">冲账后费用</td><td>{{details.interstRate}}</td>
						</tr>
						<tr>
							<td class="tds">WCS产生利息</td><td>{{details.loanBalance}}</td>
							<td class="tds">WCS产生费用</td><td colspan="5">{{details.paidPrincipal}}</td>
						</tr>								
					</table>
				</div>			
			</el-collapse-item>
			 <el-collapse-item name="2" title="还款记录" style="position:relative" >
				 <!-- //v-loading="listLoading" -->
				  <el-button class="filter-item" style="position:absolute;top:10px;left:150px"  type="primary" size="mini"  @click="addSsInfo" >添加</el-button>
				<el-table  border highlight-current-row  style="width: 100%;" stripe :data="lists"  >			
            	<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" :width="col.width" show-overflow-tooltip >			
						<template slot-scope="scope">  
							<el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]"></el-input>            
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>         						  
						</template>
				</el-table-column>
			</el-table> 
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeInfo" @size-change="SizeChangeInfo" :page-size="pagesizeInfo" :page-sizes="[10, 20, 50, 100]"   :total="totalInfo"   style="float:right;">
				</el-pagination>
			</el-col>
           <el-dialog title="还款记录" :visible.sync="addSsInfos" >
			    <el-form :model="LegalActionInfo" ref="LegalActionInfo">
					 <el-form-item label="合同号:" prop="auctioneer" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.auctioneer" placeholder="合同号" clearable  size="mini" style="width:300px" readonly ></el-input>
                    </el-form-item>
                     <el-form-item label="还款金额:" prop="auctioneer" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.auctioneer" placeholder="还款金额" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="还款人:" prop="address" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.address" placeholder="还款人" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="还款类型:" prop="contact" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionInfo.contact" placeholder="还款类型" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item> 
                     <el-form-item label="复核人:" prop="phone" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.phone" placeholder="复核人" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:" prop="auctioneerMount" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="LegalActionInfo.auctioneerMount" placeholder="备注" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>                 
                </el-form>
              <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subInfo('LegalActionInfo')">确 定</el-button> 
                </div>
		    </el-dialog>
     </el-collapse-item> 
      </el-collapse>
  </section>
</template>
<script>
//import NProgress from 'nprogress'
import { getdeal } from "@/api/tablist";

export default {
  data() {
    return {
      activeNames: ["1", "2"],
      details: [],
      lists: [],
      cols: [
        { title: "还款金额", field: "updateDate" },
        { title: "还款人", field: "repayments" },
        { title: "还款类型", field: "bankAccount" },
        { title: "复核人", field: "bankName" },
        { title: "备注", field: "bankBranch" }
	  ],
	  LegalActionInfo: {
        auctioneer: "",
        address: "",
        contact: "",
        phone: "",
        auctioneerTime: "",
        auctioneerMount: ""
      },
     	id:"",
      listLoading: false,
	  addSsInfos: false,
	  InfoList:[],
	  pageInfo: 1,
	  pagesizeInfo: 20,
	  totalInfo: 0,
	  formLabelWidth: "120px",
    };
  },
  methods: {
    //获取列表
    getlists() {
      let para = {
        missionId: this.$route.params.id
      };
      this.listLoading = true;
    //   getdeal(para).then(res => {
        // let data = res.data.result;
        // this.lists = data.contractBanks;
        // this.details = data;
        // this.listLoading = false;
    //   });
    },
    CurrentChangeInfo(val) {
      this.pageInfo = val;
    },
    SizeChangeInfo(val) {
      this.pagesizeInfo = val;
	},
	 getSsInfo() {
      let para = {
        legalActionId:this.id,
        page: this.pageInfo,
        pageSize: this.pagesizeInfo
      };
      ListLegalActionInfo(para).then(res => {
        this.InfoList = res.data.result.data;
        this.totalInfo= res.data.result.recordsTotal
        this.InfoList = this.InfoList.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    addSsInfo() {
      this.addSsInfos = true;
    },
     subInfo(LegalActionInfo) {
    //   let para = {
    //     legalActionId: this.id,
    //     auctioneer: this.LegalActionInfo.auctioneer,
    //     contact: this.LegalActionInfo.contact,
    //     address: this.LegalActionInfo.address,
    //     phone: this.LegalActionInfo.phone,
    //     auctioneerTime: this.LegalActionInfo.auctioneerTime,
    //     auctioneerMount: this.LegalActionInfo.auctioneerMount
    //   };
    //   this.$refs[LegalActionInfo].validate(valid => {
    //     if (valid) {
    //       insertLegalActionInfos(para).then(res => {
    //         if (res.data.success) {
    //           this.$message({
    //             type: "success",
    //             message: "添加成功！"
    //           });
    //           this.$refs["LegalActionInfo"].resetFields();
    //           this.addSsInfos = false;
    //           this.getSsInfo();
    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: "添加失败，请联系管理员"
    //           });
    //         }
    //       });
    //     } else {
    //       this.addSsInfos = true;
    //       this.$refs.LegalActionInfo.validate(valid => {
    //         if (valid) {
    //           alert("submit!");
    //         } else {
    //           return false;
    //         }
    //       });
    //     }
    //   });
     },
    // EditInfo(row) {
    //   let para = row;
    //   if ((row.edit = !row.edit)) {
    //   } else {
    //     updateLegalActionInfos(para).then(res => {
    //       if (res.data.success) {
    //         this.$message({
    //           type: "success",
    //           message: "编辑成功！"
    //         });
    //         this.getSsInfo();
    //       } else {
    //         this.$message({
    //           type: "error",
    //           message: "编辑失败！"
    //         });
    //       }
    //     });
    //   }
    // },
    // deleteInfo(index, rows, datas) {
    //   let para = {
    //     id: rows.id
    //   };
    //   this.$confirm("确定删除信息吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       delLegalActionInfo(para).then(res => {
    //         if (res.data.success) {
    //           datas.splice(index, 1);
    //           this.$message({
    //             type: "success",
    //             message: "删除成功！"
    //           });
    //           this.getSsInfo();
    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: "删除失败，请联系管理员！"
    //           });
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    //},
    cancleInfo() {
      this.addSsInfos = false;
     // this.$refs["LegalActionInfo"].resetFields();
    }
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
.ht_table td {
  color: #269aff;
  font-size: 13px;
}
.ht_table .tds {
  color: #000;
}
</style>
