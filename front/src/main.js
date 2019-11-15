import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal';
import vuelidate from 'vuelidate';
import filters from './filters';
import AppSocket from './plugins/socket';

import App from './App.vue';
import router from './router';
import store from './store/index.js';

Vue.use(VModal, { dialog: true, dynamic: true });
Vue.use(Vuelidate);
Vue.use(AppSocket, {connection: 'http://localhost:5000'});

Vue.config.productionTip = false;

filters();

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App)
}).$mount('#app');
