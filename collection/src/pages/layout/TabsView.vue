<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag v-if="tag.name!=undefined" :closable="true" :type="isActive(tag.path)?'primary':''" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
        visitedViews() {

      return this.$store.state.app.visitedViews
    }
  },
  methods: {
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute() {
      
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        this.$route.matched[this.$route.matched.length - 1].path=this.$route.path
        return  this.$route.matched[this.$route.matched.length - 1]
      }
      
      this.$route.matched[0].path = '/'
      
      return this.$route.matched[0]
    },
    addViewTabs() {

      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive(path) {
      return path === this.$route.path
    }
  },
  watch: {
    $route() {
       
      this.addViewTabs()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    white-space: nowrap;
    width: 100%;
    overflow-x: auto;
    height:50px;
    .tabs-view {
      margin-left: 10px;
    }
  }
</style>
