import fetch from '@/utils/fetch'
export function ApprovalList(params){
    return fetch({
      url: '/approval/list',
      method: 'get',
      params: params
    })
  }
  //
  export function ApprovalmyApplyList(params){
    return fetch({
      url: '/approval/myApplyList',
      method: 'get',
      params: params
    })
  }
  //审批详情
  export function Approvalfind(params){
    return fetch({
      url: '/approval/find',
      method: 'get',
      params: params
    })
  } 
  export function Approvalapply(params){
    const data = params;
    return fetch({
      url: '/approval/apply',
      method: 'put',
      data
    })
  }
  export function applies(params){
    const data = params;
    return fetch({
      url: '/approval/applies',
      method: 'put',
      data
    })
  }
  export function ListHistory(params){
    return fetch({
      url: '/approval/listHistory',
      method: 'get',
      params: params
    })
  }
  export function listCoInfo(params){
    return fetch({
      url: '/approval/listCoInfo',
      method: 'get',
      params: params
    })
  }
  export function addCoInfo(params){
    const data = params;
    return fetch({
      url: '/approval/addCoInfo',
      method: 'post',
      data
    })
  }
  export function deleteCoInfo(params) {
    
     return fetch({
         url: '/approval/deleteCoInfo/'+params.applyId+"/"+params.coUid,
         method: 'delete',
         
     })
 }