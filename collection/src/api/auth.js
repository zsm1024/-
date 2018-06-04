import fetch from '@/utils/fetch'

export function getUsers(params) {
    return fetch({
        url: '/users/list',
        method: 'get',
        params: params
    })
}
export function getUsersAll(params) {
    return fetch({
        url: '/users/listAll',
        method: 'get',
        params: params
    })
}
export function getRoles(params) {
    return fetch({
        url: '/roles/all',
        method: 'get',
        params: params
    })
}
export function toAddUser(params) {
    const data = params;
    return fetch({
        url: '/users/insert',
        method: 'post',
        data
    })
}

export function findUser(params) {
    return fetch({
        url: '/users/find/'+params.id,
        method: 'get',
       
    })
}

export function toEditUser(params) {
    const data = params;
    return fetch({
        url: '/users/update',
        method: 'put',
        data
    })
}

export function deleteUser(params) {
   
    return fetch({
        url: '/users/delete/'+params.id,
        method: 'delete',
        
    })
}

export function getPermissions(params) {
    
    return fetch({
        url: '/permissions/all',
        method: 'get',
        params: params
    })
}

export function getPermissionsParent(params) {
    
    return fetch({
        url: '/permissions/parents',
        method: 'get',
        params: params
    })
}

export function PermissionsInsert(params) {
    const data = params;
    return fetch({
        url: '/permissions/insert',
        method: 'post',
        data
    })
}

export function PermissionsFind(params) {
    
    return fetch({
        url: '/permissions/find/'+params.id,
        method: 'get',
     
    })
}

export function PermissionsUpdate(params) {
    const data = params;
    return fetch({
        url: '/permissions/update',
        method: 'put',
        data
    })
}

export function PermissionsDelete(params) {
    const data = params;
    return fetch({
        url: '/permissions/delete/'+params.id,
        method: 'delete',
        data
    })
}

export function roleslist(params) {
    
    return fetch({
        url: '/roles/list',
        method: 'get',
        params: params
    })
}
export function rolesinsert(params) {
    const data = params;
    return fetch({
        url: '/roles/insert',
        method: 'post',
        data
    })
}
export function rolesfind(params) {
   
    return fetch({
        url: '/roles/find/'+params.id,
        method: 'get',
        
    })
}


export function rolesDelete(params) {
    const data = params;
    return fetch({
        url: '/roles/delete/'+params.id,
        method: 'delete',
        data
    })
}

export function getAuthUser(params) {
    return fetch({
        url: '/users/listByPosition',
        method: 'get',
        params: params
    })
}

export function getAuthtree(params) {
    return fetch({
        url: '/sysPositions/listTree',
        method: 'get',
        params: params
    })
}


export function addPost(params) {
    const data = params;
    return fetch({
        url: '/sysPositions/insert',
        method: 'post',
        data
    })
}

export function editPost(params) {
    const data = params;
    return fetch({
        url: '/sysPositions/update',
        method: 'put',
        data
    })
}

export function getPost(params) {
    return fetch({
        url: '/sysPositions/'+params.id,
        method: 'get',
       
    })
}

export function sysPositionslistAll(params) {
    return fetch({
        url: '/sysPositions/lisAll',
        method: 'get',
        params: params
    })
}

export function deletePost(params) {
  
    return fetch({
        url: '/sysPositions/delete/'+params.id,
        method: 'delete',
      
    })
}

//修改密码
export function changeSub(params) {
    const data = params;
    return fetch({
        url: '/users/changePWD',
        method: 'put',
        data
    })
}
//初始化密码refreshSub
export function refreshSub(params) {
    return fetch({
        url: '/users/initPassword',
        method: 'get',
        params: params
    })
}