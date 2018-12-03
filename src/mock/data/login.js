import { param2Obj } from '@/utils'


const userMap = {
  admin: {
      code:0,
      message:'登录成功',
      result:[
        {token: 'admin'},
    ],
    success:'true',
    role: ['collmanage','colone','coltwo','tab','tabview','monitor','supervisor','stributotal','collecthistory','timedistribution','userdistribution','stributotaldetail'],
    menu: {
        result:[
            {
                path: '',
                redirect: 'noredirect',
                href: '',
                name: '催收管理',
                icon: 'fa fa-list',
              
                child: [
                    { path: 'collmanage/colone',id:'42', href: 'collmanage/colone', name: '前期电催队列(2-5天)', icon: 'fa fa-indent' },
                    { path: 'collmanage/coltwo',id:'43', href: 'collmanage/coltwo', name: '前期电催队列(6-30天)',  icon: 'fa fa-th-list' },
        
        
        
                ]
            },
            {
                path: '',
                href: '',
                redirect: 'noredirect',
               
                name: '作业监控',
                icon: 'fa fa-indent',
                child: [
                    
                    { path: 'monitor/queuetask',id:'45', href: 'monitor/queuetask', name: '队列任务监控', icon: 'fa fa-th-list'},
                    { path: 'monitor/userstask',id:'46', href: 'monitor/userstask', name: '用户任务监控', icon: 'fa fa-list-ul' },
                    {
                        path: 'monitor/timedistribution',
                        href: 'monitor/timedistribution',
                        name: '队列任务实时分布监控',
                       
                        hidden: true
                        
                    },
                    {
                        path: 'monitor/userdistribution',
                        href: 'monitor/userdistribution',
                        name: '用户任务实时分布监控',
                       
                        hidden: true,
                        
                    },
                    {
                        path: 'monitor/stributotaldetail',
                        href: 'monitor/stributotaldetail',
                        name: '实时分布监控任务详情',
                        
                        hidden: true,
                        
                    }
        
                ]
            }, 
        ]
    },
        
    

    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778739c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin'
  },
  editor: {
    role: ['editor', 'collmanage', 'colone', 'coltwo'],
    menu: [
      {
        path: '/collmanage',
        redirect: 'noredirect',
        url: '/collmanage',
        name: '催收管理',
        icon: 'fa fa-list',
        meta: { role: ['collmanage'] },
        children: [
          { path: 'colone', url: '/colone', name: '前期电催队列(2-5天)', meta: { role: ['colone'] }, icon: 'fa fa-indent' },
          { path: 'coltwo', url: '/coltwo', name: '前期电催队列(6-30天)', meta: { role: ['coltwo'] }, icon: 'fa fa-th-list' },
        ]
      },
    ],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal Editor'
  },
  test: {
    code:0,
    message:'登录成功',
    success:'true',
    result:[
      {token: 'test'},
  ],
    role: ['develop'],
    token: 'test',
    menu: [
        {
            path: '',
            redirect: 'noredirect',
            href: '',
            name: '催收管理',
            icon: 'fa fa-list',
          
            child: [
                { path: 'collmanage/colone', href: '/collmanage/colone', name: '前期电催队列(2-5天)', icon: 'fa fa-indent' },
                { path: 'collmanage/coltwo', href: '/collmanage/coltwo', name: '前期电催队列(6-30天)',  icon: 'fa fa-th-list' },
    
    
    
            ]
        },
        {
            path: '',
            href: '',
            redirect: 'noredirect',
           
            name: '作业监控',
            icon: 'fa fa-indent',
            child: [
                
                { path: 'monitor/queuetask', href: '/monitor/queuetask', name: '队列任务监控', icon: 'fa fa-th-list'},
                { path: 'monitor/userstask', href: '/monitor/userstask', name: '用户任务监控', icon: 'fa fa-list-ul' },
                {
                    path: 'monitor/timedistribution',
                    href: 'monitor/timedistribution',
                    name: '队列任务实时分布监控',
                    id: '32' ,
                    hidden: true
                    
                },
                {
                    path: 'monitor/userdistribution',
                    href: 'monitor/userdistribution',
                    name: '用户任务实时分布监控',
                   
                    hidden: true,
                    
                },
                {
                    path: 'monitor/stributotaldetail',
                    href: 'monitor/stributotaldetail',
                    name: '实时分布监控任务详情',
                    
                    hidden: true,
                    
                }
    
            ]
        }, 
    ],
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'test'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)

    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
   
      return userMap['admin']
   
  },
  getPermissionsCurrent: config =>{
        return userMap['admin']['menu'];
  },
  logout: () => 'success'
}