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
          <div class="count">{{ anotherUserProfile.friends.length }}</div>
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
      <div class="padding">
        <button type="submit" @click="addToFriends">Add to friends</button>
      </div>
      <div class="error-message">
        {{ this.errors.alreadyfriend }}
      </div>
      <!-- <form @submit.prevent="submitForm" class="post-new-form">
        <div class="halfpadding"> 
          <input
            type="text"
            placeholder="Send a message"
            v-model="formData.text"
          />
        </div>
        <div class="padding">
          <button type="submit">Submit</button>
        </div>
      </form> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',
  mounted() {
    this.getProfileByHandle(this.$route.params.handle);
    this.getGroups();
    this.getMessages();
    this.exportCurrentProfile();
  },
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        recipient: this.$store.state.profile.anotherUserProfile.user.name,
        // avatar: this.$store.state.profile.profile.avatar
      },
    };
  },
  computed: {
    ...mapState('profile', ['profiles','anotherUserProfile','profile' ]),
    ...mapState('errors', ['errors']),
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle', 'exportCurrentProfile']),
    ...mapActions("groups",['getGroups']),
    ...mapActions("messages",['getMessages']),
    // submitForm() {
    //   console.log(this.formData)
    //   this.$store.dispatch('messages/addMessage', this.formData)
    //   // .then(() => this.$router.push({ name: 'notes' }))
    //   .catch((error) => {console.log(error)
    //   })
    // },
    addToFriends() {
      const handle = {
        handle: this.$store.state.profile.anotherUserProfile.handle
      };
      this.$store.dispatch('profile/addToFriends', handle)
      .catch((error) => console.log(error))
    }
  },
}
</script>

<style>

</style>