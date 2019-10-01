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
      <div class="post-wrapper">
        <div class="post" v-for="post in profilePosts.slice(0, 10)" :key="post.id">
          <div class="post-author flex">
            <router-link
              :to="`/profile/handle/${post.name}`"
            >
              <div>
                <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
                <div class='text-center'>
                  <span>{{ post.name }}</span>
                </div>
              </div>
            </router-link>
            <router-link
              :to="`/posts/${post._id}`"
            >
              <div class="leftmargin">
                <span>{{ post.text }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SendMessage from'@/components/helpers/SendMessage.vue'

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