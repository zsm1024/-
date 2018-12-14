<template>
<section class="sections">
  <el-form :data="lists" >
    <el-form-item label="案件ID:" label-width="120px">
    <span>{{lists.applicationNumber}}</span>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">批准</el-button>
          <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <el-table :data="listPage">
      <el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" border stripe :key="index" align="center" :width="cols.width" show-overflow-tooltip class="spTable" ></el-table-column>
  </el-table> 
  </section>
</template>
<script>
// import {Approvalfind} from "@/api/sp";
import { Approvalfind, Approvalapply, listCoInfo, addCoInfo,deleteCoInfo } from "@/api/sp";
// import { authlist, authlistRight } from "@/api/basedata";
// import { getAuthUser, getAuthtree, sysPositionslistAll,getUser } from "@/api/auth";
export default {
  data() {
    return {
      disable: false,
      lists: [],
      listPage:[],
      id: this.$route.params.id,
      inputs:"",
      cols: [
        { title: "节点名称", field: "step" },
        { title: "用户ID", field: "username" },
        { title: "审批日期", field: "updateTime" },
        { title: "备注", field: "remarks" }
      ],
    };
  },
  methods: {
    getLists() {
      let para = {
        id: this.id
      };
      Approvalfind(para).then(res => {
        let data = res.data.result;
        this.lists = data;
        this.listPage = data.applyListDtos;
        // this.colchange = data.coUser;
        if (data.isShow != "Y") {
          this.disable = true;
        }
      });
    },
    goback() {
      history.go(-1);
    },
    approve() {
      this.lists.isReal = "T";
      this.lists.remarks = this.inputs;
      delete this.lists.applyListDtos;
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
    close(){
      this.lists.isReal="C";
      this.lists.remarks=this.inputs;
      delete this.lists.applyListDtos;
      let para=this.lists;
       if(this.lists.remarks==" "){
        this.$alert('请填写备注！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
        }else{
          Approvalapply(para).then(res=>{
            if(res.data.success==true){
                 this.$message({
                  type: 'success',
                  message: '关闭完成！'
                })
                this.disable=true;
              this.getLists();

            }else{
            this.$alert(' 关闭失败！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
            }
          });
        }
      },
  },
  mounted() {
    this.getLists();
    // this.getCoInfo();
  }
};
</script>
<style>
#coId .el-input {
  min-height: 0px !important;
}
</style>



