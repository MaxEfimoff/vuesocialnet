import Vue from 'vue';
import Router from 'vue-router';
// Auth
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';
// Posts
import Post from './views/Post.vue';
import Posts from './views/Posts.vue';
import PostForm from './views/PostForm.vue';
// Messages
import Message from './views/Message.vue';
import Messages from './views/Messages.vue';
// Notes
import Note from './views/Note.vue';
import Notes from './views/Notes.vue';
import NoteForm from './views/NoteForm.vue';
// Profiles
import Profile from './views/Profile.vue';
import Profiles from './views/Profiles.vue';
import CreateProfile from './views/CreateProfile.vue';
import EditProfile from './views/EditProfile.vue';
// Groups
import Group from './views/Group.vue';
import Groups from './views/Groups.vue';
// Documents
import Documents from './views/Documents.vue';
import DocumentForm from './views/DocumentForm.vue';
// Photos
import Photos from './views/Photos.vue';
// Friends
import Friends from './views/Friends.vue';
import Subscribers from './views/Subscribers.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Auth
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    // Posts
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/post-form',
      name: 'postForm',
      component: PostForm
    },
    {
      path: '/posts/:id',
      name: 'post',
      props: true,
      component: Post,
    },
    // Messages
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
    },
    {
      path: '/messages/:id',
      name: 'message',
      props: true,
      component: Message,
    },
    // Notes 
    {
      path: '/notes',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/note-form',
      name: 'noteForm',
      component: NoteForm
    },
    {
      path: '/notes/:id',
      name: 'note',
      props: true,
      component: Note,
    },
    // Profiles
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
    // Groups
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/groups/:id',
      name: 'group',
      props: true,
      
      component: Group,
    },
    // Documents
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
    },
    {
      path: '/document-form',
      name: 'documentForm',
      component: DocumentForm
    },
    // Photos 
    {
      path: '/photos',
      name: 'photos',
      component: Photos,
    },
    // Friends
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
    
  ]
})
