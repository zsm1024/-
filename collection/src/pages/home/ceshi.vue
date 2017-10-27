<template>
    <div>
       {{id}}
    </div>
</template>
<script>
// import { ceshi } from '../../api/api';
export default {
    data(){
        return{
           id:this.$store.state.navTabs.tabId 
        }
        
    },
    toggle(){
        console.log(1);
    },
 

   
}
</script>