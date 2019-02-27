<template>
  <section>
    <el-row>
      <div class="bottom10">
        <el-button size="mini" @click="addMenuBtn" type="primary">添加</el-button>
      </div>
    </el-row>
    <tree-grid
      :items="data"
      :columns="columns"
      @on-row-click="rowClick"
      @on-selection-change="selectionClick"
      @on-sort-change="sortClick"
    ></tree-grid>

    <el-dialog :show-close="false" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="form">
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.parentName"
            placeholder="请选择"
            style="width:300px"
            @change="parentNameChange"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.itemName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="itemNums==false" label="是否为数字类型" :label-width="formLabelWidth">
          <el-select v-model="form.roottype" placeholder="请选择" style="width:300px">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="key值" :label-width="formLabelWidth">
          <el-input v-model="form.parentName" readonly auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="子菜单key" :label-width="formLabelWidth">
          <el-input v-model="form.ChildName" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="itemNums==true" label="是否为数字" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择" disabled style="width:300px" @change="typeChange">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="IsValue==true" label="最小值" :label-width="formLabelWidth">
          <el-input v-model="form.minValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="IsValue==true" label="最大值" :label-width="formLabelWidth">
          <el-input v-model="form.maxValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="itemNums==true&&IsValue==false" label="值" :label-width="formLabelWidth">
          <el-input v-model="form.minValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="itemNums==true" label="分值" :label-width="formLabelWidth">
          <el-input v-model="form.scores" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="addBtn(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更新一级菜单的弹框 -->
    <el-dialog :show-close="false" :title="title" :visible.sync="updatadialog">
      <el-form :model="updataform" ref="updataformform">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="updataform.name" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="key值" :label-width="formLabelWidth">
          <el-input
            v-model="updataform.parentName"
            readonly
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="子菜单key" :label-width="formLabelWidth">
          <el-input v-model="updataform.ChildName" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="是否为数字类型" :label-width="formLabelWidth">
          <el-select v-model="updataform.type" placeholder="请选择" style="width:300px">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="updataMsg(updataform,'first')">确 定</el-button>
      </div>
      <!-- 更新二级菜单 -->
    </el-dialog>
    <el-dialog :show-close="false" :title="title" :visible.sync="secdialog">
      <el-form :model="updataform" ref="updataformform">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="updataform.name" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="key值" :label-width="formLabelWidth">
          <el-input
            v-model="updataform.parentName"
            readonly
            auto-complete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="子菜单key" :label-width="formLabelWidth">
          <el-input v-model="updataform.ChildName" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="是否为数字类型" :label-width="formLabelWidth">
          <el-select v-model="updataform.type" disabled placeholder="请选择" style="width:300px">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="secValue==true" label="最小值" :label-width="formLabelWidth">
          <el-input v-model="updataform.minValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item v-if="secValue==true" label="最大值" :label-width="formLabelWidth">
          <el-input v-model="updataform.maxValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="值" v-else :label-width="formLabelWidth">
          <el-input v-model="updataform.minValue" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="分值" :label-width="formLabelWidth">
          <el-input v-model="updataform.scores" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="updataMsg(updataform,'second')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import TreeGrid from "@/components/treeGrid/TreeGrid2";
