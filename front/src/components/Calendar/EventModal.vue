<template>
  <div>
    {{ text }}
    <fieldset>
      <legend>Event details</legend>
        <b>Title</b> {{ event.title }} <br/>
        <b>Start</b> {{ event.start | formatDate }} <br/>
        <b>End</b> {{ event.end | formatDate}} <br/>
        <b>ID</b> {{ event.id }} <br/>
    </fieldset>
    <fieldset>
      <legend>Edit event</legend>
      <input type="text" v-model="title">
      <input type="date" v-model="start">
      <input type="date" v-model="end">

      <button @click="updateEvent">Update Event</button>
    </fieldset>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '',
      start: {},
      end: {}
    }
  },
  props: {
    text: String,
    event: Object
  },
  mounted() {
    this.title = this.event.title;
      this.start = formatedDate(this.event.start);
      this.end = formatedDate(this.event.end);
  },
  methods: {
    updateEvent() {
      this.$store.commit('calendar/UPDATE_EVENT', {
        id: this.event.id,
        title: this.title,
        start: this.start,
        end: this.end,
      })
    }
  }
}

function formatedDate(date) {
    // YYYY-MM-DD 
    var options = {year: "numeric", month: '2-digit', day: "2-digit"};
    let string = date.toLocaleDateString("ko-KR", options).replace(/\. /g, "-")
    return string.substr(0, string.length - 1)
}
</script>

<style>

</style>