<template>
    <section ref="abc" style="overflow-y: auto;">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addUserInfos=true ">添加</el-button>
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
							<el-input  v-show="scope.row.edit" size="small" v-model="scope.row[col.field]"></el-input>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增规则信息" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->
				<el-form-item label="名称：" prop="placeholder" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.placeholder" style="width:200px"></el-input>
				</el-form-item>
				<el-form-item label="数值：" prop="value" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.value" style="width:200px"></el-input>
				</el-form-item>	
				<el-form-item label="是否是固定值：" prop="isFixed" :label-width="formLabelWidth">
					<el-select  v-model="AdduserForm.isFixed" placeholder="请选择" style="width:200px">
						<el-option v-for="rule in fixedList" :key="rule.id" :label="rule.name" :value="rule.value"></el-option>
						<!-- <el-option label="N" value="N"></el-option> -->
					</el-select>
					<!-- <el-input v-model="AdduserForm.distribution"></el-input> -->
				</el-form-item>	
				<!-- <el-form-item label="是否是固定值：" prop="fixed" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.fixed"></el-input>
				</el-form-item>				 -->
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
    import { placeholder_data,delInfo$,updateInfo$,addInfo$ } from "@/api/basedata";
    export default{
        data(){
            return{
				total: 0,
				heights:0,
				pagesize:10,
				page: 1,
                listLoading: false,	                
				lists:[],
				fixedList:[{name:"否",value:0},{name:"是",value:1}],
				addUserInfos:false,
				 formLabelWidth: '120px',
                cols:[
                    {title:'名称',field:'placeholder',width:"180"},
					{title:'值',field:'value',width:"190"},
					{title:'是否是固定值',field:'isFixed',width:"190"},
                    {title:'创建时间',field:'createTime',width:"90"},
                    {title:'修改时间',field:'updateTime',width:"80"},
                    {title:'创建人',field:'createUser',width:"70"},
                    {title:'修改人',field:'updateUser',width:"70"},
				],
				AdduserForm:{					
					value:"",
					placeholder:"",
					isFixed:""
					// createTime:"",
					// updateTime:"",
					// createUser:"",
					// updateUser:"",			
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
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-240;
        		this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize
				};
				this.listLoading = true;
				placeholder_data(para).then((res) => {					
					//  console.log(res.data.result.fixed)
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
				    delInfo$(para).then(res =>{			
					    if(res.data.success){
						    datas.splice(index, 1);
						    this.$message({
							    type: 'success',
							    message: '删除成功！'
							})
						this.getlists();
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
				updateInfo$(para).then(res =>{
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
				value:this.AdduserForm.value,
				placeholder:this.AdduserForm.placeholder,
				isFixed:this.AdduserForm.isFixed
				// type:this.AdduserForm.type,
				// endDate:this.AdduserForm.endDate,
				// vision:this.AdduserForm.vision,				
			};
            this.$refs[AdduserForm].validate((valid) => {
                if(valid){
                   addInfo$(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
							"value":this.$refs['AdduserForm'].model.value,
							"placeholder":this.$refs['AdduserForm'].model.placeholder,
							"isFixed":this.$refs['AdduserForm'].model.isFixed                      	                         
						},	
                        
					);
					console.log(this.lists)
                    this.addUserInfos=false;
					this.$refs['AdduserForm'].resetFields();
					this.getlists();
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
 