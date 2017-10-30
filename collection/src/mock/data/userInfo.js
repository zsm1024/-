import Mock from 'mockjs';
const userInfo=[
	{
		baseinfo:[
            {title:'角色名',field:'userType',width:"120"},
            {title:'姓名',field:'name',width:"120"},
            {title:'五级分类',field:'classify',width:"120"},
            {title:'职业',field:'occupation',width:"120"},
            {title:'性别',field:'sex',width:"120"},
            {title:'证件类型',field:'cardType',width:"180"},
            {title:'证件号码',field:'cardCode',width:"180"},
            {title:'出生日期',field:'birth',width:"120"}          
        ],
		basedata:[
			{'userType':"主借人",'name':"阿萨德",'classify':"pass","occupation":"私营企业雇员",'sex':'男','cardType':'居民身份证','cardCode':'130623154684782455','birth':'1990-04-02'},
			{'userType':"共借人",'name':"梵蒂冈",'classify':"pass","occupation":"私营企业雇员",'sex':'男','cardType':'居民身份证','cardCode':'130623154684782455','birth':'1990-04-02'},
			{'userType':"担保人",'name':"下次啊",'classify':"pass","occupation":"私营企业雇员",'sex':'男','cardType':'居民身份证','cardCode':'130623154684782455','birth':'1990-04-02'}
	
		],
		phoneinfo:[
            {title:'角色名',field:'userType',width:"120"},
            {title:'姓名',field:'name',width:"120"},
            {title:'电话类型',field:'phonetype',width:"120"},
            {title:'区号',field:'Area code',width:"120"},
            {title:'电话号码(CMS)',field:'phoneNum',width:"120"},           
        ],
		phonedata:[
			{'userType':"主借人",'name':"阿萨德",'phonetype':"手机","Area code":"86",'phoneNum':'13645641124'},
			{'userType':"共借人",'name':"梵蒂冈",'phonetype':"手机","Area code":"86",'phoneNum':'13645641124'},
			{'userType':"担保人",'name':"下次啊",'phonetype':"手机","Area code":"86",'phoneNum':'13645641124'}
	
		],
		addressinfo:[
            {title:'角色名',field:'userType',width:"60"},
            {title:'姓名',field:'name',width:"60"},
            {title:'地址类型',field:'addresstype',width:"60"},
            {title:'联系地址',field:'address',width:"200"},
            {title:'邮编',field:'postcode',width:"60"}, 
            {title:'省份',field:'prov',width:"60"},
            {title:'城市',field:'city',width:"60"},
            
        ],
		addressdata:[
			{'userType':"主借人",'name':"阿萨德",'addresstype':"手机","address":"啥都好说打上了打卢克啊三点了",'postcode':'074100','prov':'河北省','city':'保定市'},
			{'userType':"主借人",'name':"阿萨德",'addresstype':"手机","address":"啥都好说打上了打卢克啊三点了",'postcode':'074100','prov':'河北省','city':'保定市'},
			{'userType':"主借人",'name':"阿萨德",'addresstype':"手机","address":"啥都好说打上了打卢克啊三点了",'postcode':'074100','prov':'河北省','city':'保定市'},
	
		],
		
		
	}



]
export {userInfo}
