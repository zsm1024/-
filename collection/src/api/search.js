import search from '@/utils/search'
export function GetBaidu(params) {
    return search({
      url: '/baidu/',
      method: 'get',
      params: params
    })
  }
  export function Getsougou(params) {
    return search({
      url: '/sougou/',
      method: 'get',
      params: params
    })
  }