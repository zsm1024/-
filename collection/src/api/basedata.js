import fetch from '@/utils/fetch'
export function base_data(params) {
    return fetch({
      url: '/queueDistributions/list',
      method: 'get',
      params: params
    })
}
//字符维护
export function placeholder_data(params) {
  return fetch({
    url: '/placeholder/list',
    method: 'get',
    params: params
  })
}
export function delInfo$(params){
  return fetch({
    url: '/placeholder/delete/'+params.id,
    method: 'delete',
    params: params
  })
}
export function updateInfo$(params){
  const data = params;
  return fetch({
    url: '/placeholder/update',
    method: 'put',
    data
  })
}
export function addInfo$(params) {
  const data = params;
  return fetch({
    url: '/placeholder/insert',
    method: 'post',
    data
  })
}
//短信模板维护
export function message_data(params) {
  return fetch({
    url: '/messageTemplate/list',
    method: 'get',
    params: params
  })
}
export function message_delete(params){
  return fetch({
    url: '/messageTemplate/delete/'+params.id,
    method: 'delete',
    params: params
  })
}
export function message_update(params){
  const data = params;
  return fetch({
    url: '/messageTemplate/update',
    method: 'put',
    data
  })
}
export function message_insert(params) {
  const data = params;
  return fetch({
    url: '/messageTemplate/insert',
    method: 'post',
    data
  })
}
export function messageDialog(params){
  return fetch({
    url: '/messageTemplate/listAll',
    method: 'get',
    params:params
  })
}
/*.....................*/

export function base_menue(params) {
  return fetch({
    url: '/queueInfos/list',
    method: 'get',
    params: params
  })
}
export function add_info(params) {
  const data = params;
  return fetch({
    url: '/queueInfos/insert',
    method: 'post',
    data
  })
}
export function addInfo(params) {
    const data = params;
    return fetch({
      url: '/queueDistributions/insert',
      method: 'post',
      data
    })
}
export function updateInfo(params){
  const data = params;
  return fetch({
    url: '/queueDistributions/update',
    method: 'put',
    data
  })
}

export function delInfo(params){
  return fetch({
    url: '/queueDistributions/delete/'+params.id,
    method: 'delete',
    params: params
  })
}
export function authlist(params){
  return fetch({
    url: '/queueInfos/listAll',
    method: 'get',
    params: params
  });
}
export function authlistRight(params){
    return fetch({
      url: '/queueInfos/listUserByQueue',
      method: 'get',
      params: params
    })
}
export function addauthlistRight(params){
  return fetch({
    url: '/queueInfos/listUserByQueueNotIn',
    method: 'get',
    params: params
  })
}
export function delauthlist(params){
  return fetch({
    url: '/queueInfos/deleteQueueUser/'+params.quId,
    method: 'delete',
    params: params
  })
}
export function addUserIds(params){ 
  const data = params;
  return fetch({  
    url: '/queueInfos/insertUserQueue',
    method: 'post',
    data
  })
}
export function updateWeight(params){
  const data = params;
  return fetch({
    url: '/queueInfos/updateUserQueue',
    method: 'put',
    data
  })
}
export function actionCode(params){
  return fetch({
    url: '/actionCode/list',
    method: 'get',
    params: params
  })
}
export function updatecodeInfo(params){
  const data = params;
  return fetch({
    url: '/actionCode/update',
    method: 'put',
    data
  })
}
export function delcodeInfo(params){
  return fetch({
    url: '/actionCode/delete/'+params.id,
    method: 'delete',
    params: params
  })
}
export function addcodeInfo(params) {
  const data = params;
  return fetch({
    url: '/actionCode/insert',
    method: 'post',
    data
  })
}
export function getRules(params){
  return fetch({
    url: '/queueDistributions/listAll',
    method: 'get',
    params: params
  })
}
//电话码维护
export function PhoneCodList(params) {
  return fetch({
    url: '/PhoneCode/list',
    method: 'get',
    params: params
  })
}
export function PhoneCodeListAll() {
  return fetch({
    url: '/PhoneCode/listAll',
    method: 'get',
  })
}
export function PhoneCodeDelete(params){
  return fetch({
    url: '/PhoneCode/delete/'+params.id,
    method: 'delete',
    params: params
  })
}
export function PhoneCodeUpdate(params){
  const data = params;
  return fetch({
    url: '/PhoneCode/update',
    method: 'put',
    data
  })
}
export function PhoneCodeInsert(params) {
  const data = params;
  return fetch({
    url: '/PhoneCode/insert',
    method: 'post',
    data
  })
}
//区域代码维护
export function areaInfo(params){
  return fetch({
    url: '/areaInfo/list',
    method: 'get',
    params: params
  });
}
export function addAreaInfo(params) {
  const data = params;
  return fetch({
    url: '/areaInfo/insert',
    method: 'post',
    data
  })
}
export function updateAreaInfo(params){
const data = params;
return fetch({
  url: '/areaInfo/update',
  method: 'put',
  data
})
}

export function delAreaInfo(params){
return fetch({
  url: '/areaInfo/delete/'+params.id,
  method: 'delete',
  params: params
})
}
export function addAre_info(params) {
  const data = params;
  return fetch({
    url: '/areaInfo/insert',
    method: 'post',
    data
  })
}
//区域省市代码维护
export function areaStateInfo(params){
  return fetch({
    url: '/areaState/list',
    method: 'get',
    params: params
  });
}
export function listAllState(params){
  return fetch({
    url: '/areaState/listAllState',
    method: 'get',
    params: params
  });
}
export function listAll(params){
  return fetch({
    url: '/areaInfo/listAll',
    method: 'get',
    params: params
  });
}
export function addAre_infoState(params) {
  const data = params;
  return fetch({
    url: '/areaState/insert',
    method: 'post',
    data
  })
}
export function updateAreaState(params){
  const data = params;
  return fetch({
    url: '/areaState/update',
    method: 'put',
    data
  })
  }
  export function delcodeState(params){
    return fetch({
      url: '/areaState/delete/'+params.id,
      method: 'delete',
      params: params
    })
  }