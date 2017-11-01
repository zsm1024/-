<template>
    <div>
        <div class="nav">
        <div class="logo">
     		<i class="el-icon-menu" @click=""></i>
      		<a>催收管理系统</a>
   		 </div>
            <left-nav></left-nav>
        </div>
        <div class="pane">
            <right-pane></right-pane>
        </div>
    </div>
</template>
<script>
import LeftNav from './LeftNav'
import RightPane from './RightPane'

export default {
    name: 'Home',
    components: {
        LeftNav,
        RightPane
    },
}
</script>
<style>
.nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    min-width:60px;
    background-color: #324157;
}

.pane {
    position: absolute;
    left: 15rem;
    top: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 3.5rem;
  border-bottom: solid 0.01rem #48576a;
}
.logo a{
  color:#fff
}
i {
  margin-right: 0.5rem;
}

</style>

