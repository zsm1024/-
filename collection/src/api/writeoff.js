import fetch from '@/utils/fetch'
export function writeOffList(params) {
    return fetch({
      url: '/wo/writeOffList',
      method: 'get',
      params: params
    })
}
export function writeOffDetail(params) {
  return fetch({
    url: '/wo/writeOffDetail/'+params.missionId,
    method: 'get',
    // params: params
  })
}
export function exportWriteOffAccount(params) {
  return fetch({
    url: '/wo/exportWriteOffAccount',
    method: 'get',
    params: params
  })
}
export function update(params) {
  const data = params;
  return fetch({
    url: '/wo/update',
    method: 'put',
    data
  })
}
export function wolist(params) {
  return fetch({
    url: '/wo/list',
    method: 'get',
    params: params
  })
}
export function getByRoleId() {
  return fetch({
    url: '/wo/getByRoleId',
    method: 'get'
  })
}
export function woinsert(para) {
  let data = para
  return fetch({
    url: '/wo/insert',
    method: 'post',
    data
  })
}
export function listReviewer(params) {
  return fetch({
    url: '/wo/listReviewer',
    method: 'get',
    params: params
  })
}
export function updateWriteOffRepayment(params) {
  const data = params;
  return fetch({
    url: '/wo/updateWriteOffRepayment',
    method: 'put',
    data
  })
}
export function find(params) {
  return fetch({
    url: '/wo/find/'+params.id,
    method: 'get',
    // params: params
  })
}
