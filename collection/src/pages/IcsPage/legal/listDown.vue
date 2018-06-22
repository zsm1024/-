<template>
    <el-form inline="true" :model="formInline">
        <el-form-item label="模板名称">
            <el-select v-model="formInline.name" placeholder="模板名称">
               <el-option v-for="(item,index) in Model" :key="index" :label="item.val" :value="item.val" ></el-option>
            </el-select>
        </el-form-item>
        <el-button @click="uploadlist" type="primary" size="small" style="padding:7px 9px">模板下载</el-button>	
    </el-form>
  
</template>
<script>
import{findByType} from "@/api/basedata"
import {path} from '@/config'
export default {
  data(){
    return{
        listDownUrl:"",
        Model:[],
        formInline:{
            name:""
        },
        paths:""      
    }

  },
  methods:{
    getType(){
        let para={
         type:"la_filename"
        } 
    findByType(para).then(res=>{
      let data=res.data.result;
      this.Model=data
    });
    },
    uploadlist(){
       this.paths=path.api+"/legalAction/downloadEmpowerment/"+this.formInline.name
        window.open(this.paths)
    }
  },
  mounted(){
      this.getType()
  }
}
</script>

