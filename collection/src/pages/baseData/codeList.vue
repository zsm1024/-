<template>
    <section ref="abc" style="overflow-y: auto;">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addUserInfos = true">添加</el-button>
        	<el-table :data="lists" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"> 移除</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">
							<el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]" v-if="col.field!='isPromise'"></el-input>
							<span v-show="!scope.row.edit"   >{{ scope.row[col.field] }}</span>
							<el-select v-show="scope.row.edit" v-if="col.field=='isPromise'" v-model="scope.row[col.field]" placeholder="请选择活动区域">
								<el-option label="Y" value="Y"></el-option>
								<el-option label="N" value="N"></el-option>
							</el-select>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增代码" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->
				<el-form-item label="名称：" prop="actCode" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.actCode" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="注释：" prop="pendingSign" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.actNotes" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="类型：" prop="queueType" :label-width="formLabelWidth">
					<el-select  v-model="AdduserForm.isPromise" placeholder="请选择活动区域" style="width:300px">
						<el-option label="Y" value="Y"></el-option>
						<el-option label="N" value="N"></el-option>
					</el-select>
				</el-form-item>						
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addUserInfo">取 消</el-button>
 <!--       <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <el-button  type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
      </div>			
		</el-dialog>
		
    </section>
</template>
<script>
    import { delcodeInfo,updatecodeInfo,addcodeInfo,actionCode } from "@/api/basedata";
    export default{
        data(){
            return{
				heights:0,
                total: 0,
				pagesize:10,
				page: 1,
                listLoading: false,	                
				lists:[],
				addUserInfos:false,
				formLabelWidth: '120px',
                cols:[
                    {title:'名称',field:'actCode',width:"180"},
                    {title:'注释',field:'actNotes',width:"90"},
                    {title:'是否具有承诺金额属性',field:'isPromise',width:"70"},                  
				],
				AdduserForm:{					
					actCode:"", 
					actNotes:"",
					isPromise:"",								
			},
            }
        },
        methods:{
            handleSizeChange(val) {
				this.pagesize = val;
				this.getlists();
			},
            handleCurrentChange(val) {
				this.page = val;
				this.getlists();
			},
            getlists() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-120;
        		this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize
				};
				// this.listLoading = true;
				actionCode(para).then((res) => {
                    let data=res.data.result;
					this.lists=data.data;
					this.lists = this.lists.map(v => {
					this.$set(v, 'edit', false)
					return v;
					
				});
                    this.total=data.recordsTotal;				
					// this.listLoading = false;
				});
            },
            deleteRow(index, rows, datas) {
			    let para ={
				    id:rows.id,
			    }
			    this.$confirm('确定删除信息吗？','提示',{
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type:'warning'
			    }).then(() => {
				    delcodeInfo(para).then(res =>{
			
					    if(res.data.success){
						    datas.splice(index, 1);
						    this.$message({
							    type: 'success',
							    message: '删除成功！'
						    })
					    }else{
						    this.$message({
							    type: 'error',
							    message: '删除失败，请联系管理员！'
						    })
					    }
				    });
				
			    }).catch(() =>{
				    this.$message({
					    type: 'info',
					    message: '已取消删除'
				    });
			});			
        },
        Edit(row){
			let para = row;
			if(row.edit=!row.edit){
                return;
			}else{
				updatecodeInfo(para).then(res =>{
						if(res.data.success){
							this.$message({
								type: 'success',
								message: '编辑成功！'
							})
						}else{
							this.$message({
								type: 'error',
								message: '编辑失败，请联系管理员！'
							})
						}
				});
				
				
			}
			//row.edit=!row.edit;		
		},
		addUserInfo(){
			this.addUserInfos=false;
			this.$refs['AdduserForm'].resetFields();
		},
		choice(AdduserForm){			
 			let para ={
				actCode:this.AdduserForm.actCode,
				actNotes:this.AdduserForm.actNotes,
				isPromise:this.AdduserForm.isPromise,
	
			};
            this.$refs[AdduserForm].validate((valid) => {			
                if(valid){					
                  addcodeInfo(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
						"actCode":this.$refs['AdduserForm'].model.actCode,
						"actNotes":this.$refs['AdduserForm'].model.actNotes,
                        "isPromise":this.$refs['AdduserForm'].model.isPromise,
 						                         
						},	
                        
                    );
                    this.addUserInfos=false;
                    this.$refs['AdduserForm'].resetFields();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '添加失败，请联系管理员'
                        })
                        
                    }   		   		
                    })
                }else{   		
                    this.addUserInfos=true;
                    this.$refs.AdduserForm.validate((valid) => {
                        if (valid) {				
                        alert('submit!');
                        } else {
                            return false;
                        }
                    });
                } 
            });  	
		},
        },
        mounted() {
            this.getlists();
			let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.abc.style.height= h+"px"
		}
    }
</script>
<style>

</style>
 