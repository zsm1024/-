<template>
  <div class="left-nav">
    <div class="logo">
      <i class="el-icon-menu"></i>
      <a>催收管理系统</a>
    </div>
    <el-menu theme="dark" @select="addTab" v-for="item in items" :key="item.name">
    	<el-submenu index="index">
    		<template slot="title">{{item.name}}</template>
    		<el-menu-item v-for="a in item.list" :index="a.name" :key="a.name">{{a.name}}</el-menu-item>
    	</el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 

export default {
	name: 'LeftNav',
	data(){
		return{
			items:[],
		}
	},
created:function(){
			this.getTopic();
		},
methods: {
    ...mapMutations('navTabs', [
      'addTab'
    ]),
    	getTopic:function(){
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
<style scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 3.5rem;
  border-bottom: solid 0.01rem #48576a;
}

i {
  margin-right: 0.5rem;
}

.left-nav {
  padding: 0.3rem;
}
</style>

