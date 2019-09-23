<template>
  <section class="section-center">
    <div class="section posts">
      <div class="post-new padding">
        <h3>{{ message.recipient }}</h3>
      </div>
      <div class="post-wrapper">
        <div class="post">
          <div class="post-author">
              <div class="groups-photo">
                <p>{{ message.text }}</p>
              </div>
              <div class="post" v-for="comment in message.comments" :key="comment.id">
                <p>{{ comment.name }}</p><span>{{ comment.text }}</span>
              </div>
              <form ref="text" @submit.prevent="submitForm" class="post-new-form">
                <div class="halfpadding">
                  <input
                    type="text"
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
    // reset() {
    //   this.$refs.text.reset()
    // },
    submitForm() {
      const payload = {
        messageId: this.$route.params.id,
        formData: this.formData
      }
      this.$store.dispatch('messages/addComment', payload)
      // .then(this.reset())
      .catch((error) => {console.log(error)
      })
    },
  },
}
</script>

<style>

</style>