import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); }; 

export const getUserListPage1 = params => { return axios.get(`${base}/user1/listpage`, { params: params }); };

export const nav_view = params => { return axios.get(`${base}/nav_view`, { params: params }); };

//电催队列数据
//催收信息
export const tab_view = params => { return axios.get(`${base}/tab_view`, { params: params }); };

//催收信息新增数据

export const addInfo = params => { return axios.get(`${base}/addInfo`, { params: params }); };


//合同信息
export const getdeal = params => { return axios.get(`${base}/deal`, { params: params }); };
//催收历史
export const tab_message = params => { return axios.get(`${base}/tab_message`, { params: params }); };


//客户信息
export const userInfo = params => { return axios.get(`${base}/userinfo`, { params: params }); };


//还款计划
export const getplan = params => { return axios.get(`${base}/plan`, { params: params }); };
//扣款流水
export const getliushui = params => { return axios.get(`${base}/liushui`, { params: params }); };

//cms历史信息
export const getcmsdetails = params => { return axios.get(`${base}/cmsdetails`, { params: params }); };

export const getcmshistory = params => { return axios.get(`${base}/cmshistory`, { params: params }); };


