import Vue from 'vue';
import Router from 'vue-router';
// Auth
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';
// Posts
import Post from './views/Post.vue';
import Posts from './views/Posts.vue';
import MyPosts from './views/MyPosts.vue';
import FriendsPosts from './views/FriendsPosts.vue';
import PostForm from './views/PostForm.vue';
import GroupPostForm from './views/GroupPostForm.vue';
// Messages
import Message from './views/Message.vue';
import Messages from './views/Messages.vue';
// Notes
import Note from './views/Note.vue';
import Notes from './views/Notes.vue';
import NoteForm from './views/NoteForm.vue';
// Profiles
import Profile from './views/Profile.vue';
import ProfileFriends from './views/ProfileFriends.vue';
import ProfilePhotos from './views/ProfilePhotos.vue';
import Profiles from './views/Profiles.vue';
import CreateProfile from './views/CreateProfile.vue';
import EditProfile from './views/EditProfile.vue';
// Groups
import Group from './views/Group.vue';
import Groups from './views/Groups.vue';
import ManageGroups from './views/ManageGroups.vue';
import MyGroups from './views/MyGroups.vue';
import GroupPost from './views/GroupPost.vue';
import GroupForm from './views/GroupForm.vue';
import EditGroup from './views/EditGroup.vue';
// Documents
import Document from './views/Document.vue';
import Documents from './views/Documents.vue';
import DocumentForm from './views/DocumentForm.vue';
// Photos
import Photo from './views/Photo.vue';
import Photos from './views/Photos.vue';
import PhotoForm from './views/PhotoForm.vue';
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
      path: '/my-posts',
      name: 'my-posts',
      component: MyPosts
    },
    {
      path: '/friends-posts',
      name: 'friends-posts',
      component: FriendsPosts
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
    {
      path: '/profile/handle/:handle/friends',
      name: 'profilefriends',
      component: ProfileFriends,
    },
    {
      path: '/profile/handle/:handle/photos',
      name: 'profilephotos',
      component: ProfilePhotos,
    },
    // Groups
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/groups/manage-groups',
      name: 'managegroups',
      component: ManageGroups,
    },
    {
      path: '/groups/my-groups',
      name: 'mygroups',
      component: MyGroups,
    },
    {
      path: '/groups/create-group',
      name: 'groupform',
      component: GroupForm,
    },
    {
      path: '/groups/:id/edit-group',
      name: 'editGroup',
      component: EditGroup,
    },
    {
      path: '/groups/:id',
      name: 'group',
      props: true,
      component: Group,
    },
    {
      path: '/groups/:id/post',
      name: 'grouppostform',
      props: true,
      component: GroupPostForm,
    },
    {
      path: '/groups/:id/posts/:id',
      name: 'grouppost',
      props: true,
      component: GroupPost,
    },
    // Documents
    {
      path: '/documents/:id',
      name: 'document',
      props: true,
      component: Document,
    },
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
      path: '/photos/:id',
      name: 'photo',
      props: true,
      component: Photo,
    },
    {
      path: '/photos',
      name: 'photos',
      component: Photos,
    },
    {
      path: '/photo-form',
      name: 'photoForm',
      component: PhotoForm
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
