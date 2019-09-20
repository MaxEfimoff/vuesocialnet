<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <div class="section-center">
          <section class="section posts">
            <h3 class="padding">Edit profile</h3>
              <CreateEditProfile
                :formData="currentProfile"
                :onSubmit="editPage"
                @change="onChange"
              />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue';
import CreateEditProfile from'@/components/helpers/CreateEditProfile.vue'

export default {
  name: 'EditProfile',
  data() {
    return {
      tab: 'CreateProfile',
    };
  },
  computed: {
    ...mapState('errors', ['errors']),
    ...mapState('profile', [ 'profile']),
    currentProfile() {
      return this.profile;
    },
  },
  methods: {
    onChange(newFormData) {
      this.$store.commit('profile/setProfile', newFormData);
    },
    editPage() {
      const profile = Object.assign({}, this.profile, {
        education: undefined,
        experience: undefined,
        friends: undefined,
        skills: undefined,
        
      });
      console.log(profile);
      this.$store.dispatch('profile/createProfile', profile)
        .then(() => this.$router.push({ name: 'posts' }))
        .catch((error) => {
          console.log(error)
        });
    },
  },
  components: {
    Header,
    CreateEditProfile,
    LeftSection
  }
};
</script>

<style>
</style>
