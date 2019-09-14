import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import groups from './groups';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      user,
      groups
    },
    getters: {
      loggedIn(state) {
        return Boolean(state.user.user.id);
      }
    },
    strict: process.env.DEV
  })

  return Store
}
