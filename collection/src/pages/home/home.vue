<template>
	<div id="home" :class="{'layout-hide-text': spanLeft < 5}">		
		<el-row type='flex'>		
		  <el-col :span="spanLeft">
		  	<p><router-link to="/home">首页</router-link></p>
		  	<el-collapse v-model="activeName" accordion v-for="item in items">
				<el-collapse-item :title="item.name" :name="item.id">
					<template  v-for="a in item.list">						
						<p class='el-icon-message'>
						<router-link  :to="{path:a.path}">
							{{a.name}}			  
				    	</router-link>
						</p>				
					</template>
					
				</el-collapse-item>				 
			</el-collapse>
		  	<!--<el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
		  	<div class="grid-content bg-purple" v-for=" item in items">			  		
		  		<el-submenu index='1' accordion>
		  			<template slot="title">{{item.name}}</template>
		  			<template v-for="a in item.list" v-if="!a.hidden">
		  				<router-link  :to="{path:a.path}">
		  					<el-menu-item index="">{{a.name}}</el-menu-item>	
		  				</router-link>	
		  			</template>
		  		</el-submenu>
		  	<!--<router-link to="/index1">			  		
			    <el-menu-item-group>
			      <el-menu-item index="/index1">选项1</el-menu-item>			     
			    </el-menu-item-group> 		  	
		  	</router-link>
		  	<router-link to="/index2">
			    <el-menu-item-group>
			      <el-menu-item index="/index2">选项2</el-menu-item>			     
			    </el-menu-item-group>			   
		  	</router-link>-->
		  	<!--</div>
			</el-menu>	-->
		  </el-col>
		  <el-col :span="spanRight"><div class="grid-content bg-purple">
		  	<router-view></router-view>		  	
		  </div>
		 </el-col>		  
		</el-row>		
			</div>	
		</template>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-collapse-item {
  	text-align: left;
  	padding-left: 20px;
  }
</style>

<script>
  export default {

 	data(){
 		return{
 			spanLeft:3,
 			spanRight:21,
 			isCollapse:false,
 			items:[],
 			activeName:'1'

 		}
 	},
 	created:function(){
			this.TabList();
		},
 	methods:{
 	TabList:function(){
		var that =this;
			this.$http.get('http://localhost:3000/list')
			.then(function(ret) {
				var data=ret.data;
				this.items=data;				
				})
			}
 	}

  }
</script>