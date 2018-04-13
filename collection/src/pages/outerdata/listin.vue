<template>
<section>
	 <!--action="http://192.168.2.113:8081/os/actionCodeImport" type="post" enctype="multipart/form-data" target="targetIfr" -->
	<form >
		<input type="file"  ref="file" name="filename" id="">
		<input type="submit" value="上传">
	</form>
	<iframe name="targetIfr" ></iframe> 
  	<!-- <el-upload
				class='ensure ensureButt'
				ref="upload"
               :action="importFileUrl"
			   :on-error="uploadError"
			   :on-success="uploadSuccess"
				:auto-upload="false"
				:multiple="true"
                name="filename"		
				> -->
				<!--:show-file-list="fileListStatue" :data="upLoadData"  -->
				<!-- <el-select  placeholder="请选择" style="width:300px;" id="selectMes">
					<el-option :key="index" :label="item.label" :value="item.value" ></el-option>
				</el-select> -->
				<!-- <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
				<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
	<!-- </el-upload> -->
<!-- <el-select v-model="addUser.positionId" placeholder="" multiple >
  <el-option v-for="item in treedata" :key="item.value" :label="item.position" :value="item.id" ></el-option>
</el-select> -->
</section>

</template>
<script >
// import {sysPositionslistAll} from "@/api/auth"
export default {
   data(){
       return{
		   treedata:[],
        addUser:{
            username:'',
            nickname:'',
            password:'',
            phone:'',
            roleIds:[],
            positionId:[],
        },
		  
           filename:"filename",
           fileListStatue:true,
           importFileUrl:"http://192.168.2.113:8081/os/actionCodeImport",
				filelist:[],
				upLoadData:{
					icsId:this.$route.params.id,	
					username:localStorage.getItem("userName")				
				}
       }
   },
   methods:{
	//     getTree(){
       
    //     sysPositionslistAll().then(res => {
    //         this.treedata = res.data.result;
    //         console.log(this.treedata)
    //     })
    // },
	   upla(){
		   let para=this.$refs.file.files;
		   console.log(para)
		   this.$http({
			   url:"http://192.168.2.113:8081/os/actionCodeImport",
			   method:"POST",
			   data:para,
			   headers:{
				 'X-Requested-With': "XMLHttpRequest"	}		
		   }).then(function(res){
			   this.posts=res.data
			  
		   },function(error){
			   console.log("123")
		   })

		   
	   },
	//    subList(){
	// 	console.log(this.$refs.file.files) ;
	// 	let para=this.$refs.file.files;
	// 	submits(para).then(res=>{
	// 		console.log(res)
	// 	})
	//    },
       //文件上传部分
	// chooseFile(){
	// 	this.fileListStatue=true;
	// },
	// 	 // 上传成功后的回调
		// submitUpload() {
		// 	this.$refs.upload.submit();			
			// console.log(this.$refs.upload);
		//   },
	// 	handleRemove(file,fileList){
	// 		// console.log(file,fileList)
	// 	},
	// 	handlePreview(file){
	// 		//  console.log(file)
	// 	},
	// 	handleChange(file,fileList){			
	// 		console.log(this.fileListStatue)
	// 		console.log(file)
	// 	},
	// 	beforeUpload:function(file){
	// 		const isLt2M = file.size / 1024 / 1024 < 100
	// 	if (!isLt2M) {
	// 		alert('上传模板大小不能超过 100MB!')
	// 	}
	// 	return isLt2M
			
	// 	}, 
			// 上传错误
		// 	uploadError (err, file, fileList) {
		// 		this.$message.error(err)
		// 	console.log('上传失败，请重试！')
		// },
		// uploadError (response, file, fileList) {

		// 	console.log('上传失败，请重试！')
		// },
		// uploadSuccess (response, file, fileList) {
		// 	// 
		// 	console.log('上传文件', response)
		// 	console.log(file)
		// 	console.log(fileList)
			// if(response.success==true){
			// 	this.$message({
            //         type:'success',
            //         message:'上传成功！',
			// 	});

			// 	  this.$refs.upload.clearFiles()
			// }else{
			// 	this.$message({
            //         type:'danger',
            //         message:'上传失败！',
			// 	});
		// 	// }			
		// },
   },
//    mounted() {
//     this.getTree();
//   }
}
</script>
