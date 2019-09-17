import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import groups from './groups';
import errors from './errors';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      user,
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
