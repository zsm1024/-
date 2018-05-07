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
export function delayTheCaseApp(params) {
  const data = params;
  return fetch({
    url: '/os/delayTheCaseApp',
    method: 'put',
    data
  })
}
export function getTaskHostUser(params) {
  return fetch({
    url: 'os/selectOsUser',
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
//全部导出
export function listAllExport(params) {
  return fetch({
    url: 'os/listOutsourceAll',
    method: 'get',
    params: params
  })
}
export function listOutsource(params) {
  return fetch({
    url: 'os/listOutsource',
    method: 'get',
    params: params
  })
}
export function SendListdetail(params) {
  return fetch({
    url: 'os/sendCaseDetail',
    method: 'get',
    params: params
  })
}
//退案
export function backCaseApp(params){
  const data = params;
  return fetch({
    url: '/missionInfos/returnCase',
    method: 'put',
    data
  })
}

export function sendTheCaseApp(params){
   const data = params;
 return fetch({
   url: 'os/sendTheCaseApp',
   method: 'post',
  // params: params
    data
 })
}
export function changeTheSendCaseApp(params){
  const data = params;
return fetch({
  url: 'os/changeTheSendCaseApp',
  method: 'post',
 // params: params
   data
})
}
//??????
export function listApproveOsCase(params) {
  return fetch({
    url: 'os/listApproveOsCase',
    method: 'get',
    params: params
  })
}
export function approveSendCaseApp(params) {
  //  const data = params;
  return fetch({
    url: 'os/approveSendCaseApp',
    method: 'get',
    params: params
    //  data
  })
}
//????
export function excelImport(params) {
  // const data = params;
  return fetch({
    url: 'os/osCaseExport',
    method: 'get',
    params: params
    // data
  })
}
