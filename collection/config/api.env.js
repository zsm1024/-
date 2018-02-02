'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"api"',
  // BASE_API: '"http://192.168.2.111:8080"'
  BASE_API: '"http://10.50.132.72:18081"',
  //BASE_API: '"http://10.50.132.72:18082"',
})