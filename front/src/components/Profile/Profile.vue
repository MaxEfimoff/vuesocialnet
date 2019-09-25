<template>
  <div class="section">
    <img class="profile-background" src="../../assets/img/photos/unsplash_2.jpg" alt="">
    <div class="profile">
      <div class="avatar">
        <img :src=" require(`@/assets/img/anon.jpg`) " alt="">
      </div>
       <div class="edit-profile">
        <h3 class="white-font">{{ anotherUserProfile.handle }}</h3>
        <span class="white-font">{{ anotherUserProfile.status }}</span>
      </div>  
      <!-- Stats -->
      <div class="stats">
        <a href="/friends" class="stat-counter">
          <div class="count">
            <div class="white-font">{{ anotherUserProfile.friends.length }}</div>
          </div>
          <i class="fas fa-user white-font"></i>
        </a>
        <!-- <a href="/subscribers" class="stat-counter lefthalfpadding">
          <div class="count">93</div>
          <i class="fas fa-user-plus"></i>
        </a> -->
        <a href="/photos" class="stat-counter lefthalfpadding">
          <div class="count">
            <div class="white-font">
              554
            </div>
          </div>
          <i class="fas fa-camera white-font"></i>
        </a>
        <a href="/groups" class="stat-counter lefthalfpadding">
          <div class="count">
            <div class="white-font">
              41
            </div>
          </div>
          <i class="fas fa-users white-font"></i>
        </a>
      </div>
      <div class="flex">
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
        <div class="error-message">
          {{ this.errors.alreadyfriend }}
        </div>
      </div>
    </div>
      <SendMessage
        :formData="formData"
        :onSubmit="submitForm"
        @change="onChange"
      />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SendMessage from'@/components/helpers/SendMessage.vue'

export default {
  name: 'Profile',
  mounted() {
    this.getProfileByHandle(this.$route.params.handle);
    this.getGroups();
    this.getMessages();
    this.exportCurrentProfile();
  },
  
  computed: {
    ...mapState('profile', ['profiles','anotherUserProfile','profile' ]),
    ...mapState('errors', ['errors']),
    alreadyFriend() {
      const friends = this.$store.state.profile.profile.friends;
      if (friends.some(e => e.handle === this.$store.state.profile.anotherUserProfile.handle)) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions("profile", ['getProfileByHandle', 'exportCurrentProfile']),
    ...mapActions("groups",['getGroups']),
    ...mapActions("messages",['getMessages']),
    onChange(newFormData) {
      this.formData = newFormData;
    },
    submitForm() {
      const newData = Object.assign({}, this.formData);

      this.$store.dispatch('messages/addMessage', newData)
        .then(() => this.$router.push({ name: 'messages' }))
        .catch((error) => {
          console.log(error)
        });
    },
    addToFriends() {
      const handle = {
        handle: this.$store.state.profile.anotherUserProfile.handle
      };
      this.$store.dispatch('profile/addToFriends', handle)
      .catch((error) => console.log(error))
    },
    deleteFromFriends() {
      const handle = this.$store.state.profile.anotherUserProfile.handle;
      this.$store.dispatch('profile/deleteFromFriends', handle)
      .catch((error) => console.log(error))
    }
  },
  components: {
    SendMessage
  },
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        recipient: this.$store.state.profile.anotherUserProfile.user.name,
        // avatar: this.$store.state.auth.user.avatar,
        user: this.$store.state.auth.user.id
      },
    };
  },
}
</script>

<style>

</style>