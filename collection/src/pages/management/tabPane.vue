<template>
	<el-table style="width: 100%">
		
			<!--<el-table-column align="center" label="" v-loading="loading"  element-loading-text="请给我点时间！">  
				<template  v-for="i in list">
					<span>{{i.id}}</span>
				</template>      		 	    		
    		</el-table-column>-->
    		
    		<!--<el-table-column align="center" label="序号" width="65"  v-loading="loading"  element-loading-text="请给我点时间！">    		 
       		 	<span>{{i.id}}</span>    		
    		</el-table-column>-->
	
		
		
	</el-table>
</template>

<script>	
export default {
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
  getList:
  	function(){
  		this.loading = true
   		this.$emit('create')
  		var that =this;
			this.$http.get('http://localhost:3000/tab_View')
			.then(function(ret) {
				var data=ret.data;
				this.list=data;	
				console.log(data)
			})
  		
  	}
//     // for test						
//		})
		
//    fetchList(this.listQuery).then(response => {
//      this.list = response.data.items
//      this.loading = false
//    })
    
  }
}
</script>

<style>
</style>