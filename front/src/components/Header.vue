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
              class="padding"
              :to="{ name: 'profiles' }">
              <!-- <img :src=" require (`${user.avatar}`) " alt=""> -->
              <span>
                Users
              </span>
            </router-link>
            <router-link
              :to="{ name: 'dashboard' }">
              <!-- <img :src=" require (`${user.avatar}`) " alt=""> -->
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
        <form name="search-form" method="POST">
            <div class="search-form">
              <button type="submit" class="form-control submit">
                <i class="fas fa-search"></i>
              </button>
              <span class="search-wrap">
                <input type="text" name="search" class="search-input" placeholder="Search">
              </span>
            </div>
          </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState('auth', ['isAuthenticated', 'user']),
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