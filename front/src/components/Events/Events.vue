<template>
  <section class="posts section">
    <h3>events</h3>
    <!-- <router-link :to="{ name: 'eventForm' }">
      <button>
        New Event
      </button>
    </router-link> -->
    <ModalEvent/>
  </section>
</template>

<script>
import ModalEvent from './ModalEvent.vue';

export default {
  name: 'Events',
  // created() {
  //   this.getEvents();
  // },
  // computed: {
  //   ...mapState('events', ['events']),
  // },
  // methods: {
  //   ...mapActions("events", ['getEvents']),
    
  // },
  components: {
    ModalEvent
  }
}
</script>

<style>

</style>