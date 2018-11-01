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
          this.carlist =res.data.result;									
         this.carlist.forEach(el => {
           el.pickUpDate=el.pickUpDate ? Moment(el.pickUpDate).format('YYYY-MM-DD'):""
         });
      })
    }
  },
  mounted(){
    this.getlist()
  },
};
</script>
