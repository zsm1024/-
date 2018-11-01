<template>
  <el-table  border stripe :data="carlist" > 
		<el-table-column :prop="baseinfo.field" :label="baseinfo.title"  v-for="(baseinfo, index) in baseinfo" :key="index"   align="center" show-overflow-tooltip  >
		</el-table-column>			
	</el-table>
</template>
<script >
 import { getOsControlVehicleD } from "@/api/basedata";
 import Moment from "moment/moment";
export default {
  data() {
    return {
      carlist:[],
      page:0,
      pagesize:200,
      baseinfo: [
        { title: "控车日期", field: "vehicleControlDate"},
        { title: "控车省市", field: "vehicleControlProvince" },
        { title: "控车时逾期天数", field: "vehicleControlDays" },
        { title: "变现情况", field: "realisation" },
        { title: "提车日期", field: "pickUpDate"},
        { title: "交接地", field: "handover" },
      ]
    };
  },
  methods:{
    getlist(){
      let para = {
        id:this.$route.params.id,
      };
      getOsControlVehicleD(para).then(res=> {
        // var date = new Date();
				// var seperator1 = "-";
				// var month = date.getMonth() + 1;
				// var strDate = date.getDate();
				// if (month >= 1 && month <= 9) {
				// 	month = "0" + month;
				// }
				// if (strDate >= 0 && strDate <= 9) {
				// 	strDate = "0" + strDate;
				// }
				// var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;						
				// return currentdate;
				// this.NowFormatDate=currentdate;
         this.carlist =res.data.result;
         this.carlist.forEach(el => {
           let a =el
             a.pickUpDate=a.pickUpDate ? moment(a.pickUpDate).format('YYYY-MM-DD'):""
           
         });
      })
    }
  },
  mounted(){
    this.getlist()
  },
};
</script>
