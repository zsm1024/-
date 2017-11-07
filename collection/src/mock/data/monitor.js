import Mock from 'mockjs';

const stationtotal = [
    {
        cols:[
            {title:'岗位名称',field:'stationname'},
            {title:'数量',field:'num'},
        ],
           
        data: [{
            id: 1,
            stationname: '前期电催岗（2-5）天',
            num: 80,
        },
        {
            id: 2,
            stationname: '后期电催岗（2-5）天',
            num: 75,
        }]
    }

    
];

const userstationtotal = [
    { 
        cols:[
            {title:'用户名称',field:'username'},
            {title:'数量',field:'num'},
          
        ],
        data:[]
    }

];
for (let i = 0; i < 43; i++) {
    userstationtotal[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        num: Mock.Random.integer(0,100),
      
  }));
}

const station = [
    {
        cols:[
            {title:'岗位名称',field:'stationname'},
            {title:'队列名称',field:'queuename'},
            {title:'数量',field:'num'},
            {title:'逾期应收款总计',field:'overduerec'},
            {title:'剩余总金额',field:'surplustotalmoney'},
            {title:'已处理',field:'isdispose'},
            {title:'未处理',field:'isnodispose'},
        ],
           
        data: [{
            id: 1,
            stationname: '前期电催岗（2-5）天',
            queuename: '前期电催队列（2-10）天',
            num: 80,
            overduerec: '￥540729.36',
            surplustotalmoney: '￥5252368.81',
            isdispose:0,
            isnodispose:65
        },
        {
            id: 2,
            stationname: '后期电催岗（2-5）天',
            queuename: '后期电催队列（2-10）天',
            num: 75,
            overduerec: '￥640729.36',
            surplustotalmoney: '￥6252368.81',
            isdispose:1,
            isnodispose:90
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
        username: Mock.Random.cname(),
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
            {title:'未尝本金',field:'unpaidmoney'},
            {title:'首付比例',field:'firstscale'},
            {title:'承诺兑现标示',field:'mark'},
            {title:'核销状态',field:'isnodis'},
            
        ],
        data:[]
    }



];


for (let i = 0; i < 43; i++) {
    supervisor[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        career: Mock.Random.word(),
        overday: Mock.Random.integer(0,10 ),
        'overmoney|10000-90000.1-2': 1,
        dealer: Mock.Random.cword(),
        product: Mock.Random.cword(),
        carmodels:Mock.Random.cword(),
        contractnum:Mock.Random.cword(),
        province:Mock.Random.province(),
        city:Mock.Random.city(),
        code:Mock.Random.cword(),
        postid:Mock.Random.cword(),
        process:Mock.Random.cname(),
        userid:Mock.Random.cword(),
        neartime:Mock.Random.date(),
        'loanmoney|10000-90000.1-2': 1,
        'unpaidmoney|10000-90000.1-2': 1,
        firstscale:Mock.Random.integer(0,10 ),
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

export { station,userstation,supervisor,history,stationtotal,userstationtotal };