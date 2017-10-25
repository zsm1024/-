import Vuex from 'vuex'
import { nav_view } from '../api/api';

const Home = resolve => require(['../pages/home/Home'], resolve)

const state = {
    activeTabName: "home",
    tabList: [
        {
            label: '主页',
            name: 'home',
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
        
        nav_view().then((res)=>{
            let data=res.data.msg;                     
            for(var i=0;i<data.length;i++){
                let list = data[i].list;
                if(typeof(list) != 'undefined'){
                    
                    for(var l=0;l<list.length;l++){
                       
                        if( list[l].path == index){
                            name =  list[l].title;     
                        }
                    }
                }
               
                

            }
            
            if (state.tabList.filter(f => f.name == index) == 0) {
                let component = resolve => require([`../pages/${index}`], resolve)
                state.tabList.push({
                    label: name,
                    name: index,
                    disabled: false,
                    closable: true,
                    component: component
                })
            }
            state.activeTabName = index;
        }) 
    },
    closeTab(state, name) {

        let tab = state.tabList.filter(f => f.label == name)[0];
        let index = state.tabList.indexOf(tab);
        if (index != state.tabList.length - 1) {
            state.activeTabName = state.tabList[index + 1].label;
        } else {
            state.activeTabName = state.tabList[index - 1].label;
        }
        state.tabList = state.tabList.filter(f => f.label != name);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}