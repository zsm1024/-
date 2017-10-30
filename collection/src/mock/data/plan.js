import Mock from 'mockjs';


const plan = [
    {
        cols:[
            {title:'还款期号',field:'coldata'},
            {title:'还款日',field:'contact'},
            {title:'月还款额',field:'username'},
            {title:'月应付本金',field:'code'},
            {title:'月应付利息',field:'colresult'},
            {title:'结算金额',field:'colmark'},
            {title:'实际还款日期',field:'menttime'},
            {title:'历史最大逾期天数',field:'promisemoney'},
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    plan[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        coldata: Mock.Random.date(),
        contact: Mock.Random.integer(0,10 ),
        username: Mock.Random.cname( ),
        code: Mock.Random.cword(),
        colresult: Mock.Random.cword(0,10),
        colmark:Mock.Random.cword(0,10),
        menttime:Mock.Random.date(),
        'promisemoney|10000-90000.1-2': 1,
  }));
}

const liushui = [
    {
        cols:[
            {title:'扣款日期',field:'coldata'},
            {title:'扣款金额',field:'contact'},
            {title:'还款人',field:'username'},
            {title:'银行编号',field:'code'},
            {title:'银行账号',field:'colresult'},
            {title:'扣款结果',field:'colmark'},
            {title:'银行备注',field:'menttime'},
            {title:'银行摘要',field:'promisemoney'},
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    liushui[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        coldata: Mock.Random.date(),
        contact: Mock.Random.integer(0,10 ),
        username: Mock.Random.cname( ),
        code: Mock.Random.cword(),
        colresult: Mock.Random.cword(0,10),
        colmark:Mock.Random.cword(0,10),
        menttime:Mock.Random.date(),
        'promisemoney|10000-90000.1-2': 1,
  }));
}

export { plan,liushui };