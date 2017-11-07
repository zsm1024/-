import { getToken, setToken, removeToken } from '@/utils/auth'



const user = {
    state: {
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
        SET_TOKEN: (state, token) => {
            state.token = token
          },

    }
}  

export default user