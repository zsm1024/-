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
				<el-table-column :prop="col.field" :label="col.title" v-for="(col, index) in cols" show-overflow-tooltip :key="index" align="center" >
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
				<el-form-item label="起始委托逾期天数" prop="entrustOverdueDaysStart" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.entrustOverdueDaysStart" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="截止委托逾期天数" prop="entrustOverdueDaysEnd" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.entrustOverdueDaysEnd" style="width:300px"></el-input>
				</el-form-item>
                <el-form-item label="起始收款/车天数" prop="entrustMoneyStart" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.entrustMoneyStart" style="width:300px"></el-input>
				</el-form-item>	
                <el-form-item label="截止收款/车天数" prop="entrustMoneyEnd" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.entrustMoneyEnd" style="width:300px"></el-input>
				</el-form-item>	
                <el-form-item label="起始委托金额" prop="widthdrawMoneyDaysEnd" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.widthdrawMoneyDaysEnd" style="width:300px"></el-input>
				</el-form-item>	
                <el-form-item label="截止委托金额" prop="widthdrawMoneyDaysStart" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.widthdrawMoneyDaysStart" style="width:300px"></el-input>
				</el-form-item>	
                <el-form-item label="代理费比例" prop="rate" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.rate" style="width:300px"></el-input>
				</el-form-item>	
                <el-form-item label="收款模式" prop="widthdrawMoneyModel" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.widthdrawMoneyModel" style="width:300px"></el-input>
				</el-form-item>	
                 <el-form-item label="控车模式" prop="widthdrawCarModel" :label-width="formLabelWidth">
					<el-input v-model="AdduserForm.widthdrawCarModel" style="width:300px"></el-input>
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
    import { rateList,ratedel,rateupdate,rateinsert } from "@/api/basedata";
    export default{
        data(){
            return{
				total: 0,
				heights:0,
				pagesize:10,
				page: 1,
                listLoading: false,	                
				lists:[],
				addUserInfos:false,
				formLabelWidth: '140px',
                cols:[
                    {title:'起始委托逾期天数',field:'entrustOverdueDaysStart'},
					{title:'截止委托逾期天数',field:'entrustOverdueDaysEnd'},
					{title:'起始收款/车天数',field:'entrustMoneyStart'},
                    {title:'截止收款/车天数',field:'entrustMoneyEnd'},
                    {title:'起始委托金额',field:'widthdrawMoneyDaysEnd'},
                    {title:'截止委托金额',field:'widthdrawMoneyDaysStart'},
                    {title:'代理费比例',field:'rate'},
                    {title:'收款模式',field:'widthdrawMoneyModel'},
                    {title:'控车模式',field:'widthdrawCarModel'},
				],
				AdduserForm:{					
					entrustOverdueDaysStart:"",
					entrustOverdueDaysEnd:"",
                    entrustMoneyStart:"",
                    entrustMoneyEnd:"",
					widthdrawMoneyDaysEnd:"",
                    widthdrawMoneyDaysStart:"",
                    rate:"",
					widthdrawMoneyModel:"",
					widthdrawCarModel:""
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
				rateList(para).then((res) => {					
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
				    ratedel(para).then(res =>{			
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
				rateupdate(para).then(res =>{
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
		addUserInfo(){
			this.addUserInfos=false;
			this.$refs['AdduserForm'].resetFields();
        },
		choice(AdduserForm){			
 			let para ={
				entrustOverdueDaysStart:this.AdduserForm.entrustOverdueDaysStart,
				entrustOverdueDaysEnd:this.AdduserForm.entrustOverdueDaysEnd,
                entrustMoneyStart:this.AdduserForm.entrustMoneyStart,               
				entrustMoneyEnd:this.AdduserForm.entrustMoneyEnd,
				widthdrawMoneyDaysEnd:this.AdduserForm.widthdrawMoneyDaysEnd,
                widthdrawMoneyDaysStart:this.AdduserForm.widthdrawMoneyDaysStart,
                rate:this.AdduserForm.rate,
                widthdrawMoneyModel:this.AdduserForm.widthdrawMoneyModel,
                widthdrawCarModel:this.AdduserForm.widthdrawCarModel,						
			};
            this.$refs[AdduserForm].validate((valid) => {
                if(valid){
                  rateinsert(para).then(res =>{
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.lists.unshift(
                        {
							"entrustOverdueDaysStart":this.$refs['AdduserForm'].model.entrustOverdueDaysStart,
							"entrustOverdueDaysEnd":this.$refs['AdduserForm'].model.entrustOverdueDaysEnd,
                            "entrustMoneyStart":this.$refs['AdduserForm'].model.entrustMoneyStart ,
                            "entrustMoneyEnd":this.$refs['AdduserForm'].model.entrustMoneyEnd,
							"widthdrawMoneyDaysEnd":this.$refs['AdduserForm'].model.widthdrawMoneyDaysEnd,
                            "widthdrawMoneyDaysStart":this.$refs['AdduserForm'].model.widthdrawMoneyDaysStart,
                            "rate":this.$refs['AdduserForm'].model.rate,
							"widthdrawMoneyModel":this.$refs['AdduserForm'].model.widthdrawMoneyModel,
							"widthdrawCarModel":this.$refs['AdduserForm'].model.widthdrawCarModel                     	                         
						},	
                        
					);
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
 