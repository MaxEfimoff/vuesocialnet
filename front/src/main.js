import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal';
import filters from './filters';
import io from 'socket.io-client';

import App from './App.vue';
import router from './router';
import store from './store/index.js';

Vue.use(VModal, { dialog: true, dynamic: true });
Vue.use(Vuelidate);

Vue.config.productionTip = false;

filters();

const socket = io('http://localhost:5000');

new Vue({
  router,
  store,
  vuelidate,
  socket,
  render: h => h(App)
}).$mount('#app');
