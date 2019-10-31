import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import profile from './profile';
import groups from './groups';
import posts from './posts';
import products from './products';
import notes from './notes';
import categories from './categories';
import photos from './photos';
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
      products,
      notes,
      messages,
      errors,
      friends,
      documents,
      photos,
      categories
    },
    strict: process.env.DEV
  })

  return Store
}
