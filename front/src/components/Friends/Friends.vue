<template>
  <section class="section-center">
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
        <form action="#" class="post-new-form">
          <input type="text" placeholder="Friends search" />
        </form>
      </div>
      <div class="post" v-for="profile in profile.friends" :key="profile.id">
        <div class="post-author">
            <div class="groups-photo lefthalfpadding">
              <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
              <router-link
                :to="`/profile/handle/${profile.handle}`">
                <div class="leftpadding">
                  <div><a>{{ profile.handle }}</a></div>
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
  created() {
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    ...mapActions("profile",['exportCurrentProfile']),
  },
}
</script>

<style>

</style>