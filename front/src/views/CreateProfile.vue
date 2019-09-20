<template>
  <div>
    <Header />
    <div class="register padding">
      <section class="section posts">
        <h2 class="padding">Create profile</h2>
        <CreateEditProfile
          :formData="formData"
          :onSubmit="createProfile"
          @change="onChange"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import CreateEditProfile from'@/components/helpers/CreateEditProfile.vue'

export default {
  name: 'CreateProfile',
  data() {
    return {
      formData: {
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        bio: '',
        errors: {}
      },
      tab: 'CreateProfile',
    };
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    onChange(newFormData) {
      this.formData = newFormData;
    },
    createProfile() {
      const newData = Object.assign({}, this.formData);

      this.$store.dispatch('profile/createProfile', newData)
        .then(() => this.$router.push({ name: 'posts' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    Header,
    CreateEditProfile
  }
};
</script>

<style>
</style>
