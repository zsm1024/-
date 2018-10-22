<template>
	<section ref="abcd" style="overflow-y: auto;">
		<el-collapse v-model="activeNames" accordion>
			<el-collapse-item title="客户基本信息" name="1">
				<div>
					<table class="ht_table" v-loading="listLoading1">	
						<tr>
							<td class="tds">客户姓名</td><td>{{details.name}}</td>
							<td class="tds">申请号</td><td>{{details.appNum}}</td>		
							<td class="tds">贷款金额</td><td>{{details.loanAmount}}</td>
							<td class="tds">贷款期数</td><td >{{details.loanNum}}</td>
							
						</tr>
						<tr>
							<td class="tds">首付比例</td><td>{{details.firstRatio}}</td>
							<td class="tds">已付款期数</td><td>{{details.accountPaidNum}}</td>
							<td class="tds">剩余本金总额</td><td>{{details.residualAmount}}</td>
							<td class="tds">欠款利息</td><td>{{details.interestDue}}</td>
						</tr>
						<tr>
							<td class="tds">罚息</td><td>{{details.penalty}}</td>
							<td class="tds">费用</td><td>{{details.cost}}</td>
							<td class="tds">ET结算金额</td><td  colspan="3">{{details.et}}</td>							
						</tr>						
					</table>
				</div>			
			</el-collapse-item>
            <el-collapse-item title="控制车辆信息" name="2"style="position:relative"  >
                <el-button class="filter-item" style="position:absolute;top:10px;left:140px"  type="primary" size="mini" @click="subCarInfo('carForm')">提交</el-button>
                <table :model="carForm" ref="carForm" >
                  <tbody  class="legal" v-loading="listLoadings">
                    <tr>
                      <td><i style="color:red;font-weight:blod;margin-right:3px;font-size14px">*</i>车辆来源</td>
                      <td>
                        <el-select v-model="carForm.comefrom"  clearable placeholder="车辆来源"  style="width:100%" >
                          <el-option v-for="(item,index) in comefrom" :key="index"  :label="item.val " :value="item.val "></el-option>
                        </el-select>
                      </td>
                      <td><i style="color:red;font-weight:blod;margin-right:3px;font-size14px">*</i>控车机构</td>
                      <td>
                        <el-select v-model="carForm.company"  clearable placeholder="控车机构"  style="width:100%" >
							            <el-option v-for="(item,index) in restaurants" :key="index"  :label="item.nickname " :value="item.nickname "></el-option>
                        </el-select>
                      </td>
                      <td><i style="color:red;font-weight:blod;margin-right:3px;font-size14px">*</i>控车日期</td>
                      <td> 
                        <el-date-picker style="width:100%" v-model="carForm.time" type="date" placeholder="请选择" @change="timechange">
					              </el-date-picker>
                      </td>
                    </tr>
                    <tr>
                      <td>控车省市</td>
                      <td><el-input v-model="carForm.province" placeholder="控车省市" clearable ></el-input></td>
                      <td>寻找方式</td>
                      <td>
                        <el-select  v-model="carForm.search" placeholder="请选择方式" style="width:100%">
                          <el-option v-for="(item,index) in findway" :key="index"  :label="item.val " :value="item.val "></el-option>
                        </el-select>
                      </td>
                      <td>车辆状态</td>
                      <td> <el-input v-model="carForm.statius" placeholder="车辆状态" clearable ></el-input></td>
                    </tr>
                    <tr>
                      <td>控车时逾期天数</td>
                      <td><el-input v-model="carForm.overdueDay" placeholder="控车时逾期天数" clearable  ></el-input></td>
                      <td>变现情况</td>
                      <td>
                        <el-select   v-model="carForm.realize" placeholder="变现情况" style="width:100%">
                          <el-option v-for="(item,index) in realizeTypes" :key="index"  :label="item.val " :value="item.val "></el-option>	
						            </el-select>
                      </td>
                      <td>车型</td>
                      <td><el-input v-model="carForm.cartype" placeholder="车型"  readonly ></el-input></td>
                    </tr>
                    <tr>
                      <td>车牌号</td> 
                      <td><el-input v-model="carForm.carnum" placeholder="车牌号" clearable  ></el-input></td>
                      <td>车身颜色</td>
                      <td><el-input v-model="carForm.carcolor" placeholder="车身颜色" clearable></el-input></td>
                      <td>公里数</td>
                      <td><el-input v-model="carForm.cardrive" placeholder="公里数" clearable ></el-input></td>
                    </tr>
                    <tr>
                      <td>车架号</td>
                      <td><el-input v-model="carForm.carframe" placeholder="车架号" clearable readonly ></el-input></td>
                      <td>发动机号</td>
                      <td> <el-input v-model="carForm.motor" placeholder="发动机号" clearable readonly ></el-input></td>
                      <td>车辆登记日/合同签订日</td>
                      <td>
                        <el-date-picker style="width:100%" v-model="carForm.cartime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="signTime"></el-date-picker>
                      </td>
                    </tr>
                    <tr>
                      <td>车辆价格(发票价)</td>
                      <td><el-input v-model="carForm.price" placeholder="车辆价格(发票价)" clearable  ></el-input></td>
                      <td>车辆出险情况</td>
                      <td> <el-input v-model="carForm.danger" placeholder="车辆出险情况" clearable  ></el-input></td>
                      <td>车辆是否查封</td>
                      <td>
                        <el-select v-model="carForm.receive"  placeholder="车辆是否查封" style="width:100%">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>                           
                      </el-select> 
                      </td>
                    </tr>
                    <tr>
                      <td>证件类型</td>
                      <td colspan="5">
                        <el-select v-model="carForm.idtype" multiple  placeholder="证件类型" style="width:100%">
                          <el-option v-for="item in document" :key="item.key"  :label="item.val" :value="item.val" @change="typechange"></el-option>
						            </el-select>
                      </td>
                    </tr>
                    <tr>
                      <td>售后维修情况</td>
                      <td colspan="5"> <el-input v-model="carForm.sale" type="textarea" placeholder="售后维修情况" clearable style="width:100%" ></el-input></td>
                    </tr>
                    <tr>
                      <td>客户遗留物品</td>
                      <td colspan="5">
                        <el-input v-model="carForm.leave" placeholder="客户遗留物品" clearable type="textarea" style="width:100%">
                        </el-input>
                      </td>
                    </tr>
                  </tbody>
                </table>
               <!-- <el-form :inline="true" :model="carForm" ref="carForm" :rules="rules" label-width="90px" id="controlinfos" class="controlinfos" v-loading="listLoadings" >
              <el-form-item label="车辆来源" prop="comefrom" >
                <el-select v-model="carForm.comefrom"  clearable placeholder="车辆来源"  style="width:230px" >
							    <el-option v-for="(item,index) in comefrom" :key="index"  :label="item.val " :value="item.val "></el-option>
						    </el-select>
              </el-form-item> 
                    <el-form-item label="控车机构" prop="company">
                      <el-select v-model="carForm.company"  clearable placeholder="控车机构"  style="width:230px" >
							            <el-option v-for="(item,index) in restaurants" :key="index"  :label="item.nickname " :value="item.nickname "></el-option>
                      </el-select> -->
                      <!-- <el-autocomplete v-model="carForm.company" clearable :fetch-suggestions="querySearch" size="small"  placeholder="请输入控车机构"  @select="handleSelect" class="autoInput" style="width:150px">
                      </el-autocomplete> -->
                        <!-- <el-input v-model="carForm.company" placeholder="控车机构" clearable></el-input> -->
                    <!-- </el-form-item>
                    <el-form-item label="控车日期" prop="time">
                        <el-date-picker style="width:230px" v-model="carForm.time" type="date" placeholder="请选择" @change="timechange">
					</el-date-picker>
                    </el-form-item>
                    <el-form-item label="控车省市"  prop="province">
                        <el-input v-model="carForm.province" placeholder="控车省市" clearable ></el-input>
                    </el-form-item> 
                    <el-form-item label="寻找方式" prop="province">
                        <el-select  v-model="carForm.search" placeholder="请选择方式" style="width:230px">
							<el-option v-for="(item,index) in findway" :key="index"  :label="item.val " :value="item.val "></el-option>					
						</el-select>
                    </el-form-item>
                    <el-form-item label="车辆状态" prop="province">
                        <el-input v-model="carForm.statius" placeholder="车辆状态" clearable ></el-input>
                    </el-form-item> 
                    <el-form-item label="控车时逾期天数" prop="province">
                        <el-input v-model="carForm.overdueDay" placeholder="控车时逾期天数" clearable  ></el-input>
                    </el-form-item>
                    <el-form-item label="变现情况" prop="province">
                        <el-select   v-model="carForm.realize" placeholder="变现情况" style="width:230px">
                            	<el-option v-for="(item,index) in realizeType" :key="index"  :label="item.val " :value="item.val "></el-option>	
						        </el-select>
                    </el-form-item> 
                    <el-form-item label="车型" prop="province" >
                        <el-input v-model="carForm.cartype" placeholder="车型" clearable  ></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号" prop="province">
                        <el-input v-model="carForm.carnum" placeholder="车牌号" clearable  ></el-input>
                    </el-form-item>
                    <el-form-item label="车身颜色" prop="province">
                        <el-input v-model="carForm.carcolor" placeholder="车身颜色" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="公里数" prop="province">
                        <el-input v-model="carForm.cardrive" placeholder="公里数" clearable ></el-input>
                    </el-form-item>
                    <el-form-item label="车架号" prop="province">
                        <el-input v-model="carForm.carframe" placeholder="车架号" clearable readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="发动机号" prop="province">
                        <el-input v-model="carForm.motor" placeholder="发动机号" clearable readonly ></el-input>
                    </el-form-item>
                    <el-form-item label="车辆登记日/合同签订日" prop="province">
                         <el-date-picker style="width:230px" v-model="carForm.cartime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" @change="signTime"></el-date-picker>
                    </el-form-item>  
                    <el-form-item label="车辆价格(发票价)" prop="province">
                        <el-input v-model="carForm.price" placeholder="车辆价格(发票价)" clearable  ></el-input>
                    </el-form-item>
                    <el-form-item label="车辆出险情况" prop="province">
                        <el-input v-model="carForm.danger" placeholder="车辆出险情况" clearable  ></el-input>
                    </el-form-item>
                     <el-form-item label="车辆是否查封" prop="province">
                      <el-select v-model="carForm.receive"  placeholder="车辆是否查封" style="width:230px">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>                           
                      </el-select> 
                    </el-form-item>
                    <el-form-item label="证件类型" prop="province">
                        <el-select v-model="carForm.idtype" multiple  placeholder="证件类型" style="width:230px;min-height:54px">
                          <el-option v-for="(item,index) in document" :key="item.key"  :label="item.val" :value="item.val" @change="typechange"></el-option>
						            </el-select>
                    </el-form-item>
                    <el-form-item label="售后维修情况" prop="province">
                        <el-input v-model="carForm.sale" type="textarea" placeholder="售后维修情况" clearable style="width:230px" ></el-input>
                    </el-form-item>                  
                    
                   <el-form-item label="客户遗留物品" prop="province">
                      <el-input v-model="carForm.leave" placeholder="客户遗留物品" clearable type="textarea" style="width:230px"></el-input>
                  </el-form-item>                                                                        
                </el-form-item>
             </el-form>  -->
            </el-collapse-item>	
            <el-collapse-item  title="送车信息" name="3" style="position:relative">
                <el-button class="filter-item" style="position:absolute;top:10px;left:100px"  type="primary" size="mini" @click="addSendCar" >添加</el-button>
                <el-table :data="visitListsRecords"  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope" >
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='sendCarEdit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini"  @click.native.prevent="deletesendCar(scope.$index, scope.row,visitListsRecords)"> 移除</el-button>
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
            <el-dialog title="新增送车信息" :visible.sync="addSendCars" >
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
		</el-dialog>
            </el-collapse-item>
             <el-collapse-item  title="车辆停放信息" name="4" style="position:relative">
                <el-button class="filter-item" style="position:absolute;top:10px;left:135px"  type="primary" size="mini" @click="addParkingCar" >添加</el-button>
                <el-table :data="parkList"  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope">
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='parkingEdit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
            <el-button type="danger" size="mini"  @click.native.prevent="deleteparkingCars(scope.$index, scope.row,parkList)"> 移除</el-button>
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols1" :width="col.width" :key="index" align="center" >
					<template slot-scope="scope">            
            <el-input  v-show="scope.row.edit" v-if="(col.field!='outdate'&&col.field!='indate'&&col.field!='storageDays')"  size="small" v-model="scope.row[col.field]"></el-input> 
           <el-date-picker v-show="scope.row.edit" v-if="col.field=='indate'" v-model="scope.row[col.field]" type="date"  value-format="yyyy-MM-dd" @change="inchange(scope.row[col.field])"  ></el-date-picker>
            <el-date-picker v-show="scope.row.edit" v-if="col.field=='outdate'"  v-model="scope.row[col.field]" type="date"  value-format="yyyy-MM-dd" @change="outchange(scope.row[col.field])" ></el-date-picker> 
						<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>  
            <span v-show="scope.row.edit" v-if="col.field=='storageDays'" >{{ scope.row[col.field] }}</span>        						  
          </template>
				</el-table-column>
			</el-table>
            <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="visithandleCurrentChange1" @size-change="visithandleSizeChanges1" :page-size="visitpagesize1" :page-sizes="[10, 20, 50, 100]"   :total="parktotal"   style="float:right;">
				</el-pagination>
			</el-col>
             <el-dialog title="新增停放信息" :visible.sync="addParkingCars" >
                <el-form :model="AddparkCarInfo" ref="AddparkCarInfo">
                          <el-form-item label="保管机构:" prop="custodian" :label-width="formLabelWidth">
                              <el-input v-model="AddparkCarInfo.custodian" placeholder="保管机构" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="保管地:" prop="placeStorage" :label-width="formLabelWidth">
                              <el-input v-model="AddparkCarInfo.placeStorage" placeholder="保管地" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="钥匙保管人姓名:" prop="keyKeeperName" :label-width="formLabelWidth">
                              <el-input v-model="AddparkCarInfo.keyKeeperName" placeholder="钥匙保管人姓名" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="钥匙保管人电话:" prop="keyKeeperPhone" :label-width="formLabelWidth">
                              <el-input v-model="AddparkCarInfo.keyKeeperPhone" placeholder="钥匙保管人电话" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="入库日期:" prop="indate" :label-width="formLabelWidth">
                               <el-date-picker v-model="AddparkCarInfo.indate" type="date" placeholder="入库日期" value-format="yyyy-MM-dd" style="width:300px" @change="getInDate"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="出库日期:" prop="outdate" :label-width="formLabelWidth">
                            <el-date-picker v-model="AddparkCarInfo.outdate" type="date" placeholder="出库日期" value-format="yyyy-MM-dd" style="width:300px" @change="getOutDate"></el-date-picker>
                              <!-- <el-input v-model="AddparkCarInfo.outdate" placeholder="地图距离" clearable  size="mini" style="width:300px"></el-input> -->
                          </el-form-item>
                          <el-form-item label="保管天数:" prop="storageDays" :label-width="formLabelWidth">
                              <el-input v-model="AddparkCarInfo.storageDays" placeholder="保管天数" clearable readonly  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="canparkInfo">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subparkCar('AddparkCarInfo')">确 定</el-button>
                </div>
		        </el-dialog>
            </el-collapse-item>	
            <el-collapse-item title="变现信息" name="5" style="position:relative">
                 <el-button class="filter-item" style="position:absolute;top:10px;left:100px"  type="primary" size="mini" @click="subReal" >确认</el-button>
                 <table v-loading="listLoading5" :model="realize">
                    <tbody class="legal">
                      <tr>
                        <td>变现方式</td>
                        <td>
                          <el-select v-model="realize.type"  placeholder="变现方式" style="width:100%">                       
                              <el-option v-for="item in realizeType" :key="item.key"  :label="item.val" :value="item.val">
                              </el-option>                    
                          </el-select>
                        </td>
                        <td>付款方</td>
                        <td><el-input v-model="realize.payoff" placeholder="付款方" clearable ></el-input></td>
                        <td>收款金额</td>
                        <td><el-input v-model="realize.receivemoney" placeholder="收款金额" clearable ></el-input></td>
                        
                      </tr>
                      <tr>
                        <td>车款到账日</td>
                        <td><el-date-picker v-model="realize.time" type="date"  style="width:100%" value-format="yyyy-MM-dd" placeholder="请选择" @change="moneytime"></el-date-picker></td>
                        <td>需减免的费用</td>
                        <td> <el-input v-model="realize.cost" placeholder="需减免的费用" clearable ></el-input></td>
                        <td>需减免的罚息</td>
                        <td><el-input v-model="realize.lowerinterest" placeholder="需减免的罚息金额" clearable ></el-input></td>                       
                      </tr>
                      <tr>
                        <td>需核销的利息</td>
                        <td> <el-input v-model="realize.interest" placeholder="需核销的利息" clearable ></el-input></td>
                        <td>需核销的本金</td>
                        <td><el-input v-model="realize.principal" placeholder="需核销的本金" clearable ></el-input></td>
                        <td>车辆是否查封</td>
                        <td>
                          <el-select v-model="realize.receive"  placeholder="车辆是否查封"  style="width:100%" >
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>                           
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <td>客户是否同意配合过户</td>
                        <td>
                          <el-select v-model="realize.transfer"  placeholder="客户是否同意配合过户"  style="width:100%" >
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>                           
                          </el-select>
                        </td>
                        <td>是否签署买卖协议</td>
                        <td>
                          <el-select v-model="realize.business"  placeholder="请选择"  style="width:100%" >
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>                           
                          </el-select>
                        </td>
                        <td>费用回收金额</td>
                        <td> <el-input v-model="realize.recovery" placeholder="费用回收金额" clearable ></el-input></td>
                      </tr>
                      <tr>
                        <td>查封对方信息</td>
                        <td colspan="5"><el-input type="textarea" v-model="realize.infos" placeholder="查封对方信息" clearable ></el-input></td>
                      </tr>                     
                    </tbody>
                    <tr>
                      <td>车辆违规信息</td>
                      <td colspan="5"> <el-input type="textarea" v-model="realize.violationInfos" placeholder="车辆违规信息" clearable ></el-input></td>
                    </tr>
                 </table>
               
            </el-collapse-item>
            <el-collapse-item title="放车信息" name="6" style="position:relative">
                 <el-button class="filter-item" style="position:absolute;top:10px;left:100px"  type="primary" size="mini" @click="subStop" >确认</el-button>
                 <table v-loading="listLoading5" :model="stop">
                   <tbody class="legal">
                     <tr>
                       <td>车辆放行说明</td>
                       <td> <el-input v-model="stop.notice" placeholder="车辆放行说明" clearable ></el-input></td>
                       <td>提车日期</td>
                       <td> <el-date-picker style="width:100%" v-model="stop.time" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker></td>
                       <td>提车人姓名</td>
                       <td> <el-input v-model="stop.name" placeholder="提车人姓名" clearable ></el-input></td>
                     </tr>
                     <tr>
                       <td>提车人电话</td>
                       <td><el-input v-model="stop.phone" placeholder="提车人电话" clearable ></el-input></td>
                       <td>提车人身份证号</td>
                       <td> <el-input v-model="stop.cardNum" placeholder="提车人身份证号" clearable ></el-input></td>
                       <td>交接地</td>
                       <td><el-input v-model="stop.place" placeholder="交接地" clearable ></el-input></td>                    
                     </tr>
                     <tr>
                         <td>公里数</td>
                         <td><el-input v-model="stop.distance" placeholder="公里数" clearable ></el-input></td>
                         <td>车辆状态</td>
                         <td> <el-input v-model="stop.statius" placeholder="车辆状态" clearable ></el-input></td>
                         <td>是否签署买卖协议</td>
                         <td>
                           <el-select v-model="stop.deal"  placeholder="请选择" style="width:100%">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>                           
                           </el-select>
                         </td>
                     </tr>
                     <tr>
                       <td>备注</td>
                       <td colspan="5"><el-input type="textarea" v-model="stop.marks"></el-input></td>
                     </tr>
                   </tbody>
                 </table>
                
            </el-collapse-item>
            <el-collapse-item  title="费用明细" name="7" style="position:relative">
                <el-button class="filter-item" style="position:absolute;top:10px;left:100px"  type="primary" size="mini" @click="addcost" >添加</el-button>
                <el-table :data="lists"  border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
					<template slot-scope="scope">
						<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='costEdit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
            <el-button type="danger" size="mini"  @click.native.prevent="deleteCost(scope.$index, scope.row,parkList)"> 移除</el-button>
					</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols2" :key="index" align="center" >
					<template slot-scope="scope">  
            <el-select  class="comSty" v-model="scope.row[col.field]" v-show="scope.row.edit" v-if="col.field=='costType'">                    
                <el-option v-for="item in costtype" :key="item.key"  :label="item.val" :value="item.val"></el-option>   
            </el-select>
            <el-select  class="comSty" v-model="scope.row[col.field]" v-show="scope.row.edit" v-if="col.field=='whetherPay'">                    
                <el-option label="已支付" value="已支付"></el-option>
								<el-option label="待支付" value="待支付"></el-option>   
            </el-select>
                <el-input  v-show="scope.row.edit" size="small" v-if="col.field!='paymentInstitution'" v-model="scope.row[col.field]"></el-input>            
						    <span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span> 
                <span v-show="scope.row.edit" v-if="col.field=='paymentInstitution'" >{{ scope.row[col.field] }}</span> 
                 <!-- <el-select  v-show="scope.row.edit" v-if="col.field=='whetherPay'" v-model="scope.row[col.field]" placeholder="请选择方式">
							  <el-option label="已支付" value="已支付"></el-option>
								<el-option label="待支付" value="待支付"></el-option>
							</el-select>        						   -->
            </template>
				</el-table-column>
			</el-table>
      <el-col :span="24" class="toolbar">					
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="costhandleCurrentChange" @size-change="costehandleSizeChanges" :page-size="costpagesize" :page-sizes="[10, 20, 50, 100]"   :total="costtotal"   style="float:right;">
				</el-pagination>
			</el-col>
       <el-dialog title="新增费用明细" :visible.sync="addcosts" >
                <el-form :model="AddparkcostInfo" ref="AddparkcostInfo">
                          <el-form-item label="控车费用:" prop="custodian" :label-width="formLabelWidth">
                            <el-select v-model="AddparkcostInfo.costType"  placeholder="控车费用" style="width:300px">                    
                          <el-option v-for="item in costtype" :key="item.key"  :label="item.val" :value="item.val"></el-option>   
                        </el-select>
                          </el-form-item>
                          <el-form-item label="备注:" prop="remark" :label-width="formLabelWidth">
                              <el-input v-model="AddparkcostInfo.remark" placeholder="备注" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="费用金额:" prop="costAmount" :label-width="formLabelWidth">
                              <el-input v-model="AddparkcostInfo.costAmount" placeholder="费用金额" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="需支付机构:" prop="paymentInstitution" :label-width="formLabelWidth">
                              <el-input v-model="AddparkcostInfo.paymentInstitution" placeholder="需支付机构" clearable  size="mini" style="width:300px"></el-input>
                          </el-form-item>
                          <el-form-item label="是否支付:" prop="whetherPay" :label-width="formLabelWidth">
                              <el-select v-model="AddparkcostInfo.whetherPay"  placeholder="是否支付" style="width:300px">                  
                                <el-option label="已支付" value="已支付"></el-option> 
                                <el-option label="待支付" value="待支付"></el-option>   
                              </el-select>
                          </el-form-item>
                          
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="canclecost">取 消</el-button>
                    <el-button  type="primary" @click.native.prevent="subcost('AddparkcostInfo')">确 定</el-button>
                </div>
		        </el-dialog>
    </el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import {
  getCustomerOsBasic,
  getOsControlVehicle,
  updateOsControlVehicle,
  SendCarInformation,
  updateSendCarInformation,
  deleteSendCar,
  saveSendCar,
  ParkingInformation,
  updateParkingInformation,
  deleteParkingCar,
  saveParkCar,
  getOsCashChange,
  updateOsCashChang,
  getOsCarRelease,
  updateOsCarRelease,
  listOsDetailsCharges,
  deleteOsDetailsCharges,
  savecost,
  updateOsDetailsCharges
} from "@/api/cars";
import { findByType } from "@/api/basedata";
import {

  getTaskHostUser,
} from "@/api/outerlist";
export default {
  data() {
    return {
      activeNames: ["2"],
      details: [],
      lists: [],
      time: "",
      signTimes: "",
      id:"",
      icsId: "",
      stopListid:"",
      stopListicsId: "",
      controlCarid: "",
      controlCaricsId: "",
      comefrom: [],
      findway: [],
      document: [],
      parkList: [],
      realizeType: [],
      costtype: [],
      parktotal: "",
      addSendCars: false,
      addParkingCars: false,
      addcosts: false,
      formLabelWidth: "120px",
      cols: [
        { title: "送车机构", field: "carDeliverMechanism" },
        { title: "送车起始地", field: "sendCarStartPlace" },
        { title: "送车终止地", field: "sendCarEndPlace" },
        { title: "地图距离", field: "mapDistance" }
      ],
      cols1: [
        { title: "保管机构", field: "custodian" },
        { title: "保管地", field: "placeStorage" },
        { title: "钥匙保管人姓名", field: "keyKeeperName",width:"100"},
        { title: "钥匙保管人电话", field: "keyKeeperPhone",width:"100" },
        { title: "入库日期", field: "indate" },
        { title: "出库日期", field: "outdate" },
        { title: "保管天数", field: "storageDays" }
      ],
      cols2: [
        { title: "费用类型", field: "costType" },        
        { title: "费用金额", field: "costAmount" },
        { title: "需支付机构", field: "paymentInstitution" },
        { title: "是否支付", field: "whetherPay" },
        { title: "备注", field: "remark" },
      ],
      carForm: {
        comefrom: "",
        company: "",
        time: "",
        province: "",
        search: "",
        statius: "",
        overdueDay: "",
        realize: "",
        cartype: "",
        carnum: "",
        carcolor: "",
        cardrive: "",
        carframe: "",
        motor: "",
        cartime: "",
        price: "",
        danger: "",
        sale: "",
        idtype: "",
        leave: "",
        receive: ""
      },
      realize: {
        type: "",
        payoff: "",
        receivemoney: "",
        time: "",
        cost: "",
        interest: "",
        lowerinterest: "",
        principal: "",
        receive: "",
        transfer: "",
        business: "",
        recovery: "",
        infos: "",
        violationInfos: ""
      },
      stop: {
        notice: "",
        time: "",
        name: "",
        phone: "",
        cardNum: "",
        place: "",
        distance: "",
        statius: "",
        marks: "",
        deal: ""
      },
      AddsendCarInfo: {
        carDeliverMechanism: "",
        sendCarStartPlace: "",
        sendCarEndPlace: "",
        mapDistance: ""
      },
      AddparkCarInfo: {
        custodian: "",
        placeStorage: "",
        keyKeeperName: "",
        keyKeeperPhone: "",
        indate: "",
        outdate: "",
        storageDays: ""
      },
      AddparkcostInfo: {
        costType: "",
        remark: "",
        costAmount: "",
        paymentInstitution: "",
        whetherPay: ""
      },
      rules: {
        comefrom: [{ required: true, message: "请选择车辆来源", trigger: "blur" }],
       
        company: [ { required: true, message: '请填写联系人', trigger: 'blur' }],
        time: [{ required: true, message: "请选择控车日期", trigger: "blur" ,type:'string' }]
      },
      id: this.$store.state.navTabs.tabId,
      listLoading: false,
      listLoadings: false,
      listLoading1: false,
      listLoading5: false,
      listLoading6: false,
      visitpagesize: 20,
      visittotal: 0,
      visitpages: 1,
      visitpagesize1: 20,
      costpages: 1,
      costpagesize: 20,
      parktotal: 0,
      costtotal: 0,
      visitpages1: 1,
      visitListsRecords: [],
      inChange: "",
      outChange: "",
      userList:[],
      restaurants:[],
      a:[],
    };
  },
  methods: {
    getconpany(){
      getTaskHostUser().then(res => {
        // this.userList = [];
        let data = res.data.result;
         this.restaurants =data;

      });
    },
     handleSelect(item) {
       console.log(item)
    
    },
    timechange(val){
      this.carForm.time=val;
    },
    typechange(val) {
      this.carForm.idtype = val;
    },
    moneytime(val) {
      this.realize.time = val;
    },
    inchange(date) {
      this.inChange = "";
      if (date) {
        var srcd = new Date(date);
        this.inChange =
          srcd.getFullYear() +
          "-" +
          (srcd.getMonth() + 1) +
          "-" +
          srcd.getDate();
      }
    },
    outchange(date) {
      this.outChange = "";
      if (date) {
        var src = new Date(date);
        this.outChange =
          src.getFullYear() + "-" + (src.getMonth() + 1) + "-" + src.getDate();
      }
    },
  GetDateDiff(startDate,endDate) {  
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    this.AddparkCarInfo.storageDays=dates+1        
    },
    
    countNum(){ 
      this.GetDateDiff(this.AddparkCarInfo.indate,this.AddparkCarInfo.outdate)
    },
   
    getInDate(val) {
      this.AddparkCarInfo.indate = val;
      if(this.AddparkCarInfo.outdate){
        this.countNum()
        
      }
    },
    getOutDate(val) {
      this.AddparkCarInfo.outdate = val;
      if(this.AddparkCarInfo.indate){
        this.countNum()
      }
    },
    visithandleCurrentChange(val) {
      this.visitpage = val;
    },
    visithandleSizeChanges(val) {
      this.visitpagesizes = val;
    },
    visithandleCurrentChange1(val) {
      this.visitpagesize1 = val;
    },
    visithandleSizeChanges1(val) {
      this.visitpagesizes1 = val;
    },
    costhandleCurrentChange(val) {
      this.costpagesize = val;
    },
    costehandleSizeChanges(val) {
      this.costpagesize = val;
    },
    carcontrol(val) {
      this.carForm.time = val;
    },
    signTime(val) {
      this.signTimes = val;
    },
    //获取客户信息列表
    getlists() {
      let para = {
        id: this.$route.params.id
      };
      this.listLoading1 = true;
      getCustomerOsBasic(para).then(res => {

        let data = res.data.result;
        this.details = data;
        this.listLoading1 = false;
      });
    },
    //控制车辆信息
    gettype() {
      let para = {
        type: "vehicle_source"
      };
      findByType(para).then(res => {
        let data = res.data.result;
        this.comefrom = data;
      });
      let parafind = {
        type: "find_way"
      };
      findByType(parafind).then(res => {
        let data = res.data.result;
        this.findway = data;
      });
      let paradocument = {
        type: "document_type"
      };
      findByType(paradocument).then(res => {
        this.document = res.data.result;
      });
      let realizeInfo = {
        type: "realize_type"
      };
      let realizeInfos = {
        type: "realisation"
      };
      findByType(realizeInfo).then(res => {
        this.realizeType = res.data.result;
      });
      findByType(realizeInfos).then(res => {
        this.realizeTypes = res.data.result;
      });
      let costtype = {
        type: "cost_type"
      };
      findByType(costtype).then(res => {
        this.costtype = res.data.result;
      });
    },
    getcontrolCar() {
      let para = {
        id: this.$route.params.id
      };
      this.listLoadings = true;
      getOsControlVehicle(para).then(res => {
        let data = res.data.result;
        this.controlCarid = data.id;
        this.controlCaricsId = data.icsId;
        (this.carForm.comefrom = data.vehicleSource),
          (this.carForm.company = data.vehicleControlMechanism),
          (this.carForm.time = data.vehicleControlDate),
          (this.carForm.province = data.vehicleControlProvince),
          (this.carForm.search = data.findingWays),
          (this.carForm.overdueDay = data.vehicleControlDays),
          (this.carForm.statius = data.vehicleState),
          (this.carForm.realize = data.realisation),
          (this.carForm.cartype = data.carModel),
          (this.carForm.carnum = data.plateNumber),
          (this.carForm.carcolor = data.bodyColor),
          (this.carForm.cardrive = data.kilometres),
          (this.carForm.carframe = data.vinNo),
          (this.carForm.motor = data.engineNo),
          (this.carForm.cartime = data.vehicleContractDate),
          (this.carForm.price = data.vehiclePrice),
          (this.carForm.danger = data.vehicleDanger),
          (this.carForm.sale = data.afterSale),
          (this.carForm.idtype = data.documentTypeArray),
          (this.carForm.leave = data.customerLegacy),
          (this.carForm.receive = data.vehicleSealed),
          (this.listLoadings = false);
      });
    },
    subCarInfo(carForm) {
      let para = {
        id:this.controlCarid,
        icsId:this.controlCaricsId,
        vehicleSource: this.carForm.comefrom,
        vehicleControlMechanism: this.carForm.company,
        vehicleControlDate: this.carForm.time,
        vehicleControlProvince: this.carForm.province,
        findingWays: this.carForm.search,
        vehicleControlDays: this.carForm.overdueDay,
        vehicleState: this.carForm.statius,
        realisation: this.carForm.realize,
        carModel: this.carForm.cartype,
        plateNumber: this.carForm.carnum,
        bodyColor: this.carForm.carcolor,
        kilometres: this.carForm.cardrive,
        vinNo: this.carForm.carframe,
        engineNo: this.carForm.motor,
        vehicleContractDate: this.signTimes,
        vehiclePrice: this.carForm.price,
        vehicleDanger: this.carForm.danger,
        afterSale: this.carForm.sale,
        documentTypeArray: this.carForm.idtype,
        customerLegacy: this.carForm.leave,
        vehicleSealed: this.carForm.receive,
        // documentType:""
      };

        if(this.carForm.comefrom==null||this.carForm.comefrom==""||this.carForm.company==null||this.carForm.company==""||this.carForm.time==undefined||this.carForm.time==""){
           this.$message({
              type: "error",
              message: "请填写必填信息！"
            });
        }else{
          updateOsControlVehicle(para).then(res => {
                  if (res.data.success) {
                      this.$message({
                        type: "success",
                        message: "编辑成功！"
                      });
                      this.getcontrolCar();
                      this.costDetail();
                    } else {
                      this.$message({
                        type: "error",
                        message:res.data.message
                      });
                    }                    
              });
        }
       
    },
    //送车信息
    sendCar() {
      let paras = {
        id:this.$route.params.id,
        page: this.visitpages,
        pageSize: this.visitpagesize
      };
      SendCarInformation(paras).then(res => {
        this.visitListsRecords = res.data.result.data;
        this.visittotal = res.data.result.recordsTotal;
        this.visitListsRecords = this.visitListsRecords.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    sendCarEdit(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
        updateSendCarInformation(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
             this.sendCar()
            this.costDetail();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员！"
            });
          }
        });
      }
    },
    deletesendCar(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSendCar(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
               this.sendCar()
              this.costDetail();
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
    addSendCar() {
      this.addSendCars = true;
    },
    cancleInfo() {
      this.addSendCars = false;
      this.$refs["AddsendCarInfo"].resetFields();
    },
    subSendCar(AddsendCarInfo) {
      let para = {
        icsId: this.$route.params.id,
        carDeliverMechanism: this.AddsendCarInfo.carDeliverMechanism,
        sendCarStartPlace: this.AddsendCarInfo.sendCarStartPlace,
        sendCarEndPlace: this.AddsendCarInfo.sendCarEndPlace,
        mapDistance: this.AddsendCarInfo.mapDistance
      };
      this.$refs[AddsendCarInfo].validate(valid => {
        if (valid) {
          saveSendCar(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "送车信息添加成功！"
              });
              this.visitListsRecords.unshift({
                carDeliverMechanism: this.$refs["AddsendCarInfo"].model
                  .carDeliverMechanism,
                sendCarStartPlace: this.$refs["AddsendCarInfo"].model
                  .sendCarStartPlace,
                sendCarEndPlace: this.$refs["AddsendCarInfo"].model
                  .sendCarEndPlace,
                mapDistance: this.$refs["AddsendCarInfo"].model.mapDistance
              });
              this.addSendCars = false;
              this.$refs["AddsendCarInfo"].resetFields();
              this.sendCar();
              this.costDetail();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addUserInfos = true;
          this.$refs.AddsendCarInfo.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
    },
    //  停车信息
    ParkingCar() {
      let paras = {
        id: this.$route.params.id,
        page: this.visitpages1,
        pageSize: this.visitpagesize1
      };
      ParkingInformation(paras).then(res => {
        this.parkList = res.data.result.data;
        this.parktotal = res.data.result.recordsTotal;
        this.parkList = this.parkList.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    parkingEdit(row) {
      let para = row;
    if(this.inChange){
      row.indate = this.inChange;    
    }
    if(this.outChange){
      row.outdate = this.outChange;
    }
      if ((row.edit = !row.edit)) {
        
      } else {
        updateParkingInformation(para).then(res => {         
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "车辆停放信息编辑成功！"
            });
            this.ParkingCar();
            this.costDetail();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败！"
            });
          }
        });
      }
    },
    deleteparkingCars(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteParkingCar(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.ParkingCar();
              this.costDetail();
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
    addParkingCar() {
      this.addParkingCars = true;
    },
    canparkInfo() {
      this.addParkingCars = false;
      this.$refs["AddparkCarInfo"].resetFields();
    },
    subparkCar(AddparkCarInfo) {
      let para = {
        icsId: this.$route.params.id,
        custodian: this.AddparkCarInfo.custodian,
        placeStorage: this.AddparkCarInfo.placeStorage,
        keyKeeperName: this.AddparkCarInfo.keyKeeperName,
        keyKeeperPhone: this.AddparkCarInfo.keyKeeperPhone,
        indate: this.AddparkCarInfo.indate,
        outdate: this.AddparkCarInfo.outdate,
        storageDays: this.AddparkCarInfo.storageDays.toString()
      };
      this.$refs[AddparkCarInfo].validate(valid => {
        if (valid) {
          saveParkCar(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "停车信息添加成功！"
              });
              this.parkList.unshift({
                custodian: this.$refs["AddparkCarInfo"].model.custodian,
                placeStorage: this.$refs["AddparkCarInfo"].model.placeStorage,
                keyKeeperName: this.$refs["AddparkCarInfo"].model.keyKeeperName,
                keyKeeperPhone: this.$refs["AddparkCarInfo"].model
                  .keyKeeperPhone,
                indate: this.$refs["AddparkCarInfo"].model.indate,
                outdate: this.$refs["AddparkCarInfo"].model.outdate,
                storageDays: this.$refs["AddparkCarInfo"].model.storageDays
              });
              this.addParkingCars = false;
              this.$refs["AddparkCarInfo"].resetFields();
              this.ParkingCar();
              this.costDetail();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addUserInfos = true;
          this.$refs.AddparkCarInfo.validate(valid => {
            if (valid) {
              alert("submit!");
            } else {
              return false;
            }
          });
        }
      });
    },
    //变现信息
    getrealizeList() {
      let para = {
        id: this.$route.params.id
      };
      this.listLoading5 = true;
      getOsCashChange(para).then(res => {
        let data = res.data.result;
        this.id = data.id;
        this.icsId = data.icsId;
        (this.realize.type = data.realizeMode),
          (this.realize.payoff = data.payer),
          (this.realize.receivemoney = data.amountCollected),
          (this.realize.time = data.carPaymentTime),
          (this.realize.cost = data.costRemission),
          (this.realize.interest = data.writeOffInterest),
          (this.realize.lowerinterest = data.interestRemission),
          (this.realize.principal = data.writeOffPrincipal),
          (this.realize.receive = data.carSealUp),
          (this.realize.transfer = data.agreeTransfer),
          (this.realize.business = data.saleAgreement),
          (this.realize.recovery = data.recoverableAmount),
          (this.realize.infos = data.sealUpOtherInformation),
          (this.realize.violationInfos = data.vehicleViolationInformation),
          (this.listLoading5 = false);
      });
    },
    subReal() {
      let para = {
        id: this.id,
        icsId: this.icsId,
        realizeMode: this.realize.type,
        payer: this.realize.payoff,
        amountCollected: this.realize.receivemoney,
        carPaymentTime: this.realize.time,
        costRemission: this.realize.cost,
        interestRemission: this.realize.lowerinterest,
        writeOffInterest: this.realize.interest,
        writeOffPrincipal: this.realize.principal,
        carSealUp: this.realize.receive,
        agreeTransfer: this.realize.transfer,
        saleAgreement: this.realize.business,
        recoverableAmount: this.realize.recovery,
        sealUpOtherInformation: this.realize.infos,
        vehicleViolationInformation: this.realize.violationInfos
      };
      updateOsCashChang(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "变现信息修改成功！"
          });
          this.getrealizeList();
          this.costDetail();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //放车信息
    getstopList() {
      let para = {
        id: this.$route.params.id
      };
      this.listLoading = true;
      getOsCarRelease(para).then(res => {
        let data = res.data.result;
        this.stopListid = data.id;
        this.stopListicsId = data.icsId;
        (this.stop.notice = data.vehicleReleaseMode),
          (this.stop.time = data.pickUpDate),
          (this.stop.name = data.pickUpName),
          (this.stop.phone = data.pickUpPhone),
          (this.stop.cardNum = data.pickUpId),
          (this.stop.place = data.handover),
          (this.stop.distance = data.kilometre),
          (this.stop.statius = data.vehicleState),
          (this.stop.deal = data.saleSigned),
          (this.stop.marks = data.remarks),
          (this.listLoading = false);
      });
    },
    subStop() {
      let para = {
        id: this.stopListid,
        vehicleReleaseMode:this.stop.notice,
        icsId: this.stopListicsId,
        pickUpDate: this.stop.time,
        pickUpName: this.stop.name,
        pickUpPhone: this.stop.phone,
        pickUpId: this.stop.cardNum,
        handover: this.stop.place,
        kilometre: this.stop.distance,
        vehicleState: this.stop.statius,
        saleSigned:this.stop.deal,       
        remarks: this.stop.marks
      };
      updateOsCarRelease(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "放车信息修改成功！"
          });
          this.getrealizeList();
          this.costDetail();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //费用明细
    costDetail() {
      let paras = {
        id: this.$route.params.id,
        page: this.costpages,
        pageSize: this.costpagesize
      };
      listOsDetailsCharges(paras).then(res => {
        this.lists = res.data.result.data;
        // this.visitListsRecords = res.data.result.data;
        this.costtotal = res.data.result.recordsTotal;
        this.lists = this.lists.map(v => {
          this.$set(v, "edit", false);
          return v;
        });
      });
    },
    costEdit(row) {
      let para = row;
      if ((row.edit = !row.edit)) {
      } else {
        updateOsDetailsCharges(para).then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.costDetail();
          } else {
            this.$message({
              type: "error",
              message: "编辑失败，请联系管理员！"
            });
          }
        });
      }
    },
    deleteCost(index, rows, datas) {
      let para = {
        id: rows.id
      };
      this.$confirm("确定删除信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteOsDetailsCharges(para).then(res => {
            if (res.data.success) {
              datas.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.costDetail();
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
    addcost() {
      this.addcosts = true;
    },
    canclecost() {
      this.addcosts = false;
      this.$refs["AddparkcostInfo"].resetFields();
    },
    subcost(AddparkcostInfo) {
      let para = {
        icsId: this.$route.params.id,
        costType: this.AddparkcostInfo.costType,
        remark: this.AddparkcostInfo.remark,
        costAmount: this.AddparkcostInfo.costAmount,
        paymentInstitution: this.AddparkcostInfo.paymentInstitution,
        whetherPay: this.AddparkcostInfo.whetherPay
      };
      this.$refs[AddparkcostInfo].validate(valid => {
        if (valid) {
          savecost(para).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "费用明细成功！"
              });
              this.lists.unshift({
                costType: this.$refs["AddparkcostInfo"].model.costType,
                remark: this.$refs["AddparkcostInfo"].model.remark,
                costAmount: this.$refs["AddparkcostInfo"].model.costAmount,
                paymentInstitution: this.$refs["AddparkcostInfo"].model
                  .paymentInstitution,
                whetherPay: this.$refs["AddparkcostInfo"].model.whetherPay
              });
              this.addcosts = false;
              this.$refs["AddparkcostInfo"].resetFields();
              this.costDetail();
            } else {
              this.$message({
                type: "error",
                message: "添加失败，请联系管理员"
              });
            }
          });
        } else {
          this.addcosts = true;
          this.$refs.AddparkcostInfo.validate(valid => {
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
  mounted() {
    this.getlists();
   this.getcontrolCar();
    this.gettype();
    this.sendCar();
    this.ParkingCar();
    this.getrealizeList();
    this.getstopList();
    this.costDetail();
     this.getconpany()
    let h =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) - 105;
    this.$refs.abcd.style.height = h + "px";
  },
}

</script>

<style>
.ht_table td {
  color: #269aff;
  font-size: 13px;
}
.ht_table .tds {
  color: #000;
}
 #controlinfos .el-input{width: 230px}
.legal .el-date-editor .el-input__inner {
  margin-top: 5px;
}
.legal td{padding: 0 1px}
 .legal .el-date-editor.el-input {
  width: 160px;
} 
.legal input {
  height: 30px;
  margin-top: 2px;
  width:100%
}
</style>