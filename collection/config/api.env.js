'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"api"',
//BASE_API: '"http://10.50.130.26:8080"'  //g,
//BASE_API: '"http://10.50.101.210:8081/ics/"'  //g
 //BASE_API: '"http://192.168.2.113:8080"'
//BASE_API: '"http://10.50.101.210:8081/ics/"'//测试地址,
// BASE_API: '"'+Module+'"' ,//
//BASE_API: '"http://icstest.gwmfc.com:18081/ics"',//测试地址
// BASE_API: path,//测试地址
//BASE_API: '"http://10.5.1.50:10001"'//生产地址
});