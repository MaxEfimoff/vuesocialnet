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
      .then(() => {
        this.text = '';
        this.$socket.emit('meetup/postSaved',
          {...createdPost, meetup: this.meetup._id }
        )

      })
    }
  },
}
</script>

<style>

</style>