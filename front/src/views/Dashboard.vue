<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main" v-if="this.profile.handle">
        <LeftSection />
        <section >
          <div class="section posts">
            <h3 class="padding">Welcome, {{ profile.handle }}</h3>
            <div class="education padding">
              <a>Handle</a>
              <span>{{ profile.handle }}</span>
            </div>
            <div class="education padding">
              <a>Website</a>
              <span>{{ profile.website }}</span>
            </div>
            <div class="education padding">
              <a>Location</a>
              <span>{{ profile.location }}</span>
            </div>
            <div class="education padding">
              <a>Bio</a>
              <span>{{ profile.bio }}</span>
            </div>
            <div class="education padding">
              <a>Company</a>
              <span>{{ profile.company }}</span>
            </div>
            <div class="education padding">
              <a>Status</a>
              <span>{{ profile.status }}</span>
            </div>
            <div class="education padding">
              <a>Avatar</a>
              <span>{{ profile.avatar }}</span>
            </div>
            <div class="education padding">
              <a>Background</a>
              <span>{{ profile.background }}</span>
            </div>
            <div class="padding">
              <router-link 
                :to="{ name: 'editProfile' }">
                  <button>Edit profile</button>
              </router-link>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="register">
        <NoProfileMessage />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import LeftSection from '@/components/LeftSection.vue';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'dashboard',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        password2: '',
        name: this.$store.state.auth.user.name,
      },
      tab: 'Register',
    };
  },
  computed: {
    ...mapState('profile', [ 'profile']),
    ...mapState('auth', [ 'user']),
  },
  created() {
    this.exportCurrentProfile();
  },
  methods: {
    ...mapActions("profile",['exportCurrentProfile']),
    submitForm() {
        this.$store.dispatch('auth/register', this.formData)
          .then(() => this.$router.push({ name: 'dashboard' }))
          .catch((error) => {
            console.log(error)
          });
    },
  },
  components: {
    Header,
    LeftSection,
    NoProfileMessage
  }
}
</script>
