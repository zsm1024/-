import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const stationtotal = [
    {
        cols:[
            {title:'队列名称',field:'queueName'},
            {title:'数量',field:'count'},
            {title:'逾期应收款总计',field:'overdueTotal'},
            {title:'承诺还款案件数',field:'promiseNum'},
            {title:'剩余总金额',field:'residueTotal'},
            {title:'已处理',field:'processed'},
            {title:'未处理',field:'untreated'},
        ],
           
        data: [{
            id: 1,
            queueName: '前期电催岗（2-5）天',
            count: 80,
            promiseNum: 50,
            overdueTotal: '￥540729.36',
            residueTotal: '￥5252368.81',
            processed:0,
            untreated:65
        },
        {
            id: 2,
            queueName: '后期电催岗（2-5）天',
            count: 75,
            promiseNum: 40,
            overdueTotal: '￥640729.36',
            residueTotal: '￥5252368.81',
            
            processed:1,
            untreated:90
        }]
    }

    
];

const userstationtotal = [
    { 
        cols:[
            {title:'用户名称',field:'username'},
            {title:'数量',field:'num'},
            {title:'承诺还款案件数',field:'anjianshu'},
            {title:'逾期应收款总计',field:'overduerec'},
            {title:'剩余总金额',field:'surplustotalmoney'},
            {title:'已处理',field:'isdispose'},
            {title:'未处理',field:'isnodispose'},
        ],
        data:[]
    }

];
for (let i = 0; i < 43; i++) {
    userstationtotal[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        num: Mock.Random.integer(0,100),
        anjianshu: Mock.Random.integer(0,100),
        'overduerec|10000-90000.1-2': 1,
        'surplustotalmoney|10000-90000.1-2': 1,
        isdispose: Mock.Random.integer(0,10 ),
        isnodispose: Mock.Random.integer(0,100)
      
  }));
}

const station = [
    {
        cols:[
           
            {title:'队列名称',field:'queueName'},
            {title:'逾期天数',field:'overdueDays'},
            {title:'数量',field:'count'},
            {title:'承诺还款案件数',field:'promiseNum'},
            {title:'逾期应收款总计',field:'overdueTotal'},
            {title:'剩余总金额',field:'residueTotal'},
            {title:'已处理',field:'processed'},
            {title:'未处理',field:'untreated'},
        ],
           
        data: [{
            id: 1,
            overdueDays: '2天',
            queueName: '前期电催队列（2-10）天',
            count: 80,
            promiseNum: 50,
            overdueTotal: '￥540729.36',
            residueTotal: '￥5252368.81',
            processed:0,
            untreated:65
        },
        {
            id: 2,
            overdueDays: '2天',
            queueName: '后期电催岗（2-5）天',
            count: 75,
            promiseNum: 40,
            overdueTotal: '￥640729.36',
            residueTotal: '￥6252368.81',
            processed:1,
            untreated:90
        }]
    }

    
];
const userstation = [
    { 
        cols:[
            {title:'用户名称',field:'username'},
            {title:'队列名称',field:'queuename'},
            {title:'数量',field:'num'},
            {title:'逾期应收款总计',field:'overduerec'},
            {title:'剩余总金额',field:'surplustotalmoney'},
            {title:'已处理',field:'isdispose'},
            {title:'未处理',field:'isnodispose'},
        ],
        data:[]
    }

];
for (let i = 0; i < 43; i++) {
    userstation[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        queuename:'后期电催队列（2-10）天',
        username: '测试111',
        num: Mock.Random.integer(0,100),
        'overduerec|10000-90000.1-2': 1,
        'surplustotalmoney|10000-90000.1-2': 1,
        isdispose: Mock.Random.integer(0,10 ),
        isnodispose: Mock.Random.integer(0,100)
  }));
}

const supervisor = [
    {
        cols:[
            {title:'借款人',field:'username'},
            {title:'职业',field:'career'},
            {title:'逾期天数',field:'overday'},
            {title:'逾期金额',field:'overmoney'},
            {title:'经销商',field:'dealer'},
            {title:'贷款产品',field:'product'},
            {title:'车型',field:'carmodels'},
            {title:'合同号',field:'contractnum'},
            {title:'省份',field:'province'},
            {title:'城市',field:'city'},
            {title:'最近行动代码',field:'code'},
            {title:'岗位ID',field:'postid'},
            {title:'处理人',field:'process'},
            {title:'用户ID',field:'userid'},
            {title:'最近行动时间',field:'neartime'},
            {title:'贷款金额',field:'loanmoney'},
            {title:'未偿本金',field:'unpaidmoney'},
            {title:'首付比例',field:'firstscale'},
            {title:'承诺兑现标示',field:'mark'},
            {title:'核销状态',field:'isnodis'},
            
        ],
        data:[]
    }



];


