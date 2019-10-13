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
          v-for="profile in profiles.slice(0, 10)"
          :key="profile.id"
        >
          <div class="post-author">
            <router-link
              :to="`/profile/handle/${profile.handle}`"
            >
              <div class="groups-photo">
                <img
                  class="groups-img"
                  src="../../assets/img/anon.jpg"
                  alt=""
                >
                <span>
                  {{ profile.handle }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';

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
}
</script>
