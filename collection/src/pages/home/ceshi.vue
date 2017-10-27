<template>
    <div>
       {{id}}{{datatitle}}
    </div>
</template>
<script>
import { getstation} from '../../api/api';
export default {
    data(){
        return{
           id:this.$store.state.navTabs.tabId ,

           datatitle:''
        }
        
    },
   
 
		methods: {

			//获取用户列表
			getUsers() {
				let para = {
					id:this.$store.state.navTabs.tabId 
			
				};
				
				//NProgress.start();
				getstation(para).then((res) => {
					this.datatitle = res.data.station;
					
				});
			}		
		},
		mounted() {
			this.getUsers();
	
		}
}
</script>