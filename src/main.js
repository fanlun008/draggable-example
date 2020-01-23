import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/less/font-awesome.less";
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';

import animated from 'animate.css' // npm install animate.css --save安装，在引入

Vue.use(animated)

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");


// router.beforeEach((to, from, next) => {
//   if (to.path === '/ch1-flex') {
//     console.log('router...before...')
//     next({ path: '/dragDemo' })
//   }
// })
