<template>
  <div class="left-nav" style="z-index: ;">
  	<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
  	
  	
  	
    <el-menu theme="dark" class="el-menu-vertical-demo":uniqueOpened='true' @select="addTab" :collapse="isCollapse">
      <el-submenu :index="item.title" v-for="item in items" :key="item.id">
        <template slot="title"> <i class=""></i>{{item.title}}</template>
        <el-menu-item v-for="a in item.list" :key="a.id" :index="a.path"><i class=""></i>{{a.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  
</template>
<script>
import { mapMutations } from "vuex";
import { nav_view } from "../../api/api";
export default {
  data() {
    return {
      items: [],isCollapse: true
    };
  },
  name: "LeftNav",
  methods: {
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
.left-nav {
  padding: 0.3rem;
}
</style>

