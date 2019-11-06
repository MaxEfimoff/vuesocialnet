<template>
  <section class="section-left">
    <!-- Avatar -->
    <div class="section">
      <div class="avatar-font" :style="{ backgroundImage: 'url(' + `${profile.background}` + ')' }">
      </div>
      <router-link
        class="stat-counter"
        :to="`/profile/handle/${profile.handle}`"
      >
        <div class="avatar">
          <!-- <img class="avatar" :src=" require(`@/assets/img/01.jpg`) " alt=""> -->
          <img :src="profile.avatar" alt="">
        </div>
      </router-link>
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
          :to="{ name: 'groups' }"
        >
          <div class="count">{{ mygroups.length }}</div>
          <i class="fas fa-users"></i>
        </router-link> 
        <!-- <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'documents' }"
        >
          <div class="count">{{ documents.length }}</div>
          <i class="fas fa-file-alt"></i>
        </router-link>  -->
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'notes' }"
        >
          <div class="count">{{ notes.length }}</div>
          <i class="fas fa-sticky-note"></i>
        </router-link>
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'products' }"
        >
          <div class="count">{{ myproducts.length }}</div>
          <i class="fas fa-shopping-cart"></i>
        </router-link> 
        <router-link
          class="stat-counter lefthalfpadding"
          :to="{ name: 'calendar' }"
        >
          <!-- <div class="count">{{ calendar.length }}</div> -->
          <div class="count">9</div>
          <i class="fas fa-calendar"></i>
        </router-link> 
      </div>
      <!-- Stats -->
      <div class="edit-profile halfpadding">
        <router-link :to="{ name: 'dashboard' }"><button>Dashboard</button></router-link>
      </div>
      <div class="edit-profile">
        <div class="personal-info">
          <div class="education padding">
            <a>Company</a>
            <span>{{ profile.company }}</span>
          </div>
          <div class="show-more">
            <a >
              <i
                @click="toggleVisibility"
                href="#"
                :class="[visible ? 'fas fa-chevron-up': 'fas fa-chevron-down']"
                id="showMoreInfo"
                ref="showMoreInfo"
              ></i></a>
          </div>
          <!-- More info hidden -->
          <transition name="dropdown-fade">
            <div v-if="visible"> 
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
          </transition>
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
            :src='profile.avatar'
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
            <img class="groups-img" :src="group.avatar"  alt="">
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
  mounted() {
    this.getMyGroups();
    this.getMessages();
    this.getNotes();
    this.getMyProducts();
    this.getPhotos();
    // this.getDocuments();
    this.exportCurrentProfile();
  },
  methods: {
    ...mapActions("groups",['getMyGroups']),
    ...mapActions("messages",['getMessages']),
    ...mapActions("notes",['getNotes']),
    ...mapActions("products",['getMyProducts']),
    ...mapActions("photos",['getPhotos']),
    // ...mapActions("documents",['getDocuments']),
    ...mapActions("profile",['exportCurrentProfile']),
    toggleVisibility() {
      this.visible =!this.visible;
    }
  },
  computed: {
    ...mapState('groups', [ 'mygroups']),
    ...mapState('messages', [ 'messages']),
    ...mapState('notes', [ 'notes']),
    ...mapState('products', [ 'myproducts']),
    ...mapState('photos', [ 'photos']),
    // ...mapState('documents', [ 'documents']),
    ...mapState('auth', [ 'user']),
    ...mapState('profile', [ 'profile']),
  },
  data() {
    return {
      visible: false
    }
  }
}

</script>

<style scoped>
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .2s ease-in-out;
  }
  .dropdown-fade-enter, .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }
</style>