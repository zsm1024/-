import fetch from '@/utils/fetch';

export function getOnTheSpotQueueMissionList(params) {
    return fetch({
      url: '/queueMission/getOnTheSpotQueueMissionList',
      method: 'get',
      params: params
    });
}
export function UserMonitoringOnTheSpot(params) {
  return fetch({
    url: '/userMoitoring/UserMonitoringOnTheSpot',
    method: 'get',
    params: params
  });
}