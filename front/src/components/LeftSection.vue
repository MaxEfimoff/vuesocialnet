<template>
  <section class="section-left">
    <!-- Avatar -->
    <div class="section">
      <img class="avatar-background" src="../assets/img/photos/unsplash_2.jpg" alt="">
      <div class="avatar">
        <img class="avatar" :src=" require(`@/assets/img/01.jpg`) " alt="">
      </div>
      <div class="edit-profile">
        <h3>{{ profile.handle }}</h3>
        <span>{{ profile.status }}</span>
      </div>  
      <!-- Stats -->
      <div class="stats">
        <router-link
          class="stat-counter"
          :to="{ name: 'friends' }"
        >
          <div class="count">{{ profile.friends.length }}</div>
          <i class="fas fa-user"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'messages' }"
        >
          <div class="count">{{ messages.length }}</div>
          <i class="fas fa-envelope"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'photos' }"
        >
          <div class="count">{{ photos.length }}</div>
          <i class="fas fa-camera"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'mygroups' }"
        >
          <div class="count">{{ mygroups.length }}</div>
          <i class="fas fa-users"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'documents' }"
        >
          <div class="count">{{ documents.length }}</div>
          <i class="fas fa-file-alt"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'notes' }"
        >
          <div class="count">{{ notes.length }}</div>
          <i class="fas fa-sticky-note"></i>
        </router-link> 
      </div>
      <div class="edit-profile halfpadding">
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </div>
      <div class="edit-profile">
        <div class="personal-info">
          <div class="education padding">
            <a>Company</a>
            <span>{{ profile.company }}</span>
          </div>
          <div class="show-more">
            <a @click="showProfile">
              <i
                href="#"
                class="fas fa-chevron-down"
                id="showMoreInfo"
                ref="showMoreInfo"
              ></i></a>
          </div>
          <!-- More info hidden -->
          <div class="container-slider"> 
            <div id="slider" ref="slider" class="slideup">
              <div class="education padding">
                <a>Website</a>
                <span>{{ profile.website }}</span>
              </div>
              <div class="education padding">
                <a>Location </a>
                <span>{{ profile.location }}</span>
              </div>
              <div class="education padding">
                <a>Bio</a>
                <span>{{ profile.bio }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Friends -->
    <div class="section friends">
      <router-link
        :to="`/friends`"
      >
        <span>Friends</span>
      </router-link> 
      <div>
        <router-link
          v-for="profile in profile.friends.slice(0, 6)"
          :key="profile.id"
          :to="`/profile/handle/${profile.handle}`"
        >
          <img
            class="friends-photo"
            src="../assets/img/anon.jpg"
            alt=""
            :title='profile.handle'
          >
        </router-link>
      </div>
    </div>
    <!-- Groups -->
    <div class="section groups">
      <router-link
        :to="`/groups`"
      >
        <span>Groups</span>
      </router-link>
      <div class="groups-wrapper" v-for="group in mygroups.slice(0, 4)" :key="group.id">
        <router-link :to="`/groups/${group._id}`">
          <div class="groups-photo">
            <img class="groups-img" src="../assets/img/groups/01.jpg"  alt="">
            <span>{{ group.handle }}</span>
          </div>  
        </router-link>
      </div>
    </div>
    <!-- Photos -->
    <div class="section photos" v-if="photos.length > 0">
      <router-link
        :to="`/photos`"
      >
        <span>Photos</span>
      </router-link>
      <div class="photos-wrapper" v-for="photo in photos.slice(0, 2)" :key="photo.id">
        <router-link
          :to="`/photos/${photo._id}`"
        >
          <div class="photos-photo">
            <img class="photo-img" :src=" require(`../../../back/uploads/${photo.image}`) " alt="">
            <span>TODO: Photo description</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Main',
  created() {
    this.getMyGroups();
    this.getMessages();
    this.getNotes();
    this.getPhotos();
    this.getDocuments();
    this.exportCurrentProfile();
  },
  methods: {
    ...mapActions("groups",['getMyGroups']),
    ...mapActions("messages",['getMessages']),
    ...mapActions("notes",['getNotes']),
    ...mapActions("photos",['getPhotos']),
    ...mapActions("documents",['getDocuments']),
    ...mapActions("profile",['exportCurrentProfile']),
    showProfile() {
      if(this.$refs.slider.classList.contains("slideup")) {
        this.$refs.slider.classList.remove("slideup");
        this.$refs.slider.classList.add("slidedown");
        this.$refs.showMoreInfo.classList.remove("fa-chevron-down");
        this.$refs.showMoreInfo.classList.add("fa-chevron-up");
      } else {
        this.$refs.slider.classList.remove("slidedown");
        this.$refs.slider.classList.add("slideup");
        this.$refs.showMoreInfo.classList.remove("fa-chevron-up");
        this.$refs.showMoreInfo.classList.add("fa-chevron-down");
      }
    }
  },
  computed: {
    ...mapState('groups', [ 'mygroups']),
    ...mapState('messages', [ 'messages']),
    ...mapState('notes', [ 'notes']),
    ...mapState('photos', [ 'photos']),
    ...mapState('documents', [ 'documents']),
    ...mapState('auth', [ 'user']),
    ...mapState('profile', [ 'profile']),
  },
}



// const showMoreInfo = document.getElementById('showMoreInfo');
// const slider = document.getElementById('slider');

// showMoreInfo.addEventListener('click', () => {
//   if (slider.classList.contains("slideup")) 
//   {
//     slider.classList.remove("slideup");
//     slider.classList.add("slidedown");
//     showMoreInfo.classList.remove("fa-chevron-down");
//     showMoreInfo.classList.add("fa-chevron-up");
//   } else {
//     slider.classList.remove("slidedown");
//     slider.classList.add("slideup");
//     showMoreInfo.classList.remove("fa-chevron-up");
//     showMoreInfo.classList.add("fa-chevron-down");
//   } 
// });


</script>

<style>

</style>