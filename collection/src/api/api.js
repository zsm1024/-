import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); }; 

export const getUserListPage1 = params => { return axios.get(`${base}/user1/listpage`, { params: params }); };

export const nav_view = params => { return axios.get(`${base}/nav_view`, { params: params }); };

export const station = params => { return axios.get(`${base}/station`, { params: params }); };

export const userstation = params => { return axios.get(`${base}/userstation`, { params: params }); };

export const getsupervisor = params => { return axios.get(`${base}/getsupervisor`, { params: params }); };

export const getstation = params => { return axios.get(`${base}/getstation`, { params: params }); };

export const gethistory = params => { return axios.get(`${base}/gethistory`, { params: params }); };

//电催队列数据
//催收信息
export const tab_view = params => { return axios.get(`${base}/tab_view`, { params: params }); };
//合同信息

//催收历史
export const tab_message = params => { return axios.get(`${base}/tab_message`, { params: params }); };