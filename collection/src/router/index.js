import Vue from 'vue';
import Router from 'vue-router';
const _import = file => () =>
  import ('@/pages/' + file + '.vue')

/* layout */
import Layout from '../pages/layout/Layout';
import tabView from '../pages/IcsPage/tab/tabview';
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
    path: '/IcsPage/epiboly/eptab',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children:[{
      path: 'tabviews/:id',
      name: '外包处理详情页',
      redirect: '/IcsPage/epiboly/eptab/tabViews/cs_message/:id',
      component: _import('IcsPage/epiboly/eptab/tabViews'),
      children:[{
        path: '/IcsPage/epiboly/eptab/tabViews/cs_message/:id',
        name: '外包处理详情页',
        component: _import('IcsPage/epiboly/eptab/eplist/cs_message')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/ht_message/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/ht_message')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/cs_history/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/cs_history')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/showlist/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/showlist')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/hk_plan/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/hk_plan')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/kk_list/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/kk_list')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/cms_history/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/cms_history')
      },
      {
        path: '/IcsPage/epiboly/eptab/tabViews/controlCar/:id',
        component: _import('IcsPage/epiboly/eptab/eplist/controlCar')
      },
    ]
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/IcsPage',
    name: '首页',
    hidden: true,
    children: [{
        path: 'IcsPage',
        component: _import('IcsPage/dashboard/index')
      },
      {
        path: 'IcsPage/monitor/timedistribution/:id',
        name: '队列任务实时分布监控',
        hidden: true,
        component: _import('IcsPage/monitor/timedistribution')
      },
      {
        path: 'IcsPage/monitor/userdistribution/:id',
        name: '用户任务实时分布监控',
        hidden: true,
        component: _import('IcsPage/monitor/userdistribution')
      },
      {
        path: 'IcsPage/monitor/stributotaldetail/:id',
        name: '实时分布监控任务详情',
        hidden: true,
        component: _import('IcsPage/monitor/stributotaldetail')
      },
      {
        path: 'IcsPage/monitor/striusertotaldetail/:id',
        name: '实时分布用户监控任务详情',
        hidden: true,
        component: _import('IcsPage/monitor/striusertotaldetail')
      },
      {
        path: 'IcsPage/searchs/colsearchdetail/:id',
        name: '合同查询详情',
        hidden: true,
        component: _import('searchs/colsearchdetail'),
        redirect:'/IcsPage/searchs/colsearchdetail/cs_message/:id'
      },
      {
        path: 'IcsPage/realdata/realspot/:id',
        name: '实地队列分布监控',
        hidden: true,
        component: _import('IcsPage/realdata/realspot')
      },
      {
        path: 'IcsPage/realdata/realdetial/:id',
        name: '实地队列分布监控详情',
        hidden: true,
        component: _import('IcsPage/realdata/realdetial')
      },
      {
        path: 'IcsPage/cars/carsControlDetial/:id',
        name: '控车管理详情',
        hidden: true,
        component: _import('IcsPage/cars/carsControlDetial')
      },
      
    ]
  },
  {
    path: '/IcsPage/tab',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    children: [{
      path: 'tabview/:id',
      name: '处理详情页',
      redirect: '/IcsPage/tab/tabView/cs_message/:id',
      component: _import('IcsPage/tab/tabView'),
      children: [{
          path: '/IcsPage/tab/tabView/cs_message/:id',
          name: '处理详情页',
          component: _import('IcsPage/tab/tablist/cs_message')
        },
        {
          path: '/IcsPage/tab/tabView/ht_message/:id',
          component: _import('IcsPage/tab/tablist/ht_message')
        },
        {
          path: '/IcsPage/tab/tabView/cs_history/:id',
          component: _import('IcsPage/tab/tablist/cs_history')
        },
        {
          path: '/IcsPage/tab/tabView/showlist/:id',
          component: _import('IcsPage/tab/tablist/showlist')
        },
        {
          path: '/IcsPage/tab/tabView/hk_plan/:id',
          component: _import('IcsPage/tab/tablist/hk_plan')
        },
        {
          path: '/IcsPage/tab/tabView/kk_list/:id',
          component: _import('IcsPage/tab/tablist/kk_list')
        },
        {
          path: '/IcsPage/tab/tabView/cms_history/:id',
          component: _import('IcsPage/tab/tablist/cms_history')
        },
        {
          path: '/IcsPage/tab/tabView/controlCar/:id',
          component: _import('IcsPage/tab/tablist/controlCar')
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
      redirect: '/IcsPage/searchs/colsearchdetail/cs_message/:id',
      component: _import('IcsPage/searchs/colsearchdetail'),
      children: [{
          path: '/IcsPage/searchs/colsearchdetail/cs_message/:id',
          name: '合同查询详情页',
          component: _import('IcsPage/searchs/tab/tablist/cs_message')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/ht_message/:id',
          component: _import('IcsPage/searchs/tab/tablist/ht_message')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/cs_history/:id',
          component: _import('IcsPage/searchs/tab/tablist/cs_history')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/showlist/:id',
          component: _import('IcsPage/searchs/tab/tablist/showlist'),
          // children:[{
          //   path:"/searchs/tab/tablist/showlist/showlistdetial",
          //   component: _import('searchs/tab/tablist/showlist/showlistdetial')
          // }]
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/hk_plan/:id',
          component: _import('IcsPage/searchs/tab/tablist/hk_plan')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/kk_list/:id',
          component: _import('IcsPage/searchs/tab/tablist/kk_list')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/cms_history/:id',
          component: _import('IcsPage/searchs/tab/tablist/cms_history')
        },
        {
          path: '/IcsPage/searchs/colsearchdetail/controlCar/:id',
          component: _import('IcsPage/searchs/tab/tablist/controlCar')
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
        path:'/IcsPage/spdata/splist/listRemarks/:id',
        name:"审批列表",
        component:_import('IcsPage/spdata/listRemarks'),
      }, 
      {
        path:'/IcsPage/spdata/splist/applyRemarks/:id',
        name:"我的申请",
        component:_import('IcsPage/spdata/applyRemarks'),
      },
      {
        path:'/IcsPage/spdata/splist/historyList/:id',
        name:"审批历史",
        component:_import('IcsPage/spdata/historyList'),
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
        path:'/IcsPage/outerdata/listin',
        name:"文件导入",
        component:_import('IcsPage/outerdata/listin'),
      },
      {
        path:'/IcsPage/outerdata/listdetial',
        name:"外包案件详情",
        component:_import('IcsPage/outerdata/listdetial'),
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
