<template>
    <section>
        <el-row>
            <div class="bottom10" >
                <el-button size="mini" @click="addMenuBtn" type="primary">添加</el-button>
           </div>
        </el-row>
        <tree-grid 
            :items='data' 
            :columns='columns'
            @on-row-click='rowClick'
            @on-selection-change='selectionClick'
            @on-sort-change='sortClick'
        ></tree-grid>


<el-dialog :before-close="handleClose" :title="title" :visible.sync="dialogFormVisible">
  <el-form  :model="form" ref="form" :rules="form">
    <el-form-item label="上级菜单" :label-width="formLabelWidth">     
        <el-select v-model="form.parentId" placeholder="请选择"  style="width:300px">              
                <el-option 
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"    
                >
                </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="名称"  :label-width="formLabelWidth">
       <el-input v-model="form.name" auto-complete="off"  style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="样式" :label-width="formLabelWidth">
       <el-input v-model="form.css" auto-complete="off"  style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="链接" :label-width="formLabelWidth">
       <el-input v-model="form.href" auto-complete="off"  style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择"  style="width:300px">
            <el-option 
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"    
            >

            </el-option>
            
        </el-select>
      
    </el-form-item>
    <el-form-item label="模板" :label-width="formLabelWidth">
       <el-input v-model="form.template" auto-complete="off"  style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="排序" :label-width="formLabelWidth">
       <el-input v-model="form.sort" auto-complete="off"  style="width:300px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelBtn('form')">取 消</el-button>
    <el-button type="primary" @click="addBtn('form')">确 定</el-button>
  </div>
</el-dialog>

      </section>      
</template>
<script>
    import TreeGrid from '@/components/treeGrid/TreeGrid2'
    import { getPermissions,getPermissionsParent,PermissionsInsert,PermissionsFind,PermissionsUpdate,PermissionsDelete } from '@/api/auth';
    export default {
        data() {
            return {
                columns: [  {
                    title: '名称',
                    key: 'name',
                    width: '150',
                }, {
                    title: 'id',
                    key: 'id',
                    width: '150',
                }, {
                    title: '链接',
                    key: 'href',
                    width: '150',
                }, {
                    title: '排序',
                    key: 'sort',
                    width: '150',
                },
                 {
                    title: '操作',
                    type: 'action',
                    actions: [{
                        type: 'primary',
                        text: '编辑'
                    }, {
                        type: 'danger',
                        text: '删除'
                    }],
                    width: '150',
                }],
                data: [],
                toEdit: false,
                options:[{id:1,name:'根节点'}],
                types:[{id:1,name:'菜单'},{id:2,name:'按钮'}],
                title:'添加菜单',
                formLabelWidth:'120px',
                dialogFormVisible:false,
                form: {
                    parentId:'',
                    name:'',
                    css:'',
                    href:'',
                    type:'',                
                    sort:'',
                    template:'',
                    id:'',
                },
            }
        },
        components: {
            TreeGrid
        },
        methods: {
            handleClose(done){
              this.form.parentId = '';
              this.form.name = '';
              this.form.css = '';
              this.form.href = '';
              this.form.type = '';
             
              this.form.sort = '';
              this.form.template = '';
              this.form.id = '';
                 done();
             },

            addMenuBtn(){
                this.title = '添加菜单',
                this.toEdit = false;
                this.dialogFormVisible=true;
                getPermissionsParent().then((res) => {
               
                    this.options =res.data
                    this.options.unshift({id:0,name:'根节点'});
					
				});
            },
            addBtn(form){
                let para = this.form;
                
                
                if(this.toEdit){
                    PermissionsUpdate(para).then(res =>{
                        if(res.data.success){
                            this.$message({
                                type: 'success',
                                message: '编辑成功！'
                            });
                            this.dialogFormVisible=false;
                            this.$refs['form'].resetFields();
                            this.getPermissionsMethod();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '编辑失败，请联系管理员'
                            })
                            
                        }
                        
                    })
                }else{
                    PermissionsInsert(para).then(res =>{
                        if(res.data.success){
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            });
                            this.dialogFormVisible=false;
                            this.$refs['form'].resetFields();
                            this.getPermissionsMethod();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '添加失败，请联系管理员'
                            })
                            
                        }
                        
                    })
                }
               
            },
            cancelBtn(form){
                this.dialogFormVisible=false;
                this.$refs['form'].resetFields();
            },
            getPermissionsMethod(){
                getPermissions().then((res) => {
                   this.data = res.data.result;
					
				});
            },
            rowClick(data, index, event,text) {
              
                if(text=="编辑"){
                   this.title = '编辑菜单',
                   this.toEdit =true;
                    getPermissionsParent().then((res) => {
                
                        this.options =res.data
                        this.options.unshift({id:0,name:'根节点'});
                        
                    });
                   this.dialogFormVisible=true;
                   this.form= data;
                }
                 if(text=="删除"){
                     let para ={
                         id:data.id
                     }
                    this.$confirm('确定删除'+data.name+'菜单吗？','提示',{
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type:'warning'
                    }).then(() => {
                        PermissionsDelete(para).then(res =>{
                            if(res.data.success){
                               
                                this.$message({
                                    type: 'success',
                                    message: '删除成功！'
                                });
                                this.getPermissionsMethod();
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
                 }
               
            },
            selectionClick(arr) {
               
            },
            sortClick(key, type) {
              
            }
        },
        mounted() {
            this.getPermissionsMethod();
        }
    }
</script>