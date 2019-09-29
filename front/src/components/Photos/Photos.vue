<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <router-link
          :to="{ name: 'photoForm' }"
        >
          <button>Add a new photo</button>
        </router-link>
        <form action="#" class="post-new-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper flex-left">
        <div class="post"  v-for="photo in photos" :key="photo.id">
          <div>
            <router-link
              :to="`/photos/${photo.image}`"
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
  created() {
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