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
				<el-form-item label="区域代码:" prop="areaCode" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaCode" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="描述:" prop="areaDistribution" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaDistribution" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="名字" prop="areaName" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.areaName" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="state" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.state" style="width:300px" ></el-input>
				</el-form-item>
				<!-- <el-form-item label="分配规则：" prop="distributionId" :label-width="formLabelWidth">
					<el-select  v-model="AdduserForm.distributionId" placeholder="请选择" style="width:300px">
						<el-option v-for="rule in rules" :key="rule.id" :label="rule.name" :value="rule.id"></el-option>
						<!-- <el-option label="N" value="N"></el-option> -->
					<!-- </el-select> -->
					<!-- <el-input v-model="AdduserForm.distribution"></el-input> -->
				<!-- </el-form-item>				 -->
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
    // import { base_menue,delInfo,updateInfo,add_info,getRules } from "@/api/basedata";
     import { areaInfo,addAre_info,delAreaInfo,updateAreaInfo,addAreaInfo} from "@/api/basedata";
    export default{
        data(){
            return{
				heights:0,
                total: 0,
				pagesize:10,
				page: 1,
                listLoading: false,	                
				lists:[],
				rules:[],
				addUserInfos:false,
				formLabelWidth: '120px',
                cols:[
                    { title: "区域代码", field: "areaCode" },
                    { title: "描述", field: "areaDistribution" },
                    { title: "名字", field: "areaName" },
                    { title: "状态", field: "state" }
				],
				AdduserForm:{					
					areaCode:"", 
					areaDistribution:"",
					areaName:"",
					state:""			
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
				areaInfo(para).then((res) => {
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
				    delAreaInfo(para).then(res =>{
			
					    if(res.data.success){
						    datas.splice(index, 1);
						    this.$message({
							    type: 'success',
							    message: '删除成功！'
							})
							this.getlists()
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
				updateAreaInfo(para).then(res =>{
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
			// getRules().then((res) => {				
            //         let data=res.data.result;
			// 		this.rules=data;			
            //         this.total=data.recordsTotal;				
			// 	});
				
		},
		choice(AdduserForm){			
 			let para ={
				areaCode:this.AdduserForm.areaCode,
				areaDistribution:this.AdduserForm.areaDistribution,
				state:this.AdduserForm.state,
				areaName:this.AdduserForm.areaName,	
			};
            this.$refs[AdduserForm].validate((valid) => {			
                if(valid){					
                  addAre_info(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
						"areaCode":this.$refs['AdduserForm'].model.areaCode,
						"areaDistribution":this.$refs['AdduserForm'].model.areaDistribution,
						"state":this.$refs['AdduserForm'].model.state,
						"areaName":this.$refs['AdduserForm'].model.areaName, 						                         
						},	
                        
                    );
                     this.addUserInfos=false;
					this.$refs['AdduserForm'].resetFields();
					 this.getlists()
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
 