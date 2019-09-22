<template>
  <div>
    <Header />
    <div class="main">
      <div class="container container-main">
        <LeftSection />
        <section class="section-center">
          <div class="section posts">
            <div class="post-new noleftpadding">
              <form action="#" class="post-new-form">
                <input type="text" placeholder="Search" />
              </form>
            </div>
              <div class="post" v-for="message in messages" :key="message.id">
                <div class="post-author">
                  <div class="groups-photo">
                    <img class="groups-img" src="../assets/img/groups/02.jpg" alt="">
                    <a class="leftpadding">{{ message.text }}</a>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import LeftSection from '@/components/LeftSection.vue'
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
  components: {
    Header,
    LeftSection
  }
}
</script>
