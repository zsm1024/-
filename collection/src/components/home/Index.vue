<template>
    <div>
        <div :class="{navopen:navopen,nav:nav}">
            <left-pane></left-pane>
        </div>
        <div  :class="{paneopen:paneopen,pane:pane}" >
            <right-pane></right-pane>
        </div>
    </div>
</template>
<script>

import RightPane from './RightPane';
import LeftPane from './LeftNav';

export default {
    data() {
        return {
            nav:false,
            navopen:true,
            paneopen:true,
            pane:false,
        };
    },
  
    name: 'Home',
    components: {
        LeftPane,
        RightPane
    }
}
</script>
<style>
.nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    min-width:60px;

    width:5rem;
    background-color: #324157;
	color:#000;

}
.navopen {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width:15rem;
    background-color: #324157;

}
.pane {
    position: absolute;
    left:5rem;
    top: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.paneopen {
    position: absolute;
    left:15rem;
    top: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 235px;
    min-height: 400px;
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

.left-nav {
 padding: 0.3rem;
}


</style>

