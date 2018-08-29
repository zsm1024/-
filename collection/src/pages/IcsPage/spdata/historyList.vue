<template>
<section class="sections">
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
    <el-form-item label="协办到期日:" label-width="120px">
      <span>{{lists.coTime}}</span>
    </el-form-item>
    <el-form-item style="padding:10px ">
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
      <span>{{lists.leaveTime}}</span>
    </el-form-item>
    <el-form-item style="padding:10px ">
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
    <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <!-- 转队列 -->
    <el-form :data="lists" v-else-if="lists.station=='手动转队列'">
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
    <el-form-item style="padding:10px ">

      <el-button type="primary" size="small" style="margin-left:10px"  @click="goback">返回</el-button>
    </el-form-item>      
  </el-form>
  <el-table :data="listPage">
      <el-table-column :prop="cols.field"  :label="cols.title" v-for="(cols, index) in cols" border stripe :key="index" align="center" :width="cols.width" class="spTable"></el-table-column>
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
        console.log(data)
        // if(data.isShow!="Y"){
        //   this.disable=true;
        // }
      });
    },
    goback(){
      history.go(-1)
    },
  },
   mounted() {
    this.getLists();
  }
};
</script>


