<template>
  <div>
    <div class="section" v-if="this.profile.handle">
      <img class="profile-background" :src="anotherUserProfile.background" alt="">
      <div class="profile">
        <div class="avatar">
          <img :src="anotherUserProfile.avatar" alt="">
        </div>
        <div class="edit-profile">
          <h3 class="white-font">{{ anotherUserProfile.handle }}</h3>
          <span class="white-font">{{ anotherUserProfile.status }}</span>
        </div>  
        <ProfileStats/>
        <div class="flex" v-if="this.$store.state.profile.anotherUserProfile.user && this.$store.state.profile.anotherUserProfile.user._id != this.$store.state.auth.user.id">
          <div class="padding" v-if="!this.alreadyFriend">
            <button 
              type="submit"
              @click="addToFriends"
            >
              Add to friends
            </button>
          </div>
          <div class="padding" v-else>
            <button 
              type="submit"
              @click="deleteFromFriends"
            >
              Delete from friends
            </button>
          </div>
          <ModalProfile />
          <div class="error-message">
            {{ this.errors.alreadyfriend }}
          </div>
        </div>
        <div class="padding flex" v-else>
          <router-link 
            :to="{ name: 'editProfile' }">
              <button>Edit profile</button>
          </router-link>
          <div class="leftpadding">
            <button @click="handleClick">Add post</button>
          </div>
        </div>
      </div>
      <div class="post-wrapper">
        <div class="post" v-for="post in profilePosts" :key="post.id">
          <PostCard 
            :name="post.name"
            :avatar="post.avatar"
            :address="{ name: 'post', params: { id: post._id } }"
            :text="post.text"
            :date="post.date"/>
        </div>
      </div>
    </div>
    <section v-else class="register">
      <NoProfileMessage />
    </section>
    <modals-container />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import modal from 'vue-js-modal';

import ModalProfile from './ModalProfile.vue';
import PostCard from '@/components/Post/PostCard';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';
import ProfileStats from '@/components/Profile/ProfileStats';
import PostForm from '../Post/PostForm';

export default {
  name: 'Profile',
  // watch: {
  //   '$route.params.handle'(newHandle, oldHandle) {
  //     this.getProfileByHandle(newHandle);
  //     this.getProfilePosts(newHandle);
  //   }
  // },
  async mounted() {
    await this.getProfilePhotos(this.$route.params.handle);
    await this.getProfilePosts(this.$route.params.handle);
    await this.getProfileByHandle(this.$route.params.handle);
    await this.getProfileGroups(this.$route.params.handle);
    await this.exportCurrentProfile();
  },
  
  computed: {
    ...mapState('profile', ['profiles','anotherUserProfile','profile', 'profilePhotos', 'profilePosts', 'profileGroups' ]),
    ...mapState('errors', ['errors']),
    alreadyFriend() {
      const friends = this.$store.state.profile.profile.friends;
      if (friends.some(e => e.handle === this.$store.state.profile.anotherUserProfile.handle)) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle', 'exportCurrentProfile', 'getProfilePhotos', 'getProfilePosts', 'getProfileGroups']),
    addToFriends() {
      const payload = {
        handle: this.$store.state.profile.anotherUserProfile.handle,
        avatar: this.$store.state.profile.anotherUserProfile.avatar
      };
      this.$store.dispatch('profile/addToFriends', payload)
      .catch((error) => console.log(error))
    },
    deleteFromFriends() {
      const handle = this.$store.state.profile.anotherUserProfile.handle;
      this.$store.dispatch('profile/deleteFromFriends', handle)
      .catch((error) => console.log(error))
    },
    handleClick() {
      this.$modal.show(PostForm)
    },
  },
  components: {
    ModalProfile,
    PostCard,
    ProfileStats,
    PostForm,
    NoProfileMessage
  },
}
</script>

<style>

</style>