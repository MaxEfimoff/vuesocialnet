<template>
  <section class="posts">
    <h2 class="padding">Post Form</h2>
    <form @submit.prevent="submitForm" class="post-new-form">
      <div class="halfpadding">
        <textarea
          class="textarea"
          type="text"
          placeholder="Write something!"
          v-model="formData.text"
        />
      </div>
      <div class="error-message">
        {{ this.errors.text }}
      </div>
      <div class="padding">
        <button type="submit">Submit</button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        profile: this.$store.state.profile.profile._id,
        avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('errors', [ 'errors' ]),
    ...mapState('profile', [ 'profile' ])
  },
  methods: {
    ...mapActions("profile", [ 'exportCurrentProfile' ]),
    submitForm() {
      this.$store.dispatch('posts/addPost', this.formData)
      .then(() => this.$router.push({ name: 'posts' }))
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>