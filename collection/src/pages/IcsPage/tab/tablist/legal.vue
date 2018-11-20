<template>
<el-collapse v-model="activeNames" accordion>	
    <el-collapse-item name="1" title="诉讼案件信息"  style="position:relative">	
        <el-button class="filter-item" style="position:absolute;top:3px;left:140px"  type="primary" size="mini" @click="subListInfo('legalInfo')" :disabled="NoUsed">提交</el-button>
        <!-- @click="subCarInfo('legalInfo')"		 -->
        
        <table ref="legalInfo" :model="legalInfo" >
            <tbody class="legal" v-loading="listLoadings">
                <tr>
                    <td><span>申请诉前保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyBeforeLawsuitAllTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="applyBeforeLawsuitAllTime"></el-date-picker></td>
                    <td><span>诉前的保全法院</span></td>
                    <td><input  v-model="legalInfo.beforeLawsuitAllCourt"/></td>
                    <td><span>采取诉前保全时间</span></td>
                    <td>
                      <el-date-picker v-model="legalInfo.actionBeforeLawsuitAllTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="actionBeforeLawsuitAllTime"></el-date-picker>
                    </td>
                </tr>
                <tr>
                    <td><span>申诉前的调解时间</span></td><td><el-date-picker v-model="legalInfo.beforeLawsuitConciliationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="beforeLawsuitConciliationTime"></el-date-picker></td>
                    <td ><span>诉前调解法院</span></td><td colspan="3"><input type="text" v-model="legalInfo.beforeLawsuitConciliationCourt" style="display:inlin-block;width:95%"></td>
                </tr>
                <tr>
                    <td><span>提交债权主张时间</span></td><td><el-date-picker v-model="legalInfo.submissionClaimsTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="submissionClaimsTime"></el-date-picker></td>
                    <td ><span>受理债权主张法院</span></td><td colspan="3"><input type="text" v-model="legalInfo.acceptClaimsCourt" style="display:inlin-block;width:95%"></td>
                </tr>                
                <tr>
                    <td><span>提交立案时间</span></td>
                    <td><el-date-picker v-model="legalInfo.submissionFilingTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="submissionFilingTime"></el-date-picker></td>
                    <td><span>立案法院</span></td>
                    <td><input  v-model="legalInfo.filingCourt"/></td>
                    <td><span>缴纳诉讼费时间</span></td>
                    <td><el-date-picker v-model="legalInfo.captureExpendsTime" type="date" @change="captureExpendsTimes" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>一审案号</span></td>
                    <td><input  v-model="legalInfo.firstInstanceReference"/></td>
                    <td><span>申请诉讼保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyLawsuitAllTime" @change="applyLawsuitAllTimes" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>采取诉讼保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.actionLawsuitAllTime" @change="actionLawsuitAllTimes" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                  <tr>
                    <td><span>保证金金额</span></td>
                    <td><input  v-model="legalInfo.deposit"/></td>
                    <td><span>缴纳保证金时间</span></td>
                    <td><el-date-picker v-model="legalInfo.payDepositTime" @change="payDepositTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>退还保证金时间</span></td>
                    <td><el-date-picker v-model="legalInfo.backDepositTime" @change="backDepositTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                 <tr>
                    <td><span>发布开庭公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishCourtAnnounceTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="publishCourtAnnounceTime"></el-date-picker></td>
                    <td><span>调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.conciliationTime"  @change="conciliationTime" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>第一次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.firstCourtTime" @change="firstCourtTime" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publisJudgmentTime" @change="publisJudgmentTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>一审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.trialMediationTime" @change="trialMediationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>第二次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondCourtTime" @change="secondCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    
                    <td><span>提出/收到二审诉状时间</span></td>
                    <td><el-date-picker v-model="legalInfo.proposeReceiveSecondInstanceTime" @change="proposeReceiveSecondInstanceTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>发布二审开庭公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishSecondInstanceCourtTime" @change="publishSecondInstanceCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>二审法院</span></td>
                    <td><input  v-model="legalInfo.secondInstanceCourt"/></td>
                </tr>
                <tr>
                    <td><span>二审案号</span></td>
                    <td><input  v-model="legalInfo.secondInstanceNumber"/></td>
                    <td><span>二审开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondInstanceCourtTime" @change="secondInstanceCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>二审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondTrialMediationTime" @change="secondTrialMediationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布二审判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishSecondJudgmentTime" @change="publishSecondJudgmentTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>判决生效时间</span></td>
                    <td><el-date-picker v-model="legalInfo.judgmentEffectTime" @change="judgmentEffectTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>申请执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyActionTime" @change="applyActionTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>申请执行法院</span></td>
                    <td><input  v-model="legalInfo.applyActionCourt"/></td>
                    <td><span>执行案号</span></td>
                    <td><input  v-model="legalInfo.actionNumber"/></td>
                    <td><span>受托执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.entrustActionTime" @change="entrustActionTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                </tr>
                 <tr>
                    <td><span>受托执行法院</span></td>
                    <td><input  v-model="legalInfo.entrustedActionCourt"/></td>                  
                    <td><span>收到法院终裁日期</span></td>
                    <td><el-date-picker v-model="legalInfo.receiveCourtFinalDate" @change="receiveCourtFinalDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>上失信时间</span></td>
                    <td><el-date-picker v-model="legalInfo.discreditTime" @change="discreditTimes" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                   
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
        <el-collapse-item  title="诉讼费用" name="2" style="position:relative">
            <el-button class="filter-item" style="position:absolute;top:3px;left:100px"  type="primary" size="mini" :disabled="NoUsed"  @click="addSsFee" >添加</el-button>
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="FeeList"  >
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" :disabled="NoUsed" size="mini" @click='EditFee(scope.row)'  >{{scope.row.edit?'完成':'编辑'}}</el-button>           
						<el-button type="danger" size="mini" :disabled="NoUsed" @click.native.prevent="deleteFee(scope.$index, scope.row,FeeList)" > 移除</el-button>
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" class="feesNum" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" :width="col.width" show-overflow-tooltip>
					<template slot-scope="scope">  
                        <el-input  v-show="scope.row.edit" v-if="(col.field!='feeType'&&col.field!='creator'&&col.field!='createTime'&&col.field!='payDate')" size="small" v-model="scope.row[col.field]"></el-input> 
                         <span v-show="scope.row.edit" v-if="(col.field=='creator'||col.field=='createTime')" >{{ scope.row[col.field] }}</span> 
						            <span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span> 
                         <el-date-picker v-show="scope.row.edit" type="date" placeholder="选择日期"  v-if="col.field=='payDate'"  style="width: 100%;" v-model="scope.row[col.field]"></el-date-picker>
                        <el-select   v-model="scope.row[col.field]" v-show="scope.row.edit" v-if="col.field=='feeType'">   
                          <el-option label="诉讼费" value="诉讼费"></el-option>
                          <el-option label="保全费" value="保全费"></el-option>   
                        </el-select>        						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeFee" @size-change="SizeChangeFee" :page-size="pagesizeFee" :page-sizes="[10, 20, 50, 100]"   :total="totalFee"   style="float:right;">
				</el-pagination>
			</el-col>
            <el-dialog title="新增诉讼费用" :visible.sync="addSsFees" >
			    <el-form :model="LegalActionFee" ref="LegalActionFee">
                    <el-form-item label="费用类型:" prop="feeType" :label-width="formLabelWidth">
                      <el-select v-model="LegalActionFee.feeType"  placeholder="费用类型" style="width:300px">
                            <el-option label="诉讼费" value="诉讼费"></el-option>
                            <el-option label="保全费" value="保全费"></el-option>  
                        </el-select>                      
                    </el-form-item>
                    <el-form-item label="费用金额:" prop="amount" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionFee.amount" placeholder="费用金额" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="缴纳时间:" prop="payDate" :label-width="formLabelWidth">
                        <el-date-picker v-model="LegalActionFee.payDate" @change="payDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择" style="width:300px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付方式:" prop="payMethod" :label-width="formLabelWidth">                       
                         <el-select v-model="LegalActionFee.payMethod"  placeholder="支付方式" style="width:300px">
                            <el-option label="公司支付" value="公司支付"></el-option>
                            <el-option label="其它" value="其它"></el-option>  
                         </el-select>
                    </el-form-item>
                     <el-form-item label="报销状态:" prop="reimStatus" :label-width="formLabelWidth">
                        <el-select v-model="LegalActionFee.reimStatus"  placeholder="报销状态" style="width:300px">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>  
                         </el-select>
                    </el-form-item>
                    <el-form-item label="备注:" prop="remark" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionFee.remark" placeholder="备注" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button  type="primary" @click.native.prevent="cancleFee">取 消</el-button> 
                  <el-button  type="primary" @click.native.prevent="subFee('LegalActionFee')">确 定</el-button> 
                </div>			
		    </el-dialog>
    </el-collapse-item>
          <el-collapse-item  title="诉讼事件管理" name="3" style="position:relative">
           <el-button class="filter-item" style="position:absolute;top:3px;left:150px"  type="primary" size="mini" :disabled="NoUsed" @click="addSsEvent" >添加</el-button>
             <!-- @click="addSendCar" -->
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="EventList"  >
                 <!-- -->
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" size="mini" :disabled="NoUsed" @click='EditEvent(scope.row)'  >{{scope.row.edit?'完成':'编辑'}}</el-button>
                        <!-- @click='sendCarEdit(scope.row)' -->
						<el-button type="danger" size="mini" :disabled="NoUsed"  @click.native.prevent="deleteEvent(scope.$index, scope.row,EventList)" > 移除</el-button>
                        <!-- -->
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols1" :key="index" align="center" :width="col.width" show-overflow-tooltip>
					<template slot-scope="scope">  
                        <el-input  v-show="scope.row.edit" size="small" v-if="col.field!='remindTime'&&col.field!='createTime'&&col.field!='operator'" v-model="scope.row[col.field]"></el-input> 
                        <el-date-picker v-show="scope.row.edit" type="date" placeholder="选择日期"  v-if="col.field=='remindTime'"  style="width: 100%;" v-model="scope.row[col.field]"></el-date-picker>           
						            <span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>  
                        <span v-show="scope.row.edit" v-if="col.field=='createTime'||col.field=='operator'">{{ scope.row[col.field] }}</span>         						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeEvent" @size-change="SizeChangeEvent" :page-size="pagesizeEvent" :page-sizes="[10, 20, 50, 100]"   :total="totalEvent"   style="float:right;">
				</el-pagination>
			</el-col>
            <el-dialog title="新增诉讼事件" :visible.sync="addSsEvents" >
			    <el-form :model="LegalActionEvent" ref="LegalActionEvent">
                    <el-form-item label="诉讼事件:" prop="legalActionCode" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionEvent.legalActionCode" placeholder="诉讼事件" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="提醒时间:" prop="remindTime" :label-width="formLabelWidth">
                        <el-date-picker v-model="LegalActionEvent.remindTime" @change="remindTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" style="width:300px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注:" prop="remark" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionEvent.remark" placeholder="备注" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>                 
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleEvent">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subEvent('LegalActionEvent')">确 定</el-button> 
                </div>			
		    </el-dialog>
    </el-collapse-item>
          <el-collapse-item  title="评估拍卖管理" name="4" style="position:relative">
            <el-button class="filter-item" style="position:absolute;top:3px;left:150px"  type="primary" size="mini" :disabled="NoUsed"  @click="addSsInfo" >添加</el-button>
             <!-- @click="addSendCar" -->
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe :data="InfoList"  >
                 <!-- -->
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" :disabled="NoUsed" size="mini" @click='EditInfo(scope.row)'  >{{scope.row.edit?'完成':'编辑'}}</el-button>
                        <!-- @click='sendCarEdit(scope.row)' -->
						<el-button type="danger" size="mini" :disabled="NoUsed" @click.native.prevent="deleteInfo(scope.$index, scope.row,InfoList)" > 移除</el-button>
                        <!-- -->
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols2" :key="index" align="center" :width="col.width" show-overflow-tooltip >
					<template slot-scope="scope"> 
                      <el-date-picker v-show="scope.row.edit" type="date" placeholder="选择日期"  v-if="col.field=='auctioneerTime'"  style="width: 100%;" v-model="scope.row[col.field]"></el-date-picker>    
                        <el-input  v-show="scope.row.edit" size="small" v-if="col.field!='auctioneerTime'&&col.field!='auctioneerTime'" v-model="scope.row[col.field]"></el-input>            
						          <span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>         						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="CurrentChangeInfo" @size-change="SizeChangeInfo" :page-size="pagesizeInfo" :page-sizes="[10, 20, 50, 100]"   :total="totalInfo"   style="float:right;">
				</el-pagination>
			</el-col>
            <el-dialog title="评估拍卖管理" :visible.sync="addSsInfos" >
			            <el-form :model="LegalActionInfo" ref="LegalActionInfo">
                     <el-form-item label="评估/拍卖机构:" prop="auctioneer" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.auctioneer" placeholder="评估/拍卖机构" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="地址:" prop="address" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.address" placeholder="地址" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人:" prop="contact" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionInfo.contact" placeholder="联系人" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item> 
                     <el-form-item label="联系电话:" prop="phone" :label-width="formLabelWidth">                      
                        <el-input v-model="LegalActionInfo.phone" placeholder="联系电话" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="拍卖/评估时间:" prop="auctioneerTime" :label-width="formLabelWidth">
                        <el-date-picker v-model="LegalActionInfo.auctioneerTime" @change="auctioneerTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" style="width:300px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拍卖/评估金额:" prop="auctioneerMount" :label-width="formLabelWidth">
                        <el-input v-model="LegalActionInfo.auctioneerMount" placeholder="拍卖/评估金额" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>              
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subInfo('LegalActionInfo')">确 定</el-button> 
                </div>			
		    </el-dialog>
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
  operationStatus,
  getAfpId
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
      InfoList: [],
      afpIdNum:""
    };
  },
  methods: {
    beforeLawsuitConciliationTime(val) {
      this.legalInfo.beforeLawsuitConciliationTime = val;
    },
    applyBeforeLawsuitAllTime(val) {
      this.legalInfo.applyBeforeLawsuitAllTime = val;
    },
    submissionClaimsTime(val) {
      this.legalInfo.submissionClaimsTime = val;
    },
    submissionFilingTime(val) {
      this.legalInfo.submissionFilingTime = val;
    },
    actionLawsuitAllTimes(val) {
      this.legalInfo.actionLawsuitAllTime = val;
    },
    applyLawsuitAllTimes(val) {
      this.legalInfo.applyLawsuitAllTime = val;
    },
    payDepositTime(val) {
      this.legalInfo.payDepositTime = val;
    },
    publishCourtAnnounceTime(val) {
      this.legalInfo.publishCourtAnnounceTime = val;
    },
    backDepositTime(val) {
      this.legalInfo.backDepositTime = val;
    },
    captureExpendsTimes(val) {
      this.legalInfo.captureExpendsTime = val;
    },
    conciliationTime(val) {
      this.legalInfo.conciliationTime = val;
    },
    firstCourtTime(val) {
      this.legalInfo.firstCourtTime = val;
    },
    publisJudgmentTime(val) {
      this.legalInfo.publisJudgmentTime = val;
    },
    trialMediationTime(val) {
      this.legalInfo.trialMediationTime = val;
    },
    secondCourtTime(val) {
      this.legalInfo.secondCourtTime = val;
    },
    proposeReceiveSecondInstanceTime(val) {
      this.legalInfo.proposeReceiveSecondInstanceTime = val;
    },
    publishSecondInstanceCourtTime(val) {
      this.legalInfo.publishSecondInstanceCourtTime = val;
    },
    secondInstanceCourtTime(val) {
      this.legalInfo.secondInstanceCourtTime = val;
    },
    secondTrialMediationTime(val) {
      this.legalInfo.secondTrialMediationTime = val;
    },
    publishSecondJudgmentTime(val) {
      this.legalInfo.publishSecondJudgmentTime = val;
    },
    judgmentEffectTime(val) {
      this.legalInfo.judgmentEffectTime = val;
    },
    applyActionTime(val) {
      this.legalInfo.applyActionTime = val;
    },
    entrustActionTime(val) {
      this.legalInfo.entrustActionTime = val;
    },
    receiveCourtFinalDate(val) {
      this.legalInfo.receiveCourtFinalDate = val;
    },
    payDate(val) {
      this.LegalActionFee.payDate = val;
    },
    createTime(val) {
      this.LegalActionFee.createTime = val;
    },
    remindTime(val) {
      this.LegalActionEvent.remindTime = val;
    },
    auctioneerTime(val){
  
        this.LegalActionInfo.auctioneerTime = val;
    },
    discreditTimes(val){
      
      this.LegalActionInfo.discreditTime = val;
    },
    actionBeforeLawsuitAllTime(val){
      this.LegalActionInfo.actionBeforeLawsuitAllTime = val;     
    },
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
    //获取诉讼信息
    // insert() {
    //   let para = {
    //     missionId: this.$route.params.id
    //   };
    //   insertLegalActionInfo(para).then(res => {
    //     this.getListInfo();
    //   });
    // },
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
        }
               
      });
    },
    subListInfo() {
      let para = {
        id: this.id,
        missionId: this.$route.params.id,
        applyBeforeLawsuitAllTime: this.legalInfo.applyBeforeLawsuitAllTime,
        beforeLawsuitAllCourt: this.legalInfo.beforeLawsuitAllCourt,
        actionBeforeLawsuitAllTime: this.legalInfo.actionBeforeLawsuitAllTime,
        beforeLawsuitConciliationTime: this.legalInfo
          .beforeLawsuitConciliationTime,
        beforeLawsuitConciliationCourt: this.legalInfo
          .beforeLawsuitConciliationCourt,
        submissionClaimsTime: this.legalInfo.submissionClaimsTime,
        acceptClaimsCourt: this.legalInfo.acceptClaimsCourt,
        submissionFilingTime: this.legalInfo.submissionFilingTime,
        filingCourt: this.legalInfo.filingCourt,
        captureExpendsTime: this.legalInfo.captureExpendsTime,
        firstInstanceReference: this.legalInfo.firstInstanceReference,
        applyLawsuitAllTime: this.legalInfo.applyLawsuitAllTime,
        payDepositTime: this.legalInfo.payDepositTime,
        deposit: this.legalInfo.deposit,
        backDepositTime: this.legalInfo.backDepositTime,
        actionLawsuitAllTime: this.legalInfo.actionLawsuitAllTime,
        publishCourtAnnounceTime: this.legalInfo.publishCourtAnnounceTime,
        conciliationTime: this.legalInfo.conciliationTime,
        firstCourtTime: this.legalInfo.firstCourtTime,
        secondCourtTime: this.legalInfo.secondCourtTime,
        publisJudgmentTime: this.legalInfo.publisJudgmentTime,
        trialMediationTime: this.legalInfo.trialMediationTime,
        proposeReceiveSecondInstanceTime: this.legalInfo
          .proposeReceiveSecondInstanceTime,
        publishSecondInstanceCourtTime: this.legalInfo
          .publishSecondInstanceCourtTime,
        secondInstanceCourt: this.legalInfo.secondInstanceCourt,
        secondInstanceNumber: this.legalInfo.secondInstanceNumber,
        secondInstanceCourtTime: this.legalInfo.secondInstanceCourtTime,
        secondTrialMediationTime: this.legalInfo.secondTrialMediationTime,
        publishSecondJudgmentTime: this.legalInfo.publishSecondJudgmentTime,
        judgmentEffectTime: this.legalInfo.judgmentEffectTime,
        applyActionTime: this.legalInfo.applyActionTime,
        applyActionCourt: this.legalInfo.applyActionCourt,
        actionNumber: this.legalInfo.actionNumber,
        entrustActionTime: this.legalInfo.entrustActionTime,
        entrustedActionCourt: this.legalInfo.entrustedActionCourt,
        receiveCourtFinalDate: this.legalInfo.receiveCourtFinalDate,
        discreditTime: this.legalInfo.discreditTime       
      };
      updateLegalActionInfo(para).then(res => {
        if(res.data.success){
          this.$message({
            type: "success",
            message: "更新成功！"
          });
          this.getListInfo();
        }else{
          this.$message({
            type: "error",
            message: "操作失败！"
          });
        }
        
      });
    },
    //获取诉讼费
    getSsFee() {
      let para = {
        afpId: this.afpIdNum,
        page: this.pageFee,
        pageSize: this.pagesizeFee
      };
      ListLegalActionFee(para).then(res => {
        this.FeeList = res.data.result.data;
        this.totalFee = res.data.result.recordsTotal;
        this.FeeList = this.FeeList.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    addSsFee() {
      this.addSsFees = true;
    },
    subFee(LegalActionFee) {
     var feeTypeList=[]
     this.FeeList.forEach(el => {
       feeTypeList.push(el.feeType)
     }); 
      if(feeTypeList.indexOf(this.LegalActionFee.feeType)!=-1){
        this.$message({
          type: "success",
           message: this.LegalActionFee.feeType+"已经存在！"
        });
      }else{
        let para = {
        missionId: this.$route.params.id,
        feeType: this.LegalActionFee.feeType,
        amount: this.LegalActionFee.amount,
        payDate: this.LegalActionFee.payDate,
        payMethod: this.LegalActionFee.payMethod,
        reimStatus: this.LegalActionFee.reimStatus,
        remark: this.LegalActionFee.remark
      };
      this.$refs[LegalActionFee].validate(valid => {
        if (valid) {
          insertLegalActionFee(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.addSsFees = false;
              this.$refs["LegalActionFee"].resetFields();
              this.getSsFee();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addSsFees = true;
          this.$refs.LegalActionFee.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
      }
      
    },
    EditFee(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
        updateLegalActionFee(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.getSsFee();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败！"
            });
          }
        });
      }
    },
    deleteFee(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLegalActionFee(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getSsFee();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancleFee() {
      this.addSsFees = false;
      this.$refs["LegalActionFee"].resetFields();
    },
    //获取诉讼事件
    getSsEvent() {
      let para = {
        afpId: this.afpIdNum,
        page: this.pageEvent,
        pageSize: this.pagesizeEvent
      };
      ListLegalActionEvent(para).then(res => {
        this.EventList = res.data.result.data;
        this.totalEvent = res.data.result.recordsTotal;
        this.EventList = this.EventList.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    addSsEvent() {
      this.addSsEvents = true;
    },
    subEvent(LegalActionEvent) {
      let para = {
       missionId: this.$route.params.id,
        legalActionCode: this.LegalActionEvent.legalActionCode,
        remindTime: this.LegalActionEvent.remindTime,
        operator: this.LegalActionEvent.operator,
        remark: this.LegalActionEvent.remark,
        createTime: this.LegalActionEvent.createTime
      };
      this.$refs[LegalActionEvent].validate(valid => {
        if (valid) {
          insertLegalActionEvent(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.addSsEvents = false;
              this.$refs["LegalActionEvent"].resetFields();
              this.getSsEvent();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addSsEvents = true;
          this.$refs.LegalActionEvent.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
    },
    EditEvent(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
        updateLegalActionEvent(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.getSsFee();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败！"
            });
          }
        });
      }
    },
    deleteEvent(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLegalActionEvent(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getSsEvent();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancleEvent() {
      this.addSsEvents = false;
      this.$refs["LegalActionEvent"].resetFields();
    },
    //huoqu
    getSsInfo() {
      let para = {
        afpId:this.afpIdNum,
        page: this.pageInfo,
        pageSize: this.pagesizeInfo
      };
      ListLegalActionInfo(para).then(res => {
        this.InfoList = res.data.result.data;
        this.totalInfo= res.data.result.recordsTotal
        this.InfoList = this.InfoList.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    addSsInfo() {
      this.addSsInfos = true;
    },
    subInfo(LegalActionInfo) {
      let para = {
        missionId: this.$route.params.id,
        auctioneer: this.LegalActionInfo.auctioneer,
        contact: this.LegalActionInfo.contact,
        address: this.LegalActionInfo.address,
        phone: this.LegalActionInfo.phone,
        auctioneerTime: this.LegalActionInfo.auctioneerTime,
        auctioneerMount: this.LegalActionInfo.auctioneerMount,
      };
      this.$refs[LegalActionInfo].validate(valid => {
        if (valid) {
          insertLegalActionInfos(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });        
              this.$refs["LegalActionInfo"].resetFields();
               this.addSsInfos = false;
              this.getSsInfo();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addSsInfos = true;
          this.$refs.LegalActionInfo.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
    },
    EditInfo(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
        updateLegalActionInfos(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.getSsInfo();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败！"
            });
          }
        });
      }
    },
    deleteInfo(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLegalActionInfo(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getSsInfo();
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请联系管理员！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancleInfo() {
      this.addSsInfos = false;
      this.$refs["LegalActionInfo"].resetFields();
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
    },
    getAfpIds(){
      let para={
      id:this.$route.params.id
      }
      getAfpId(para).then(res=>{
        if(res.data.success){
          this.afpIdNum=res.data.result
        this.getListInfo()
        this.getSsFee();
        this.getSsEvent();
        this.getSsInfo();  
        }
        
      })
    }
  },
  mounted() {
    this.getAfpIds()
    // this.insert();
  
   this.getCommition();
    
  }
};
</script>
<style>
.legal .el-date-editor .el-input__inner {
  margin-top: 5px;
}
.legal .el-date-editor.el-input {
  width:98%!important;
}
.legal input {
  height: 22px;
  width: 98%!important
}
.feesNum .el-input__inner{height:30px!important}
.feesNum .el-date-editor .el-input__inner{height:30px!important}
 </style>

