<template>
<section>
  <el-form :data="lists" v-if="lists.station=='协办'" :model="mainform">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="协办队列:" label-width="120px" prop="queueName">
      <span v-if="lists.isShow=='N'">{{lists.goalQueue}}</span>
      <el-select  v-else placeholder="请选择"  v-model="mainform.queueName"  style="width:150px" @change="queueChange" clearable >
        <!-- :placeholder="lists.goalQueue" -->
            <el-option  v-for="item in listsLeft" :key="item.id" :label="item.queueName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="协办员:" label-width="120px" prop="goalCollector"> 
       <span v-if="lists.isShow=='N'">{{lists.goalCollector}}</span>
      <el-select v-else placeholder="请选择" v-model="mainform.goalCollector" style="width:150px" clearable>
            <el-option v-for="items in authlistRight" :key="items.id" :label="items.username" :value="items.id"></el-option>
        </el-select>
    </el-form-item>
     <el-form-item label="协办到期日:" label-width="120px" prop="coTime">
      <span v-if="lists.isShow=='N'">{{lists.coTime}}</span>
      <!-- :placeholder="lists.coTime"  -->
     <el-date-picker v-else placeholder="请选择" type="date" v-model="mainform.coTime" style="width:150px" ></el-date-picker>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">提交</el-button>
      <!-- <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button> -->
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 留案 -->
    <el-form :data="lists" v-if="lists.station=='留案'">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="留案到期日:" label-width="120px">
      <!-- <span >{{lists.leaveTime}}</span> -->
       <input  v-if="lists.isShow=='N'" :value="lists.leaveTime" disabled/>
       <el-date-picker  v-else type="date" :placeholder="lists.leaveTime" v-model="lists.leaveTime" ></el-date-picker>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">提交</el-button>
      <!-- <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button> -->
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 转队列 -->
    <el-form :data="lists" v-else-if="lists.station=='手动转队列'">
      <el-form-item label="案件ID:" label-width="120px">
      <router-link class="a-href" :to="{path:'/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
      </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="目标队列:" label-width="120px">
      <span>{{lists.goalQueue}}</span>
    </el-form-item>
    <el-form-item label="目标催收员:" label-width="120px">
      <span>{{lists.goalCollector}}</span>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">提交</el-button>
      <!-- <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button> -->
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <el-table :data="listPage">
      <el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" border stripe :key="index" align="center" :width="cols.width"></el-table-column>
  </el-table> 
  </section>
</template>
<script>
import {Approvalfind,Approvalapply} from "@/api/sp";
 import{authlist,authlistRight} from "@/api/basedata"
export default {
  data() {
    return {
      disable:false,
      lists:[],
      listPage:[],
      inputs:"",
      listsLeft:"",
      listId: "",
      authlistRight:"",
      mainform: {
          queueName:"",
          goalCollector:"",
          coTime:""
			},
      id:this.$route.params.id,
      cols: [
        { title: "节点名称", field: "step"},
        { title: "用户ID", field: "username"},
        { title: "审批日期", field: "updateTime"},
        { title: "备注", field: "remarks"},      
      ]
    };
  },
  methods: {
    getLists(){
      let para={
        id:this.id
      }
      Approvalfind(para).then(res=>{
        let data=res.data.result;
        this.lists=data;
        console.log(this.lists)
        this.listPage=data.applyListDtos;
        this.mainform.queueName=data.goalQueue;
        this.mainform.goalCollector=data.goalCollector;
        this.mainform.coTime=data.coTime;
        if(data.isShow!="Y"){
          this.disable=true;
        }

      });
    },
    goback(){
      history.go(-1)
    },
    approve(){
      this.lists.isReal="T";
      this.lists.remarks=this.inputs;
      delete this.lists.applyListDtos;
      this.lists.goalQueue=this.mainform.queueName;
      this.lists.goalCollector=this.mainform.goalCollector;
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
                  message: '提交完成！'
                })
              this.getLists();
            }else{
            this.$alert(' 提交失败！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
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
    queueChange(val){
      this.listId =val;
      this.mainform.goalCollector="";
      this.rightShow()
    },
    CollectorChange(val){
    },
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
    // refuse(){
    //   this.lists.isReal="N";
    //   this.lists.remarks=this.inputs;
    //   delete this.lists.applyListDtos;
    //   let para=this.lists;
    //    if(this.lists.remarks==" "){
    //     this.$alert('请填写备注！','提示',{
    //                 confirmButtonText:'确定',
    //                 type:'warning',
    //                 center:'true'
    //           })
    //     }else{
    //       Approvalapply(para).then(res=>{
    //         if(res.data.success==true){
    //              this.$message({
    //               type: 'success',
    //               message: '审批完成！'
    //             })
    //           this.getLists();
    //         }else{
    //         this.$alert(' 审批失败！','提示',{
    //                 confirmButtonText:'确定',
    //                 type:'warning',
    //                 center:'true'
    //           })
    //         }
    //       });
    //     }
    //   },
      // close(){
      //    this.lists.isReal="C";
      // this.lists.remarks=this.inputs;
      // delete this.lists.applyListDtos;
      // let para=this.lists;
      //  if(this.lists.remarks==" "){
      //   this.$alert('请填写备注！','提示',{
      //               confirmButtonText:'确定',
      //               type:'warning',
      //               center:'true'
      //         })
      //   }else{
      //     Approvalapply(para).then(res=>{
      //       if(res.data.success==true){
      //            this.$message({
      //             type: 'success',
      //             message: '审批完成！'
      //           })
      //         this.getLists();
      //       }else{
      //       this.$alert(' 审批失败！','提示',{
      //               confirmButtonText:'确定',
      //               type:'warning',
      //               center:'true'
      //         })
      //       }
      //     });
      //   }
      // }
  },
   mounted() {
    this.getLists();
    this.getLeftTree()
  }
};
</script>


