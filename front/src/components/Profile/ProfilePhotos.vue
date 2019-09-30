<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post" v-for="photo in profilePhotos" :key="photo.id">
        <div class="post-author">
          <router-link
            :to="`/photos/${photo._id}`"
          >
            <div class="groups-photo">
              <img class="display-image" :src=" require(`../../../../back/uploads/${photo.image}`) " alt="">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';

export default {
  created() {
    this.exportCurrentProfile();
    this.getProfilePhotos(this.$route.params.handle);
  },
  computed: {
    ...mapState('profile', [ 'anotherUserProfile', 'profilePhotos' ]),
  },
  methods: {
    ...mapActions("profile",[ 'getProfileByHandle', 'getProfilePhotos' ]),
  },
}
</script>

<style>

</style>