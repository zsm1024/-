import Mock from 'mockjs';
const repair=[
    {
        Maintenance:[                    
            { title: '服务站名称', field: 'Storename' },
            { title: '服务站城市', field: 'Storecity' },
            { title: '服务站地址', field: 'StoreAddress' },
            { title: '服务站电话', field: 'Storephone' },
            { title: '送修人', field: 'RepairName' },
            { title: '送修人手机号', field: 'Repairphone' },
            { title: '修理类别', field: 'Repairtype' },
            { title: '进厂时间', field: 'Incomingtime' },
            { title: '出厂时间', field: 'Factorytime' },
        ],
        data:[
            {
            "id":"01",
            "Storename":"河北保定五洲汽车服务有限公司xxxxxxx" ,
            "Storecity":"河北省保定市",
            "StoreAddress":"河北省保定市莲池区朝阳南路xxxxxx",
            "Storephone":"459622158",
            'RepairName':"刘永明",
            'Repairphone':"13436695845",
            'Repairtype':"机修",
            'Incomingtime': "2017-03-12",
            'Factorytime': "2017-08-12",
            "carInfo":[
                { title: '车牌号', field: '鲁BU5E62' },
                { title: '厂牌', field: '长城' },
                { title: '底盘号', field: 'LGWEF3A53CF119444' },
                { title: '车系', field: 'H6' },
                { title: '发动机号', field: 'SLX1513' },
                { title: '车辆颜色', field: '雅致银' },
                { title: '购车日期', field: '2017-02-14' },
                { title: '领证日期', field: '2012-02-14' },
                { title: '首保日期', field: '2015-03-14' }, 
                { title: '首次接待', field: '孙艳' },
                { title: '下次保养日期', field: '2017-03-27' },
                { title: '下次保养里程', field: '41000' },
                { title: '首次来厂日期', field: '2017-06-15' }, 
                { title: '最近修理日期', field: '2017-07-15' }, 
                { title: '首次到店', field: '41000' },
                { title: '最近到店', field: '2017-06-15' },
                { title: '加装说明', field: '奥术大师多请问我小窗口从上课文在笑口常开阿伟去玩了看情况外科' },                
             ],
             "userInfo":[
                 { title: '客户姓名', field: '刘永明' },
                 { title: '车辆数', field: '1' },
                 { title: '性别', field: '男' },
                 { title: '民族', field: '汉族' },
                 { title: '所在省份', field: '河北省' },
                 { title: '所在城市', field: '保定市' },
                 { title: '所在区县', field: 'xxx' },
                 { title: '所在行业', field: '机械设计与制造' },
                 { title: '购车目的', field: '自用' },
                 { title: '出生日期', field: '1980-12-01' },
                 { title: '证件类型', field: '身份证' },
                 { title: '证件号码', field: '130629154844155548' },
                 { title: '手机', field: '13436698978' },
                 { title: '家庭电话', field: '0312-4598554' },
                 { title: '地址', field: '荣成市宁津办事处东墩村151号' },
                 { title: '办公电话', field: '0312-4578155' },
                 { title: 'QQ号码', field: '123454544132' },
                 { title: '微信号', field: '14541456' },
                 { title: '电子邮箱', field: '11321@163.com' },
                 { title: '客户爱好', field: 'xxxx' },
                 { title: '隶属公司名称', field: "xxxxxxx" },
                 { title: '学历', field: '本科' },
                 { title: '月收入', field: '2017' },
                 { title: '职位', field: '职工' },
                 { title: '家庭结构', field: 'xxxx' },
                 { title: '负责人', field: "水电费" },
                 { title: '负责人职位', field: '职工' },
                 { title: '负责人地址', field: '荣成市宁津办事处东墩村151号' },
                 { title: '联系人', field: '阿萨德' },
                 { title: '联系人电话', field: '13436698978' },
                 { title: '联系人地址', field: '荣成市宁津办事处东墩村151号' },
                 { title: '开户银行', field: '中国工商银行xxxxxx' },
                 { title: '账号', field: '1234567899874128111' },
                 { title: '账号', field: '12415414541145' },                
             ],
             "repairPerson":[
                 { title: '送修人姓名', field: '刘永明' },
                 { title: '驾驶证号', field: '1' },
                 { title: '身份证号', field: '1' },
                 { title: '性别', field: '男' },
                 { title: '民族', field: '汉族' },               
                 { title: '出生日期', field: '1980-12-01' },
                 { title: '手机号码', field: '13436698978' },
                 { title: '家庭电话', field: '0312-4598554' },
                 { title: '办公电话', field: '0312-4578155' },
                 { title: '地址', field: '荣成市宁津办事处东墩村151号'},
                 { title: '所在省份', field: '河北省' },
                 { title: '所在城市', field: '保定市' },
                 { title: '所在区县', field: 'xxx' },
                
             ],
            "repairInfo": [
                { title: '服务站名称', field: '河北保定五洲汽车服务有限公司xxxxxxx' },
                { title: '服务站城市', field: '河北省保定市' },
                { title: '服务站地址', field: '荣成市宁津办事处东墩村151号' },
                { title: '服务站电话', field: '0312-1548787' },
                { title: '进厂时间', field: '2017-06-15' },
                { title: '出厂时间', field: '2017-09-15' },
                { title: '累计里程', field: '126820' },
                { title: '是否救援', field: '是' },
                { title: '服务类型', field: '进站维修' },
                { title: '上门服务日期', field: '2017-09-15' },
                { title: '服务开始时间', field: '2017-09-15' },
                { title: '服务结束时间', field: '2017-09-15' },
                { title: '故障描述', field: '两前大灯起雾' },
                { title: '初步诊断', field: '俩前大灯密封不良进水' },
                { title: '修理类别', field: '机修' }
            ]                       
            },
            {
                "id":"02",
                "Storename":"河北保定五洲汽车服务有限公司xxxxxxx1111" ,
                "Storecity":"河北省保定市11",
                "StoreAddress":"河北省保定市莲池区朝阳南路xxxxxx111",
                "Storephone":"45962215811",
                'RepairName':"刘永明",
                'Repairphone':"13436695845",
                'Repairtype':"机修",
                'Incomingtime': "2017-03-12",
                'Factorytime': "2017-08-12",
                "carInfo":[
                    { title: '车牌号', field: '鲁BU5E62' },
                    { title: '厂牌', field: '长城' },
                    { title: '底盘号', field: 'LGWEF3A53CF119444' },
                    { title: '车系', field: 'H6' },
                    { title: '发动机号', field: 'SLX1513' },
                    { title: '车辆颜色', field: '雅致银' },
                    { title: '购车日期', field: '2017-02-14' },
                    { title: '领证日期', field: '2012-02-14' },
                    { title: '首保日期', field: '2015-03-14' }, 
                    { title: '首次接待', field: '孙艳' },
                    { title: '下次保养日期', field: '2017-03-27' },
                    { title: '下次保养里程', field: '41000' },
                    { title: '首次来厂日期', field: '2017-06-15' }, 
                    { title: '最近修理日期', field: '2017-07-15' }, 
                    { title: '首次到店', field: '41000' },
                    { title: '最近到店', field: '2017-06-15' },
                    { title: '加装说明', field: '奥术大师多请问我小窗口从上课文在笑口常开阿伟去玩了看情况外科' },                
                 ],
                 "userInfo":[
                     { title: '客户姓名', field: '刘永明' },
                     { title: '车辆数', field: '1' },
                     { title: '性别', field: '男' },
                     { title: '民族', field: '汉族' },
                     { title: '所在省份', field: '河北省' },
                     { title: '所在城市', field: '保定市' },
                     { title: '所在区县', field: 'xxx' },
                     { title: '所在行业', field: '机械设计与制造' },
                     { title: '购车目的', field: '自用' },
                     { title: '出生日期', field: '1980-12-01' },
                     { title: '证件类型', field: '身份证' },
                     { title: '证件号码', field: '130629154844155548' },
                     { title: '手机', field: '13436698978' },
                     { title: '家庭电话', field: '0312-4598554' },
                     { title: '地址', field: '荣成市宁津办事处东墩村151号' },
                     { title: '办公电话', field: '0312-4578155' },
                     { title: 'QQ号码', field: '123454544132' },
                     { title: '微信号', field: '14541456' },
                     { title: '电子邮箱', field: '11321@163.com' },
                     { title: '客户爱好', field: 'xxxx' },
                     { title: '隶属公司名称', field: "xxxxxxx" },
                     { title: '学历', field: '本科' },
                     { title: '月收入', field: '2017' },
                     { title: '职位', field: '职工' },
                     { title: '家庭结构', field: 'xxxx' },
                     { title: '负责人', field: "水电费" },
                     { title: '负责人职位', field: '职工' },
                     { title: '负责人地址', field: '荣成市宁津办事处东墩村151号' },
                     { title: '联系人', field: '阿萨德' },
                     { title: '联系人电话', field: '13436698978' },
                     { title: '联系人地址', field: '荣成市宁津办事处东墩村151号' },
                     { title: '开户银行', field: '中国工商银行xxxxxx' },
                     { title: '账号', field: '1234567899874128111' },
                     { title: '账号', field: '12415414541145' },                
                 ],
                 "repairPerson":[
                     { title: '送修人姓名', field: '刘永明' },
                     { title: '驾驶证号', field: '1' },
                     { title: '身份证号', field: '1' },
                     { title: '性别', field: '男' },
                     { title: '民族', field: '汉族' },               
                     { title: '出生日期', field: '1980-12-01' },
                     { title: '手机号码', field: '13436698978' },
                     { title: '家庭电话', field: '0312-4598554' },
                     { title: '办公电话', field: '0312-4578155' },
                     { title: '地址', field: '荣成市宁津办事处东墩村151号'},
                     { title: '所在省份', field: '河北省' },
                     { title: '所在城市', field: '保定市' },
                     { title: '所在区县', field: 'xxx' },
                    
                 ],
                "repairInfo": [
                    { title: '服务站名称', field: '河北保定五洲汽车服务有限公司xxxxxxx' },
                    { title: '服务站城市', field: '河北省保定市' },
                    { title: '服务站地址', field: '荣成市宁津办事处东墩村151号' },
                    { title: '服务站电话', field: '0312-1548787' },
                    { title: '进厂时间', field: '2017-06-15' },
                    { title: '出厂时间', field: '2017-09-15' },
                    { title: '累计里程', field: '126820' },
                    { title: '是否救援', field: '是' },
                    { title: '服务类型', field: '进站维修' },
                    { title: '上门服务日期', field: '2017-09-15' },
                    { title: '服务开始时间', field: '2017-09-15' },
                    { title: '服务结束时间', field: '2017-09-15' },
                    { title: '故障描述', field: '两前大灯起雾' },
                    { title: '初步诊断', field: '俩前大灯密封不良进水' },
                    { title: '修理类别', field: '机修' }
                ]                       
                }
        ], 
    }   
    ]
export { repair };