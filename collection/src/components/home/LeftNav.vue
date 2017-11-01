<template>
   <div class="left-nav">
      <div class="logo" >
      <i class="el-icon-menu" @click="colToggle()" ></i>
      <a v-show="!isCollapse">催收管理系统</a>
      </div>

      <el-menu theme="dark" :default-active="activeTabName" class=" el-menu-vertical-demo" :collapse="isCollapse" ref="isCollapse"  :uniqueOpened='true' @select="addTab"  >
      <el-submenu :index="item.title" v-for="item in items" :key="item.id" >
          <template slot="title"> <i :class="item.icon"></i><span>{{item.title}}</span></template>
          <el-menu-item v-for="a in item.list" :key="a.id" :index="a.path"><i class=""></i>{{a.title}}</el-menu-item>
      </el-submenu>
      </el-menu>
  </div>
  
</template>
<script>
import { mapMutations } from "vuex";
import { nav_view } from "@/api/api";
export default {

  data() {
    return {
    
      items: [],
      isCollapse: false,
    };
  },
  
  name: "LeftNav",
  computed: {
    activeTabName: {
        get() {
            return this.$store.state.navTabs.activeTabName;
        },
        set(value) {
            this.$store.commit("navTabs/setActiveTabName", value);
        }
    },
  },
  methods: {
    colToggle(){
    if(this.isCollapse){
    
      this.$parent.nav = false;
      this.$parent.navopen = true;
      this.$parent.paneopen = true;
      this.$parent.pane = false;
     
        
        this.isCollapse = false;
    }else{
      this.$parent.nav = true;
      this.$parent.navopen = false;
      this.$parent.paneopen = false;
      this.$parent.pane = true;
       
    
        
        this.isCollapse = true;
    }
    },
    ...mapMutations("navTabs", ["addTab"]),
    getlist() {
    nav_view().then(res => {
        let data = res.data.msg;
        this.items = data;
    });
    }
  },
  mounted() {
      this.getlist();
  }
};
</script>
<style scoped>
/*.nav {
    position: absolute;
    left: 0;
    top: 5px;
    bottom: 0;
    min-width:60px;
    width:5rem;
    background-color: #324157;
}
.navopen {
    position: absolute;
    left: 0;
    top: 5px;
    bottom: 0;
    width:15rem;
    background-color: #324157;
}
.pane {
    position: absolute;
    left:5rem;
    top:5px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.paneopen {
    position: absolute;
    left:15rem;
    top: 5px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    height:95%!important;
    overflow-y: auto;
}
.el-menu--collapse{
	 height:95%!important;
	 width: 70px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height:5%;
  background: #324157;
  border-bottom: solid 0.01rem #48576a;
}
.logo a{
  color:#fff;
}
i {
  margin-right: 0.5rem;
}

.left-nav {
  padding: 0.3rem 0.3rem 0;
  height: 99%;
}
</style>

