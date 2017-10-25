import Mock from 'mockjs';
const NavView = [
  {
    id: 1,
    title: '催收管理',
    list:[
      {id:1-1,path:"home/User",title:"前期电催队列(2-5天)"},
      {id:1-2,path:"home/User1",title:"前期电催队列(6-30天)"}
    ]
  },
  {
    id: 2,
    title: '作业监控',
    list:[
      {id:1-3,path:"home/User2",title:"1111"},
      {id:1-4,path:"home/User3",title:"123123123(6-30天)"}
    ]
  }
];
const Users = [];
for (let i = 0; i < 40; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users, NavView };
////通过向大括号中添加LoginUsers, Users ，变量并且export输出，就可以将对应变量值以LoginUsers, Users 变量标识符形式暴露给其他文件而被读取到
