<template>
    <div>
        <div :class="{navopen:navopen,nav:nav}">
            <left-pane></left-pane>
        </div>
        <div  :class="{paneopen:paneopen,pane:pane}" >
            <right-pane></right-pane>
        </div>
        <div class="phoneList">
            <el-button type="primary" size="mini"><i class="fa fa-phone"></i></el-button>
            <el-input placeholder="请输入号码"  size='mini' clearable style="width:135px;height:24px"></el-input>
            <el-button type="primary" size="mini">初始化</el-button>
            <el-button type="primary" size="mini" :disabled="disable">登录</el-button>
            <el-button type="primary" size="mini" :disabled="disable">示闲</el-button>
            <el-button type="primary" size="mini" :disabled="disable">示忙</el-button>
            <el-button type="primary" size="mini" :disabled="disable">接听</el-button>
            <el-button type="primary" size="mini" :disabled="disable">挂机</el-button>
            <el-button type="primary" size="mini" :disabled="disable">转接</el-button>
            <el-button type="primary" size="mini" :disabled="disable">咨询</el-button>
            <el-button type="primary" size="mini" :disabled="disable">签出</el-button>
            <el-button type="primary" size="mini" :disabled="disable">呼出</el-button>
            <el-button type="primary" size="mini" :disabled="disable">保持</el-button>
            <el-button type="primary" size="mini">取消</el-button>
            <el-button type="primary" size="mini" :disabled="disable">唤醒</el-button>
            <el-button type="primary" size="mini" :disabled="disable">会议</el-button>
        </div>
	</div> 
    </div>
    
</template>
<script>

import RightPane from './RightPane';
import LeftPane from './LeftNav';

export default {
    data() {
        return {
            nav:true,
            navopen:false,
            paneopen:false,
            pane:true,
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
.el-popover, .el-tabs--border-card{
    box-shadow: none;
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
.phoneList{height:25px;background: #f0f0f0;text-align: center;z-index: 9999;width: 100%;bottom:3px;}
</style>

