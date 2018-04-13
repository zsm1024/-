import fetch from '@/utils/fetch'
export function RecordsFind(params){
    return fetch({
      url: '/foreuignVisitRecords/find/'+params.id,
      method: 'get',
    })
  }