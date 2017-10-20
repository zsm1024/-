import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'
import Home from '@/pages/home/home'
import ElementUI from 'element-ui'
import Index1 from '@/pages/home/index1'
import Index2 from '@/pages/home/index2'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueResource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
      {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
      {
      	path:'/index1',
      	component: Index1
      },
      {
      	path:'/index2',
      	component: Index2
      },
      	
      ]
    },
  ]
})
