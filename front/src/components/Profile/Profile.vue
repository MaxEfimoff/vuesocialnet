<template>
<div class="section">
  <img class="avatar-background" src="../../assets/img/photos/unsplash_2.jpg" alt="">
            <div class="avatar">
              <img class="avatar-wide" :src=" require(`@/assets/img/anon.jpg`) " alt="">
            </div>
            <div class="edit-profile">
              <h3>{{ anotherUserProfile.handle }}</h3>
              <span>{{ anotherUserProfile.status }}</span>
            </div>  
            <!-- Stats -->
            <div class="stats">
              <a href="/friends" class="stat-counter">
                <!-- <div class="count">{{ anotherUserProfile.friends.length }}</div> -->
                <i class="fas fa-user"></i>
              </a>
              <a href="/subscribers" class="stat-counter lefthalfpadding">
                <div class="count">93</div>
                <i class="fas fa-user-plus"></i>
              </a>
              <a href="/photos" class="stat-counter lefthalfpadding">
                <div class="count">554</div>
                <i class="fas fa-camera"></i>
              </a>
              <a href="/groups" class="stat-counter lefthalfpadding">
                <div class="count">41</div>
                <i class="fas fa-users"></i>
              </a>
              <a href="/documents" class="stat-counter lefthalfpadding">
                <div class="count">13</div>
                <i class="fas fa-file-alt"></i>
              </a>
              <a href="/notes" class="stat-counter lefthalfpadding">
                <div class="count">11</div>
                <i class="fas fa-sticky-note"></i>
              </a>
            </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',
  created() {
    this.getProfileByHandle(this.$route.params.handle);
    this.getGroups();
    this.getMessages();
  },
  computed: {
    ...mapState('profile', ['profiles']),
    ...mapState('profile', ['profile']),
    ...mapState('profile', ['anotherUserProfile']),
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle']),
    ...mapActions("groups",['getGroups']),
    ...mapActions("messages",['getMessages']),
  },
}
</script>

<style>

</style>