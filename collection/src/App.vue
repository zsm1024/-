<template>

  <div id="app"> 
    <router-view/>
   
  </div> 
 

  
</template>

<script>
export default {
  name: 'app'
}
</script>
<script>
  export default {
  data(){
    return{
      input:''
    }
  }
}
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';// normalize.css 样式格式化
@import './styles/index.scss'; // 全局自定义的css样式
html,body,#contain{height:100%}
#app{height:97%;}
span.active{border-bottom:1px solid #20a0ff;cursor:pointer;color: #20a0ff}
table{	width:100%!important;}
::-webkit-scrollbar{width:5px;height:12px }
::-webkit-scrollbar-track{background-color:#fff;border-radius: 8px}
::-webkit-scrollbar-thumb{background-color:#bee1eb;border-radius: 8px}
::-webkit-scrollbar-thumb:active {background-color:#bee1eb} 
.el-menu-item,.el-submenu__title{height: 48px;line-height: 48px}
.Shover{background: #666!important}
// #AdButton input{background:#4694e4 }
#AdButton input{padding:3px!important;background:#4694e4;border: 1px solid #4694e4; border-radius: 3px;height: 100%;cursor:pointer}
#AdButton input:disabled{color:#97a8be;background:#c9d0da;border: 1px solid #c9d0da;border-radius: 3px }
#AdButton input::-webkit-input-placeholder { color:#fff;font-size:14px;}
#AdButton input:-moz-placeholder { color:#fff;font-size:14px;}/* Mozilla Firefox 4 to 18*/ 
#AdButton input::-moz-placeholder {color:#fff;font-size:14px;} /* Mozilla Firefox 19+*/
#AdButton input:-ms-input-placeholder {color:#fff;font-size:14px;}/* Internet Explorer 10+*/
</style>
