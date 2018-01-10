import Vuex from "vuex"
import Vue from 'vue'
import NavTabs from './navTabs'
import app from './modules/app'
import listdetail from './listdetail'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store =  new Vuex.Store({
    modules: {
        listdetail: listdetail,
        navTabs: NavTabs,
        user,
        app,
        permission
    },
    getters
})

export default store