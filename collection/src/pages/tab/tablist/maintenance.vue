<template>
    <section ref="changeHeight" style="overflow-y: auto;">
        <div>
            <el-tabs v-model="activeTabName" type="card"  @tab-remove="closeTab">
            <el-tab-pane
                v-for="(item, index) in tabList"
                :key="item.name"
                :label="item.label"
                :name="item.name"
                :closable="item.closable"
            >
                {{item.content}}
                <component :is="item.component"></component>
            </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

  
    export default {
       
        computed: {
            activeTabName: {
                    get() {
                        return this.$store.state.listdetail.activeTabName;
                    },
                    set(value) {
                        this.$store.commit("navTabs/setActiveTabName", value);
                    }
                },
                ...mapState('listdetail',[
                    'tabList'
                ])
            },
            methods: {
                ...mapMutations('listdetail',[
                    'closeTab'
            ])
        },
        mounted() {
			
			 let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-155;
   			this.$refs.changeHeight.style.height= h+"px"
		}
    }
</script>

<style scoped>

</style>