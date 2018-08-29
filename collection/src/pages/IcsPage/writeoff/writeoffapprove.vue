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
      <el-col>
        <el-input type="textarea" autosize v-model="lists.remarks" readonly  ></el-input>		
      </el-col>      			
		</el-form-item>
     <el-form-item label="审批意见 "  label-width="120px">
      <el-col>
        <el-input type="textarea" autosize v-model="lists.reason" ></el-input>		
      </el-col>      			
		</el-form-item>      
  <el-form-item style="padding:10px ">
      <el-button type="primary" size="small" @click="addmessage('1')">通过</el-button>
      <el-button type="primary" size="small" @click="addmessage('2')">拒绝</el-button>
      <el-button type="primary" size="small" @click="addmessage('3')">关闭</el-button>
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
   addmessage(item){
      let para ={
        id:this.$route.params.id,
        isPass:item,
        reason:this.lists.reason

      }
      updateWriteOffRepayment(para).then(res =>{
        	if(res.data.success){
							this.$message({
								type: 'success',
								message: '操作成功！'
              })
              this.goback();
						}else{
							this.$message({
								type: 'error',
								message: '操作失败'+res.data.message
							})
						}
      })
   }

  },
   mounted(){
    this.getmessages()
  }
};
</script>


