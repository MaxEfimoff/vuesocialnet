<template>
  <section class="section-center">
    <div class="section posts">
      <div class="rel">
        <img class="display-image-large padding" :src=" require(`../../../../back/uploads/${photo.image}`) " alt="">
        <i class="fas fa-trash-alt abs delete-photo white-font" @click="deletePhoto"></i>
      </div>
      <div class="message">
        <i class="fas fa-thumbs-up" @click="addLike"></i>
        {{' '}}<span>{{ photo.likes.length }}</span>
        <div class="error-message">
          {{this.errors.alreadyliked}}
        </div>
      </div>
      <!-- Comments -->
      <div
        class="message"
        v-for="comment in photo.comments"
        :key="comment.id"
      >
        <div class="flex-left-nowrap">
            <div>
            <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
            <div class='text-center'>
              <span>{{ comment.name }}</span>
            </div>
          </div>
          <div class="groups-photo">
            <a class="leftpadding">{{ comment.text }}</a>
          </div>
        </div>
      </div>
      <!-- Comments form -->
      <form ref="text" @submit.prevent="submitForm" class="post-new-form">
        <div class="halfpadding">
          <textarea
            class="textarea"
            placeholder="Coment"
            v-model="formData.text"
          />
        </div>
        <div class="padding">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'photo',
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.user.name,
        // avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      this.getPhoto(newId)
    }
  },
  async mounted() {
    await this.getPhoto(this.$route.params.id);
  },
  computed: {
    ...mapState('photos', ['photo']),
    ...mapState('errors', ['errors']),
  },
  methods: {
    ...mapActions("photos", ['getPhoto', 'deletePhoto']),
    addLike() {
      this.$store.dispatch('photos/addLike', this.$route.params.id)
      .catch((error) => {console.log(error)})
    },
    submitForm() {
      const payload = {
        photoId: this.$route.params.id,
        formData: this.formData
      }
      this.$store.dispatch('photos/addComment', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)
      })
    },
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