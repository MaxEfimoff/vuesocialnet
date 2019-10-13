<template>
  <section class="posts">
    <h2 class="padding">Note Form</h2>
    <form @submit.prevent="submitForm" class="post-new-form">
      <div class="halfpadding">
        <input
          type="text"
          placeholder="Note title"
          v-model="formData.title"
        />
      </div>
      <div class="halfpadding"> 
        <textarea
          class="textarea"
          placeholder="Note text!"
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
        title: '',
        text: '',
        name: this.$store.state.profile.profile.handle,
        iscompleted: false,
        // avatar: this.$store.state.profile.profile.avatar
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
      this.$store.dispatch('notes/addNote', this.formData)
      .then(() => this.$router.push({ name: 'notes' }))
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>