import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Posts from './views/Posts.vue'
import Friends from './views/Friends.vue'
import Subscribers from './views/Subscribers.vue'
import Messages from './views/Messages.vue'
import Photos from './views/Photos.vue'
import Groups from './views/Groups.vue'
import Documents from './views/Documents.vue'
import Notes from './views/Notes.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import CreateProfile from './views/CreateProfile.vue'
import EditProfile from './views/EditProfile.vue'
import Profiles from './views/Profiles.vue'
import Profile from './views/Profile.vue'
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
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
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/create-profile',
      name: 'createProfile',
      component: CreateProfile,
    },
    {
      path: '/edit-profile',
      name: 'editProfile',
      component: EditProfile,
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: Profiles,
    },
    {
      path: '/profile/handle/:handle',
      name: 'profile',
      props: true,
      component: Profile,
    },
    {
      path: '/posts/:id',
      name: 'post',
      props: true,
      component: Post,
    },
  ]
})
