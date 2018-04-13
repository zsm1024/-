<template >
  <section>
    <el-form ref="mainformvisit"  :model="mainformvisit"   inline >	

      <el-form-item label="外访日期" prop="appointmentTime" label-width="95px" >
         <i style="color:red">*</i> 
				<el-date-picker type="date" placeholder="选择约会时间" v-model="mainformvisit.appointmentTime" style="width:150px" @change="dataChangevisit"></el-date-picker>
		  </el-form-item>	
      <el-form-item label="地址类型 "  label-width="95px"  prop="addressType">
        <i style="color:red">*</i> 
					<el-select  style="width:150px" id="selectMes" v-model="mainformvisit.addressType" @change="changeAddressType" >
						<el-option v-for="(item,index) in addressType" :key="index" :label="item.nameType" :value="item.nameType"></el-option>
					</el-select>
				</el-form-item>	
      <el-form-item label="地址 "label-width="95px" prop="address">
        <i style="color:red">*</i>
					<el-select  style="width:150px" id="selectMes" v-model="mainformvisit.address"  >
						<el-option  v-for="(item,index) in address" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="地址是否存在 " label-width="95px" prop="istrue" >
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.istrue"  >
						<el-option v-for="(item,index) in IsTrue" :key="index" :label="item.label" :value="item.value"></el-option>
					</el-select>
          <!-- v-model="messageform.selectTitle" placeholder="请选择" @change="getMessage" -->			
				</el-form-item>	
        <el-form-item label="备注 " label-width="95px" prop="addressName"  v-if="mainformvisit.istrue=='Y'">
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.addressName" >
						<el-option v-for="(item,index) in addressName" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>	
        <span v-if="mainformvisit.istrue=='Y'" >
            <el-form-item label="是否有人应门 " label-width="95px" prop="isanswer"  v-if="mainformvisit.istrue=='Y'">
              <i style="color:red">*</i> 
              <el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isanswer" @change="isanswer" >
                <el-option v-for="(item,index) in IsTrue" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>	
				    </el-form-item>
            <el-form-item label="见到对象" label-width="95px" prop="isperson" v-if="mainformvisit.isanswer!='N'">
              <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isperson"  >
						<el-option v-for="(item,index) in isperson" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>	
        <el-form-item label="见到对象" label-width="95px" prop="isperson"  v-if="mainformvisit.isanswer=='N'">
          <i style="color:red">*</i> 
					<el-select   style="width:150px" id="selectMes" v-model="mainformvisit.isperson" disabled>
						<el-option   label=" " value=""></el-option>
					</el-select>	
				</el-form-item>       
        </span> 
        <el-form-item label="地址情况 " label-width="95px" prop="addressStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.addressStn" >
						<el-option v-for="(item,index) in addressStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="房屋所有人 " label-width="95px" prop="houseStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.houseStn" >
						<el-option v-for="(item,index) in houseStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="工作情况 " label-width="95px" prop="workStn"  > 
          <i style="color:red">*</i>        
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.workStn" >
						<el-option v-for="(item,index) in workStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>
        <el-form-item label="控制车辆人 " label-width="95px" prop="carStn"  >  
           <i style="color:red">*</i>           
					<el-select   style="width:150px;" id="selectMes" v-model="mainformvisit.carStn" >
						<el-option v-for="(item,index) in carStn" :key="index" :label="item.val" :value="item.val"></el-option>
					</el-select>	
				</el-form-item>       
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:end">
				<!-- @click="addWorkInfo" -->
				<el-button style="padding:10px" type="primary" @click="canclevisit">取 消</el-button>
				<el-button type="primary"  style="padding:10px" @click="submitMsg">确 定</el-button>
			</div>
  </section>
