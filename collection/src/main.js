// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store';
import Mock from './mock';
import vSelect from 'vue-select'
import 'font-awesome/css/font-awesome.css'
import Validator from 'vue-validator'
Mock.bootstrap();


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.component('v-select', vSelect);
Vue.use(Validator)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
