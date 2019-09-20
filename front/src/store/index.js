import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import profile from './profile';
import groups from './groups';
import errors from './errors';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      auth,
      profile,
      groups,
      errors
    },
    strict: process.env.DEV
  })

  return Store
}
