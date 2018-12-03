import Mock from 'mockjs'
import { param2Obj } from '@/utils'
 const TabView=[
	 {   
    result:[
    	{
    	"id":1,
    	"statues":"正常催收",
    	"customerPhones":[
            { "id": "1","phone": "1388888888", "infoSource": "WCMS","effectiveness": "Y","phoneType": "手机","relationship": "本人","phoneNum": "正常","lastTime": "2017-11-22 17:00:00","name": "张三","roleName": "主借人", "afpId": null},
           { "id": "1","phone": "1388888888", "infoSource": "WCMS","effectiveness": "Y","phoneType": "手机","relationship": "本人","phoneNum": "正常","lastTime": "2017-11-22 17:00:00","name": "张三","roleName": "主借人", "afpId": null},
           { "id": "1","phone": "1388888888", "infoSource": "CMS","effectiveness": "Y","phoneType": "手机","relationship": "本人","phoneNum": "正常","lastTime": "2017-11-22 17:00:00","name": "张三","roleName": "主借人", "afpId": null},
		],
		"customerSimpleList": [
            {"roleName": "主借人","name": "张三","pinyin": "zhangsan","occupation": "私营企业雇员","unitName": "单位名称","sex": "男","documentType": "证件类型","documentNum": "证件号码","birthDate": "出生日期" },
            {"roleName": "主借人","name": "张三","pinyin": "zhangsan","occupation": "私营企业雇员","unitName": "单位名称","sex": "男","documentType": "证件类型","documentNum": "证件号码","birthDate": "出生日期" },{"roleName": "主借人","name": "张三","pinyin": "zhangsan","occupation": "私营企业雇员","unitName": "单位名称","sex": "男","documentType": "证件类型","documentNum": "证件号码","birthDate": "出生日期" },
			

		],
    	"customerAddresses":[
            { "id": "1","address": "地址","infoSource": "CMS", "effectiveness": "Y","name": "张三","roleName": "主借人","relationship": "本人","addressType": "家庭","afpId": null},
            { "id": "1","address": "地址","infoSource": "WCMS", "effectiveness": "Y","name": "张三","roleName": "主借人","relationship": "本人","addressType": "家庭","afpId": null},
            { "id": "1","address": "地址","infoSource": "CMS", "effectiveness": "N","name": "张三","roleName": "主借人","relationship": "本人","addressType": "家庭","afpId": null},
        ],
    //合同基本信息部分
        "appNum":"Br-A454456454",
        "applicationNumber":"CR213211",
        "firstRatio":"50",
        "loanAmount":"39000",
        "startTime":"2013-03-12",
        "loanProducts":"等额本息标准产品",
        "datePayment":"12",
        "loanNum":"8",
        "endTime":"2016-05-04",
    //逾期基本信息
        "overdueDate":"2017-09-12",
        "overdueDays":"32",
        "overdueDaysperiod":"2",
        "monthlyRepayment":"105.21",
        "sumOverdue":"1024",
        "totalDue":"4.33",
        "MonthRePay":"12",
        "overdueInterest":"2.11",
        "overdueTotal":"2145",
        //缺少et结算金额
        "ET" :"1234",
    //备注信息部分
        "remarks":"asdhasdasd",
       
   	 }
	]
   }
]
const deal = [  
   {     
        result: [
            {
                applicationNumber: "CR294637",
                state:"Default-Collection Officer",
                loanProducts: "百灵-广宣广本促销测试长度 GHAC 07/2014",
                startTime: "2014-07-08",
                endTime: "2015-08-08",
                creteTime: "2014-07-08",
                signTime: "2014-09-09",
                loanAmount: '674000',
                loanNum: 13,
                firstRatio:50,
                interstRate:11.69,
                loanBalance:70880.26,
                paidPrincipal:0,
                residualAmount:67400,
                outstandingPrincipal:67379.45,
                interestDue:252.75,
                penalty:0.66,
                litigationFee:0,
                collectFare:0,
                withoutFee:200,
                datePayment:"08",
               latestRepayment:67400,
               latestDate:"2014-07-09",
               overdueDays:5,
               numberOverdue:5,
               overdueReceivables:678080,
               hxzt:"未核销",
               province:"安徽",
               city:"巢湖",
               contractBanks:[
                {
                    id: 1,
                    updateTime: '2016-02-08',
                    repayments: '测试',
                    bankAccount: '1111 1111 1111 1111',
                    bankName: '中国工商银行',
                    bankBranch: '工行支行',
                    
                },
                {
                    id: 1,
                    updateTime: '2016-10-08',
                    repayments: '测试111',
                    bankAccount: '1111 1111 1111 1111',
                    bankName: '中国建设银行',
                    bankBranch: '建行支行',
                }
               ]
            },
        ],
    }

   
];


