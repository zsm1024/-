<template>
  <div class="tab-container">
    <el-tag v-model="activeName" type="border-card">




    </el-tag>
  </div>
</template>
<script>
export default {
  data(){
     return{
           id:this.$store.state.navTabs.tabId 
        }
  }
  
}
</script>
<style >

</style>
