import Vuex from "vuex"
import Vue from 'vue'
import NavTabs from './navTabs'
import listdetail from './listdetail'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store =  new Vuex.Store({
    modules: {
        listdetail: listdetail,
        navTabs: NavTabs,
        user,
    },
    getters
})

export default store