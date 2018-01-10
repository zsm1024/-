import axios from 'axios';
import Mock from 'mockjs'

// MockAdapter是一个模拟后台get的请求，es6语法




import loginAPI from './data/login';
import  MonApi from './data/monitor';
import  TabApi from './data/tablist';
import CollApi from './data/colllist';

import AuthApi from './data/auth';


Mock.setup({
    timeout: '350-600'
  })


export default {
  /**
   * mock bootstrap
   */
  bootstrap() {


    //登录相关
    Mock.mock(/\/sys\/login\/restful\.*/, 'post', loginAPI.loginByUsername)
    Mock.mock(/\/logout\.*/, 'post', loginAPI.logout)
    Mock.mock(/\/users\/current\.*/, 'get', loginAPI.getUserInfo)
    Mock.mock(/\/permissions\/current\.*/, 'get', loginAPI.getPermissionsCurrent)
    //作业监控
    Mock.mock(/\/queueMission\/getQueueMissionListByDate\.*/, 'get', MonApi.supervisor)
    Mock.mock(/\/queueMission\/getQueueMission2List\.*/, 'get', MonApi.station)
    Mock.mock(/\/userstation\.*/, 'get', MonApi.userstation)
    Mock.mock(/\/gethistory\.*/, 'get', MonApi.gethistory)
    Mock.mock(/\/queueMission\/getQueueMissionList\.*/, 'get', MonApi.getstationtotal)
    Mock.mock(/\/userstotal\.*/, 'get', MonApi.userstationtotal)

    Mock.mock(/\/getauthuser\.*/, 'get', AuthApi.getauthuser)

    //tab处理页
    Mock.mock(/\/missionInfos\/listAfpRest\.*/, 'get', TabApi.tab_view)
    Mock.mock(/\/customerPhones\/insert\.*/, 'post', TabApi.addInfo) 
    Mock.mock(/\/customerPhones\/update\.*/, 'put', TabApi.addInfo)
    Mock.mock(/\/customerPhones\/delete\.*/, 'delete', TabApi.addInfo)   
    Mock.mock(/\/customerAddresss\/insert\.*/, 'post', TabApi.addAddress)
    Mock.mock(/\/customerAddresss\/update\.*/, 'put', TabApi.addAddress)
    Mock.mock(/\/customerAddresss\/delete\.*/, 'delete', TabApi.addAddress)
    Mock.mock(/\/afpRecords\/insert\.*/, 'post', TabApi.addAddress)   
    
    Mock.mock(/\/contractInfos\/find\.*/, 'get', TabApi.deal)  
    Mock.mock(/\/afpRecords\/listRest\.*/, 'get', TabApi.tab_message)  
    Mock.mock(/\/userinfo\.*/, 'get', TabApi.userinfo)  
    Mock.mock(/\/repaymentPlanFixeds\/list\.*/, 'get', TabApi.plan)  
    //  Mock.mock(/\/repaymentPlanFixeds\/list\.*/, 'get', TabApi.two) 
    Mock.mock(/\/liushui\.*/, 'get', TabApi.liushui)  
    // Mock.mock(/\/cmsdetails\.*/, 'get', TabApi.cmsdetails)  
    // Mock.mock(/\/cmshistory\.*/, 'get', TabApi.cmshistory)  
    Mock.mock(/\/debitRecords\/list\.*/, 'get', TabApi.liushui)  
    Mock.mock(/\/cusDelInfos\/list\.*/, 'get', TabApi.cmsdetails)  
    Mock.mock(/\/cmsHists\/list\.*/, 'get', TabApi.cmshistory) 
    // Mock.mock(/\/cmsHists\/list\.*/, 'get', TabApi.cmsthr) 
    Mock.mock(/\/penaltyReductions\/list\.*/, 'get', TabApi.cmsthr)  
    Mock.mock(/\/maintenanceRecords\/list\.*/, 'get', TabApi.repairlist)  
    Mock.mock(/\/maintenanceRecords\/find\.*/, 'get', TabApi.repair) 
    Mock.mock(/\/afpRecords\/listAfpSimplesRest\.*/, 'get', TabApi.colHistory_msg) 
    //催收管理
    Mock.mock(/\/missionInfos\/listRest\.*/, 'get', CollApi.listone)  
    Mock.mock(/\/coltwo\.*/, 'get', CollApi.listtwo) 

  }
 
};

