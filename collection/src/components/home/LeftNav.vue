<template>
  <div class="left-nav" style="z-index: ;">
  	<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
  	
  	
  	
    <el-menu theme="dark" class="el-menu-vertical-demo":uniqueOpened='true' @select="addTab" :collapse="isCollapse">
      <el-submenu :index="item.title" v-for="item in items" :key="item.id">
        <template slot="title"> <i class=""></i>{{item.title}}</template>
  <div class="left-nav">
    <div class="logo" >
    <i class="el-icon-menu" @click="colToggle()" ></i>
    <a v-show="!isCollapse">催收管理系统</a>
    </div>

    <el-menu theme="dark" class=" el-menu-vertical-demo" :collapse="isCollapse" ref="isCollapse"  :uniqueOpened='true' @select="addTab"  >
    <el-submenu :index="item.title" v-for="item in items" :key="item.id" >
        <template slot="title"> <i :class="item.icon"></i><span>{{item.title}}</span></template>
>>>>>>> 8c56cd71a688dc944295f8c671a9254b45993082
        <el-menu-item v-for="a in item.list" :key="a.id" :index="a.path"><i class=""></i>{{a.title}}</el-menu-item>
    </el-submenu>
    </el-menu>
  </div>
  
</template>
<script>

export default {

  data() {
    return {
      items: [],isCollapse: true
      items: [],
      isCollapse: false,
    };
  },
  name: "LeftNav",
  methods: {
    colToggle(){
      
      if(this.isCollapse){
        this.isCollapse = false;
      }else{
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
 .el-menu-vertical-demo:not(.el-menu--collapse) {
 	width:230px;
    min-height: 400px;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.logo {
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
i {
  margin-right: 0.5rem;
}

.left-nav {
  padding: 0.3rem;
}
</style>

