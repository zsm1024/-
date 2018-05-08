<template>
    <section ref="abc" style="overflow-y: auto;">
		<el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;"   @click="addcodeInfos">添加</el-button>
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
							<el-input  v-show="scope.row.edit" size="small" v-if="col.field!='personChargeName'" v-model="scope.row[col.field]"></el-input>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>							
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增信息" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->				
				<el-form-item label="Type：" prop="type" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.type" style="width:300px"></el-input>
				</el-form-item>	
				<el-form-item label="key：" prop="key" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.key" style="width:300px"></el-input>
				</el-form-item>	
				<el-form-item label="名称：" prop="val" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.val" style="width:300px"></el-input>
				</el-form-item>					
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="addUserInfo">取 消</el-button>
        <el-button  type="primary" @click.native.prevent="choice('AdduserForm')">确 定</el-button>
      </div>			
		</el-dialog>
		
    </section>
</template>
<script>
    // import { base_menue,delInfo,updateInfo,add_info,getRules,queueInfos } from "@/api/basedata";
    import { dictslist,dictsinsert,dictsdelete,dictsupdate } from "@/api/basedata";
    export default{
        data(){
            return{
				heights:0,
                total: 0,
				pagesize:20,
				page: 1,
                listLoading: false,	                
				lists:[],
				rules:[],
				userList:[],
				addUserInfos:false,
				formLabelWidth: '120px',
                cols:[
					{title:'ID',field:'id',width:"90"},
					{title:'Type',field:'type',width:"70"},
					{title:'Key',field:'k',width:"70"},
					{title:'名称',field:'val',width:"180"},					                   
                    {title:'创建时间',field:'createTime',width:"70"},
                    {title:'修改时间',field:'updateTime',width:"70"},                  
				],
				AdduserForm:{					
					val:"", 
					type:"",
					key:""							
			},
			stateCode:"",
			 areaEditId:""
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
			getMessages2(val) {
				let a=val.personChargeName;
				this.stateCode=a
				// let b=val.areaId
				// this.areaEditId=b
    		},
            getlists() {
				let h=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-120;
        		this.heights=h;
				let para = {
					page: this.page,
					pageSize: this.pagesize
				};
				this.listLoading = true;
				dictslist(para).then((res) => {
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
                console.log(datas)
			    this.$confirm('确定删除信息吗？','提示',{
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type:'warning'
			    }).then(() => {
				    dictsdelete(para).then(res =>{
			console.log(res)
					    if(res.data.success){
						    datas.splice(index, 1);
						    this.$message({
							    type: 'success',
							    message: '删除成功！'
							});
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
			
			if(row.edit=!row.edit){
                return;
			}else{
					let para = row;
					dictsupdate(para).then(res =>{
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
						this.getlists();
				});
				
				}	
			},
			//row.edit=!row.edit;		

		addUserInfo(){
			this.addUserInfos=false;
			this.$refs['AdduserForm'].resetFields();
		},
		addcodeInfos(){
			this.addUserInfos=true;		
		},
		choice(AdduserForm){			
 			let para ={
				val:this.AdduserForm.val,
				type:this.AdduserForm.type,
				k:this.AdduserForm.key				
			};
            this.$refs[AdduserForm].validate((valid) => {			
                if(valid){					
                  dictsinsert(para).then(res =>{
                      console.log(res)
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
						"val":this.$refs['AdduserForm'].model.val,
						"type":this.$refs['AdduserForm'].model.type,
						"k":this.$refs['AdduserForm'].model.key											                         
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
			// this.getTaskUser()
			let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.abc.style.height= h+"px"
		}
    }
</script>
<style>

</style>
 