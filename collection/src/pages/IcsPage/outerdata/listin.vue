<template>
<section>
	 <!--action="http://192.168.2.113:8081/os/actionCodeImport" type="post" enctype="multipart/form-data" target="targetIfr" -->
	<!-- <form action="http://10.50.130.26:8080/os/actionCodeImport" method="post" enctype="multipart/form-data" target="targetIfr" >
		<input type="file"   name="filename" id="">
		<input type="submit" value="上传" style="cursor:pointer">
		
	</form>
	<iframe name="targetIfr" style="display:none" ></iframe>  -->
	 
		 
	<div style="padding:10px 0;color:red"><span>提示:请按照导入模板格式上传文件</span></div>
	<el-upload
				class='ensure ensureButt'
				ref="uploadfile"
               :action="importFileUrl"
			   name="filename"
               :on-preview="handlePreview"
			   :on-change="handleChange"
			   :on-error="uploadError"
			   :data="upLoadDatas"
			   :on-success="uploadSuccess"
			   :before-upload="beforeUpload"
			   :on-progress="onprogress"
				:auto-upload="false"
				:file-list='filelist'	
				:multiple="true"
				:show-file-list="fileListStatue"
				style="display:inline-block"			
	>
			<el-button slot="trigger" size="small" type="primary" @click="chooseFile" style="padding:7px 9px">选取导入文件</el-button>
			<el-button style="margin-left: 10px; padding:7px 9px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			<el-button @click="uploadlist" type="primary" size="small" style="padding:7px 9px">模板下载</el-button>		
		</el-upload>
	<!-- <form >

	<input type="file" @change="getFile($event)"  name="filename"/>
	<el-button @click="submitForm($event)" type="primary" size="mini">上传</el-button>

	</form> -->
		
</section>
</template>
<script>
import {path} from '@/config'
//  import{Path} from "@/utils/path";
	export default{
		data(){
			return{
				//http://10.50.130.26:8080/os/actionCodeImport
				importFileUrl:"",
				file:'',
				listDownload:"",				
				filelist:[],
				upLoadDatas:{
					username:localStorage.getItem('userName'),					
				},
				fileListStatue:true,
				
			}
			
		},
		methods:{
		PathList(){
			console.log(path)
		// 	let obj=new	Path();
			this.importFileUrl=path.importPath;
			this.listDownload=path.listDownload;
		//  console.log(obj.importPath)
		},
			// getFile(event){
			// 	this.file=event.target.files[0];
			// 	console.log(this.file)
			// },
			// submitForm(event){
			// 	event.preventDefault();
			// 	let formData = new FormData();
			// 	formData.append("file",this.file)			
			// 	let config={
			// 		headers:{
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	}

			// 	this.$http.post('http://10.50.130.26:8080/os/actionCodeImport',formData, config).then(function(res){
			// 		console.log(res)
			// 	})
			// },

			uploadlist(){
				//"http://bdorange.gwmfc.com:1833/ics/os/downloadActionCode"
				window.open(this.listDownload)
			},
			chooseFile(){
		this.fileListStatue=true;
	},
		 // 上传成功后的回调
		submitUpload() {
			this.$refs.uploadfile.submit();			
			// console.log(this.$refs.upload);
		  },
		onprogress(event,file,fileList){
			// console.log(file)
			// console.log(file.raw)
			// console.log(file.response)
			// console.log(event);
		},
		handleRemove(file,fileList){
			// console.log(file,fileList)
		},
		handlePreview(file){
		},
		handleChange(file,fileList){						
			// console.log(file)
		},
		beforeUpload:function(file){
			const isLt2M = file.size / 1024 / 1024 < 100
		if (!isLt2M) {
			alert('上传模板大小不能超过 100MB!')
		}
		return isLt2M
			
		}, 
			// 上传错误
		uploadError (response, file, fileList) {
			this.$notify({
					type: 'error',
					message: '上传失败，请重试',
					duration:1000,
			});
		},
		uploadSuccess (response, file, fileList) {
			console.log(response)
			console.log(file.response)
			// if(!response.success){
			// 	console.log("123")
			// }else{
			// 	console.log("4565")
			// }
			if(response.success){
				this.$notify({
					message:response.message,
					type:'success',
					position:'top-left',
                   
				});
				  this.fileListStatue=false;
				  this.$refs.uploadfile.clearFiles()
			}else{
				this.$notify.error({
					message:response.message,					
					position:'top-left',                   
				});
			}			
		},
		},
		mounted() {
			this.PathList();
		}
	}
</script>
<style>
  /* .el-notification{left: 50%!important;} */
</style>
