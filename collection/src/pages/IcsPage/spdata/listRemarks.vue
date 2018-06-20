<template>
<section>
  <el-form :data="lists" v-if="lists.station=='协办'">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="协办队列:" label-width="120px">
      <span>{{lists.goalQueue}}</span>
    </el-form-item>
    <el-form-item label="协办员:" label-width="120px">
      <span>{{lists.goalCollector}}</span>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">批准</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  
  <!-- 留案 -->
    <el-form :data="lists" v-else-if="lists.station=='留案'">
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
      <span>{{lists.leaveTime}}</span>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">批准</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 退案 -->
 <el-form :data="lists" v-else-if="lists.station=='退案'">
    <el-form-item label="案件ID:" label-width="120px">
     <router-link class="a-href" :to="{path:'/IcsPage/searchs/colsearchdetail/'+lists.icsId}"><span>{{lists.applicationNumber}}</span></router-link>
    </el-form-item>
    <el-form-item label="当前催收队列:" label-width="120px">
      <span>{{lists.nowQueue}}</span>
    </el-form-item>
    <el-form-item label="催收员:" label-width="120px">
      <span>{{lists.nowCollector}}</span>
    </el-form-item>
    <el-form-item label="派案到期日:" label-width="120px">
      <span>{{lists.deadTimeOfTheSendCase}}</span>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"  :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">批准</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button>
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>


  <!-- 转队列 -->
    <el-form :data="lists" v-if="lists.station=='手动转队列'">
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
      <span>{{lists.goalQueue}}</span>
    </el-form-item>
    <el-form-item label="目标催收员:" label-width="120px">
      <span>{{lists.goalCollector}}</span>
    </el-form-item>
    <el-form-item label="审批备注:(不超过2000字)">
     <el-input  inline type="textarea"   :maxlength="2000" style="min-height:40px" :disabled="disable" v-model="inputs"></el-input>
    </el-form-item> 
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" :disabled="disable" @click="approve">批准</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="refuse">拒绝</el-button>
      <el-button type="primary" size="small" :disabled="disable" @click="close">关闭</el-button>
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
export default {
  data() {
    return {
      disable:false,
      lists:[],
      listPage:[],
      inputs:"",
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
        this.listPage=data.applyListDtos;
   
        if(data.isShow!="Y"){
          this.disable=true;
        }
      });
    },
    goback(){
      history.go(-1)
    },
    approve(){
      this.lists.isReal="Y";
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
                  message: '审批完成！'
                })
              this.getLists();
              window.history.back()
            }else{
            this.$alert(' 审批失败！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
            }
         
          });
        }
    },
    refuse(){
      this.lists.isReal="N";
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
                  message: '拒绝成功'
                })
              this.getLists();
            }else{
            this.$alert(' 拒绝失败！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
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


      }
  },
   mounted() {
    this.getLists();
  }
};
</script>


