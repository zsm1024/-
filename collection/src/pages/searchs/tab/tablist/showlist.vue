<template>
	<section>
		<!--列表-->
		<el-table :data="lists"  border highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
			<el-table-column label="操作"  align="center"  width="40" >
				<template  slot-scope="scope">
					<!-- <router-link class="routerTab" v-for="(tab,$index) in list" :key="$index" :to="{path:tab.path}" tag="span" activeClass='active'>{{tab.name}}</router-link>
	</div> -->
					 <el-button type="text" size="small" @click="addTab(scope.$index, scope.row),addTabs=true"  >详情</el-button>
				</template>
			</el-table-column>
			<el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" :width="col.width">
			</el-table-column>
		</el-table>
		<el-dialog title="维保详情" :visible.sync="addTabs"  id="WbInfos" >
			<template>
				<el-collapse v-model="activeNames" v-loading="listLoading">
					<el-collapse-item name="1" title="车辆信息" >
						<table class="ht_table">
							<tbody>
								<tr>
									<td class="tds">车牌号</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_cph}}</td>
									<td class="tds">底盘号</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_dph}}</td>
									<td class="tds">发动机号</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_fdjh}}</td>		
									<td class="tds">车辆颜色</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_clys}}</td>	
								</tr>
								<tr>
									<td class="tds">首保日期</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_xcbyrq}}</td>
									<td class="tds">下次保养日期</td><td  style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_xcbyrq}}</td>
									<td class="tds">下次保养里程</td><td  style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_xcbylc}}</td>
									<td class="tds">首次来厂日期</td><td  style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_xcbylc}}</td>	
									
								</tr>	
								<tr>
									<td class="tds">首次到店</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_scdd}}</td>
									<td class="tds">最近到店</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_sbrq}}</td>
									<td class="tds">最近修理日期</td><td colspan="3" style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_zjxlrq}}</td>
									
								</tr>
								<tr>
									<td class="tds">家装说明</td><td colspan="7" style="color:#269aff!important;font-size: 13px">{{wbInfo.cl_jzsm}}</td>
								</tr>				
							</tbody>	 
						</table>
					</el-collapse-item>
			 		<el-collapse-item name="2" title="客户信息">
						<table class="ht_table">
						<tbody>
							<tr>
								<td class="tds">客户姓名</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_cz}}</td>
								<td class="tds">车辆数</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_cs}}</td>
								<td class="tds">客户类型</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_khlx}}</td>
								<td class="tds">所在行业</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_szhy}}</td>
								<!-- <td class="tds">性别</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_xl}}</td> -->
								<!-- <td class="tds">民族</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.nation}}</td>				 -->
							</tr>
							<tr>
											
								<td class="tds">所在省份</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_szs}}</td>
								<td class="tds">所在城市</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_szdq}}</td>	
								<td class="tds">所在区县</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_szxq}}</td>
								<td class="tds">购车目的</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_gcmd}}</td>
							</tr>
							<tr>
								
								<td class="tds">证件类型</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_zjlx}}</td>
								<td class="tds">证件号码</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_khsbh}}</td>
								<td class="tds">手机</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_sj}}</td>
								<td class="tds">家庭电话</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_jtdh}}</td>							
							</tr>
							<tr>
								
								<td class="tds">办公电话</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_bgdh}}</td>
								<td class="tds">QQ号码</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_qq}}</td>
								<td class="tds">微信号码</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_wxhm}}</td>
								<td class="tds">家庭结构</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_jtjg}}</td
								>			
							</tr>
							<tr>
								<td class="tds">地址</td><td colspan="2" style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_dz}}</td>
								<td class="tds">客户公司名称</td><td colspan="2" style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_dygsmc}}</td><td class="tds">学历</td><td>{{wbInfo.education}}</td>	
								  
							</tr>	
							<tr>			
								<td class="tds">电子邮箱</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_dzyx}}</td>
								<td class="tds">客户爱好</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_khah}}</td>
								<td class="tds">职位</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_zw}}</td>
								<td class="tds">月收入</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.kh_ysr}}</td>				
							</tr>					  								
						</tbody>
						</table>
  					</el-collapse-item>
					<el-collapse-item name="3" title="维修信息">
						<table class="ht_table">
							<tbody>
								<tr>
									<td class="tds">送修人姓名</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_sxr}}</td>
									<td class="tds">性别</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_xb}}</td>									
									<td class="tds">身份证号</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_zjhm}}</td>
									<td class="tds">手机号码</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_xsj}}</td>
								</tr>
								<tr>				 
									<!-- <td class="tds">出生日期</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.birthDate}}</td> -->
									<!-- <td class="tds">驾驶证号码</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.driverNum}}</td> -->
									
									<td class="tds">家庭电话</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_jtdh}}</td>
									<td class="tds">办公电话</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_bgdh}}</td>
										<td class="tds">地址</td><td colspan="7" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_dz}}</td>
								</tr>
								<tr>				 
									
										<td class="tds">进站日期</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_jzrq}}</td>
										<td class="tds">交车日期</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_jcrq}}</td>
										<td class="tds">累计里程</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_xslc}}</td>
										<td class="tds">服务类型</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_fwlx}}</td>
									<!-- <td class="tds">所在省份</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.province}}</td>
									<td class="tds">所在城市</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.city}}</td>
									<td class="tds">所在区县</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.counties}}</td> -->
								</tr>
								<tr>
								<tr><td class="tds">故障描述</td><td colspan="7" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_gzms}}</td></tr>
								<tr><td class="tds">初步诊断</td><td colspan="7" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_cbzd}}</td></tr>
								
									<!-- <td class="tds">地址</td><td colspan="7" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_dz}}</td> -->
								</tr>
								<tr>
									<td class="tds">修理类别</td><td colspan="3" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_xllb}}</td>
									<td class="tds">状态</td><td colspan="3" style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_zt}}</td>
								</tr>			 
							</tbody>
	  					</table>
  					</el-collapse-item>
					<el-collapse-item name="4" title="服务站信息">
						<table class="ht_table">
							<tbody>
								<tr>
									<td class="tds">服务站简称</td><td colspan="3" style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_fwzjc}}</td>	
									<td class="tds">服务站名称</td><td colspan="3" style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_fwzmc}}</td>
									
								</tr>
								<tr> 
									
									<td class="tds">省份</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_szsf}}</td>
									<td class="tds">城市</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_szdq}}</td>
									<td class="tds">地址</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_dz}}</td>
									
								
								</tr>
								<tr>
									<td class="tds">站长</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_zz}}</td>
									<td class="tds">站长手机</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_zzsj}}</td>
									<td class="tds">业务电话</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.fwz_ywdh}}</td>
								</tr>
								<!-- <tr>
									
									<td class="tds">服务开始时间</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_jcrq}}</td>
									<td class="tds">服务结束时间</td><td style="color:#269aff!important;font-size: 13px">{{wbInfo.wx_jzrq}}</td> 
									
								</tr> -->
								
								
							</tbody>
						</table>
  					</el-collapse-item>

				</el-collapse>
			</template>			
		</el-dialog>
		
		
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import { repair, repairDetial } from "@/api/tablist";

