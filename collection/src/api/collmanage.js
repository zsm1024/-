import fetch from '@/utils/fetch'

export function getcolone(params) {
    return fetch({
       url: '/missionInfos/listRest',
      method: 'get',
      params: params
    })
}

export function listRestSortByCo(params) {
    return fetch({
       url: '/missionInfos/listRestSortByCo',
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

//合同查询
    //催收信息
export function getlistAfpRest(params) {
    return fetch({
      url: '/contractInfos/listAfpRest',
      method: 'get',
      params: params 
    })
}
    //合同信息
export function findByContractId(params) {
    return fetch({
        url: '/contractInfos/findByContractId',
        method: 'get',
        params: params 
    })
} 
//还款计划 
export function repaymentPlanFixeds(params) {
    return fetch({
        url: '/repaymentPlanFixeds/listByContractId',
        method: 'get',
        params: params 
    })
} 
//CMS历史
export function listByContractId(params) {
    return fetch({
        url: '/cmsHists/listByContractId',
        method: 'get',
        params: params 
    })
}
//费用减免
export function cusDelInfos(params) {
    return fetch({
        url: '/cusDelInfos/listByContractId',
        method: 'get',
        params: params 
    })
}
//罚息减免
export function penaltyReductions(params) {
    return fetch({
        url: '/penaltyReductions/listByContractId',
        method: 'get',
        params: params 
    })
}
//扣款流水
export function debitRecords(params) {
    return fetch({
        url: '/debitRecords/listByContractId',
        method: 'get',
        params: params 
    })
}
//催收历史
    //催收信息
export function listAfpSimplesRestByContractId(params) {
        return fetch({
            url: '/afpRecords/listAfpSimplesRestByContractId',
            method: 'get',
            params: params 
        })
    }
//案件备注
export function colHistory_note(params) {
    return fetch({
        url: '/afpInfos/findRemarkByContractId',
        method: 'get',
        params: params 
    })
}
//催收轨迹
export function colHistory_trail(params) {
    return fetch({
        url: '/afpTrajectorys/listByContractId',
        method: 'get',
        params: params 
    })
}
//行动代码
export function colHistory_code(params) {
    return fetch({
        url: '/afpRecords/listAfpActionsRestByContractId',
        method: 'get',
        params: params 
    })
}
export function jxsInfo(params){
    return fetch({
      url: '/customerBasics/findDealer/'+params.missionId,
      method: 'get',
      params:params
    })
  }
  export function jxsInfosearch(params){
    return fetch({
      url: '/customerBasics/findDealerByContractId/'+params.contractId,
      method: 'get',
      params:params
    })
  }
  export function getAppNumAll(params) {
    return fetch({
        url: '/contractInfos/getAppNumAll',
        method: 'get',
        params: params 
    })
}