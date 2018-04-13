<template>
    <section>
       <el-form :model="filters" ref="AdduserForm" inline>
        <el-form-item label="省-市选择:" id="city_pre" >
          <el-select v-model="filters.areaCode" placeholder="请选择省" @change="getMessage" clearable >
            <el-option v-for="item in options" :key="item.value" :label="item.stateNme" :value="item.stateCde"></el-option>
          </el-select>
          <el-select v-model="filters.stateCode" placeholder="请选择市" @change="getMessages" clearable>
            <el-option v-for="item in options1" :key="item.cityCde" :label="item.cityNme" :value="item.cityCde"></el-option>
          </el-select>
		</el-form-item>
         <el-form-item> 
            <el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;padding:10px 15px" @click="getList"  >查询</el-button>
            <el-button class="filter-item"   type="primary"  size="mini" style="margin: 0 0 10px 10px;padding:10px 15px" @click="addUserInfo"  >添加</el-button>
           
         </el-form-item>
       </el-form>
       <!--  :max-height="heights" v-loading="listLoading" -->
     
        	 <el-table :data="lists" border highlight-current-row style="width: 100%;" stripe >
                <el-table-column label="操作"  align="center" width="100"> 
						<!-- width="95" -->
						 <template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini"  @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button>
							<el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"> 移除</el-button>
						</template>
				</el-table-column>
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" :key="index" align="center" >
					<template slot-scope="scope">
							<!-- <el-input  v-show="scope.row.edit" size="small"  v-if="col.field=='username'" v-model="scope.row[col.field]"></el-input>  -->
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
                            <span v-show="scope.row.edit" v-if="col.field!='username'" >{{ scope.row[col.field] }}</span>						<el-select  v-show="scope.row.edit" v-if="col.field=='username'" v-model="EditUsername" placeholder="请选择" @change="getMessages3">
                                <el-option v-for="item in options3" :key="item.id" :label="item.username" :value="item.userId"></el-option>
                            </el-select>		
						</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">				
				<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[20, 50, 100]"   :total="total"   style="float:right;">
				</el-pagination>
			</el-col>
            <el-dialog title="新增规则信息" :visible.sync="addUserInfos" >
			<el-form :model="AdduserForm" ref="AdduserForm">
				 <!-- :rules="phonerules" -->
                 <el-form-item label="省" prop="stateNme" :label-width="formLabelWidth">
                    <el-select v-model="AdduserForm.stateNme" placeholder="请选择" @change="getMessagesPro" style="width:300px" >
                        <el-option v-for="item in options" :key="item.value" :label="item.stateNme" :value="item.stateCde"></el-option>
                    </el-select>
					<!-- <el-input v-model="AdduserForm.userId" style="width:300px"></el-input> -->
				</el-form-item>
                <el-form-item label="市" prop="cityNme" :label-width="formLabelWidth">
                    <el-select v-model="AdduserForm.cityNme" placeholder="请选择市" @change="getMessagesCity" style="width:300px" >
                        <el-option v-for="item in optionsDil" :key="item.cityCde" :label="item.cityNme" :value="item.cityCde"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item label="用户名称" prop="username" :label-width="formLabelWidth">
                    <el-select v-model="AdduserForm.username" placeholder="请选择" @change="getMessages2" style="width:300px" >
                        <el-option v-for="item in options2" :key="item.id" :label="item.username" :value="item.userId"></el-option>
                    </el-select>
					<!-- <el-input v-model="AdduserForm.userId" style="width:300px"></el-input> -->
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
import { listAllState, CityList,personList,userCityUpdate,userCityInsert,deluserCity,personListAll,personLists,listOnTheSpot} from "@/api/basedata";
export default {
  data() {
    return {               
      options2: [],
      options3: [],
      EditUsername:"",
      props: {},
      options: [],
      options1: [],
      optionsDil:[],
      filters: {
        areaCode: "",
        stateCode: ""
      },
      AdduserForm:{					
		stateNme:"", 
        cityNme:"",	
        username:""	,
	  },
      total: 0,
	  pagesize:20,
      page: 1,
      pro_are:"",
      cols: [
        { title: "省", field: "stateNme" },
        { title: "市", field: "cityNme" },
        { title: "岗位名称", field: "position" },
        { title: "用户名称", field: "username" },    
      ],
      lists:[],
      addUserInfos:false,
	  formLabelWidth: '120px',
    };
  },
  methods: {
    ItemChange(val) {
    },
    getCityList() {
     
      listAllState().then(res => {
        this.options=[]
        let data = res.data.result;
        this.options = data;  
      });
    },
    getMessage(val) {
      this.filters.areaCode = val;
      let para={
        stateCde:this.filters.areaCode
        };
         CityList(para).then(res => {
            this.filters.cityNme="";
            this.options1=[];
            let data = res.data.result;
            this.options1 = data; 
        });
       
    },
    getMessages(val) {
      this.filters.stateCode = val;
    //  this.getUser();
    //  this.getAllList()
    },
    getMessagesPro(val) {
      this.AdduserForm.stateNme = val;
      let para={
            stateCde:this.AdduserForm.stateNme
        };
         CityList(para).then(res => {
         this.AdduserForm.cityNme="";
            this.optionsDil=[];
            let data = res.data.result;
            this.optionsDil = data; 
        });
       
    },
    getMessagesCity(val) {
      this.AdduserForm.cityNme = val;
    //   this.getUser();
    //this.getAllList()
    },
    getMessages2(val) {
      this.AdduserForm.username = val;
    },
     getMessages3(val) {
      this.EditUsername = val;
      console.log(this.EditUsername)
    },
     handleSizeChange(val) {
      this.pagesize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList()
    },
    addUserInfo(){
        this.addUserInfos=true;
         
        this.getCityList();
		this.$refs['AdduserForm'].resetFields();
	},
    codeInfos(){
        if(this.filters.stateCode==""&&this.filters.cityCde==""){
            this.$message({
				type: 'error',
				message: '请先选择省市区域！'
			})
        }else{
            // this.addUserInfos=true;	
             this.getList()
        }
			
	},
     Edit(row){
         let a=row.userId;
         if(this.EditUsername!=""){
             row.userId=this.EditUsername;           
         }else{
            row.userId=a;
         }
            let para = row;
            console.log(para)
			if(row.edit=!row.edit){
                return;
			}else{
				userCityUpdate(para).then(res =>{
						if(res.data.success){
							this.$message({
								type: 'success',
								message: '编辑成功！'
                            });
                             this.getList()
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
          deleteRow(index, rows, datas) {
			    let para ={
				    id:rows.id,
			    }
			    this.$confirm('确定删除信息吗？','提示',{
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type:'warning'
			    }).then(() => {
				    deluserCity(para).then(res =>{
			
					    if(res.data.success){
						    datas.splice(index, 1);
						    this.$message({
							    type: 'success',
							    message: '删除成功！'
							})
							this.getCityList()
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
        choice(AdduserForm){			
 			let para ={
               cityCde:this.AdduserForm.cityNme,
               userId:this.AdduserForm.username
            };
            this.$refs[AdduserForm].validate((valid) => {			
                if(valid){					
                  userCityInsert(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
                        "cityCde":this.$refs['AdduserForm'].model.cityNme,
                         "userId":this.$refs['AdduserForm'].model.stateCode				                         
						},	
                        
                    );
                     this.addUserInfos=false;
					this.$refs['AdduserForm'].resetFields();
					this.getList()
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
        //获取所有用户信息
        getAllList(){
            let para={
                cityCde:this.AdduserForm.stateCode, 
            }
            if(para.cityCde==""){
               return false;
            }else{
               
            personListAll(para).then(res=>{   
                let data=res.data;
                // this.options2=data
            }) 
            }
            
        },
        getList(){
            let para = {
				 page: this.page,
		        pageSize: this.pagesize,
                cityCde:this.filters.stateCode,
                stateCde:this.filters.areaCode
            };
            personLists(para).then(res=>{
               let data=res.data.result;
            this.lists=data.data;
          	this.lists = this.lists.map(v => {
			this.$set(v, 'edit', false)
			return v;					
            });  
             this.total=data.recordsTotal;	
            })
        },
        getUser(){
            listOnTheSpot().then(res=>{
                let data=res.data.result;
              this.options2=data ;
              this.options3=data 
            })
            // let para={
            //     page:this.page,
            //     pageSize:this.pagesize,
            //     cityCde:this.AdduserForm.stateCode
            // }
            // personList(para).then(res=>{
            //     let data=res.data.result;
            //     this.options2=data.data 
            //     console.log(res) ;         
            // })
        }
  },
  mounted() {
    this.getCityList();
    this.getList();
    this.getUser()   
  }
};
</script>
<style>
    #city_pre .el-input{height:32px!important}


</style>

