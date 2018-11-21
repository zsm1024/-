<template>
<section class="sections">
  <el-form :data="lists" v-if="lists.station=='协办'" :model="mainform">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="dialogs"
      v-if="lists.isShow!='N'" >新增协办人</el-button>
      <el-table :data="coVoList"  id="coId" >
        <!-- v-if="lists.isShow!='N'" -->
        <el-table-column  prop="coQueueName" label="协办队列">
          <template slot-scope="scope">
            <el-select placeholder="请选择"  v-model="scope.row.coQueueName"  style="width:150px" @change="queueChange(scope.row)" clearable >
            <el-option  v-for="item in listsLeft" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
      </el-select>
          </template>
        </el-table-column>
        <el-table-column  prop="coUser" label="协办岗位">
            <template slot-scope="scope">
              <el-select  placeholder="请选择"  v-model="scope.row.positionName"  style="width:150px" @change="getMessage(scope.row.positionName)"  clearable >
                <el-option  v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column  prop="coUserName" label="协办员">
          <template slot-scope="scope">
            <el-select placeholder="请选择" v-model="scope.row.coUserName" style="width:150px" @change="colChange(scope.row)" clearable>
              <el-option v-for="items in options1" :key="items.id" :label="items.nickname" :value="items.id"></el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column  prop="coTime" label="协办到期日">
          <template slot-scope="scope">
            <el-date-picker placeholder="请选择" type="date" v-model="scope.row.coTime" style="width:150px"  @change="coTimeChange"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column   label="操作"  v-if="lists.isShow!='N'" >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteListRow(scope.row.coUid, lists.applyId)"
                type="text"
                size="small"
                AddCoForm>
                移除
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-dialog title="协办人员" :visible.sync="dialogFormVisible">
        <el-form :model="AddCoForm" ref="AddCoForm">
                 <el-form-item label="协办队列" prop="CoList" :label-width="formLabelWidth">
                    <el-select placeholder="请选择"  v-model="AddCoForm.CoList"  style="width:300px"  clearable >
                       <el-option  v-for="item in listsLeft" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
                    </el-select>
                 </el-form-item>
                 <el-form-item label="协办岗位" prop="CoGw" :label-width="formLabelWidth">
                    <el-select placeholder="请选择"  v-model="AddCoForm.CoGw"  style="width:300px" @change="getMessages"  clearable  >
                       <el-option  v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
                    </el-select>
                 </el-form-item>
                 <el-form-item label="协办员" prop="CoPerson" :label-width="formLabelWidth">
                    <el-select placeholder="请选择"  v-model="AddCoForm.CoPerson"  style="width:300px" clearable  >
                       <el-option  v-for="item in CoOptions" :key="item.id" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                 </el-form-item>
                 <el-form-item   prop="CoTimes" label="协办到期日" :label-width="formLabelWidth">
                    <el-date-picker placeholder="请选择" type="date" v-model="AddCoForm.CoTimes" style="width:300px"  @change="coTimeChange"></el-date-picker>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="cancleaddUserInfo">取 消</el-button>
        <el-button  type="primary" @click.native.prevent="choice(AddCoForm)">确 定</el-button>
      </div>			
    </el-dialog>
    <el-form-item label="备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">提交</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 留案 -->
    <el-form :data="lists" v-if="lists.station=='留案'">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="留案到期日:" label-width="120px">
       <input  v-if="lists.isShow=='N'" :value="lists.leaveTime" disabled/>
       <el-date-picker  v-else type="date"  v-model="lists.leaveTime" @change="changeTime"></el-date-picker>
    </el-form-item>
    <el-form-item label="备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">提交</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 转队列 -->
    <el-form :data="lists" v-else-if="lists.station=='手动转队列'" :model="goalForm">
      <el-form-item label="案件ID:" label-width="120px">
      <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
      </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="目标队列:" label-width="120px">
      <!-- <span>{{lists.goalQueue}}</span> -->

          <span v-if="lists.isShow=='N'">{{lists.goalQueue}}</span>
      <el-select  v-else placeholder="请选择"  v-model="goalForm.queueName"  style="width:150px" @change="goalqueueChange" clearable >
            <el-option  v-for="item in listsLeft" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位:" label-width="120px" prop="positionId">
      <span v-if="lists.isShow=='N'">{{lists.position}}</span>
       <!-- <el-select v-model="AdduserForms.positionId" placeholder="请选择岗位" @change="getMessage" style="width:120px">
            <el-option v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
          </el-select> -->
          <!-- @change="getMessage" -->
      <el-select  v-else placeholder="请选择"  v-model="goalForm.positionId"  style="width:150px" @change="goalgetMessage"  clearable >
        <!-- :placeholder="lists.goalQueue" -->
            <el-option  v-for="item in options" :key="item.id" :label="item.position" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="目标催收员:" label-width="120px">
      <!-- <span>{{lists.goalCollector}}</span> -->
      <span v-if="lists.isShow=='N'">{{lists.goalCollector}}</span>
       <!-- authlistRight -->
      <el-select v-else placeholder="请选择" v-model="goalForm.goalCollector" style="width:150px" @change="goalChange" clearable>
            <el-option v-for="items in options2" :key="items.id" :label="items.nickname" :value="items.id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approveturn">提交</el-button>
      <!-- <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button> -->
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <el-table :data="listPage">
      <el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" border stripe :key="index" align="center" :width="cols.width" show-overflow-tooltip class="spTable" ></el-table-column>
  </el-table> 
  </section>