const TabMessage = [
    {        
        afpInfoSimples:[
              {
                  "afpDate":"2013-03-12 15:24:54",
                  "linkInfomation":"手机",                 
                  "linkman":"借款人",                 
                  'afpSign':"TC",
                  'afpSignExplain':"电话催收",            
                  'appointmentTime':"2013-03-12 15:24:54",
                  'allowance':"1000",
                  'allDate':"2014-03-12",
                  'username':"Nick",                 
                  "afpRecord":"顾客要求推迟10天还款",
                  
              }	,
              {
                "afpDate":"2013-03-12 15:24:54",
                "linkInfomation":"手机",                 
                "linkman":"借款人",                 
                'afpSign':"TC",
                'afpSignExplain':"电话催收",            
                'appointmentTime':"2013-03-12 15:24:54",
                'allowance':"1000",
                'allDate':"2014-03-12",
                'username':"Nick",                 
                "afpRecord":"顾客要求推迟10天还款",	        	
              }	
          ],
        "remarks":"是点击发动机而我日是，阿萨德卡萨我IE哦i",
        "updateDate":"2013-03-12 15:24:54",
        "username":"Nick",
        afpTrajectories:[
   
              {"UserId":"Nick","Actual_person":"","Custodian":"","Task":"PC_LO_RISK","Task_name":"逾期15天之前的催收队列","post":"外包电催主任","Creation_time":"2014-08-13 08:19:27","Close_date":""},
                   
              {"UserId":"Nick","Actual_person":"qwe","Custodian":"cxvd","Task":"PC_LO_RISK","Task_name":"逾期15天之前的催收队列","post":"外包电催主任","Creation_time":"2014-08-13 08:19:27","Close_date":"2014-08-13 08:19:27"},
          ],
          afpActions:[            
                   {"username":"Nick","actSign":"qwe","actSignNotes":"cxvd","inputTime":"014-08-13 08:19:27"},

         ]
          
          
          
    }
  ];
const plan = [
    {      
        data:[
           

            
        ]
    }

];
for (let i = 0; i < 12; i++) {
    plan[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        dueDate: Mock.Random.date(),
        repaymentPeriod: Mock.Random.integer(0,10 ),
        'username|10000-90000.1-2': 1,
        'repaymentInterest|10000-90000.1-2': 1,
        'monthly|10000-90000.1-2': 1,
        'compoundAmount|10000-90000.1-2': 1,
        'menttime|10000-90000.1-2': 1,
        'promisemoney|10000-90000.1-2': 1,
        'noPrincipal|10000-90000.1-2': 1,
        'onemoney|10000-90000.1-2': 1,
        shenfen: Mock.Random.cname(),
        actualDay: Mock.Random.date(),
        overdueDays: Mock.Random.integer(0,10 ),
  }));
}

// const plantwo = [
//     {
//         cols:[
//             {title:'到期日',field:'coldata'},
//             {title:'还款期数',field:'contact'},
//             {title:'未尝本金',field:'username'},
//             {title:'还款本金额',field:'code'},
//             {title:'还款利息额',field:'colresult'},
//             {title:'月息',field:'colmark'},
//             {title:'复合利息金额',field:'menttime'},
//             {title:'净还款金额',field:'promisemoney'},
//             {title:'杂费',field:'onemoney'},
//             {title:'已付款总额',field:'shenfen'},
//             {title:'未承兑/取消',field:'trueday'},
//             {title:'实际还款日',field:'yuqiday'},
//             {title:'逾期天数',field:'yuqideday'},
//         ],
//         data:[]
//     }

