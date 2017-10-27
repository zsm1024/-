import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); }; 

export const getUserListPage1 = params => { return axios.get(`${base}/user1/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const nav_view = params => { return axios.get(`${base}/nav_view`, { params: params }); };

export const station = params => { return axios.get(`${base}/station`, { params: params }); };

export const userstation = params => { return axios.get(`${base}/userstation`, { params: params }); };