import {
  allItemName,
  scoreCardRules,
  update,
  scoreCardRulesDele,
  getPermissionsParent,
  PermissionsInsert,
  PermissionsFind,
  scoreCardRulesInsert,
  PermissionsDelete
} from "@/api/auth";
import { collectOnly, objectOnly } from "@/utils/index";
export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "name",
          width: "150"
        },
        {
          title: "Key值",
          key: "type",
          width: "150"
        },
        {
          title: "最小值",
          key: "minValue",
          width: "150"
        },
        {
          title: "最大值",
          key: "maxValue",
          width: "150"
        },
        {
          title: "分值",
          key: "scores",
          width: "150"
        },
        {
          title: "操作",
          type: "action",
          actions: [
            {
              type: "primary",
              text: "编辑"
            },
            {
              type: "danger",
              text: "删除"
            }
          ],
          width: "150"
        }
      ],
      data: [],
      // toEdit: false,
      updatadialog: false,
      secdialog: false,
      options: [{ id: 1, name: "根节点", itemName: "scoreCard" }],
      types: [{ id: 1, name: "Y" }, { id: 2, name: "N" }],
      title: "添加菜单",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        parentName: "",
        name: "",
        ChildName: "",
        key: "",
        type: "",
        roottype: "",
        minValue: "",
        maxValue: "",
        scores: ""
      },
      updataform: {
        parentName: "",
        name: "",
        ChildName: "",
        key: "",
        type: "",
        roottype: "",
        minValue: "",
        maxValue: "",
        scores: "",
        id: 0
      },
      itemNums: false,
      IsValue: false,
      secValue: false
    };
  },
  components: {
    TreeGrid
  },
  methods: {
    parentNameChange(val) {
      if (val == "scoreCard") {
        this.itemNums = false;
        this.form.ChildName = "";
      } else {
        this.itemNums = true;
        this.form.ChildName = this.form.parentName
       for(var i=0; i<this.options.length;i++){        
         if(this.options[i].itemName==val){
           this.form.type = this.options[i].flag
         }
       }
      }
    },
    typeChange(val) {
      if (val == "Y") {
        this.IsValue = true;
      } else {
        this.IsValue = false;
      }
    },
    secChange(val) {
      if (val == "Y") {
        this.secValue = true;
      } else {
        this.secValue = false;
      }
    },
    handleClose() {
      this.form.roottype = "";
      this.form.parentName = "";
      this.form.name = "";
      this.form.ChildName = "";
      this.form.key = "";
      this.form.type = "";
      this.form.minValue = "";
      this.form.maxValue = "";
      this.form.scores = "";
      this.itemNums = false;
      this.IsValue = false;
    },

    addMenuBtn() {
      (this.title = "添加菜单"), (this.toEdit = false);
      this.itemNums = false;
      this.IsValue = false;
      this.dialogFormVisible = true;
      allItemName().then(res => {
        this.options = res.data;
        this.options.unshift({ id: 0, name: "根节点", itemName: "scoreCard" });
      });
    },
    addBtn(form) {
      if (form.parentName == "scoreCard") {
        var para = {
          type: form.parentName,
          flag: form.roottype,
          itemName: form.ChildName,
          name: form.name
        };
      } else {
        if (form.type != "Y") {
          var para = {
            type: form.parentName,
            flag: form.type,
            itemName: form.ChildName,
            name: form.name,
            minValue: form.minValue,
            maxValue: form.maxValue,
            scores: form.scores
          };
        } else {
          var para = {
            type: form.parentName,
            flag: form.type,
            itemName: form.ChildName,
            name: form.name,
            minValue: form.minValue,
            maxValue: form.maxValue,
            scores: form.scores
          };
        }
      }
      scoreCardRulesInsert(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
          this.cancelBtn();
          this.handleClose();
          this.getPermissionsMethod();
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    // 更新菜单方法

    updataMsg(updataform, item) {
      if (item == "first") {
        let para = {
          type: updataform.parentName,
          flag: updataform.type,
          itemName: updataform.ChildName,
          name: updataform.name,
          id: updataform.id
        };
        update(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.cancelBtn();
            this.getPermissionsMethod();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员"
            });
          }
        });
      } else {
        let para = {
          type: updataform.parentName,
          flag: updataform.type,
          itemName: updataform.ChildName,
          name: updataform.name,
          minValue: updataform.minValue,
          maxValue: updataform.maxValue,
          scores: updataform.scores,
          id: updataform.id
        };
        update(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.cancelBtn();
            this.getPermissionsMethod();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员"
            });
          }
        });
      }
    },
    cancelBtn() {
      this.dialogFormVisible = false;
      this.updatadialog = false;
      this.secdialog = false;
      this.handleClose();
    },
    getPermissionsMethod() {
      scoreCardRules().then(res => {
        this.data = res.data.result;
      });
    },
    rowClick(data, index, event, text) {
      if (text == "编辑") {
        this.title = "编辑菜单";
        if (data.type == "scoreCard") {
          this.updatadialog = true;
          this.updataform.name = data.name;
          this.updataform.ChildName = data.itemName;
          this.updataform.parentName = data.type;
          this.updataform.type = data.flag;
          this.updataform.id = data.id;
        } else {
          this.secdialog = true;
          if (data.flag == "N") {
            this.secValue = false;
          } else {
            this.secValue = true;
          }
          this.updataform.name = data.name;
          this.updataform.ChildName = data.itemName;
          this.updataform.parentName = data.type;
          this.updataform.type = data.flag;
          this.updataform.minValue = data.minValue;
          this.updataform.maxValue = data.maxValue;
          this.updataform.id = data.id;
          this.updataform.scores = data.scores;
        }
      }
      if (text == "删除") {
        let para = {
          id: data.id
        };
        this.$confirm("确定删除" + data.name + "菜单吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            scoreCardRulesDele(para).then(res => {
              console.log(res);
              if (res.data == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                this.getPermissionsMethod();
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
      }
    },
    selectionClick(arr) {},
    sortClick(key, type) {}
  },
  mounted() {
    this.getPermissionsMethod();
  }
}
</script>