// ];
// for (let i = 0; i < 12; i++) {
//     plantwo[0].data.push(Mock.mock({
//         id: Mock.Random.guid(),
//         coldata: Mock.Random.date(),
//         contact: Mock.Random.integer(0,10 ),
//         'username|10000-90000.1-2': 1,
//         'code|10000-90000.1-2': 1,
//         'colresult|10000-90000.1-2': 1,
//         'colmark|10000-90000.1-2': 1,
//         'menttime|10000-90000.1-2': 1,
//         'onemoney|10000-90000.1-2': 1,
//         'promisemoney|10000-90000.1-2': 1,
//         'onemoney|10000-90000.1-2': 1,
//         'shenfen|10000-90000.1-2': 1,
//         trueday: "",
//         yuqiday: Mock.Random.date(),
//         yuqideday: Mock.Random.integer(0,10 ),
//   }));
// }

const liushui = [
    {
        cols:[
            {title:'扣款日期',field:'chargebackDate'},
            {title:'扣款金额',field:'amount'},
            {title:'还款人',field:'repayments'},
            {title:'银行编号',field:'bankNumber'},
            {title:'银行账号',field:'bankAccount'},
            {title:'扣款结果',field:'debitResults'},
            {title:'银行备注',field:'bankNotes'},
            {title:'银行摘要',field:'bankAbstracts'},
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++){
    liushui[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        chargebackDate: Mock.Random.date(),
        bankAbstracts: Mock.Random.integer(0,10 ),
        bankNumber: "1111 1111 1111 1111",
        repayments: Mock.Random.cname( ),
        bankAccount:Mock.Random.cword(0,10),
        bankNotes:Mock.Random.cword(0,10),
        debitResults:'成功',
       
        'amount|10000-90000.1-2': 1,
  }));
}

const cmshistory = [
    {
        // cols:[
        //     {title:'处理日期',field:'processingDate'},
        //     {title:'催收结果',field:'collectionResults'},
        //     {title:'承诺日期',field:'commitmentDate'},
        //     {title:'复催日期',field:'recoveryDate'},
        //     {title:'处理人',field:'handlePerson'},
        //     {title:'承诺金额',field:'amountCommitment'},
        //     {title:'实地状态',field:'fieldStatus'},
        //     {title:'实地日期',field:'fieldDate'},
        //     {title:'特殊案件标识',field:'specialIdentification'},
        //     {title:'代购标识',field:'purchasingLabel'},
        //     {title:'代购人姓名',field:'nameAgent'},
        //     {title:'代购人身份证',field:'purchasingId'},
        //     {title:'崔收备注',field:'afpRecord'},
        //     {title:'特殊备注',field:'spRecord'},
           
        // ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    cmshistory[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        processingDate: Mock.Random.date(),
        collectionResults: Mock.Random.integer(0,10 ),
        commitmentDate: Mock.Random.cname( ),
        recoveryDate: Mock.Random.cword(),
        handlePerson: Mock.Random.cword(0,10),
        fieldStatus:Mock.Random.cword(0,10),
        fieldDate:Mock.Random.date(),
        'amountCommitment|10000-90000.1-2': 1,
        specialIdentification: Mock.Random.date(),
        purchasingLabel: Mock.Random.integer(0,10 ),
        nameAgent: Mock.Random.cname( ),
        purchasingId: Mock.Random.cword(),
        afpRecord: Mock.Random.cword(0,10),
        spRecord:Mock.Random.cword(0,10),
        tsbz:Mock.Random.date(),
  }));
}


