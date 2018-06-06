// <template>
    <section ref="abc" style="overflow-y: auto;">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addcodeInfos">添加</el-button>
        	<el-table :data="lists" id="messageTbale" :max-height="heights" border highlight-current-row v-loading="listLoading" style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"> 移除</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" :width="col.width" >
					<template slot-scope="scope">
							<el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]" type="textarea" ></el-input>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增短信模板" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->
				 <!-- <el-form-item label="模板代码：" prop="pendingSign" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.pendingSign" style="width:300px"></el-input>
				</el-form-item> -->
				<el-form-item label="模板名称：" prop="title" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.title" style="width:300px"></el-input>
				</el-form-item>				
				<el-form-item label="模板内容：" prop="template" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.template" style="width:300px" type="textarea"></el-input>
				</el-form-item>
				<!-- <el-form-item label="状态：" prop="state" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.state"style="width:300px" ></el-input>
				</el-form-item>
				<el-form-item label="分配规则：" prop="distributionId" :label-width="formLabelWidth">
					<el-select  v-model="AdduserForm.distributionId" placeholder="请选择" style="width:300px">
						<el-option v-for="rule in rules" :key="rule.id" :label="rule.name" :value="rule.id"></el-option>
					</el-select>
					
				</el-form-item>							 -->
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
    // import {delInfo } from "@/api/basedata";
    import { message_data,message_update,message_insert,message_delete,messageDialog} from "@/api/basedata";
    export default{
        data(){
            return{
				heights:0,
                total: 0,
				pagesize:10,
				page: 1,
                listLoading: false,	                
				lists:[],
				// rules:[],
				addUserInfos:false,
				formLabelWidth: '120px',
                cols:[
					// {title:'模板代码',field:'pendingSign',width:"90"},
                    {title:'模板名称',field:'title',width:"90"},            
                    {title:'模板内容',field:'template'},
                 
				],
				AdduserForm:{					
					title:"", 
					// pendingSign:"",
					template:"",								
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
				this.listLoading = true;
				message_data(para).then((res) => {					
                    let data=res.data.result;
					this.lists=data.data;
					this.lists = this.lists.map(v => {
					this.$set(v, 'edit', false)
					return v;
					
				});
                    this.total=data.recordsTotal;				
					this.listLoading = false;
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
				    message_delete(para).then(res =>{			
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
                  this.getlists();
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
				message_update(para).then(res =>{
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
				// getRules().then((res) => {
				// 	console.log(res)
                //     let data=res.data.result;
				// 	this.rules=data.data;					
                //     this.total=data.recordsTotal;				
				// });

			this.$refs['AdduserForm'].resetFields();
		},
		addcodeInfos(){
			this.addUserInfos=true;
		// 	getRules().then((res) => {				
        //             let data=res.data.result;
		// 			this.rules=data;			
        //             this.total=data.recordsTotal;				
		//     });
				
		},
		choice(AdduserForm){			
 			let para ={
				title:this.AdduserForm.title,
				// pendingSign:this.AdduserForm.pendingSign,
				template:this.AdduserForm.template,				
			};
            this.$refs[AdduserForm].validate((valid) => {			
                if(valid){					
                  message_insert(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
						"title":this.$refs['AdduserForm'].model.title,
						// "pendingSign":this.$refs['AdduserForm'].model.pendingSign,
                        "template":this.$refs['AdduserForm'].model.template,											                        
						},	
                        
                    );
                    this.getlists();
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
    #messageTbale.el-table .cell{white-space:normal}
</style>
 