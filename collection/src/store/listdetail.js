import Vuex from 'vuex'


const Home = resolve => require(['@/pages/tab/tablist/showlist'], resolve)

const state = {
    tabdetailId: "",
    activeTabdetailName: "list",
    tabListdetail: [
        {
            label: '维保列表',
            name: 'list',
            disabled: false,
            closable: false,
            component: Home
        }
    ]
}
const mutations = {
    setActiveTabName(state, name) {
        state.activeTabdetailName = name;
    },
    addTab(state, index) {
        if (state.tabListdetail.filter(f => f.name == index) == 0) {
            let component = resolve => require([`@/pages/${index}`], resolve)
            state.tabListdetail.push({
                label: '维保详情信息',
                name: index,
                disabled: false,
                closable: true,
                component: component  
            })
        }
        state.activeTabdetailName = index;
    },
    closeTab(state, name) {
        
        let tab = state.tabListdetail.filter(f => f.name == name)[0];
        let index = state.tabListdetail.indexOf(tab);
        if (index != state.tabListdetail.length - 1) {
            state.activeTabdetailName = state.tabListdetail[index + 1].name;
        } else {
            state.activeTabdetailName = state.tabListdetail[index - 1].name;
        }
        state.tabListdetail = state.tabListdetail.filter(f => f.name != name);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}