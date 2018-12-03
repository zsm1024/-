import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const UserKey = 'User-Token'

const RoleKey = 'Role-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
    var inHalfDay = 0.5;
    return Cookies.set(TokenKey, token, {expires:inHalfDay})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getUser() {
    return Cookies.get(UserKey)
}

export function setUser(user) {
    var inHalfDay = 0.5;
    return Cookies.set(UserKey, user,{expires:inHalfDay})
}

export function removeUser() {
    return Cookies.remove(UserKey)
}

export function getRole() {
    return Cookies.get(RoleKey)
}

export function setRole(role) {
    var inHalfDay = 0.5;
    return Cookies.set(RoleKey, role,{expires:inHalfDay})
}

export function removeRole() {
    return Cookies.remove(RoleKey)
}
