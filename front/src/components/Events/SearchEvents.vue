<template>
  <div>
    <h3>Search events</h3>
    <form @submit.prevent="getEvents">
        <input v-model="searchedLocation" type="text" placeholder="Event search" />
        <div class="leftpadding">
          <button type="submit">Search</button>
        </div>
    </form>
    <div v-if="searchedLocation && events && events.length > 0">
      <span>Events in {{events[0].location | capitalize}}</span>
      <div  class="flex"
      @click.prevent="show(event._id)"
      v-for="event in events"
      :key="event.id">
      <EventCard
        :name="event.profile.handle"
        :id="event._id"
        :image="event.image"
        :title="event.title"
        :startDate="event.startDate"
        @closeModal="hide"/>
    </div>
    <modal
      :scrollable="true"
      name="ModalEvent"
      height="auto">
      <Event :id="eventId" />
    </modal>
    </div>
    <div v-else>No events found, you might try to change search criteria</div>
  </div>
</template>

<script>
import EventCard from '@/components/Event/EventCard';
import Event from '@/components/Event/Event';

export default {
  name: 'EventsSearch',
  data() {
    return {
      filter: {},
      searchedLocation: this.$store.getters['meta/setLocation'],
      eventId: '',
    }
  },
  computed: {
    events() {
      return this.$store.state.events.events;
    }
  },
  methods: {
    getEvents() {
      if(this.searchedLocation) {
        this.filter['location'] = this.searchedLocation.toLowerCase().replace(/[\s,]+/g,'').trim();
      }
      this.$store.dispatch('events/getEvents', {filter: this.filter});
    },
    show(arg) {
      this.$modal.show('ModalEvent', {id: arg});
      this.eventId = arg;
    },
    hide() {
      this.$modal.hide('ModalEvent');
    }
  },
  mounted() {
    this.getEvents();
    this.hide();
  },
  components: {
    EventCard,
    Event
  }
}
</script>

<style scoped>

form {
  max-width: 30rem;
  display: flex;
  margin: auto;
  padding: 1rem;
}

</style>