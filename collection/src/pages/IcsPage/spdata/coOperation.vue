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
    <el-form-item label="协办列表:" label-width="120px">
        <el-table :data="lists.coVoList">
            <el-table-column  prop="coQueueName" label="协办队列" width="100">     </el-table-column>
      <el-table-column  prop="coUserName"
      label="协办员" width="100"></el-table-column>    
        </el-table>       
      <!-- <span>{{lists.goalQueue}}</span> -->
    </el-form-item>
    <!-- <el-form-item label="协办员:" label-width="120px">
      <span>{{lists.goalCollector}}</span>
    </el-form-item> -->
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
    </section>
</template>
<script>
import { Approvalfind, Approvalapply } from "@/api/sp";
export default {
  data() {
    return {
      disable: false,
      lists: [],
      id: this.$route.params.id,
      inputs:"",
      cols: [
        { title: "节点名称", field: "step" },
        { title: "用户ID", field: "username" },
        { title: "审批日期", field: "updateTime" },
        { title: "备注", field: "remarks" }
      ]
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

        if (data.isShow != "Y") {
          this.disable = true;
        }
      });
    },
    goback() {
      history.go(-1);
    }
  },
   mounted() {
    this.getLists();
  }
};
</script>
