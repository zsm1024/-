<template>
    <section ref="abc" style="overflow-y: auto;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1" title="本品牌规则">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addUserInfos=true ">添加</el-button>
        	<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"> 移除</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">
							<el-input  v-show="scope.row.edit" size="small" v-if="col.field!='areaId'" v-model="scope.row[col.field]"></el-input>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
							<span v-show="scope.row.edit"  v-if="col.field!='areaId'">{{ scope.row[col.field] }}</span>
							<el-select v-show="scope.row.edit" v-if="col.field=='areaId'" v-model="scope.row[col.field]" placeholder="请选择"  @change="getMessages2(scope.row)">
								<el-option v-for="item in options1" :key="item.value" :label="item.areaId" :value="item.id"></el-option>
							</el-select>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增规则信息" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->
				<el-form-item label="规则名称：" prop="name" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.name"  style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="规则描述：" prop="describes" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.describes" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="最小值：" prop="startDate" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.startDate" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="最大值：" prop="endDate" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.endDate" style="width:300px" ></el-input>
				</el-form-item>
				<el-form-item label="区域代码:" prop="stateCode" :label-width="formLabelWidth">
					<el-select v-model="AdduserForm.stateCode" placeholder="请选择" @change="getMessages" style="width:300px">
						<el-option v-for="item in options1" :key="item.value" :label="item.areaName" :value="item.id"></el-option>
					</el-select>
		    	</el-form-item>
				<el-form-item label="类型：" prop="type" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.type" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="版本：" prop="vision" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.vision" style="width:300px"></el-input>
				</el-form-item>			
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addUserInfo">取 消</el-button>
 <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <el-button  type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
      </div>			
		</el-dialog>
            </el-collapse-item>

      
		<el-collapse-item title="多品牌规则" name="2">

    </el-collapse-item>
    </el-collapse>
    </section>
</template>
<script>
import {
  base_data,
  delInfo,
  updateInfo,
  addInfo,
  listAll
} from "@/api/basedata";
export default {
  data() {
    return {
      activeName:["1"],
      total: 0,
      heights: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      lists: [],
      addUserInfos: false,
      formLabelWidth: "120px",
      options1: [],
	  stateCode: "",
	  areaEditId:"",
      cols: [
        { title: "规则名称", field: "name", width: "180" },
        { title: "规则描述", field: "describes", width: "190" },
        { title: "最小值", field: "startDate", width: "90" },
        { title: "最大值", field: "endDate", width: "80" },
        { title: "区域", field: "areaName", width: "80" },
        { title: "类型", field: "type", width: "70" },
        { title: "版本", field: "vision", width: "70" }
      ],
      AdduserForm: {
        name: "",
        describes: "",
        endDate: "",
        startDate: "",
        type: "",
        vision: "",
        stateCode: ""
      }
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
    getMessages(val) {
      this.AdduserForm.stateCode = val;
    },
    getMessages2(val) {
      let b = val.areaId;
      this.areaEditId = b;
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
      base_data(para).then(res => {
        //  console.log(res.data.result.fixed)
        let data = res.data.result;
        this.lists = data.data;
        console.log(res);
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
        this.total = data.recordsTotal;
        this.listLoading = false;
      });
      this.getAreaCode();
    },
    deleteRow(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delInfo(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    Edit(row) {
	  let para = row;
	  console.log(para)
      if ((row.edit = !row.edit)) {
        return;
      } else {
        updateInfo(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员！"
            });
          }
		});
		this.getlists();
      }
      //row.edit=!row.edit;
    },
    addUserInfo() {
      this.addUserInfos = false;
      this.$refs["AdduserForm"].resetFields();
    },
    choice(AdduserForm) {
      let para = {
        name: this.AdduserForm.name,
        decribes: this.AdduserForm.decribes,
        startDate: this.AdduserForm.startDate,
        type: this.AdduserForm.type,
        endDate: this.AdduserForm.endDate,
        vision: this.AdduserForm.vision,
        areaId: this.AdduserForm.stateCode
      };
      console.log(para);
      this.$refs[AdduserForm].validate(valid => {
        if (valid) {
          addInfo(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.lists.unshift({
                name: this.$refs["AdduserForm"].model.name,
                describes: this.$refs["AdduserForm"].model.describes,
                startDate: this.$refs["AdduserForm"].model.startDate,
                endDate: this.$refs["AdduserForm"].model.endDate,
                type: this.$refs["AdduserForm"].model.type,
                vision: this.$refs["AdduserForm"].model.vision,
                areaId: this.$refs["AdduserForm"].model.stateCode,
                areaName: this.$refs["AdduserForm"].model.stateCode
              });
              this.addUserInfos = false;
              this.$refs["AdduserForm"].resetFields();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addUserInfos = true;
          this.$refs.AdduserForm.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
    },
    //获取区域和省市代码
    getAreaCode() {
      // 	listAllState().then(res => {
      //     let data = res.data.result;
      // 	this.options = data;
      //   });
      listAll().then(res => {
        let data = res.data.result;
        this.options1 = data;
        console.log(data);
      });
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

</style>
 