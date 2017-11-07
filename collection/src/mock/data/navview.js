import Mock from 'mockjs';
const NavView = [
  {
    id: 1,
    title: '催收管理',
    path:'manager3',
    icon: 'fa fa-indent',
    list:[
      {id:1-1,path:"collmanage/User",title:"前期电催队列(2-5天)"},
      {id:1-2,path:"collmanage/User1",title:"前期电催队列(6-30天)"}
    ]
  },
  {
    id: 2,
    title: '作业监控',
    path:'monitor',
    icon: 'fa fa-th-list',
    list:[
      {id:2-1,path:"monitor/supervisor",title:"主管任务监控"},
      {id:2-2,path:"monitor/stributotal",title:"任务分布监控"},
      {id:2-4,path:"monitor/collecthistory",title:"催收历史监控"}
    ]
  }
];


export { NavView };