<template>
  <section ref="abc" style="overflow-y: auto;">
      <el-collapse v-model="activeNames" >
			<el-collapse-item title="核销数据" name="1">
				<div>
					<table class="ht_table">	
						<tr>
							<td class="tds">已核销本金总额</td>
              <td>{{details.writeOffPrincipal}} </td>
							<td class="tds">已核销利息总额</td>
              <td>{{details.writeOffInterest}} </td>		
							<td class="tds">已核罚息</td>
             <td>{{details.writeOffPenalty}}</td>
						</tr>
						<tr>
							<td class="tds">已核费用</td>
              <td>{{details.writeOffFee}}</td>
							<td class="tds">核销总额</td>
              <td>{{details.writeOffTotalAmount}}</td>
							<td class="tds">核销日期</td><td>{{details.writeOffDate}}</td>
						</tr>
					</table>
				</div>			
			</el-collapse-item>
    	<el-collapse-item title="核销后还款" name="2" style="position:relative">
			  <el-button class="filter-item" style="position:absolute;top:3px;left:140px"  type="primary" size="mini" @click="addInfos(details)">提交</el-button>
			  <table  class="ht_table"  ref="writeoff" :model="writeoff">
				<tr>
					
					<td class="tds">核销后还款金额</td><td>{{details.repaymentAmountAfterWo}}</td>
					<td class="tds">剩余本金总额</td><td>{{details.residualPrincipal}}</td>		
					<td class="tds">剩余利息总额</td><td>{{details.residualInterest}}</td>							
				</tr>
				<tr>
					<td class="tds">核销前罚息总额</td><td>{{details.penaltyAmountBeforeWo}}</td>
					<td class="tds">核销前费用总额</td><td>{{details.feeAmountBeforeWo}}</td>
					<td class="tds">核销后罚息总额</td><td>{{details.penaltyAmountAfterWo}}</td>
				</tr>
				<tr>
					<td class="tds">合同利率</td><td>{{details.rate}}</td>
					<td class="tds">核销后是否追偿</td>
					<td colspan="3">
						<select v-model="writeoff.a"  placeholder="核销后是否追偿" >
                <option label="是" value="是"></option>
                <option label="否" value="否"></option>  
            </select>  
					</td>
				</tr>
				<tr>
					<td class="tds">催收状态</td><td colspan="5">
            <span>曾进行过的催收状态</span>
						<el-checkbox-group v-model="writeoff.b" @change="changes">
							<el-checkbox v-for="(col,index ) in coList" :label="col.name" :value="col.field" :key="index"></el-checkbox>
						</el-checkbox-group>
					</td>
				</tr>
				<tr>
					<td class="tds">核销原因</td>
					<td colspan="5">
						<el-input v-model="writeoff.c"  type="textarea"></el-input>
					</td>
				</tr>
			  </table>
			</el-collapse-item>
			<el-collapse-item title="还款登记" name="3" style="position:relative">
        <el-col style="text-align:right">
          <el-button type="primary" style="margin: 0 20px 10px 0" @click="addpayList">添加</el-button>  
        </el-col>
			<el-table :data="wolist" highlight-current-row  style="width: 100%;" stripe border> 
                          
        <el-table-column  align="center" :prop="col.field" sortable :label="col.title" :width="col.width"  v-for="(col, index) in cols" :key="index" >
          <template slot-scope="scope">
            <el-input  v-show="scope.row.edit" size="small" v-if="(col.field!='applicationNumber'&&col.field!='reviewer'&&col.field!='reason'&&col.field!='isPass'&&col.field!='repaymentDay')" v-model="scope.row[col.field]" class="inputInner"></el-input>
            <el-date-picker v-show="scope.row.edit"  type="date" v-if="(col.field!='applicationNumber'&&col.field!='repaymentPeople'&&col.field!='reviewer'&&col.field!='reason'&&col.field!='isPass')" @change="dayChange" v-model="scope.row[col.field]"  ></el-date-picker>
            <span v-show="!scope.row.edit">{{ scope.row[col.field] }}</span>
            <span v-show="scope.row.edit" v-if="(col.field!='repaymentMoney'||col.field!='remarks'||col.field!='repaymentPeople'||col.field!='repaymentDay')">{{ scope.row[col.field] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center" >
          <template slot-scope="scope">
            <el-button  v-if="scope.row.isPass=='拒绝'" :type="scope.row.edit?'success':'primary'" size="mini" @click='addressEdit(scope.row)'  >{{scope.row.edit?'完成':'编辑'}}</el-button>
            <!--  -->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增还款登记" :visible.sync="messageopen" :modal="true" :modal-append-to-body="false" id="MsgDialog" :show-close='false'>
			<el-form :model="messageforms" ref="messageforms" >
        <el-form-item label="还款金额" :label-width="formLabelWidth" >
					<el-input v-model="messageforms.repaymentMoney"  style="width:300px;margin-left:5px" id="inp"></el-input>
				</el-form-item>
        <el-form-item label="还款人" :label-width="formLabelWidth" >
					<el-input v-model="messageforms.repaymentPeople"  style="width:300px;margin-left:5px" id="inp"></el-input>
				</el-form-item>
         <el-form-item label="还款时间" :label-width="formLabelWidth" >
            <el-date-picker type="date" placeholder="选择还款时间" v-model="messageforms.repaymentDay" @change="dataChange"  style="width:300px;margin-left:5px" ></el-date-picker>
         </el-form-item>
       
        	<el-form-item label="复核人 " :label-width="formLabelWidth">
					<el-select v-model="messageforms.reviewer" ref="fhr"  placeholder="请选择" @change="getreviewer"  style="width:300px;" id="selectMes">
						<el-option v-for="(item,index) in messagetypes" :key="index"  :label="item.username" :value="item.id" ></el-option>
					</el-select>
				</el-form-item>	
        <el-form-item label="备注 "  :label-width="formLabelWidth">
						<el-input type="textarea" autosize v-model="messageforms.remarks" style="width:300px;margin-left:5px"></el-input>
				</el-form-item>    
      	</el-form>
         <div slot="footer" class="dialog-footer">
				<el-button style="padding:10px" @click="cancle('messageforms')" type="primary">取 消</el-button>
				<el-button type="primary" @click.native.prevent="confirmmessage(messageforms)" style="padding:10px">确 定</el-button>
			</div>
		</el-dialog>
        <!--工具条-->
        <el-col :span="24" class="toolbar">           
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[50, 100,500]"   :total="total"  style="float:right;">
            </el-pagination>
        </el-col>
			</el-collapse-item>
      </el-collapse>
  </section>
</template>
<script>
import Moment from 'moment/moment';
//import NProgress from 'nprogress'
import { writeOffDetail, update, wolist,getByRoleId,woinsert,updateWriteOffRepayment } from "@/api/writeoff";
export default {
  data() {
    return {
      activeNames: ["1", "2", "3"],
      details: [],
      lists: [],
      cols: [
        { title: "合同号", field: "applicationNumber" },
        { title: "还款金额", field: "repaymentMoney" },
        { title: "还款人", field: "repaymentPeople" },
        { title: "还款时间", field: "repaymentDay" },
        { title: "备注", field: "remarks" },
        { title: "复核人", field: "reviewer" },       
        { title: "复核意见", field: "reason" },
        { title: "状态", field: "isPass" }

      ],
      checkList: [],
      wolist: [],
      total: 0,
      pagesize: 500,
      page: 1,
      coList: [
        { name: "电催", field: "updateDate" },
        { name: "实地", field: "repayments" },
        { name: "外包", field: "bankAccount" },
        { name: "收车", field: "bankName" },
        { name: "诉讼（立案）", field: "bankName" },
        { name: "拍卖", field: "bankName" }
      ],
      messagetypes:[],
      writeoff: {
        a: "",
        b: [],
        c: ""
      },
      id: this.$store.state.navTabs.tabId,
      listLoading: false,
      messageopen:false,
      messageforms:{
        applicationNumber:"",
        repaymentMoney:"",
        repaymentPeople:"",
        repaymentDay:"",
        reviewer:"",
        remarks:""
      },
      formLabelWidth:"120px"
    };
  },
  methods: {
    dayChange(val){  
      this.messageforms.repaymentDay=val;
      // this.messageforms.repaymentDay=this.messageforms.repaymentDay?Moment(this.messageforms.repaymentDay).format('YYYY-MM-DD'):""
    },
    dataChange(val){
      this.messageforms.repaymentDay=val
    },
    changes(val) {
      this.writeoff.b = val;
    },
    getreviewer(val){
      this.messageforms.reviewer=val
    },
    getreviewerlist(){
      getByRoleId().then(res =>{
        this.messagetypes=res.data.result
        this.messageforms.reviewer=this.messagetypes[0].username
      })
    },
    confirmmessage(messageforms){     
      if(typeof(Number(this.messageforms.repaymentMoney))==="number"&&(Number(this.messageforms.repaymentMoney)!==Infinity)&&!isNaN(Number(this.messageforms.repaymentMoney))){
        let para={
        icsId:this.$route.params.id,
        repaymentMoney:this.messageforms.repaymentMoney,
        repaymentPeople:this.messageforms.repaymentPeople,
        repaymentDay:this.messageforms.repaymentDay,
        reviewer:this.messageforms.reviewer,
        remarks:this.messageforms.remarks
      }
      this.messagetypes.forEach(res =>{
        if(this.messageforms.reviewer==res.id||this.messageforms.reviewer==res.username){
         para.reviewer= res.id
        }
      });
      woinsert(para).then(res =>{
      if(res.data.success){
      this.messageopen=false; 
        this.messageforms.repaymentMoney=""
        this.messageforms.repaymentPeople=""
        this.messageforms.repaymentDay=""
        this.messageforms.reviewer=""
        this.messageforms.remarks=""
        this.getwolist()  
      }else{
        this.$message({
          type: "warning",
          message: res.data.message
        })
      }      
      })
      }else{
        this.$message({
          type: "warning",
          message:"请输入正确的文本格式！"
        })
      }
      
    },
    cancle(messageforms){
      this.messageforms={}
      this.messageopen=false;
    },
    //获取列表
    getlists() {
      let para = {
        missionId: this.$route.params.id
      };
      this.listLoading = true;
      writeOffDetail(para).then(res => {
        let data = res.data.result;
        this.details = data;
        this.writeoff.a = data.isRecourse;
        this.writeoff.b = data.afpStates;
        this.writeoff.c = data.writeOffReason;
        this.listLoading = false;
      });
    },
    addInfos(data) {
      let a = data.isRecourse;
      let b = data.afpState;
      let c = data.writeOffReason;
      if (a == data.isRecourse) {
        data.isRecourse = this.writeoff.a;
      }
      if (b == data.afpState) {
        data.afpStates = this.writeoff.b;
      }
      if (c == data.writeOffReason) {
        data.writeOffReason = this.writeoff.c;
      }
      let para = data;
      update(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "更新成功！"
          });
          this.getlists();
        }
      });
    },
    getwolist() {
      let para = {
        missionId: this.$route.params.id,
        page: this.page,
        pageSize: this.pagesize
      };
      wolist(para).then(res => {
        if(res.data.success){
          this.wolist=res.data.result.data
          this.total= res.data.result.recordsTotal
          this.wolist.forEach(ele => {
            if(ele.isPass==1){
              ele.isPass="通过"
            }
            if(ele.isPass==2){
              ele.isPass="拒绝"
            }
            if(ele.isPass==0){
              ele.isPass="待审核"
            }
          });
           this.wolist =  this.wolist.map(v => {
					this.$set(v, 'edit', false)
					return v;
					
				});
        }
        
      });
    },
    addressEdit(row){   
			if(row.edit=!row.edit){
			
			}else{ 
			let para ={
        id:row.id,
        repaymentMoney:row.repaymentMoney,
        repaymentPeople:row.repaymentPeople,
        repaymentDay:row.repaymentDay?Moment(row.repaymentDay).format('YYYY-MM-DD'):"",
        remarks:row.remarks
      } 
      //  this.getwolist() 
				updateWriteOffRepayment(para).then(res =>{
						if(res.data.success){
							this.$message({
								type: 'success',
								message: '编辑成功！'
              })
              this.getwolist()
						}else{
							this.$message({
								type: 'error',
								message: '编辑失败，请联系管理员！'
							})
						}
				});
							
			}
		},
    handleSizeChange(val) {
      this.pagesize = val;
      this.getwolist();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getwolist();
    },
    addpayList(){
      this.messageopen=true;
      this.getreviewerlist()
    }
  },
  mounted() {
    this.getlists();
    this.getwolist();
    let h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 100;
    this.$refs.abc.style.height = h + "px";
  }
};
</script>

<style scoped>
</style>

<style scoped>
.ht_table td {
  color: #269aff;
  font-size: 13px;
}
.ht_table .tds {
  color: #000;
}

.ht_table input,
.ht_table select {
  height: 25px;
  width: 98% !important;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
}
</style>