</template>
<script>
import{tab_view} from "@/api/tablist"
import{findByType,AddresssfindByType,AddresssfindAddress,VisitRecords} from "@/api/basedata"
export default {
  data(){
    return{
      times:"",
      IsTrue:"",
      addressStn:[],
      houseStn:[],
      workStn:[],
      carStn:[],
      roleName:"",
      type:"",
      address:[],
      addressType:[],
      formLabelWidth:'60px',
      mainformvisit: {
          appointmentTime: '',
          addressType:"",
          address:"",
          istrue:"",
          addressName:"",
          isanswer:"",
          isperson:"",
          personmarks:"",
          addressStn:"",
          houseStn:"",
          workStn:"",
          carStn:""

      },
      IsTrue:[
        {"label":"Y","value":"Y"},
        {"label":"N","value":"N"},
      ],
       IsTrue1:[],
      addressName:[],
    }
  },
  methods:{
     dataChangevisit(val){			
		   this.times=val;
    },
    getMessagesvisit(val) {
      this.IsTrue=val;
    },
    isanswer(val){
      if(val=="N"){
        this.mainformvisit.isperson=""
      }
    },
  //   getlistvisit() {
	// 		let para = {
	// 			missionId: this.$route.params.id
	// 		};
	// 		tab_view(para).then(res => {
	// 			 let data = res.data.result;			
  //        this.items = data;							 
  //     });
      
  //  },
   getaddress(){
     let para={
       type:"object"
     }
     let paras0={
      type:"address_status"
    }
    let paras={
      type:"house_owner"
    }
    let paras1={
      type:"work_status"
    }
    let paras2={
      type:"car_control"
    }
    let paras3={
      type:"address_remarks"
    }
    findByType(para).then(res=>{
      let data=res.data.result;
      this.isperson=data
    });
     findByType(paras0).then(res=>{
      let data=res.data.result;
      this.addressStn=data
    });
    findByType(paras).then(res=>{
      let data=res.data.result;
      this.houseStn=data
    });
     findByType(paras1).then(res=>{
      let data=res.data.result;
      this.workStn=data
    });
     findByType(paras2).then(res=>{
      let data=res.data.result;
      this.carStn=data
    });
    findByType(paras3).then(res=>{
      let data=res.data.result;
      this.addressName=data
    });
   },
   getaddressType(){
     let para={
       	missionId: this.$route.params.id
     }
     AddresssfindByType(para).then(res=>{
       let data=res.data.result;
       this.addressType=data
     })
   },
   changeAddressType(val){
     this.roleName=val.split("-").shift();
     this.type=val.split("-").pop();
     this.address=[];
     let para={
       missionId: this.$route.params.id,
       roleName:this.roleName,
       type:this.type
     }
     AddresssfindAddress(para).then(res=>{
       let data=res.data.result
       this.address=data;
      for(let a=0;a<this.address.length;a++){
        this.mainformvisit.address=this.address[0]
      }
     });
     
   },
   canclevisit(){  
     console.log(this.$parent.total)
    //  this.$refs.mainforms.resetFields();
   },
   submitMsg(){
     let para={
          missionId: this.$route.params.id,
          outsideTime:this.mainformvisit.appointmentTime,
          addressType:this.mainformvisit.addressType,
          address:this.mainformvisit.address,
          addressReal:this.mainformvisit.istrue,
          addressRemarks:this.mainformvisit.addressName,
          callReal:this.mainformvisit.isanswer,
          seeIt:this.mainformvisit.isperson,
          // seeItS:this.mainformvisit.ispersons,
          personmarks:this.mainformvisit.personmarks,
          cusAddressSituation:this.mainformvisit.addressStn,
          ownerHource:this.mainformvisit.houseStn,
          cusWorkSituation:this.mainformvisit.workStn,
          carControl:this.mainformvisit.carStn
      }
      VisitRecords(para).then(res=>{
        console.log(res)
      })
   }

  },
  mounted() {
    // this.getlistvisit();
    this.getaddress();
    this.getaddressType()
    }
  }
</script>

