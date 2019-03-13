<template>
  <section ref="abc" style="overflow-y: auto;">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="本品牌队列管理" name="1">
        <el-button
          class="filter-item"
          type="primary"
          size="mini"
          style="margin: 0 0 10px 10px;"
          @click="addcodeInfos"
        >添加</el-button>
        <el-table
          :data="lists"
          :max-height="heights"
          border
          highlight-current-row
          v-loading="listLoading"
          style="width: 100%;"
          stripe
        >
          <el-table-column label="操作" align="center" width="100">
            <!-- width="95" -->
            <template slot-scope="scope">
              <el-button
                :type="scope.row.edit?'success':'primary'"
                size="mini"
                @click="Edit(scope.row)"
              >{{scope.row.edit?'完成':'编辑'}}</el-button>
              <el-button
                type="danger"
                size="mini"
                @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"
              >移除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            :prop="col.field"
            :label="col.title"
            v-for="(col, index) in cols"
            :key="index"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.edit"
                size="small"
                v-if="(col.field!='personChargeName'&&col.field!='directorName')"
                v-model="scope.row[col.field]"
              ></el-input>
              <el-select
                v-show="scope.row.edit"
                v-if="col.field=='directorName'"
                v-model="scope.row[col.field]"
                placeholder="请选择"
                @change="getMessages3(scope.row)"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
              <span v-show="!scope.row.edit">{{ scope.row[col.field] }}</span>
              <el-select
                v-show="scope.row.edit"
                v-if="col.field=='personChargeName'"
                v-model="scope.row[col.field]"
                placeholder="请选择"
                @change="getMessages2(scope.row)"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pagesize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            style="float:right;"
          ></el-pagination>
        </el-col>

        <el-dialog title="新增规则信息" :visible.sync="addUserInfos">
          <el-form :model="AdduserForm" ref="AdduserForm">
            <!-- :rules="phonerules" -->
            <el-form-item label="队列名称：" prop="queueName" :label-width="formLabelWidth">
              <el-input v-model="AdduserForm.queueName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="负责人：" prop="personChargeName" :label-width="formLabelWidth">
              <el-select
                v-model="AdduserForm.personChargeName"
                filterable
                clearable
                placeholder="请选择"
                style="width:300px"
                @change="getMessage"
              >
                <el-option
                  v-for="rule in userList"
                  :key="rule.id"
                  :label="rule.value"
                  :value="rule.id"
                ></el-option>
                <!-- <el-option label="N" value="N"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="主管：" prop="director" :label-width="formLabelWidth">
              <el-select
                v-model="AdduserForm.director"
                placeholder="请选择"
                filterable
                clearable
                style="width:300px"
                @change="getMessage1"
              >
                <el-option
                  v-for="rule in userList"
                  :key="rule.id"
                  :label="rule.value"
                  :value="rule.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="暂挂标识：" prop="pendingSign" :label-width="formLabelWidth">
              <el-input v-model="AdduserForm.pendingSign" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="queueType" :label-width="formLabelWidth">
              <el-input v-model="AdduserForm.queueType" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="state" :label-width="formLabelWidth">
              <el-input v-model="AdduserForm.state" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="分配规则：" prop="distributionId" :label-width="formLabelWidth">
              <el-select v-model="AdduserForm.distributionId" placeholder="请选择" style="width:300px">
                <el-option v-for="rule in rules" :key="rule.id" :label="rule.name" :value="rule.id"></el-option>
                <!-- <el-option label="N" value="N"></el-option> -->
              </el-select>
              <!-- <el-input v-model="AdduserForm.distribution"></el-input> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addUserInfo">取 消</el-button>
            <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
            <el-button type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-collapse-item>
      <el-collapse-item title="多品牌队列管理" name="2">
      </el-collapse-item>
    </el-collapse>
  </section>
