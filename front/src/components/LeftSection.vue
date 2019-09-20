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
              <a href="/friends" class="stat-counter">
                <div class="count">{{ profile.friends.length }}</div>
                <i class="fas fa-user"></i>
              </a>
              <a href="/subscribers" class="stat-counter lefthalfpadding">
                <div class="count">93</div>
                <i class="fas fa-user-plus"></i>
              </a>
              <a href="/messages" class="stat-counter lefthalfpadding">
                <div class="count">2</div>
                <i class="fas fa-envelope"></i>
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
          <span>Friends online</span>  
          <div>
            <img class="friends-photo" src="../assets/img/friends/01.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/02.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/03.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/04.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/05.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/06.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/07.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/08.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/09.jpg" alt="">
            <img class="friends-photo" src="../assets/img/friends/10.jpg" alt="">
          </div>
          <div class="show-more">
            <a><i href="#" class="fas fa-chevron-down" id="friends-showMore-info"></i></a>
          </div> 
          <!-- More info hidden -->
          <div class="friends-container-slider"> 
            <div id="friends-slider" class="friends-slideup">
              <div>
                <img class="friends-photo" src="../assets/img/friends/01.jpg" alt="">
                <img class="friends-photo" src="../assets/img/friends/02.jpg" alt="">
                <img class="friends-photo" src="../assets/img/friends/03.jpg" alt="">
                <img class="friends-photo" src="../assets/img/friends/04.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
        <!-- Groups -->
        <div class="section groups">
          <span>Groups</span>
          <div class="groups-wrapper">
            <div class="groups-photo" v-for="group in groups" :key="group.id">
              <img class="groups-img" src="../assets/img/groups/01.jpg"  alt="">
              <span>{{ group.handle }}</span>
            </div>  
          </div>
          <div class="show-more">
            <a><i href="#" class="fas fa-chevron-down" id="groups-showMore-info"></i></a>
          </div>
          <div class="groups-container-slider"> 
            <div id="groups-slider" class="groups-slideup">
              <div class="groups-photo">
                <img class="groups-img" src="../assets/img/groups/03.jpg" alt="">
                <span>Garden design </span>
              </div>
              <div class="groups-photo">
                <img class="groups-img" src="../assets/img/groups/04.jpg" alt="">
                <span>Cafe racer </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Photos -->
        <div class="section photos">
          <span>Photos</span>
          <div class="photos-wrapper">
            <div class="photos-photo">
              <img class="photo-img" src="../assets/../assets/img/photos/01.jpg" alt="">
              <span>Formula 1 </span>
            </div> 
            <div class="photos-photo">
              <img class="photo-img" src="../assets/img/photos/02.jpg" alt="">
              <span>Canyon bikes </span>
            </div>
          </div>
          <div class="show-more">
            <a><i href="#" class="fas fa-chevron-down" id="photos-showMore-info"></i></a>
          </div>
          <div class="photos-container-slider"> 
            <div id="photos-slider" class="photos-slideup">
              <div class="photos-photo">
                <img class="photo-img" src="../assets/img/photos/01.jpg" alt="">
                <span>Formula 1 </span>
              </div> 
            </div>
          </div> 
        </div>
      </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Main',
  created() {
    this.getGroups();
    this.exportCurrentProfile();
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions("groups",['getGroups']),
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
    ...mapState('groups', [ 'groups']),
    ...mapState('auth', [ 'user']),
    ...mapState('profile', [ 'profile'])
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