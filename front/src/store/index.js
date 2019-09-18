import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import groups from './groups';
import errors from './errors';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      auth,
      groups,
      errors
    },
    // getters: {
    //   loggedIn(state) {
    //     return Boolean(state.user.user.id);
    //   }
    // },
    strict: process.env.DEV
  })

  return Store
}
