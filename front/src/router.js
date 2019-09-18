import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Friends from './views/Friends.vue'
import Subscribers from './views/Subscribers.vue'
import Messages from './views/Messages.vue'
import Photos from './views/Photos.vue'
import Groups from './views/Groups.vue'
import Documents from './views/Documents.vue'
import Notes from './views/Notes.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends,
    },
    {
      path: '/subscribers',
      name: 'subscribers',
      component: Subscribers,
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
    },
    {
      path: '/photos',
      name: 'photos',
      component: Photos,
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
    },
    {
      path: '/notes',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})
