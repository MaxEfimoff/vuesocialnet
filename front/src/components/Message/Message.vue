<template>
  <section class="section-center">
    <div class="section posts">
      <!-- Message header -->
      <div class="message-header padding text-center">
        <h4>{{ message.recipient }}</h4>
      </div>
      <!-- Message and comments -->
      <div class="post-wrapper">
        <div class="post">
          <div class="">
            <div class="flex-left">
              <div>
                <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
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
                  <img class="groups-img" src="../../assets/img/anon.jpg" alt="">
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
        name: this.$store.state.profile.profile.user.name,
        // avatar: this.$store.state.profile.profile.avatar
      },
      tab: 'text',
    };
  },
  created() {
    this.getMessageById(this.$route.params.id);
  },
  computed: {
    ...mapState('messages', ['message']),
  },
  methods: {
    ...mapActions("messages", ['getMessageById']),
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