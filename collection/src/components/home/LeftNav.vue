<template>
  <div class="left-nav">
    <div class="logo">
      <i class="el-icon-menu"></i>
      <a>后台管理系统</a>
    </div>

    <el-menu theme="dark" v-for="item in items" :key="item.id" @select="addTab">
      <el-submenu index="manager">
        <template slot="title">{{item.title}}</template>
        <el-menu-item v-for="a in item.list" :key="a.id" :index="a.path">{{a.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
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

