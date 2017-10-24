<template>
	<div id="index2">
		<el-tabs type="border-card" v-model="activeName" >
				<!--<el-tab-pane  :label="a.name" v-for=" a in items" :key='a.key' :name="a.key" >				
					<tabs-view></tabs-view>
				</el-tab-pane>	-->
			<el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
        		<keep-alive>
          			<tab-pane v-if='activeName==item.key' :type='item.key'></tab-pane>
       			 </keep-alive>
      		</el-tab-pane>
					
		</el-tabs>
	</div>
</template>

<script>
	import TabPane from './tabPane'
		export default{
		data(){
			return{
				tabMapOptions: [
		        { label: '催收信息', key: 'CS' },
		        { label: '合同信息', key: 'HT' },
		        { label: '催收历史', key: 'CL' },
		        { label: '客户信息', key: 'EU' },
		        { label: '还款计划', key: 'HK' },
		        { label: '扣款流水', key: 'KL' },
		        { label: 'CMS历史', key: 'CMS' }
     		 ],
				items:[],
				activeName:"CS"
			}
			
		},

		components: {
			TabPane
		}
	}
</script>

<style>
</style>