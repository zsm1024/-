<template>
  <div>{{id}}</div>
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
