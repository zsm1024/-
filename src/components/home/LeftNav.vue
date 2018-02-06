<template>
   <div class="left-nav">
      <div class="logo" @click="colToggle()" title="点击展开或关闭该列表" >
      <i class="el-icon-menu" ></i>
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
      isCollapse: true,
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
.left-nav .logo{cursor: pointer;width: 100%;}
.left-nav .logo:hover{background:#48576a;}
</style>

