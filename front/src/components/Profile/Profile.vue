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
      <!-- Stats -->
      <div class="stats">
        <router-link
          class="stat-counter"
          :to="`${anotherUserProfile.handle}/friends/`"
        >
          <div class="count">
            <div v-if="anotherUserProfile.friends.length" class="white-font">{{ anotherUserProfile.friends.length }}</div>
            <div v-else class="white-font">0</div>
          </div>
          <i class="fas fa-user white-font"></i>
        </router-link>
        <!-- <a href="/subscribers" class="stat-counter lefthalfpadding">
          <div class="count">93</div>
          <i class="fas fa-user-plus"></i>
        </a> -->
        <router-link
          class="stat-counter lefthalfpadding"
          :to="`${anotherUserProfile.handle}/photos/`"
        >
          <div class="count">
            <div v-if="profilePhotos.length" class="white-font">
              {{ profilePhotos.length }}
            </div>
            <div v-else class="white-font">
              0
            </div>
          </div>
          <i class="fas fa-camera white-font"></i>
        </router-link>
        <router-link
          class="stat-counter lefthalfpadding"
          :to="`${anotherUserProfile.handle}/groups/`"
        >
          <div class="count">
            <div class="white-font">
              41
            </div>
          </div>
          <i class="fas fa-users white-font"></i>
        </router-link>
      </div>
      <div class="flex" v-if="this.$store.state.profile.anotherUserProfile.user._id != this.$store.state.auth.user.id">
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
        <ModalProfile/>
        <div class="error-message">
          {{ this.errors.alreadyfriend }}
        </div>
      </div>
      <div class="padding flex" v-else>
        <router-link 
          :to="{ name: 'editProfile' }">
            <button>Edit profile</button>
        </router-link>
      </div>

    </div>
      <div class="post-wrapper">
        <div class="post" v-for="post in profilePosts.slice(0, 10)" :key="post.id">
          <PostCard 
          :post="post"/>
        </div>
      </div>
  </div>
  <section v-else class="register">
    <NoProfileMessage />
  </section>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalProfile from './ModalProfile.vue';
import PostCard from '@/components/Post/PostCard';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';

export default {
  name: 'Profile',
  mounted() {
    this.getProfilePhotos(this.$route.params.handle);
    this.getProfilePosts(this.$route.params.handle);
    this.getProfileByHandle(this.$route.params.handle);
    this.getGroups();
    this.getMessages();
    this.exportCurrentProfile();
  },
  
  computed: {
    ...mapState('profile', ['profiles','anotherUserProfile','profile', 'profilePhotos', 'profilePosts' ]),
    ...mapState('errors', ['errors']),
    alreadyFriend() {
      const friends = this.$store.state.profile.profile.friends;
      if (friends.some(e => e.handle === this.$store.state.profile.anotherUserProfile.handle)) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle', 'exportCurrentProfile', 'getProfilePhotos', 'getProfilePosts']),
    ...mapActions("groups",['getGroups']),
    ...mapActions("messages",['getMessages']),
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
    }
  },
  components: {
    ModalProfile,
    PostCard
  },
}
</script>

<style>

</style>