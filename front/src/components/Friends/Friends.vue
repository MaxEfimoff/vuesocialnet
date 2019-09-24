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
      <div class="post" v-for="friend in profile.friends" :key="friend.id">
        <div class="post-author">
            <div class="groups-photo lefthalfpadding">
              <img class="groups-img" src="../../assets/img/groups/03.jpg" alt="">
              <router-link
                :to="`/profile/handle/${friend.handle}`">
                <div class="leftpadding">
                  <div><a>{{ friend.handle }}</a></div>
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