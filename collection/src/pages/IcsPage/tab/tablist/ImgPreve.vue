<template>
    <section>
    <viewer :images="images">
      <img v-for="src in images" :src="src.url" :key="src.code" width="100" height="100" style="cursor: pointer;margin:0 2px">
    </viewer>
    </section>
    
</template>
<script>
import { getACSDataMirror } from "@/api/basedata";
export default ({
    data(){
        return{
        images:[],
        appNums:this.$route.params.id
        }
       
    },
methods:{       
    ImgPreview(){
        console.log(this.$route)
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