export default {
  data() {
    return {
      lists: [],
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      cols: [
        { title: "服务站名称", field: "fwz_mc" },
        { title: "服务站简称", field: "fwzjc" },
        { title: "省份", field: "szsf" },
        { title: "城市", field: "szdq" },
        { title: "地址", field: "dz" },
        { title: "业务电话", field: "ywdh" },
        { title: "送修人", field: "sxr" },
        { title: "送修人手机", field: "sxr_sjh" },
        { title: "修理类别", field: "xllb" },
        { title: "进厂时间", field: "jzrq" },
        { title: "出厂时间", field: "jcrq" }
      ],
      total: 0,
      pagesize: 10,
      page: 1,
      listLoading: false,
      addTabs: false,
      wbInfo: []
    };
  },
  methods: {
    addTab(index, row) {
      let para = {
        dph: row.dph,
        fwzh: row.fwzh,
        fc: row.fc,
        wtsh: row.wtsh
      };
      this.addTabs = true;
      repairDetial(para).then(res => {
        let data = res.data.result;
        this.wbInfo = data;
      });
      // 	var indexlink = "showdetail";
      // 	var label = '维保信息详情';
      // 	this.$store.state.listdetail.tabdetailId=row.index;

      // 	this.$store.state.listdetail.activeTabdetailName = "showdetail";
      // 	console.log(this.$store.state.listdetail)
      // 	let component = resolve => require([`@/pages/searchs/tab/tablist/${indexlink}`], resolve)
      // 	// console.log(${indexlink})
      // 	if (this.$store.state.listdetail.tabListdetail.filter(f => f.name == indexlink) != 0) {
      // 		this.$store.state.listdetail.tabListdetail = this.$store.state.listdetail.tabListdetail.filter(f => f.name != indexlink);
      // 	}
      // 	this.$store.state.listdetail.tabListdetail.push({
      // 			label: label,
      // 			name: indexlink,
      // 			disabled: false,
      // 			closable: true,
      // 			component: component
      // 		})
      // 		console.log(this.$store.state.listdetail.tabListdetail)
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    //获取列表
    getlists() {
      let para = {
        // page: this.page,
        // pageSize: this.pagesize,
        icsId: this.$route.params.id
      };
      this.listLoading = true;
      //NProgress.start();
      repair(para).then(res => {
        let data = res.data.result;
        // this.total = data.data.length;
        this.lists = data;
        this.listLoading = false;
      });
    },
    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  created() {
    this.getlists();
  }
};
</script>

<style >
#WbInfos .el-dialog--small {
  width: 97% !important;
  max-height: 98%;
  overflow: auto;
  top: 0% !important;
}
#WbInfos .el-dialog--small td {
  color: #269aff !important;
  font-size: 13px;
  min-width: 50px;
}
#WbInfos .el-dialog--small .tds {
  color: #000 !important;
}
/* #WbInfos .el-dialog--small .el-dialog__header { padding: 10px 10px 0!important};
#WbInfos .el-dialog--small .el-dialog__body {padding: 10px 20px!important};
#WbInfos .el-collapse-item__header{height:30px!important;line-height: 30px!important} */
</style>