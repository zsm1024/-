
import fetch from '@/utils/fetch'
export function ListLegalActionMonitor(params) {
    return fetch({
      url: '/legalAction/ListLegalActionMonitor',
      method: 'get',
      params: params
    })
}
export function listLegalActionInfo(params) {
  return fetch({
    url: '/legalAction/listLegalActionInfo/'+params.id,
    method: 'get',
  })
}
export function updateLegalActionInfo(params){
  const data = params;
  return fetch({
    url: '/legalAction/updateLegalActionInfo',
    method: 'put',
    data
  })
}
export function insertLegalActionInfo(params) {
  const data = params;
  return fetch({
    url: '/legalAction/insertLegalActionInfo',
    method: 'post',
    data
  })
}
export function ListLegalActionFee(params) {
  return fetch({
    url: '/legalAction/ListLegalActionFee',
    method: 'get',
    params: params
  })
}
export function insertLegalActionFee(params) {
  const data = params;
  return fetch({
    url: '/legalAction/insertLegalActionFee',
    method: 'post',
    data
})
}
export function updateLegalActionFee(params){
  const data = params;
  return fetch({
    url: '/legalAction/updateLegalActionFee',
    method: 'put',
    data
  })
}
export function delLegalActionFee(params){
  return fetch({
    url: '/legalAction/delLegalActionFee/'+params.id,
    method: 'delete',
    params: params
  })
}
export function ListLegalActionEvent(params) {
  return fetch({
    url: '/legalAction/ListLegalActionEvent',
    method: 'get',
    params: params
  })
}
export function insertLegalActionEvent(params) {
  const data = params;
  return fetch({
    url: '/legalAction/insertLegalActionEvent',
    method: 'post',
    data
})
}
export function updateLegalActionEvent(params){
  const data = params;
  return fetch({
    url: '/legalAction/updateLegalActionEvent',
    method: 'put',
    data
  })
}
export function delLegalActionEvent(params){
  return fetch({
    url: '/legalAction/delLegalActionEvent/'+params.id,
    method: 'delete',
    params: params
  })
}
export function ListLegalActionInfo(params) {
  return fetch({
    url: '/legalAction/listAuctioneerInfo',
    method: 'get',
    params: params
  })
}
export function insertLegalActionInfos(params) {
  const data = params;
  return fetch({
    url: '/legalAction/insertAuctioneerInfo',
    method: 'post',
    data
})
}
export function updateLegalActionInfos(params){
  const data = params;
  return fetch({
    url: '/legalAction/updateAuctioneerInfo',
    method: 'put',
    data
  })
}
export function delLegalActionInfo(params){
  return fetch({
    url: '/legalAction/delAuctioneerInfo/'+params.id,
    method: 'delete',
    params: params
  })
}
export function laCaseExport(params) {
  const data = params;
  return fetch({
    url: '/legalAction/laCaseExport',
    method: 'post',
    data
})
}
export function operationStatus(params) {
  return fetch({
    url: '/legalAction/operationStatus',
    method: 'get',
    params: params
})
}
