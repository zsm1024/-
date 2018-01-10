import fetch from '@/utils/fetch'



export function getcolone(params) {
    return fetch({
       url: '/missionInfos/listRest',
      method: 'get',
      params: params
    })
}


export function getcoltwo(params) {
    return fetch({
      url: '/coltwo',
      method: 'get',
      params: params 
    })
}

export function getcontractInfos(params) {
    return fetch({
      url: '/contractInfos/listAll',
      method: 'get',
      params: params 
    })
}

export function getlistAfpRest(params) {
    return fetch({
      url: '/contractInfos/listAfpRest',
      method: 'get',
      params: params 
    })
}