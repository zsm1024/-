import Mock from 'mockjs';
const NavView = [
  {
    id: 1,
    title: '催收管理',
    path:'manager3',
    list:[
      {id:1-1,path:"collmanage/User",title:"前期电催队列(2-5天)"},
      {id:1-2,path:"collmanage/User1",title:"前期电催队列(6-30天)"}
    ]
  },
  {
    id: 2,
    title: '作业监控',
    path:'monitor',
    list:[
      {id:2-1,path:"monitor/supervisor",title:"主管任务监控"},
      {id:2-2,path:"monitor/timedistribution",title:"岗位任务实时分布监控"},
      {id:2-3,path:"monitor/userdistribution",title:"用户任务实时分布监控"},
      {id:2-4,path:"monitor/collecthistory",title:"催收历史监控"}
    ]
  }
];


export { NavView };