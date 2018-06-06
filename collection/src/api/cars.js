import fetch from '@/utils/fetch'
export function getCustomerOsBasic(params) {
    return fetch({
      url: '/osControlVehicle/getCustomerOsBasic/'+params.id,
      method: 'get',
    })
}
export function getOsControlVehicle(params) {
    return fetch({
      url: '/osControlVehicle/getOsControlVehicle/'+params.id,
      method: 'get',
    })
}
export function updateOsControlVehicle(params){
    const data = params;
    return fetch({
      url: '/osControlVehicle/updateOsControlVehicle',
      method: 'put',
      data
    })
  }
  export function SendCarInformation(params){
    return fetch({
        url: '/osControlVehicle/listSendCarInformation',
        method: 'get',
        params: params
    })
}

export function updateSendCarInformation(params){
    const data = params;
    return fetch({
      url: '/osControlVehicle/updateSendCarInformation',
      method: 'put',
      data
    })
  }
  export function deleteSendCar(params){
    return fetch({
      url: '/osControlVehicle/deleteSendCarInformation/'+params.id,
      method: 'delete',
      params: params
    })
  }
  export function saveSendCar(params) {
    const data = params;
    return fetch({
      url: '/osControlVehicle/saveSendCarInformation',
      method: 'post',
      data
    })
  }
  export function ParkingInformation(params){
    return fetch({
        url: '/osControlVehicle/listVehicleParkingInformation',
        method: 'get',
        params: params
    })
}
export function updateParkingInformation(params){
    const data = params;
    return fetch({
      url: '/osControlVehicle/updateVehicleParkingInformation',
      method: 'put',
      data
    })
  }
  export function deleteParkingCar(params){
    return fetch({
      url: '/osControlVehicle/deleteVehicleParkingInformation/'+params.id,
      method: 'delete',
      params: params
    })
  }
  export function saveParkCar(params) {
    const data = params;
    return fetch({
      url: '/osControlVehicle/saveVehicleParkingInformation',
      method: 'post',
      data
    })
  }
  //变现信息
  export function getOsCashChange(params) {
    return fetch({
      url: '/osControlVehicle/getOsCashChange/'+params.id,
      method: 'get',
    })
}
export function updateOsCashChang(params){
  const data = params;
  return fetch({
    url: '/osControlVehicle/updateOsCashChange',
    method: 'put',
    data
  })
}
export function getOsCarRelease(params) {
  return fetch({
    url: '/osControlVehicle/getOsCarRelease/'+params.id,
    method: 'get',
  })
}
export function updateOsCarRelease(params){
  const data = params;
  return fetch({
    url: '/osControlVehicle/updateOsCarRelease',
    method: 'put',
    data
  })
}
//费用明细
export function listOsDetailsCharges(params){
  return fetch({
      url: '/osControlVehicle/listOsDetailsCharges',
      method: 'get',
      params: params
  })
}
export function deleteOsDetailsCharges(params){
  return fetch({
    url: '/osControlVehicle/deleteOsDetailsCharges/'+params.id,
    method: 'delete',
    params: params
  })
}
export function updateOsDetailsCharges(params){
  const data = params;
  return fetch({
    url: '/osControlVehicle/updateOsDetailsCharges',
    method: 'put',
    data
  })
}
export function savecost(params) {
  const data = params;
  return fetch({
    url: '/osControlVehicle/saveOsDetailsCharges',
    method: 'post',
    data
  })
}