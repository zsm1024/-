import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// MockAdapter是一个模拟后台get的请求，es6语法
import { List2 } from './data/user1';
import { LoginUsers, userList } from './data/user';
import { station, userstation, supervisor,history,stationtotal,userstationtotal } from './data/monitor';
import { deal } from './data/deal';
import { plan,liushui,cmshistory,cmsdetails } from './data/plan';
import { NavView } from './data/navview';
import { TabView } from './data/tabView';
import {TabMessage} from './data/tabMessage';
import {userInfo} from './data/userInfo';
import { repair } from "./data/repair";
//同样以LoginUsers, Users 的方式来接收，from的url
let _Users = userList[0].data;
let _Users1 = List2[0].data;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    mock.onGet('/station').reply(config => {
      
      let {page, name} = config.params;
   
      let mockstation = station[0].data.filter(stationsearch => {
        if (name && stationsearch.queuename.indexOf(name) == -1) return false;
        return true;
      });

      let total = station[0].data.length;
      mockstation = mockstation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockstation,
            cols: station[0].cols
          }]);
        }, 1000);
      });
    });
    mock.onGet('/stationtotal').reply(config => {
      
      let {page,station ,name} = config.params;
   
      let mockstation = stationtotal[0].data.filter(stationsearch => {
        if (station && stationsearch.stationname.indexOf(station) == -1) return false;
        return true;
      });

      let total = stationtotal[0].data.length;
      mockstation = mockstation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockstation,
            cols: stationtotal[0].cols
          }]);
        }, 1000);
      });
    });
    mock.onGet('/userstationtotal').reply(config => {
      
      let {page, name, pagesize} = config.params;
      let mockuserstation = userstationtotal[0].data.filter(user => {
        
        if (name && user.username.indexOf(name) == -1) return false;
        return true;
      });
      
      let total = userstationtotal[0].data.length;
      mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockuserstation,
            cols: userstationtotal[0].cols
          }]);
        }, 1000);
      });
    });
    mock.onGet('/deal').reply(config => {
      
      let {id} = config.params;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            
            data: deal[0].data,
            cols: deal[0].cols,
            details:deal[0].details[0]
          }]);
        }, 1000);
      });
    });
    mock.onGet('/plan').reply(config => {
      
      let {page, name, pagesize} = config.params;
      
      
      let total = plan[0].data.length;
      let mockplan = plan[0].data.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockplan,
            cols: plan[0].cols
            
          }]);
        }, 1000);
      });
    });


    mock.onGet('/cmshistory').reply(config => {
      
      let {page, name, pagesize} = config.params;
      
      
      let total = cmshistory[0].data.length;
      let mockplan = cmshistory[0].data.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockplan,
            cols: cmshistory[0].cols
            
          }]);
        }, 1000);
      });
    });

    mock.onGet('/cmsdetails').reply(config => {
      
      let {pagetwo, pagesizetwo} = config.params;
      
      
      let total = cmsdetails[0].data.length;
      let mockdetail = cmsdetails[0].data.filter((u, index) => index < pagesizetwo * pagetwo && index >= pagesizetwo * (pagetwo - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockdetail,
            cols: cmsdetails[0].cols
            
          }]);
        }, 1000);
      });
    });

    mock.onGet('/liushui').reply(config => {
      
      let {page, name, pagesize} = config.params;
      
      
      let total = liushui[0].data.length;
      let mockplan = liushui[0].data.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockplan,
            cols: liushui[0].cols
            
          }]);
        }, 1000);
      });
    });
    mock.onGet('/gethistory').reply(config => {
      
      let {page, name, pagesize} = config.params;
      let mockusupervisor = history[0].data.filter(user => {
        
        if (name && user.username.indexOf(name) == -1) return false;
        return true;
      });
      
      let total = history[0].data.length;
      mockusupervisor = mockusupervisor.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockusupervisor,
            cols: history[0].cols
            
          }]);
        }, 1000);
      });
    });
    mock.onGet('/getsupervisor').reply(config => {
      
      let {page, name, pagesize} = config.params;
      let mockusupervisor = supervisor[0].data.filter(user => {
        
        if (name && user.username.indexOf(name) == -1) return false;
        return true;
      });
      
      let total = supervisor[0].data.length;
      mockusupervisor = mockusupervisor.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockusupervisor,
            cols: supervisor[0].cols
            
          }]);
        }, 1000);
      });
    });
    mock.onGet('/userstation').reply(config => {
      
      let {page, name, pagesize} = config.params;
      let mockuserstation = userstation[0].data.filter(user => {
        
        if (name && user.username.indexOf(name) == -1) return false;
        return true;
      });
      
      let total = userstation[0].data.length;
      mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            data: mockuserstation,
            cols: userstation[0].cols
          }]);
        }, 1000);
      });
    });
    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });
    
    mock.onGet('/nav_view').reply(200, {
        msg: NavView
    });
    //催收信息
 		mock.onGet('/tab_view').reply(200, {
        msg:TabView
    });
   //催收历史
   
   	mock.onGet('/tab_message').reply(200, {
        msg:TabMessage
   });
   //客户信息
    	mock.onGet('/userinfo').reply(200, {
        msg:userInfo
   });
    //维保信息
    mock.onGet('/repair').reply(config => {
      // let { id } = config.params;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data:repair[0].data
          }]);
        }, 1000);
      });
    });

    // mock.onGet('/repair').reply(200, {
    //   msg: repair
    // });
    mock.onGet('/addInfo').reply(200, {
      msg: 'ok'
    });
    // //获取用户列表
    // mock.onGet('/user/list').reply(config => {
    //    //config.params放的是用户输入的name,params是user.vue中传递的
    //   let {name} = config.params;
    //   let mockUsers = _Users.filter(user => {
    //     if (name && user.name.indexOf(name) == -1) return false;
    //     return true;
    //   });
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         users: mockUsers
    //       }]);
    //     }, 1000);
    //   });
    // });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {

      let {page, name,val} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((item, index) => index < val * page && index >= val * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers,
            cols:userList[0].cols
          }]);
        }, 1000);
      });
    });

     //获取用户列表（分页）
     mock.onGet('/user1/listpage').reply(config => {
      
            let {page, name,val} = config.params;
            let mockUsers = _Users1.filter(user => {
              if (name && user.name.indexOf(name) == -1) return false;
              return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((item, index) => index < val * page && index >= val * (page - 1));
            console.log(mockUsers);
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve([200, {
                  total: total,
                  users: mockUsers,
                  cols:List2[0].cols
                }]);
              }, 1000);
            });
          });
          
          
      mock.onGet('/addInfo').reply(config =>{
      	
      	 let {UType, UNname,UPhone} = config.params;
      	 return new Promise((resolve, reject)=> {    	 	
      	 	  setTimeout(() => {
                resolve([200, {
                  
                  
                  
                }]);
              }, 1000);
      	 	
      	 	
      	 	
      	 })
      	 
      	
      	
      	
      })

  }
};

