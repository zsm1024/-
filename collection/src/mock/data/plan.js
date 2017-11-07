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
for (let i = 0; i < 12; i++){
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

const cmshistory = [
    {
        cols:[
            {title:'处理日期',field:'coldata'},
            {title:'催收结果',field:'contact'},
            {title:'承诺日期',field:'username'},
            {title:'复催日期',field:'code'},
            {title:'处理人',field:'colresult'},
            {title:'承诺金额',field:'colmark'},
            {title:'实地状态',field:'sdzt'},
            {title:'实地日期',field:'sdrq'},
            {title:'特殊案件标识',field:'tsajbz'},
            {title:'代购标识',field:'dgbz'},
            {title:'代购人姓名',field:'dgrxm'},
            {title:'代购人身份证',field:'dgrsfz'},
            {title:'崔收备注',field:'csbz'},
            {title:'特殊备注',field:'tsbz'},
           
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    cmshistory[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        coldata: Mock.Random.date(),
        contact: Mock.Random.integer(0,10 ),
        username: Mock.Random.cname( ),
        code: Mock.Random.cword(),
        colresult: Mock.Random.cword(0,10),
        colmark:Mock.Random.cword(0,10),
        menttime:Mock.Random.date(),
        'promisemoney|10000-90000.1-2': 1,
        sdzt: Mock.Random.date(),
        sdrq: Mock.Random.integer(0,10 ),
        tsajbz: Mock.Random.cname( ),
        dgbz: Mock.Random.cword(),
        dgrxm: Mock.Random.cword(0,10),
        csbz:Mock.Random.cword(0,10),
        tsbz:Mock.Random.date(),
  }));
}


const cmsdetails = [
    {
        cols:[
            {title:'费用描述',field:'coldata'},
            {title:'费用总计',field:'contact'},
            {title:'豁免%',field:'username'},
            {title:'豁免额',field:'code'},
            {title:'核销额',field:'colresult'},
            {title:'到期金额',field:'colmark'},
            {title:'豁免日期',field:'sdzt'},
            {title:'豁免人',field:'sdrq'},
           
           
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    cmsdetails[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        coldata: Mock.Random.date(),
        contact: Mock.Random.integer(0,10 ),
        username: Mock.Random.cname( ),
        code: Mock.Random.cword(),
        colresult: Mock.Random.cword(0,10),
        colmark:Mock.Random.cword(0,10),
        sdrq:Mock.Random.date(),
        'promisemoney|10000-90000.1-2': 1,
        sdzt: Mock.Random.date(),
       
  }));
}
export { plan,liushui,cmsdetails,cmshistory };