for (let i = 0; i < 43; i++) {
    supervisor[0].data.push(Mock.mock({
        id: 1,
        name: Mock.Random.cname(),
        occupation: Mock.Random.word(),
        overdueDays: Mock.Random.integer(0,10 ),
        'sumOverdue|10000-90000.1-2': 1,
        dealer: Mock.Random.cword(),
        loanProducts: Mock.Random.cword(),
        loanCar:Mock.Random.cword(),
        applicationNumber:Mock.Random.cword(),
        province:Mock.Random.province(),
        city:Mock.Random.city(),
        afpSign:Mock.Random.cword(),
        postid:Mock.Random.cword(),
        process:Mock.Random.cname(),
        username:Mock.Random.cword(),
        inputTime:Mock.Random.date(),
        'loanAmount|10000-90000.1-2': 1,
        'residualAmount|10000-90000.1-2': 1,
        firstRatio:Mock.Random.integer(0,10 ),
        mark: Mock.Random.integer(0,10 ),
        isnodis: Mock.Random.integer(0,100 )
  }));
}

const history = [
    {
        cols:[
            {title:'催收日期',field:'coldata'},
            {title:'联系方式',field:'contact'},
            {title:'联系人',field:'username'},
            {title:'催收代码',field:'code'},
            {title:'催收结果',field:'colresult'},
            {title:'催收备注',field:'colmark'},
            {title:'约会时间',field:'menttime'},
            {title:'承诺金额',field:'promisemoney'},
            {title:'承诺日期',field:'promisedata'},
            {title:'合同号',field:'contract'},
            {title:'用户ID',field:'userid'},  
        ],
        data:[]
    }

];
for (let i = 0; i < 43; i++) {
    history[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        coldata: Mock.Random.date(),
        contact: Mock.Random.integer(0,10 ),
        username: Mock.Random.cname( ),
        code: Mock.Random.cword(),
        colresult: Mock.Random.cword(0,10),
        colmark:Mock.Random.cword(0,10),
        menttime:Mock.Random.date(),
        'promisemoney|10000-90000.1-2': 1,
        promisedata:Mock.Random.city(),
        contract:Mock.Random.cword(),
        userid:Mock.Random.cword(),
        
  }));
}

export default {
    supervisor: config=>{
        
        const { page,pageSize } =param2Obj(config.url);
        
        
        let mockusupervisor = supervisor[0].data
        console.log(mockusupervisor)
        let total = supervisor[0].data.length;
        mockusupervisor = mockusupervisor.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));

        return {
            result:{
                recordsTotal: total,
                data: mockusupervisor,
               
            }
              
           
          }
    },
    station: config=>{
        
        const { page, pageSize } =param2Obj(config.url);
        
       
        let mockstation = station[0].data
  
        let total = station[0].data.length;
        mockstation = mockstation.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
        console.log(mockstation);
        return  {
            result:{
                recordsTotal: total,
                data: mockstation,
               
            }
           
        }
        
    },
    userstation: config=>{
        
        const { page, name, pagesize } =param2Obj(config.url);
        
        
        let mockuserstation = userstation[0].data.filter(user => {
            
            if (name && user.username.indexOf(name) == -1) return false;
            return true;
          });
          
          let total = userstation[0].data.length;
          mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
           return {
                total: total,
                data: mockuserstation,
                cols: userstation[0].cols
             
           }
    },
    gethistory: config=>{
        
        const { page, name, pagesize } =param2Obj(config.url);
        
      
        let mockusupervisor = history[0].data.filter(user => {
          
          if (name && user.username.indexOf(name) == -1) return false;
          return true;
        });
        
        let total = history[0].data.length;
        mockusupervisor = mockusupervisor.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
        return  {
              total: total,
              data: mockusupervisor,
              cols: history[0].cols
              
          
         }
    },
    getstationtotal: config=>{
        
        const { page,  pagesize } =param2Obj(config.url);
        
        let mockstation = stationtotal[0].data
    
          let total = stationtotal[0].data.length;
          mockstation = mockstation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return  {
                result:{
                    recordsTotal: total,
                    data: mockstation,
                   
                }
               
            }
    },
    userstationtotal: config=>{
        
        const { page, name, pagesize } =param2Obj(config.url);
        
        let mockuserstation = userstationtotal[0].data.filter(user => {
            
            if (name && user.username.indexOf(name) == -1) return false;
            return true;
          });
          
          let total = userstationtotal[0].data.length;
          mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
          return  {
                total: total,
                data: mockuserstation,
                cols: userstationtotal[0].cols
              
            }
    }

}