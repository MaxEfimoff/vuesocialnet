<template>
  <section class="section posts">
    <h2 class="padding">Note Form</h2>
    <form @submit.prevent="submitForm" class="post-new-form">
      <div class="halfpadding">
        <input
          type="text"
          placeholder="Group handle"
          v-model="formData.handle"
        />
      </div>
      <div class="halfpadding">
        <input
          type="text"
          placeholder="Group status"
          v-model="formData.status"
        />
      </div>
      <div class="halfpadding">
        <input
          type="text"
          placeholder="Group info"
          v-model="formData.info"
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
        handle: '',
        status: '',
        info: '',
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
      console.log(this.formData)
      this.$store.dispatch('groups/createGroup', this.formData)
      .then(() => this.$router.push({ name: 'groups' }))
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>