<template>
  <form class="post-create">
    <div class="field">
      <textarea 
        v-auto-expand
        v-model="text"
        class=""
        placeholder="Write a post"
        rows="2"></textarea>
      <button 
        :disabled="!text"
        @click.prevent="sendEventPost"
        class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
import autoExpand from '@/directives/autoExpand';
import { mapActions, mapState } from 'vuex';

export default {
  directives: { autoExpand },
  props: {
    eventThreadId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      text: null
    }
  },
  computed: {
    ...mapState('profile', [ 'profile']),
    event () {
      return this.$store.state.events.event
    }
  },
  methods: {
    ...mapActions("profile",['exportCurrentProfile']),
    sendEventPost () {
      const payload = {
        text: this.text,
        eventThreadId: this.eventThreadId,
        profile: this.profile._id
      }
      this.$store.dispatch('eventthreads/sendEventPost', payload)
      .then((createdPost) => {
        this.$socket.emit('meetup/postSaved',
          {...createdPost, meetup: this.meetup._id }
        )

        this.text = ''
      })
    }
  },
  mounted() {
    this.exportCurrentProfile();
  }
}
</script>

<style>

</style>