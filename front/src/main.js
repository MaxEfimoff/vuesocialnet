import Vue from 'vue';
import VModal from 'vue-js-modal';

import App from './App.vue';
import router from './router';
import store from './store/index.js';

Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
