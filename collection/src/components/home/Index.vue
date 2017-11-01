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
	color:#000;

}
.navopen {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

}
.pane {
    position: absolute;
    left:5rem;
    top: 5px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.paneopen {
    position: absolute;
    left:15rem;
    top: 5px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}

</style>

