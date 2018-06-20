<template>
<el-collapse v-model="activeNames">	
    <el-collapse-item name="1" title="诉讼案件信息" style="position:relative">	
        <el-button class="filter-item" style="position:absolute;top:10px;left:140px"  type="primary" size="mini" @click="subListInfo('legalInfo')">提交</el-button>
        <!-- @click="subCarInfo('legalInfo')"		 -->
        
        <table ref="legalInfo" :model="legalInfo">
            <tbody class="legal">
                <tr>
                    <td><span>申请诉前保全时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyBeforeLawsuitAllTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="applyBeforeLawsuitAllTime"></el-date-picker></td>
                    <td><span>诉前的保全法院</span></td>
                    <td><input  v-model="legalInfo.beforeLawsuitAllCourt"/></td>
                    <td><span>采取诉前保全时间</span></td>
                    <td><input type="text" v-model="legalInfo.actionBeforeLawsuitAllTime"></td>
                </tr>
                <tr>
                    <td><span>申诉前的调解时间</span></td><td><el-date-picker v-model="legalInfo.beforeLawsuitConciliationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="beforeLawsuitConciliationTime"></el-date-picker></td>
                    <td ><span>诉前调解法院</span></td><td colspan="3"><input type="text" v-model="legalInfo.beforeLawsuitConciliationCourt" style="display:inlin-block;width:95%"></td>
                </tr>
                <tr>
                    <td><span>提交债券主张时间</span></td><td><el-date-picker v-model="legalInfo.submissionClaimsTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="submissionClaimsTime"></el-date-picker></td>
                    <td ><span>受理债券主张法院</span></td><td colspan="3"><input type="text" v-model="legalInfo.acceptClaimsCourt" style="display:inlin-block;width:95%"></td>
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
                    <td><el-date-picker v-model="legalInfo.publishCourtAnnounceTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.conciliationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>第一次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.firstCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publisJudgmentTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>一审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.trialMediationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>第二次开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    
                    <td><span>提出/收到二审诉状时间</span></td>
                    <td><el-date-picker v-model="legalInfo.proposeReceiveSecondInstanceTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>发布二审开庭公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publisSecondInstanceCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>二审法院</span></td>
                    <td><input  v-model="legalInfo.secondInstanceCourt"/></td>
                </tr>
                <tr>
                    <td><span>二审案号</span></td>
                    <td><input  v-model="legalInfo.secondInstanceNumber"/></td>
                    <td><span>二审开庭时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondInstanceCourtTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>二审判决/调解时间</span></td>
                    <td><el-date-picker v-model="legalInfo.secondTrialMediationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>发布二审判决公告时间</span></td>
                    <td><el-date-picker v-model="legalInfo.publishSecondJudgmentTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                    <td><span>判决生效时间</span></td>
                    <td><el-date-picker v-model="legalInfo.judgmentEffectTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                    <td><span>申请执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.applyActioTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                </tr>
                <tr>
                    <td><span>申请执行法院</span></td>
                    <td><input  v-model="legalInfo.applyActionCourt"/></td>
                    <td><span>执行案号</span></td>
                    <td><input  v-model="legalInfo.actionNumber"/></td>
                    <td><span>受托执行时间</span></td>
                    <td><el-date-picker v-model="legalInfo.entrustActionTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>                    
                </tr>
                 <tr>
                    <td><span>受托执行法院</span></td>
                    <td><input  v-model="legalInfo.entrustedActionCourt"/></td>                  
                    <td><span>收到法院终裁日期</span></td>
                    <td><el-date-picker v-model="legalInfo.receiveCourtFinalDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td> 
                    <td><span>上失信</span></td>
                    <td><input  v-model="legalInfo.discreditTime"/></td>                   
                </tr>
            </tbody>
        </table>
    </el-collapse-item>
        <el-collapse-item  title="诉讼费用" name="2" style="position:relative">
            <el-button class="filter-item" style="position:absolute;top:10px;left:100px"  type="primary" size="mini" >添加</el-button>
             <!-- @click="addSendCar" -->
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                 <!-- :data="visitListsRecords" -->
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"   >{{scope.row.edit?'完成':'编辑'}}</el-button>
                        <!-- @click='sendCarEdit(scope.row)' -->
						<el-button type="danger" size="mini"  > 移除</el-button>
                        <!-- @click.native.prevent="deletesendCar(scope.$index, scope.row,visitListsRecords)" -->
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" :width="col.width">
					<template slot-scope="scope">  
                        <el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]"></el-input>            
						<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>         						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="visithandleCurrentChange" @size-change="visithandleSizeChanges" :page-size="visitpagesize" :page-sizes="[10, 20, 50, 100]"   :total="visittotal"   style="float:right;">
				</el-pagination>
			</el-col>
            <!-- <el-dialog title="新增诉讼费用" :visible.sync="addSendCars" >
			    <el-form :model="AddsendCarInfo" ref="AddsendCarInfo">
                    <el-form-item label="送车机构:" prop="carDeliverMechanism" :label-width="formLabelWidth">                      
                        <el-input v-model="AddsendCarInfo.carDeliverMechanism" placeholder="送车机构" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车起始地:" prop="sendCarStartPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarStartPlace" placeholder="送车起始地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车终止地:" prop="sendCarEndPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarEndPlace" placeholder="送车终止地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="地图距离:" prop="mapDistance" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.mapDistance" placeholder="地图距离" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subSendCar('AddsendCarInfo')">确 定</el-button>
                </div>			
		    </el-dialog> -->
    </el-collapse-item>
          <el-collapse-item  title="诉讼事件管理" name="3" style="position:relative">
            <el-button class="filter-item" style="position:absolute;top:10px;left:130px"  type="primary" size="mini" >添加</el-button>
             <!-- @click="addSendCar" -->
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                 <!-- :data="visitListsRecords" -->
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"   >{{scope.row.edit?'完成':'编辑'}}</el-button>
                        <!-- @click='sendCarEdit(scope.row)' -->
						<el-button type="danger" size="mini"  > 移除</el-button>
                        <!-- @click.native.prevent="deletesendCar(scope.$index, scope.row,visitListsRecords)" -->
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols1" :key="index" align="center" >
					<template slot-scope="scope">  
                        <el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]"></el-input>            
						<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>         						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="visithandleCurrentChange" @size-change="visithandleSizeChanges" :page-size="visitpagesize" :page-sizes="[10, 20, 50, 100]"   :total="visittotal"   style="float:right;">
				</el-pagination>
			</el-col>
            <!-- <el-dialog title="新增送车信息" :visible.sync="addSendCars" >
			    <el-form :model="AddsendCarInfo" ref="AddsendCarInfo">
                    <el-form-item label="送车机构:" prop="carDeliverMechanism" :label-width="formLabelWidth">                      
                        <el-input v-model="AddsendCarInfo.carDeliverMechanism" placeholder="送车机构" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车起始地:" prop="sendCarStartPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarStartPlace" placeholder="送车起始地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车终止地:" prop="sendCarEndPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarEndPlace" placeholder="送车终止地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="地图距离:" prop="mapDistance" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.mapDistance" placeholder="地图距离" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subSendCar('AddsendCarInfo')">确 定</el-button>
                </div>			
		    </el-dialog> -->
    </el-collapse-item>
          <el-collapse-item  title="评估拍卖管理" name="4" style="position:relative">
            <el-button class="filter-item" style="position:absolute;top:10px;left:130px"  type="primary" size="mini" >添加</el-button>
             <!-- @click="addSendCar" -->
            <el-table  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                 <!-- :data="visitListsRecords" -->
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"   >{{scope.row.edit?'完成':'编辑'}}</el-button>
                        <!-- @click='sendCarEdit(scope.row)' -->
						<el-button type="danger" size="mini"  > 移除</el-button>
                        <!-- @click.native.prevent="deletesendCar(scope.$index, scope.row,visitListsRecords)" -->
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">  
                        <el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]"></el-input>            
						<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>         						  
                    </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="visithandleCurrentChange" @size-change="visithandleSizeChanges" :page-size="visitpagesize" :page-sizes="[10, 20, 50, 100]"   :total="visittotal"   style="float:right;">
				</el-pagination>
			</el-col>
            <!-- <el-dialog title="新增送车信息" :visible.sync="addSendCars" >
			    <el-form :model="AddsendCarInfo" ref="AddsendCarInfo">
                    <el-form-item label="送车机构:" prop="carDeliverMechanism" :label-width="formLabelWidth">                      
                        <el-input v-model="AddsendCarInfo.carDeliverMechanism" placeholder="送车机构" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车起始地:" prop="sendCarStartPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarStartPlace" placeholder="送车起始地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="送车终止地:" prop="sendCarEndPlace" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.sendCarEndPlace" placeholder="送车终止地" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="地图距离:" prop="mapDistance" :label-width="formLabelWidth">
                        <el-input v-model="AddsendCarInfo.mapDistance" placeholder="地图距离" clearable  size="mini" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancleInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subSendCar('AddsendCarInfo')">确 定</el-button>
                </div>			
		    </el-dialog> -->
    </el-collapse-item>
