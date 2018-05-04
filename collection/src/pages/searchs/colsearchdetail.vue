<template>
<section>
	<div id="tabCon">
		<router-link class="routerTab" v-for="(tab,$index) in lists" :key="$index" :to="{path:tab.path +'/'+id}" tag="span" activeClass='active'>{{tab.names}}</router-link>
	</div>
	<div id="THead">
		<router-view></router-view>
	</div>
</section>

  <!-- <div class="tab-container abc"> -->
    <!-- <el-tabs  type="border-card">
    	<el-tab-pane label="催收信息">
				<div ref="cs" style="overflow-y:auto">
					<cs-message style="height:100%" ></cs-message>
				</div>
				<div ref="for" style="overflow-y:auto" id="abd">
					<form-message ></form-message>
				</div>				
				</el-tab-pane>
    	<el-tab-pane label="合同信息"><ht-message></ht-message></el-tab-pane>
    	  <el-tab-pane label="催收历史"><cs-history></cs-history></el-tab-pane> 
    	 <el-tab-pane label="维保记录"><maintenance></maintenance></el-tab-pane>
    	 <el-tab-pane label="还款计划"><hk-plan></hk-plan></el-tab-pane>
    	<el-tab-pane label="扣款流水"><kk-list></kk-list></el-tab-pane>
    	<el-tab-pane label="cms历史"><cms-history></cms-history></el-tab-pane>  
    </el-tabs> -->
  <!-- </div> -->
</template>
<script>
	// import hkPlan from "../tab/tablist/cs_message.vue";
	// import kkList from "../tab/tablist/cs_message.vue";
export default {
  data(){		
     return{
			  	id:this.$route.params.id, 
				lists:[
					{'names':"催收信息",path:'/searchs/colsearchdetail/cs_message'},
					{'names':"合同信息",path:'/searchs/colsearchdetail/ht_message'},
					{'names':"催收历史",path:'/searchs/colsearchdetail/cs_history'},
					{'names':"维保记录",path:'/searchs/colsearchdetail/showlist'},
					{'names':"还款计划",path:'/searchs/colsearchdetail/hk_plan'},
					{'names':"扣款流水",path:'/searchs/colsearchdetail/kk_list'},
					{'names':"CMS历史",path:'/searchs/colsearchdetail/cms_history'},
				],
         
        }
	},
		mounted(){
 },
//   components:{
//   	csMessage,
//   	htMessage,
//   	 csHistory,
//   	maintenance,
//   	 hkPlan,
//   	kkList,
// 	cmsHistory,
// 	formMessage
// 	}
}

</script>
<style >
#tabCon{height:30px;line-height: 30px;width:100%;border-bottom: 1px solid #f0f0f0 } 
.routerTab{padding: 5px;cursor: pointer;margin: 0 5px}
.routerTab:hover{cursor: pointer;color:#20a0ff   }
 #THead .el-collapse-item__header{ background: #dfe6ec!important;}
</style>