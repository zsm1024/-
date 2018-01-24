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
//合同查询页
    //催收信息
export function getlistAfpRest(params) {
    return fetch({
      url: '/contractInfos/listAfpRest',
      method: 'get',
      params: params 
    });
}
    //合同信息
export function findByContractId(params) {
    return fetch({
      url: '/contractInfos/findByContractId',
      method: 'get',
      params: params 
    });
}
export function repaymentPlanFixeds(params) {
    return fetch({
      url: '/ repaymentPlanFixeds/listByContractId',
      method: 'get',
      params: params 
    });
}