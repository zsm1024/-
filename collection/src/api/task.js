import fetch from '@/utils/fetch'
export function getTaskHostList(params){
    return fetch({
      url: '/missionInfos/listAllByUser',
      method: 'get',
      params: params
    })
  }
  export function getTaskHostUser(params){
    return fetch({
      url: '/users/getAllUserByPosition',
      method: 'get',
      params: params
    })
  }
   export function getTaskHostUser1(params){
    return fetch({
      url: '/missionInfos/cancelEscrowUser',
      method: 'get',
      params: params
    })
  }
  export function addAllotList(params){
    const data = params;
    return fetch({
      url: '/missionInfos/updateUser',
      method: 'put',
      data
    })
  }
  export function addhostList(params){
    const data = params;
    return fetch({
      url: '/missionInfos/updateUser',
      method: 'put',
      data
    })
  }
  export function listRestByCo(params){
    return fetch({
      url: '/missionInfos/listRestByCo',
      method: 'get',
      params: params
    })
  }
  //协办任务
  export function getEscrow(params){
    return fetch({
      url: '/missionInfos/listRestByEscrow',
      method: 'get',
      params: params
    })
  }
  export function cancelEscrow(params){
    return fetch({
      url:'/missionInfos/cancelEscrow/'+params.id,
      method: 'get',
     
    })
  }
  //案件协办
  export function listCoMission(params){
    return fetch({
      url: '/missionInfos/listCoMission',
      method: 'get',
      params: params
    })
  }
  export function coMissionApp(params){
    const data = params;
    return fetch({
      url: '/missionInfos/coMissionApp',
      method: 'put',
      data
    })
  }
  export function positionUser(params){
    return fetch({
      url: '/users/getAllUserByPositionOnly',
      method: 'get',
      params: params
    })
  }

  //留案
  export function listLeaveTheCase(params){
    return fetch({
      url: '/missionInfos/listLeaveTheCase',
      method: 'get',
      params: params
    })
  }
  export function leaveTheCaseApp(params){
    const data = params;
    return fetch({
      url: '/missionInfos/leaveTheCaseApp',
      method: 'put',
      data
    })
  }
  //手动转队列
  //列表
  export function listTurnQueue(params){
    return fetch({
      url: '/missionInfos/listTurnQueue',
      method: 'get',
      params: params
    })
  }
  //转队列按钮
  export function turnQueue(params){
    const data = params;
    return fetch({
      url: '/missionInfos/turnQueue',
      method: 'put',
      data
    })
  }
  export function submits(params) {
    const data = params;
    return fetch({
      url: 'http://192.168.2.113:8081/os/actionCodeImport',
      method: 'post',
      data
    })
  }
