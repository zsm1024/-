<template>
   <section id="authlist" ref="abc" style="padding:0">
        <div style="margin:10px;" >
            <el-button type="primary" size="small" @click="addUsers" style="padding:7px 9px">添加用户</el-button>
           
        </div>
      <el-row  style="height:95%"> 
            <el-col  class="left" style="height:100%;overflow-y:auto;background: #eef1f6;width:220px" >
                <div  v-for=" (item,$index) in listsLeft " :key="$index" @click="listRight(item,$index)" class="leftTree" :class="{'active':item.active,'unactive':!item.active}">
                    {{item.queueName}}                   
                </div>
            </el-col>
            <el-col ref="right" style="margin-left:10px" >
                <el-table :data="lists"   ref="tables" highlight-current-row v-loading="listLoading"  stripe border :height="heights" >
                    <el-table-column  align="center" :prop="col.field" :label="col.title"  v-for="(col, index) in cols" :key="index" >
                        <template slot-scope="scope">
							<el-input  v-show="scope.row.edit" size="small" v-if="col.field=='weight'" v-model="scope.row[col.field]"></el-input>
                            <span  v-show="scope.row.edit" size="small" v-if="col.field!='weight'">{{ scope.row[col.field] }}</span>
							<span v-show="!scope.row.edit" >{{ scope.row[col.field] }}</span>
						</template>
                    </el-table-column>
                    <el-table-column label="操作"  align="center" width="130" > 
						<template slot-scope="scope">
							<el-button :type="scope.row.edit?'success':'primary'" size="mini" style="padding:4px" @click='Edit(scope.row)' >{{scope.row.edit?'完成':'编辑'}}</el-button> 
                            <el-button type="danger" size="mini"   @click.native.prevent="deleteRow(scope.$index, scope.row,lists)"> 移除</el-button>                         					
						</template>
					</el-table-column>
                </el-table>                
                </el-col>
            </el-col>
      </el-row>
         
 
<el-dialog  title="添加岗位" :visible.sync="adduser" >
      <el-table :data="addList" height="400" @selection-change="handleSelectionChange" cancelhost  border style="width:100%;overflow-y:auto" id="adDialog">
        <el-table-column  type="selection" align="center" ></el-table-column>
        <el-table-column v-for="(item,index) in cols1" :key="index" :prop="item.field" :label="item.title" aline="center" ></el-table-column>
    </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button style="padding:10px 15px" @click="toggleSelection()" >取 消</el-button>
   <el-button type="primary" style="padding:10px 15px" @click="addChange()">确 定</el-button>
  </div> 
</el-dialog>       
   </section>
</template>

<script>
import {authlist,authlistRight,updateWeight,addauthlistRight,addUserIds,delauthlist } from "@/api/basedata";
    export default {
        data() {
            return {
                id:'',
                listsLeft: [],
                itemlist:[],
                lists: [],  
                select:[], 
                addList:[],
                addlists:[],
                listId:'', 
                multipleSelection:[],         
                queueId:"",
                heights:'',
                adduser:false,
                cols:[
                    {title:'用户名',field:'nickname'},                 
                    {title:'电话',field:'phone'}, 
                    {title:'权重',field:'weight'},                 
                ],
                 cols1:[
                    {title:'用户名',field:'nickname'},                 
                    {title:'电话',field:'phone'},                                
                ],
                listLoading: false,               
              
            }
        },
        
    methods: {       
         getLeftTree(){
            this.listLoading = true;
            authlist().then(res => {
                this.listsLeft = res.data.result;
                this.listLoading = false;
            })
        },
        listRight(item,index){
          
            this.listId= item.id; 
            this.itemlist = item;       
            this.listLoading = true;
            this.rightShow();
            let items=this.listsLeft;
            
            this.$nextTick(function(){
                items.forEach(item => {
                    this.$set(item,'active',false);
                
                });
                this.$set(item,'active',true);
            })
        },
        rightShow(){
            let para = {             
                queueId: this.listId
            };
            authlistRight(para).then(res => {
                this.queueId=this.listId;
                let data=res.data.result;
                this.lists=data;              
                this.listLoading = false;
                this.lists = this.lists.map(v => {
					this.$set(v, 'edit', false)
					return v;					
				});
            });
        },
        Edit(row){
            let para = row;
			if(row.edit=!row.edit){
                return;
			}else{             
				updateWeight(para).then(res =>{
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
        },
        deleteRow(index, rows, datas) {
            let para ={
				quId:rows.quId,
            }
			    this.$confirm('确定删除信息吗？','提示',{
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type:'warning'
			    }).then(() => {
				    delauthlist(para).then(res =>{
			
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
			// this.$confirm('确定删除信息吗？','提示',{
			// 	confirmButtonText: "确定",
			// 	cancelButtonText: "取消",
            //     type:'warning'
            // }).then(() => {
			// 	    delInfo(para).then(res =>{
			
			// 		    if(res.data.success){
			// 			    datas.splice(index, 1);
			// 			    this.$message({
			// 				    type: 'success',
			// 				    message: '删除成功！'
			// 			    })
			// 		    }else{
			// 			    this.$message({
			// 				    type: 'error',
			// 				    message: '删除失败，请联系管理员！'
			// 			    })
			// 		    }
			// 	    });
				
			//     }).catch(() =>{
			// 	    this.$message({
			// 		    type: 'info',
			// 		    message: '已取消删除'
			// 	    });			
		},
        addUsers(item){
           if(this.queueId==""){
              this.$alert('请先选择队列！','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    center:'true'
              })
           }else{
             this.adduser=true;
             let para = {             
                 queueId:this.listId
             };
             addauthlistRight(para).then(res => {
                let data=res.data.result;
                this.addList=data;
            })
           }
        },
        toggleSelection(rows){
        this.adduser=false;
        this.$refs.multipleTable.clearSelection()
        },
        handleSelectionChange(val){
         
            this.multipleSelection=val;
        },
        addChange(val){
             this.addlists.splice(0,this.addlists.length)
            this.multipleSelection.forEach(f =>{
               this.addlists.push(f.id);
            });
            let para={
                queueId:this.listId,
                userIds:this.addlists
            }
            addUserIds(para).then(res => {
               this.rightShow();
               
            })
            this.adduser=false;         
        }
    },
    mounted() {
        this.getLeftTree();
        let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-100;
        let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)-480;
        this.$refs.abc.style.height= h+"px";
        this.$refs.right.$el.style.width= w+"px";
        this.$refs.right.$el.style.height= (h-70)+"px";
    }
    }
</script>

<style scoped>
#authlist{height: 100%}
#authlist .el-row{margin:0!important}
.left{background: #eef1f6;font-size: 13px}
.leftTree{cursor: pointer;padding: 10px;text-align: center;border-bottom: 1px solid #fff;color: #20a0ff}
.leftTree:hover{color:#20a0ff};
 .active{color:#20a0ff}
.unactive{color:#000} 
</style>
