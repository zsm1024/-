<template>
<section>
	<div id="tabCon">
		<router-link class="routerTab" v-for="(tab,$index) in lists" :key="$index" :to="{path:tab.path +'/'+id}" tag="span" activeClass='active'>{{tab.name}}</router-link>
	</div>
	<div id="THead">
		<router-view></router-view>
	</div>
</section>
</template>
<script>
export default {
  data(){		
     return{
			  	 id:this.$route.params.id, 
					 lists:[
						 {'name':"催收信息",path:'/searchs/colsearchdetail/cs_message'},
						 {'name':"合同信息",path:'/searchs/colsearchdetail/ht_message'},
						 {'name':"催收历史",path:'/searchs/colsearchdetail/cs_history'},
						 {'name':"维保记录",path:'/searchs/colsearchdetail/wb_message'},
						 {'name':"还款计划",path:'/searchs/colsearchdetail/hk_plan'},
						 {'name':"扣款流水",path:'/searchs/colsearchdetail/kk_list'},
						 {'name':"CMS历史",path:'/searchs/colsearchdetail/cms_history'},
					 ],
         
        }
	},
		mounted(){
		// let h=(window.innerHeight);
		// this.$refs.cs.style.height= (h-290)+"px";
 },

}

</script>
<style >
#tabCon{height:30px;line-height: 30px;width:100%;border-bottom: 1px solid #f0f0f0 } 
.routerTab{padding: 5px;cursor: pointer;margin: 0 5px}
.routerTab:hover{cursor: pointer;color:#20a0ff   }
#THead .el-collapse-item__header{background: #dfe6ec!important}
</style>