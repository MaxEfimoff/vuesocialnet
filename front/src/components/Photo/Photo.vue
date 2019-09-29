<template>
  <section class="section-center">
    <div class="section posts">
          <div class="rel">
            <img class="display-image-large padding" :src=" require(`../../../../back/uploads/${photo.image}`) " alt="">
            <i class="fas fa-trash-alt abs delete-photo white-font" @click="deletePhoto"></i>
          </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'photo',
  created() {
    this.getPhoto(this.$route.params.id);
  },
  computed: {
    ...mapState('photos', ['photo']),
  },
  methods: {
    ...mapActions("photos", ['getPhoto', 'deletePhoto']),
    deletePhoto() {
      this.$store.dispatch('photos/deletePhoto', this.$route.params.id)
      // .then(() => this.$router.push({ name: 'photos' }))
      .catch((error) => {console.log(error)
    })
    }
  },
}
</script>

<style>

</style>