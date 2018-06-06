<template>
    <section ref="abc" style="overflow-y: auto;">
        	<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">
							<el-input  v-show="scope.row.edit" size="small" v-if="(col.field=='rate'||col.field=='widthdrawMoneyDaysStart')" v-model="scope.row[col.field]"></el-input>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
                            <span v-show="scope.row.edit" v-if="(col.field!='rate'||col.field!='widthdrawMoneyDaysStart')&&col.field!='widthdrawMoneyModel'" >{{ scope.row[col.field] }}</span>
                            <el-select v-show="scope.row.edit" class="comSty" v-if="col.field=='widthdrawMoneyModel'" v-model="scope.row[col.field]" placeholder="请选择">
								<el-option label="有效" value="有效"></el-option>
								<el-option label="无效" value="无效"></el-option>
							</el-select>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>		
    </section>
</template>
<script>
import { rateList,  rateupdate,} from "@/api/basedata";
export default {
  data() {
    return {
      total: 0,
      heights: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      lists: [],
      formLabelWidth: "140px",
      cols: [
        { title: "外包公司名称", field: "entrustOverdueDaysStart" },
        { title: "委派周期", field: "entrustOverdueDaysEnd" },
        { title: "结算佣金月份", field: "entrustMoneyStart" },
        { title: "收回金额", field: "entrustMoneyStart" },
        { title: "佣金方式", field: "entrustMoneyEnd" },
        { title: "费率", field: "widthdrawMoneyDaysEnd" },
        { title: "是否已付", field: "widthdrawMoneyDaysStart" },
        { title: "付款月份", field: "rate" },
        { title: "是否有效", field: "widthdrawMoneyModel" },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
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
      let para = {
        page: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;
      rateList(para).then(res => {
        //  console.log(res.data.result.fixed)
        let data = res.data.result;
        this.lists = data.data;
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
        this.total = data.recordsTotal;
        this.listLoading = false;
      });
    },
    Edit(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
        return;
      } else {
        // rateupdate(para).then(res => {
        //   if (res.data.success) {
        //     this.$message({
        //       type: "success",
        //       message: "编辑成功！"
        //     });
        //   } else {
        //     this.$message({
        //       type: "error",
        //       message: "编辑失败，请联系管理员！"
        //     });
        //   }
        // });
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
 