</template>
<script>
import { Approvalfind, Approvalapply, listCoInfo, addCoInfo,deleteCoInfo } from "@/api/sp";
import { positionUser } from "@/api/task";
import Moment from "moment/moment";
import { authlist, authlistRight } from "@/api/basedata";
import { getAuthUser, getAuthtree, sysPositionslistAll } from "@/api/auth";
export default {
  data() {
    return {
      coVoList: [],
      icsId: "",
      applyId: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      disable: false,
      lists: [],
      leaveTimeChange: "",
      listPage: [],
      inputs: "",
      listsLeft: "",
      colchange: "",
      goalchange: "",
      listCocl: "",
      listId: "",
      options: [],
      options1: [],
      options2: [],
      CoOptions: [],
      authlistRight: "",
      mainform: {
        queueName: "",
        goalCollector: "",
        positionId: "",
        coTime: ""
      },
      goalForm: {
        queueName: "",
        goalCollector: "",
        positionId: ""
      },
      id: this.$route.params.id,
      cols: [
        { title: "节点名称", field: "step" },
        { title: "用户ID", field: "username" },
        { title: "审批日期", field: "updateTime" },
        { title: "备注", field: "remarks" }
      ],
      AddCoForm: {
        CoList: "",
        CoGw: "",
        CoPerson: "",
        CoTimes: ""
      }
    };
  },
  methods: {
    dialogs() {
      this.dialogFormVisible = true;
    },
    changeTime(val) {
      this.leaveTimeChange = val;
    },
    cancleaddUserInfo() {
      this.dialogFormVisible = false;
      this.$refs["AddCoForm"].resetFields();
    },
    choice(AddCoForm) {
      let para = {
        applyId: this.applyId,
        icsId: this.icsId,
        queueId: this.AddCoForm.CoList,
        coTime: this.AddCoForm.CoTimes
          ? Moment(this.AddCoForm.CoTimes).format("YYYY-MM-DD")
          : "9999-01-01",
        coUser: this.AddCoForm.CoPerson
      };

      addCoInfo(para).then(res => {
        this.$refs.AddCoForm.validate(valid => {
          if (valid) {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.getCoInfo();
              this.dialogFormVisible = false;
              this.$refs["AddCoForm"].resetFields();
            } else {
              this.$message({
                type: "success",
                message: res.data.message
              });
            }
          } else {
            this.dialogFormVisible = true;
            this.$refs.AddCoForm.validate(valid => {
              if (valid) {
                alert("submit!");
              } else {
                return false;
              }
            });
           }
        });
      });
    },
    //协办到期日
    coTimeChange(val) {
      this.mainform.coTime = val;
    },
    coTimeChanges(val) {
      this.AddCoForm.CoTimes = val;
    },
    colChange(val) {
      this.colchange = val.coUserName;
      val.coUser = val.coUserName;
    },
    goalChange(val) {
      this.goalchange = val;
    },
    //获取岗位信息
    getMessage(val) {
      this.mainform.goalCollector = "";
      let para = {
        positionId: val
        //  positionId:this.mainform.positionId
      };
      positionUser(para).then(res => {
        this.mainform.goalCollector = "";
        // this.AdduserForms.positionId="";
        this.options1 = [];
        let data = res.data.result;
        this.options1 = data;
      });
    },
    getMessages(val) {
      this.AddCoForm.CoPerson = "";
      let para = {
        positionId: val
        //  positionId:this.mainform.positionId
      };
      positionUser(para).then(res => {
        // this.mainform.goalCollector = "";
        // this.AdduserForms.positionId="";
        this.CoOptions = [];
        let data = res.data.result;
        this.CoOptions = data;
      });
    },
    goalgetMessage() {
      this.goalForm.goalCollector = "";
      let para = {
        positionId: this.goalForm.positionId
      };
      positionUser(para).then(res => {
        this.goalForm.goalCollector = "";
        // this.AdduserForms.positionId="";
        this.options2 = [];
        let data = res.data.result;
        this.options2 = data;
        // console.log( this.options2)
      });
    },
    getLists() {
      let para = {
        id: this.id
      };
      Approvalfind(para).then(res => {
        let data = res.data.result;
        this.lists = data;
        this.inputs = data.remarks;
        this.listPage = data.applyListDtos;
        this.mainform.queueName = data.goalQueue;
        this.goalForm.queueName = data.goalQueue;
        this.mainform.goalCollector = data.goalCollector;
        this.goalForm.goalCollector = data.goalCollector;
        this.goalchange = data.turnUser;
        this.mainform.coTime = data.coTime;
        this.mainform.positionId = data.position;
        this.goalForm.positionId = data.position;
        this.leaveTimeChange = data.leaveTime;
        this.colchange = data.coUser;
        if (data.isShow != "Y") {
          this.disable = true;
        }
      });
      sysPositionslistAll().then(res => {
        this.options = res.data.result;

        // this.options2=res.data.result;
      });
    },
    goback() {
      history.go(-1);
    },
    approve() {
      this.lists.leaveTime = this.leaveTimeChange;
      this.lists.isReal = "T";
      if(this.lists.station=="协办"){
        this.lists.coVoList = this.coVoList;
      if (this.lists.coVoList.length > 0) {
        this.lists.coVoList.forEach(el => {
          el.coTime = el.coTime
            ? Moment(el.coTime).format("YYYY-MM-DD")
            : "";
        });
      }
      }
      
      this.lists.remarks = this.inputs;
      delete this.lists.applyListDtos;
      this.lists.goalQueue = this.mainform.queueName;
      this.lists.goalQueue = this.goalForm.queueName;
      this.lists.goalCollector = this.mainform.goalCollector;
      this.lists.turnUser = this.goalForm.goalCollector;
      // this.lists.coTime=this.mainform.coTime?Moment(this.mainform.coTime).format('YYYY-MM-DD'):"";
      this.lists.coUser = this.colchange;
      let para = this.lists;
      if (this.lists.remarks == " ") {
        this.$alert("请填写备注！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        });
      } else {
        Approvalapply(para).then(res => {
          if (res.data.success == true) {
            this.$message({
              type: "success",
              message: "提交完成！"
            });
            this.getLists();
          } else {
            this.$alert(" 提交失败！", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              center: "true"
            });
          }
        });
      }
    },
    approveturn() {
      this.lists.isReal = "T";
      this.lists.remarks = this.inputs;
      delete this.lists.applyListDtos;
      this.lists.goalQueue = this.goalForm.queueName;
      this.lists.turnUser = this.goalchange;
      let para = this.lists;
      if (this.lists.remarks == " ") {
        this.$alert("请填写备注！", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          center: "true"
        });
      } else {
        Approvalapply(para).then(res => {
          if (res.data.success == true) {
            this.$message({
              type: "success",
              message: "提交完成！"
            });
            this.getLists();
          } else {
            this.$alert(" 提交失败！", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              center: "true"
            });
          }
        });
      }
    },
    getLeftTree() {
      this.listLoading = true;
      authlist().then(res => {
        this.listsLeft = res.data.result;
      });
    },
    queueChange(val) {
      this.listId = val.coQueueName;
      this.lists.queueId = this.listId;
      val.coQueueId = val.coQueueName;
      this.rightShow();
    },
    goalqueueChange(val) {
      this.listIds = val;
      this.lists.queueId = this.listIds;
      this.rightShow();
    },
    CollectorChange(val) {},
    rightShow() {
      let para = {
        queueId: this.listId
      };
      authlistRight(para).then(res => {
        this.queueId = this.listId;
        let data = res.data.result;
        this.authlistRight = data;
      });
    },
    deleteListRow(rows,item) {
      let para ={
        coUid:rows,
        applyId:item
      }
      deleteCoInfo(para).then(res=>{
        if(res.data.success){
          this.$message({
              type: "success",
              message: "删除成功！"
            });
             this.getCoInfo();
        }else{
         this.$message.error(res.data.message)
        }
      })
      // rows.splice(index, 1);
    },
    //获取协办列表
    getCoInfo() {
      let para = {
        id: this.id
      };
      listCoInfo(para).then(el => {
        let data = el.data.result.coVoList;
        this.coVoList = data;
        this.icsId = el.data.result.icsId;
        this.applyId = el.data.result.applyId;
      });
    }
  },
  mounted() {
    this.getLists();
    this.getLeftTree();
    this.goalgetMessage();
    this.getCoInfo();
  }
};
</script>
<style>
#coId .el-input {
  min-height: 0px !important;
}
</style>



