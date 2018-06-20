
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
