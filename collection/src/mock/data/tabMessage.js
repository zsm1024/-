import Mock from 'mockjs';
const TabMessage = [
  {
  	  cols:[
            {title:'序号',field:'Serial_num',width:"70"},
            {title:'催收日期',field:'Collection_date',width:"190"},
            {title:'联系方式',field:'Contact_info',width:"130"},
            {title:'联系人',field:'users',width:"90"},
            {title:'催收代码',field:'collection_code',width:"100"},
            {title:'催收结果',field:'collection_result',width:"100"},
            {title:'催收备注',field:'collection_marks',width:"130"},
            {title:'约会时间',field:'date_time',width:"190"},
            {title:'承诺金额',field:'amount_commitment',width:"100"},
            {title:'承诺日期',field:'commitment_date',width:"190"},
            {title:'合同号',field:'contract_num',width:"100"},
            {title:'用户ID',field:'user_id',width:"100"},          
   
        ],
       
        data:[
        	{
	        	"Serial_num":1,
	        	"Collection_date":"2013-03-12 15:24:54",
	        	"Contact_info":"手机",
	        	"users":"借款人",
	        	'collection_code':"TC",
	        	'collection_result':" ",
	        	'collection_marks':"电话催收",
	        	'date_time':"2013-03-12 15:24:54",
	        	'amount_commitment':"1000",
	        	'commitment_date':"2014-03-12",
	        	'contract_num':"CR01240",
	        	'user_id':"Nick",
	        	"content_msg":"顾客要求推迟10天还款",
	        	
        	}	,
        	{
	        	"Serial_num":1,
	        	"Collection_date":"2013-03-12 15:24:54",
	        	"Contact_info":"手机",
	        	"users":"借款人",
	        	'collection_code':"TC",
	        	'collection_result':" ",
	        	'collection_marks':"电话催收",
	        	'date_time':"2013-03-12 15:24:54",
	        	'amount_commitment':"1000",
	        	'commitment_date':"2014-03-12",
	        	'contract_num':"CR01240",
	        	'user_id':"Nick",
	        	"content_msg":"顾客要求推迟10天还款",	        	
        	}	
        ],
        marks:[
        	{
        	title:[
	        		{"title":"备注内容",field:"content",width:"60%"},
	        		{"title":"创建时间",field:"created_time",width:"20%"},
	        		{"title":"用户ID",field:"userId",width:"10%"}
        		],
        	msg:[
        			{"content":"是点击发动机而我日是，阿萨德卡萨我IE哦i","created_time":"2013-03-12 15:24:54","userId":"Nick"},
        		]
        	}
        	
        ],
        path:[
        	{
        		title:[
	            {"title":'序号',field:'nums',width:"70"},
	            {"title":'用户ID',field:'UserId',width:"70"},
	            {"title":'实际处理人',field:'Actual_person',width:"80"},
	            {"title":'代管人',field:'Custodian',width:"90"},
	            {"title":'任务队列',field:'Task',width:"100"},
	            {"title":'队列名称',field:'Task_name',width:"170"},
	            {"title":'岗位',field:'post',width:"130"},
	            {"title":'创建时间',field:'Creation_time',width:"190"},
	            {"title":'关闭日期',field:'Close_date',width:"190"},                   
        		],
        		
        msgs:[      						{"nums":1,"UserId":"Nick","Actual_person":"","Custodian":"","Task":"PC_LO_RISK","Task_name":"逾期15天之前的催收队列","post":"外包电催主任","Creation_time":"2014-08-13 08:19:27","Close_date":""},
        						{"nums":2,"UserId":"Nick","Actual_person":"qwe","Custodian":"cxvd","Task":"PC_LO_RISK","Task_name":"逾期15天之前的催收队列","post":"外包电催主任","Creation_time":"2014-08-13 08:19:27","Close_date":"2014-08-13 08:19:27"},

        		]	
        	}   
        ],
       activeCode:[
					{
						title:[
	            {"title":'序号',field:'nums',width:"70"},
	            {"title":'用户ID',field:'UserId',width:"70"},
	            {"title":'行动代码',field:'active',width:"80"},
	            {"title":'行动代码注释',field:'resove',width:"120"},
	            {"title":'录入时间',field:'addTime',width:"120"},	                            
        		],
        		data:[ {"nums":1,"UserId":"Nick","active":"qwe","resove":"cxvd","addTim":"014-08-13 08:19:27"},
	
        		]

					}

       ]
        
        
        
  }
];


export { TabMessage };