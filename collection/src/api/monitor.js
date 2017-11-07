import fetch from '@/utils/fetch'

export function nav_view(params) {
  return fetch({
    url: '/nav_view',
    method: 'get',
    params: params
  })
}

export function station(params) {
    return fetch({
      url: '/station',
      method: 'get',
      params: params
    })
}
export function stationtotal(params) {
    return fetch({
      url: '/stationtotal',
      method: 'get',
      params: params
    })
}
export function userstation(params) {
    return fetch({
      url: '/userstation',
      method: 'get',
      params: params
    })
}
export function userstationtotal(params) {
    return fetch({
      url: '/userstationtotal',
      method: 'get',
      params: params
    })
}
export function getsupervisor(params) {
    return fetch({
      url: '/getsupervisor',
      method: 'get',
      params: params
    })
}
export function getstation(params) {
    return fetch({
      url: '/getstation',
      method: 'get',
      params: params
    })
}
export function gethistory(params) {
    return fetch({
      url: '/gethistory',
      method: 'get',
      params: params
    })
}