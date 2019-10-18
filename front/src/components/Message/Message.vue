<template>
  <section class="section-center">
    <div class="section posts">
      <!-- Message header -->
      <div v-if="profile.handle === message.recipient" class="message-header padding text-center">
        <img class="groups-img" :src="message.nameAvatar" alt="">
        <h4>{{ message.name }}</h4>
      </div>
      <div v-if="profile.handle === message.name" class="message-header padding text-center">
        <img class="groups-img" :src="message.recipientAvatar" alt="">
        <h4>{{ message.recipient }}</h4>
      </div>
      <!-- Message and comments -->
      <div class="post-wrapper">
        <div class="post">
          <div class="">
            <div class="flex-left">
              <div>
                <img class="groups-img" :src="message.nameAvatar" alt="">
                <div class='text-center'>
                  <span>{{ message.name }}</span>
                </div>
              </div>
              <div class="groups-photo">
                <a class="leftpadding">{{ message.text }}</a>
              </div>
            </div>
            <!-- Comments -->
            <div
              class="message"
              v-for="comment in message.comments"
              :key="comment.id"
            >
              <div class="flex-left-nowrap">
                <div>
                  <img class="groups-img" :src="comment.avatar" alt="">
                  <div class='text-center'>
                    <span>{{ comment.name }}</span>
                  </div>
                </div>
                <div class="groups-photo">
                  <a class="leftpadding">{{ comment.text }}</a>
                </div>
              </div>
            </div>
            <!-- Comments form -->
            <form ref="text" @submit.prevent="submitForm" class="post-new-form">
              <div class="halfpadding">
                <textarea
                  class="textarea"
                  placeholder="Coment"
                  v-model="formData.text"
                />
              </div>
              <div class="padding">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Message',
  data() {
    return {
      formData: {
        text: '',
        name: this.$store.state.profile.profile.handle,
        avatar: this.$store.state.profile.profile.avatar,
        handle: this.$store.state.profile.profile.handle
      },
      tab: 'text',
    };
  },
  created() {
    this.getMessageById(this.$route.params.id);
    this.exportCurrentProfile();
  },
  computed: {
    ...mapState('messages', ['message']),
    ...mapState('profile', [ 'profile']),
  },
  methods: {
    ...mapActions("messages", ['getMessageById']),
    ...mapActions("profile",['exportCurrentProfile']),
    submitForm() {
      const payload = {
        messageId: this.$route.params.id,
        formData: this.formData
      }
      this.$store.dispatch('messages/addComment', payload)
      .then(this.formData = {})
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>