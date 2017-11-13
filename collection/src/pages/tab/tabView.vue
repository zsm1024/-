<template>
  <div class="tab-container abc">
    <el-tabs  type="border-card">
    	<el-tab-pane label="催收信息" ><cs-message ></cs-message></el-tab-pane>
    	<el-tab-pane label="合同信息"><ht-message></ht-message></el-tab-pane>
    	<el-tab-pane label="催收历史"><cs-history></cs-history></el-tab-pane>
    	<el-tab-pane label="维保记录"><maintenance></maintenance></el-tab-pane>
    	<el-tab-pane label="还款计划"><hk-plan></hk-plan></el-tab-pane>
    	<el-tab-pane label="扣款流水"><kk-list></kk-list></el-tab-pane>
    	<el-tab-pane label="cms历史"><cms-history></cms-history></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
	import csMessage from "./tablist/cs_message";
	import htMessage from "./tablist/ht_message";
	import csHistory from "./tablist/cs_history";
	import maintenance from "./tablist/maintenance";
	import hkPlan from "./tablist/hk_plan";
	import kkList from "./tablist/kk_list"	;
	import cmsHistory from "./tablist/cms_history"	;
export default {
  data(){
     return{
           id:this.$store.state.navTabs.tabId 
        }
  },
  components:{
  	csMessage,
  	htMessage,
  	csHistory,
  	maintenance,
  	hkPlan,
  	kkList,
  	cmsHistory
  } 
}
</script>
<style >
</style>