</template>
<script>
import {
  base_menue,
  queueDelInfo,
  updateInfo,
  add_info,
  getRules,
  queueInfos
} from "@/api/basedata";
import { getTaskHostUser } from "@/api/task";
export default {
  data() {
    return {
      activeNames: ["1"],
      heights: 0,
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      lists: [],
      rules: [],
      userList: [],
      addUserInfos: false,
      formLabelWidth: "120px",
      cols: [
        { title: "队列名称", field: "queueName", width: "180" },
        { title: "负责人", field: "personChargeName", width: "70" },
        { title: "主管", field: "directorName", width: "70" },
        { title: "暂挂标识", field: "pendingSign", width: "90" },
        { title: "类型", field: "queueType", width: "70" },
        { title: "状态", field: "state", width: "70" },
        { title: "分配规则", field: "distribution", width: "70" }
      ],
      AdduserForm: {
        queueName: "",
        pendingSign: "",
        personChargeName: "",
        director: "",
        queueType: "",
        startDate: "",
        state: "",
        distributionId: ""
      },
      stateCode: "",
      stateCode2: "",
      personCharge: "",
      director: "",
      areaEditId: ""
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
    getMessages2(val) {
      let a = val.personChargeName;
      this.stateCode = a;
      // let b=val.areaId
      // this.areaEditId=b
    },
    getMessages3(val) {
      let b = val.directorName;
      this.stateCode2 = b;
      // let b=val.areaId
      // this.areaEditId=b
    },
    getlists() {
      let h =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 120;
      this.heights = h;
      let para = {
        page: this.page,
        pageSize: this.pagesize
      };
      this.listLoading = true;
      base_menue(para).then(res => {
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
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          queueDelInfo(para).then(res => {
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
      let k = row.personCharge;
      let m = row.director;
      if ((row.edit = !row.edit)) {
        this.stateCode = "";
        this.stateCode2 = "";
        return;
      } else {
        if (this.stateCode == "") {
          row.personCharge = k;
        } else {
          row.personCharge = this.stateCode;
        }
        if (this.stateCode2 == "") {
          row.director = m;
        } else {
          row.director = this.stateCode2;
        }

        let para = row;
        queueInfos(para).then(res => {
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
          this.getlists();
        });
        // }
      }
      //row.edit=!row.edit;
    },
    addUserInfo() {
      this.addUserInfos = false;
      // getRules().then((res) => {
      // 	console.log(res)
      //     let data=res.data.result;
      // 	this.rules=data.data;
      //     this.total=data.recordsTotal;
      // });

      this.$refs["AdduserForm"].resetFields();
    },
    addcodeInfos() {
      this.addUserInfos = true;
      getRules().then(res => {
        let data = res.data.result;
        this.rules = data;
        this.total = data.recordsTotal;
      });
    },
    getMessage(val) {
      this.AdduserForm.personChargeName = val;
      //  this.getUser();
      //  this.getAllList()
    },
    getMessage1(val) {
      this.AdduserForm.director = val;
      //  this.getUser();
      //  this.getAllList()
    },
    getTaskUser() {
      getTaskHostUser().then(res => {
        let data = res.data.result;

        data.forEach(el => {
          this.userList.push({ value: el.nickname, id: el.id });
        });
        //  this.datas=data.data;
        // this.total=data.recordsTotal;
      });
    },
    choice(AdduserForm) {
      let para = {
        queueName: this.AdduserForm.queueName,
        personCharge: this.AdduserForm.personChargeName,
        pendingSign: this.AdduserForm.pendingSign,
        director: this.AdduserForm.director,
        queueNum: "",
        queueType: this.AdduserForm.queueType,
        state: this.AdduserForm.state,
        distributionId: this.AdduserForm.distributionId,
        sysSign: ""
      };
      this.$refs[AdduserForm].validate(valid => {
        if (valid) {
          add_info(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.lists.unshift({
                queueName: this.$refs["AdduserForm"].model.queueName,
                personCharge: this.$refs["AdduserForm"].model.personChargeName,
                pendingSign: this.$refs["AdduserForm"].model.pendingSign,
                queueType: this.$refs["AdduserForm"].model.queueType,
                state: this.$refs["AdduserForm"].model.state,
                distributionId: this.$refs["AdduserForm"].model.distributionId,
                directorName: this.$refs["AdduserForm"].model.director
              });
              this.getlists();
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
    }
  },
  mounted() {
    this.getlists();
    this.getTaskUser();
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
 