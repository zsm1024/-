<template>
<el-collapse v-model="activeNames" accordion>	
    <el-collapse-item name="1" title="诉讼案件信息"  style="position:relative">	      
        <table  :model="legalInfo"  class="searchTable">
            <tbody class="legal" v-loading="listLoadings">
                <tr>
                    <td><span>申请诉前保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyBeforeLawsuitAllTime" type="date" readonly  value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>诉前的保全法院</span></td>
                    <td><input  v-model="legalInfo.beforeLawsuitAllCourt" readonly/></td>
                    <td><span>采取诉前保全时间</span></td>
                    <td>
                      <el-date-picker v-model="legalInfo.actionBeforeLawsuitAllTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" readonly></el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td><span>申诉前的调解时间</span></td><td><el-date-picker v-model="legalInfo.beforeLawsuitConciliationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" readonly></el-date-picker></td>
                    <td ><span>诉前调解法院</span></td><td colspan="3"><input type="text" v-model="legalInfo.beforeLawsuitConciliationCourt" readonly style="display:inlin-block;width:95%"></td>
                </tr>
                <tr>
                    <td><span>提交债权主张时间</span></td><td><el-date-picker readonly v-model="legalInfo.submissionClaimsTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" ></el-date-picker></td>
                    <td ><span>受理债权主张法院</span></td><td colspan="3"><input type="text" readonly v-model="legalInfo.acceptClaimsCourt" style="display:inlin-block;width:95%"></td>
                </tr>                
                <tr>
                    <td><span>提交立案时间</span></td>
                    <td><el-date-picker v-model="legalInfo.submissionFilingTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>立案法院</span></td>
                    <td><input readonly v-model="legalInfo.filingCourt"/></td>
                    <td><span>缴纳诉讼费时间</span></td>
                    <td><el-date-picker v-model="legalInfo.captureExpendsTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>一审案号</span></td>
                    <td><input readonly v-model="legalInfo.firstInstanceReference"/></td>
                    <td><span>申请诉讼保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyLawsuitAllTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>采取诉讼保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.actionLawsuitAllTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                  <tr>
                    <td><span>保证金金额</span></td>
                    <td><input readonly v-model="legalInfo.deposit"/></td>
                    <td><span>缴纳保证金时间</span></td>
                    <td><el-date-picker v-model="legalInfo.payDepositTime"  readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>退还保证金时间</span></td>
                    <td><el-date-picker v-model="legalInfo.backDepositTime"  readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                 <tr>
                    <td><span>发布开庭公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishCourtAnnounceTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择" ></el-date-picker></td>
                    <td><span>调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.conciliationTime" readonly value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>第一次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.firstCourtTime" readonly value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publisJudgmentTime" readonly  type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>一审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.trialMediationTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>第二次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondCourtTime"type="date" readonly value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    
                    <td><span>提出/收到二审诉状时间</span></td>
                    <td><el-date-picker v-model="legalInfo.proposeReceiveSecondInstanceTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>发布二审开庭公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishSecondInstanceCourtTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>二审法院</span></td>
                    <td><input readonly v-model="legalInfo.secondInstanceCourt"/></td>
                </tr>
                <tr>
                    <td><span>二审案号</span></td>
                    <td><input readonly v-model="legalInfo.secondInstanceNumber"/></td>
                    <td><span>二审开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondInstanceCourtTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>二审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondTrialMediationTime"  readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布二审判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishSecondJudgmentTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>判决生效时间</span></td>
                    <td><el-date-picker v-model="legalInfo.judgmentEffectTime" type="date" readonly value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>申请执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyActionTime" type="date" readonly value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>申请执行法院</span></td>
                    <td><input readonly v-model="legalInfo.applyActionCourt"/></td>
                    <td><span>执行案号</span></td>
                    <td><input readonly v-model="legalInfo.actionNumber"/></td>
                    <td><span>受托执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.entrustActionTime" readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                </tr>
                 <tr>
                    <td><span>受托执行法院</span></td>
                    <td><input readonly v-model="legalInfo.entrustedActionCourt"/></td>                  
                    <td><span>收到法院终裁日期</span></td>
                    <td><el-date-picker v-model="legalInfo.receiveCourtFinalDate"  readonly type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>上失信时间</span></td>
                    <td><el-date-picker v-model="legalInfo.discreditTime" readonly  type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                   
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
    <el-collapse-item  title="诉讼费用" name="2" style="position:relative">
        <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="FeeList"  >
				<el-table-column :prop="col.field" class="feesNum" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" :width="col.width" show-overflow-tooltip>					
				</el-table-column>
			</el-table>
      <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeFee" @size-change="SizeChangeFee" :page-size="pagesizeFee" :page-sizes="[10, 20, 50, 100]"   :total="totalFee"   style="float:right;">
				</el-pagination>
			</el-col>         
    </el-collapse-item>
    <el-collapse-item  title="诉讼事件管理" name="3" style="position:relative">  
      <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="EventList"  >        
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols1" :key="index" align="center" :width="col.width" show-overflow-tooltip>				
				</el-table-column>
			</el-table>
      <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeEvent" @size-change="SizeChangeEvent" :page-size="pagesizeEvent" :page-sizes="[10, 20, 50, 100]"   :total="totalEvent"   style="float:right;">
				</el-pagination>
			</el-col>         
  </el-collapse-item>
  <el-collapse-item  title="评估拍卖管理" name="4" style="position:relative">  
     <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="InfoList"  >        
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols2" :key="index" align="center" :width="col.width" show-overflow-tooltip >					
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeInfo" @size-change="SizeChangeInfo" :page-size="pagesizeInfo" :page-sizes="[10, 20, 50, 100]"   :total="totalInfo"   style="float:right;">
				</el-pagination>
			</el-col>        
  </el-collapse-item>
