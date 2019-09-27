import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import profile from './profile';
import groups from './groups';
import posts from './posts';
import notes from './notes';
import documents from './documents';
import messages from './messages';
import friends from './friends';
import errors from './errors';

Vue.use(Vuex)


export default function () {

  const Store = new Vuex.Store({
    modules: {
      auth,
      profile,
      groups,
      posts,
      notes,
      messages,
      errors,
      friends,
      documents
    },
    strict: process.env.DEV
  })

  return Store
}