const cmsdetails = [
    {
        cols:[
            {title:'费用描述',field:'costDescription'},
            {title:'费用总计',field:'totalCost'},
            {title:'豁免%',field:'exemption'},
            {title:'豁免额',field:'exemptionAmount'},
            {title:'核销额',field:'writeAmount'},
            {title:'到期金额',field:'dueAmount'},
            {title:'豁免日期',field:'exemptionDate'},
            {title:'豁免人',field:'exemptionUser'},
           
           
        ],
        data:[]
    }

];
for (let i = 0; i < 12; i++) {
    cmsdetails[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        costDescription: Mock.Random.date(),
        totalCost: Mock.Random.integer(0,10 ),
        exemption: Mock.Random.cname( ),
        exemptionUser: Mock.Random.cword(),
        writeAmount: Mock.Random.cword(0,10),
        dueAmount:Mock.Random.cword(0,10),
        exemptionDate:Mock.Random.date(),
        'exemptionAmount|10000-90000.1-2': 1,
        
       
  }));
}
const repairlist=[
    {
data:[
    { 
        "id":"01",
        "serviceName":"河北保定五洲汽车服务有限公司xxxxxxx" ,
        "serviceCity":"河北省保定市",
        "serviceAddress":"河北省保定市莲池区朝阳南路xxxxxx",
        "servicePhone":"459622158",
        'RepairName':"刘永明",
        'Repairphone':"13436695845",
        'Repairtype':"机修",
        'incomingTime': "2017-03-12",
        'factoryTime': "2017-08-12",
    },
    { 
        "id":"02",
        "serviceName":"河北保定五洲汽车服务有限公司xxxxxxx" ,
        "serviceCity":"河北省保定市",
        "serviceAddress":"河北省保定市莲池区朝阳南路xxxxxx",
        "servicePhone":"459622158",
        'RepairName':"刘永明",
        'Repairphone':"13436695845",
        'Repairtype':"机修",
        'incomingTime': "2017-03-12",
        'factoryTime': "2017-08-12",
    },

]
} 
]
const repair=[
    {                  
            "carInfo":{
                car:"车系",
                chassisNumber: "底盘号",
                createTime:"2017-11-27 13:40:59",
                dateCarPurchase:"购车日期",
                dateCertification :"领证日期",
                engineNumber:"发动机号",
                firstArrivalDate:"首次来厂日期",
                firstDate :"首保日期",
                firstReception:"首期接待",
                firstShop:"首次到店",
                id:1,
                installationExplanation:"installation_explanation",
                labelInfo:"厂牌",
                latestRepairDate:"最近修理日期",
                latestShop:"最近到店",
                licensePlate:"车牌号",
                nextMaintenanceDate:"下期保养日期",
                nextMaintenanceMileage:"下次保养里程",
                updateTime:"2017-11-27 13:40:59",
                vehicleColor: "车辆颜色",
                },                            
             "customerBasic":{
                    afpId:"1",
                    birthDate:"出生日期",
                    city:"所在城市",
                    counties:"所在区县",
                    createDate:"创建日期",
                    createTime:"2017-11-27 13:40:59",
                    cusId:null,
                    documentNum:"证件号码",
                    documentType:"证件类型",
                    education: "学历",
                    email:"电子邮箱",
                    familyStructure:"家庭结构",
                    fiveType: "1",
                    hobby:"客户爱好",
                    homePhone:"家庭电话",
                    id:1,
                    industry:"所在行业",
                    monthlyIncome:"月收入",
                    name:"张三",
                    nation:"民族",
                    objective:"购车目的",
                    occupation:"私营企业雇员",
                    officePhone:"办公电话",
                    personCharge:"负责人",
                    personChargeAddress:"负责人地址",
                    personChargePosition:"负责人职位",
                    position:"职位",
                    province:"所在省份",
                    qq:"QQ号码",
                    roleName:"主借人",
                    sex:"男",
                    unitName:"单位名称",
                    updateDate:"更新日期",
                    updateTime:"2017-11-27 13:40:59",
                    wechat:"微信号", 
                },                
             "maintenanceRecord":{                   
                    createTime:"2017-11-27 13:40:59",
                    cumulativeMileage:"累计里程",
                    factoryTime:"出厂时间",
                    faultDescription:"故障描述",
                    homeServiceDate:"上门服务日期",
                    id:1,
                    incomingTime:"进厂时间",
                    preliminaryDiagnosis:"初步诊断",
                    repairCategory:"修理类别",
                    rescue:"是否救援",
                    serviceAddress: "服务站地址",
                    serviceCity:"服务站城市",
                    serviceEndTime:"服务结束时间",
                    serviceName: "服务站名称",
                    servicePhone:"服务站电话",
                    serviceStartTime:"服务开始时间",
                    serviceType:"服务类型",
                    updateTime:"2017-11-27 13:40:59"

                 },
            "maintenanceRepairInfo":{
                    address:"地址",
                    birthDate:"出生日期",
                    city: "城市",
                    counties:"区县",
                    createTime:"2017-11-27 13:40:59",
                    driverNum:"驾驶证号",
                    homePhone:"家庭电话",
                    id:1,
                    idNumber:"身份证号",
                    maintenanceId:"1",
                    nation:"民族",
                    officePhone:"办公电话",
                    phone:"手机号码",
                    province:"省",
                    repairName:"送修人姓名",
                    sex:"性别",
                    updateTime:"2017-11-27 13:40:59" ,
                 }                                   
            },          
]
export default {
    tab_view: config=>{
        return {           
         result:TabView[0].result[0]
        };

    },
    addInfo: config=>{
        return {success:"true"};
        
    },
    addAddress: config=>{
        return {success:"true"};
        
    },
    deal: config=>{

        return  {         
                result:deal[0].result[0]                       
            //   cols: deal[0].cols,
            //   details:deal[0].details[0]
          }
        
    },
    tab_message: config=>{     
        return {
            result:TabMessage
        
        };
    },
    // userinfo: config=>{
    //     return {msg:userInfo};
        
    // },
    plan: config=>{
        let {page, missionId, pageSize} = param2Obj(config.url);              
        let total = plan[0].data.length;
        let mockplan = plan[0].data.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
         return {
            //   total: total,
                result:{                  
                    fixed:{
                        data:mockplan,
                        isFixed:0,
                    }
   
                }
             

           
            //   cols: plan[0].cols                         
          }        
    },
    // two: config=>{
    //     let {page, name, pagesize} = param2Obj(config.url);
    //     let total = plantwo[0].data.length;
    //     let mockplan = plantwo[0].data.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
    //      return {
    //           total: total,
    //           data: mockplan,
    //           cols: plantwo[0].cols
              
           
    //       }
        
    // },
    liushui: config=>{
        
        let {page, pageSize} = param2Obj(config.url);
        
        
        let total = liushui[0].data.length;
        let mockplan = liushui[0].data.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
        return  {
       
                result:{
                    recordsTotal: total,
                    data: mockplan,
                    cols: liushui[0].cols
                }
         

          
           
            
          }
    },
    cmsdetails: config=>{
        let {page, pageSize} = param2Obj(config.url);
        let totaldetail = cmshistory[0].data.length;
        let mockplandetail = cmshistory[0].data.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
        
        let total = cmsdetails[0].data.length;
        let mockdetail = cmsdetails[0].data.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
        return {
            result:{
                CmsHistory:{
                    length: totaldetail,
                    data: mockplandetail,
                    cols: cmshistory[0].cols
                },
                cutDelInfo:{
                    length: total,
                    data: mockdetail,
                    cols: cmsdetails[0].cols
                }
            }
              
              
        }
        
    },
    cmshistory: config=>{
        let {page,  pageSize} = param2Obj(config.url);
        
        
        let total = cmshistory[0].data.length;
        let mockplan = cmshistory[0].data.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
        return  {
            result:{
                CmsHistory:{
                    length: total,
                    data: mockplan,
                    cols: cmshistory[0].cols
                }
            }
              
         
        };
        
    },
    repairlist: config=>{
        let {page,pagesize,missionId} = param2Obj(config.url);                    
         let repairlists = repairlist.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
         return  {

                 result: repairlist[0],

            
            //    cols: repair[0].Maintenance
            
         };
        
    },
    repair: config=>{
        let {page, pagesize,missionId} = param2Obj(config.url);   
      return  {
           result:repair[0]
          
        };
        
    },

}