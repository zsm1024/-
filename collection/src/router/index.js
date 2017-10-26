import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/components/home/Index"
import Login from "@/pages/login"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
