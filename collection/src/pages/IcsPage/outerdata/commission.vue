<template>
    <section ref="abc">
		<el-button class="filter-item"   type="primary"  style="margin: 0 0 10px 10px;"  @click="toggleSelection(datas)">计算</el-button>
        	<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <!-- <el-table-column label="操作"  align="center" width="100">  -->
					<!-- <template slot-scope="scope">
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
					</template> -->
				<!-- </el-table-column> -->
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">
              <span v-show="scope.row.edit" v-if="(col.field!='depositDate'&&col.field!='mode')" >{{ scope.row[col.field] }}</span>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
              <el-date-picker v-show="scope.row.edit" type="date" placeholder="选择日期" format='yyyy-MM-dd' value-format="timestamp" v-if="col.field=='depositDate'"  style="width: 100%;" v-model="scope.row[col.field]"></el-date-picker>
						  <el-select class="comSty" v-show="scope.row.edit" v-if="col.field=='mode'" v-model="scope.row[col.field]" placeholder="请选择方式">
							  <el-option label="收款" value="收款"></el-option>
								<el-option label="控车" value="控车"></el-option>
							</el-select>
          </template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<!-- <el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col> -->
    </section>
</template>
<script>
import { commission,balance} from "@/api/basedata";
export default {
  data() {
    return {
      // total: 0,
      heights: 0,
      // pagesize: 10,
      // page: 1,
      listLoading: false,
      lists: [],
      types:[],
      dateChange: "",
      value1: "",
      datas:[],
      formLabelWidth: "120px",
      cols: [
        { title: "姓名", field: "name" },
        { title: "申请号", field: "appNum" },
        { title: "扣款日期", field: "deductDate" },
        { title: "对公存款日期(若非扣款日期)", field: "depositDate" },
        { title: "方式", field: "mode" }
      ]
    };
  },
  methods: {
    gettime(date) {
      this.dateChange=""
      if (date) {
        var src = new Date(date);
        date = src.getFullYear() + "-" + (src.getMonth() + 1) + "-" + src.getDate();
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 240;
      this.heights = h;
      // let para = {
      //   page: this.page,
      //   pageSize: this.pagesize
      // };
      this.listLoading = true;
      commission().then(res => {
        let data = res.data.result;
        this.lists = data;
        this.datas=this.lists
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", true);
          return v;
        });
        // this.total = data.recordsTotal;
        this.listLoading = false;
      });
    },
    // Edit(row) {
      
    //   let para = row;
    //   row.depositDate = this.dateChange;
    //   // console.log(row.depositDate)
    //   if ((row.edit = !row.edit)) {
    //     this.dateChange=""
    //     return;
    //   } else {
    //      this.dateChange=""
        // updateInfo$(para).then(res => {
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
    //   }
    // },
    toggleSelection(rows){
      this.types=[];
      let para=rows;
      
      for(var i=0;i<rows.length;i++){ 
        // if(!rows[i].mode){
            this.types.push(rows[i].mode) 
            //  let date=rows[i].depositDate;
            // var src = new Date(date);
            // date = src.getFullYear() + "-" + (src.getMonth() + 1) + "-" + src.getDate();
           
            // console.log(rows[i].mode)
        // }
      }
      if( this.types.indexOf(null, 0) != -1 ){
         this.types=[]
      }
      if(this.types.length==0){
        this.$message({
              type: "error",
              message: "请检查收车方式是否填写！"
            }); 
      }else{ 
          balance(para).then(res =>{
        if(res.data.success){
          this.$message({
              type: "success",
              message: res.data.message
            });
          this.getlists()
        }
      })           
      }
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
.comSty .el-input__inner {
  height: 30px !important;
}
</style>
 