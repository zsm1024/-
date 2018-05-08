<template>
    <section ref="abc">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addcodeInfos">添加</el-button>
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
							<el-input  v-show="scope.row.edit" size="small" v-if="col.field=='stateName'&&col.field=='areaName'" v-model="scope.row[col.field]"></el-input> 
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
							<span v-show="scope.row.edit"  v-if="col.field!='stateName'&&col.field!='areaName'">{{ scope.row[col.field] }}</span>
							<el-select v-show="scope.row.edit" @change="getMessages1(scope.row)" v-if="col.field=='stateName'"  v-model="scope.row[col.field]" placeholder="请选择" >
								<el-option v-for="item in options" :key="item.value" :label="item.stateNme" :value="item.stateCde"></el-option>
							</el-select>
							<el-select v-show="scope.row.edit" v-if="col.field=='areaName'" v-model="scope.row[col.field]" placeholder="请选择"  @change="getMessages2(scope.row)">
								<el-option v-for="item in options1" :key="item.value" :label="item.areaName" :value="item.id"></el-option>
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
        <el-form-item label="省市代码:" prop="areaCode" :label-width="formLabelWidth">
          <el-select v-model="AdduserForm.areaCode" placeholder="请选择" @change="getMessage" >
            <el-option v-for="item in options" :key="item.value" :label="item.stateNme" :value="item.stateCde"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="区域代码:" prop="stateCode" :label-width="formLabelWidth">
          <el-select v-model="AdduserForm.stateCode" placeholder="请选择" @change="getMessages" >
            <el-option v-for="item in options1" :key="item.value" :label="item.areaName" :value="item.id"></el-option>
          </el-select>
		    </el-form-item>
				 <!-- :rules="phonerules" -->
				<!-- <el-form-item label="区域代码:" prop="areaCode" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaCode" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="描述:" prop="areaDistribution" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaDistribution" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="名字" prop="areaName" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaName" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="state" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.state"style="width:300px" ></el-input>
				</el-form-item> -->
				<!-- <el-form-item label="分配规则：" prop="distributionId" :label-width="formLabelWidth">
					<el-select  v-model="AdduserForm.distributionId" placeholder="请选择" style="width:300px">
						<el-option v-for="rule in rules" :key="rule.id" :label="rule.name" :value="rule.id"></el-option>
						<!-- <el-option label="N" value="N"></el-option> -->
					<!-- </el-select> -->
					<!-- <el-input v-model="AdduserForm.distribution"></el-input> -->
				<!-- </el-form-item>				 -->
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addUserInfo">取 消</el-button>
 <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <el-button  type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
      </div>			
		</el-dialog>
		
    </section>
</template>
<script>
//  import { base_menue,delInfo,updateInfo,add_info,getRules } from "@/api/basedata";
import {
  areaStateInfo,
  addAre_infoState,
  delAreaInfo,
  updateAreaState,
  listAllState,
  listAll,
  delcodeState
} from "@/api/basedata";
export default {
  data() {
    return {
      heights: 0,
      total: 0,
      pagesize: 50,
      page: 1,
      listLoading: false,
      lists: [],
      options: [],
      options1: [],
      addUserInfos: false,
      formLabelWidth: "120px",
      cols: [
        { title: "代码", field: "stateCde" },
        { title: "名称", field: "stateName" },
        { title: "区域名称", field: "areaName" },
        { title: "更新人", field: "updateUser" },
        { title: "更新时间", field: "updateTime" }
      ],
      AdduserForm: {
        areaCode: "",
        stateCode: ""
        // stateNme:"",
        // areaName:"",
        // updateTime:"",
        // updateUser:"",
      },
	  areaCodeVal: "",
	  stateCode:"",
	  areaEditId:""

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
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 160;
      this.heights = h;
      let para = {
        page: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;
      areaStateInfo(para).then(res => {
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
    deleteRow(index, rows, datas) {
      let para = {
        id:rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delcodeState(para).then(res => {
            if (res.data.success) {
			  datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
			  });
			 this.getlists();
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
		 this.getAreaCode();
		if(this.stateCode==""){
			let paras = {
        stateCde: row.stateCde,
				areaId: row.areaId,
				id:row.id
			  };
				if ((row.edit = !row.edit)) {
					return;
				} else {
					updateAreaState(paras).then(res => {
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
				}
				this.getlists();
		}else{
			let paras = {
        stateCde:this.stateCode,
				areaId: row.areaId,
				id:row.id
			  };
			 if ((row.edit = !row.edit)) {
					return;
				} else {
					updateAreaState(paras).then(res => {
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
				}
				this.getlists();
		}
	  
	},
	//  EditList(row){
	
	//  },
    getMessage(val) {
      this.AdduserForm.areaCode = val;
	},
	getMessages1(val) {
		let a=val.stateName;
		this.stateCode=a
	},
	getMessages2(val) {
		let b=val.areaId
		this.areaEditId=b
    },
    getMessages(val) {
      this.AdduserForm.stateCode = val;
    },
    addUserInfo() {
      this.addUserInfos = false;
      this.$refs["AdduserForm"].resetFields();
	},
	//获取区域和省市代码
	getAreaCode(){
		listAllState().then(res => {
        let data = res.data.result;
		this.options = data;
      });
      listAll().then(res => {
        let data = res.data.result;
        this.options1 = data;
	  });	  
	},	
    addcodeInfos() {
	  this.addUserInfos = true;
	  this.getAreaCode();   
    },
    choice(AdduserForm) {
      let para = {
        stateCde: this.AdduserForm.areaCode,
        areaId: this.AdduserForm.stateCode
	  };
      this.$refs[AdduserForm].validate(valid => {
        if (valid) {
          addAre_infoState(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.lists.unshift({
                stateCde: this.$refs["AdduserForm"].model.areaCode,
                areaName: this.$refs["AdduserForm"].model.stateCode
              });
              this.addUserInfos = false;
			  this.$refs["AdduserForm"].resetFields();
			  this.getlists();
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
    }
  },
  mounted() {
    this.getlists();
    // let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
    // this.$refs.abc.style.height= h+"px"
  }
};
</script>
<style>	
</style>
 