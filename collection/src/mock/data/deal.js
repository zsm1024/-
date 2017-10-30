import Mock from 'mockjs';

const deal = [
    {
        cols:[
            {title:'更新日期',field:'updatedata'},
            {title:'还款人',field:'username'},
            {title:'银行账号',field:'bankid'},
            {title:'银行名称',field:'bankname'},
            {title:'支行名称',field:'subbank'},
            
        ],
        details: [
            {
               hth: "CR294637",
               htzt:"Default-Collection Officer",
               dkcp: "百灵-广宣广本促销测试长度 GHAC 07/2014",
               htqsrq: "2014-07-08",
               htzzrq: "2015-08-08",
               htcjrq: "2014-07-08",
               htqsrq: "2014-09-09",
               dkje: '674000',
               dkqs: 13,
               sfbl:50,
               ll:11.69,
               dkye:70880.26,
               ychbj:0,
               sybjze:67400,
               wdqbj:67379.45,
               dqlxzj:252.75,
               fx:0.66,
               ssf:0,
               scf:0,
               wccsgbf:200,
               fkr:"08",
               zjychkje:67400,
               zjychkrq:"2014-07-09",
               bcyqts:5,
               bqyqts:5,
               yqyskzj:678080,
               hxzt:"未核销",
               sf:"安徽",
               cs:"巢湖"

            }
        ],
        data: [{
            id: 1,
            updatedata: '2016-02-08',
            username: '测试',
            bankid: '1111 1111 1111 1111',
            bankname: '中国工商银行',
            subbank: '工行支行',
            
        },
        {
            id: 1,
            updatedata: '2016-10-08',
            username: '测试111',
            bankid: '1111 1111 1111 1111',
            bankname: '中国建设银行',
            subbank: '建行支行',
        }]
    }

    
];

export { deal };