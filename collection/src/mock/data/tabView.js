import Mock from 'mockjs';
const TabView=[
	{
        cols:[
            {title:'角色',field:'persontype',width:"90"},
            {title:'姓名',field:'name',width:"90"},          
            {title:'电话',field:'phoneNum',width:"130"},
            {title:'信息来源',field:'m_path',width:"100"},
            {title:'有效性',field:'validity',width:"100"},
            
   
        ],
        cols1:[
            {title:'角色',field:'persontype',width:"90"},
            {title:'姓名',field:'name',width:"90"},
            {title:'地址',field:'address',width:"160"},
            {title:'信息来源',field:'m_path',width:"100"},
            {title:'有效性',field:'validity',width:"100"},
   
		],
		baseinfo: [
			{ title: '角色名', field: 'userType', width: "120" },
			{ title: '姓名', field: 'name', width: "120" },
			{ title: '五级分类', field: 'classify', width: "120" },
			{ title: '职业', field: 'occupation', width: "120" },
			{ title: '单位名称', field: 'useraddress', width: "120" },
			{ title: '性别', field: 'sex', width: "120" },
			{ title: '证件类型', field: 'cardType', width: "180"},
			{ title: '证件号码', field: 'cardCode', width: "180"},
			{ title: '出生日期', field: 'birth', width: "120"}
		],
    data:[
    	{
    	"id":1,
    	"statues":"正常催收",
    	"persons":[
    		{"persontype":"主借人","name":"胡家刚","phoneNum":"13464545454","m_path":"WCMS","validity":"Y"},
    		{"persontype":"共借人","name":"胡家刚","phoneNum":"13464545454","m_path":"WCMS","validity":"N"},
    		{"persontype":"担保人","name":"胡家刚","phoneNum":"13464545454","m_path":"CMS","validity":"N"}
		],
		"basedata": [
			{ 'userType': "主借人", 'name': "阿萨德", 'classify': "pass", "occupation": "私营企业雇员", 'sex': '男', 'cardType': '居民身份证', 'cardCode': '130623154684782455', 'birth': '1990-04-02',"useraddress": "资中周汽车销售有限公司" },
			{ 'userType': "共借人", 'name': "梵蒂冈", 'classify': "pass", "occupation": "私营企业雇员", 'sex': '男', 'cardType': '居民身份证', 'cardCode': '130623154684782455', 'birth': '1990-04-02', "useraddress": "资中周汽车销售有限公司" },
			{ 'userType': "担保人", 'name': "下次啊", 'classify': "pass", "occupation": "私营企业雇员", 'sex': '男', 'cardType': '居民身份证', 'cardCode': '130623154684782455', 'birth': '1990-04-02', "useraddress": "资中周汽车销售有限公司" }

		],
    	"address":[
    		{"persontype":"主借人","name":"胡家刚","address":"河北省保定市XXX","m_path":"CMS","validity":"Y"},
    		{"persontype":"共借人","name":"胡家刚","address":"河北省保定市XXX","m_path":"CMS","validity":"Y"},
    		{"persontype":"担保人","name":"胡家刚","address":"河北省保定市XXX","m_path":"ECMS","validity":"Y"}
    	],
    	"username":"马晓华",
    	"sex":"男",
    	"usercardType":"身份证",
    	"usercardNum":"122123245468757434",
    	"delyNum":"Br-A454456454",
    	"contractNum":"CR213211",
    	"ShoufuRatio":"50",
    	"loan":"39000",
    	"startTime":"2013-03-12",
    	"endTime":"2016-05-04",
    	"loanProdut":"等额本息标准产品",
    	"RepayTime":"08",
    	"loanTime":"12",
    	"overdueDate":"2017-09-12",
    	"ThisOverdueDay":"32",
    	"ThisCurrentdDay":"2",
    	"MonthPay":"105.21",
    	"OverTotalMoney":"1024",
    	"OverAccrualTotal":"4.33",
		"MonthRePay":"12",
		"overaccrual":"2.11",
    	"total":"2145",
    	"messages":"您好,我啥上帝视角啦世纪东方金色的开放接口就极为微弱",
    	"remarkMessage":"首付付款然 人阿达历史地理我胃口热裤可莱丝抵扣佛为32134654wer1321放大",
    	"notice":"asdhasdasd"
   	 }
	]
   }
]
export { TabView};