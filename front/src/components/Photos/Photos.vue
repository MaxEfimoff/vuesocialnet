<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <router-link
          :to="{ name: 'photoForm' }"
        >
          <button>Add new photo</button>
        </router-link>
        <form action="#" class="search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper flex-left">
        <div class="photo-small" v-for="photo in photos" :key="photo.id">
          <div>
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
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'photos',
  mounted() {
    this.getPhotos();
  },
  computed: {
    ...mapState('photos', ['photos']),
  },
  methods: {
    ...mapActions("photos", ['getPhotos']),
  },
}
</script>

<style>

</style>