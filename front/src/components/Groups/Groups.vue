<template>
  <section class="section-center">
    <div class="post-wrapper">
      <div class="post" v-for="group in groups" :key="group.id">
        <div class="post-author">
          <router-link
            :to="`/groups/${group._id}`"
            class=" flex-left"
          >
            <div class="text-center"> 
              <img class="groups-img" :src="group.avatar" alt="">
              <div><span>{{ group.subscribes.length }} Subscribers</span></div>
            </div>
            <div class="leftpadding">
              <div><span>{{ group.handle }}</span></div>
              <div><span>{{ group.info }}</span></div>
            </div>
          </router-link>
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