</el-collapse>
</template>

<script>
import {listLegalActionInfo,updateLegalActionInfo} from '@/api/legal'
export default {
  data(){
      return{
         activeNames:["1","2","3","4"],
          legalInfo:{
            applyBeforeLawsuitAllTime:"",
            beforeLawsuitAllCourt:"",
            actionBeforeLawsuitAllTime:"",
            beforeLawsuitConciliationTime:"",
            beforeLawsuitConciliationCourt:"",
            submissionClaimsTime:"",
            acceptClaimsCourt:"",
            submissionFilingTime:"",
            filingCourt:"",
            captureExpendsTime:"",
            firstInstanceReference:"",
            applyLawsuitAllTime:"",
            payDepositTime:"",
            deposit:"",
            backDepositTime:"",
            actionLawsuitAllTime:"",
            publishCourtAnnounceTime:"",
            conciliationTime:"",
            firstCourtTime:"",
            secondCourtTime:"",
            publisJudgmentTime:"",
            trialMediationTime:"",
            proposeReceiveSecondInstanceTime:"",
            publisSecondInstanceCourtTime:"",
            secondInstanceCourt:"",
            secondInstanceNumber:"",
            secondInstanceCourtTime:"",
            secondTrialMediationTime:"",
            publishSecondJudgmentTime:"",
            judgmentEffectTime:"",
            applyActioTime:"",
            applyActionCourt:"",
            actionNumber:"",
            entrustActionTime:"",
            entrustedActionCourt:"",
            receiveCourtFinalDate:"",
            discreditTime:"",
          },     
        cols: [
            { title: "费用名称", field: "carDeliverMechanism" },
            { title: "费用", field: "sendCarStartPlace" },
            { title: "缴纳时间", field: "sendCarEndPlace" },
            { title: "支付方式", field: "sendCarEndPlace" },
            { title: "备注", field: "sendCarEndPlace" },
            { title: "报销状态", field: "mapDistance" },
            { title: "录入人", field: "mapDistance" },
            { title: "录入时间", field: "mapDistance" }
        ],
        cols1: [
            { title: "诉讼名称", field: "carDeliverMechanism" },
            { title: "提醒时间", field: "sendCarStartPlace" },
            { title: "操作员", field: "sendCarEndPlace" },
            { title: "备注", field: "sendCarEndPlace",width:"300"},
            { title: "创建时间", field: "sendCarEndPlace" },
        ],
        cols2: [
            { title: "拍卖评估机构", field: "carDeliverMechanism" },
            { title: "地址", field: "sendCarStartPlace",width:"150" },
            { title: "联系人", field: "sendCarEndPlace" },
            { title: "联系电话", field: "sendCarEndPlace"},
            { title: "拍卖/评估时间", field: "sendCarEndPlace" },
            { title: "拍卖/评估金额", field: "sendCarEndPlace" },
            { title: "备注", field: "sendCarEndPlace",width:"150"},
            { title: "录入人", field: "sendCarEndPlace" },
            { title: "录入时间", field: "sendCarEndPlace" },
        ],
        visitpagesize: 20,
        visittotal: 0,
        visitpages: 1,
        listLoading:false,
        icsId:"",
        id:"",
      }
  },
  methods:{
      beforeLawsuitConciliationTime(val){
        this.legalInfo.beforeLawsuitConciliationTime=val;
      },
      applyBeforeLawsuitAllTime(val){
        this.legalInfo.applyBeforeLawsuitAllTime=val;
      }, 
      submissionClaimsTime(val){
        this.legalInfo.submissionClaimsTime=val;
      },   
      submissionFilingTime(val){
        this.legalInfo.submissionFilingTime=val;
      },
      actionLawsuitAllTimes(val){
        this.legalInfo.actionLawsuitAllTime=val;
      },
      applyLawsuitAllTimes(val){
        this.legalInfo.applyLawsuitAllTime=val;
      },
      payDepositTime(val){
        this.legalInfo.payDepositTime=val;
      },
      backDepositTime(val){
        this.legalInfo.backDepositTime=val;
      },
      captureExpendsTimes(val){
        this.legalInfo.captureExpendsTime=val;
      },
       visithandleCurrentChange(val) {
      this.visitpage = val;
    },
    visithandleSizeChanges(val) {
      this.visitpagesizes = val;
    },
      //获取诉讼信息
    getListInfo(){
    let para = {
        missionId: this.$route.params.id
      };
      this.listLoadings = true;
      listLegalActionInfo(para).then(res => {
        let data = res.data.result;
        // this.id = data.id;
        // this.icsId = data.icsId;
        // (this.legalInfo.applyBeforeLawsuitAllTime = data.applyBeforeLawsuitAllTime),
        // (this.legalInfo.beforeLawsuitAllCourt = data.beforeLawsuitAllCourt),
        // (this.legalInfo.actionBeforeLawsuitAllTime = data.actionBeforeLawsuitAllTime),
        // (this.legalInfo.beforeLawsuitConciliationTime = data.beforeLawsuitConciliationTime),
        // (this.legalInfo.beforeLawsuitConciliationTime = data.beforeLawsuitConciliationTime),
        // (this.legalInfo.submissionClaimsTime = data.submissionClaimsTime),
        // (this.legalInfo.acceptClaimsCourt = data.acceptClaimsCourt),
        // (this.legalInfo.submissionFilingTime = data.submissionFilingTime),
        // (this.legalInfo.captureExpendsTime = data.captureExpendsTime),
        // (this.legalInfo.firstInstanceReference = data.firstInstanceReference),
        // (this.legalInfo.applyLawsuitAllTime = data.applyLawsuitAllTime),
        // (this.legalInfo.payDepositTime = data.payDepositTime),
        // (this.legalInfo.deposit = data.deposit),
        // (this.legalInfo.backDepositTime = data.backDepositTime),
        // (this.legalInfo.actionLawsuitAllTime = data.actionLawsuitAllTime),
        // (this.legalInfo.publishCourtAnnounceTime = data.publishCourtAnnounceTime),
        // (this.legalInfo.conciliationTime = data.conciliationTime),
        // (this.legalInfo.firstCourtTime = data.firstCourtTime),
        // (this.legalInfo.secondCourtTime = data.secondCourtTime),
        // (this.legalInfo.publisJudgmentTime = data.publisJudgmentTime),
        // (this.legalInfo.trialMediationTime = data.trialMediationTime),
        // (this.legalInfo.proposeReceiveSecondInstanceTime = data.proposeReceiveSecondInstanceTime),
        // (this.legalInfo.publisSecondInstanceCourtTime = data.publisSecondInstanceCourtTime),
        // (this.legalInfo.secondInstanceCourt = data.secondInstanceCourt),
        // (this.legalInfo.secondInstanceNumber = data.secondInstanceNumber),
        // (this.legalInfo.secondInstanceCourtTime = data.secondInstanceCourtTime),
        // (this.legalInfo.secondTrialMediationTime = data.secondTrialMediationTime),
        // (this.legalInfo.publishSecondJudgmentTime = data.publishSecondJudgmentTime),
        // (this.legalInfo.judgmentEffectTime = data.judgmentEffectTime),
        // (this.legalInfo.applyActioTime = data.applyActioTime),
        // (this.legalInfo.applyActionCourt = data.applyActionCourt),
        // (this.legalInfo.secondCourtTime = data.secondCourtTime),
        // (this.legalInfo.actionNumber = data.actionNumber),
        // (this.legalInfo.entrustActionTime = data.entrustActionTime),
        // (this.legalInfo.entrustedActionCourt = data.entrustedActionCourt),
        // (this.legalInfo.receiveCourtFinalDate = data.receiveCourtFinalDate),
        // (this.legalInfo.discreditTime = data.discreditTime),
        (this.listLoadings = false);
      });
      },
    subListInfo(legalInfo) {
        let para = {
            afpId:this.icsId,
            missionId:this.id,
            // applyBeforeLawsuitAllTime:this.legalInfo.applyBeforeLawsuitAllTime,
            // beforeLawsuitAllCourt:this.legalInfo.beforeLawsuitAllCourt,
            // actionBeforeLawsuitAllTime:this.legalInfo.actionBeforeLawsuitAllTime,
            // beforeLawsuitConciliationTime:this.legalInfo.beforeLawsuitConciliationTime,
            // beforeLawsuitConciliationCourt:this.legalInfo.beforeLawsuitConciliationCourt,
            // submissionClaimsTime:this.legalInfo.submissionClaimsTime,
            // acceptClaimsCourt:this.legalInfo.acceptClaimsCourt,
            // submissionFilingTime:this.legalInfo.submissionFilingTime,
            // filingCourt:this.legalInfo.filingCourt,
            // captureExpendsTime:this.legalInfo.captureExpendsTime,
            // firstInstanceReference:this.legalInfo.firstInstanceReference,
            // applyLawsuitAllTime:this.legalInfo.applyLawsuitAllTime,
            // payDepositTime:this.legalInfo.payDepositTime,
            // deposit:this.legalInfo.deposit,
            // backDepositTime:this.legalInfo.backDepositTime,
            // actionLawsuitAllTime:this.legalInfo.actionLawsuitAllTime,
            // publishCourtAnnounceTime:this.legalInfo.publishCourtAnnounceTime,
            // conciliationTime:this.legalInfo.conciliationTime,
            // firstCourtTime:this.legalInfo.firstCourtTime,
            // secondCourtTime:this.legalInfo.secondCourtTime,
            // publisJudgmentTime:this.legalInfo.publisJudgmentTime,
            // trialMediationTime:this.legalInfo.trialMediationTime,
            // proposeReceiveSecondInstanceTime:this.legalInfo.proposeReceiveSecondInstanceTime,
            // publisSecondInstanceCourtTime:this.legalInfo.publisSecondInstanceCourtTime,
            // secondInstanceCourt:this.legalInfo.secondInstanceCourt,
            // secondInstanceNumber:this.legalInfo.secondInstanceNumber,
            // secondInstanceCourtTime:this.legalInfo.secondInstanceCourtTime,
            // secondTrialMediationTime:this.legalInfo.secondTrialMediationTime,
            // publishSecondJudgmentTime:this.legalInfo.publishSecondJudgmentTime,
            // judgmentEffectTime:this.legalInfo.judgmentEffectTime,
            // applyActioTime:this.legalInfo.applyActioTime,
            // applyActionCourt:this.legalInfo.applyActionCourt,
            // actionNumber:this.legalInfo.actionNumber,
            // entrustActionTime:this.legalInfo.entrustActionTime,
            // entrustedActionCourt:this.legalInfo.entrustedActionCourt,
            // receiveCourtFinalDate:this.legalInfo.receiveCourtFinalDate,
            // discreditTime:this.legalInfo.discreditTime,
        };
        //  this.$refs[legalInfo].validate((valid) => {
            // if (valid) {
              updateLegalActionInfo(para).then(res => {
                      this.getListInfo();
                    });
                //   }else{
                //     return false;
                //   };
        // })
    },
  },
  mounted(){
      this.getListInfo()
  }
}
</script>
<style>
.legal .el-date-editor .el-input__inner{margin-top: 5px }
.legal .el-date-editor.el-input{width: 160px}
.legal  input{height: 22px}
</style>

