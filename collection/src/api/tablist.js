import fetch from '@/utils/fetch'


export function tab_view(params) {
    return fetch({
      url: '/missionInfos/listAfpRest',
      method: 'get',
      params: params
    })
}


export function addInfo(params) {
    const data = params;
    return fetch({
      url: '/customerPhones/insert',
      method: 'post',
      data
    })
}

export function updatePhoneInfo(params){
  const data = params;
  return fetch({
    url: '/customerPhones/update',
    method: 'put',
    data
  })
}
export function addMessage(params){
  const data = params;
  return fetch({
    url: '/afpInfos/update',
    method: 'put',
    data
  })
}
export function delPhoneInfo(params){
  return fetch({
    url: '/customerPhones/delete/'+params.id,
    method: 'delete',
    params: params
  })
}

export function addAddress(params) {
  const data = params;
    return fetch({
      url: '/customerAddresss/insert',
      method: 'post',
      data
    })
}

export function updateAddress(params) {
  const data = params;
    return fetch({
      url: '/customerAddresss/update',
      method: 'put',
      data
    })
}

export function delAddress(params) {
    return fetch({
      url: '/customerAddresss/delete/'+params.id,
      method: 'delete',
      params: params
    })
}

export function recordAdd(params){
  const data = params;
  return fetch({
    url: '/afpRecords/insert',
    method: 'post',
    data
  })
}

export function getdeal(params) {
    return fetch({
      url: '/contractInfos/find',
      method: 'get',
      params: params
    })
}

export function tab_message(params) {
    return fetch({
      url: '/afpRecords/listRest',
      method: 'get',
      params: params
    })
}

export function userInfo(params) {
    return fetch({
      url: '/userinfo',
      method: 'get',
      params: params
    })
}

export function getplan(params) {
    return fetch({
      url: '/repaymentPlanFixeds/list',
      method: 'get',
      params: params
    })
}

export function gettwo(params) {
    return fetch({
      url: '/repaymentPlanFixeds/list',
      method: 'get',
      params: params
    })
}

export function getliushui(params) {
    return fetch({
      url: '/debitRecords/list',
      method: 'get',
      params: params
    })
}

export function getcmsdetails(params) {
    return fetch({
      url: '/cusDelInfos/list',
      method: 'get',
      params: params
    })
}
export function getcmsthr(params) {
  return fetch({
    url: '/penaltyReductions/list',
    method: 'get',
    params: params
  })
}
export function getcmshistory(params) {
    return fetch({
      url: '/cmsHists/list',
      method: 'get',
      params: params
    })
}

export function repairlist(params) {
    return fetch({
      url: '/maintenanceRecords/listAll',
      method: 'get',
      params: params
    })
}
//合同查询
export function repair(params) {
 
    return fetch({
      url: '/maintenanceRecords/listAllByContractId',
      method: 'get',
      params: params
    })
}
export function repairDetial(params) {
 
     return fetch({
       url: '/maintenanceRecords/findD',
       method: 'get',
       params: params
     })
 }
export function colHistory_msg(params) {
  return fetch({
    url: '/afpRecords/listAfpSimplesRest',
    method: 'get',
    params: params
  })
}
  export function colHistory_note(params) {
    return fetch({
      url: '/afpInfos/findRemark',
      method: 'get',
      params: params
    })
  }
  export function colHistory_trail(params) {
      return fetch({
        url: '/afpTrajectorys/list',
        method: 'get',
        params: params
      })
}
export function colHistory_code(params) {
  return fetch({
    url: '/afpRecords/listAfpActionsRest',
    method: 'get',
    params: params
  })
}
export function getCodeAll(params) {
    return fetch({
      url: '/actionCode/listAll',
      method: 'get',
      params: params
    })
}


export function getNextMissonId(params) {
  // +params.id
    return fetch({
      url: '/missionInfos/findNext',
      method: 'get',
      params:params
    })
}
export function jxsInfo(params){
  return fetch({
    url: '/customerBasics/findDealer/'+params.missionId,
    method: 'get',
    params:params
  })
}
//短信弹框
export function messageDialog(params){
  return fetch({
    url: '/messageTemplate/listAll',
    method: 'get',
    params:params
  })
}
//获取短信模板
export function messageTemplate(params){
  return fetch({
    url: '/messageTemplate/findTemplate',
    method: 'get',
    params:params
  })
}
export function messageSend(params){
  const data = params;
  return fetch({
    url: '/sendMessage/sendMessage',
    method: 'post',
    data
  })
}
//文件上传
export function ListFilses(params){
  return fetch({
    url: '/files/listFiles',
    method: 'get',
    params:params
  })
}
export function role(params){
  return fetch({
    url: '/files/role/'+params.username,
    method: 'get',
    // params:params
  })
}
export function delet(params){
  return fetch({
    url: '/files/delete/'+params.id,
    method: 'get',
    // params:params
  })
}
