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


export { station,userstation };