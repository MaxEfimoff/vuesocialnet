<template>
  <section class="section-center">
    <div class="section posts">
        <div class="friends-list padding">
            <ul  class="flex">
              <li>
                <a href="">Group</a>
              </li>
              <li>
                <a href="">Group online</a>
              </li>
            </ul>
            <button>Create new group</button>
            <form action="#" class="post-new-form">
              <input type="text" placeholder="Group search" />
            </form>
          </div>
      <div class="post-wrapper">
        <div class="post" v-for="group in groups" :key="group.id">
          <div class="post-author">
            <router-link
              :to="`/groups/${group._id}`"
            >
              <div class="groups-photo">
                <img class="groups-img" src="../../assets/img/groups/01.jpg" alt="">
                <span>{{ group.handle }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Groups',
  created() {
    this.getGroups();
  },
  computed: {
    ...mapState("groups",['groups']),
  },
  methods: {
    ...mapActions("groups",['getGroups']),
  },
}
</script>

<style>

</style>