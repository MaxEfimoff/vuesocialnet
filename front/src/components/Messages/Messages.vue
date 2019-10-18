<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new noleftpadding">
        <form action="#" class="search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div class="post-wrapper">
        <div class="post" v-for="message in messages" :key="message.id">
          <div class="flex-left">
              <div v-if="profile.handle != message.recipient">
                <img class="groups-img" :src="message.recipientAvatar" alt="">
                <div class='text-center'>
                  <span>{{ message.recipient }}</span>
                </div>
              </div>
              <div v-else>
                <img class="groups-img" :src="message.nameAvatar" alt="">
                <div class='text-center'>
                  <span>{{ message.name }}</span>
                </div>
              </div>
            <router-link
              :to="`/messages/${message._id}`">
              <div class="groups-photo">
                <a class="leftpadding">{{ message.text }}</a>
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
  name: 'Messages',
  created() {
    this.getMessages();
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('messages', [ 'messages']),
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    ...mapActions("messages",['getMessages']),
    ...mapActions("profile",['exportCurrentProfile']),
  },
}
</script>

<style>

</style>