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