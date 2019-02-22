<template>
  <div id="index">
    <img
      class="bcImg"
      v-for="src in images"
      v-lazy="src.url"
      :key="src.code"
      width="100"
      height="100"
      style="cursor: pointer;margin:0 2px"
    >
  </div>
</template>
<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { getACSDataMirror } from "@/api/basedata";
export default {
  name: "Viewer",
  data() {
    return {
      images: [],
      appNums:this.$route.params.id
    };
  },
  methods: {
    ImgPreview() {
      const ViewerDom = document.getElementById("index");
      const viewer = new Viewer(ViewerDom, {
        zIndex: 9999
      });
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
  mounted() {
    this.ImgPreview();
  }
};
</script>
<style>
.bcImg {
  background-image: url("../../../../assets/wait.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>




