import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// MockAdapter是一个模拟后台get的请求，es6语法
import { Users1 } from './data/user1';
import { LoginUsers, Users } from './data/user';
import { station, userstation } from './data/monitor';
import { NavView } from './data/navview';
import { TabView } from './data/tabView';
//同样以LoginUsers, Users 的方式来接收，from的url
let _Users = Users;
let _Users1 = Users1;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);



    mock.onGet('/station').reply(config => {
      
      let {page, name} = config.params;
      let mockstation = station.filter(stationsearch => {
        if (name && stationsearch.queuename.indexOf(name) == -1) return false;
        return true;
      });
      let total = station.length;
      mockstation = mockstation.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            station: mockstation
          }]);
        }, 1000);
      });
    });

    mock.onGet('/userstation').reply(config => {
      
      let {page, name, pagesize} = config.params;
      let mockuserstation = userstation.filter(user => {
        
        if (name && user.username.indexOf(name) == -1) return false;
        return true;
      });
      
      let total = userstation.length;
      mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            userstation: mockuserstation
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
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve([200, {
                  total: total,
                  users: mockUsers,
                }]);
              }, 1000);
            });
          });

  }
};

