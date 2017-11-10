import Vuex from 'vuex'


const Home = resolve => require(['@/pages/tab/tablist/showlist'], resolve)

const state = {
    tabId: "",
    activeTabName: "list",
    tabList: [
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
        state.activeTabName = name;
    },
    addTab(state, index) {
        if (state.tabList.filter(f => f.name == index) == 0) {
            let component = resolve => require([`@/pages/${index}`], resolve)
            state.tabList.push({
                label: '维保详情信息',
                name: index,
                disabled: false,
                closable: true,
                component: component  
            })
        }
        state.activeTabName = index;
    },
    closeTab(state, name) {
        
        let tab = state.tabList.filter(f => f.name == name)[0];
        let index = state.tabList.indexOf(tab);
        if (index != state.tabList.length - 1) {
            state.activeTabName = state.tabList[index + 1].name;
        } else {
            state.activeTabName = state.tabList[index - 1].name;
        }
        state.tabList = state.tabList.filter(f => f.name != name);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}