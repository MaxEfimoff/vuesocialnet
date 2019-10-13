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
              <div>
                <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
                <div class='text-center'>
                  <span>{{ message.recipient }}</span>
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
  },
  computed: {
    ...mapState('messages', [ 'messages']),
  },
  methods: {
    ...mapActions("messages",['getMessages']),
  },
}
</script>

<style>

</style>