<template>
  <section class="section-center">
    <div class="section posts">
      <div class="friends-list padding">
        <ul  class="flex">
          <li>
            <a href="">Users</a>
          </li>
          <li>
            <a href="">Users online</a>
          </li>
        </ul>
        <form action="#" class="search-form leftmargin">
          <input type="text" placeholder="Users search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div
          class="post"
          v-for="profile in profiles"
          :key="profile.id"
        >
        <div class="post-author">
          <ProfileCard 
            :profile="profile"/>
          <div class="leftpadding">
            <div><span>{{ profile.status }}</span></div>
          </div>

        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import ProfileCard from '@/components/Profile/ProfileCard';

export default {
  name: 'Profiles',
  created() {
    this.getProfiles();
  },
  computed: {
    ...mapState('profile', ['profiles']),
  },
  methods: {
    ...mapActions("profile", ['getProfiles']),
  },
  components: {
    ProfileCard
  }
}
</script>
