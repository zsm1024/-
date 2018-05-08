<template>
   <section>

        <el-row>
            <el-col :span="24">
                <div class="bottom10">
                    <el-button type="primary" size="small" @click="addBtnPost">添加岗位</el-button>
                    <el-button type="warning" size="small" @click="editBtnPost">编辑岗位</el-button>
                    <el-button type="danger" size="small" @click="delBtnPost">删除岗位</el-button>
                </div>
               
            </el-col>
        </el-row>
      <el-row type="flex"> 
            <el-col :span="4">
                <el-tree 
                :data="treedata" 
                node-key="id" 
                default-expand-all 
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                highlight-current
                >

                </el-tree>
            </el-col>
            <el-col :span="1">
            </el-col>
            <el-col :span="19">
                        <!--列表-->
                <el-table :data="lists"  highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe> 
                    <el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" >
                    </el-table-column>
                </el-table>
                <el-col :span="20" class="toolbar">			
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"  style="float:right;">
                    </el-pagination>
                </el-col>
            </el-col>
      </el-row>
         

<el-dialog :before-close="handleClose" title="添加岗位" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
    <el-form-item :label="postLabel" :label-width="formLabelWidth">
       <el-tree 
            :data="treedata" 
            node-key="id" 
            show-checkbox
            default-expand-all 
            check-strictly
            ref="tree"
        >
        </el-tree>

    </el-form-item>
    <el-form-item label="岗位名称" prop="position" :label-width="formLabelWidth">
      <el-input v-model="ruleForm.position" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="岗位备注" prop="other" :label-width="formLabelWidth">
      <el-input v-model="ruleForm.other" type="textarea" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="addToPosts('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
     
        
   </section>
</template>

<script>
import { getAuthUser,getAuthtree,addPost,getPost,editPost,deletePost } from "@/api/auth";
    export default {
        data() {
            return {
                id:'',
                name:'',
                treedata:[],
                lists: [],
                cols: [
                    {title:'用户名',field:'username'},
                    {title:'职位',field:'position'},
                    {title:'电话',field:'phone'},
                   
                ],
                total: 0,
                page: 1,
                
                pagesize:10,
                listLoading: false,
                toEdit:false,
                ruleForm:{
                    position:'',
                    other:'',
                },

                parentId:'',
                postLabel:"岗位所属",
                dialogFormVisible:false,
                formLabelWidth: '120px',
                rules: {
                    position:[
                         { required: true, message: '请输入岗位名称', trigger: 'blur' }
                    ],
                    other:[
                         { required: true, message: '请输入岗位备注', trigger: 'blur' }
                    ]
                }
            }
        },
        
    methods: {
        handleClose(done){
            this.$refs.tree.setCheckedKeys([])
            this.$refs['ruleForm'].resetFields();
            this.dialogFormVisible=false;
            done();
        },
        cancel(ruleForm){
            this.$refs.tree.setCheckedKeys([])
            this.$refs['ruleForm'].resetFields();
            this.dialogFormVisible=false;
        },
        addBtnPost(){
            this.dialogFormVisible=true;
            this.postLabel = "岗位所属"
            this.toEdit=false
            this.parentId=''
        },
        delBtnPost(){
            if(this.id==""){
                this.$message({
                    type: 'error',
                    message: '请先选择岗位删除'
                })
               return false;
            }
        let para ={
                id:this.id
            }
        this.$confirm('确定删除'+this.name+'岗位吗？','提示',{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type:'warning'
        }).then(() => {
            deletePost(para).then(res =>{
                
                if(res.data.success){
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                     this.getTree();
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
        editBtnPost(){
           
            if(this.id==""){
                this.$message({
                    type: 'error',
                    message: '请先选择岗位编辑'
                })
               return false;
            }

             this.dialogFormVisible=true;
             let para ={
                id:this.id,
            }
             getPost(para).then(res =>{
               
                 this.ruleForm.other = res.data.other
                 this.ruleForm.position = res.data.position
                 this.$refs.tree.setCheckedKeys([res.data.id])
                 this.parentId = res.data.parentId
                 this.postLabel = "当前岗位"
                 this.toEdit=true
             })
        },
        addToPosts(ruleForm){
            if(this.$refs.tree.getCheckedNodes()==''){
                this.$message({
                    type: 'error',
                    message: '请选择岗位所属'
                })
               return false;
            }
      
            this.$refs[ruleForm].validate((valid) => {
                if(valid){
                    if(this.toEdit){
                         let para ={
                            id:this.$refs.tree.getCheckedNodes()[0].id,
                            parentId:this.parentId,
                            position:this.ruleForm.position,
                            other:this.ruleForm.other,
                        }
                        editPost(para).then(res =>{
                            if(res.data.success){
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功！'
                                });
                                this.dialogFormVisible=false;
                                this.$refs['ruleForm'].resetFields();
                                this.getTree();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '编辑失败，请联系管理员'
                                })
                                
                            }
                        })
                    }else{
                         let para ={
                            parentId:this.$refs.tree.getCheckedNodes()[0].id,
                            position:this.ruleForm.position,
                            other:this.ruleForm.other,
                        }
                        addPost(para).then(res =>{
                            if(res.data.success){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功！'
                                });
                                this.dialogFormVisible=false;
                                this.$refs['ruleForm'].resetFields();
                                this.getTree();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '添加失败，请联系管理员'
                                })
                                
                            }
                        })
                    }
                    
                }
            });
           
        },
        handleNodeClick(data){
            this.id = data.id;
           
            this.name = data.label
            this.getlists();
           
        },
        handleSizeChange(val) {
            this.pagesize = val;
             this.getlists();
        },
        handleCurrentChange(val) {
            this.page = val;
             this.getlists();
        },
       

        getTree(){
            getAuthtree().then(res => {
                this.treedata = res.data.result;
            })
        },
        getlists() {
            let para = {
                page: this.page,
                pageSize: this.pagesize,
                position:this.id
            };
            this.listLoading = true;
            getAuthUser(para).then(res => {
               
                 this.total = res.data.result.recordsTotal;
        
                 this.lists = res.data.result.data;
                this.cols = this.cols;
                this.listLoading = false;

            });
        }
    },
    mounted() {
        this.getTree();
    }
    }
</script>

<style scoped>
.treeleft{
    width: 15%;
    float: left;
}
.treeright{
    width:80%;
    float: right;
}
</style>