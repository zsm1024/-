import Vue from 'vue';
import Router from 'vue-router';
const _import = file => () =>
  import ('@/pages/' + file + '.vue')

/* layout */
import Layout from '../pages/layout/Layout';
import tabView from '../pages/tab/tabview';
// import tabViews from '../pages/epiboly/eptab'
Vue.use(Router);

export const constantRouterMap = [{
    path: '/IcsPage/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true
  },
  {
    path: '/epiboly/eptab',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children:[{
      path: 'tabviews/:id',
      name: '外包处理详情页',
      redirect: '/epiboly/eptab/tabViews/cs_message/:id',
      component: _import('epiboly/eptab/tabViews'),
      children:[{
        path: '/epiboly/eptab/tabViews/cs_message/:id',
        name: '外包处理详情页',
        component: _import('epiboly/eptab/eplist/cs_message')
      },
      {
        path: '/epiboly/eptab/tabViews/ht_message/:id',
        component: _import('epiboly/eptab/eplist/ht_message')
      },
      {
        path: '/epiboly/eptab/tabViews/cs_history/:id',
        component: _import('epiboly/eptab/eplist/cs_history')
      },
      {
        path: '/epiboly/eptab/tabViews/showlist/:id',
        component: _import('epiboly/eptab/eplist/showlist')
      },
      {
        path: '/epiboly/eptab/tabViews/hk_plan/:id',
        component: _import('epiboly/eptab/eplist/hk_plan')
      },
      {
        path: '/epiboly/eptab/tabViews/kk_list/:id',
        component: _import('epiboly/eptab/eplist/kk_list')
      },
      {
        path: '/epiboly/eptab/tabViews/cms_history/:id',
        component: _import('epiboly/eptab/eplist/cms_history')
      },
    ]
    }]
  },
  {
    path: '/IcsPage',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
        path: 'dashboard',
        component: _import('dashboard/index')
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
        component: _import('searchs/colsearchdetail'),
        redirect:'/searchs/colsearchdetail/cs_message/:id'
      },
      {
        path: 'realdata/realspot/:id',
        name: '实地队列分布监控',
        hidden: true,
        component: _import('realdata/realspot')
      },
      {
        path: 'realdata/realdetial/:id',
        name: '实地队列分布监控详情',
        hidden: true,
        component: _import('realdata/realdetial')
      },
    ]
  },
  {
    path: '/tab',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [{
      path: 'tabview/:id',
      name: '处理详情页',
      redirect: '/tab/tabView/cs_message/:id',
      component: _import('tab/tabView'),
      children: [{
          path: '/tab/tabView/cs_message/:id',
          name: '处理详情页',
          component: _import('tab/tablist/cs_message')
        },
        {
          path: '/tab/tabView/ht_message/:id',
          component: _import('tab/tablist/ht_message')
        },
        {
          path: '/tab/tabView/cs_history/:id',
          component: _import('tab/tablist/cs_history')
        },
        {
          path: '/tab/tabView/showlist/:id',
          component: _import('tab/tablist/showlist')
        },
        {
          path: '/tab/tabView/hk_plan/:id',
          component: _import('tab/tablist/hk_plan')
        },
        {
          path: '/tab/tabView/kk_list/:id',
          component: _import('tab/tablist/kk_list')
        },
        {
          path: '/tab/tabView/cms_history/:id',
          component: _import('tab/tablist/cms_history')
        },
      ]
    }, ]
  },
  
  {
    path: '/searchs',
    component: Layout,
    // redirect: 'noredirect',
    hidden: true,
    children: [{
      path: 'colsearchdetail/:id',
      name: '合同查询处理详情页',
      redirect: '/searchs/colsearchdetail/cs_message/:id',
      component: _import('searchs/colsearchdetail'),
      children: [{
          path: '/searchs/colsearchdetail/cs_message/:id',
          name: '合同查询详情页',
          component: _import('searchs/tab/tablist/cs_message')
        },
        {
          path: '/searchs/colsearchdetail/ht_message/:id',
          component: _import('searchs/tab/tablist/ht_message')
        },
        {
          path: '/searchs/colsearchdetail/cs_history/:id',
          component: _import('searchs/tab/tablist/cs_history')
        },
        {
          path: '/searchs/colsearchdetail/showlist/:id',
          component: _import('searchs/tab/tablist/showlist'),
          // children:[{
          //   path:"/searchs/tab/tablist/showlist/showlistdetial",
          //   component: _import('searchs/tab/tablist/showlist/showlistdetial')
          // }]
        },
        {
          path: '/searchs/colsearchdetail/hk_plan/:id',
          component: _import('searchs/tab/tablist/hk_plan')
        },
        {
          path: '/searchs/colsearchdetail/kk_list/:id',
          component: _import('searchs/tab/tablist/kk_list')
        },
        {
          path: '/searchs/colsearchdetail/cms_history/:id',
          component: _import('searchs/tab/tablist/cms_history')
        },
      ]
    }, ]
  },
  
  //审批页面
  {
    path: '/spdata',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children:[
      {
        path:'/spdata/splist/listRemarks/:id',
        name:"审批列表",
        component:_import('spdata/listRemarks'),
      }, 
      {
        path:'/spdata/splist/applyRemarks/:id',
        name:"我的申请",
        component:_import('spdata/applyRemarks'),
      },
      {
        path:'/spdata/splist/historyList/:id',
        name:"审批历史",
        component:_import('spdata/historyList'),
      },  
      // {
      //   path:'/spdata/splist/listRemarks/remarksDetail',
      //   name:"审批详情",
      //   component:_import('spdata/remarksDetail')
      // },
      // {
      //   path:'/spdata/splist/112',
      //   name:"审批列表",
      //   component:_import('spdata/splist')
      // }
    ]

  },
  //外包模块
  {
    path: '/outerdata',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children:[
      {
        path:'/outerdata/listin',
        name:"文件导入",
        component:_import('outerdata/listin'),
      },
      {
        path:'/outerdata/listdetial',
        name:"外包案件详情",
        component:_import('outerdata/listdetial'),
      }
    ]
  },
  
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap,
  linkActiveClass: 'active'
})

// export const asyncRouterMap = [
  
// ]
