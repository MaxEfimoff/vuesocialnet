<template>
  <section class="section posts">
    <h2 class="padding">Note Form</h2>
    <form @submit.prevent="submitForm" class="post-new-form">
      <div class="halfpadding"> 
        <input
          type="text"
          placeholder="Note text!"
          v-model="formData.text"
        />
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
        recipient: this.$store.state.profile.anotherUserProfile.user.name,
        // avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('profile', [ 'anotherUserProfile', 'profile' ]),
  },
  methods: {
    ...mapActions("profile", [ 'exportCurrentProfile', 'getProfileByHandle' ]),
    submitForm() {
      console.log(this.formData)
      this.$store.dispatch('messages/addMessage', this.formData)
      // .then(() => this.$router.push({ name: 'notes' }))
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>