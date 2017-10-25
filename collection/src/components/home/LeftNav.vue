<template>
  <div class="left-nav">
    <div class="logo">
      <i class="el-icon-menu"></i>
      <a>后台管理系统</a>
    </div>
    <el-menu theme="dark" @select="addTab" v-for="item in items" :key="item.id">
      <el-submenu index="index">
          <template slot="title">{{item.title}}</template>
          <el-menu-item v-for="a in item.list"  :key="a.id" :index="index" :name="index">{{a.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
<!-- <el-menu theme="dark" @select="addTab">
      <el-submenu index="manager">
        <template slot="title">导航一</template>
        <el-menu-item index="home/User">用户管理</el-menu-item>
        
      </el-submenu>
       <el-submenu index="manager1">
        <template slot="title">导航一111</template>
        <el-menu-item index="home/User1">用户管理</el-menu-item>
        
      </el-submenu>

   
    </el-menu> -->


  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { nav_view } from '../../api/api';
export default {
  data(){
    return{
      items:[],
    }
  },
  name: 'LeftNav',
  methods: {
    ...mapMutations('navTabs', [
      'addTab'
    ]),
      getlist(){
               nav_view().then((res)=>{
                   let data=res.data.msg;
                   this.items=data;                 
               }) 
        }
  },
  mounted(){
    this.getlist()
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

