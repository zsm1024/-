<template>
    <div>
        <div class="logo" >
        <i class="el-icon-menu" ></i>&nbsp;
        <a v-show="!isCollapse" >催收管理系统</a>
        </div>
        <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path" :collapse="isCollapse" ref='menu' style="overflow-y:auto">
        <sidebar-item :routes='permission_routers'></sidebar-item>
        </el-menu>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    
    isCollapse() {
     
      return !this.sidebar.opened
    }
  },
  mounted(){
    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-86;
    this.$refs.menu.$el.style.height= h+"px";
    // console.log(this.$refs.menu.$el.clientHeight)
    // console.log(this.$refs.menu.$el.clientHeight)
    //  this.$refs.menu.$el.style.clientHeight=h+"px";
  }
}
</script>
<style scoped>
.logo {
  background-color:#324157;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 3.5rem;
  border-bottom: solid 0.01rem #48576a;
}
.logo a{
  color:#fff
}    
</style>
