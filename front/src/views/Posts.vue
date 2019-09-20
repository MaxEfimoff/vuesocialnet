<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main" v-if="this.profile.handle">
        <LeftSection />
        <PostsMain />
      </div>
      <div v-else class="register ">
        <div class="section posts padding">
          <h4>Welcome, {{ user.name }}! Please setup your profile!</h4>
          <div class="edit-profile">
            <router-link
              :to="{ name: 'createProfile' }">
              <!-- <img :src=" require (`${user.avatar}`) " alt=""> -->
              <span>Create profile</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
import PostsMain from '@/components/PostsMain.vue'
import { mapState } from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapState('profile', [ 'profile']),
    ...mapState('auth', [ 'user']),
  },
  components: {
    Header,
    LeftSection,
    PostsMain
  }
}
</script>
