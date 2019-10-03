<template>
  <section class="section posts">
    <h2 class="padding">Group Post Form</h2>
    <form @submit.prevent="submitForm" class="post-new-form">
      <div class="halfpadding">
        <textarea
          class="textarea"
          placeholder="Post text"
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
        // avatar: this.$store.state.profile.profile.avatar
      },
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
      const payload = {
        id: this.$store.state.groups.group._id,
        formData: this.formData
      }
      this.$store.dispatch('groups/createGroupPost', payload)
      .then(() => this.$router.push({ name: 'groups' }))
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>