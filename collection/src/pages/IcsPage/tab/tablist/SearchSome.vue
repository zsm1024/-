<template>
  <section   style="height:100%">
    <div>
      <el-input placeholder="请输入内容" v-model="select" id="searchInput" @keyup.enter.native="getMsg" class="input-with-select">
        <el-button slot="append" @click="getMsg">查询</el-button>
      </el-input>
    </div>
    <el-tabs v-model="activeName" type="border-card" id="searchMessage" style="background:#f0f0f0;height:95%">
      <el-tab-pane  v-for="(item,$index) in formList" :key="$index" style="height:100%" :label="item.k" :name="item.k" >
         <iframe frameborder="0" :src="item.val" width="100%" height="100%"></iframe> 
      </el-tab-pane> 
    </el-tabs>    
  </section>
</template>
<script>
import { GetBaidu,Getsougou } from "@/api/search";
import {findByType} from '@/api/basedata'
export default {
  data() {
    return {
      formList:[],
      BDsrc:"",
      SGsrc:"",
      TYsrc:"",
      WBsrc:"",  
      MTsrc:"",
      DPsrc:"", 
      activeName: "百度",
      select: "",
    };
  },
  mounted(){
    this.getList()
  },
  methods: { 
    compare(e){
      return function(a,b){
        let value1 = a[e];
        let value2 = b[e];
        return value1 - value2
      }
    },
    getList(){
       let para = {
          type: "SearchForm"
        };
        findByType(para).then(res => {
          let data = res.data.result;
          this.formList = data.sort(this.compare('id'))       
         this.formList.forEach(ele =>{
           ele.val= ele.val+this.select
         })
        });
    } ,
      getMsg(){         
        this.getList()    
      },  
  }
};
</script>

 <style lang="scss">
#searchInput {
  width: 500px;
  margin: 10px;
  input {
    height: 37px;
  }
}
.box-card{width: 32%;
    display: inline-block;
    min-height:140px;
    margin-left: 10px
}
.searchRes{
  .el-card__header{padding:0 5px;};
  .clearfix{display: flex};
  h2{width: 80%};
  a:hover{text-decoration: underline}
  .el-card__body{padding: 5px}
  .item{font-size: 15px}
}
#searchMessage  .el-tabs__content{height: 90%}
</style>

   

