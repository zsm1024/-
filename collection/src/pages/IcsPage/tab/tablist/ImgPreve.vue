<template>
    <section>      
    <viewer v-if="images.length>0"  :images="images">
      <img class="bcImg" v-for="src in images" v-lazy="src.url" :key="src.code" width="100" height="100" style="cursor: pointer;margin:0 2px">
    </viewer>
    </section> 
</template>
<script>
import { getACSDataMirror } from "@/api/basedata";
export default ({
    data(){
        return{
        images:[],
        // <img v-for="src in images" :src="src.url" :key="src.code" width="100" height="100" style="cursor: pointer;margin:0 2px">
        appNums:this.$route.params.id
        }
       
    },
methods:{       
    ImgPreview(){
                let para = {
                    appNum:this.appNums
                }
                getACSDataMirror(para).then(res =>{ 
                if(res.data.success){               
                    this.images=res.data.result
                }else{
                    this.$message({
                    type: "error",
                    message:res.data.message,
                    });
                }
                })
            }
},
mounted(){
     this.ImgPreview()
}
})
</script>
<style>
    .bcImg{background-image: url("../../../../assets/wait.gif");background-repeat:no-repeat;background-size: 100% 100%}
</style>




