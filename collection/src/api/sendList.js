import fetch from '@/utils/fetch'
export function listInput(params) {
    return fetch({
      url: '/preExamination/listInput',
      method: 'get',
      params: params
    })
}
export function listUpdate(params) {
    return fetch({
      url: '/preExamination/listUpdate',
      method: 'get',
      params: params
    })
}
// listUpdate?page=1&pageSize=10

export function listOut(params) {
    return fetch({
      url: '/preExamination/listOut',
      method: 'get',
      params: params
    })
}
// preExamination/listInput?page=1&pageSize=10
export function listSend(params) {
  return fetch({
    url: '/distributionRules/distribution',
    method: 'get',
    params: params
  })
}
export function updateOverdue(params) {
  const data = params;
  return fetch({
      url: '/distributionRules/updateOverdue',
      method: 'put',
      data
  })
}