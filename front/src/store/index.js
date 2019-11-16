import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import calendar from './calendar';
import profile from './profile';
import groups from './groups';
import posts from './posts';
import products from './products';
import notes from './notes';
import meta from './meta';
import events from './events';
import categories from './categories';
import eventcategories from './eventcategories';
import eventthreads from './eventthreads';
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
      events,
      calendar,
      profile,
      groups,
      posts,
      products,
      notes,
      meta,
      messages,
      errors,
      friends,
      documents,
      photos,
      categories,
      eventcategories,
      eventthreads
    },
    strict: process.env.DEV
  })

  return Store
}
