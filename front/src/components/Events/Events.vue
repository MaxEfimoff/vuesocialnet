<template>
  <div>
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
    <div class="flex">
      <div
        v-for="eventcategory in eventcategories"
        :key="eventcategory.id">
        <EventCategoryCard
          :eventcategory="eventcategory"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventCard from '@/components/Event/EventCard';
import EventCategoryCard from '@/components/Event/EventCategoryCard';
import Event from '@/components/Event/Event';

export default {
  name: 'Events',
  data() {
    return {
      eventId: '',
    }
  },
  async mounted() {
    await this.getEvents();
    await this.getEventCategories()
    await this.hide();
  },
  computed: {
    ...mapState('events', ['events']),
    ...mapState('eventcategories', ['eventcategories']),
  },
  methods: {
    ...mapActions("events", ['getEvents']),
    ...mapActions("eventcategories", ['getEventCategories']),
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
    Event,
    EventCategoryCard
  }
}
</script>

<style>

</style>