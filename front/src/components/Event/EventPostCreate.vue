<template>
  <form class="post-create">
    <div class="field">
      <textarea 
        v-auto-expand
        v-model="text"
        class="textarea"
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
    event () {
      return this.$store.state.events.event
    }
  },
  methods: {
    sendEventPost () {
      const payload = {
        text: this.text,
        eventThreadId: this.eventThreadId,
      }
      this.$store.dispatch('eventthreads/sendEventPost', payload)
        .then((createdEventPost) => {
          // When new eventpost is created we are emitting to socket 'event/postSave' an event
          // And we are sending createdEventPost (post we created) and event to which we sent the eventpost
          this.$socket.emit('event/postSave', {...createdEventPost, event: this.event._id});

          this.text = '';
        })
    }
  },
}
</script>

<style>

</style>