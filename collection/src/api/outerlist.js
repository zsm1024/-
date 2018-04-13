import fetch from '@/utils/fetch'
export function submits(params) {
    const data = params;
    return fetch({
      url: 'http://192.168.2.113:8081/os/actionCodeImport',
      method: 'post',
      data
    })
}
export function delayList(params) {
  return fetch({
    url: 'os/listDelayTheCase',
    method: 'get',
    params: params
  })
}
export function SendList(params) {
  return fetch({
    url: 'os/listSendTheCase',
    method: 'get',
    params: params
  })
}
export function sendTheCaseApp(params){
  const data = params;
  return fetch({
    url: 'os/sendTheCaseApp',
    method: 'post',
    data
  })
}