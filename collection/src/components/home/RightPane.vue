<template>
    <div class="right-pane">

        <el-tabs class="tabs" v-model="activeTabName" @tab-remove="closeTab" type="border-card">
            <el-tab-pane v-for="item in tabList" :key="item.name" :name="item.label" :label="item.label" :closable="item.closable">
                <component :is="item.component"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { nav_view } from '../../api/api';
import Vue from 'vue'

export default {
    name: 'RightPane',
    data(){
    return{
      items:[]
    }
  },
    computed: {
        activeTabName: {
            get() {
                return this.$store.state.navTabs.activeTabName.name;
            },
            set(value) {
                this.$store.commit("navTabs/setActiveTabName", value);
            }
        },
        ...mapState('navTabs',[
            'tabList'
        ])      
       
    },
    methods: {
        ...mapMutations('navTabs',[
            'closeTab'
        ]),
         getlist1(){
               nav_view().then((res)=>{
                   let data=res.data.msg;
                   this.items=data;                 
               }) 
        }
    },
    mounted(){
    this.getlist1()
  }
}
</script>
<style scoped>
.right-pane {
    height: 100%;
}

.tabs {
    height: 99%;
}
</style>

