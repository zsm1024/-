import Mock from 'mockjs';

const station = [
    {
        id: 1,
        queuename: '前期电催队列（2-10）天',
        stationname: '前期电催岗（2-5）天',
        num: 80,
        overduerec: '￥540729.36',
        surplustotalmoney: '￥5252368.81',
        isdispose:0,
        isnodispose:65
    },
    {
        id: 2,
        queuename: '后期电催队列（2-10）天',
        stationname: '后期电催岗（2-5）天',
        num: 75,
        overduerec: '￥640729.36',
        surplustotalmoney: '￥6252368.81',
        isdispose:1,
        isnodispose:90
    }
];
const userstation = [];
for (let i = 0; i < 43; i++) {
    userstation.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        num: Mock.Random.integer(0,100),
        'overduerec|10000-90000.1-2': 1,
        'surplustotalmoney|10000-90000.1-2': 1,
        isdispose: Mock.Random.integer(0,10 ),
        isnodispose: Mock.Random.integer(0,100 )
  }));
}

const supervisor = [];


for (let i = 0; i < 43; i++) {
    supervisor.push(Mock.mock({
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

const history = [];
for (let i = 0; i < 43; i++) {
    history.push(Mock.mock({
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

export { station,userstation,supervisor,history };