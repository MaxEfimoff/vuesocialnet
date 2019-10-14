<template>
  <nav class="navbar">
    <div class="container">
      <h1 class="logo">
        <router-link
          to="/">
          SocialNet
        </router-link>
      </h1>
      <div class="nav">
        <div v-if="isAuthenticated">
          <router-link
            v-if="this.profile.handle"
            class="padding"
            :to="{ name: 'profiles' }">
            <span>
              Users
            </span>
          </router-link>
          <router-link
            v-if="this.profile.handle"
            :to="{ name: 'posts' }">
            <span>Posts</span>
          </router-link>
          <router-link
            v-if="this.profile.handle"
            class="leftpadding"
            :to="{ name: 'groups' }">
            <span>Groups</span>
          </router-link>
          <router-link
            class="leftpadding"
            :to="{ name: 'dashboard' }">
            <span>Dashboard</span>
          </router-link>
          <a @click="logout">
            <span class="padding">Logout</span>
          </a>
        </div>
          <div v-else>
            <router-link
              :to="{ name: 'login' }">
              <span>Login</span>
            </router-link>
            <router-link
              :to="{ name: 'register' }">
              <span class="padding">Registration</span>
            </router-link>
          </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState('auth', ['isAuthenticated', 'user']),
    ...mapState('profile', ['profile']),
  },
  methods: {
    logout() {
          this.$store.commit('profile/resetProfile')
          this.$store.dispatch('auth/logout')
          .then(() => this.$router.push({ name: 'login' }))
          .catch((error) => {console.log(error)
      })
    },
  }
}
</script>

<style>

</style>