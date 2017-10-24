<template>
    <div>
       123<p v-for="item in items" :key="item.id">{{item.name}}</p> 
    </div>
</template>
<script>
import { ceshi } from '../../api/api';
export default {
    data(){
        return{
           items:[] 
        }
        
    },
    
    methods:{
        getCeshi(){
               ceshi().then((res)=>{
                   let data=res.data.msg;
                   this.items=data;
                   console.log(this.items)
               }) 
        }
    },
    mounted() {
			this.getCeshi();
		}
}
</script>
