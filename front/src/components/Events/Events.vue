<template>
  <div class="flex">
    <div
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventCard from '@/components/Event/EventCard';
import Event from '@/components/Event/Event';

export default {
  data() {
    return {
      eventId: '',
    }
  },
  name: 'Events',
  async mounted() {
    await this.getEvents();
    await this.hide();
  },
  computed: {
    ...mapState('profile', ['profile']),
    ...mapState('events', ['events']),
  },
  methods: {
    ...mapActions("events", ['getEvents']),
    show(arg) {
      this.$modal.show('ModalEvent', {id: arg});
      this.eventId = arg;
    },
    hide() {
      this.$modal.hide('ModalEvent');
    }
  },
  components: {
    EventCard,
    Event
  }
}
</script>

<style>

</style>