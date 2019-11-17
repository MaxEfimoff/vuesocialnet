import Vue from 'vue';
import Router from 'vue-router';
// Auth
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
// Calendar
import Calendar from '@/views/Calendar.vue';
// Events
import EventForm from '@/views/EventForm.vue';
import Events from '@/views/Events.vue';
import EventsSearch from '@/views/EventsSearch.vue';
import Event from '@/views/Event.vue';
// Posts
import Post from '@/views/Post.vue';
import Posts from '@/views/Posts.vue';
import MyPosts from '@/views/MyPosts.vue';
import FriendsPosts from '@/views/FriendsPosts.vue';
import PostForm from '@/views/PostForm.vue';
import EditPost from '@/views/EditPost.vue';
import GroupPostForm from '@/views/GroupPostForm.vue';
// Products
import Product from '@/views/Product.vue';
import Products from '@/views/Products.vue';
import MyProducts from '@/views/MyProducts.vue';
import FriendsProducts from '@/views/FriendsProducts.vue';
import ProductForm from '@/views/ProductForm.vue';
import EditProduct from '@/views/EditProduct.vue';
// Messages
import Message from '@/views/Message.vue';
import Messages from '@/views/Messages.vue';
// Notes
import Note from '@/views/Note.vue';
import Notes from '@/views/Notes.vue';
import NoteForm from '@/views/NoteForm.vue';
// Profiles
import Profile from '@/views/Profile.vue';
import ProfileFriends from '@/views/ProfileFriends.vue';
import ProfilePhotos from '@/views/ProfilePhotos.vue';
import Profiles from '@/views/Profiles.vue';
import CreateProfile from '@/views/CreateProfile.vue';
import EditProfile from '@/views/EditProfile.vue';
// Groups
import Group from '@/views/Group.vue';
import Groups from '@/views/Groups.vue';
import ManageGroups from '@/views/ManageGroups.vue';
import MyGroups from '@/views/MyGroups.vue';
import GroupPost from '@/views/GroupPost.vue';
import GroupForm from '@/views/GroupForm.vue';
import EditGroup from '@/views/EditGroup.vue';
import EditGroupPost from '@/views/EditGroupPost.vue';
// Documents
import Document from '@/views/Document.vue';
import Documents from '@/views/Documents.vue';
import DocumentForm from '@/views/DocumentForm.vue';
// Photos
import Photo from '@/views/Photo.vue';
import Photos from '@/views/Photos.vue';
import PhotoForm from '@/views/PhotoForm.vue';
// Friends
import Friends from '@/views/Friends.vue';
import Subscribers from '@/views/Subscribers.vue';
// 404
import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Auth
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    // Calendar
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    // Events
    {
      path: '/event-form',
      name: 'eventForm',
      component: EventForm
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/events/search',
      name: 'eventsSearch',
      component: EventsSearch
    },
    {
      path: '/events/search/:eventcategory',
      name: 'eventsSearchCategory',
      props: true,
      component: EventsSearch
    },
    {
      path: '/events/:id',
      name: 'event',
      props: true,
      component: Event
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
      path: '/posts/:id/edit-post',
      name: 'editPost',
      component: EditPost
    },
    {
      path: '/posts/:id',
      name: 'post',
      props: true,
      component: Post
    },
    // Products
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/my-products',
      name: 'my-products',
      component: MyProducts
    },
    {
      path: '/friends-products',
      name: 'friends-products',
      component: FriendsProducts
    },
    {
      path: '/product-form',
      name: 'productForm',
      component: ProductForm
    },
    {
      path: '/products/:id/edit-product',
      name: 'editProduct',
      component: EditProduct
    },
    {
      path: '/products/:id',
      name: 'product',
      props: true,
      component: Product
    },
    // Messages
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messages/:id',
      name: 'message',
      props: true,
      component: Message
    },
    // Notes 
    {
      path: '/notes',
      name: 'notes',
      component: Notes
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
      component: Note
    },
    // Profiles
    {
      path: '/create-profile',
      name: 'createProfile',
      component: CreateProfile
    },
    {
      path: '/edit-profile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: Profiles
    },
    {
      path: '/profile/handle/:handle',
      name: 'profile',
      props: true,
      component: Profile
    },
    {
      path: '/profile/handle/:handle/friends',
      name: 'profilefriends',
      component: ProfileFriends
    },
    {
      path: '/profile/handle/:handle/photos',
      name: 'profilephotos',
      component: ProfilePhotos
    },
    // Groups
    {
      path: '/groups',
      name: 'groups',
      component: Groups
    },
    {
      path: '/groups/manage-groups',
      name: 'managegroups',
      component: ManageGroups
    },
    {
      path: '/groups/my-groups',
      name: 'mygroups',
      component: MyGroups
    },
    {
      path: '/groups/create-group',
      name: 'groupform',
      component: GroupForm
    },
    {
      path: '/groups/:id/edit-group',
      name: 'editGroup',
      component: EditGroup
    },
    {
      path: '/groups/:groupid/posts/:id/edit-post',
      name: 'editGroupPost',
      component: EditGroupPost
    },
    {
      path: '/groups/:id',
      name: 'group',
      props: true,
      component: Group
    },
    {
      path: '/groups/:id/post',
      name: 'grouppostform',
      props: true,
      component: GroupPostForm
    },
    {
      path: '/groups/:id/posts/:id',
      name: 'grouppost',
      props: true,
      component: GroupPost
    },
    // Documents
    {
      path: '/documents/:id',
      name: 'document',
      props: true,
      component: Document
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents
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
      component: Photo
    },
    {
      path: '/photos',
      name: 'photos',
      component: Photos
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
      component: Friends
    },
    {
      path: '/subscribers',
      name: 'subscribers',
      component: Subscribers
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound
    }
    
  ]
})
