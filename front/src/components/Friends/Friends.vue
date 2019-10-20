<template>
<div>
  <section class="section-center" v-if="this.profile.handle">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a href="">Friends</a>
          </li>
          <li>
            <a href="">Friends online</a>
          </li>
        </ul>
        <form action="#" class="search-form">
          <input type="text" placeholder="Friends search" />
        </form>
      </div>
      <div class="post" v-for="profile in profile.friends" :key="profile.id">
        <ProfileCard 
          :profile="profile"/>
      </div>
    </div>
  </section>
  <section v-else class="register">
    <NoProfileMessage />
  </section>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NoProfileMessage from '@/components/helpers/NoProfileMessage';
import ProfileCard from '@/components/Profile/ProfileCard';

export default {
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    ...mapActions("profile",['exportCurrentProfile']),
  },
  components: {
    ProfileCard,
    NoProfileMessage
  }
}
</script>

<style>

</style>