</el-collapse>
</template>

<script>
import {
  listLegalActionInfo,
  updateLegalActionInfo,
  insertLegalActionInfo,
  ListLegalActionFee,
  insertLegalActionFee,
  updateLegalActionFee,
  delLegalActionFee,
  ListLegalActionEvent,
  insertLegalActionEvent,
  updateLegalActionEvent,
  delLegalActionEvent,
  ListLegalActionInfo,
  insertLegalActionInfos,
  updateLegalActionInfos,
  delLegalActionInfo,
  operationStatus
} from "@/api/legal"
export default {
  data() {
    return {
      activeNames: ["1"],
      legalInfo: {
        applyBeforeLawsuitAllTime: "",
        beforeLawsuitAllCourt: "",
        actionBeforeLawsuitAllTime: "",
        beforeLawsuitConciliationTime: "",
        beforeLawsuitConciliationCourt: "",
        submissionClaimsTime: "",
        acceptClaimsCourt: "",
        submissionFilingTime: "",
        filingCourt: "",
        captureExpendsTime: "",
        firstInstanceReference: "",
        applyLawsuitAllTime: "",
        payDepositTime: "",
        deposit: "",
        backDepositTime: "",
        actionLawsuitAllTime: "",
        publishCourtAnnounceTime: "",
        conciliationTime: "",
        firstCourtTime: "",
        secondCourtTime: "",
        publisJudgmentTime: "",
        trialMediationTime: "",
        proposeReceiveSecondInstanceTime: "",
        publishSecondInstanceCourtTime: "",
        secondInstanceCourt: "",
        secondInstanceNumber: "",
        secondInstanceCourtTime: "",
        secondTrialMediationTime: "",
        publishSecondJudgmentTime: "",
        judgmentEffectTime: "",
        applyActionTime: "",
        applyActionCourt: "",
        actionNumber: "",
        entrustActionTime: "",
        entrustedActionCourt: "",
        receiveCourtFinalDate: "",
        discreditTime: ""
      },
      LegalActionFee: {
        feeType: "",
        amount: "",
        payDate: "",
        creator: "",
        createTime: "",
        payMethod: "",
        remark: "",
        reimStatus: ""
      },
      LegalActionEvent: {
        legalActionCode: "",
        remindTime: "",
        operator: "",
        remark: "",
        createTime: ""
      },
      LegalActionInfo: {
        auctioneer: "",
        address: "",
        contact: "",
        phone: "",
        auctioneerTime: "",
        auctioneerMount: ""
      },
      addSsFees: false,
      addSsEvents: false,
      addSsInfos: false,
      NoUsed:false,
      cols: [
        { title: "费用名称", field: "feeType" },
        { title: "费用", field: "amount" },
        { title: "缴纳时间", field: "payDate",width:"130" },
        { title: "支付方式", field: "payMethod" },
        { title: "备注", field: "remark" },
        { title: "报销状态", field: "reimStatus" },
        { title: "录入人", field: "creator" },
        { title: "录入时间", field: "createTime" }
      ],
      cols1: [
        { title: "诉讼事件", field: "legalActionCode" },
        { title: "提醒时间", field: "remindTime",width:"130"  },
          { title: "备注", field: "remark", width: "300" },
        { title: "操作员", field: "operator" },     
        { title: "创建时间", field: "createTime" }
      ],
      cols2: [
        { title: "拍卖评估机构", field: "auctioneer" },
        { title: "地址", field: "address", width: "150" },
        { title: "联系人", field: "contact" },
        { title: "联系电话", field: "phone" },
        { title: "拍卖/评估时间", field: "auctioneerTime",width:"130"  },
        { title: "拍卖/评估金额", field: "auctioneerMount" }
      ],
      visitpagesize: 20,
      visittotal: 0,
      visitpages: 1,
      pageFee: 1,
      pagesizeFee: 20,
      totalFee: 0,
      pageInfo: 1,
      pagesizeInfo: 20,
      totalInfo: 0,
      pageEvent: 1,
      pagesizeEvent: 20,
      totalEvent: 0,
      listLoading: false,
      listLoadings:false,
      icsId: "",
      id: "",
      formLabelWidth: "120px",
      FeeList: [],
      EventList: [],
      InfoList: []
    };
  },
  methods: {   
    visithandleCurrentChange(val) {
      this.visitpage = val;
    },
    visithandleSizeChanges(val) {
      this.visitpagesizes = val;
    },
    CurrentChangeFee(val) {
      this.pageFee = val;
    },
    SizeChangeFee(val) {
      this.pagesizeFee = val;
    },
    CurrentChangeEvent(val) {
      this.pageEvent = val;
    },
    SizeChangeEvent(val) {
      this.pagesizeEvent = val;
    },
    CurrentChangeInfo(val) {
      this.pageInfo = val;
    },
    SizeChangeInfo(val) {
      this.pagesizeInfo = val;
    },
    getListInfo() {    
      let para = {
        id: this.$route.params.id
      };   
      listLegalActionInfo(para).then(res => {
        let data = res.data.result;
        if(data!=null){
         this.listLoadings = true;
        this.id = data.id;
        this.missionId = data.missionId;
        (this.legalInfo.applyBeforeLawsuitAllTime =
          data.applyBeforeLawsuitAllTime),
          (this.legalInfo.beforeLawsuitAllCourt = data.beforeLawsuitAllCourt),
          (this.legalInfo.actionBeforeLawsuitAllTime =
            data.actionBeforeLawsuitAllTime),
          (this.legalInfo.beforeLawsuitConciliationTime =
            data.beforeLawsuitConciliationTime),
          (this.legalInfo.beforeLawsuitConciliationTime =
            data.beforeLawsuitConciliationTime),
          (this.legalInfo.filingCourt =
            data.filingCourt),          
          (this.legalInfo.submissionClaimsTime = data.submissionClaimsTime),
          (this.legalInfo.acceptClaimsCourt = data.acceptClaimsCourt),
          (this.legalInfo.submissionFilingTime = data.submissionFilingTime),
          (this.legalInfo.captureExpendsTime = data.captureExpendsTime),
          (this.legalInfo.firstInstanceReference = data.firstInstanceReference),
          (this.legalInfo.beforeLawsuitConciliationCourt = data.beforeLawsuitConciliationCourt),
          (this.legalInfo.applyLawsuitAllTime = data.applyLawsuitAllTime),
          (this.legalInfo.payDepositTime = data.payDepositTime),
          (this.legalInfo.deposit = data.deposit),
          (this.legalInfo.backDepositTime = data.backDepositTime),
          (this.legalInfo.actionLawsuitAllTime = data.actionLawsuitAllTime),
          (this.legalInfo.publishCourtAnnounceTime =
            data.publishCourtAnnounceTime),
          (this.legalInfo.conciliationTime = data.conciliationTime),
          (this.legalInfo.firstCourtTime = data.firstCourtTime),
          (this.legalInfo.secondCourtTime = data.secondCourtTime),
          (this.legalInfo.publisJudgmentTime = data.publisJudgmentTime),
          (this.legalInfo.trialMediationTime = data.trialMediationTime),
          (this.legalInfo.proposeReceiveSecondInstanceTime =
            data.proposeReceiveSecondInstanceTime),
          (this.legalInfo.publishSecondInstanceCourtTime =
            data.publishSecondInstanceCourtTime),
          (this.legalInfo.secondInstanceCourt = data.secondInstanceCourt),
          (this.legalInfo.secondInstanceNumber = data.secondInstanceNumber),
          (this.legalInfo.secondInstanceCourtTime =
            data.secondInstanceCourtTime),
          (this.legalInfo.secondTrialMediationTime =
            data.secondTrialMediationTime),
          (this.legalInfo.publishSecondJudgmentTime =
            data.publishSecondJudgmentTime),
          (this.legalInfo.judgmentEffectTime = data.judgmentEffectTime),
          (this.legalInfo.applyActionTime = data.applyActionTime),
          (this.legalInfo.applyActionCourt = data.applyActionCourt),
          // (this.legalInfo.secondCourtTime = data.secondCourtTime),
          (this.legalInfo.actionNumber = data.actionNumber),
          (this.legalInfo.entrustActionTime = data.entrustActionTime),
          (this.legalInfo.entrustedActionCourt = data.entrustedActionCourt),
          (this.legalInfo.receiveCourtFinalDate = data.receiveCourtFinalDate),
          (this.legalInfo.discreditTime = data.discreditTime),
          (this.listLoadings = false);
           this.getSsFee();
          this.getSsEvent();
          this.getSsInfo();  
        }              
      });
    },  
    //获取诉讼费
    getSsFee() {
      let para = {
        legalActionId:this.id,
        page: this.pageFee,
        pageSize: this.pagesizeFee
      };
      ListLegalActionFee(para).then(res => {
        this.FeeList = res.data.result.data;
        this.totalFee = res.data.result.recordsTotal;       
      });
    }, 
    //获取诉讼事件
    getSsEvent() {
      let para = {
        legalActionId: this.id,
        page: this.pageEvent,
        pageSize: this.pagesizeEvent
      };
      ListLegalActionEvent(para).then(res => {
        this.EventList = res.data.result.data;
        this.totalEvent = res.data.result.recordsTotal;       
      });
    }, 
    getSsInfo() {
      let para = {
        legalActionId:this.id,
        page: this.pageInfo,
        pageSize: this.pagesizeInfo
      };
      ListLegalActionInfo(para).then(res => {
        this.InfoList = res.data.result.data;
        this.totalInfo= res.data.result.recordsTotal       
      });
    },   
    getCommition(){
      operationStatus().then(res=>{
        let data =res.data
        if(data.success){
          if(data.result=="0"){
            this.NoUsed=true;
          }else{
            this.NoUsed=false;
          }
        }
      })
    }
  },
  mounted() {
    // this.insert();
    // this.getListInfo()
   this.getCommition()
  }
};
</script>
<style scoped>
.legal .el-date-editor .el-input__inner {
  margin-top: 5px;
}
.legal .el-date-editor.el-input {
  width:98%!important;
}
.legal input {
  height: 22px;
  width: 98%!important;
}
.feesNum .el-input__inner{height:30px!important}
.feesNum .el-date-editor .el-input__inner{height:30px!important}
 </style>

