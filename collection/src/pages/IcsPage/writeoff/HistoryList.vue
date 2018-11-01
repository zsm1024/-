<template>
<section class="sections">
  <el-form :data="lists" >
    <el-form-item label="合同号:" label-width="120px">
      <span>{{lists.applicationNumber}}</span>
    </el-form-item>
    <el-form-item label="还款金额:" label-width="120px">
      <span>{{lists.repaymentMoney}}</span>
    </el-form-item>
    <el-form-item label="还款人:" label-width="120px">
      <span>{{lists.repaymentPeople}}</span>
    </el-form-item>
    <el-form-item label="还款日期:" label-width="120px">
      <span>{{lists.repaymentDay}}</span>
    </el-form-item>
    <el-form-item label="备注 "  label-width="120px">
        <span>{{lists.remarks}}</span>   			
	</el-form-item>
     <el-form-item label="审批意见 "  label-width="120px">
          <span>{{lists.reason}}</span>   			
		</el-form-item>      
  </el-form>
  </section>
</template>
<script>
import {updateWriteOffRepayment,find} from "@/api/writeoff";
export default {
  data() {
    return {
      lists:[],
      remarks:""
  }
  },
  methods: {
    goback(){
      history.go(-1)
    },
    getmessages(){
      let para ={
        id:this.$route.params.id
      }
      find(para).then(res =>{
        this.lists=res.data.result
      })
    },
  },
   mounted(){
    this.getmessages()
    // this.getLists();
  }
};
</script>


