import Vue from 'vue';
import Router from 'vue-router';
const _import = file => () => import('@/pages/' + file + '.vue')

/* layout */
import Layout from '../pages/layout/Layout';
import tabView from '../pages/tab/tabview';
Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [
            { 
                path: 'dashboard', component: _import('dashboard/index')
            },
            {
                path: 'monitor/timedistribution/:id',
                name: '队列任务实时分布监控',
                hidden: true,
                component: _import('monitor/timedistribution')
            },
            {
                path: 'monitor/userdistribution/:id',
                name: '用户任务实时分布监控',
                hidden: true,
                component: _import('monitor/userdistribution')
            },
            {
                path: 'monitor/stributotaldetail/:id',
                name: '实时分布监控任务详情',
                hidden: true,
                component: _import('monitor/stributotaldetail')
            },
            {
                path: 'monitor/striusertotaldetail/:id',
                name: '实时分布用户监控任务详情',
                hidden: true,
                component: _import('monitor/striusertotaldetail')
            },
            {
                path: 'searchs/colsearchdetail/:id',
                name: '合同查询详情',
                hidden: true,
                component: _import('searchs/colsearchdetail')
            },
        ]
    },         
    {
        path: '/tab',
        component: Layout,
        redirect: 'noredirect',
        name: '处理页',
        hidden: true,
        children: [
            { 
                path: 'tabview/:id', 
                name: '处理详情页',
                redirect:'/tab/tabView/cs_message/:id',
                component: _import('tab/tabView'),
                children:[
                    {path:'/tab/tabView/cs_message/:id',name:'催收信息',component: _import('tab/tablist/cs_message')},
                    {path:'/tab/tabView/ht_message/:id',name:'合同信息',component: _import('tab/tablist/ht_message')},
                    {path:'/tab/tabView/cs_history/:id',name:'催收历史',component: _import('tab/tablist/cs_history')},
                    {path:'/tab/tabView/wb_message/:id',name:'维保记录',component: _import('tab/tablist/wb_message')},
                    {path:'/tab/tabView/hk_plan/:id',name:'还款计划',component: _import('tab/tablist/hk_plan')},
                    {path:'/tab/tabView/kk_list/:id',name:'扣款流水',component: _import('tab/tablist/kk_list')},
                    {path:'/tab/tabView/cms_history/:id',name:'CMS历史',component: _import('tab/tablist/cms_history')},            
                ]            
            },
        ]
    },


 
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  linkActiveClass:'active'
})

export const asyncRouterMap = [
    // {
    //     path: '/collmanage',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: '任务管理',
    //     icon: 'fa fa-list',
       
    //     children: [
    //         { path: 'colone/:id', name: '前期电催队列(2-5天)', meta: {role: ['colone']}, icon: 'fa fa-indent', component: _import('collmanage/colone') },
    //         { path: 'coltwo', name: '前期电催队列(6-30天)', meta: {role: ['coltwo']}, icon: 'fa fa-th-list', component: _import('collmanage/coltwo') },



    //     ]
    // },
    // {
    //     path: '/tab',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: '处理页',
        
    //     hidden: true,
    //     children: [{ path: 'tabview/:id', name: '处理详情页', component: _import('tab/tabView') }]
    // },
    // {
    //     path: '/monitor',
    //     component: Layout,
    //     redirect: 'noredirect',
        
    //     name: '作业监控',
    //     icon: 'fa fa-indent',
    //     children: [
            
    //         { path: 'queuetask', name: '队列任务监控',icon: 'fa fa-th-list', component: _import('monitor/queuetask') },
    //         { path: 'userstask', name: '用户任务监控', icon: 'fa fa-list-ul', component: _import('monitor/userstask') },
    //         {
    //             path: 'timedistribution/:id',
    //             name: '队列任务实时分布监控',
                
    //             hidden: true,
    //             component: _import('monitor/timedistribution')
    //         },
    //         {
    //             path: 'userdistribution/:id',
    //             name: '用户任务实时分布监控',
             
    //             hidden: true,
    //             component: _import('monitor/userdistribution')
    //         },
    //         {
    //             path: 'stributotaldetail/:id',
    //             name: '实时分布监控任务详情',               
    //             hidden: true,
    //             component: _import('monitor/stributotaldetail')
    //         }

    //     ]
    // },
]
