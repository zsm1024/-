import { loginByUsername, logout, getUserInfo, getPermissions } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, getRole, setRole, removeUser, removeRole } from '@/utils/auth'

const user = {
  state: {
    id : '',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
           
            const data = response.data
            if(data.success){
                setToken(response.data.result.token)
                commit('SET_TOKEN', data.result.token)
                resolve()
            }else{
                
                reject(data.message)
            }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
          var user = getUser();
          if(!user){
            getUserInfo(state.token).then(response => {
                if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                  reject('error')
                }
                const data = response.data
                setUser(data);
                commit('SET_NAME', data.username)
                commit('SET_ID', data.id)
                localStorage.setItem("UserId",data.id);
                // localStorage.setItem("UserName",data.username);

                resolve(response)
              }).catch(error => {
                reject(error)
            })
          }else{
            user= JSON.parse(user);
            commit('SET_NAME', user.username)
            commit('SET_ID', user.id)
            localStorage.setItem("UserId",user.id);
            // localStorage.setItem("UserName",user.username);
          }
        
      })
    },
    // 获取用户信息
    GetPermissions({ commit, state }) {
        return new Promise((resolve, reject) => {
           getPermissions().then(response => {
            if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }
            const data = response.data
            commit('SET_ROLES', data.result)
            
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUser()
          removeRole()

          localStorage.removeItem("UserId");
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUser()
        removeRole()
        localStorage.removeItem("UserId");
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user