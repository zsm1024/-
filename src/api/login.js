import fetch from '@/utils/fetch'
//登录相关的信息
export function loginByUsername(username, password) {
    const data = {
    username,
    password
    }
    return fetch({
    url: '/sys/login/restful',
    method: 'post',
    data
    })
}

export function logout() {
    return fetch({
    url: '/logout',
    method: 'post'
    })
}

export function getUserInfo() {
    return fetch({
        url: '/users/current',
        method: 'get',
       
    })
}

export function getPermissions(){
    return fetch({
        url: '/permissions/current/Rest',
        method: 'get'
    })
}