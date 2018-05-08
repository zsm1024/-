<template>
	<section>
        <el-row>
           <div class="bottom10">
                <el-button size="mini" @click="addBtn" type="primary">添加</el-button>
           </div>
          
        </el-row>

		<!--列表-->
		<el-table :data="lists" highlight-current-row v-loading="listLoading"  style="width: 100%;" stripe>
			
            <el-table-column label="操作"  align="center" >
                <template  slot-scope="scope">
                    <el-button size="mini" @click="editBtn(scope.row.id)" type="info">编辑</el-button>
                    <el-button size="mini" @click="delBtn(scope.row.id,scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
			<el-table-column :prop="col.field" align="center" :label="col.title" v-for="(col, index) in cols" :key="index" >
			</el-table-column>    
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">			
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pagesize" :page-sizes="[10, 20, 50, 100]"   :total="total"   style="float:right;">
			</el-pagination>
		</el-col>

<el-dialog :before-close="handleClose" :title="title" :visible.sync="dialogFormVisible">
  <el-form  :model="form" ref="form" :rules="form">
    
    <el-form-item label="名称" :label-width="formLabelWidth">
       <el-input v-model="form.name" auto-complete="off" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="描述"  :label-width="formLabelWidth">
       <el-input v-model="form.description" auto-complete="off" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="权限" label-width="60px">
       <el-tree 
                :data="treedata" 
                node-key="id" 
                show-checkbox
                check-strictly 
                :expand-on-click-node="false"
                highlight-current
                ref="tree"
                accordion
                style="width:400px;height:260px;overflow:auto"
                >

        </el-tree>
    </el-form-item>
   
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelBtn('form')">取 消</el-button>
    <el-button type="primary" @click="addSubBtn('form')">确 定</el-button>
  </div>
</el-dialog>	
		
	</section>
</template>

<script>
//import NProgress from 'nprogress'
import { getPermissions,roleslist,rolesinsert,rolesfind,rolesDelete } from "@/api/auth";

export default {
  data() {
    return {
        treedata:[],
        lists: [],
        cols: [
                {title:'id',field:'id'},
                {title:'角色',field:'name'},
                {title:'描述',field:'description'},
            
                
        ],
        id:'',
        total: 0,
        page: 1,
        pagesize: 10,
        toEdit: false,
        listLoading: false,
        title:'添加角色',
         formLabelWidth:'60px',
        formLabelWidthrole:'100px',
        dialogFormVisible:false,
        form: {
            name:'',
            description:'',
            permissionIds:[],
           
        },
    };
  },

  methods: {
    handleClose(done){
      this.$refs.tree.setCheckedKeys([])
       this.form.name='';
       this.form.description='';
       this.form.permissionIds='';
        done();
    },
    addSubBtn(form){
        if(this.$refs.tree.getCheckedNodes()==''){
            this.$message({
                type: 'error',
                message: '请选择权限'
            })
            return false;
        }
        var ids = this.$refs.tree.getCheckedKeys();
       
        let para = {
            name: this.form.name,
            description:this.form.description,
            permissionIds:ids,
            id:this.id,
        }
         if(this.toEdit){
            rolesinsert(para).then(res =>{
                if(res.data.success){
                    this.$message({
                        type: 'success',
                        message: '编辑成功！'
                    });
                    this.dialogFormVisible=false;
                    this.$refs['form'].resetFields();
                    this.getlists();
                }else{
                    this.$message({
                        type: 'error',
                        message: '编辑失败，请联系管理员'
                    })
                    
                }
                
            })
         }else{
            rolesinsert(para).then(res => {
                if(res.data.success){
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    });
                    this.$refs['form'].resetFields();
                    this.dialogFormVisible=false;
                    this.getlists();
                }else{
                    this.$message({
                        type: 'error',
                        message: '添加失败，请联系管理员'
                    })
                    
                }
            });
         }
        
    },
    addBtn(){
        
        this.id='',
        this.title= "添加角色"
       this.toEdit = false;
       this.dialogFormVisible = true;
       this.gettoPermissions()
    },
    editBtn(id){
        this.id = id;
        this.title= "编辑角色"
        this.toEdit = true;
        this.dialogFormVisible = true;
        let para = {
            id:id
        }
        this.gettoPermissions()
        rolesfind(para).then(res => {
            this.form.name = res.data.result.name
            this.form.description = res.data.result.description
            this.$refs.tree.setCheckedKeys( res.data.result.permissionIds)
           
       });
    },
    delBtn(id,data){
        let para ={
                id:data.id
            }
        this.$confirm('确定删除'+data.name+'角色吗？','提示',{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type:'warning'
        }).then(() => {
           rolesDelete(para).then(res =>{
               
                if(res.data.success){
                    
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
    cancelBtn(){
        this.dialogFormVisible=false;
        this.$refs['form'].resetFields();
    },
    gettoPermissions(){
        getPermissions().then(res => {
             this.treedata = res.data.result;
       });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlists();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlists();
    },
    //获取列表
    getlists() {
      let para = {
        page: this.page,
      
        pageSize: this.pagesize
      };
      this.listLoading = true;
      //NProgress.start();
      roleslist(para).then(res => {
        this.total = res.data.result.recordsTotal;
        this.lists = res.data.result.data;
        this.cols = this.cols;
        this.listLoading = false;
        //NProgress.done();
      });
    },

    
  },
  mounted() {
    this.getlists();
  }
};
</script>

<style >

</style>